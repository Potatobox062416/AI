/* Lucide icon geometry is embedded locally so the prototypes work offline. */
(function () {
  const modules = [
    {
      id: "home",
      name: "首页",
      icon: "house",
      code: "HOME",
      eyebrow: "运营总览",
      description: "今日工作入口与关键业务状态",
      frames: ["运营摘要", "关键状态", "待办区域"],
    },
    {
      id: "orders",
      name: "订单管理",
      icon: "clipboard-list",
      code: "ORDERS",
      eyebrow: "订单中心",
      description: "客户订单与交付任务工作区",
      frames: ["订单列表", "状态摘要", "订单详情"],
    },
    {
      id: "samples",
      name: "样品管理",
      icon: "package-search",
      code: "SAMPLES",
      eyebrow: "样品中心",
      description: "客户样品与打样任务工作区",
      frames: ["样品任务", "生产记录", "发货记录", "样品库存"],
      precisionOnly: true,
    },
    {
      id: "production",
      name: "生产管理",
      icon: "factory",
      code: "PRODUCTION",
      eyebrow: "制造执行",
      description: "生产排期与配料记录工作区",
      frames: ["生产排期", "配料记录"],
    },
    {
      id: "formulas",
      name: "记忆棉配方",
      icon: "sigma",
      code: "FORMULA",
      eyebrow: "配方中心",
      description: "记忆棉配方与原料组成维护工作区",
      frames: ["记忆棉配方"],
      precisionOnly: true,
    },
    {
      id: "standards",
      name: "记忆棉标准",
      icon: "ruler",
      code: "STANDARD",
      eyebrow: "工艺标准",
      description: "记忆棉标准文件管理工作区",
      frames: ["记忆棉标准"],
    },
    {
      id: "experiments",
      name: "实验记录",
      icon: "flask-conical",
      code: "LAB",
      eyebrow: "实验中心",
      description: "试验过程与结果记录工作区",
      frames: ["实验台账", "结果摘要", "记录详情"],
    },
    {
      id: "inventory",
      name: "库存管理",
      icon: "boxes",
      code: "INVENTORY",
      eyebrow: "库存中心",
      description: "原料、半成品与成品库存工作区",
      frames: ["库存台账", "库存状态", "出入库详情"],
    },
    {
      id: "equipment",
      name: "模具与设备",
      icon: "wrench",
      code: "EQUIPMENT",
      eyebrow: "资产中心",
      description: "模具、设备与维护计划工作区",
      frames: ["设备台账", "运行状态", "维护信息"],
    },
    {
      id: "users",
      name: "用户管理",
      icon: "users",
      code: "USERS",
      eyebrow: "组织权限",
      description: "用户、角色与访问权限工作区",
      frames: ["用户列表", "权限摘要", "账户详情"],
    },
    {
      id: "data",
      name: "数据与信息",
      icon: "database",
      code: "DATA",
      eyebrow: "数据中心",
      description: "业务数据与系统信息工作区",
      frames: ["数据总览", "信息状态", "数据详情"],
    },
  ];

  const icons = {
    "house": '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.8V21h14V9.8"/><path d="M9 21v-7h6v7"/>',
    "clipboard-list": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
    "package-search": '<path d="m7.5 4.3 9 5.1"/><path d="M12 22V12M3.3 7 12 12l8.7-5"/><path d="M21 13V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 1 .3"/><circle cx="18.5" cy="18.5" r="2.5"/><path d="m20.3 20.3 1.7 1.7"/>',
    "factory": '<path d="M3 21V9l6 4V9l6 4V4h5a1 1 0 0 1 1 1v16Z"/><path d="M7 17h1M12 17h1M17 17h1"/>',
    "sigma": '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    "ruler": '<path d="m15 3 6 6L9 21l-6-6Z"/><path d="m12 6 3 3M9 9l2 2M6 12l3 3"/>',
    "flask-conical": '<path d="M9 3h6M10 3v6l-6.5 10.5A1.7 1.7 0 0 0 5 22h14a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 16h10"/>',
    "boxes": '<path d="m12 2 7 4-7 4-7-4Z"/><path d="m5 6 7 4v8l-7-4Z"/><path d="m19 6-7 4v8l7-4Z"/><path d="m12 18 4 2.3-4 2.2-4-2.2Z"/>',
    "wrench": '<path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L4 17a2.1 2.1 0 0 0 3 3l7.7-8.3a4 4 0 0 0 0-5.4Z"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    "database": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/>',
    "menu": '<path d="M4 6h16M4 12h16M4 18h16"/>',
    "panel-left-close": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18M16 9l-3 3 3 3"/>',
    "panel-left-open": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18M14 9l3 3-3 3"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    "bell": '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "arrow-up-right": '<path d="M7 17 17 7M7 7h10v10"/>',
    "circle-check": '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  };

  function icon(name, className) {
    return `<svg class="icon ${className || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.house}</svg>`;
  }

  const nav = document.querySelector(".app-nav");
  const sidebar = document.querySelector(".sidebar");
  const shell = document.querySelector(".app-shell");
  const overlay = document.querySelector(".sidebar-overlay");
  const pageTitles = document.querySelectorAll("[data-page-title]");
  const pageEyebrow = document.querySelector("[data-page-eyebrow]");
  const pageDescription = document.querySelector("[data-page-description]");
  const moduleCode = document.querySelector("[data-module-code]");
  const frameLabels = document.querySelectorAll("[data-frame-label]");
  const emptyTitles = document.querySelectorAll("[data-empty-title]");
  const genericGrid = document.querySelector(".work-grid");
  const moduleWorkspaces = document.querySelectorAll("[data-module-workspace]");
  const clock = document.querySelector("[data-clock]");
  const search = document.querySelector("[data-nav-search]");
  const searchCount = document.querySelector("[data-search-count]");
  const collapseButton = document.querySelector("[data-collapse-sidebar]");
  const mobileButton = document.querySelector("[data-open-sidebar]");

  function renderIcons(scope) {
    (scope || document).querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = icon(node.dataset.icon);
    });
  }

  function renderNavigation() {
    const visibleModules = modules.filter((module) => !module.precisionOnly || shell.classList.contains("theme-precision"));
    nav.innerHTML = visibleModules.map((module) => `
      <button class="nav-item" type="button" data-module-id="${module.id}" aria-label="${module.name}">
        <span class="nav-icon">${icon(module.icon)}</span>
        <span class="nav-label">${module.name}</span>
        <span class="nav-indicator" aria-hidden="true"></span>
      </button>
    `).join("");
  }

  function setActiveModule(id, updateHash) {
    const module = modules.find((item) => item.id === id && (!item.precisionOnly || shell.classList.contains("theme-precision"))) || modules[0];
    document.querySelectorAll(".nav-item").forEach((item) => {
      const active = item.dataset.moduleId === module.id;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-current", active ? "page" : "false");
    });

    pageTitles.forEach((title) => {
      title.textContent = module.name;
    });
    pageEyebrow.textContent = module.eyebrow;
    pageDescription.textContent = module.description;
    moduleCode.textContent = module.code;
    document.title = `${module.name} · 模塑记忆棉生产管理系统`;

    frameLabels.forEach((label, index) => {
      label.textContent = module.frames[index] || "工作区";
    });
    emptyTitles.forEach((title, index) => {
      title.textContent = module.frames[index] || "工作区";
    });
    const hasDedicatedWorkspace = [...moduleWorkspaces].some((workspace) => workspace.dataset.moduleWorkspace === module.id);
    moduleWorkspaces.forEach((workspace) => {
      workspace.hidden = workspace.dataset.moduleWorkspace !== module.id;
    });
    genericGrid.hidden = hasDedicatedWorkspace;

    document.body.dataset.module = module.id;
    if (updateHash) history.replaceState(null, "", `#${module.id}`);
    closeMobileSidebar();
  }

  function closeMobileSidebar() {
    shell.classList.remove("is-sidebar-open");
    mobileButton?.setAttribute("aria-expanded", "false");
  }

  function toggleCollapsed() {
    const collapsed = shell.classList.toggle("is-collapsed");
    collapseButton.setAttribute("aria-pressed", String(collapsed));
    collapseButton.innerHTML = icon(collapsed ? "panel-left-open" : "panel-left-close");
    collapseButton.setAttribute("data-tooltip", collapsed ? "展开侧栏" : "收起侧栏");
    localStorage.setItem("erp-sidebar-collapsed", String(collapsed));
  }

  function filterNavigation(value) {
    const term = value.trim().toLocaleLowerCase("zh-CN");
    let visible = 0;
    document.querySelectorAll(".nav-item").forEach((item) => {
      const match = item.textContent.toLocaleLowerCase("zh-CN").includes(term);
      item.hidden = !match;
      if (match) visible += 1;
    });
    if (searchCount) searchCount.textContent = term ? `${visible} 项` : "";
  }

  function updateClock() {
    if (!clock) return;
    const now = new Date();
    clock.textContent = new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now).replace("/", ".");
  }

  renderNavigation();
  renderIcons();
  setActiveModule(location.hash.slice(1) || "home", false);
  updateClock();
  setInterval(updateClock, 30000);

  if (localStorage.getItem("erp-sidebar-collapsed") === "true" && window.innerWidth > 900) {
    shell.classList.add("is-collapsed");
    collapseButton.innerHTML = icon("panel-left-open");
    collapseButton.setAttribute("data-tooltip", "展开侧栏");
    collapseButton.setAttribute("aria-pressed", "true");
  }

  nav.addEventListener("click", (event) => {
    const item = event.target.closest(".nav-item");
    if (item) setActiveModule(item.dataset.moduleId, true);
  });

  collapseButton?.addEventListener("click", toggleCollapsed);
  mobileButton?.addEventListener("click", () => {
    const open = shell.classList.toggle("is-sidebar-open");
    mobileButton.setAttribute("aria-expanded", String(open));
  });
  overlay?.addEventListener("click", closeMobileSidebar);
  search?.addEventListener("input", (event) => filterNavigation(event.target.value));
  window.addEventListener("hashchange", () => setActiveModule(location.hash.slice(1), false));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileSidebar();
  });
})();
