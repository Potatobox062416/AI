(function () {
  const workspace = document.querySelector("[data-orders-workspace]");
  if (!workspace) return;

  const tabs = [...workspace.querySelectorAll("[data-order-tab]")];
  const views = [...workspace.querySelectorAll("[data-order-view]")];
  const search = workspace.querySelector("[data-order-search]");
  const statusFilter = workspace.querySelector("[data-order-status]");
  const statusFilterLabel = statusFilter.closest(".order-filter");
  const actionButtons = [...workspace.querySelectorAll("[data-order-action]")];
  const toast = document.querySelector("[data-order-toast]");
  const recordDialog = document.querySelector("[data-record-dialog]");
  const workOrderForm = document.querySelector('[data-order-form="new-work-order"]');
  const workOrderOrderSelect = workOrderForm.querySelector("[data-work-order-order-select]");
  let activeTab = "ledger";
  let toastTimer;

  function setTab(tabId) {
    activeTab = tabId;
    workspace.dataset.activeTab = tabId;

    tabs.forEach((tab) => {
      const active = tab.dataset.orderTab === tabId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    views.forEach((view) => {
      view.hidden = view.dataset.orderView !== tabId;
    });
    actionButtons.forEach((button) => {
      button.hidden = button.dataset.showTabs !== tabId;
    });
    statusFilterLabel.hidden = tabId !== "ledger";
    search.placeholder = tabId === "ledger"
      ? "搜索订单、客户或产品"
      : tabId === "work-orders"
        ? "搜索订单、配方或负责人"
        : "搜索订单、客户或产品";
    filterRows();
  }

  function filterRows() {
    const tbody = workspace.querySelector(`[data-order-tbody="${activeTab}"]`);
    if (!tbody) return;
    const query = search.value.trim().toLocaleLowerCase("zh-CN");
    const status = statusFilter.value;
    const rows = [...tbody.querySelectorAll("tr:not(.filter-empty)")];
    let visible = 0;

    rows.forEach((row) => {
      const matchesQuery = !query || (row.dataset.search || row.textContent).toLocaleLowerCase("zh-CN").includes(query);
      const matchesStatus = activeTab !== "ledger" || status === "all" || row.dataset.status === status;
      const matches = matchesQuery && matchesStatus;
      row.hidden = !matches;
      if (matches) visible += 1;
    });

    let emptyRow = tbody.querySelector(".filter-empty");
    if (!emptyRow) {
      emptyRow = document.createElement("tr");
      emptyRow.className = "filter-empty";
      const cell = document.createElement("td");
      cell.colSpan = tbody.closest("table").querySelectorAll("thead th").length;
      const message = document.createElement("span");
      message.className = "empty-table-message";
      cell.append(message);
      emptyRow.append(cell);
      tbody.append(emptyRow);
    }
    const emptyMessages = {
      ledger: "暂无订单数据",
      "work-orders": "暂无随工单记录",
      costs: "暂无订单成本数据",
    };
    emptyRow.querySelector(".empty-table-message").textContent = rows.length === 0
      ? emptyMessages[activeTab]
      : "没有符合筛选条件的记录";
    emptyRow.hidden = visible !== 0;

    const tabCount = workspace.querySelector(`[data-order-count="${activeTab}"]`);
    if (tabCount) tabCount.textContent = String(rows.length).padStart(2, "0");
    const viewCount = workspace.querySelector(`[data-view-count="${activeTab}"]`);
    if (viewCount) viewCount.textContent = query || (activeTab === "ledger" && status !== "all")
      ? `${visible} / ${rows.length} 条记录`
      : `${rows.length} 条记录`;
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function openDialog(name) {
    const dialog = document.querySelector(`[data-order-dialog="${name}"]`);
    if (dialog && !dialog.open) dialog.showModal();
  }

  function addTextCell(row, primary, secondary, className) {
    const cell = document.createElement("td");
    if (className) cell.className = className;
    const strong = document.createElement("strong");
    strong.textContent = primary;
    const small = document.createElement("small");
    small.textContent = secondary;
    cell.append(strong, small);
    row.append(cell);
    return cell;
  }

  function addViewAction(row) {
    const cell = document.createElement("td");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "table-action";
    button.dataset.viewRecord = "";
    button.textContent = "查看";
    cell.append(button);
    row.append(cell);
  }

  function addLedgerRow(data) {
    const tbody = workspace.querySelector('[data-order-tbody="ledger"]');
    const row = document.createElement("tr");
    row.dataset.status = "pending";
    row.dataset.search = `${data.orderNo} ${data.customer} ${data.product} ${data.productType} ${data.businessPerson}`;
    row.dataset.orderNo = data.orderNo;
    row.dataset.customer = data.customer;
    row.dataset.product = data.product;
    row.dataset.productType = data.productType;
    row.dataset.businessPerson = data.businessPerson;
    row.dataset.delivery = data.deliveryDate;
    row.dataset.recordStatus = "待排产";

    const orderCell = addTextCell(row, data.orderNo, `${data.orderDate} 下单`);
    orderCell.querySelector("strong").classList.add("order-no");
    addTextCell(row, data.customer, data.product);
    addTextCell(row, `${Number(data.quantity).toLocaleString("zh-CN")} 件`, `交期 ${data.deliveryDate}`);
    addTextCell(row, data.productType, data.businessPerson);

    const progressCell = document.createElement("td");
    const statusLine = document.createElement("div");
    statusLine.className = "order-status-line";
    const badge = document.createElement("span");
    badge.className = "status-badge is-pending";
    badge.textContent = "待排产";
    const percentage = document.createElement("b");
    percentage.textContent = "0%";
    statusLine.append(badge, percentage);
    const track = document.createElement("div");
    track.className = "progress-track";
    track.append(document.createElement("i"));
    const hint = document.createElement("small");
    hint.textContent = "尚未报工";
    progressCell.append(statusLine, track, hint);
    row.append(progressCell);

    const notesCell = document.createElement("td");
    notesCell.textContent = data.notes || "—";
    row.append(notesCell);
    addViewAction(row);
    tbody.prepend(row);
    filterRows();
  }

  function workOrderNumber(data, name) {
    const raw = data[name];
    if (raw === undefined || raw === null || raw === "") return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  }

  function calculateWorkOrderMetrics(data) {
    const qualifiedQty = workOrderNumber(data, "qualifiedQty");
    const debugDefectQty = workOrderNumber(data, "debugDefectQty");
    const appearanceDefectQty = workOrderNumber(data, "appearanceDefectQty");
    const dimensionDefectQty = workOrderNumber(data, "dimensionDefectQty");
    const stainDefectQty = workOrderNumber(data, "stainDefectQty");
    const hardnessDefectQty = workOrderNumber(data, "hardnessDefectQty");
    const totalHours = workOrderNumber(data, "totalHours");
    const prepHours = workOrderNumber(data, "prepHours");
    const faultHours = workOrderNumber(data, "faultHours");
    const workerCount = workOrderNumber(data, "workerCount");
    const laborRatePerHour = workOrderNumber(data, "laborRatePerHour");
    const defectParts = [appearanceDefectQty, dimensionDefectQty, stainDefectQty, hardnessDefectQty];
    const defectQty = defectParts.every((value) => value !== null)
      ? defectParts.reduce((sum, value) => sum + value, 0)
      : null;
    const totalProduced = qualifiedQty !== null && debugDefectQty !== null && defectQty !== null
      ? qualifiedQty + debugDefectQty + defectQty
      : null;
    const rate = (value) => totalProduced && value !== null ? value / totalProduced : null;

    return {
      qualifiedQty,
      debugDefectQty,
      defectQty,
      totalProduced,
      yieldRate: rate(qualifiedQty),
      appearanceRate: rate(appearanceDefectQty),
      dimensionRate: rate(dimensionDefectQty),
      stainRate: rate(stainDefectQty),
      hardnessRate: rate(hardnessDefectQty),
      effectiveHours: totalHours !== null && prepHours !== null && faultHours !== null
        ? Math.max(totalHours - prepHours - faultHours, 0)
        : null,
      faultRate: totalHours ? (faultHours || 0) / totalHours : null,
      laborCost: totalHours !== null && workerCount !== null && laborRatePerHour !== null
        ? totalHours * workerCount * laborRatePerHour
        : null,
    };
  }

  function formatWorkOrderNumber(value) {
    return value === null ? "—" : new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(value);
  }

  function formatWorkOrderRate(value) {
    return value === null ? "—" : `${(value * 100).toFixed(1)}%`;
  }

  function updateWorkOrderComputedFields() {
    const data = Object.fromEntries(new FormData(workOrderForm));
    const metrics = calculateWorkOrderMetrics(data);
    const displays = {
      totalProduced: formatWorkOrderNumber(metrics.totalProduced),
      defectQty: formatWorkOrderNumber(metrics.defectQty),
      yieldRate: formatWorkOrderRate(metrics.yieldRate),
      appearanceRate: formatWorkOrderRate(metrics.appearanceRate),
      dimensionRate: formatWorkOrderRate(metrics.dimensionRate),
      stainRate: formatWorkOrderRate(metrics.stainRate),
      hardnessRate: formatWorkOrderRate(metrics.hardnessRate),
      effectiveHours: metrics.effectiveHours === null ? "—" : `${formatWorkOrderNumber(metrics.effectiveHours)} 小时`,
      faultRate: formatWorkOrderRate(metrics.faultRate),
      laborCost: metrics.laborCost === null
        ? "—"
        : new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY" }).format(metrics.laborCost),
    };
    Object.entries(displays).forEach(([key, value]) => {
      const node = workOrderForm.querySelector(`[data-work-order-computed="${key}"]`);
      if (node) node.textContent = value;
    });
    return metrics;
  }

  function syncWorkOrderOrderOptions() {
    const currentValue = workOrderOrderSelect.value;
    workOrderOrderSelect.replaceChildren();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "请选择订单编号";
    workOrderOrderSelect.append(placeholder);

    workspace.querySelectorAll('[data-order-tbody="ledger"] tr:not(.filter-empty)').forEach((row) => {
      if (!row.dataset.orderNo) return;
      const option = document.createElement("option");
      option.value = row.dataset.orderNo;
      option.textContent = row.dataset.orderNo;
      option.dataset.productType = row.dataset.productType || "";
      workOrderOrderSelect.append(option);
    });

    if ([...workOrderOrderSelect.options].some((option) => option.value === currentValue)) {
      workOrderOrderSelect.value = currentValue;
    }
  }

  function resetWorkOrderForm() {
    workOrderForm.reset();
    workOrderForm.elements.productionDate.value = new Date().toISOString().slice(0, 10);
    workOrderForm.elements.productType.value = "复合枕";
    workOrderForm.elements.workerCount.value = "1";
    workOrderForm.elements.laborRatePerHour.value = "0";
    syncWorkOrderOrderOptions();
    updateWorkOrderComputedFields();
  }

  function addWorkOrderRow(data, metrics) {
    const tbody = workspace.querySelector('[data-order-tbody="work-orders"]');
    const row = document.createElement("tr");
    row.dataset.search = `${data.orderNo} ${data.formulaCode} ${data.owner} ${data.productType}`;
    row.dataset.orderNo = data.orderNo;
    row.dataset.customer = `生产负责人：${data.owner}`;
    row.dataset.product = `${data.productType} · ${data.formulaCode}`;
    row.dataset.delivery = `生产日期 ${data.productionDate}`;
    row.dataset.recordStatus = `合格率 ${formatWorkOrderRate(metrics.yieldRate)}`;
    row.dataset.laborCost = metrics.laborCost === null ? "" : String(metrics.laborCost);

    const orderCell = addTextCell(row, data.orderNo, "生产随工单");
    orderCell.querySelector("strong").classList.add("order-no");
    addTextCell(row, data.productionDate, data.owner);
    addTextCell(row, `${data.productType} · ${data.formulaCode}`, "产品类型 / 配方");
    addTextCell(row, `${formatWorkOrderNumber(metrics.totalProduced)} / ${formatWorkOrderNumber(metrics.qualifiedQty)}`, "总数 / 合格");
    addTextCell(row, `${formatWorkOrderNumber(metrics.defectQty)} / ${formatWorkOrderNumber(metrics.debugDefectQty)}`, "次品 / 调试");
    addTextCell(row, formatWorkOrderRate(metrics.yieldRate), `${formatWorkOrderNumber(metrics.effectiveHours)} 小时`);
    addTextCell(row, new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()), "人工录入");
    addViewAction(row);
    tbody.prepend(row);
    filterRows();
  }

  function showRecord(row) {
    document.querySelector("[data-detail-order]").textContent = row.dataset.orderNo || "—";
    document.querySelector("[data-detail-customer]").textContent = row.dataset.customer || "—";
    document.querySelector("[data-detail-product]").textContent = row.dataset.product || "—";
    document.querySelector("[data-detail-delivery]").textContent = row.dataset.delivery || "—";
    document.querySelector("[data-detail-status]").textContent = row.dataset.recordStatus || "—";
    if (!recordDialog.open) recordDialog.showModal();
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => setTab(tab.dataset.orderTab)));
  search.addEventListener("input", filterRows);
  statusFilter.addEventListener("change", filterRows);

  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.orderAction;
      if (action === "new-order") openDialog("new-order");
      if (action === "new-work-order") {
        resetWorkOrderForm();
        openDialog("new-work-order");
      }
      if (action === "print") window.print();
    });
  });

  document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog")?.close());
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  document.querySelector('[data-order-form="new-order"]').addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    addLedgerRow(data);
    form.reset();
    form.closest("dialog").close();
    showToast(`订单 ${data.orderNo} 已加入台账`);
  });

  workOrderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(workOrderForm));
    const metrics = calculateWorkOrderMetrics(data);
    addWorkOrderRow(data, metrics);
    workOrderForm.closest("dialog").close();
    showToast(`订单 ${data.orderNo} 的随工单已保存`);
    resetWorkOrderForm();
  });

  workOrderForm.addEventListener("input", updateWorkOrderComputedFields);
  workOrderOrderSelect.addEventListener("change", () => {
    const option = workOrderOrderSelect.selectedOptions[0];
    if (option?.dataset.productType) workOrderForm.elements.productType.value = option.dataset.productType;
  });

  workspace.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view-record]");
    if (button) showRecord(button.closest("tr"));
  });

  const today = new Date().toISOString().slice(0, 10);
  document.querySelector('[name="orderDate"]').value = today;
  resetWorkOrderForm();

  setTab("ledger");
})();
