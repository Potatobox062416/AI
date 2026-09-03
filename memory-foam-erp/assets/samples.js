(function () {
  const workspace = document.querySelector(".sample-workspace");
  if (!workspace) return;

  const tabs = [...workspace.querySelectorAll("[data-sample-tab]")];
  const views = [...workspace.querySelectorAll("[data-sample-view]")];
  const search = workspace.querySelector("[data-sample-search]");
  const status = workspace.querySelector("[data-sample-status]");
  const actionButtons = [...workspace.querySelectorAll("[data-sample-action]")];
  const newSampleButton = workspace.querySelector("[data-sample-action=\"new\"]");
  const newProductionButton = workspace.querySelector("[data-sample-action=\"new-production\"]");
  const newShippingButton = workspace.querySelector("[data-sample-action=\"new-shipping\"]");
  const taskBody = workspace.querySelector("[data-sample-task-tbody]");
  const productionBody = workspace.querySelector("[data-sample-production-tbody]");
  const shippingBody = workspace.querySelector("[data-sample-shipping-tbody]");
  const inventoryBody = workspace.querySelector("[data-sample-inventory-tbody]");
  const sampleDialog = document.querySelector("[data-sample-dialog]");
  const sampleForm = document.querySelector("[data-sample-form]");
  const orderSelect = sampleForm.querySelector("[data-sample-order-select]");
  const shippingInput = sampleForm.elements.needsShipping;
  const shippingLabel = sampleForm.querySelector("[data-shipping-label]");
  const productionDialog = document.querySelector("[data-sample-production-dialog]");
  const productionForm = document.querySelector("[data-sample-production-form]");
  const productionTaskSelect = productionForm.querySelector("[data-production-task-select]");
  const shippingDialog = document.querySelector("[data-sample-shipping-dialog]");
  const shippingForm = document.querySelector("[data-sample-shipping-form]");
  const shippingTaskSelect = shippingForm.querySelector("[data-shipping-task-select]");
  const toast = document.querySelector("[data-order-toast]");
  const viewConfig = {
    tasks: { placeholder: "搜索样品任务", empty: "暂无样品任务" },
    production: { placeholder: "搜索生产记录", empty: "暂无生产记录" },
    shipping: { placeholder: "搜索发货记录", empty: "暂无发货记录" },
    inventory: { placeholder: "搜索样品库存", empty: "暂无样品库存记录" },
  };
  let activeView = "tasks";
  let toastTimer;
  let taskSequence = 0;
  const inventoryRecords = new Map();

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

  function updateTable(tbody, viewId, colSpan, emptyText) {
    const query = search.value.trim().toLocaleLowerCase("zh-CN");
    const selectedStatus = status.value;
    const rows = [...tbody.querySelectorAll("tr:not(.filter-empty)")];
    let visible = 0;

    rows.forEach((row) => {
      const matchesQuery = !query || (row.dataset.search || row.textContent).toLocaleLowerCase("zh-CN").includes(query);
      const matchesStatus = selectedStatus === "all" || row.dataset.status === selectedStatus;
      const matches = matchesQuery && matchesStatus;
      row.hidden = !matches;
      if (matches) visible += 1;
    });

    let emptyRow = tbody.querySelector(".filter-empty");
    if (!emptyRow) {
      emptyRow = document.createElement("tr");
      emptyRow.className = "filter-empty";
      const cell = document.createElement("td");
      cell.colSpan = colSpan;
      const message = document.createElement("span");
      message.className = "empty-table-message";
      cell.append(message);
      emptyRow.append(cell);
      tbody.append(emptyRow);
    }
    emptyRow.querySelector(".empty-table-message").textContent = rows.length === 0
      ? emptyText
      : "没有符合筛选条件的记录";
    emptyRow.hidden = visible !== 0;

    const tabCount = workspace.querySelector(`[data-sample-count="${viewId}"]`);
    const viewCount = workspace.querySelector(`[data-sample-view-count="${viewId}"]`);
    tabCount.textContent = String(rows.length).padStart(2, "0");
    viewCount.textContent = query || selectedStatus !== "all"
      ? `${visible} / ${rows.length} 条记录`
      : `${rows.length} 条记录`;
    return rows;
  }

  function updateTaskTable() {
    const rows = updateTable(taskBody, "tasks", 8, "暂无样品任务");
    updateDependentActionsState(rows);
  }

  function updateProductionTable() {
    updateTable(productionBody, "production", 7, "暂无生产记录");
  }

  function updateShippingTable() {
    updateTable(shippingBody, "shipping", 7, "暂无发货记录");
  }

  function updateInventoryTable() {
    updateTable(inventoryBody, "inventory", 8, "暂无样品库存记录");
  }

  function updateCurrentView() {
    if (activeView === "tasks") {
      updateTaskTable();
      return;
    }
    if (activeView === "production") {
      updateProductionTable();
      return;
    }
    if (activeView === "shipping") {
      updateShippingTable();
      return;
    }
    if (activeView === "inventory") {
      updateInventoryTable();
      return;
    }
    const view = workspace.querySelector(`[data-sample-view="${activeView}"]`);
    const message = view?.querySelector("[data-sample-empty]");
    if (!message) return;
    const filtering = search.value.trim() || status.value !== "all";
    message.textContent = filtering ? "没有符合筛选条件的记录" : viewConfig[activeView].empty;
  }

  function updateDependentActionsState(rows = [...taskBody.querySelectorAll("tr:not(.filter-empty)")]) {
    const taskDisabled = rows.length === 0;
    const inventoryDisabled = ![...inventoryRecords.values()].some((record) => record.balance > 0);
    newProductionButton.disabled = taskDisabled;
    newProductionButton.title = taskDisabled ? "请先创建样品任务" : "";
    newShippingButton.disabled = inventoryDisabled;
    newShippingButton.title = inventoryDisabled ? "请先建立样品库存" : "";
  }

  function setView(viewId) {
    activeView = viewId;

    tabs.forEach((tab) => {
      const active = tab.dataset.sampleTab === viewId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    views.forEach((view) => {
      view.hidden = view.dataset.sampleView !== viewId;
    });
    actionButtons.forEach((button) => {
      button.hidden = button.dataset.showSampleView !== viewId;
    });

    search.value = "";
    status.value = "all";
    search.placeholder = viewConfig[viewId].placeholder;
    updateDependentActionsState();
    updateCurrentView();
  }

  function syncOrderOptions() {
    const currentValue = orderSelect.value;
    orderSelect.replaceChildren();
    const noOrder = document.createElement("option");
    noOrder.value = "";
    noOrder.textContent = "不关联订单";
    orderSelect.append(noOrder);

    document.querySelectorAll('[data-order-tbody="ledger"] tr:not(.filter-empty)').forEach((row) => {
      const orderNo = row.dataset.orderNo;
      if (!orderNo) return;
      const option = document.createElement("option");
      option.value = orderNo;
      option.textContent = orderNo;
      option.dataset.customer = row.dataset.customer || "";
      option.dataset.product = row.dataset.product || "";
      option.dataset.businessPerson = row.dataset.businessPerson || "";
      orderSelect.append(option);
    });

    if ([...orderSelect.options].some((option) => option.value === currentValue)) {
      orderSelect.value = currentValue;
    }
  }

  function resetSampleForm() {
    sampleForm.reset();
    sampleForm.elements.plannedDate.value = new Date().toISOString().slice(0, 10);
    shippingInput.checked = false;
    shippingLabel.textContent = "不需要";
    syncOrderOptions();
  }

  function addSampleTask(data, needsShipping) {
    taskSequence += 1;
    const row = document.createElement("tr");
    row.dataset.taskId = `sample-task-${Date.now()}-${taskSequence}`;
    row.dataset.status = "pending";
    row.dataset.sampleNo = data.sampleNo || "";
    row.dataset.customer = data.customer;
    row.dataset.productName = data.productName;
    row.dataset.productType = data.productType;
    row.dataset.businessPerson = data.businessPerson || "";
    row.dataset.search = [
      data.sampleNo,
      data.relatedOrder,
      data.customer,
      data.productName,
      data.productType,
      data.mold,
      data.formula,
      data.owner,
      data.businessPerson,
    ].join(" ");

    const numberCell = addTextCell(row, data.sampleNo || "—", "待处理");
    numberCell.querySelector("strong").classList.add("order-no");
    addTextCell(row, data.relatedOrder || "不关联订单", data.relatedOrder ? "已关联" : "独立样品");
    addTextCell(row, data.customer, data.productName);
    addTextCell(row, data.productType, data.mold || "未指定模具");
    addTextCell(row, data.plannedDate, `${Number(data.quantity).toLocaleString("zh-CN")} 件`);
    addTextCell(row, data.formula, `${data.weight} g · ${data.hardness} N`);
    addTextCell(row, data.owner, needsShipping ? "需要发货" : "无需发货");
    addTextCell(row, data.notes || "—", "备注");

    taskBody.prepend(row);
    updateTaskTable();
  }

  function syncProductionTaskOptions() {
    const currentValue = productionTaskSelect.value;
    const rows = [...taskBody.querySelectorAll("tr:not(.filter-empty)")];
    productionTaskSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = rows.length ? "请选择样品任务" : "暂无可关联样品任务";
    placeholder.disabled = rows.length === 0;
    productionTaskSelect.append(placeholder);

    rows.forEach((row) => {
      const option = document.createElement("option");
      option.value = row.dataset.taskId;
      option.textContent = row.dataset.sampleNo || `${row.dataset.customer} / ${row.dataset.productName}`;
      option.dataset.sampleNo = row.dataset.sampleNo || "";
      option.dataset.customer = row.dataset.customer || "";
      option.dataset.productName = row.dataset.productName || "";
      option.dataset.productType = row.dataset.productType || "复合枕";
      option.dataset.businessPerson = row.dataset.businessPerson || "";
      productionTaskSelect.append(option);
    });

    if ([...productionTaskSelect.options].some((option) => option.value === currentValue)) {
      productionTaskSelect.value = currentValue;
    }
  }

  function localDateTimeValue() {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  function resetProductionForm() {
    productionForm.reset();
    productionForm.elements.productionTime.value = localDateTimeValue();
    syncProductionTaskOptions();
  }

  function renderInventoryTable() {
    inventoryBody.replaceChildren();
    inventoryRecords.forEach((record) => {
      const row = document.createElement("tr");
      row.dataset.status = record.balance > 0 ? "running" : "done";
      row.dataset.sampleInventoryRecord = record.taskId;
      row.dataset.search = [
        record.sampleNo,
        record.customer,
        record.productName,
        record.productType,
        record.lastMovement,
      ].join(" ");

      addTextCell(row, record.sampleNo || `${record.customer} / ${record.productName}`, "样品任务");
      addTextCell(row, record.sampleNo || "—", record.sampleNo ? "已填写" : "未填写");
      addTextCell(row, record.customer, record.productName);
      addTextCell(row, record.productType, "产品类型");
      addTextCell(row, `${record.received.toLocaleString("zh-CN")} 件`, "生产入库");
      addTextCell(row, `${record.shipped.toLocaleString("zh-CN")} 件`, "发货出库");
      const balanceCell = addTextCell(row, `${record.balance.toLocaleString("zh-CN")} 件`, record.balance > 0 ? "有库存" : "库存为零");
      balanceCell.querySelector("strong").classList.add("cost-total");
      addTextCell(row, record.lastChangedAt, record.lastMovement);
      inventoryBody.append(row);
    });

    if (activeView === "inventory") {
      updateInventoryTable();
    } else {
      workspace.querySelector('[data-sample-count="inventory"]').textContent = String(inventoryRecords.size).padStart(2, "0");
      workspace.querySelector('[data-sample-view-count="inventory"]').textContent = `${inventoryRecords.size} 条记录`;
    }
    updateDependentActionsState();
  }

  function adjustInventory(taskId, quantityChange, movement, changedAt, taskOption) {
    const existing = inventoryRecords.get(taskId) || {
      taskId,
      sampleNo: taskOption?.dataset.sampleNo || "",
      customer: taskOption?.dataset.customer || "",
      productName: taskOption?.dataset.productName || "",
      productType: taskOption?.dataset.productType || "复合枕",
      businessPerson: taskOption?.dataset.businessPerson || "",
      received: 0,
      shipped: 0,
      balance: 0,
      lastMovement: "",
      lastChangedAt: "",
    };
    const quantity = Math.abs(Number(quantityChange));
    if (quantityChange >= 0) {
      existing.received += quantity;
      existing.balance += quantity;
    } else {
      existing.shipped += quantity;
      existing.balance -= quantity;
    }
    existing.lastMovement = movement;
    existing.lastChangedAt = String(changedAt || "").replace("T", " ");
    inventoryRecords.set(taskId, existing);
    renderInventoryTable();
    return existing;
  }

  function addProductionRecord(data) {
    const option = productionTaskSelect.selectedOptions[0];
    const row = document.createElement("tr");
    row.dataset.status = "done";
    row.dataset.relatedTaskId = data.relatedSampleTask;
    row.dataset.search = [
      option?.dataset.sampleNo,
      option?.dataset.customer,
      option?.dataset.productName,
      data.owner,
      data.productionTime,
      data.quantity,
      data.notes,
    ].join(" ");

    addTextCell(
      row,
      option?.dataset.sampleNo || "未填写单号",
      `${option?.dataset.customer || "—"} / ${option?.dataset.productName || "—"}`,
    );
    addTextCell(row, `${Number(data.quantity).toLocaleString("zh-CN")} 件`, "生产数量");
    addTextCell(row, data.owner, data.productionTime.replace("T", " "));
    addTextCell(row, `A ${data.aTemp} / B ${data.bTemp}`, `模具 ${data.moldTemp} °C`);
    addTextCell(row, data.aPumpSpeed, `流量 ${data.aPumpFlow}`);
    addTextCell(row, data.bPumpSpeed, `流量 ${data.bPumpFlow}`);
    addTextCell(row, data.notes || "—", "备注");

    productionBody.prepend(row);
    updateProductionTable();
    adjustInventory(data.relatedSampleTask, Number(data.quantity), "生产入库", data.productionTime, option);
  }

  function syncShippingTaskOptions() {
    const currentValue = shippingTaskSelect.value;
    const records = [...inventoryRecords.values()].filter((record) => record.balance > 0);
    shippingTaskSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = records.length ? "请选择样品库存" : "暂无可发货库存";
    placeholder.disabled = records.length === 0;
    shippingTaskSelect.append(placeholder);

    records.forEach((record) => {
      const option = document.createElement("option");
      option.value = record.taskId;
      option.textContent = `${record.sampleNo || `${record.customer} / ${record.productName}`}（库存 ${record.balance}）`;
      option.dataset.sampleNo = record.sampleNo;
      option.dataset.customer = record.customer;
      option.dataset.productName = record.productName;
      option.dataset.productType = record.productType;
      option.dataset.businessPerson = record.businessPerson || "";
      option.dataset.availableBalance = String(record.balance);
      shippingTaskSelect.append(option);
    });

    if ([...shippingTaskSelect.options].some((option) => option.value === currentValue)) {
      shippingTaskSelect.value = currentValue;
    }
  }

  function resetShippingForm() {
    shippingForm.reset();
    shippingForm.elements.shippingDate.value = new Date().toISOString().slice(0, 10);
    syncShippingTaskOptions();
    shippingForm.elements.shippingQuantity.removeAttribute("max");
    shippingForm.elements.shippingQuantity.placeholder = "请输入发货数量";
    shippingForm.elements.shippingQuantity.setCustomValidity("");
  }

  function fillShippingFromTask() {
    const option = shippingTaskSelect.selectedOptions[0];
    if (!option?.value) return;
    shippingForm.elements.sampleNo.value = option.dataset.sampleNo || "";
    shippingForm.elements.customer.value = option.dataset.customer || "";
    shippingForm.elements.productName.value = option.dataset.productName || "";
    shippingForm.elements.productType.value = option.dataset.productType || "复合枕";
    shippingForm.elements.businessPerson.value = option.dataset.businessPerson || "";
    shippingForm.elements.shippingQuantity.max = option.dataset.availableBalance;
    shippingForm.elements.shippingQuantity.placeholder = `可用库存 ${option.dataset.availableBalance}`;
    shippingForm.elements.shippingQuantity.setCustomValidity("");
  }

  function addShippingRecord(data) {
    const option = shippingTaskSelect.selectedOptions[0];
    const row = document.createElement("tr");
    row.dataset.status = "done";
    row.dataset.relatedTaskId = data.relatedSampleTask;
    row.dataset.search = [
      data.sampleNo,
      data.customer,
      data.productName,
      data.productType,
      data.businessPerson,
      data.shippingDate,
      data.shipper,
      data.notes,
    ].join(" ");

    addTextCell(
      row,
      option?.dataset.sampleNo || "未填写单号",
      `${option?.dataset.customer || "—"} / ${option?.dataset.productName || "—"}`,
    );
    addTextCell(row, data.sampleNo || "—", data.sampleNo ? "已填写" : "未填写");
    addTextCell(row, data.customer, data.productName);
    addTextCell(row, data.productType, data.businessPerson);
    addTextCell(row, data.shippingDate, `${Number(data.shippingQuantity).toLocaleString("zh-CN")} 件`);
    addTextCell(row, data.shipper, "发货人");
    addTextCell(row, data.notes || "—", "备注");

    shippingBody.prepend(row);
    updateShippingTable();
    adjustInventory(data.relatedSampleTask, -Number(data.shippingQuantity), "发货出库", data.shippingDate, option);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setView(tab.dataset.sampleTab));
  });
  search.addEventListener("input", updateCurrentView);
  status.addEventListener("change", updateCurrentView);

  newSampleButton.addEventListener("click", () => {
    resetSampleForm();
    if (!sampleDialog.open) sampleDialog.showModal();
  });

  newProductionButton.addEventListener("click", () => {
    resetProductionForm();
    if (!newProductionButton.disabled && !productionDialog.open) productionDialog.showModal();
  });

  newShippingButton.addEventListener("click", () => {
    resetShippingForm();
    if (!newShippingButton.disabled && !shippingDialog.open) shippingDialog.showModal();
  });

  shippingInput.addEventListener("change", () => {
    shippingLabel.textContent = shippingInput.checked ? "需要" : "不需要";
  });

  orderSelect.addEventListener("change", () => {
    const option = orderSelect.selectedOptions[0];
    if (!option?.value) return;
    if (option.dataset.customer) sampleForm.elements.customer.value = option.dataset.customer;
    if (option.dataset.product) sampleForm.elements.productName.value = option.dataset.product;
  });

  shippingTaskSelect.addEventListener("change", fillShippingFromTask);
  shippingForm.elements.shippingQuantity.addEventListener("input", () => {
    shippingForm.elements.shippingQuantity.setCustomValidity("");
  });

  sampleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(sampleForm));
    data.businessPerson = orderSelect.selectedOptions[0]?.dataset.businessPerson || "";
    const duplicate = data.sampleNo && [...taskBody.querySelectorAll("tr:not(.filter-empty)")].some((row) => row.dataset.sampleNo === data.sampleNo);
    if (duplicate) {
      showToast(`样品单号 ${data.sampleNo} 已存在`);
      return;
    }

    addSampleTask(data, shippingInput.checked);
    sampleDialog.close();
    showToast(data.sampleNo ? `样品任务 ${data.sampleNo} 已创建` : "样品任务已创建");
    resetSampleForm();
  });

  productionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(productionForm));
    addProductionRecord(data);
    productionDialog.close();
    showToast("生产记录已创建");
    resetProductionForm();
  });

  shippingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(shippingForm));
    const inventory = inventoryRecords.get(data.relatedSampleTask);
    const shippingQuantity = Number(data.shippingQuantity);
    if (!inventory || shippingQuantity > inventory.balance) {
      shippingForm.elements.shippingQuantity.setCustomValidity("发货数量不能超过当前库存");
      shippingForm.elements.shippingQuantity.reportValidity();
      return;
    }
    addShippingRecord(data);
    shippingDialog.close();
    showToast("发货记录已创建");
    resetShippingForm();
  });

  resetSampleForm();
  resetProductionForm();
  resetShippingForm();
  setView("tasks");
})();
