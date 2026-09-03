(function () {
  const workspace = document.querySelector(".formula-workspace");
  const dialog = document.querySelector("[data-formula-dialog]");
  if (!workspace || !dialog) return;

  const form = dialog.querySelector("[data-formula-form]");
  const search = workspace.querySelector("[data-formula-search]");
  const statusFilter = workspace.querySelector("[data-formula-status]");
  const tableBody = workspace.querySelector("[data-formula-tbody]");
  const count = workspace.querySelector("[data-formula-count]");
  const aRows = form.querySelector("[data-formula-a-rows]");
  const toast = document.querySelector("[data-order-toast]");
  const records = new Map();
  const statusLabels = { draft: "草稿", active: "使用中", inactive: "已停用" };
  const statusClasses = { draft: "pending", active: "running", inactive: "cancelled" };
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function updateRemoveButtons() {
    const buttons = [...aRows.querySelectorAll("[data-remove-formula-a]")];
    buttons.forEach((button) => {
      button.disabled = buttons.length === 1;
    });
  }

  function addAMaterialRow() {
    const row = document.createElement("div");
    row.className = "formula-material-row";
    row.innerHTML = `
      <label><span>原料名称</span><input name="aMaterialName" required placeholder="请输入A料名称"></label>
      <label><span>配比</span><span class="input-with-unit"><input name="aMaterialRatio" type="number" min="0" step="0.01" required><b>份</b></span></label>
      <button class="formula-remove-material" type="button" data-remove-formula-a aria-label="删除A料行">&times;</button>
    `;
    aRows.append(row);
    updateRemoveButtons();
  }

  function resetForm() {
    form.reset();
    form.elements.formulaCode.setCustomValidity("");
    aRows.replaceChildren();
    addAMaterialRow();
  }

  function appendTextCell(row, primary, secondary = "") {
    const cell = document.createElement("td");
    const strong = document.createElement("strong");
    strong.textContent = primary || "—";
    cell.append(strong);
    if (secondary) {
      const small = document.createElement("small");
      small.textContent = secondary;
      cell.append(small);
    }
    row.append(cell);
  }

  function renderTable() {
    const query = search.value.trim().toLocaleLowerCase("zh-CN");
    const selectedStatus = statusFilter.value;
    const visibleRecords = [...records.values()].filter((record) => {
      const matchesSearch = !query || [record.formulaCode, record.recipeName, record.productName, record.owner]
        .join(" ").toLocaleLowerCase("zh-CN").includes(query);
      return matchesSearch && (selectedStatus === "all" || record.status === selectedStatus);
    });

    tableBody.replaceChildren();
    count.textContent = `${records.size} 条记录`;
    if (!visibleRecords.length) {
      const row = document.createElement("tr");
      row.className = "filter-empty";
      const cell = document.createElement("td");
      cell.colSpan = 6;
      const message = document.createElement("span");
      message.className = "empty-table-message";
      message.textContent = records.size ? "没有符合筛选条件的记录" : "暂无配方数据";
      cell.append(message);
      row.append(cell);
      tableBody.append(row);
      return;
    }

    visibleRecords.forEach((record) => {
      const row = document.createElement("tr");
      row.dataset.formulaRecordStatus = record.status;
      appendTextCell(row, record.formulaCode, record.productType);
      appendTextCell(row, record.recipeName, record.productName);
      const hardness = record.hardness40 ? `${record.hardness40} N` : "未填写硬度";
      const tolerance = record.hardnessTolerance ? ` ±${record.hardnessTolerance} N` : "";
      appendTextCell(row, `${hardness}${tolerance}`, `${record.foamWeight} g`);
      appendTextCell(row, `A料 ${record.aMaterials.length} 种`, `B料 ${record.bMaterialName} · ${record.bMaterialRatio} 份`);
      const statusCell = document.createElement("td");
      const badge = document.createElement("span");
      badge.className = `status-badge is-${statusClasses[record.status]}`;
      badge.textContent = statusLabels[record.status];
      const owner = document.createElement("small");
      owner.textContent = record.owner;
      statusCell.append(badge, owner);
      row.append(statusCell);
      appendTextCell(row, record.notes || "—");
      tableBody.append(row);
    });
  }

  workspace.querySelector('[data-formula-action="new"]').addEventListener("click", () => {
    resetForm();
    if (!dialog.open) dialog.showModal();
  });
  form.querySelector("[data-add-formula-a]").addEventListener("click", addAMaterialRow);
  aRows.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-formula-a]");
    if (!button || button.disabled) return;
    button.closest(".formula-material-row").remove();
    updateRemoveButtons();
  });
  form.elements.formulaCode.addEventListener("input", () => form.elements.formulaCode.setCustomValidity(""));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formulaCode = form.elements.formulaCode.value.trim();
    if (records.has(formulaCode)) {
      form.elements.formulaCode.setCustomValidity("配方代码已存在");
      form.elements.formulaCode.reportValidity();
      return;
    }
    const names = [...form.querySelectorAll('[name="aMaterialName"]')];
    const ratios = [...form.querySelectorAll('[name="aMaterialRatio"]')];
    const aMaterials = names.map((input, index) => ({ name: input.value.trim(), ratio: Number(ratios[index].value) }));
    records.set(formulaCode, {
      formulaCode,
      recipeName: form.elements.recipeName.value.trim(),
      productType: form.elements.productType.value,
      productName: form.elements.productName.value.trim(),
      hardness40: form.elements.hardness40.value,
      hardnessTolerance: form.elements.hardnessTolerance.value,
      compressionSetLimit: form.elements.compressionSetLimit.value,
      hardnessRatio6540: form.elements.hardnessRatio6540.value,
      foamWeight: form.elements.foamWeight.value,
      status: form.elements.status.value,
      owner: form.elements.owner.value.trim(),
      aMaterials,
      bMaterialName: form.elements.bMaterialName.value.trim(),
      bMaterialRatio: form.elements.bMaterialRatio.value,
      notes: form.elements.notes.value.trim(),
    });
    dialog.close();
    renderTable();
    showToast("配方已创建");
  });
  search.addEventListener("input", renderTable);
  statusFilter.addEventListener("change", renderTable);

  renderTable();
})();
