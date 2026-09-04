(async function () {
  "use strict";

  const config = window.AUTH_CONFIG || {};
  const previewMode = new URLSearchParams(window.location.search).get("auth-preview") === "1";
  const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(config.supabaseUrl || "")
    && typeof config.supabasePublishableKey === "string"
    && config.supabasePublishableKey.length > 20;
  const siteUrl = config.siteUrl || `${window.location.origin}${window.location.pathname}`;
  const body = document.body;
  const els = {
    screen: document.querySelector("#auth-screen"),
    siteShell: document.querySelector("#site-shell"),
    title: document.querySelector("#auth-title"),
    subtitle: document.querySelector("#auth-subtitle"),
    tabs: document.querySelector("#auth-tabs"),
    form: document.querySelector("#auth-form"),
    nameField: document.querySelector("#auth-name-field"),
    name: document.querySelector("#auth-name"),
    emailField: document.querySelector("#auth-email-field"),
    email: document.querySelector("#auth-email"),
    passwordField: document.querySelector("#auth-password-field"),
    passwordLabel: document.querySelector("#auth-password-label"),
    password: document.querySelector("#auth-password"),
    confirmField: document.querySelector("#auth-confirm-field"),
    confirm: document.querySelector("#auth-confirm"),
    submit: document.querySelector("#auth-submit"),
    forgot: document.querySelector("#auth-forgot"),
    back: document.querySelector("#auth-back"),
    status: document.querySelector("#auth-status"),
    configNote: document.querySelector("#auth-config-note"),
    accountTrigger: document.querySelector("#account-trigger"),
    accountMenu: document.querySelector("#account-menu"),
    accountAvatar: document.querySelector("#account-avatar"),
    accountName: document.querySelector("#account-name"),
    accountEmail: document.querySelector("#account-email"),
    accountMenuName: document.querySelector("#account-menu-name"),
    accountMenuEmail: document.querySelector("#account-menu-email"),
    syncStatus: document.querySelector("#account-sync-status"),
    signout: document.querySelector("#auth-signout")
  };
  let mode = "login";
  let client = null;
  let currentUser = null;
  let syncReady = false;
  let saveTimer = null;
  let pendingWorkspace = null;
  let savePromise = Promise.resolve();
  let activationPromise = null;

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  }

  function setBodyState(next) {
    body.classList.remove("auth-loading", "auth-required", "authenticated", "auth-unconfigured", "auth-preview");
    body.classList.add(next);
    els.siteShell.setAttribute("aria-hidden", next === "authenticated" || next === "auth-unconfigured" ? "false" : "true");
  }

  function setStatus(message = "", kind = "") {
    els.status.textContent = message;
    els.status.className = `auth-status${kind ? ` is-${kind}` : ""}`;
  }

  function setSyncStatus(message, kind = "", icon = "cloud") {
    els.syncStatus.className = `account-sync-status${kind ? ` is-${kind}` : ""}`;
    els.syncStatus.innerHTML = `<i data-lucide="${icon}"></i><span>${message}</span>`;
    refreshIcons();
  }

  function setSubmit(label, icon) {
    els.submit.innerHTML = `<i data-lucide="${icon}"></i><span>${label}</span>`;
    refreshIcons();
  }

  function setMode(next) {
    mode = next;
    const register = next === "register";
    const reset = next === "reset";
    const update = next === "update";
    els.tabs.hidden = reset || update;
    els.nameField.hidden = !register;
    els.emailField.hidden = update;
    els.passwordField.hidden = reset;
    els.confirmField.hidden = !(register || update);
    els.forgot.hidden = next !== "login";
    els.back.hidden = !(reset || update);
    els.passwordLabel.textContent = update ? "新密码" : "密码";
    els.password.autocomplete = register || update ? "new-password" : "current-password";
    [els.password, els.confirm].forEach((input) => { input.type = "password"; });
    els.screen.querySelectorAll("[data-password-target]").forEach((toggle) => {
      toggle.setAttribute("aria-label", toggle.dataset.passwordTarget === "auth-confirm" ? "显示确认密码" : "显示密码");
      toggle.setAttribute("title", toggle.dataset.passwordTarget === "auth-confirm" ? "显示确认密码" : "显示密码");
      toggle.innerHTML = '<i data-lucide="eye"></i>';
    });
    els.confirm.required = register || update;
    els.name.required = register;
    els.tabs.querySelectorAll("[data-auth-mode]").forEach((button) => {
      const selected = button.dataset.authMode === next;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    if (register) {
      els.title.textContent = "注册账号";
      els.subtitle.textContent = "创建账号后，通过确认邮件激活登录。";
      setSubmit("注册账号", "user-plus");
    } else if (reset) {
      els.title.textContent = "找回密码";
      els.subtitle.textContent = "输入注册邮箱，我们会发送密码重置链接。";
      setSubmit("发送重置邮件", "send");
    } else if (update) {
      els.title.textContent = "设置新密码";
      els.subtitle.textContent = "输入新的登录密码并再次确认。";
      setSubmit("更新密码", "key-round");
    } else {
      els.title.textContent = "登录账号";
      els.subtitle.textContent = "登录后继续规划北京行程。";
      setSubmit("登录", "log-in");
    }
    els.password.value = "";
    els.confirm.value = "";
    setStatus();
  }

  function setBusy(busy) {
    els.submit.disabled = busy;
    els.form.querySelectorAll("input, button").forEach((control) => {
      if (!control.classList.contains("auth-password-toggle")) control.disabled = busy;
    });
  }

  function authMessage(error) {
    const message = String(error?.message || error || "");
    if (/invalid login credentials/i.test(message)) return "邮箱或密码不正确。";
    if (/email not confirmed/i.test(message)) return "邮箱尚未确认，请先打开确认邮件。";
    if (/user already registered/i.test(message)) return "该邮箱已经注册，请直接登录或找回密码。";
    if (/password should be at least/i.test(message)) return "密码至少需要8位。";
    if (/rate limit/i.test(message)) return "操作过于频繁，请稍后再试。";
    return message || "认证服务暂时不可用，请稍后再试。";
  }

  function userName(user) {
    return user?.user_metadata?.display_name || user?.email?.split("@")[0] || "旅行成员";
  }

  function showSite(user) {
    const name = userName(user);
    const email = user?.email || "";
    const avatar = Array.from(name)[0] || "京";
    els.accountAvatar.textContent = avatar;
    els.accountName.textContent = name;
    els.accountEmail.textContent = email;
    els.accountMenuName.textContent = name;
    els.accountMenuEmail.textContent = email;
    setBodyState("authenticated");
    refreshIcons();
  }

  async function travelApp() {
    if (window.TRAVEL_APP) return window.TRAVEL_APP;
    await new Promise((resolve) => window.addEventListener("travel-app:ready", resolve, { once: true }));
    return window.TRAVEL_APP;
  }

  function formatSyncTime(value = new Date()) {
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
  }

  async function loadWorkspace(user) {
    syncReady = false;
    setSyncStatus("正在载入云端数据", "saving", "cloud-download");
    try {
      const { data, error } = await client
        .from("travel_workspaces")
        .select("workspace, updated_at")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      const app = await travelApp();
      if (data?.workspace) {
        const imported = await app.importWorkspace(data.workspace);
        if (!imported) throw new Error("云端数据版本无法识别");
        setSyncStatus(`已同步 ${formatSyncTime(data.updated_at)}`, "synced", "cloud-check");
      } else {
        setSyncStatus("云端空间已就绪", "synced", "cloud-check");
      }
      syncReady = true;
      if (!data?.workspace) queueWorkspace(app.exportWorkspace());
    } catch (error) {
      syncReady = false;
      setSyncStatus("云端数据载入失败", "error", "cloud-alert");
      console.error("Workspace load failed", error);
    }
  }

  async function flushWorkspace() {
    window.clearTimeout(saveTimer);
    saveTimer = null;
    if (!syncReady || !currentUser || !pendingWorkspace) return;
    const workspace = pendingWorkspace;
    pendingWorkspace = null;
    setSyncStatus("正在保存", "saving", "cloud-upload");
    const { error } = await client
      .from("travel_workspaces")
      .upsert({
        user_id: currentUser.id,
        workspace,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id" });
    if (error) {
      pendingWorkspace = workspace;
      setSyncStatus("保存失败，将在下次修改时重试", "error", "cloud-alert");
      console.error("Workspace save failed", error);
      return;
    }
    setSyncStatus(`已同步 ${formatSyncTime()}`, "synced", "cloud-check");
    if (pendingWorkspace) queueWorkspace(pendingWorkspace);
  }

  function queueWorkspace(workspace) {
    if (!syncReady || !currentUser || !workspace) return;
    pendingWorkspace = workspace;
    setSyncStatus("等待保存", "saving", "cloud-upload");
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      savePromise = savePromise.then(flushWorkspace).catch((error) => {
        setSyncStatus("保存失败，将在下次修改时重试", "error", "cloud-alert");
        console.error("Workspace save queue failed", error);
      });
    }, 700);
  }

  async function activateUser(user) {
    showSite(user);
    if (currentUser?.id === user.id && syncReady) return;
    if (currentUser?.id === user.id && activationPromise) return activationPromise;
    currentUser = user;
    pendingWorkspace = null;
    activationPromise = loadWorkspace(user).finally(() => { activationPromise = null; });
    return activationPromise;
  }

  function showAuth(next = "login") {
    setBodyState("auth-required");
    setMode(next);
    window.setTimeout(() => (next === "update" ? els.password : els.email).focus(), 0);
  }

  function validPasswords() {
    if (els.password.value.length < 8) {
      setStatus("密码至少需要8位。", "error");
      return false;
    }
    if ((mode === "register" || mode === "update") && els.password.value !== els.confirm.value) {
      setStatus("两次输入的密码不一致。", "error");
      return false;
    }
    return true;
  }

  els.tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-auth-mode]");
    if (button) setMode(button.dataset.authMode);
  });

  els.forgot.addEventListener("click", () => setMode("reset"));
  els.back.addEventListener("click", () => setMode("login"));

  els.screen.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-password-target]");
    if (!toggle) return;
    const input = document.getElementById(toggle.dataset.passwordTarget);
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    toggle.setAttribute("aria-label", showing ? "显示密码" : "隐藏密码");
    toggle.setAttribute("title", showing ? "显示密码" : "隐藏密码");
    toggle.innerHTML = `<i data-lucide="${showing ? "eye" : "eye-off"}"></i>`;
    refreshIcons();
  });

  els.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!configured || !client) {
      setStatus("Supabase 项目尚未连接，暂时不能提交。", "error");
      return;
    }
    if (mode !== "reset" && !validPasswords()) return;
    if (!els.form.reportValidity()) return;
    setBusy(true);
    setStatus("正在处理…");
    try {
      if (mode === "register") {
        const { data, error } = await client.auth.signUp({
          email: els.email.value.trim(),
          password: els.password.value,
          options: {
            data: { display_name: els.name.value.trim() },
            emailRedirectTo: siteUrl
          }
        });
        if (error) throw error;
        if (data.session) await activateUser(data.user);
        else setStatus("注册申请已提交，请打开确认邮件完成激活。", "success");
      } else if (mode === "reset") {
        const { error } = await client.auth.resetPasswordForEmail(els.email.value.trim(), {
          redirectTo: `${siteUrl}?auth=recovery`
        });
        if (error) throw error;
        setStatus("重置邮件已发送。如果邮箱已注册，请按邮件提示继续。", "success");
      } else if (mode === "update") {
        const { error } = await client.auth.updateUser({ password: els.password.value });
        if (error) throw error;
        setStatus("密码已更新，正在进入网站。", "success");
        const { data } = await client.auth.getUser();
        window.setTimeout(() => activateUser(data.user), 500);
      } else {
        const { data, error } = await client.auth.signInWithPassword({
          email: els.email.value.trim(),
          password: els.password.value
        });
        if (error) throw error;
        await activateUser(data.user);
      }
    } catch (error) {
      setStatus(authMessage(error), "error");
    } finally {
      setBusy(false);
    }
  });

  els.accountTrigger.addEventListener("click", () => {
    const open = els.accountMenu.hidden;
    els.accountMenu.hidden = !open;
    els.accountTrigger.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".account-shell")) {
      els.accountMenu.hidden = true;
      els.accountTrigger.setAttribute("aria-expanded", "false");
    }
  });

  els.signout.addEventListener("click", async () => {
    if (!client) return;
    els.signout.disabled = true;
    window.clearTimeout(saveTimer);
    savePromise = savePromise.then(flushWorkspace);
    await savePromise;
    if (pendingWorkspace) {
      els.signout.disabled = false;
      window.alert("云端数据尚未保存，请检查网络后再次退出。");
      return;
    }
    const { error } = await client.auth.signOut();
    els.signout.disabled = false;
    if (error) return window.alert(authMessage(error));
    syncReady = false;
    currentUser = null;
    pendingWorkspace = null;
    els.accountMenu.hidden = true;
    showAuth("login");
  });

  window.addEventListener("travel-workspace:changed", (event) => {
    queueWorkspace(event.detail?.workspace);
  });

  setMode("login");
  if (!configured) {
    els.configNote.hidden = false;
    if (previewMode) {
      setBodyState("auth-unconfigured");
      body.classList.add("auth-preview");
      els.siteShell.setAttribute("aria-hidden", "true");
    } else {
      setBodyState("auth-unconfigured");
    }
    refreshIcons();
    return;
  }

  try {
    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
    client = createClient(config.supabaseUrl, config.supabasePublishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    const recoveryRequested = new URLSearchParams(window.location.search).get("auth") === "recovery";
    if (recoveryRequested) showAuth("update");
    else if (data.session?.user) await activateUser(data.session.user);
    else showAuth("login");
    client.auth.onAuthStateChange((event, session) => {
      window.setTimeout(() => {
        if (event === "PASSWORD_RECOVERY") showAuth("update");
        else if (event === "SIGNED_OUT") {
          syncReady = false;
          currentUser = null;
          pendingWorkspace = null;
          showAuth("login");
        } else if (session?.user && mode !== "update") {
          activateUser(session.user);
        }
      }, 0);
    });
  } catch (error) {
    showAuth("login");
    setStatus(`认证服务连接失败：${authMessage(error)}`, "error");
  }
})();

