(function () {
  const workspace = document.querySelector(".production-workspace");
  if (!workspace) return;

  const tabs = [...workspace.querySelectorAll("[data-production-tab]")];
  const views = [...workspace.querySelectorAll("[data-production-view]")];
  const search = workspace.querySelector("[data-production-search]");
  const statusFilter = workspace.querySelector("[data-production-status]");
  const actionButton = workspace.querySelector('[data-production-action="new-schedule"]');
  const scheduleBody = workspace.querySelector("[data-production-schedule-tbody]");
  const ganttScroll = workspace.querySelector(".schedule-gantt-scroll");
  const ganttBoard = workspace.querySelector("[data-schedule-gantt]");
  const ganttTitle = workspace.querySelector("[data-schedule-gantt-title]");
  const dialog = document.querySelector("[data-schedule-dialog]");
  const form = document.querySelector("[data-schedule-form]");
  const orderSelect = form.querySelector("[data-schedule-order-select]");
  const moldRows = form.querySelector("[data-schedule-mold-rows]");
  const addMoldButton = form.querySelector("[data-add-schedule-mold]");
  const dialogTitle = form.querySelector("[data-schedule-dialog-title]");
  const submitButton = form.querySelector("[data-schedule-submit]");
  const toast = document.querySelector("[data-order-toast]");
  const config = {
    schedule: { placeholder: "搜索生产排期", empty: "暂无生产排期" },
    batching: { placeholder: "搜索配料记录", empty: "暂无配料记录" },
  };
  const scheduleRecords = new Map();
  const statusKeys = {
    "待生产": "pending",
    "生产中": "running",
    "已完成": "done",
    "已取消": "cancelled",
  };
  let activeView = "schedule";
  let editingId = null;
  let scheduleSequence = 0;
  let calendarMonth = new Date();
  let toastTimer;
  calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);

  function localDateText(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(Number(value || 0));
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function addTextCell(row, primary, secondary) {
    const cell = document.createElement("td");
    const strong = document.createElement("strong");
    strong.textContent = primary;
    const small = document.createElement("small");
    small.textContent = secondary;
    cell.append(strong, small);
    row.append(cell);
    return cell;
  }

  function createLabeledInput(labelText, input) {
    const label = document.createElement("label");
    const labelNode = document.createElement("span");
    labelNode.textContent = labelText;
    label.append(labelNode, input);
    return label;
  }

  function addMoldRow(moldCode = "", dailyCapacity = "") {
    const row = document.createElement("div");
    row.className = "schedule-mold-row";

    const moldInput = document.createElement("input");
    moldInput.name = "moldCode";
    moldInput.required = true;
    moldInput.placeholder = "输入模具编码或名称";
    moldInput.value = moldCode;

    const capacityInput = document.createElement("input");
    capacityInput.name = "moldCapacity";
    capacityInput.type = "number";
    capacityInput.min = "1";
    capacityInput.step = "1";
    capacityInput.required = true;
    capacityInput.placeholder = "输入日产能";
    capacityInput.value = dailyCapacity;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "mold-remove-button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", "移除模具");
    removeButton.addEventListener("click", () => {
      if (moldRows.children.length === 1) {
        moldInput.value = "";
        capacityInput.value = "";
      } else {
        row.remove();
      }
      updateSummary();
    });

    moldInput.addEventListener("input", updateSummary);
    capacityInput.addEventListener("input", updateSummary);
    row.append(
      createLabeledInput("模具", moldInput),
      createLabeledInput("日产能（件/天）", capacityInput),
      removeButton,
    );
    moldRows.append(row);
    updateSummary();
  }

  function readMolds() {
    return [...moldRows.querySelectorAll(".schedule-mold-row")].map((row) => ({
      code: row.querySelector('[name="moldCode"]').value.trim(),
      dailyCapacity: Number(row.querySelector('[name="moldCapacity"]').value || 0),
    })).filter((mold) => mold.code && mold.dailyCapacity > 0);
  }

  function syncOrderOptions() {
    const currentValue = orderSelect.value;
    orderSelect.replaceChildren();
    const noOrder = document.createElement("option");
    noOrder.value = "";
    noOrder.textContent = "不关联订单";
    orderSelect.append(noOrder);

    document.querySelectorAll('[data-order-tbody="ledger"] tr:not(.filter-empty)').forEach((row) => {
      if (!row.dataset.orderNo) return;
      const option = document.createElement("option");
      option.value = row.dataset.orderNo;
      option.textContent = row.dataset.orderNo;
      option.dataset.customer = row.dataset.customer || "";
      option.dataset.product = row.dataset.product || "";
      option.dataset.delivery = row.dataset.delivery || "";
      orderSelect.append(option);
    });

    if ([...orderSelect.options].some((option) => option.value === currentValue)) {
      orderSelect.value = currentValue;
    }
  }

  function updateSummary() {
    const molds = readMolds();
    const dailyCapacity = molds.reduce((sum, mold) => sum + mold.dailyCapacity, 0);
    const plannedQty = Number(form.elements.plannedQty.value || 0);
    const selectedOrder = orderSelect.selectedOptions[0];
    const productText = selectedOrder?.value
      ? (selectedOrder.dataset.product || selectedOrder.dataset.customer || selectedOrder.value)
      : "未关联订单";
    form.querySelector('[data-schedule-summary="product"]').textContent = productText;
    form.querySelector('[data-schedule-summary="capacity"]').textContent = molds.length
      ? `${molds.length} 套 / ${formatNumber(dailyCapacity)} 件/天`
      : "—";
    form.querySelector('[data-schedule-summary="days"]').textContent = dailyCapacity > 0 && plannedQty > 0
      ? `${formatNumber(plannedQty / dailyCapacity)} 天`
      : "—";
  }

  function resetForm(scheduledDate = localDateText()) {
    form.reset();
    editingId = null;
    dialogTitle.textContent = "新增生产排期";
    submitButton.textContent = "保存排期";
    syncOrderOptions();
    form.elements.scheduledDate.value = scheduledDate;
    form.elements.deliveryDate.value = "";
    form.elements.shift.value = "白班";
    form.elements.status.value = "待生产";
    moldRows.replaceChildren();
    addMoldRow();
    updateSummary();
  }

  function openNewSchedule(scheduledDate) {
    resetForm(scheduledDate || localDateText());
    if (!dialog.open) dialog.showModal();
  }

  function openEditSchedule(record) {
    resetForm(record.scheduledDate);
    editingId = record.id;
    dialogTitle.textContent = "编辑生产排期";
    submitButton.textContent = "保存修改";
    orderSelect.value = record.orderId;
    form.elements.deliveryDate.value = record.deliveryDate;
    form.elements.shift.value = record.shift;
    form.elements.plannedQty.value = record.plannedQty;
    form.elements.planner.value = record.planner;
    form.elements.status.value = record.status;
    form.elements.notes.value = record.notes;
    moldRows.replaceChildren();
    record.molds.forEach((mold) => addMoldRow(mold.code, mold.dailyCapacity));
    updateSummary();
    if (!dialog.open) dialog.showModal();
  }

  function scrollGanttToDate(dateText, behavior = "auto") {
    const target = new Date(`${dateText}T00:00:00`);
    const rangeStartText = ganttBoard.dataset.rangeStart;
    if (!rangeStartText || Number.isNaN(target.getTime())) return;
    const rangeStart = new Date(`${rangeStartText}T00:00:00`);
    const dayIndex = Math.floor((target - rangeStart) / 86400000);
    const stickyWidth = ganttBoard.querySelector(".gantt-corner")?.getBoundingClientRect().width || 310;
    const timelineWidth = Math.max(0, ganttScroll.clientWidth - stickyWidth);
    const left = Math.max(0, dayIndex * 38 + 19 - timelineWidth / 2);
    ganttScroll.scrollTo({ left, behavior });
  }

  function renderCalendar(focusDate = null) {
    const previousScrollLeft = ganttScroll.scrollLeft;
    const hasRendered = ganttBoard.childElementCount > 0;
    ganttBoard.replaceChildren();
    const rangeStart = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 12, 1);
    const rangeEnd = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 13, 0);
    const totalDays = Math.floor((rangeEnd - rangeStart) / 86400000) + 1;
    const monthFormat = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long" });
    ganttTitle.textContent = `${monthFormat.format(rangeStart)} - ${monthFormat.format(rangeEnd)}`;
    ganttBoard.dataset.rangeStart = localDateText(rangeStart);
    ganttBoard.style.setProperty("--gantt-days", String(totalDays));
    ganttBoard.style.setProperty("--gantt-width", `${totalDays * 38}px`);

    const header = document.createElement("div");
    header.className = "gantt-header";
    const corner = document.createElement("div");
    corner.className = "gantt-corner";
    corner.innerHTML = "<strong>状态 / 任务</strong><small>订单、产品、班次与模具</small>";
    const days = document.createElement("div");
    days.className = "gantt-days";

    for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
      const currentDate = new Date(rangeStart);
      currentDate.setDate(currentDate.getDate() + dayIndex);
      const date = localDateText(currentDate);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gantt-day-button";
      button.dataset.scheduleDate = date;
      if (date === localDateText()) button.classList.add("is-today");
      if (currentDate.getDate() === 1) button.classList.add("is-month-start");
      button.title = `${monthFormat.format(currentDate)}${currentDate.getDate()}日`;
      const weekday = new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(currentDate);
      const number = document.createElement("b");
      number.textContent = String(currentDate.getDate());
      const small = document.createElement("small");
      small.textContent = currentDate.getDate() === 1 ? `${currentDate.getMonth() + 1}月` : weekday;
      button.append(number, small);
      days.append(button);
    }
    header.append(corner, days);
    ganttBoard.append(header);

    const visibleRecords = [...scheduleRecords.values()]
      .filter((record) => {
        const start = new Date(`${record.scheduledDate}T00:00:00`);
        const duration = Math.max(1, Math.ceil(record.estimatedDays));
        const end = new Date(start);
        end.setDate(end.getDate() + duration - 1);
        return start <= rangeEnd && end >= rangeStart;
      })
      .sort((left, right) => left.scheduledDate.localeCompare(right.scheduledDate));

    if (!visibleRecords.length) {
      const empty = document.createElement("div");
      empty.className = "gantt-empty";
      empty.textContent = "暂无所选时间范围内的生产排期";
      ganttBoard.append(empty);
    } else visibleRecords.forEach((record) => {
      const row = document.createElement("div");
      row.className = "gantt-row";
      const meta = document.createElement("div");
      meta.className = "gantt-meta";
      const badge = document.createElement("span");
      badge.className = `status-badge is-${statusKeys[record.status] || "pending"}`;
      badge.textContent = record.status;
      const copy = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = record.orderId || record.product || "未关联订单";
      const detail = document.createElement("small");
      detail.textContent = `${record.shift} · ${record.molds.map((mold) => mold.code).join("、")}`;
      copy.append(title, detail);
      meta.append(badge, copy);

      const track = document.createElement("div");
      track.className = "gantt-track";
      const start = new Date(`${record.scheduledDate}T00:00:00`);
      const duration = Math.max(1, Math.ceil(record.estimatedDays));
      const rawStart = Math.floor((start - rangeStart) / 86400000) + 1;
      const gridStart = Math.max(1, rawStart);
      const gridEnd = Math.min(totalDays + 1, rawStart + duration);
      const span = Math.max(1, gridEnd - gridStart);
      const bar = document.createElement("button");
      bar.type = "button";
      bar.className = `gantt-bar is-${statusKeys[record.status] || "pending"}`;
      bar.dataset.editSchedule = record.id;
      bar.dataset.scheduleBar = record.id;
      bar.style.gridColumn = `${gridStart} / span ${span}`;
      bar.textContent = record.product || record.orderId || record.molds[0]?.code || "生产排期";
      const end = new Date(start);
      end.setDate(end.getDate() + duration - 1);
      bar.title = [
        `排期：${record.scheduledDate} 至 ${localDateText(end)}`,
        `交货：${record.deliveryDate || "未填写"}`,
        `数量：${formatNumber(record.plannedQty)} 件`,
        `状态：${record.status}`,
      ].join("\n");
      track.append(bar);
      row.append(meta, track);
      ganttBoard.append(row);
    });

    requestAnimationFrame(() => {
      if (focusDate) {
        scrollGanttToDate(focusDate);
      } else if (hasRendered) {
        ganttScroll.scrollLeft = previousScrollLeft;
      } else {
        scrollGanttToDate(localDateText());
      }
    });
  }

  function createStatusCell(row, statusText) {
    const cell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `status-badge is-${statusKeys[statusText] || "pending"}`;
    badge.textContent = statusText;
    cell.append(badge);
    row.append(cell);
  }

  function filterScheduleRows() {
    const query = search.value.trim().toLocaleLowerCase("zh-CN");
    const selectedStatus = statusFilter.value;
    const rows = [...scheduleBody.querySelectorAll("tr:not(.filter-empty)")];
    let visible = 0;

    rows.forEach((row) => {
      const matchesQuery = !query || (row.dataset.search || row.textContent).toLocaleLowerCase("zh-CN").includes(query);
      const matchesStatus = selectedStatus === "all" || row.dataset.status === selectedStatus;
      const matches = matchesQuery && matchesStatus;
      row.hidden = !matches;
      if (matches) visible += 1;
    });

    let emptyRow = scheduleBody.querySelector(".filter-empty");
    if (!emptyRow) {
      emptyRow = document.createElement("tr");
      emptyRow.className = "filter-empty";
      const cell = document.createElement("td");
      cell.colSpan = 10;
      const message = document.createElement("span");
      message.className = "empty-table-message";
      cell.append(message);
      emptyRow.append(cell);
      scheduleBody.append(emptyRow);
    }
    emptyRow.querySelector(".empty-table-message").textContent = rows.length === 0
      ? "暂无生产排期"
      : "没有符合筛选条件的记录";
    emptyRow.hidden = visible !== 0;

    workspace.querySelector('[data-production-count="schedule"]').textContent = String(rows.length).padStart(2, "0");
    workspace.querySelector('[data-production-view-count="schedule"]').textContent = query || selectedStatus !== "all"
      ? `${visible} / ${rows.length} 条记录`
      : `${rows.length} 条记录`;
  }

  function renderScheduleTable() {
    scheduleBody.replaceChildren();
    [...scheduleRecords.values()]
      .sort((left, right) => left.scheduledDate.localeCompare(right.scheduledDate))
      .forEach((record) => {
        const row = document.createElement("tr");
        row.dataset.scheduleId = record.id;
        row.dataset.status = statusKeys[record.status] || "pending";
        row.dataset.search = [
          record.orderId,
          record.customer,
          record.product,
          record.molds.map((mold) => mold.code).join(" "),
          record.shift,
          record.status,
          record.planner,
          record.notes,
        ].join(" ");

        addTextCell(row, record.scheduledDate, record.deliveryDate || "未填写交货日期");
        addTextCell(row, record.orderId || "未关联订单", record.customer || "—");
        addTextCell(row, record.product || "—", record.molds.map((mold) => mold.code).join("、"));
        addTextCell(row, record.shift, "班次");
        addTextCell(row, `${formatNumber(record.plannedQty)} 件`, "计划数量");
        addTextCell(row, `${formatNumber(record.dailyCapacity)} 件/天`, `${formatNumber(record.estimatedDays)} 天`);
        createStatusCell(row, record.status);
        addTextCell(row, record.planner, "排期负责人");
        addTextCell(row, record.notes || "—", "备注");

        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "table-action";
        editButton.dataset.editSchedule = record.id;
        editButton.textContent = "编辑";
        actionCell.append(editButton);
        row.append(actionCell);
        scheduleBody.append(row);
      });
    filterScheduleRows();
    renderCalendar();
  }

  function updateBatchingEmpty() {
    const message = workspace.querySelector('[data-production-view="batching"] [data-production-empty]');
    const filtering = search.value.trim() || statusFilter.value !== "all";
    message.textContent = filtering ? "没有符合筛选条件的记录" : "暂无配料记录";
  }

  function updateCurrentView() {
    if (activeView === "schedule") {
      filterScheduleRows();
    } else {
      updateBatchingEmpty();
    }
  }

  function setView(viewId) {
    activeView = viewId;
    tabs.forEach((tab) => {
      const active = tab.dataset.productionTab === viewId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    views.forEach((view) => {
      view.hidden = view.dataset.productionView !== viewId;
    });
    actionButton.hidden = viewId !== "schedule";
    search.value = "";
    statusFilter.value = "all";
    search.placeholder = config[viewId].placeholder;
    updateCurrentView();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setView(tab.dataset.productionTab));
  });
  search.addEventListener("input", updateCurrentView);
  statusFilter.addEventListener("change", updateCurrentView);
  actionButton.addEventListener("click", () => openNewSchedule());
  addMoldButton.addEventListener("click", () => addMoldRow());
  form.addEventListener("input", updateSummary);
  orderSelect.addEventListener("change", () => {
    const option = orderSelect.selectedOptions[0];
    if (!form.elements.deliveryDate.value && option?.dataset.delivery) {
      form.elements.deliveryDate.value = option.dataset.delivery;
    }
    updateSummary();
  });
  form.elements.deliveryDate.addEventListener("change", () => {
    form.elements.deliveryDate.setCustomValidity("");
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.elements.deliveryDate.value && form.elements.deliveryDate.value < form.elements.scheduledDate.value) {
      form.elements.deliveryDate.setCustomValidity("交货日期不能早于排期日期");
      form.elements.deliveryDate.reportValidity();
      return;
    }
    const molds = readMolds();
    if (!form.reportValidity() || molds.length === 0) return;
    const selectedOrder = orderSelect.selectedOptions[0];
    const plannedQty = Number(form.elements.plannedQty.value);
    const dailyCapacity = molds.reduce((sum, mold) => sum + mold.dailyCapacity, 0);
    const id = editingId || `schedule-${Date.now()}-${++scheduleSequence}`;
    scheduleRecords.set(id, {
      id,
      orderId: orderSelect.value,
      customer: selectedOrder?.dataset.customer || "",
      product: selectedOrder?.dataset.product || "",
      scheduledDate: form.elements.scheduledDate.value,
      deliveryDate: form.elements.deliveryDate.value,
      shift: form.elements.shift.value,
      plannedQty,
      planner: form.elements.planner.value,
      status: form.elements.status.value,
      notes: form.elements.notes.value,
      molds,
      dailyCapacity,
      estimatedDays: plannedQty / dailyCapacity,
    });
    dialog.close();
    renderScheduleTable();
    showToast(editingId ? "生产排期已更新" : "生产排期已创建");
    editingId = null;
  });
  moldRows.addEventListener("input", updateSummary);
  scheduleBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-edit-schedule]");
    if (!button) return;
    const record = scheduleRecords.get(button.dataset.editSchedule);
    if (record) openEditSchedule(record);
  });
  ganttBoard.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-schedule]");
    if (editButton) {
      const record = scheduleRecords.get(editButton.dataset.editSchedule);
      if (record) openEditSchedule(record);
      return;
    }
    const day = event.target.closest("[data-schedule-date]");
    if (day) openNewSchedule(day.dataset.scheduleDate);
  });
  let ganttDrag = null;
  ganttScroll.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || event.target.closest("button, .gantt-meta, .gantt-corner")) return;
    ganttDrag = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: ganttScroll.scrollLeft };
    ganttScroll.classList.add("is-dragging");
    ganttScroll.setPointerCapture(event.pointerId);
  });
  ganttScroll.addEventListener("pointermove", (event) => {
    if (!ganttDrag || event.pointerId !== ganttDrag.pointerId) return;
    ganttScroll.scrollLeft = ganttDrag.startScrollLeft - (event.clientX - ganttDrag.startX);
  });
  const stopGanttDrag = (event) => {
    if (!ganttDrag || event.pointerId !== ganttDrag.pointerId) return;
    ganttDrag = null;
    ganttScroll.classList.remove("is-dragging");
    if (ganttScroll.hasPointerCapture(event.pointerId)) ganttScroll.releasePointerCapture(event.pointerId);
  };
  ganttScroll.addEventListener("pointerup", stopGanttDrag);
  ganttScroll.addEventListener("pointercancel", stopGanttDrag);
  ganttScroll.addEventListener("dragstart", (event) => event.preventDefault());
  workspace.querySelector("[data-calendar-prev]").addEventListener("click", () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 12, 1);
    renderCalendar(localDateText(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 15)));
  });
  workspace.querySelector("[data-calendar-next]").addEventListener("click", () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 12, 1);
    renderCalendar(localDateText(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 15)));
  });
  workspace.querySelector("[data-calendar-today]").addEventListener("click", () => {
    const now = new Date();
    calendarMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    renderCalendar(localDateText(now));
  });

  syncOrderOptions();
  renderScheduleTable();
  setView("schedule");
})();
