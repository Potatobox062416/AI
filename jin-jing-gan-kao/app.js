(function () {
  "use strict";

  const attractions = window.ATTRACTIONS || [];
  const profiles = window.PLAN_PROFILES || [];
  const restaurants = window.RESTAURANTS || [];
  const attractionById = new Map(attractions.map((item) => [item.id, item]));
  const restaurantById = new Map(restaurants.map((item) => [item.id, item]));
  const categoryOrder = ["全部", "古都", "园林", "博物馆", "长城", "亲子", "现代", "街区"];
  const paceRules = {
    early: { label: "特种兵", start: "06:30", end: "21:30", durationFactor: 0.75 },
    balanced: { label: "高效赶考", start: "07:20", end: "20:45", durationFactor: 0.86 },
    relaxed: { label: "松弛漫游", start: "08:30", end: "19:30", durationFactor: 1 }
  };
  const transferRules = {
    rail: {
      label: "高铁",
      terminal: "北京铁路到达站",
      route: "地铁 / 出租车",
      arrivalSegments: [["出站与步行", 20], ["铁路站至酒店", 55], ["寄存行李", 20]],
      departureSegments: [["酒店至铁路站", 55], ["进站安检与候车", 60]],
      dinnerDepartureSegments: [["酒店至铁路站", 55], ["铁路站内简餐", 35], ["进站安检、检票与候车", 60]],
      dinnerSegmentLabel: "铁路站内简餐"
    },
    air: {
      label: "飞机",
      terminal: "首都或大兴机场",
      route: "机场快轨 / 地铁 / 出租车",
      arrivalSegments: [["下机与取行李", 45], ["机场至酒店", 80], ["寄存行李", 20]],
      departureSegments: [["酒店至机场", 80], ["值机、安检与登机", 120]],
      dinnerDepartureSegments: [["酒店至机场", 80], ["值机与安检", 60], ["候机区简餐", 40], ["登机等候", 60]],
      dinnerSegmentLabel: "候机区简餐"
    },
    drive: {
      label: "自驾",
      terminal: "酒店",
      route: "自驾",
      arrivalSegments: [["停车与入住", 40]],
      departureSegments: [["退房与装车", 30]],
      dinnerDepartureSegments: [["酒店片区简餐", 40], ["退房与装车", 30]],
      dinnerSegmentLabel: "酒店片区简餐"
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
    universal: { open: "09:30", latestStart: "18:00", close: "20:00", dynamicHours: true }
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
    transportMode: "rail",
    pace: "balanced",
    ages: [35, 33, 10, 6],
    arrivalDateTime: "2026-10-01T09:30",
    departureDateTime: "2026-10-05T18:00",
    startDate: "2026-10-01",
    days: 5,
    nights: 4,
    origin: "上海",
    returnCity: "上海",
    weather: [],
    weatherMode: "climate",
    plans: [],
    activePlanId: null,
    foodTier: "all",
    foodAuthor: "all",
    foodQuery: "",
    intercity: { low: 3500, high: 4800, label: "距离模型估算" }
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
    teamAges: document.querySelector("#team-ages"),
    teamCount: document.querySelector("#team-count"),
    ageMessage: document.querySelector("#age-message"),
    origin: document.querySelector("#origin"),
    returnCity: document.querySelector("#return-city"),
    arrivalDateTime: document.querySelector("#arrival-datetime"),
    departureDateTime: document.querySelector("#departure-datetime"),
    tripDuration: document.querySelector("#trip-duration"),
    tripTimeMessage: document.querySelector("#trip-time-message"),
    transportMode: document.querySelector("#transport-mode"),
    transportOptions: document.querySelector("#transport-options"),
    paceMode: document.querySelector("#pace-mode"),
    weatherStrip: document.querySelector("#weather-strip"),
    weatherBrief: document.querySelector("#weather-brief"),
    planSwitcher: document.querySelector("#plan-switcher"),
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

  function parseAges(value) {
    return String(value)
      .split(/[，,、;；\s]+/)
      .map((part) => Number.parseInt(part, 10))
      .filter((age) => Number.isFinite(age) && age >= 0 && age <= 110);
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
      else counts.other += 1;
      return counts;
    }, { all: restaurants.length, daxiang: 0, daba: 0, other: 0 });
    const authorFilters = [["all", "全部来源"], ["daxiang", "大祥哥来了"], ["daba", "大霸子来了"], ["other", "其他核验"]];
    els.foodAuthorFilters.innerHTML = authorFilters.map(([value, label]) => `
      <button class="food-filter ${state.foodAuthor === value ? "is-selected" : ""}" type="button" data-food-author="${value}">${label} ${authorCounts[value]}</button>
    `).join("");
  }

  function restaurantImages(item) {
    const remoteImages = window.RESTAURANT_IMAGE_URLS?.[item.id];
    return Array.isArray(remoteImages) && remoteImages.length >= 2
      ? remoteImages.slice(0, 2)
      : [1, 2].map((index) => `assets/restaurants/${item.id}/${item.id}-${index}.jpg`);
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
      container.innerHTML = restaurantImages(item).map((file, index) => {
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
        || (state.foodAuthor === "other" && !["大祥哥来了", "大霸子来了"].includes(creator));
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

  function updateAgeState() {
    const ages = parseAges(els.teamAges.value);
    const valid = ages.length > 0 && ages.length <= 20;
    els.ageMessage.classList.toggle("is-error", !valid);
    els.ageMessage.textContent = valid
      ? `已识别 ${ages.length} 人；儿童、学生和老人优惠按公开常规政策估算。`
      : "请输入1—20个有效年龄，用逗号或空格分隔。";
    els.teamCount.textContent = valid ? `${ages.length}人` : "待修正";
    if (valid) state.ages = ages;
    return valid;
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

    if (!error) {
      const rule = transferRules[state.transportMode];
      const arrivalReadyAt = addMinutes(arrival, rule.arrivalSegments.reduce((sum, segment) => sum + segment[1], 0));
      const departureSegments = departureSegmentsFor(rule, departure);
      const leaveForDepartureAt = addMinutes(departure, -departureSegments.reduce((sum, segment) => sum + segment[1], 0));
      if (arrivalReadyAt >= leaveForDepartureAt) {
        error = `到京接驳预计${formatTime(arrivalReadyAt)}完成，离京接驳需${formatTime(leaveForDepartureAt)}开始，时间窗口重叠。`;
      }
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
    const modeNote = state.transportMode === "drive"
      ? "自驾时间按抵达、驶离酒店理解。"
      : "高铁或飞机时间按抵达、计划离京时刻理解。";
    els.tripTimeMessage.textContent = `共${hours}小时${minutes ? `${minutes}分钟` : ""} · ${modeNote}`;

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

  function renderTransportOptions() {
    const arrival = parseLocalDateTime(els.arrivalDateTime.value);
    const departure = parseLocalDateTime(els.departureDateTime.value);
    const origin = escapeHtml(els.origin.value.trim() || "出发地");
    const destination = escapeHtml(els.returnCity.value.trim() || "返回地");
    if (!arrival || !departure || departure <= arrival) {
      els.transportOptions.innerHTML = '<div class="transport-options-empty">完善到京、离京时间后显示往返方案。</div>';
      return;
    }

    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    const previousDate = addDays(arrivalDate, -1);
    let content = "";
    let links = [];

    if (state.transportMode === "rail") {
      const previousDaySaleDate = addDays(previousDate, -14);
      const sameDaySaleDate = addDays(arrivalDate, -14);
      const returnSaleDate = addDays(departureDate, -14);
      const earlyArrivalRisk = arrival.getHours() < 11;
      content = `
        <div class="transport-options-head"><div><span>铁路往返方案</span><strong>${origin} → 北京 → ${destination}</strong></div><small>动态车次待12306开售</small></div>
        ${transportOptionRow("前一日高铁 + 住宿", "推荐", `${formatDate(previousDate)}出发，避免当日早到不可行；采用后需同步提前到京时间。`, "recommended")}
        ${transportOptionRow("前夜卧铺 / 夜间铁路", "待核验", `${formatDate(previousDate)}乘车，能否在${formatTime(arrival)}前抵京须等运行图与车票开售。`)}
        ${transportOptionRow("当日高铁", earlyArrivalRisk ? "大概率不满足" : "开售后筛选", `${formatDate(arrivalDate)}同日乘车，候选必须在${formatTime(arrival)}前到达北京。`, earlyArrivalRisk ? "blocked" : "neutral")}
        ${transportOptionRow("返程直达铁路", `${formatDate(departureDate)} ${formatTime(departure)}`, `北京 → ${destination}，实际车次、席别与到达时间待12306开售后选择。`)}
        <div class="transport-sale-grid three"><span>${formatDate(previousDate)}方案开售日<strong>${formatDate(previousDaySaleDate, true)}</strong><small>${origin.includes("上海") ? "上海站14:45 / 虹桥13:45，前一日复核" : "按实际出发站起售时间"}</small></span><span>${formatDate(arrivalDate)}方案开售日<strong>${formatDate(sameDaySaleDate, true)}</strong><small>乘车日减14天，按实际车站起售时间</small></span><span>返程开售日<strong>${formatDate(returnSaleDate, true)}</strong><small>北京南参考12:45，前一日复核</small></span></div>`;
      links = [
        ["https://www.12306.cn/index/", "12306官方购票"],
        ["https://www.12306.cn/index/view/infos/sale_time.html", "查询起售时间"]
      ];
    } else if (state.transportMode === "air") {
      const hotelReady = addMinutes(arrival, 145);
      content = `
        <div class="transport-options-head"><div><span>机票往返方案</span><strong>${origin} → 北京 → ${destination}</strong></div><small>以航司支付页为准</small></div>
        ${transportOptionRow("前夜到京", "最稳妥", `${formatDate(previousDate)}晚间落地，减少国庆早班延误对D1的影响。`, "recommended")}
        ${transportOptionRow("当日早班直飞", "实时核验", `筛选${formatTime(arrival)}前落地航班；按缓冲估算约${formatTime(hotelReady)}完成酒店寄存。`)}
        ${transportOptionRow("双机场比价", "价格优先", "同时比较虹桥/浦东与首都/大兴，核对行李额、退改及进城时间。")}
        ${transportOptionRow("返程直飞", `${formatDate(departureDate)} ${formatTime(departure)}`, `北京 → ${destination}，筛选接近计划离京时刻的航班并核对行李与退改。`)}
        <div class="transport-sale-grid one"><span>查询提示<strong>前往航司或平台实时查询</strong><small>能否查询、库存、含税价与退改规则均以支付页为准</small></span></div>`;
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

    els.transportOptions.innerHTML = `${content}<div class="transport-option-actions">${links.map(([url, label]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}<i data-lucide="external-link"></i></a>`).join("")}</div><p>当前为交通查询策略，不代表已有余票、确认车次、航班或锁定价格。</p>`;
    refreshIcons();
  }

  function collectFormState() {
    if (!updateAgeState() || !syncTripRange()) return false;
    state.origin = els.origin.value.trim() || "出发地";
    state.returnCity = els.returnCity.value.trim() || state.origin;
    renderTransportOptions();
    return true;
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
    const rule = transferRules[state.transportMode];
    const arrivalAt = parseLocalDateTime(state.arrivalDateTime);
    const departureAt = parseLocalDateTime(state.departureDateTime);
    const arrivalSegments = buildSegmentTimeline(arrivalAt, rule.arrivalSegments);
    const departureDefinitions = departureSegmentsFor(rule, departureAt);
    const departureTotal = departureDefinitions.reduce((sum, segment) => sum + segment[1], 0);
    const leaveHotelAt = addMinutes(departureAt, -departureTotal);
    const departureSegments = buildSegmentTimeline(leaveHotelAt, departureDefinitions);
    const dinnerSegment = departureSegments.find((segment) => segment.label === rule.dinnerSegmentLabel) || null;
    return {
      mode: state.transportMode,
      rule,
      hotel: profile.hotel,
      arrival: {
        startAt: arrivalAt,
        endAt: arrivalSegments.at(-1)?.endAt || arrivalAt,
        totalMinutes: rule.arrivalSegments.reduce((sum, segment) => sum + segment[1], 0),
        segments: arrivalSegments
      },
      departure: {
        startAt: leaveHotelAt,
        endAt: departureAt,
        totalMinutes: departureTotal,
        segments: departureSegments,
        dinnerWindow: dinnerSegment ? { startAt: dinnerSegment.startAt, endAt: dinnerSegment.endAt } : null
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
    return {
      id, name, zone, price, dishes, duration, tierLabel: "¥",
      constraint: "现场选择，以当天营业和排队情况为准。",
      fact: null,
      video: null,
      service: { lunch: ["10:30", "15:30"], dinner: ["17:00", "21:30"] }
    };
  }

  function selectLunchVenue(items) {
    const ids = new Set(items.map((item) => item.id));
    if (ids.has("universal")) return { venue: restaurantById.get("three-broomsticks"), embeddedIn: "universal" };
    if (ids.has("summer-palace")) return { venue: restaurantById.get("tingli"), embeddedIn: "summer-palace" };
    if (ids.has("badaling")) {
      if (state.transportMode === "drive") return { venue: restaurantById.get("commune-kitchen"), embeddedIn: null, extraTransit: 35 };
      return { venue: genericMeal("badaling-simple", "八达岭景区内简餐", "延庆", [35, 70], ["热饮", "面食", "便携套餐"]), embeddedIn: "badaling" };
    }
    if (ids.has("mutianyu")) return { venue: genericMeal("mutianyu-simple", "慕田峪景区内简餐", "怀柔", [35, 70], ["面食", "热饮", "便携套餐"]), embeddedIn: "mutianyu" };
    if (ids.has("temple-heaven")) return { venue: restaurantById.get("yin-san"), embeddedIn: null };
    if (ids.has("prince-gong") || ids.has("beihai") || ids.has("shichahai")) return { venue: restaurantById.get("huguosi"), embeddedIn: null };
    if (ids.has("palace-museum") || ids.has("tiananmen")) return { venue: restaurantById.get("duyichu"), embeddedIn: null };
    if (ids.has("art-798") || ids.has("olympic-park")) return { venue: restaurantById.get("dadong"), embeddedIn: null };
    return { venue: restaurantById.get("duyichu"), embeddedIn: null };
  }

  function selectDinnerVenue(profile, dayIndex) {
    const options = {
      classic: ["siji-minfu", "liu-ji", "duyichu", "siji-minfu", "nanmen", "trb", "dadong"],
      family: ["nanmen", "duyichu", "siji-minfu", "huguosi", "nanmen", "dadong", "liu-ji"],
      culture: ["trb", "siji-minfu", "nanmen", "liu-ji", "trb", "duyichu", "dadong"],
      modern: ["dadong", "trb", "siji-minfu", "dadong", "trb", "nanmen", "liu-ji"],
      relaxed: ["nanmen", "trb", "siji-minfu", "nanmen", "duyichu", "dadong", "huguosi"]
    };
    return restaurantById.get((options[profile.id] || options.classic)[dayIndex % 7]);
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

  function buildDinnerMeal(profile, dayIndex, date, inboundTransit, journey) {
    if (dayIndex === state.days - 1) {
      const dinnerWindow = journey.departure.dinnerWindow;
      if (!dinnerWindow || dateKey(dinnerWindow.startAt) !== dateKey(date)) return null;
      const venue = genericMeal("terminal-simple", state.transportMode === "air" ? "机场候机区简餐" : state.transportMode === "drive" ? "酒店片区简餐" : "铁路站内简餐", "枢纽", [30, 65], ["热食", "饮品", "便携餐"], 40);
      return buildMealEvent(venue, "dinner", dinnerWindow.startAt, {
        duration: Math.round((dinnerWindow.endAt - dinnerWindow.startAt) / 60000),
        routeNote: state.transportMode === "drive" ? "用餐后退房装车，再按计划驶离" : state.transportMode === "air" ? "完成值机安检后用餐，随后进入登机等候" : "抵达铁路站后用餐，随后完成安检、检票与候车"
      });
    }
    const venue = selectDinnerVenue(profile, dayIndex);
    if (!venue) return null;
    const service = mealServiceWindow(venue, "dinner", date);
    const hotelReady = inboundTransit?.arriveAt || atLocalTime(date, "17:00");
    let startAt = new Date(Math.max(addMinutes(hotelReady, 25).getTime(), service?.openAt?.getTime() || 0));
    const plannedEndAt = addMinutes(startAt, venue.duration || 60);
    if (service && plannedEndAt > service.closeAt) {
      const fallback = genericMeal("hotel-simple", "酒店片区简餐", profile.hotelZone, [40, 90], ["本地家常菜", "面食", "时令菜"], 60);
      startAt = addMinutes(hotelReady, 20);
      if (addMinutes(startAt, fallback.duration) > atLocalTime(date, "21:30")) return null;
      return buildMealEvent(fallback, "dinner", startAt, { routeNote: "酒店周边步行选择" });
    }
    return buildMealEvent(venue, "dinner", startAt, { routeNote: "从酒店短途前往，建议提前取号或预约" });
  }

  function layoutScheduledItems(items, window, profile, flagInfo) {
    if (!items.length || window.startAt >= window.endAt) return null;
    const usesFlagWindow = flagInfo?.feasible && items[0]?.id === "tiananmen";
    const lunchPlan = selectLunchVenue(items);
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
        const routeMinutes = lunchPlan.extraTransit || 10;
        const earliest = atLocalTime(window.date, "11:15");
        const mealStart = new Date(Math.max(addMinutes(cursor, routeMinutes).getTime(), earliest.getTime(), service?.openAt?.getTime() || 0));
        const meal = buildMealEvent(lunchPlan.venue, "lunch", mealStart, { routeNote: `顺路接驳约${routeMinutes}分钟` });
        if (!service || meal.endAt <= service.closeAt) {
          meals.push(meal);
          timeline.push(meal);
          lunchScheduled = true;
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
    timeline.sort((a, b) => a.startAt - b.startAt);
    return { valid: true, outboundTransit, stops, inboundTransit, meals, timeline };
  }

  function scheduleDay(ids, dayIndex, profile, journey) {
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
    let layout = layoutScheduledItems(scheduledItems, window, profile, flagInfo);

    while (scheduledItems.length && (!layout || !layout.valid || layout.inboundTransit.arriveAt > window.endAt)) {
      if (layout?.constraintIssue) constraintNotes.push(layout.constraintIssue);
      scheduledItems.pop();
      layout = layoutScheduledItems(scheduledItems, window, profile, flagInfo);
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
    const dinnerMeal = buildDinnerMeal(profile, dayIndex, date, layout?.inboundTransit || null, journey);
    const meals = [...(layout?.meals || []), ...(dinnerMeal ? [dinnerMeal] : [])];
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
    const localBase = state.ages.length * state.days * 32 + (hasWall ? state.ages.length * 110 : 0) + (hasUniversal ? state.ages.length * 18 : 0);
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
      intercity: [state.intercity.low, state.intercity.high],
      total: [
        roundMoney(state.intercity.low + hotelLow + foodLow + localLow + ticketLow, 50),
        roundMoney(state.intercity.high + hotelHigh + foodHigh + localHigh + ticketHigh, 50)
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

  function buildPlan(profile) {
    const journey = buildJourneyWindow(profile);
    const prepared = prepareRouteDays(profile, journey);
    const scheduledDays = prepared.routes.map((ids, index) => scheduleDay(ids, index, profile, journey));
    return {
      id: profile.id,
      name: profile.name,
      short: profile.short,
      hotel: profile.hotel,
      hotelReason: profile.hotelReason,
      hotelRange: profile.hotelRange,
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
      const [weather, intercity] = await Promise.all([loadWeather(), estimateIntercity()]);
      if (generationVersion !== planGenerationVersion) return;
      state.weather = weather;
      state.intercity = intercity;
      const selectedProfiles = profiles.slice(0, 4);
      if (state.ages.some((age) => age >= 60)) selectedProfiles.push(profiles.find((profile) => profile.id === "relaxed"));
      state.plans = selectedProfiles.filter(Boolean).map(buildPlan);
      if (!state.plans.some((plan) => plan.id === state.activePlanId)) state.activePlanId = state.plans[0]?.id || null;
      renderWeather();
      renderPlanSwitcher();
      renderActivePlan();
      renderTicketPlanSelect();
      renderTickets();
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

  function journeySegmentLabel(segments) {
    return segments.map((segment) => `${segment.label}${segment.minutes}分钟`).join(" · ");
  }

  function renderMealEvent(meal) {
    const label = meal.mealType === "lunch" ? "午饭" : "晚饭";
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

    const agesLabel = state.ages.join("、");
    els.planSheet.innerHTML = `
      <header class="plan-sheet-header">
        <div>
          <p class="section-kicker">PLAN ${plan.name.toUpperCase()}</p>
          <h2>${plan.name} · ${state.days}天${state.nights}晚</h2>
          <p>${escapeHtml(state.origin)} → 北京 → ${escapeHtml(state.returnCity)} · ${formatDateTime(plan.journey.arrival.startAt)}到京 · ${formatDateTime(plan.journey.departure.endAt)}离京 · ${state.ages.length}人（${agesLabel}岁）</p>
        </div>
        <div class="plan-total"><span>团队总费用区间</span><strong>${formatMoneyRange(...plan.cost.total)}</strong><small>约${formatMoney(plan.cost.total[0] / state.ages.length)}—${formatMoney(plan.cost.total[1] / state.ages.length)}/人</small></div>
      </header>
      <div class="hotel-band">
        <div><span>酒店选址</span><strong>${plan.hotel}</strong></div>
        <p>${plan.hotelReason}</p>
        <b>${formatMoney(plan.hotelRange[0])}—${formatMoney(plan.hotelRange[1])}/间夜</b>
      </div>
      <section class="journey-band" aria-label="往返通勤估算">
        <div class="journey-leg">
          <i data-lucide="log-in"></i>
          <div>
            <span>到京通勤 · 国庆缓冲估算</span>
            <strong>${formatDateTime(plan.journey.arrival.startAt)} ${plan.journey.mode === "drive" ? "抵达酒店" : `抵达${plan.journey.rule.terminal}`} → ${formatDateTime(plan.journey.arrival.endAt)} 完成寄存</strong>
            <small>${journeySegmentLabel(plan.journey.arrival.segments)} · ${plan.journey.rule.route}</small>
          </div>
        </div>
        <div class="journey-leg">
          <i data-lucide="log-out"></i>
          <div>
            <span>离京通勤 · 国庆缓冲估算</span>
            <strong>${formatDateTime(plan.journey.departure.startAt)} 离店 → ${formatDateTime(plan.journey.departure.endAt)} ${plan.journey.mode === "drive" ? "驶离酒店" : plan.journey.mode === "air" ? "航班计划离京" : "列车计划离京"}</strong>
            <small>${journeySegmentLabel(plan.journey.departure.segments)} · ${plan.journey.rule.route}</small>
          </div>
        </div>
      </section>
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
        <div class="cost-item"><span>城际往返</span><strong>${formatMoneyRange(...plan.cost.intercity)}</strong></div>
        <div class="cost-item"><span>酒店 ${plan.cost.rooms}间 × ${plan.cost.nights}晚</span><strong>${formatMoneyRange(...plan.cost.hotel)}</strong></div>
        <div class="cost-item"><span>景点门票</span><strong>${formatMoneyRange(...plan.cost.ticket)}</strong></div>
        <div class="cost-item"><span>餐饮</span><strong>${formatMoneyRange(...plan.cost.food)}</strong></div>
        <div class="cost-item"><span>市内交通</span><strong>${formatMoneyRange(...plan.cost.local)}</strong></div>
      </div>
      <div class="plan-caveat"><i data-lucide="triangle-alert"></i><span>${overallWeatherAdvice()} 当前为“${paceRules[state.pace].label}”节奏；行程规则与美食资料核验于2026-09-03，静态站点不会在每次生成时实时抓取平台。往返通勤为分钟级缓冲估算，并非真实车次或航班时刻；索道、游船、优速通和购物未计入。</span></div>`;
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

    els.teamAges.addEventListener("input", updateAgeState);
    els.teamAges.addEventListener("change", schedulePlanRegeneration);
    els.arrivalDateTime.addEventListener("input", () => { syncTripRange(); renderTransportOptions(); });
    els.departureDateTime.addEventListener("input", () => { syncTripRange(); renderTransportOptions(); });
    els.origin.addEventListener("input", renderTransportOptions);
    els.returnCity.addEventListener("input", renderTransportOptions);
    els.arrivalDateTime.addEventListener("change", schedulePlanRegeneration);
    els.departureDateTime.addEventListener("change", schedulePlanRegeneration);
    els.origin.addEventListener("change", schedulePlanRegeneration);
    els.returnCity.addEventListener("change", schedulePlanRegeneration);

    els.transportMode.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      state.transportMode = button.dataset.value;
      selectSegment(els.transportMode, button);
      syncTripRange();
      renderTransportOptions();
      schedulePlanRegeneration();
    });

    els.paceMode.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      state.pace = button.dataset.value;
      selectSegment(els.paceMode, button);
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
    renderTransportOptions();
    updateAgeState();
    setupEvents();
    refreshIcons();
    await generatePlans();
  }

  initialize();
})();
