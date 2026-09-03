(function () {
  "use strict";

  const attractions = window.ATTRACTIONS || [];
  const profiles = window.PLAN_PROFILES || [];
  const approvedFoodCreators = new Set(["大祥哥来了", "大霸子来了", "特厨隋卞"]);
  const restaurants = (window.RESTAURANTS || []).filter((item) => approvedFoodCreators.has(item.video?.creator));
  const attractionById = new Map(attractions.map((item) => [item.id, item]));
  const restaurantById = new Map(restaurants.map((item) => [item.id, item]));
  const categoryOrder = ["全部", "古都", "园林", "博物馆", "长城", "亲子", "现代", "街区"];
  const paceRules = {
    early: { label: "特种兵", start: "06:30", end: "21:30", durationFactor: 0.75 },
    balanced: { label: "高效赶考", start: "07:20", end: "20:45", durationFactor: 0.86 },
    relaxed: { label: "松弛漫游", start: "08:30", end: "19:30", durationFactor: 1 }
  };
  const travelStyleRules = {
    saver: {
      label: "省钱侦察兵",
      note: "经济型住宿，优先低价餐馆与公共交通。",
      hotelLabel: "地铁沿线经济型",
      hotelLowFactor: 0.72,
      hotelHighFactor: 0.78,
      genericMealFactor: 0.78,
      localTransitFactor: 0.82,
      tierOrder: ["budget", "mid", "premium"]
    },
    value: {
      label: "精算课代表",
      note: "住宿、餐饮与市内交通保持性价比均衡。",
      hotelLabel: "通勤便利型",
      hotelLowFactor: 1,
      hotelHighFactor: 1,
      genericMealFactor: 1,
      localTransitFactor: 1,
      tierOrder: ["mid", "budget", "premium"]
    },
    premium: {
      label: "钞能力玩家",
      note: "高星或精品住宿，优先进阶餐馆并增加出租车预算。",
      hotelLabel: "高星或精品酒店",
      hotelLowFactor: 1.5,
      hotelHighFactor: 1.68,
      genericMealFactor: 1.28,
      localTransitFactor: 1.45,
      tierOrder: ["premium", "mid", "budget"]
    }
  };
  const visitRules = {
    "palace-museum": { open: "08:30", latestStart: "15:30", close: "17:00", mondayNotice: true },
    "national-museum": { open: "09:00", latestStart: "16:00", close: "17:30", mondayNotice: true },
    jingshan: { open: "06:00", latestStart: "20:00", close: "21:00" },
    "temple-heaven": { open: "08:00", latestStart: "17:00", close: "18:00" },
    "summer-palace": { open: "06:00", latestStart: "18:30", close: "20:00" },
    yuanmingyuan: { open: "07:00", latestStart: "18:00", close: "21:00" },
    beihai: { open: "06:00", latestStart: "19:00", close: "21:00" },
    "prince-gong": { open: "08:30", latestStart: "16:10", close: "17:00", mondayNotice: true },
    "lama-temple": { open: "09:00", latestStart: "16:30", close: "17:00" },
    badaling: { open: "06:30", latestStart: "15:30", close: "16:30" },
    mutianyu: { open: "07:30", latestStart: "17:00", close: "18:00" },
    "beijing-zoo": { open: "07:30", latestStart: "17:30", close: "19:00" },
    "art-798": { open: "10:00", latestStart: "17:00", close: "18:00", mondayNotice: true },
    universal: { open: "09:30", latestStart: "18:00", close: "20:00", dynamicHours: true },
    "tiananmen-rostrum": { open: "08:30", latestStart: "16:20", close: "17:00", mondayNotice: true },
    "mao-memorial": { open: "08:00", latestStart: "11:00", close: "12:00", mondayNotice: true, dynamicHours: true },
    "confucius-guozijian": { open: "08:30", latestStart: "17:00", close: "18:00", mondayNotice: true },
    "military-museum": { open: "08:30", latestStart: "16:00", close: "17:00", mondayNotice: true, dynamicHours: true },
    "science-museum": { open: "09:30", latestStart: "15:30", close: "17:00", mondayNotice: true },
    "natural-history": { open: "09:00", latestStart: "16:00", close: "17:00", mondayNotice: true },
    "archaeology-museum": { open: "09:00", latestStart: "15:30", close: "16:30", mondayNotice: true, dynamicHours: true },
    xiangshan: { open: "06:00", latestStart: "18:00", close: "19:30" },
    "ming-tombs": { open: "08:00", latestStart: "16:00", close: "17:30", dynamicHours: true },
    "grand-canal-museum": { open: "10:00", latestStart: "19:00", close: "20:00", mondayNotice: true, dynamicHours: true }
  };
  const officialFlagUrl = "https://tamgw.beijing.gov.cn/sy/sjqsj/";
  const officialFlag2026Url = "https://tamgw.beijing.gov.cn/sy/sjqsj/202512/t20251222_4356494.html";
  const officialFlagTimes2026 = {
    "2026-10-01": { raise: "06:10", lower: "17:58" },
    "2026-10-02": { raise: "06:11", lower: "17:56" },
    "2026-10-03": { raise: "06:12", lower: "17:54" },
    "2026-10-04": { raise: "06:13", lower: "17:53" },
    "2026-10-05": { raise: "06:14", lower: "17:51" },
    "2026-10-06": { raise: "06:15", lower: "17:50" },
    "2026-10-07": { raise: "06:16", lower: "17:48" }
  };

  const state = {
    view: "attractions",
    category: "全部",
    query: "",
    freeOnly: false,
    pace: "balanced",
    travelStyle: "value",
    members: [
      { id: "member-1", name: "成员1", gender: "male", age: 35 },
      { id: "member-2", name: "成员2", gender: "female", age: 33 },
      { id: "member-3", name: "成员3", gender: "male", age: 10 },
      { id: "member-4", name: "成员4", gender: "female", age: 6 }
    ],
    ages: [35, 33, 10, 6],
    arrivalDateTime: "2026-10-01T09:30",
    departureDateTime: "2026-10-05T18:00",
    startDate: "2026-10-01",
    days: 5,
    nights: 4,
    weather: [],
    weatherMode: "climate",
    plans: [],
    activePlanId: null,
    foodTier: "all",
    foodAuthor: "all",
    foodQuery: "",
    editorOpen: false,
    customDraft: null,
    customBasePlanId: null,
    customRequestAdvice: []
  };

  const els = {
    nav: Array.from(document.querySelectorAll(".nav-item")),
    views: Array.from(document.querySelectorAll(".view")),
    search: document.querySelector("#attraction-search"),
    categoryFilters: document.querySelector("#category-filters"),
    freeOnly: document.querySelector("#free-only"),
    clearFilters: document.querySelector("#clear-filters"),
    attractionGrid: document.querySelector("#attraction-grid"),
    attractionCount: document.querySelector("#attraction-count"),
    attractionEmpty: document.querySelector("#attraction-empty"),
    dialog: document.querySelector("#attraction-dialog"),
    dialogContent: document.querySelector("#dialog-content"),
    dialogClose: document.querySelector("#dialog-close"),
    plannerForm: document.querySelector("#planner-form"),
    teamMembers: document.querySelector("#team-members"),
    addTeamMember: document.querySelector("#add-team-member"),
    teamCount: document.querySelector("#team-count"),
    teamMessage: document.querySelector("#team-message"),
    arrivalDateTime: document.querySelector("#arrival-datetime"),
    departureDateTime: document.querySelector("#departure-datetime"),
    timeBindingStatus: document.querySelector("#time-binding-status"),
    tripDuration: document.querySelector("#trip-duration"),
    tripTimeMessage: document.querySelector("#trip-time-message"),
    paceMode: document.querySelector("#pace-mode"),
    travelStyleMode: document.querySelector("#travel-style-mode"),
    travelStyleNote: document.querySelector("#travel-style-note"),
    weatherStrip: document.querySelector("#weather-strip"),
    weatherBrief: document.querySelector("#weather-brief"),
    planSwitcher: document.querySelector("#plan-switcher"),
    planEditor: document.querySelector("#plan-editor"),
    planEditorBody: document.querySelector("#plan-editor-body"),
    togglePlanEditor: document.querySelector("#toggle-plan-editor"),
    adjustmentRequest: document.querySelector("#adjustment-request"),
    loadCurrentPlan: document.querySelector("#load-current-plan"),
    analyzeAdjustment: document.querySelector("#analyze-adjustment"),
    saveCustomPlan: document.querySelector("#save-custom-plan"),
    customDays: document.querySelector("#custom-days"),
    customAdviceCount: document.querySelector("#custom-advice-count"),
    customAdviceList: document.querySelector("#custom-advice-list"),
    planSheet: document.querySelector("#plan-sheet"),
    ticketPlanSelect: document.querySelector("#ticket-plan-select"),
    ticketList: document.querySelector("#ticket-list"),
    nextBookingDate: document.querySelector("#next-booking-date"),
    nextBookingName: document.querySelector("#next-booking-name"),
    downloadReminders: document.querySelector("#download-reminders"),
    printPlan: document.querySelector("#print-plan"),
    foodSearch: document.querySelector("#food-search"),
    foodPriceFilters: document.querySelector("#food-price-filters"),
    foodAuthorFilters: document.querySelector("#food-author-filters"),
    foodGrid: document.querySelector("#food-grid"),
    foodCount: document.querySelector("#food-count"),
    restaurantDialog: document.querySelector("#restaurant-dialog"),
    restaurantDialogContent: document.querySelector("#restaurant-dialog-content"),
    restaurantDialogClose: document.querySelector("#restaurant-dialog-close"),
    toast: document.querySelector("#toast")
  };

  let toastTimer = null;
  let planRefreshTimer = null;
  let planGenerationVersion = 0;
  let restaurantImageSourcesPromise = null;
  let customUid = 0;
  let memberSequence = 4;

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2600);
  }

  function genderLabel(value) {
    return { male: "男", female: "女", other: "其他", private: "不便说明" }[value] || "不便说明";
  }

  function renderTeamMembers(focusMemberId = null) {
    els.teamMembers.innerHTML = state.members.map((member, index) => `
      <section class="team-member" data-member-id="${member.id}" aria-label="团队成员${index + 1}">
        <header>
          <strong>成员 ${String(index + 1).padStart(2, "0")}</strong>
          <button class="icon-button" type="button" data-remove-member aria-label="删除${escapeHtml(member.name || `成员${index + 1}`)}" title="删除成员" ${state.members.length === 1 ? "disabled" : ""}>
            <i data-lucide="trash-2"></i>
          </button>
        </header>
        <label class="member-name"><span>姓名</span><input data-member-field="name" type="text" maxlength="20" value="${escapeHtml(member.name)}" placeholder="请输入姓名" autocomplete="off"></label>
        <div class="member-facts">
          <label><span>性别</span><select data-member-field="gender">
            ${[["male", "男"], ["female", "女"], ["other", "其他"], ["private", "不便说明"]].map(([value, label]) => `<option value="${value}" ${member.gender === value ? "selected" : ""}>${label}</option>`).join("")}
          </select></label>
          <label><span>年龄</span><input data-member-field="age" type="number" min="0" max="110" step="1" value="${member.age ?? ""}" placeholder="岁" inputmode="numeric"></label>
        </div>
      </section>`).join("");
    refreshIcons();
    if (focusMemberId) els.teamMembers.querySelector(`[data-member-id="${focusMemberId}"] [data-member-field="name"]`)?.focus();
  }

  function captureTeamState() {
    const rows = Array.from(els.teamMembers.querySelectorAll("[data-member-id]"));
    state.members = rows.map((row) => {
      const ageValue = row.querySelector('[data-member-field="age"]').value.trim();
      return {
        id: row.dataset.memberId,
        name: row.querySelector('[data-member-field="name"]').value.trim(),
        gender: row.querySelector('[data-member-field="gender"]').value,
        age: ageValue === "" ? null : Number(ageValue)
      };
    });
    rows.forEach((row, index) => {
      row.querySelector("[data-remove-member]")?.setAttribute("aria-label", `删除${state.members[index].name || `成员${index + 1}`}`);
    });
    const valid = state.members.length >= 1
      && state.members.length <= 20
      && state.members.every((member) => member.name && Number.isInteger(member.age) && member.age >= 0 && member.age <= 110);
    els.teamMessage.classList.toggle("is-error", !valid);
    els.teamCount.textContent = valid ? `${state.members.length}人` : "待补全";
    if (!valid) {
      els.teamMessage.textContent = "请为1—20名成员完整填写姓名与0—110岁的整数年龄。";
      return false;
    }
    state.ages = state.members.map((member) => member.age);
    const children = state.ages.filter((age) => age < 18).length;
    const seniors = state.ages.filter((age) => age >= 60).length;
    const adults = state.ages.length - children - seniors;
    els.teamMessage.textContent = `已添加${state.members.length}人：未成年人${children}人、成人${adults}人、老人${seniors}人。年龄用于票价与强度判断；性别仅用于住宿分房提醒。`;
    return true;
  }

  function teamRosterText() {
    return state.members.map((member) => `${member.name}（${genderLabel(member.gender)}，${member.age}岁）`).join("、");
  }

  function teamPlanningNote() {
    const children = state.ages.filter((age) => age < 12).length;
    const seniors = state.ages.filter((age) => age >= 60).length;
    const genderCounts = state.members.reduce((counts, member) => {
      counts[member.gender] = (counts[member.gender] || 0) + 1;
      return counts;
    }, {});
    const notes = [];
    if (children) notes.push(`含${children}名12岁以下儿童，凌晨候检和长距离步行需预留休息`);
    if (seniors) notes.push(`含${seniors}名60岁以上成员，优先保留电梯、短途交通与午间休息`);
    if (!children && !seniors) notes.push("成员年龄未触发儿童或老人专项节奏提醒");
    const genderParts = [["male", "男"], ["female", "女"], ["other", "其他"], ["private", "未说明"]]
      .filter(([value]) => genderCounts[value])
      .map(([value, label]) => `${label}${genderCounts[value]}人`);
    notes.push(`分房参考：${genderParts.join("、")}；系统不推断同住关系`);
    return `${notes.join("；")}。`;
  }

  function renderTravelStyleNote() {
    els.travelStyleNote.textContent = travelStyleRules[state.travelStyle].note;
  }

  function profileForTravelStyle(profile) {
    const rule = travelStyleRules[state.travelStyle];
    const hotelRange = [
      roundMoney(profile.hotelRange[0] * rule.hotelLowFactor, 10),
      roundMoney(profile.hotelRange[1] * rule.hotelHighFactor, 10)
    ];
    const hotelReason = state.travelStyle === "saver"
      ? `优先选择地铁站步行范围内的经济型酒店或家庭房；${profile.hotelReason}`
      : state.travelStyle === "premium"
        ? `优先选择同片区高星或精品酒店，并保留更灵活的出租车接驳；${profile.hotelReason}`
        : profile.hotelReason;
    return {
      ...profile,
      hotel: `${profile.hotel} · ${rule.hotelLabel}`,
      hotelReason,
      hotelRange
    };
  }

  function formatDuration(minutes) {
    if (minutes >= 540) return "1整天";
    const hours = minutes / 60;
    return Number.isInteger(hours) ? `${hours}小时` : `${hours.toFixed(1)}小时`;
  }

  function formatDate(date, includeYear = false) {
    const options = includeYear
      ? { year: "numeric", month: "2-digit", day: "2-digit" }
      : { month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("zh-CN", options).format(date);
  }

  function parseLocalDate(dateString) {
    return new Date(`${dateString}T12:00:00`);
  }

  function parseLocalDateTime(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(value));
    if (!match) return null;
    const date = new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
      Number(match[4]),
      Number(match[5]),
      0,
      0
    );
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function calendarDayDiff(start, end) {
    const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    return Math.round((endUtc - startUtc) / 86400000);
  }

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  function atLocalTime(date, clock) {
    const [hours, minutes] = clock.split(":").map(Number);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0);
  }

  function formatTime(date) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  function formatDateTime(date) {
    return `${formatDate(date)} ${formatTime(date)}`;
  }

  function addDays(date, amount) {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
  }

  function dateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function roundMoney(value, step = 10) {
    return Math.round(value / step) * step;
  }

  function formatMoney(value) {
    return `¥${Math.round(value).toLocaleString("zh-CN")}`;
  }

  function formatMoneyRange(low, high) {
    return `${formatMoney(low)}—${formatMoney(high)}`;
  }

  function switchView(viewName) {
    state.view = viewName;
    els.nav.forEach((button) => button.classList.toggle("is-active", button.dataset.view === viewName));
    els.views.forEach((section) => {
      const active = section.id === `view-${viewName}`;
      section.hidden = !active;
      section.classList.toggle("is-active", active);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderCategoryFilters() {
    const counts = attractions.reduce((result, item) => {
      result[item.category] = (result[item.category] || 0) + 1;
      return result;
    }, {});

    els.categoryFilters.innerHTML = categoryOrder.map((category) => {
      const count = category === "全部" ? attractions.length : counts[category] || 0;
      return `
        <button class="filter-button ${state.category === category ? "is-selected" : ""}" type="button" data-category="${category}">
          <span>${category}</span><span>${count}</span>
        </button>`;
    }).join("");
  }

  function renderAttractions() {
    const query = state.query.trim().toLowerCase();
    const filtered = attractions.filter((item) => {
      const categoryMatch = state.category === "全部" || item.category === state.category;
      const freeMatch = !state.freeOnly || item.prices.adult === 0;
      const haystack = [item.name, item.category, item.district, item.zone, item.address, item.summary, ...item.tags, ...item.highlights].join(" ").toLowerCase();
      return categoryMatch && freeMatch && (!query || haystack.includes(query));
    });

    els.attractionCount.textContent = String(filtered.length);
    els.attractionEmpty.hidden = filtered.length !== 0;
    els.attractionGrid.innerHTML = filtered.map((item) => `
      <article class="attraction-card">
        <button class="card-button" type="button" data-attraction-id="${item.id}" aria-label="查看${item.name}详情">
          <div class="card-image">
            <img src="${item.images[0]}" alt="${item.name}实景" loading="lazy" referrerpolicy="no-referrer">
            <span class="card-category">${item.category}</span>
          </div>
          <div class="card-body">
            <div class="card-title-row"><h3>${item.name}</h3><i data-lucide="arrow-up-right"></i></div>
            <p class="card-location">${item.district} · ${item.address}</p>
          </div>
          <div class="card-meta">
            <span><i data-lucide="clock-3"></i><strong>${formatDuration(item.duration)}</strong></span>
            <span><i data-lucide="ticket"></i><strong>${item.priceLabel}</strong></span>
          </div>
        </button>
      </article>
    `).join("");
    refreshIcons();
  }

  function renderFoodFilters() {
    const filters = [
      ["all", "全部价位"],
      ["budget", "¥ 小吃"],
      ["mid", "¥¥ 正餐"],
      ["premium", "¥¥¥ 进阶"]
    ];
    els.foodPriceFilters.innerHTML = filters.map(([value, label]) => `
      <button class="food-filter ${state.foodTier === value ? "is-selected" : ""}" type="button" data-food-tier="${value}">${label}</button>
    `).join("");
    const authorCounts = restaurants.reduce((counts, item) => {
      const creator = item.video?.creator || "";
      if (creator === "大祥哥来了") counts.daxiang += 1;
      else if (creator === "大霸子来了") counts.daba += 1;
      else if (creator === "特厨隋卞") counts.suibian += 1;
      return counts;
    }, { all: restaurants.length, daxiang: 0, daba: 0, suibian: 0 });
    const authorFilters = [["all", "全部来源"], ["daxiang", "大祥哥来了"], ["daba", "大霸子来了"], ["suibian", "特厨隋卞"]];
    els.foodAuthorFilters.innerHTML = authorFilters.map(([value, label]) => `
      <button class="food-filter ${state.foodAuthor === value ? "is-selected" : ""}" type="button" data-food-author="${value}">${label} ${authorCounts[value]}</button>
    `).join("");
  }

  function restaurantImageFiles(item) {
    return [1, 2].map((index) => `assets/restaurants/${item.id}/${item.id}-${index}.jpg`);
  }

  function restaurantImages(item) {
    const remoteImages = window.RESTAURANT_IMAGE_URLS?.[item.id];
    return Array.isArray(remoteImages) && remoteImages.length >= 2
      ? remoteImages.slice(0, 2)
      : restaurantImageFiles(item);
  }

  function loadRestaurantImageSources() {
    if (!restaurantImageSourcesPromise) {
      restaurantImageSourcesPromise = Promise.all([
        fetch("assets/restaurants/restaurant-image-credits.json").then((response) => response.json()),
        fetch("assets/restaurants/restaurant-image-replacements.json").then((response) => response.json())
      ]).then(([credits, replacements]) => {
        const sources = new Map();
        [...credits, ...replacements].forEach((entry) => sources.set(entry.file, entry));
        return sources;
      });
    }
    return restaurantImageSourcesPromise;
  }

  async function hydrateRestaurantImageSources(item, container) {
    try {
      const sources = await loadRestaurantImageSources();
      if (!container.isConnected) return;
      container.innerHTML = restaurantImageFiles(item).map((file, index) => {
        const source = sources.get(file);
        if (!source?.page) return `<span>配图${index + 1}：来源待补充</span>`;
        const label = source.title || source.videoTitle || `配图${index + 1}来源页面`;
        return `<a href="${escapeHtml(source.page)}" target="_blank" rel="noopener noreferrer"><i data-lucide="image"></i><span>配图${index + 1}</span><small>${escapeHtml(label)}</small></a>`;
      }).join("");
      refreshIcons();
    } catch (error) {
      container.textContent = "配图来源台账暂未载入；公开发布前须逐张复核。";
    }
  }

  function renderRestaurants() {
    const query = state.foodQuery.trim().toLowerCase();
    const filtered = restaurants.filter((item) => {
      const tierMatch = state.foodTier === "all" || item.tier === state.foodTier;
      const creator = item.video?.creator || "";
      const authorMatch = state.foodAuthor === "all"
        || (state.foodAuthor === "daxiang" && creator === "大祥哥来了")
        || (state.foodAuthor === "daba" && creator === "大霸子来了")
        || (state.foodAuthor === "suibian" && creator === "特厨隋卞");
      const haystack = [item.name, item.district, item.zone, item.address, item.style, item.description, ...item.dishes].join(" ").toLowerCase();
      return tierMatch && authorMatch && (!query || haystack.includes(query));
    });
    els.foodCount.textContent = String(filtered.length);
    els.foodGrid.innerHTML = filtered.map((item) => {
      const images = restaurantImages(item);
      return `<article class="food-card ${item.tier}">
        <button class="food-card-button" type="button" data-restaurant-id="${item.id}" aria-label="查看${item.name}详情">
          <div class="food-card-image"><img src="${images[0]}" alt="${item.name}门店或菜品" loading="lazy" referrerpolicy="no-referrer"><span>${item.style}</span></div>
          <div class="food-card-content">
            <div class="food-card-topline"><span>${item.district}</span><strong>${item.tierLabel} · ${formatMoneyRange(...item.price)}/人</strong></div>
            <h3>${item.name}</h3>
            <p class="food-location"><i data-lucide="map-pin"></i>${item.district} · ${item.address}</p>
            <p class="food-description">${item.description}</p>
            <div class="dish-list">${item.dishes.slice(0, 4).map((dish) => `<span>${dish}</span>`).join("")}</div>
            <div class="food-card-footer">
              <span><i data-lucide="clock-3"></i>${item.duration}分钟</span>
              <span><i data-lucide="play-circle"></i>${item.video ? item.video.creator : "事实资料"}</span>
              <i data-lucide="arrow-up-right"></i>
            </div>
          </div>
        </button>
      </article>`;
    }).join("");
    refreshIcons();
  }

  function openRestaurant(id) {
    const item = restaurantById.get(id);
    if (!item) return;
    const images = restaurantImages(item);
    els.restaurantDialogContent.innerHTML = `
      <div class="restaurant-gallery">${images.map((src, index) => `<img src="${src}" alt="${item.name}配图${index + 1}" referrerpolicy="no-referrer">`).join("")}</div>
      <div class="restaurant-detail-head ${item.tier}">
        <p class="section-kicker">${item.style.toUpperCase()}</p>
        <h2>${item.name}</h2>
        <p><i data-lucide="map-pin"></i>${item.district} · ${item.address}</p>
        <strong>${formatMoneyRange(...item.price)}/人</strong>
      </div>
      <div class="restaurant-detail-body">
        <div>
          <h3>推荐菜</h3>
          <div class="restaurant-dishes">${item.dishes.map((dish) => `<span>${dish}</span>`).join("")}</div>
          <p>${item.description}</p>
          <div class="restaurant-constraint"><i data-lucide="triangle-alert"></i><span>${item.constraint}</span></div>
        </div>
        <aside class="restaurant-sources">
          <span>资料核验 · 2026-09-03</span>
          <a href="${item.fact.url}" target="_blank" rel="noopener noreferrer"><i data-lucide="badge-check"></i><strong>事实来源</strong><small>${item.fact.label}</small></a>
          ${item.video ? `<a href="${item.video.url}" target="_blank" rel="noopener noreferrer"><i data-lucide="play-circle"></i><strong>视频参考</strong><small>${item.video.creator} · ${item.video.title}</small></a>` : `<div class="source-empty">暂无可靠单店视频，保留事实来源。</div>`}
          <div class="restaurant-image-sources" data-image-source-list><span>正在载入2张配图的来源…</span></div>
          <p>视频反映拍摄当时的个人体验，不代表当前价格、营业状态或稳定出品。</p>
          <p>配图为视频封面或公开资料图，仅用于本地行程原型；公开部署前须逐张确认授权。</p>
        </aside>
      </div>`;
    els.restaurantDialog.showModal();
    hydrateRestaurantImageSources(item, els.restaurantDialogContent.querySelector("[data-image-source-list]"));
    refreshIcons();
  }

  function openAttraction(id) {
    const item = attractionById.get(id);
    if (!item) return;

    els.dialogContent.innerHTML = `
      <div class="dialog-gallery" aria-label="${item.name}四图相册">
        ${item.images.map((src, index) => `<figure><img src="${src}" alt="${item.name}实景图${index + 1}" referrerpolicy="no-referrer"></figure>`).join("")}
      </div>
      <div class="dialog-content-body">
        <div>
          <div class="dialog-title-line">
            <h2>${item.name}</h2><span class="dialog-price">${item.priceLabel}</span>
          </div>
          <p class="dialog-location"><i data-lucide="map-pin"></i>${item.district} · ${item.address} · ${formatDuration(item.duration)}</p>
          <p class="dialog-summary">${item.summary}</p>
          <div class="highlight-list">${item.highlights.map((highlight) => `<span>${highlight}</span>`).join("")}</div>
          <p class="dialog-play">${item.play}</p>
        </div>
        <aside class="dialog-booking">
          <span>${item.booking.kind === "urgent" ? "RESERVATION REQUIRED" : "TICKETING"}</span>
          <h3>${item.booking.channel}</h3>
          <p>${item.booking.rule}</p>
          <a class="secondary-button" href="${item.booking.url}" target="_blank" rel="noopener noreferrer">
            <i data-lucide="external-link"></i>打开官方入口
          </a>
          ${item.booking.miniProgram ? `<button class="secondary-button copy-mini" type="button" data-copy="${item.booking.miniProgram}"><i data-lucide="copy"></i>复制小程序名称</button>` : ""}
        </aside>
      </div>`;

    els.dialog.showModal();
    refreshIcons();
  }

  function syncTripRange() {
    const arrival = parseLocalDateTime(els.arrivalDateTime.value);
    const departure = parseLocalDateTime(els.departureDateTime.value);
    els.departureDateTime.min = els.arrivalDateTime.value;
    let error = "";

    if (!arrival || !departure) {
      error = "请完整填写到京和离京时间。";
    } else if (departure <= arrival) {
      error = "离京时间必须晚于到京时间。";
    }

    const nights = error ? 0 : calendarDayDiff(arrival, departure);
    const days = nights + 1;
    if (!error && days > 7) error = "当前路线模板最多支持7个自然日，请缩短时间范围。";

    els.tripDuration.textContent = error ? "时间待修正" : `${days}天${nights}晚`;
    els.tripTimeMessage.classList.toggle("is-error", Boolean(error));

    if (error) {
      els.tripTimeMessage.textContent = error;
      return false;
    }

    const totalMinutes = Math.round((departure - arrival) / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    els.timeBindingStatus.textContent = "自动计算";
    els.tripTimeMessage.textContent = `共${hours}小时${minutes ? `${minutes}分钟` : ""} · 到京时间为可开始市内行程的时间，离京时间为活动截止时间。`;

    state.arrivalDateTime = els.arrivalDateTime.value;
    state.departureDateTime = els.departureDateTime.value;
    state.startDate = dateKey(arrival);
    state.days = days;
    state.nights = nights;
    return true;
  }

  function transportOptionRow(title, status, detail, tone = "neutral") {
    return `<div class="transport-option-row ${tone}"><div><strong>${title}</strong><span>${detail}</span></div><em>${status}</em></div>`;
  }

  function selectedTransportRecord(leg, mode = state.transportMode) {
    if (!state.transportRecords[mode]) return null;
    const selectedId = state.selectedTransport[mode]?.[leg];
    return state.transportRecords[mode][leg].find((record) => record.id === selectedId) || null;
  }

  function ticketSaleState(travelDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const travel = new Date(travelDate);
    travel.setHours(0, 0, 0, 0);
    const saleDate = addDays(travel, -14);
    if (travel < today) return { label: "日期已过", tone: "blocked" };
    if (saleDate > today) return { label: `${formatDate(saleDate, true)}开售`, tone: "pending" };
    return { label: "已进入15日预售窗口", tone: "available" };
  }

  function inventoryTone(value) {
    if (value === "充足") return "available";
    if (["紧张", "候补"].includes(value)) return "pending";
    if (value === "无票") return "blocked";
    return "unknown";
  }

  function ticketEntryForm(mode, leg, origin, destination) {
    const config = ticketModeConfig[mode];
    const outbound = leg === "outbound";
    const fromPlaceholder = outbound ? origin : mode === "rail" ? "北京南" : "北京首都 / 大兴";
    const toPlaceholder = outbound ? mode === "rail" ? "北京南" : "北京首都 / 大兴" : destination;
    return `
      <details class="ticket-entry" data-ticket-entry="${leg}">
        <summary><i data-lucide="plus"></i>录入${outbound ? "去程" : "返程"}${mode === "rail" ? "车次" : "航班"}</summary>
        <div class="ticket-entry-fields">
          <label><span>${config.serviceLabel}</span><input data-ticket-field="serviceNo" type="text" placeholder="${mode === "rail" ? "例如 G2" : "例如 CA1502"}"></label>
          <label><span>${config.fromLabel}</span><input data-ticket-field="from" type="text" placeholder="${fromPlaceholder}"></label>
          <label><span>${config.toLabel}</span><input data-ticket-field="to" type="text" placeholder="${toPlaceholder}"></label>
          <label><span>${config.departLabel}</span><input data-ticket-field="departAt" type="datetime-local" step="60"></label>
          <label><span>${config.arriveLabel}</span><input data-ticket-field="arriveAt" type="datetime-local" step="60"></label>
          <label><span>${config.priceLabel}</span><input data-ticket-field="price" type="number" min="0" step="0.01" placeholder="元/人"></label>
          <label><span>${config.inventoryLabel}</span><select data-ticket-field="availability"><option>未知</option><option>充足</option><option>紧张</option>${mode === "rail" ? "<option>候补</option>" : ""}<option>无票</option></select></label>
        </div>
        <button class="secondary-button ticket-save" type="button" data-save-ticket="${leg}"><i data-lucide="check"></i>保存并采用</button>
        <p class="ticket-entry-message" aria-live="polite"></p>
      </details>`;
  }

  function renderTicketRecord(record, mode, leg, selectedId) {
    const config = ticketModeConfig[mode];
    const selected = record.id === selectedId;
    return `
      <article class="ticket-record ${selected ? "is-selected" : ""}">
        <div class="ticket-record-head"><strong>${escapeHtml(record.serviceNo)}</strong><span class="inventory ${inventoryTone(record.availability)}">${escapeHtml(record.availability)}</span></div>
        <div class="ticket-record-route"><b>${escapeHtml(record.from)}</b><i data-lucide="arrow-right"></i><b>${escapeHtml(record.to)}</b></div>
        <div class="ticket-record-data">
          <span><small>${config.departLabel}</small><strong>${formatDateTime(parseLocalDateTime(record.departAt))}</strong></span>
          <span><small>${config.arriveLabel}</small><strong>${formatDateTime(parseLocalDateTime(record.arriveAt))}</strong></span>
          <span><small>${config.priceLabel}</small><strong>${formatMoney(record.price)}/人</strong></span>
          <span><small>记录来源</small><strong>用户录入 · ${escapeHtml(record.capturedAt)}</strong></span>
        </div>
        <div class="ticket-record-actions">
          <button class="text-button" type="button" data-select-ticket="${record.id}" data-leg="${leg}">${selected ? '<i data-lucide="circle-check"></i>已采用' : '<i data-lucide="mouse-pointer-click"></i>采用'}</button>
          <button class="icon-button" type="button" data-remove-ticket="${record.id}" data-leg="${leg}" aria-label="删除${escapeHtml(record.serviceNo)}" title="删除"><i data-lucide="trash-2"></i></button>
        </div>
      </article>`;
  }

  function transportLegPanel(mode, leg, travelDate, origin, destination) {
    const records = state.transportRecords[mode][leg];
    const selectedId = state.selectedTransport[mode][leg];
    const selectedRecord = records.find((record) => record.id === selectedId);
    const outbound = leg === "outbound";
    const effectiveTravelDate = selectedRecord ? parseLocalDateTime(selectedRecord.departAt) : travelDate;
    const status = mode === "rail" ? ticketSaleState(effectiveTravelDate) : { label: "前往航司实时查询", tone: "available" };
    return `
      <section class="transport-leg-panel">
        <div class="transport-leg-head">
          <div><span>${outbound ? "去程" : "返程"}候选</span><strong>${outbound ? `${origin} → 北京` : `北京 → ${destination}`}</strong></div>
          <em class="${status.tone}">${status.label}</em>
        </div>
        <div class="ticket-record-list">
          ${records.length ? records.map((record) => renderTicketRecord(record, mode, leg, selectedId)).join("") : `<div class="ticket-record-empty"><i data-lucide="ticket-x"></i><span>暂无已核验${mode === "rail" ? "车次" : "航班"}；从官方页面查询后在下方录入。</span></div>`}
        </div>
        ${ticketEntryForm(mode, leg, origin, destination)}
      </section>`;
  }

  function updateTimeBindingLabels() {
    if (state.transportMode === "drive") {
      els.arrivalTimeLabel.textContent = "抵达北京时间";
      els.departureTimeLabel.textContent = "驶离北京或酒店时间";
      els.timeBindingStatus.textContent = "自驾时间";
      return;
    }
    const outbound = selectedTransportRecord("outbound");
    const returnTrip = selectedTransportRecord("return");
    els.arrivalTimeLabel.textContent = outbound ? `${outbound.serviceNo} 到达${outbound.to}` : "计划到京时间";
    els.departureTimeLabel.textContent = returnTrip ? `${returnTrip.serviceNo} 从${returnTrip.from}出发` : "计划离京时间";
    els.timeBindingStatus.textContent = outbound && returnTrip ? "已绑定往返票单" : outbound || returnTrip ? "已绑定单程票单" : "未绑定票单";
  }

  function renderTransportOptions() {
    const arrival = parseLocalDateTime(els.arrivalDateTime.value);
    const departure = parseLocalDateTime(els.departureDateTime.value);
    const origin = escapeHtml(els.origin.value.trim() || "出发地");
    const destination = escapeHtml(els.returnCity.value.trim() || "返回地");
    if (!arrival || !departure || departure <= arrival) {
      els.transportOptions.innerHTML = '<div class="transport-options-empty">完善到京、离京时间后显示往返方案。</div>';
      updateTimeBindingLabels();
      return;
    }

    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    let content = "";
    let links = [];

    if (state.transportMode === "rail") {
      content = `
        <div class="transport-options-head"><div><span>铁路班次工作台</span><strong>${origin} → 北京 → ${destination}</strong></div><small>二等座口径</small></div>
        <div class="transport-live-note"><i data-lucide="shield-check"></i><span>12306当前预售期为15天。本站不跨站抓取或伪造实时余票；请在官方余票页核对后录入，记录将驱动实际到离京时间。</span></div>
        ${transportLegPanel("rail", "outbound", arrivalDate, origin, destination)}
        ${transportLegPanel("rail", "return", departureDate, origin, destination)}`;
      links = [
        ["https://hzfw.12306.cn/zgzfw/resources/web/ypcx.html", "12306官方余票查询"],
        ["https://www.12306.cn/index/view/infos/sale_time.html", "查询起售时间"]
      ];
    } else if (state.transportMode === "air") {
      content = `
        <div class="transport-options-head"><div><span>航班工作台</span><strong>${origin} → 北京 → ${destination}</strong></div><small>经济舱口径</small></div>
        <div class="transport-live-note"><i data-lucide="shield-check"></i><span>航司票价与座位状态会随查询变化。请从航司支付页核对后录入；落地与起飞时间将直接用于行程接驳。</span></div>
        ${transportLegPanel("air", "outbound", arrivalDate, origin, destination)}
        ${transportLegPanel("air", "return", departureDate, origin, destination)}`;
      links = [
        ["https://www.airchina.com.cn/", "中国国航"],
        ["https://m.ceair.com/Home?linkPgae=0", "中国东航"],
        ["https://flights.ctrip.com/", "航班比价"]
      ];
    } else {
      content = `
        <div class="transport-options-head"><div><span>自驾往返方案</span><strong>${origin} → 北京 → ${destination}</strong></div><small>临行按实时路况重算</small></div>
        ${transportOptionRow("前一日分段住宿", "推荐", `${formatDate(previousDate)}出发，中途休息后按${formatTime(arrival)}抵达酒店。`, "recommended")}
        ${transportOptionRow("双司机轮换", "高强度", "必须预留服务区休息、加油/充电和国庆拥堵时间。")}
        ${transportOptionRow("当日临时出发", "不建议", `长距离路线通常无法保证${formatTime(arrival)}抵达，禁止按纯驾驶时间硬排。`, "blocked")}
        ${transportOptionRow("返程自驾", `${formatDate(departureDate)} ${formatTime(departure)}`, `从北京驶向${destination}，临行重算拥堵、服务区和充电/加油计划。`)}`;
      links = [
        ["https://ditu.amap.com/", "高德实时路线"],
        ["https://map.baidu.com/", "百度地图"]
      ];
    }

    els.transportOptions.innerHTML = `${content}<div class="transport-option-actions">${links.map(([url, label]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}<i data-lucide="external-link"></i></a>`).join("")}</div><p>${state.transportMode === "drive" ? "自驾时间按实际抵达和驶离时间填写。" : "票价和余票均为用户按官方查询结果录入的快照，不是本站实时售票承诺；支付前须再次核验。"}</p>`;
    updateTimeBindingLabels();
    refreshIcons();
  }

  function adoptTransportRecord(mode, leg, recordId) {
    const record = state.transportRecords[mode]?.[leg]?.find((item) => item.id === recordId);
    if (!record) return;
    state.selectedTransport[mode][leg] = recordId;
    if (mode === state.transportMode) {
      if (leg === "outbound") els.arrivalDateTime.value = record.arriveAt;
      else els.departureDateTime.value = record.departAt;
      syncTripRange();
      renderTransportOptions();
      schedulePlanRegeneration();
    }
  }

  function saveTransportRecord(button) {
    const mode = state.transportMode;
    if (!ticketModeConfig[mode]) return;
    const leg = button.dataset.saveTicket;
    const entry = button.closest("[data-ticket-entry]");
    const values = Object.fromEntries(Array.from(entry.querySelectorAll("[data-ticket-field]")).map((field) => [field.dataset.ticketField, field.value.trim()]));
    const departAt = parseLocalDateTime(values.departAt);
    const arriveAt = parseLocalDateTime(values.arriveAt);
    const price = Number(values.price);
    const message = entry.querySelector(".ticket-entry-message");
    if (!values.serviceNo || !values.from || !values.to || !departAt || !arriveAt || arriveAt <= departAt || !Number.isFinite(price) || price <= 0) {
      message.textContent = "请完整填写班次、站点、时间和票价；到达时间必须晚于出发时间。";
      message.classList.add("is-error");
      return;
    }
    const record = {
      id: `${mode}-${leg}-${Date.now()}`,
      serviceNo: values.serviceNo.toUpperCase(),
      from: values.from,
      to: values.to,
      departAt: values.departAt,
      arriveAt: values.arriveAt,
      price,
      availability: values.availability || "未知",
      capturedAt: new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())
    };
    state.transportRecords[mode][leg].push(record);
    adoptTransportRecord(mode, leg, record.id);
    showToast(`${record.serviceNo}已保存并采用。`);
  }

  function clearTransportBindingIfChanged(leg) {
    const record = selectedTransportRecord(leg);
    if (!record) return;
    const currentValue = leg === "outbound" ? els.arrivalDateTime.value : els.departureDateTime.value;
    const ticketValue = leg === "outbound" ? record.arriveAt : record.departAt;
    if (currentValue !== ticketValue) state.selectedTransport[state.transportMode][leg] = null;
  }

  function handleTransportOptionClick(event) {
    const saveButton = event.target.closest("[data-save-ticket]");
    if (saveButton) {
      saveTransportRecord(saveButton);
      return;
    }
    const selectButton = event.target.closest("[data-select-ticket]");
    if (selectButton) {
      adoptTransportRecord(state.transportMode, selectButton.dataset.leg, selectButton.dataset.selectTicket);
      return;
    }
    const removeButton = event.target.closest("[data-remove-ticket]");
    if (!removeButton || !state.transportRecords[state.transportMode]) return;
    const leg = removeButton.dataset.leg;
    const recordId = removeButton.dataset.removeTicket;
    state.transportRecords[state.transportMode][leg] = state.transportRecords[state.transportMode][leg].filter((record) => record.id !== recordId);
    if (state.selectedTransport[state.transportMode][leg] === recordId) state.selectedTransport[state.transportMode][leg] = null;
    renderTransportOptions();
  }

  function collectFormState() {
    return captureTeamState() && syncTripRange();
  }

  function haversineKm(a, b) {
    const rad = (degrees) => degrees * Math.PI / 180;
    const earthRadius = 6371;
    const dLat = rad(b.lat - a.lat);
    const dLon = rad(b.lon - a.lon);
    const lat1 = rad(a.lat);
    const lat2 = rad(b.lat);
    const value = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  }

  async function fetchWithTimeout(url, timeoutMs = 6000) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { signal: controller.signal });
    } finally {
      window.clearTimeout(timer);
    }
  }

  async function geocodePlace(name) {
    const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=zh&format=json`;
    const response = await fetchWithTimeout(endpoint);
    if (!response.ok) throw new Error("geocoding failed");
    const data = await response.json();
    if (!data.results?.length) throw new Error("place not found");
    return { lat: data.results[0].latitude, lon: data.results[0].longitude };
  }

  async function estimateIntercity() {
    const outbound = selectedTransportRecord("outbound");
    const returnTrip = selectedTransportRecord("return");
    if (state.transportMode !== "drive" && outbound && returnTrip) {
      const total = roundMoney((outbound.price + returnTrip.price) * state.ages.length, 10);
      return {
        low: total,
        high: total,
        label: `已选${ticketModeConfig[state.transportMode].seatName}票价按${state.ages.length}人全价估算，未自动扣除儿童优惠`
      };
    }
    const beijing = { lat: 39.9042, lon: 116.4074 };
    let distanceOut = 1000;
    let distanceBack = 1000;
    let modelLabel = "默认1000公里距离模型";

    try {
      const originPoint = await geocodePlace(state.origin);
      const returnPoint = state.returnCity === state.origin ? originPoint : await geocodePlace(state.returnCity);
      distanceOut = haversineKm(originPoint, beijing);
      distanceBack = haversineKm(beijing, returnPoint);
      modelLabel = `按约${Math.round(distanceOut + distanceBack)}公里估算`;
    } catch (error) {
      modelLabel = "地点解析失败，按往返2000公里估算";
    }

    const people = state.ages.length;
    let base;
    if (state.transportMode === "air") {
      const perPerson = Math.max(450, 360 + distanceOut * 0.28) + Math.max(450, 360 + distanceBack * 0.28);
      base = perPerson * people;
    } else if (state.transportMode === "drive") {
      base = (distanceOut + distanceBack) * 0.78 + state.days * 100;
    } else {
      base = (distanceOut + distanceBack) * 0.5 * people;
    }

    return {
      low: roundMoney(base * 0.85, 50),
      high: roundMoney(base * 1.18, 50),
      label: modelLabel
    };
  }

  const weatherDescriptions = {
    0: "晴", 1: "晴间多云", 2: "多云", 3: "阴",
    45: "雾", 48: "雾凇", 51: "小雨", 53: "小雨", 55: "中雨",
    61: "小雨", 63: "中雨", 65: "大雨", 71: "小雪", 73: "中雪",
    80: "阵雨", 81: "阵雨", 82: "强阵雨", 95: "雷雨"
  };

  function seasonalWeather(date) {
    const month = date.getMonth() + 1;
    const presets = {
      9: { max: 27, min: 16, rain: 20, wind: 18, description: "初秋偏暖" },
      10: { max: 20, min: 9, rain: 15, wind: 20, description: "晴朗偏干" },
      11: { max: 10, min: 1, rain: 8, wind: 24, description: "干冷多风" }
    };
    return { date: dateKey(date), ...(presets[month] || { max: 22, min: 10, rain: 20, wind: 18, description: "季节参考" }), source: "climate" };
  }

  async function loadWeather() {
    const start = parseLocalDate(state.startDate);
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const daysAway = Math.floor((start - today) / 86400000);
    const seasonal = Array.from({ length: state.days }, (_, index) => seasonalWeather(addDays(start, index)));

    if (daysAway < 0 || daysAway > 15) {
      state.weatherMode = "climate";
      return seasonal;
    }

    try {
      const endpoint = "https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Asia%2FShanghai&forecast_days=16";
      const response = await fetchWithTimeout(endpoint);
      if (!response.ok) throw new Error("weather failed");
      const data = await response.json();
      const byDate = new Map(data.daily.time.map((day, index) => [day, {
        date: day,
        max: Math.round(data.daily.temperature_2m_max[index]),
        min: Math.round(data.daily.temperature_2m_min[index]),
        rain: Math.round(data.daily.precipitation_probability_max[index] || 0),
        wind: Math.round(data.daily.wind_speed_10m_max[index] || 0),
        description: weatherDescriptions[data.daily.weather_code[index]] || "天气变化",
        source: "forecast"
      }]));
      state.weatherMode = "forecast";
      return seasonal.map((fallback) => byDate.get(fallback.date) || fallback);
    } catch (error) {
      state.weatherMode = "climate";
      return seasonal;
    }
  }

  function overallWeatherAdvice() {
    if (state.weatherMode === "climate") {
      return "距出发超过16天，当前展示北京同期气候参考；进入预报窗口后会自动读取逐日天气。";
    }
    const rainy = state.weather.some((day) => day.rain >= 45);
    const windy = state.weather.some((day) => day.wind >= 30);
    const cold = state.weather.some((day) => day.min <= 8);
    if (windy) return "预报含大风时段，长城、索道和高空项目可能调整，请在出发前复核景区公告。";
    if (rainy) return "预报含降雨时段，优先把国博等室内项目放在雨天，并准备防滑鞋和轻便雨具。";
    if (cold) return "昼夜温差较大，早看升旗和晚看夜景需加外套。";
    return "天气总体适合步行，长时间户外仍需防晒、补水，并关注临近48小时更新。";
  }

  function renderWeather() {
    const leadTitle = state.weatherMode === "forecast" ? "北京逐日预报" : "北京季节参考";
    const leadDetail = state.weatherMode === "forecast" ? "Open-Meteo · 自动更新" : "超出16日预报窗口";
    els.weatherStrip.style.gridTemplateColumns = `minmax(180px, 1.2fr) repeat(${state.weather.length}, minmax(92px, 1fr))`;
    els.weatherStrip.innerHTML = `
      <div class="weather-lead"><strong>${leadTitle}</strong><small>${leadDetail}</small></div>
      ${state.weather.map((day, index) => `
        <div class="weather-day">
          <time>${formatDate(parseLocalDate(day.date))} · D${index + 1}</time>
          <strong>${day.min}°—${day.max}°</strong>
          <small>${day.description} · 降水${day.rain}%</small>
        </div>`).join("")}`;

    const first = state.weather[0];
    els.weatherBrief.innerHTML = `
      <i data-lucide="${state.weatherMode === "forecast" ? "cloud-sun" : "calendar-clock"}"></i>
      <span><strong>${first ? `${first.min}°—${first.max}°` : "北京"}</strong><small>${state.weatherMode === "forecast" ? "逐日预报" : "季节参考"}</small></span>`;
    refreshIcons();
  }

  function transitBetween(from, to) {
    if (!from || !to) return { minutes: 0, label: "" };
    if (from.zone === to.zone) return { minutes: 22, label: "步行或短途地铁" };
    if (new Set([from.zone, to.zone]).has("东城") && new Set([from.zone, to.zone]).has("通州")) return { minutes: 50, label: "地铁7号线" };
    if (to.zone === "延庆" || from.zone === "延庆") return { minutes: 105, label: "京张高铁 + 景区接驳" };
    if (to.zone === "怀柔" || from.zone === "怀柔") return { minutes: 120, label: "旅游专线 / 公交接驳" };
    if (to.zone === "昌平" || from.zone === "昌平") return { minutes: 120, label: "地铁昌平线 + 景区接驳" };
    if (to.zone === "通州" || from.zone === "通州") return { minutes: 65, label: "地铁7号线或1号线" };
    if (new Set([from.zone, to.zone]).has("西郊")) return { minutes: 48, label: "地铁4号线换乘" };
    if (new Set([from.zone, to.zone]).has("东北城")) return { minutes: 42, label: "地铁换乘" };
    if (new Set([from.zone, to.zone]).has("北城")) return { minutes: 38, label: "地铁8号线换乘" };
    return { minutes: 32, label: "地铁 + 步行" };
  }

  function buildSegmentTimeline(startAt, segments) {
    let cursor = new Date(startAt);
    return segments.map(([label, minutes]) => {
      const segment = { label, minutes, startAt: cursor, endAt: addMinutes(cursor, minutes) };
      cursor = segment.endAt;
      return segment;
    });
  }

  function departureSegmentsFor(rule, departureAt) {
    const clockMinutes = departureAt.getHours() * 60 + departureAt.getMinutes();
    return clockMinutes >= 17 * 60 + 30 && rule.dinnerDepartureSegments
      ? rule.dinnerDepartureSegments
      : rule.departureSegments;
  }

  function buildJourneyWindow(profile) {
    const arrivalAt = parseLocalDateTime(state.arrivalDateTime);
    const departureAt = parseLocalDateTime(state.departureDateTime);
    return {
      hotel: profile.hotel,
      arrival: {
        startAt: arrivalAt,
        endAt: arrivalAt
      },
      departure: {
        startAt: departureAt,
        endAt: departureAt,
        dinnerWindow: null
      }
    };
  }

  function hotelTransit(profile, attraction, reverse = false) {
    const hotel = { zone: profile.hotelZone || "中轴线" };
    return reverse ? transitBetween(attraction, hotel) : transitBetween(hotel, attraction);
  }

  function buildFlagInfo(date, profile, journey) {
    const fallback = atLocalTime(date, "06:10");
    const calculated = window.SunCalc?.getTimes(atLocalTime(date, "12:00"), 39.9033, 116.3913)?.sunrise;
    const official = officialFlagTimes2026[dateKey(date)];
    const sunrise = official
      ? atLocalTime(date, official.raise)
      : calculated instanceof Date && !Number.isNaN(calculated.getTime())
        ? new Date(Math.round(calculated.getTime() / 60000) * 60000)
        : fallback;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const isGoldenWeek = month === 10 && day >= 1 && day <= 7;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const queueLeadMinutes = isGoldenWeek ? 120 : isWeekend ? 90 : 75;
    const queueAt = addMinutes(sunrise, -queueLeadMinutes);
    const attraction = attractionById.get("tiananmen");
    const hotelCommute = hotelTransit(profile, attraction);
    const hotelDepartAt = addMinutes(queueAt, -hotelCommute.minutes);
    const arrivalWindowFits = hotelDepartAt >= journey.arrival.endAt;
    return {
      sunrise,
      queueAt,
      hotelDepartAt,
      queueLeadMinutes,
      hotelCommute,
      feasible: arrivalWindowFits,
      skipReason: !arrivalWindowFits ? "到京时间晚于候检窗口" : null,
      officialUrl: official ? officialFlag2026Url : officialFlagUrl,
      source: official ? "天安门管委会2026官方时刻表" : calculated ? "SunCalc日出推算" : "季节回退估算",
      isOfficial: Boolean(official),
      primePositionAt: dateKey(date) === "2026-10-01" ? atLocalTime(addDays(date, -1), "19:30") : null
    };
  }

  function getDayWindow(dayIndex, items, journey, flagInfo) {
    const date = addDays(parseLocalDate(state.startDate), dayIndex);
    const pace = paceRules[state.pace];
    let startAt = atLocalTime(date, pace.start);
    let endAt = atLocalTime(date, pace.end);

    if (items.some((item) => item.category === "长城")) startAt = atLocalTime(date, state.pace === "relaxed" ? "07:00" : "06:40");
    if (items.some((item) => item.id === "universal")) startAt = atLocalTime(date, state.pace === "relaxed" ? "07:30" : "07:00");
    if (items.some((item) => item.id === "tiananmen")) startAt = atLocalTime(date, state.pace === "relaxed" ? "07:00" : "06:30");

    const dayKey = dateKey(date);
    if ((dayIndex === 0 || dayKey === dateKey(journey.arrival.endAt)) && journey.arrival.endAt > startAt) {
      startAt = new Date(journey.arrival.endAt);
    }
    const departureStartKey = dateKey(journey.departure.startAt);
    if (dayKey === departureStartKey && journey.departure.startAt < endAt) {
      endAt = new Date(journey.departure.startAt);
    } else if (dayIndex === state.days - 1 && departureStartKey < dayKey) {
      endAt = new Date(startAt);
    }
    if (flagInfo?.feasible && flagInfo.hotelDepartAt < startAt) startAt = new Date(flagInfo.hotelDepartAt);
    return { date, startAt, endAt };
  }

  function dayWeatherNote(dayIndex, items) {
    const weather = state.weather[dayIndex];
    if (!weather) return "临行复核天气";
    const mostlyOutdoor = items.filter((item) => item.environment !== "indoor").length >= Math.ceil(items.length / 2);
    if (weather.wind >= 30 && items.some((item) => item.category === "长城")) return "大风风险：复核长城与索道公告";
    if (weather.rain >= 45 && mostlyOutdoor) return "降雨风险：备雨具，必要时与室内日互换";
    if (weather.min <= 8) return "早晚偏冷：带防风外套";
    return state.weatherMode === "forecast" ? `${weather.description}，适合按计划出行` : "季节参考：临行再查逐时预报";
  }

  function genericMeal(id, name, zone, price, dishes, duration = 45) {
    const factor = travelStyleRules[state.travelStyle].genericMealFactor;
    return {
      id, name, zone, price: price.map((value) => roundMoney(value * factor, 5)), dishes, duration, tierLabel: "¥",
      constraint: "现场选择，以当天营业和排队情况为准。",
      fact: null,
      video: null,
      service: { lunch: ["10:30", "15:30"], dinner: ["17:00", "21:30"] }
    };
  }

  function firstAvailableRestaurant(ids, mealType, usedRestaurantIds) {
    const tierOrder = travelStyleRules[state.travelStyle].tierOrder;
    const rank = (item) => tierOrder.indexOf(item.tier);
    const available = (item) => item.mealTypes.includes(mealType) && !usedRestaurantIds.has(item.id);
    const preferred = ids.map((id) => restaurantById.get(id)).filter(Boolean).filter(available).sort((a, b) => rank(a) - rank(b));
    const preferredIds = new Set(preferred.map((item) => item.id));
    const fallback = restaurants.filter(available).filter((item) => !preferredIds.has(item.id)).sort((a, b) => rank(a) - rank(b));
    return preferred[0] || fallback[0] || null;
  }

  function selectLunchVenue(items, usedRestaurantIds = new Set()) {
    const ids = new Set(items.map((item) => item.id));
    if (ids.has("universal")) return { venue: genericMeal("universal-simple", "环球影城园内简餐", "通州", [80, 150], ["主题套餐", "热食", "饮品"], 55), embeddedIn: "universal" };
    if (ids.has("summer-palace")) return { venue: genericMeal("summer-palace-simple", "颐和园园内简餐", "西郊", [35, 75], ["热食", "面食", "饮品"], 45), embeddedIn: "summer-palace" };
    if (ids.has("badaling")) return { venue: genericMeal("badaling-simple", "八达岭景区内简餐", "延庆", [35, 70], ["热饮", "面食", "便携套餐"]), embeddedIn: "badaling" };
    if (ids.has("mutianyu")) return { venue: genericMeal("mutianyu-simple", "慕田峪景区内简餐", "怀柔", [35, 70], ["面食", "热饮", "便携套餐"]), embeddedIn: "mutianyu" };
    if (ids.has("temple-heaven")) return { venue: genericMeal("temple-heaven-lunch", "天坛周边午餐", "南城", [45, 90], ["京味热菜", "面食", "时蔬"], 60), embeddedIn: null };
    let venue = null;
    if (ids.has("beijing-zoo")) venue = firstAvailableRestaurant(["huifeng", "taipo", "chaishi"], "lunch", usedRestaurantIds);
    else if (ids.has("prince-gong") || ids.has("beihai") || ids.has("shichahai")) venue = firstAvailableRestaurant(["shaguoju", "taipo", "chaishi", "side-street"], "lunch", usedRestaurantIds);
    else if (ids.has("palace-museum") || ids.has("tiananmen") || ids.has("national-museum")) venue = firstAvailableRestaurant(["shaguoju", "side-street", "jiangniu", "dadong"], "lunch", usedRestaurantIds);
    else if (ids.has("art-798") || ids.has("olympic-park")) venue = firstAvailableRestaurant(["dadong", "yisitan", "jinghualou", "five-guys", "xiding"], "lunch", usedRestaurantIds);
    else if (ids.has("lama-temple")) venue = firstAvailableRestaurant(["jiangniu", "side-street", "mai-thai", "maiden-tower"], "lunch", usedRestaurantIds);
    venue ||= firstAvailableRestaurant(["jiangniu", "side-street", "chaishi", "five-guys"], "lunch", usedRestaurantIds);
    return { venue: venue || genericMeal("city-lunch", "行程片区午餐", items[0]?.zone || "中轴线", [45, 90], ["本地热菜", "面食", "时蔬"], 60), embeddedIn: null };
  }

  function selectDinnerVenue(profile, dayIndex, usedRestaurantIds = new Set()) {
    const options = {
      classic: ["nanmen", "liu-ji", "dadong", "jiangniu", "taipo", "side-street", "jinghualou"],
      family: ["nanmen", "jiangniu", "five-guys", "taipo", "yisitan", "liu-ji", "side-street"],
      culture: ["nanmen", "liu-ji", "qulangyuan", "jinghualou", "taipo", "jiangniu", "dadong"],
      modern: ["dadong", "five-guys", "yisitan", "xiding", "jiangniu", "mai-thai", "taco-bar"],
      relaxed: ["nanmen", "taipo", "side-street", "jiangniu", "jinghualou", "liu-ji", "dadong"]
    };
    const ordered = options[profile.id] || options.classic;
    const rotated = [...ordered.slice(dayIndex % ordered.length), ...ordered.slice(0, dayIndex % ordered.length)];
    return firstAvailableRestaurant(rotated, "dinner", usedRestaurantIds);
  }

  function mealServiceWindow(venue, mealType, date) {
    const window = venue?.service?.[mealType];
    if (!window) return null;
    return { openAt: atLocalTime(date, window[0]), closeAt: atLocalTime(date, window[1]) };
  }

  function buildMealEvent(venue, mealType, startAt, options = {}) {
    const duration = options.duration || venue.duration || 60;
    return {
      type: "meal",
      mealType,
      venue,
      startAt: new Date(startAt),
      endAt: addMinutes(startAt, duration),
      duration,
      includedInVisit: Boolean(options.includedInVisit),
      routeNote: options.routeNote || "顺路步行或短途交通",
      parentAttractionId: options.parentAttractionId || null
    };
  }

  function buildDinnerMeal(profile, dayIndex, date, inboundTransit, journey, usedRestaurantIds = new Set()) {
    const dayEndsAt = dayIndex === state.days - 1 && dateKey(journey.departure.startAt) === dateKey(date)
      ? journey.departure.startAt
      : atLocalTime(date, "21:30");
    const venue = selectDinnerVenue(profile, dayIndex, usedRestaurantIds);
    if (!venue) {
      const fallback = genericMeal("hotel-dinner", "酒店片区晚餐", profile.hotelZone, [45, 95], ["本地热菜", "面食", "时蔬"], 60);
      const meal = buildMealEvent(fallback, "dinner", inboundTransit?.arriveAt ? addMinutes(inboundTransit.arriveAt, 25) : atLocalTime(date, "17:30"), { routeNote: "酒店周边步行选择" });
      return meal.endAt <= dayEndsAt ? meal : null;
    }
    const service = mealServiceWindow(venue, "dinner", date);
    const hotelReady = inboundTransit?.arriveAt || atLocalTime(date, "17:00");
    let startAt = new Date(Math.max(addMinutes(hotelReady, 25).getTime(), service?.openAt?.getTime() || 0));
    const plannedEndAt = addMinutes(startAt, venue.duration || 60);
    if (service && plannedEndAt > service.closeAt) {
      const fallback = genericMeal("hotel-simple", "酒店片区简餐", profile.hotelZone, [40, 90], ["本地家常菜", "面食", "时令菜"], 60);
      startAt = addMinutes(hotelReady, 20);
      if (addMinutes(startAt, fallback.duration) > dayEndsAt) return null;
      return buildMealEvent(fallback, "dinner", startAt, { routeNote: "酒店周边步行选择" });
    }
    const meal = buildMealEvent(venue, "dinner", startAt, { routeNote: "从酒店短途前往，建议提前取号或预约" });
    return meal.endAt <= dayEndsAt ? meal : null;
  }

  function layoutScheduledItems(items, window, profile, flagInfo, usedRestaurantIds = new Set()) {
    if (!items.length || window.startAt >= window.endAt) return null;
    const usesFlagWindow = flagInfo?.feasible && items[0]?.id === "tiananmen";
    const lunchPlan = selectLunchVenue(items, usedRestaurantIds);
    const outbound = usesFlagWindow ? flagInfo.hotelCommute : hotelTransit(profile, items[0]);
    const inbound = hotelTransit(profile, items.at(-1), true);
    const outboundTransit = {
      ...outbound,
      departAt: usesFlagWindow ? new Date(flagInfo.hotelDepartAt) : new Date(window.startAt),
      arriveAt: usesFlagWindow ? new Date(flagInfo.queueAt) : addMinutes(window.startAt, outbound.minutes)
    };
    let cursor = new Date(outboundTransit.arriveAt);
    const stops = [];
    const meals = [];
    const timeline = [];
    let lunchScheduled = false;
    let constraintIssue = null;

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const isFlagStop = usesFlagWindow && index === 0;
      const rule = visitRules[item.id];
      if (!isFlagStop && rule?.open) {
        const openAt = atLocalTime(window.date, rule.open);
        if (cursor < openAt) {
          if ((openAt - cursor) / 60000 >= 20) {
            timeline.push({
              type: "rest",
              startAt: new Date(cursor),
              endAt: new Date(openAt),
              label: cursor.getHours() < 9 ? "早餐与休整" : "开门前候场休整"
            });
          }
          cursor = openAt;
        }
      }

      const preliminaryStay = isFlagStop
        ? Math.round((addMinutes(flagInfo.sunrise, 30) - flagInfo.queueAt) / 60000)
        : Math.max(60, Math.round(item.duration * paceRules[state.pace].durationFactor / 5) * 5);
      const projectedEnd = addMinutes(cursor, preliminaryStay);
      const shouldInsertLunch = !lunchScheduled && !lunchPlan.embeddedIn && !isFlagStop && (
        (index === 0 && cursor >= atLocalTime(window.date, "11:15") && projectedEnd >= atLocalTime(window.date, "13:15")) ||
        (index > 0 && cursor >= atLocalTime(window.date, "10:30") && projectedEnd >= atLocalTime(window.date, "12:15"))
      );
      if (shouldInsertLunch && lunchPlan.venue) {
        const service = mealServiceWindow(lunchPlan.venue, "lunch", window.date);
        const mealTransit = transitBetween(item, lunchPlan.venue);
        const routeMinutes = lunchPlan.extraTransit || mealTransit.minutes;
        const earliest = atLocalTime(window.date, "11:15");
        const mealArrival = addMinutes(cursor, routeMinutes);
        const mealStart = new Date(Math.max(mealArrival.getTime(), earliest.getTime(), service?.openAt?.getTime() || 0));
        const meal = buildMealEvent(lunchPlan.venue, "lunch", mealStart, { routeNote: `与${item.name}往返各约${routeMinutes}分钟` });
        if (!service || meal.endAt <= service.closeAt) {
          timeline.push({ type: "transit", label: mealTransit.label || "步行或短途交通", minutes: routeMinutes, departAt: new Date(cursor), arriveAt: new Date(mealArrival) });
          meals.push(meal);
          timeline.push(meal);
          lunchScheduled = true;
          timeline.push({ type: "transit", label: mealTransit.label || "步行或短途交通", minutes: routeMinutes, departAt: new Date(meal.endAt), arriveAt: addMinutes(meal.endAt, routeMinutes) });
          cursor = addMinutes(meal.endAt, routeMinutes);
          if (!isFlagStop && rule?.open && cursor < atLocalTime(window.date, rule.open)) cursor = atLocalTime(window.date, rule.open);
        }
      }

      if (!isFlagStop && rule?.latestStart && cursor > atLocalTime(window.date, rule.latestStart)) {
        constraintIssue = `${item.name}超过最晚入场时间${rule.latestStart}`;
        break;
      }

      const startAt = isFlagStop ? new Date(flagInfo.queueAt) : new Date(cursor);
      let stay = preliminaryStay;
      if (!isFlagStop && rule?.close) {
        const allowedMinutes = Math.floor((atLocalTime(window.date, rule.close) - startAt) / 60000);
        if (allowedMinutes < 60) {
          constraintIssue = `${item.name}无法在${rule.close}闭馆前完成游览`;
          break;
        }
        stay = Math.min(stay, allowedMinutes);
      }
      const endAt = addMinutes(startAt, stay);
      const transitBase = index < items.length - 1 ? transitBetween(item, items[index + 1]) : null;
      const transitAfter = transitBase ? {
        ...transitBase,
        departAt: endAt,
        arriveAt: addMinutes(endAt, transitBase.minutes)
      } : null;
      stops.push({
        attraction: item,
        startAt,
        endAt,
        stay,
        transitAfter,
        displayHighlights: isFlagStop
          ? [`${flagInfo.isOfficial ? "官方" : "推算"}${formatTime(flagInfo.sunrise)}升旗`, `常规候检预留${flagInfo.queueLeadMinutes}分钟`]
          : item.id === "tiananmen" ? ["人民英雄纪念碑", "中轴广场"] : item.highlights.slice(0, 2)
      });
      timeline.push({ type: "attraction", ...stops.at(-1) });
      if (transitAfter) timeline.push({ type: "transit", ...transitAfter });
      cursor = transitAfter ? transitAfter.arriveAt : endAt;
    }

    if (constraintIssue) return { valid: false, constraintIssue };

    if (!lunchScheduled && lunchPlan.embeddedIn && lunchPlan.venue) {
      const parentStop = stops.find((stop) => stop.attraction.id === lunchPlan.embeddedIn);
      if (parentStop) {
        const target = atLocalTime(window.date, "12:30");
        const latestStart = addMinutes(parentStop.endAt, -(lunchPlan.venue.duration || 55));
        const mealStart = new Date(Math.min(Math.max(target.getTime(), addMinutes(parentStop.startAt, 60).getTime()), latestStart.getTime()));
        const meal = buildMealEvent(lunchPlan.venue, "lunch", mealStart, {
          includedInVisit: true,
          parentAttractionId: parentStop.attraction.id,
          routeNote: "园区内错峰用餐"
        });
        meals.push(meal);
        timeline.push(meal);
        lunchScheduled = true;
      }
    }

    if (!lunchScheduled && lunchPlan.venue && cursor <= atLocalTime(window.date, "15:00")) {
      const service = mealServiceWindow(lunchPlan.venue, "lunch", window.date);
      const mealStart = new Date(Math.max(addMinutes(cursor, 10).getTime(), service?.openAt?.getTime() || 0));
      const meal = buildMealEvent(lunchPlan.venue, "lunch", mealStart, { routeNote: "游览结束后顺路用餐" });
      if (!service || meal.endAt <= service.closeAt) {
        meals.push(meal);
        timeline.push(meal);
        lunchScheduled = true;
        cursor = addMinutes(meal.endAt, 10);
      }
    }

    const inboundTransit = {
      ...inbound,
      departAt: new Date(cursor),
      arriveAt: addMinutes(cursor, inbound.minutes)
    };
    const eventStart = (event) => event.startAt || event.departAt || event.arriveAt;
    timeline.sort((a, b) => eventStart(a) - eventStart(b));
    return { valid: true, outboundTransit, stops, inboundTransit, meals, timeline };
  }

  function scheduleDay(ids, dayIndex, profile, journey, usedRestaurantIds = new Set()) {
    const originalItems = ids.map((id) => attractionById.get(id)).filter(Boolean);
    const date = addDays(parseLocalDate(state.startDate), dayIndex);
    const tiananmenIndex = originalItems.findIndex((item) => item.id === "tiananmen");
    const flagInfo = tiananmenIndex >= 0 ? buildFlagInfo(date, profile, journey) : null;
    const requestedItems = originalItems.slice();
    if (flagInfo?.feasible && tiananmenIndex > 0) {
      requestedItems.unshift(requestedItems.splice(tiananmenIndex, 1)[0]);
    }
    const window = getDayWindow(dayIndex, requestedItems, journey, flagInfo);
    const scheduledItems = requestedItems.slice();
    const constraintNotes = [];
    let layout = layoutScheduledItems(scheduledItems, window, profile, flagInfo, usedRestaurantIds);

    while (scheduledItems.length && (!layout || !layout.valid || layout.inboundTransit.arriveAt > window.endAt)) {
      if (layout?.constraintIssue) constraintNotes.push(layout.constraintIssue);
      scheduledItems.pop();
      layout = layoutScheduledItems(scheduledItems, window, profile, flagInfo, usedRestaurantIds);
    }

    const omitted = originalItems.filter((item) => !scheduledItems.includes(item));
    const auditNotes = [];
    const hasScheduledTiananmen = scheduledItems.some((item) => item.id === "tiananmen");
    if (flagInfo && hasScheduledTiananmen && flagInfo.feasible) {
      auditNotes.push({
        kind: "verified",
        text: `${formatDate(date)}${flagInfo.isOfficial ? "天安门管委会公布的升旗时刻" : "本地日出推算"}为${formatTime(flagInfo.sunrise)}。`,
        url: flagInfo.officialUrl
      });
      auditNotes.push({
        kind: "info",
        text: `页面按国庆客流模型预留${flagInfo.queueLeadMinutes}分钟，估算${formatTime(flagInfo.queueAt)}前到外围候检；这不是官方候检开放时刻，实际入场时段须以预约结果和现场管控为准。`
      });
      if (flagInfo.primePositionAt) {
        auditNotes.push({
          kind: "warning",
          text: `10月1日争取旗杆附近有利位置属于极端高峰场景：往年报道中的前排观众曾在9月30日19:30—20:30到场并彻夜等待约10小时。这是客流经验，不是官方要求，也不保证位置；儿童、老人不建议彻夜排队。`,
          url: "https://www.beijing.gov.cn/ywdt/gzdt/202510/t20251002_4215691.html"
        });
      }
      if (state.ages.some((age) => age < 12 || age >= 65)) {
        auditNotes.push({
          kind: "warning",
          text: "团队含儿童或老人，凌晨候检体力压力较大；不建议采用前夜彻夜排队方案，可接受普通观礼位置或改选白天广场。"
        });
      }
    } else if (flagInfo && hasScheduledTiananmen) {
      auditNotes.push({
        kind: "warning",
        text: `${flagInfo.skipReason || "排队窗口不满足"}，本次按白天广场参观，不显示“升旗仪式”。${formatDate(date)}${flagInfo.isOfficial ? `官方升旗时刻为${formatTime(flagInfo.sunrise)}` : `日出推算约${formatTime(flagInfo.sunrise)}`}；需要观礼时可在其他方案选择有前夜住宿的日期预约“升旗”时段。`,
        url: flagInfo.officialUrl
      });
    }
    scheduledItems.forEach((item) => {
      const rule = visitRules[item.id];
      if (rule?.mondayNotice && date.getDay() === 1) {
        auditNotes.push({ kind: "warning", text: `${item.name}周一常规闭馆，法定节假日可能例外，须在出发前复核官方公告。` });
      }
      if (rule?.dynamicHours) {
        auditNotes.push({ kind: "info", text: `${item.name}每日运营时间可能调整，当前排程按常见开放时段审查，须以官方APP当日时间为准。` });
      }
    });
    constraintNotes.forEach((text) => auditNotes.push({ kind: "warning", text }));
    const usedBeforeDinner = new Set(usedRestaurantIds);
    (layout?.meals || []).forEach((meal) => {
      if (restaurantById.has(meal.venue.id)) usedBeforeDinner.add(meal.venue.id);
    });
    const dinnerMeal = buildDinnerMeal(profile, dayIndex, date, layout?.inboundTransit || null, journey, usedBeforeDinner);
    const meals = [...(layout?.meals || []), ...(dinnerMeal ? [dinnerMeal] : [])];
    meals.forEach((meal) => {
      if (restaurantById.has(meal.venue.id)) usedRestaurantIds.add(meal.venue.id);
    });
    if (!meals.some((meal) => meal.mealType === "lunch") && scheduledItems.length) {
      auditNotes.push({ kind: "warning", text: "当天时间窗口内没有形成可靠午餐时段，建议减少一个景点后重新生成。" });
    }
    const emptyTitle = dayIndex === 0 && dayIndex === state.days - 1
      ? "抵京与离京"
      : dayIndex === 0 ? "抵京与安顿" : dayIndex === state.days - 1 ? "离京返程" : "自由调整";
    return {
      index: dayIndex,
      date: window.date,
      title: scheduledItems.length ? scheduledItems.map((item) => item.name).join(" · ") : emptyTitle,
      weatherNote: scheduledItems.length ? dayWeatherNote(dayIndex, scheduledItems) : "首尾通勤日",
      window,
      omitted,
      auditNotes,
      stops: layout?.stops || [],
      meals,
      timeline: layout?.timeline || [],
      dinnerMeal,
      outboundTransit: layout?.outboundTransit || null,
      inboundTransit: layout?.inboundTransit || null
    };
  }

  function ticketPriceForAge(item, age) {
    if (item.id === "universal") {
      if (age < 3) return item.prices.child;
      if (age <= 11) return item.prices.youth;
      if (age >= 65) return item.prices.senior;
      return item.prices.adult;
    }
    if (age < 6) return item.prices.child;
    if (age < 18) return item.prices.youth;
    if (age >= 60) return item.prices.senior;
    return item.prices.adult;
  }

  function calculatePlanCost(profile, days) {
    const uniqueItems = new Map();
    days.forEach((day) => day.stops.forEach((stop) => uniqueItems.set(stop.attraction.id, stop.attraction)));
    const ticketTotal = Array.from(uniqueItems.values()).reduce((total, item) => {
      return total + state.ages.reduce((sum, age) => sum + ticketPriceForAge(item, age), 0);
    }, 0);

    const rooms = Math.max(1, Math.ceil(state.ages.length / 2));
    const nights = state.nights;
    const hotelLow = profile.hotelRange[0] * rooms * nights;
    const hotelHigh = profile.hotelRange[1] * rooms * nights;
    const foodTotals = days.flatMap((day) => day.meals || []).reduce((totals, meal) => {
      const ageFactor = state.ages.reduce((sum, age) => sum + (age < 6 ? 0.4 : age < 12 ? 0.65 : 1), 0);
      totals[0] += (meal.venue.price?.[0] || 40) * ageFactor;
      totals[1] += (meal.venue.price?.[1] || 90) * ageFactor;
      return totals;
    }, [0, 0]);
    const foodLow = roundMoney(foodTotals[0] * profile.foodFactor);
    const foodHigh = roundMoney(foodTotals[1] * profile.foodFactor);
    const hasWall = uniqueItems.has("badaling") || uniqueItems.has("mutianyu");
    const hasUniversal = uniqueItems.has("universal");
    const localBase = (state.ages.length * state.days * 32 + (hasWall ? state.ages.length * 110 : 0) + (hasUniversal ? state.ages.length * 18 : 0)) * travelStyleRules[state.travelStyle].localTransitFactor;
    const localLow = roundMoney(localBase * 0.85);
    const localHigh = roundMoney(localBase * 1.35);
    const ticketLow = roundMoney(ticketTotal * 0.92);
    const ticketHigh = roundMoney(ticketTotal * 1.12);

    return {
      rooms,
      nights,
      ticket: [ticketLow, ticketHigh],
      hotel: [hotelLow, hotelHigh],
      food: [foodLow, foodHigh],
      local: [localLow, localHigh],
      total: [
        roundMoney(hotelLow + foodLow + localLow + ticketLow, 50),
        roundMoney(hotelHigh + foodHigh + localHigh + ticketHigh, 50)
      ]
    };
  }

  function prepareRouteDays(profile, journey) {
    const routes = profile.days.slice(0, state.days).map((ids) => ids.slice());
    const reviewNotes = [];
    const sourceDay = routes.findIndex((ids) => ids.includes("tiananmen"));
    if (sourceDay === 0 && state.days > 1) {
      const firstDayFlag = buildFlagInfo(parseLocalDate(state.startDate), profile, journey);
      if (!firstDayFlag.feasible) {
        const candidates = routes.map((ids, index) => ({ ids, index })).filter(({ ids, index }) => {
          if (index === 0) return false;
          const hasFullDay = ids.some((id) => id === "universal" || ["badaling", "mutianyu"].includes(id));
          if (hasFullDay || ids.length > 2) return false;
          const date = addDays(parseLocalDate(state.startDate), index);
          const flagInfo = buildFlagInfo(date, profile, journey);
          const flagFinishAt = addMinutes(flagInfo.sunrise, 30);
          const departureStartKey = dateKey(journey.departure.startAt);
          return flagInfo.feasible && (dateKey(date) < departureStartKey || flagFinishAt <= journey.departure.startAt);
        });
        if (candidates.length) {
          const targetDay = candidates[0].index;
          routes[0] = routes[0].filter((id) => id !== "tiananmen");
          routes[targetDay].unshift("tiananmen");
          reviewNotes.push(`到京日已错过升旗候检窗口，天安门由D1迁移至D${targetDay + 1}清晨，优先保留升旗全过程。`);
        } else {
          reviewNotes.push("到京日已错过升旗候检窗口，后续日期也没有无冲突的候检时段；保留D1白天广场参观，并在日程中明确提示。");
        }
      }
    }
    return { routes, reviewNotes };
  }

  function buildPlan(baseProfile) {
    const profile = profileForTravelStyle(baseProfile);
    const journey = buildJourneyWindow(profile);
    const prepared = prepareRouteDays(profile, journey);
    const usedRestaurantIds = new Set();
    const scheduledDays = prepared.routes.map((ids, index) => scheduleDay(ids, index, profile, journey, usedRestaurantIds));
    return {
      id: profile.id,
      name: profile.name,
      short: profile.short,
      hotel: profile.hotel,
      hotelReason: profile.hotelReason,
      hotelRange: profile.hotelRange,
      travelStyle: travelStyleRules[state.travelStyle].label,
      journey,
      reviewNotes: prepared.reviewNotes,
      days: scheduledDays,
      cost: calculatePlanCost(profile, scheduledDays)
    };
  }

  async function generatePlans() {
    const generationVersion = ++planGenerationVersion;
    if (!collectFormState()) return;
    const submit = els.plannerForm.querySelector("button[type='submit']");
    submit.disabled = true;
    submit.innerHTML = '<i data-lucide="loader-circle"></i>正在计算';
    refreshIcons();

    try {
      const weather = await loadWeather();
      if (generationVersion !== planGenerationVersion) return;
      state.weather = weather;
      const selectedProfiles = profiles.slice(0, 4);
      if (state.ages.some((age) => age >= 60)) selectedProfiles.push(profiles.find((profile) => profile.id === "relaxed"));
      state.plans = selectedProfiles.filter(Boolean).map(buildPlan);
      if (!state.plans.some((plan) => plan.id === state.activePlanId)) state.activePlanId = state.plans[0]?.id || null;
      renderWeather();
      renderPlanSwitcher();
      renderActivePlan();
      renderTicketPlanSelect();
      renderTickets();
      if (state.editorOpen && !state.customDraft) loadCurrentPlanIntoEditor();
      else renderPlanEditor();
      showToast(`已生成${state.plans.length}套行程，费用按${state.ages.length}人估算。`);
    } finally {
      if (generationVersion !== planGenerationVersion) return;
      submit.disabled = false;
      submit.innerHTML = '<i data-lucide="sparkles"></i>生成旅游计划';
      refreshIcons();
    }
  }

  function schedulePlanRegeneration() {
    window.clearTimeout(planRefreshTimer);
    planRefreshTimer = window.setTimeout(() => generatePlans(), 220);
  }

  function renderPlanSwitcher() {
    els.planSwitcher.innerHTML = state.plans.map((plan, index) => `
      <button class="plan-tab ${plan.id === state.activePlanId ? "is-selected" : ""}" type="button" role="tab" aria-selected="${plan.id === state.activePlanId}" data-plan-id="${plan.id}">
        <strong>${index + 1}. ${plan.name}</strong><small>${plan.short}</small>
      </button>`).join("");
  }

  function draftEntity(item) {
    if (item.kind === "custom-meal") return item.entity || null;
    return item.kind === "meal" ? restaurantById.get(item.id) : attractionById.get(item.id);
  }

  function clockMinutes(clock) {
    const [hours, minutes] = String(clock || "00:00").split(":").map(Number);
    return hours * 60 + minutes;
  }

  function clockFromMinutes(total) {
    const normalized = Math.max(0, Math.min(23 * 60 + 59, Math.round(total)));
    return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
  }

  function mealTypeForClock(clock) {
    const minutes = clockMinutes(clock);
    if (minutes < 10 * 60 + 30) return "breakfast";
    return minutes < 15 * 60 ? "lunch" : "dinner";
  }

  function currentEditorBasePlan() {
    const active = state.plans.find((plan) => plan.id === state.activePlanId && plan.id !== "custom");
    if (active) return active;
    return state.plans.find((plan) => plan.id === state.customBasePlanId) || state.plans.find((plan) => plan.id !== "custom") || null;
  }

  function loadCurrentPlanIntoEditor() {
    const plan = currentEditorBasePlan();
    if (!plan) return;
    state.customBasePlanId = plan.id;
    state.customDraft = plan.days.map((day, dayIndex) => {
      const items = [
        ...day.stops.map((stop) => ({
          uid: `custom-${++customUid}`,
          kind: "attraction",
          id: stop.attraction.id,
          start: formatTime(stop.startAt),
          duration: stop.stay,
          embedded: false
        })),
        ...day.meals.map((meal) => ({
          uid: `custom-${++customUid}`,
          kind: restaurantById.has(meal.venue.id) ? "meal" : "custom-meal",
          id: meal.venue.id,
          start: formatTime(meal.startAt),
          duration: meal.duration,
          embedded: meal.includedInVisit,
          entity: restaurantById.has(meal.venue.id) ? null : meal.venue
        }))
      ].filter((item) => draftEntity(item)).sort((left, right) => clockMinutes(left.start) - clockMinutes(right.start));
      return { dayIndex, date: addDays(parseLocalDate(state.startDate), dayIndex), items };
    });
    state.customRequestAdvice = [];
    renderPlanEditor();
    showToast(`已载入“${plan.name}”作为自编底稿。`);
  }

  function customItemOptions(selectedValue, currentItem) {
    const attractionOptions = attractions.map((item) => `<option value="attraction:${item.id}" ${selectedValue === `attraction:${item.id}` ? "selected" : ""}>${item.name}</option>`).join("");
    const mealOptions = restaurants.map((item) => `<option value="meal:${item.id}" ${selectedValue === `meal:${item.id}` ? "selected" : ""}>${item.name}</option>`).join("");
    const customMeal = currentItem?.kind === "custom-meal" && currentItem.entity
      ? `<optgroup label="行程餐食"><option value="custom-meal:${currentItem.id}" selected>${currentItem.entity.name}</option></optgroup>`
      : "";
    return `<optgroup label="景点">${attractionOptions}</optgroup><optgroup label="餐馆">${mealOptions}</optgroup>${customMeal}`;
  }

  function renderCustomDays() {
    if (!state.customDraft) {
      els.customDays.innerHTML = '<div class="custom-empty"><i data-lucide="calendar-plus"></i><span>载入一个现有方案后开始编排。</span></div>';
      return;
    }
    els.customDays.innerHTML = state.customDraft.map((day) => `
      <section class="custom-day" data-custom-day="${day.dayIndex}">
        <header><div><strong>D${day.dayIndex + 1}</strong><span>${formatDate(day.date)}</span></div><small>${day.items.length}项安排</small></header>
        <div class="custom-item-list">
          ${day.items.map((item, index) => `
            <div class="custom-item-row ${item.embedded ? "is-embedded" : ""}" data-custom-item="${item.uid}">
              <label><span>开始</span><input type="time" value="${item.start}" data-custom-field="start"></label>
              <label class="custom-item-select"><span>安排</span><select data-custom-field="entity">${customItemOptions(`${item.kind}:${item.id}`, item)}</select></label>
              <label><span>分钟</span><input type="number" min="15" max="720" step="15" value="${item.duration}" data-custom-field="duration"></label>
              <div class="custom-row-actions">
                <button class="icon-button" type="button" data-move-custom="up" ${index === 0 ? "disabled" : ""} aria-label="上移" title="上移"><i data-lucide="arrow-up"></i></button>
                <button class="icon-button" type="button" data-move-custom="down" ${index === day.items.length - 1 ? "disabled" : ""} aria-label="下移" title="下移"><i data-lucide="arrow-down"></i></button>
                <button class="icon-button" type="button" data-remove-custom aria-label="删除安排" title="删除"><i data-lucide="trash-2"></i></button>
              </div>
            </div>`).join("")}
        </div>
        <div class="custom-add-actions">
          <button class="text-button" type="button" data-add-custom="attraction"><i data-lucide="landmark"></i>添加景点</button>
          <button class="text-button" type="button" data-add-custom="meal"><i data-lucide="utensils"></i>添加用餐</button>
        </div>
      </section>`).join("");
  }

  function auditCustomDraft() {
    if (!state.customDraft) return [];
    const basePlan = currentEditorBasePlan();
    if (!basePlan) return [];
    const profile = profiles.find((item) => item.id === state.customBasePlanId) || profiles[0];
    const advice = [];
    const seenAttractions = new Map();
    state.customDraft.forEach((day) => {
      const date = addDays(parseLocalDate(state.startDate), day.dayIndex);
      const entries = day.items.map((item) => {
        const entity = draftEntity(item);
        const startAt = atLocalTime(date, item.start);
        return { item, entity, startAt, endAt: addMinutes(startAt, Number(item.duration) || 0) };
      }).filter((entry) => entry.entity).sort((left, right) => left.startAt - right.startAt);

      entries.forEach((entry, index) => {
        const { item, entity, startAt, endAt } = entry;
        const dayLabel = `D${day.dayIndex + 1}`;
        if (day.dayIndex === 0 && startAt < basePlan.journey.arrival.endAt) {
          advice.push({ severity: "error", dayIndex: day.dayIndex, text: `${dayLabel}的${entity.name}早于${formatTime(basePlan.journey.arrival.endAt)}到京时间。` });
        }
        const departureDinner = basePlan.journey.departure.dinnerWindow;
        const withinDepartureDinner = item.kind !== "attraction" && departureDinner && startAt >= departureDinner.startAt && endAt <= departureDinner.endAt;
        if (dateKey(date) === dateKey(basePlan.journey.departure.startAt) && endAt > basePlan.journey.departure.startAt && !withinDepartureDinner) {
          advice.push({ severity: "error", dayIndex: day.dayIndex, text: `${dayLabel}的${entity.name}晚于${formatTime(basePlan.journey.departure.startAt)}计划离京时间。` });
        }
        if (item.kind === "attraction") {
          const rule = visitRules[entity.id];
          if (rule?.open && startAt < atLocalTime(date, rule.open)) advice.push({ severity: "error", dayIndex: day.dayIndex, text: `${entity.name}${rule.open}开放，当前${item.start}开始。` });
          if (rule?.latestStart && startAt > atLocalTime(date, rule.latestStart)) advice.push({ severity: "error", dayIndex: day.dayIndex, text: `${entity.name}最晚建议${rule.latestStart}入场，当前${item.start}开始。` });
          if (rule?.close && endAt > atLocalTime(date, rule.close)) advice.push({ severity: "error", dayIndex: day.dayIndex, text: `${entity.name}预计${formatTime(endAt)}结束，超过${rule.close}闭园。` });
          if (rule?.mondayNotice && date.getDay() === 1) advice.push({ severity: "warning", dayIndex: day.dayIndex, text: `${entity.name}周一常规闭馆，法定节假日是否开放须复核官方公告。` });
          if (entity.id === "tiananmen") {
            const flagInfo = buildFlagInfo(date, profile, basePlan.journey);
            if (startAt > flagInfo.sunrise) advice.push({ severity: "warning", dayIndex: day.dayIndex, text: `天安门广场${item.start}开始，已错过当天${formatTime(flagInfo.sunrise)}升旗；若以升旗为主，应按候检窗口倒排。` });
          }
          const previousDay = seenAttractions.get(entity.id);
          if (previousDay !== undefined) advice.push({ severity: "warning", dayIndex: day.dayIndex, text: `${entity.name}已在D${previousDay + 1}安排过，本日为重复游览。` });
          else seenAttractions.set(entity.id, day.dayIndex);
        }
        if (item.kind !== "attraction" && entity.service && !withinDepartureDinner) {
          const mealType = mealTypeForClock(item.start);
          const mealLabel = mealType === "breakfast" ? "早餐" : mealType === "lunch" ? "午餐" : "晚餐";
          if (entity.mealTypes && !entity.mealTypes.includes(mealType)) advice.push({ severity: "warning", dayIndex: day.dayIndex, text: `${entity.name}不适合作为${mealLabel}，请调整时间或餐馆。` });
          const service = mealServiceWindow(entity, mealType, date);
          if (service && (startAt < service.openAt || endAt > service.closeAt)) advice.push({ severity: "warning", dayIndex: day.dayIndex, text: `${entity.name}的用餐时段超出已记录的${mealLabel}营业窗口。` });
        }
        const previous = entries[index - 1];
        if (previous && !item.embedded && !previous.item.embedded) {
          if (startAt < previous.endAt) {
            advice.push({ severity: "error", dayIndex: day.dayIndex, text: `${previous.entity.name}与${entity.name}重叠${Math.ceil((previous.endAt - startAt) / 60000)}分钟。` });
          } else {
            const transit = transitBetween(previous.entity, entity);
            const gap = Math.round((startAt - previous.endAt) / 60000);
            if (gap < transit.minutes) advice.push({ severity: "warning", dayIndex: day.dayIndex, text: `${previous.entity.name}到${entity.name}仅留${gap}分钟，建议至少预留${transit.minutes}分钟（${transit.label}）。` });
          }
        }
      });

      const mealEntries = entries.filter((entry) => entry.item.kind !== "attraction");
      if (!mealEntries.some((entry) => clockMinutes(entry.item.start) >= 10 * 60 + 30 && clockMinutes(entry.item.start) <= 14 * 60 + 30)) {
        advice.push({ severity: "warning", dayIndex: day.dayIndex, text: `D${day.dayIndex + 1}没有11:00—14:30之间的午餐安排。` });
      }
      const departureEarly = dateKey(date) === dateKey(basePlan.journey.departure.endAt) && basePlan.journey.departure.endAt.getHours() < 17;
      if (!departureEarly && !mealEntries.some((entry) => clockMinutes(entry.item.start) >= 16 * 60 && clockMinutes(entry.item.start) <= 20 * 60 + 30)) {
        advice.push({ severity: "warning", dayIndex: day.dayIndex, text: `D${day.dayIndex + 1}没有16:00—20:30之间的晚餐安排。` });
      }
    });
    return [...advice, ...state.customRequestAdvice];
  }

  function renderCustomAdvice() {
    const advice = auditCustomDraft();
    const errors = advice.filter((item) => item.severity === "error").length;
    const warnings = advice.filter((item) => item.severity === "warning").length;
    els.customAdviceCount.textContent = state.customDraft ? `${errors}项冲突 · ${warnings}项提醒` : "等待编排";
    els.customAdviceList.innerHTML = advice.length ? advice.map((item) => `
      <div class="custom-advice-item ${item.severity}"><i data-lucide="${item.severity === "error" ? "circle-x" : item.severity === "warning" ? "triangle-alert" : "lightbulb"}"></i><span>${escapeHtml(item.text)}</span></div>`).join("") : state.customDraft ? '<div class="custom-advice-item success"><i data-lucide="badge-check"></i><span>当前自编计划未发现硬冲突。</span></div>' : '<div class="custom-advice-item info"><i data-lucide="info"></i><span>载入方案后显示逐日建议。</span></div>';
  }

  function renderPlanEditor() {
    els.planEditorBody.hidden = !state.editorOpen;
    els.togglePlanEditor.setAttribute("aria-expanded", String(state.editorOpen));
    els.togglePlanEditor.querySelector("span").textContent = state.editorOpen ? "收起编排" : "开始编排";
    if (state.editorOpen) {
      renderCustomDays();
      renderCustomAdvice();
    }
    refreshIcons();
  }

  function addCustomItem(dayIndex, kind) {
    if (!state.customDraft) loadCurrentPlanIntoEditor();
    const day = state.customDraft?.[dayIndex];
    if (!day) return;
    const used = new Set(day.items.filter((item) => item.kind === kind).map((item) => item.id));
    const source = kind === "meal" ? restaurants : attractions;
    const entity = source.find((item) => !used.has(item.id)) || source[0];
    if (!entity) return;
    const last = day.items.slice().sort((left, right) => clockMinutes(left.start) - clockMinutes(right.start)).at(-1);
    const start = last ? clockFromMinutes(clockMinutes(last.start) + Number(last.duration) + 30) : "09:00";
    day.items.push({ uid: `custom-${++customUid}`, kind, id: entity.id, start, duration: kind === "meal" ? entity.duration || 60 : Math.min(entity.duration, 240), embedded: false });
    renderPlanEditor();
  }

  function analyzeAdjustmentRequest() {
    if (!state.customDraft) loadCurrentPlanIntoEditor();
    const request = els.adjustmentRequest.value.trim();
    if (!request) {
      showToast("请先填写调整要求。");
      return;
    }
    const chineseDays = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7 };
    const dayMatch = request.match(/D\s*(\d+)|第([一二三四五六七\d]+)天/i);
    const requestedDay = dayMatch ? Number(dayMatch[1] || chineseDays[dayMatch[2]] || dayMatch[2]) - 1 : null;
    const entities = [...attractions.map((item) => ({ ...item, kind: "attraction" })), ...restaurants.map((item) => ({ ...item, kind: "meal" }))];
    const found = entities.filter((entity) => request.includes(entity.name) || request.includes(entity.name.replace(/[（(].*$/, "")));
    const advice = [];
    found.forEach((entity) => {
      const scheduledDays = state.customDraft.filter((day) => day.items.some((item) => item.kind === entity.kind && item.id === entity.id)).map((day) => day.dayIndex);
      if (requestedDay !== null && requestedDay >= 0 && requestedDay < state.days) {
        advice.push({ severity: "info", dayIndex: requestedDay, text: scheduledDays.includes(requestedDay) ? `${entity.name}已在D${requestedDay + 1}，可继续调整开始时间。` : `${entity.name}当前不在D${requestedDay + 1}，可在该日使用“添加${entity.kind === "meal" ? "用餐" : "景点"}”后选择。` });
      } else {
        advice.push({ severity: "info", dayIndex: scheduledDays[0] ?? 0, text: scheduledDays.length ? `${entity.name}当前位于${scheduledDays.map((day) => `D${day + 1}`).join("、")}。` : `${entity.name}尚未加入自编计划。` });
      }
    });
    if (request.includes("升旗")) {
      const tiananmenDay = state.customDraft.find((day) => day.items.some((item) => item.id === "tiananmen"));
      advice.push({ severity: "info", dayIndex: tiananmenDay?.dayIndex ?? 0, text: tiananmenDay ? `升旗应按D${tiananmenDay.dayIndex + 1}官方时刻倒排候检，当前仍需核对当日预约时段。` : "要求涉及升旗，但自编计划中没有天安门广场。" });
    }
    if (!advice.length) advice.push({ severity: "info", dayIndex: requestedDay ?? 0, text: "未识别到明确景点或餐馆名称；请写完整名称，或直接在逐日列表中增删。" });
    state.customRequestAdvice = advice;
    renderCustomAdvice();
    refreshIcons();
  }

  function saveCustomPlan() {
    if (!state.customDraft) {
      loadCurrentPlanIntoEditor();
      return;
    }
    const base = currentEditorBasePlan();
    const profile = profiles.find((item) => item.id === state.customBasePlanId) || profiles[0];
    if (!base || !profile) return;
    const advice = auditCustomDraft();
    const days = state.customDraft.map((draftDay) => {
      const date = addDays(parseLocalDate(state.startDate), draftDay.dayIndex);
      const timeline = draftDay.items.map((item) => {
        const entity = draftEntity(item);
        if (!entity) return null;
        const startAt = atLocalTime(date, item.start);
        if (item.kind !== "attraction") return buildMealEvent(entity, mealTypeForClock(item.start), startAt, { duration: Number(item.duration), routeNote: "自编安排" });
        return { type: "attraction", attraction: entity, startAt, endAt: addMinutes(startAt, Number(item.duration)), stay: Number(item.duration), displayHighlights: entity.highlights.slice(0, 2) };
      }).filter(Boolean).sort((left, right) => left.startAt - right.startAt);
      const stops = timeline.filter((item) => item.type === "attraction");
      const meals = timeline.filter((item) => item.type === "meal");
      const dayAdvice = advice.filter((item) => item.dayIndex === draftDay.dayIndex && item.severity !== "info");
      return {
        index: draftDay.dayIndex,
        date,
        title: timeline.length ? timeline.map((item) => item.type === "meal" ? item.venue.name : item.attraction.name).join(" · ") : "自由调整",
        weatherNote: stops.length ? dayWeatherNote(draftDay.dayIndex, stops.map((stop) => stop.attraction)) : "自编日程",
        window: { date, startAt: atLocalTime(date, "00:00"), endAt: atLocalTime(date, "23:59") },
        omitted: [],
        auditNotes: dayAdvice.map((item) => ({ kind: item.severity === "error" ? "warning" : "info", text: `自编校核：${item.text}` })),
        stops,
        meals,
        timeline,
        dinnerMeal: null,
        outboundTransit: null,
        inboundTransit: null
      };
    });
    const customPlan = {
      id: "custom",
      name: "自编行程",
      short: "手动排程与校核",
      hotel: base.hotel,
      hotelReason: base.hotelReason,
      hotelRange: base.hotelRange,
      travelStyle: travelStyleRules[state.travelStyle].label,
      journey: base.journey,
      reviewNotes: [`自编方案包含${advice.filter((item) => item.severity === "error").length}项冲突、${advice.filter((item) => item.severity === "warning").length}项提醒；时间按手动输入保存。`],
      days,
      cost: calculatePlanCost({ ...profile, hotelRange: base.hotelRange }, days)
    };
    state.plans = [...state.plans.filter((plan) => plan.id !== "custom"), customPlan];
    state.activePlanId = "custom";
    renderPlanSwitcher();
    renderActivePlan();
    renderTicketPlanSelect();
    renderTickets();
    showToast("自编方案已保存到计划列表。");
  }

  function renderMealEvent(meal) {
    const label = meal.mealType === "breakfast" ? "早餐" : meal.mealType === "lunch" ? "午饭" : "晚饭";
    const content = `
      <i data-lucide="utensils"></i>
      <time>${formatTime(meal.startAt)}—${formatTime(meal.endAt)}</time>
      <div>
        <strong>${label} · ${meal.venue.name}</strong>
        <span>${meal.venue.dishes.slice(0, 2).join(" · ")}</span>
        <small>${meal.routeNote}${meal.includedInVisit ? " · 已包含在景点游玩时长内" : ""}</small>
      </div>
      <em>${formatMoneyRange(...meal.venue.price)}/人</em>`;
    return restaurantById.has(meal.venue.id)
      ? `<button class="meal-stop" type="button" data-restaurant-id="${meal.venue.id}" data-start="${meal.startAt.toISOString()}" data-end="${meal.endAt.toISOString()}" data-included="${meal.includedInVisit}" aria-label="查看${meal.venue.name}详情">${content}</button>`
      : `<div class="meal-stop" data-start="${meal.startAt.toISOString()}" data-end="${meal.endAt.toISOString()}" data-included="${meal.includedInVisit}">${content}</div>`;
  }

  function renderRestEvent(event) {
    return `<div class="rest-stop" data-start="${event.startAt.toISOString()}" data-end="${event.endAt.toISOString()}"><i data-lucide="coffee"></i><time>${formatTime(event.startAt)}—${formatTime(event.endAt)}</time><span>${event.label}</span></div>`;
  }

  function renderActivePlan() {
    const plan = state.plans.find((item) => item.id === state.activePlanId);
    if (!plan) {
      els.planSheet.innerHTML = "";
      return;
    }

    const rosterLabel = teamRosterText();
    els.planSheet.innerHTML = `
      <header class="plan-sheet-header">
        <div>
          <p class="section-kicker">PLAN ${plan.name.toUpperCase()}</p>
          <h2>${plan.name} · ${state.days}天${state.nights}晚</h2>
          <p>${formatDateTime(plan.journey.arrival.startAt)}到京 · ${formatDateTime(plan.journey.departure.endAt)}离京 · ${state.members.length}人</p>
        </div>
        <div class="plan-total"><span>${plan.travelStyle} · 北京行程费用区间</span><strong>${formatMoneyRange(...plan.cost.total)}</strong><small>约${formatMoney(plan.cost.total[0] / state.ages.length)}—${formatMoney(plan.cost.total[1] / state.ages.length)}/人</small></div>
      </header>
      <section class="team-plan-band" aria-label="团队成员与排程参考">
        <div><span>团队成员</span><strong>${state.members.length}人</strong></div>
        <p>${escapeHtml(rosterLabel)}</p>
        <small>${escapeHtml(teamPlanningNote())}</small>
      </section>
      <div class="hotel-band">
        <div><span>酒店选址 · ${plan.travelStyle}</span><strong>${plan.hotel}</strong></div>
        <p>${plan.hotelReason}</p>
        <b>${formatMoney(plan.hotelRange[0])}—${formatMoney(plan.hotelRange[1])}/间夜</b>
      </div>
      ${plan.reviewNotes.map((note) => `<div class="plan-review-strip"><i data-lucide="route"></i><span>${note}</span></div>`).join("")}
      <div class="plan-days">
        ${plan.days.map((day) => `
          <section class="plan-day">
            <div class="day-index">D${day.index + 1}</div>
            <div class="day-content">
              <div class="day-heading">
                <h3>${day.title}</h3>
                <small>${formatDate(day.date)} · ${day.weatherNote}</small>
              </div>
              ${day.auditNotes.map((note) => `
                <div class="day-audit-note ${note.kind}">
                  <i data-lucide="${note.kind === "verified" ? "badge-check" : note.kind === "warning" ? "triangle-alert" : "info"}"></i>
                  <span>${note.text}${note.url ? ` <a href="${note.url}" target="_blank" rel="noopener noreferrer">核对来源</a>` : ""}</span>
                </div>`).join("")}
              ${day.outboundTransit ? `
                <div class="day-commute is-outbound">
                  <i data-lucide="navigation"></i>
                  <time>${formatTime(day.outboundTransit.departAt)}</time>
                  <span>酒店 → ${day.stops[0].attraction.name} · ${day.outboundTransit.label} · 预计${formatTime(day.outboundTransit.arriveAt)}到达</span>
                  <em>约${day.outboundTransit.minutes}分钟</em>
                </div>` : ""}
              <div class="day-stops">
                ${day.timeline.map((event) => event.type === "attraction" ? `
                    <div class="day-stop" data-start="${event.startAt.toISOString()}" data-end="${event.endAt.toISOString()}">
                      <time>${formatTime(event.startAt)}</time>
                      <div><strong>${event.attraction.name}</strong><span>${event.displayHighlights.join(" · ")}</span></div>
                      <em>${formatDuration(event.stay)}</em>
                    </div>
                  ` : event.type === "transit" ? `<div class="day-transit" data-start="${event.departAt.toISOString()}" data-end="${event.arriveAt.toISOString()}"><i data-lucide="move-right"></i>${formatTime(event.departAt)}—${formatTime(event.arriveAt)} · ${event.label} · 约${event.minutes}分钟</div>` : event.type === "rest" ? renderRestEvent(event) : renderMealEvent(event)).join("")}
              </div>
              ${day.inboundTransit ? `
                <div class="day-commute is-return">
                  <i data-lucide="undo-2"></i>
                  <time>${formatTime(day.inboundTransit.departAt)}</time>
                  <span>${day.stops.at(-1).attraction.name} → 酒店 · ${day.inboundTransit.label} · 预计${formatTime(day.inboundTransit.arriveAt)}回到酒店</span>
                  <em>约${day.inboundTransit.minutes}分钟</em>
                </div>` : ""}
              ${day.dinnerMeal ? renderMealEvent(day.dinnerMeal) : ""}
              ${day.omitted.length ? `<div class="day-window-note"><i data-lucide="clock-alert"></i><span>受${day.index === 0 && day.index === state.days - 1 ? "首尾" : day.index === 0 ? "到京" : day.index === state.days - 1 ? "离京" : "当日"}时间窗口限制，未排入：${day.omitted.map((item) => item.name).join("、")}。</span></div>` : ""}
            </div>
          </section>`).join("")}
      </div>
      <div class="cost-breakdown">
        <div class="cost-item"><span>酒店 ${plan.cost.rooms}间 × ${plan.cost.nights}晚</span><strong>${formatMoneyRange(...plan.cost.hotel)}</strong></div>
        <div class="cost-item"><span>景点门票</span><strong>${formatMoneyRange(...plan.cost.ticket)}</strong></div>
        <div class="cost-item"><span>餐饮</span><strong>${formatMoneyRange(...plan.cost.food)}</strong></div>
        <div class="cost-item"><span>市内交通</span><strong>${formatMoneyRange(...plan.cost.local)}</strong></div>
      </div>
      <div class="plan-caveat"><i data-lucide="triangle-alert"></i><span>${overallWeatherAdvice()} 当前为“${paceRules[state.pace].label}”节奏与“${plan.travelStyle}”方式；行程规则与美食资料核验于2026-09-03，静态站点不会在每次生成时实时抓取平台。费用不含进出北京的大交通，索道、游船、优速通和购物未计入。</span></div>`;
    refreshIcons();
  }

  function renderTicketPlanSelect() {
    els.ticketPlanSelect.innerHTML = state.plans.map((plan) => `<option value="${plan.id}" ${plan.id === state.activePlanId ? "selected" : ""}>${plan.name} · ${state.days}天${state.nights}晚</option>`).join("");
  }

  function bookingEntries(plan) {
    const seen = new Set();
    const entries = [];
    plan.days.forEach((day) => {
      day.stops.forEach((stop) => {
        if (seen.has(stop.attraction.id)) return;
        seen.add(stop.attraction.id);
        const visitDate = day.date;
        const bookingDate = stop.attraction.booking.days > 0 ? addDays(visitDate, -stop.attraction.booking.days) : visitDate;
        entries.push({ attraction: stop.attraction, visitDate, bookingDate, dayIndex: day.index });
      });
    });
    return entries.sort((a, b) => a.bookingDate - b.bookingDate || a.visitDate - b.visitDate);
  }

  function bookingStatus(entry) {
    if (entry.attraction.booking.kind === "open") return { label: "无需预约", kind: "open" };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(entry.bookingDate);
    bookingDate.setHours(0, 0, 0, 0);
    const visitDate = new Date(entry.visitDate);
    visitDate.setHours(23, 59, 59, 999);
    if (today > visitDate) return { label: "参观日期已过", kind: "open" };
    if (today < bookingDate) return { label: "等待开放", kind: entry.attraction.booking.kind };
    return { label: entry.attraction.booking.kind === "urgent" ? "现在可预约" : "现在可购买", kind: entry.attraction.booking.kind };
  }

  function renderTickets() {
    const plan = state.plans.find((item) => item.id === state.activePlanId);
    if (!plan) {
      els.ticketList.innerHTML = '<div class="empty-state"><strong>尚未生成计划</strong></div>';
      return;
    }

    const entries = bookingEntries(plan);
    const now = new Date();
    const future = entries.filter((entry) => entry.attraction.booking.kind !== "open" && entry.bookingDate >= addDays(now, -1));
    const next = future[0] || entries.find((entry) => entry.attraction.booking.kind !== "open");
    if (next) {
      els.nextBookingDate.textContent = `${formatDate(next.bookingDate, true)}${next.attraction.booking.time ? ` ${next.attraction.booking.time}` : ""}`;
      els.nextBookingName.textContent = `${next.attraction.name} · D${next.dayIndex + 1}`;
    } else {
      els.nextBookingDate.textContent = "无需卡点预约";
      els.nextBookingName.textContent = "当前计划均可现场或提前购买";
    }

    els.ticketList.innerHTML = entries.map((entry) => {
      const status = bookingStatus(entry);
      const dateText = entry.attraction.booking.kind === "open"
        ? "到访日"
        : entry.attraction.booking.kind === "advance" ? "建议购买" : "开放日";
      return `
        <article class="ticket-row">
          <div class="ticket-date-cell">
            <time>${dateText}</time>
            <strong>${formatDate(entry.bookingDate)}</strong>
            <small>${entry.attraction.booking.time || "平台放量为准"}</small>
          </div>
          <div class="ticket-main">
            <h3>${entry.attraction.name}</h3>
            <p>D${entry.dayIndex + 1} · ${formatDate(entry.visitDate)} · ${entry.attraction.priceLabel}</p>
            <span class="ticket-status"><i class="status-dot ${status.kind}"></i>${status.label}</span>
          </div>
          <div class="ticket-rule">
            <strong>${entry.attraction.booking.channel}</strong>
            <p>${entry.attraction.booking.rule}</p>
          </div>
          <div class="ticket-actions">
            <a class="text-button" href="${entry.attraction.booking.url}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>官方入口</a>
            ${entry.attraction.booking.miniProgram ? `<button class="text-button copy-mini" type="button" data-copy="${entry.attraction.booking.miniProgram}"><i data-lucide="copy"></i>复制小程序</button>` : `<button class="text-button" type="button" data-attraction-id="${entry.attraction.id}"><i data-lucide="info"></i>查看详情</button>`}
          </div>
        </article>`;
    }).join("");
    refreshIcons();
  }

  function downloadBookingCalendar() {
    const plan = state.plans.find((item) => item.id === state.activePlanId);
    if (!plan) return showToast("请先生成旅游计划。");
    const entries = bookingEntries(plan).filter((entry) => entry.attraction.booking.kind !== "open");
    const escapeIcs = (text) => String(text).replaceAll("\\", "\\\\").replaceAll(";", "\\;").replaceAll(",", "\\,").replaceAll("\n", "\\n");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const events = entries.map((entry, index) => {
      const date = dateKey(entry.bookingDate).replaceAll("-", "");
      const description = `${entry.attraction.booking.rule} 官方入口：${entry.attraction.booking.url}`;
      return [
        "BEGIN:VEVENT",
        `UID:jinjing-${plan.id}-${entry.attraction.id}-${index}@local`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${date}`,
        `SUMMARY:${escapeIcs(`预约提醒：${entry.attraction.name}`)}`,
        `DESCRIPTION:${escapeIcs(description)}`,
        "END:VEVENT"
      ].join("\r\n");
    }).join("\r\n");
    const content = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//进京赶考//Booking Reminders//ZH-CN\r\nCALSCALE:GREGORIAN\r\n${events}\r\nEND:VCALENDAR`;
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `进京赶考-${plan.name}-预约提醒.ics`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("预约提醒日历已下载。");
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      const input = document.createElement("textarea");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    showToast(`已复制：${value}`);
  }

  function selectSegment(container, button) {
    container.querySelectorAll("button").forEach((item) => item.classList.toggle("is-selected", item === button));
  }

  function setupEvents() {
    els.nav.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));

    els.search.addEventListener("input", () => {
      state.query = els.search.value;
      renderAttractions();
    });

    els.categoryFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.category = button.dataset.category;
      renderCategoryFilters();
      renderAttractions();
    });

    els.freeOnly.addEventListener("change", () => {
      state.freeOnly = els.freeOnly.checked;
      renderAttractions();
    });

    els.clearFilters.addEventListener("click", () => {
      state.category = "全部";
      state.query = "";
      state.freeOnly = false;
      els.search.value = "";
      els.freeOnly.checked = false;
      renderCategoryFilters();
      renderAttractions();
    });

    els.attractionGrid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-attraction-id]");
      if (button) openAttraction(button.dataset.attractionId);
    });

    els.foodSearch.addEventListener("input", () => {
      state.foodQuery = els.foodSearch.value;
      renderRestaurants();
    });

    els.foodPriceFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-food-tier]");
      if (!button) return;
      state.foodTier = button.dataset.foodTier;
      renderFoodFilters();
      renderRestaurants();
    });

    els.foodAuthorFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-food-author]");
      if (!button) return;
      state.foodAuthor = button.dataset.foodAuthor;
      renderFoodFilters();
      renderRestaurants();
    });

    els.foodGrid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-restaurant-id]");
      if (button) openRestaurant(button.dataset.restaurantId);
    });

    els.dialogClose.addEventListener("click", () => els.dialog.close());
    els.dialog.addEventListener("click", (event) => {
      if (event.target === els.dialog) els.dialog.close();
    });
    els.dialog.addEventListener("click", (event) => {
      const copyButton = event.target.closest(".copy-mini");
      if (copyButton) copyText(copyButton.dataset.copy);
    });
    els.restaurantDialogClose.addEventListener("click", () => els.restaurantDialog.close());
    els.restaurantDialog.addEventListener("click", (event) => {
      if (event.target === els.restaurantDialog) els.restaurantDialog.close();
    });

    els.addTeamMember.addEventListener("click", () => {
      captureTeamState();
      if (state.members.length >= 20) return showToast("团队成员最多20人。");
      const member = { id: `member-${++memberSequence}`, name: "", gender: "private", age: null };
      state.members.push(member);
      renderTeamMembers(member.id);
      captureTeamState();
    });
    els.teamMembers.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-member]");
      if (!removeButton) return;
      captureTeamState();
      if (state.members.length <= 1) return showToast("团队至少保留1名成员。");
      const row = removeButton.closest("[data-member-id]");
      state.members = state.members.filter((member) => member.id !== row.dataset.memberId);
      renderTeamMembers();
      captureTeamState();
      schedulePlanRegeneration();
    });
    els.teamMembers.addEventListener("input", captureTeamState);
    els.teamMembers.addEventListener("change", () => {
      if (captureTeamState()) schedulePlanRegeneration();
    });
    els.arrivalDateTime.addEventListener("input", syncTripRange);
    els.departureDateTime.addEventListener("input", syncTripRange);
    els.arrivalDateTime.addEventListener("change", schedulePlanRegeneration);
    els.departureDateTime.addEventListener("change", schedulePlanRegeneration);

    els.paceMode.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      state.pace = button.dataset.value;
      selectSegment(els.paceMode, button);
      schedulePlanRegeneration();
    });

    els.travelStyleMode.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      state.travelStyle = button.dataset.value;
      selectSegment(els.travelStyleMode, button);
      renderTravelStyleNote();
      schedulePlanRegeneration();
    });

    els.plannerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await generatePlans();
    });

    els.planSwitcher.addEventListener("click", (event) => {
      const button = event.target.closest("[data-plan-id]");
      if (!button) return;
      state.activePlanId = button.dataset.planId;
      renderPlanSwitcher();
      renderActivePlan();
      renderTicketPlanSelect();
      renderTickets();
    });

    els.togglePlanEditor.addEventListener("click", () => {
      state.editorOpen = !state.editorOpen;
      if (state.editorOpen && !state.customDraft) loadCurrentPlanIntoEditor();
      renderPlanEditor();
    });
    els.loadCurrentPlan.addEventListener("click", loadCurrentPlanIntoEditor);
    els.analyzeAdjustment.addEventListener("click", analyzeAdjustmentRequest);
    els.saveCustomPlan.addEventListener("click", saveCustomPlan);
    els.customDays.addEventListener("click", (event) => {
      const dayElement = event.target.closest("[data-custom-day]");
      if (!dayElement || !state.customDraft) return;
      const dayIndex = Number(dayElement.dataset.customDay);
      const day = state.customDraft[dayIndex];
      const addButton = event.target.closest("[data-add-custom]");
      if (addButton) {
        addCustomItem(dayIndex, addButton.dataset.addCustom);
        return;
      }
      const row = event.target.closest("[data-custom-item]");
      if (!row) return;
      const itemIndex = day.items.findIndex((item) => item.uid === row.dataset.customItem);
      if (itemIndex < 0) return;
      if (event.target.closest("[data-remove-custom]")) {
        day.items.splice(itemIndex, 1);
        renderPlanEditor();
        return;
      }
      const moveButton = event.target.closest("[data-move-custom]");
      if (!moveButton) return;
      const targetIndex = moveButton.dataset.moveCustom === "up" ? itemIndex - 1 : itemIndex + 1;
      if (targetIndex < 0 || targetIndex >= day.items.length) return;
      const currentStart = day.items[itemIndex].start;
      day.items[itemIndex].start = day.items[targetIndex].start;
      day.items[targetIndex].start = currentStart;
      [day.items[itemIndex], day.items[targetIndex]] = [day.items[targetIndex], day.items[itemIndex]];
      renderPlanEditor();
    });
    els.customDays.addEventListener("change", (event) => {
      const field = event.target.closest("[data-custom-field]");
      const row = event.target.closest("[data-custom-item]");
      const dayElement = event.target.closest("[data-custom-day]");
      if (!field || !row || !dayElement || !state.customDraft) return;
      const day = state.customDraft[Number(dayElement.dataset.customDay)];
      const item = day.items.find((entry) => entry.uid === row.dataset.customItem);
      if (!item) return;
      if (field.dataset.customField === "entity") {
        const [kind, id] = field.value.split(":");
        item.kind = kind;
        item.id = id;
        item.embedded = false;
      } else if (field.dataset.customField === "duration") {
        item.duration = Math.max(15, Math.min(720, Number(field.value) || 60));
      } else {
        item.start = field.value;
      }
      state.customRequestAdvice = [];
      renderCustomAdvice();
      refreshIcons();
    });

    els.planSheet.addEventListener("click", (event) => {
      const restaurantButton = event.target.closest("[data-restaurant-id]");
      if (restaurantButton) openRestaurant(restaurantButton.dataset.restaurantId);
    });

    els.ticketPlanSelect.addEventListener("change", () => {
      state.activePlanId = els.ticketPlanSelect.value;
      renderPlanSwitcher();
      renderActivePlan();
      renderTickets();
    });

    els.ticketList.addEventListener("click", (event) => {
      const copyButton = event.target.closest(".copy-mini");
      if (copyButton) copyText(copyButton.dataset.copy);
      const detailButton = event.target.closest("[data-attraction-id]");
      if (detailButton) openAttraction(detailButton.dataset.attractionId);
    });

    els.downloadReminders.addEventListener("click", downloadBookingCalendar);
    els.printPlan.addEventListener("click", () => {
      switchView("planner");
      window.setTimeout(() => window.print(), 250);
    });

    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        switchView("attractions");
        window.setTimeout(() => els.search.focus(), 150);
      }
    });
  }

  async function initialize() {
    renderCategoryFilters();
    renderAttractions();
    renderFoodFilters();
    renderRestaurants();
    renderTeamMembers();
    captureTeamState();
    renderTravelStyleNote();
    setupEvents();
    refreshIcons();
    await generatePlans();
  }

  initialize();
})();

