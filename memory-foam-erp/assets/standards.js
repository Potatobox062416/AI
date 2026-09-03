(function () {
  const workspace = document.querySelector(".standard-workspace");
  const previewDialog = document.querySelector("[data-standard-preview-dialog]");
  if (!workspace || !previewDialog) return;

  const uploadButton = workspace.querySelector('[data-standard-action="upload"]');
  const fileInput = workspace.querySelector("[data-standard-file]");
  const search = workspace.querySelector("[data-standard-search]");
  const tableBody = workspace.querySelector("[data-standard-tbody]");
  const count = workspace.querySelector("[data-standard-count]");
  const previewTitle = previewDialog.querySelector("[data-standard-preview-title]");
  const previewFilename = previewDialog.querySelector("[data-standard-preview-filename]");
  const previewSize = previewDialog.querySelector("[data-standard-preview-size]");
  const previewContent = previewDialog.querySelector("[data-standard-preview-content]");
  const previewDownload = previewDialog.querySelector("[data-standard-preview-download]");
  const toast = document.querySelector("[data-order-toast]");
  const records = new Map();
  let sequence = 0;
  let previewToken = 0;
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }

  function formatTime(date) {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  }

  function appendTextCell(row, primary, secondary = "") {
    const cell = document.createElement("td");
    const strong = document.createElement("strong");
    strong.textContent = primary;
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
    const visibleRecords = [...records.values()].filter((record) =>
      !query || `${record.standardName} ${record.file.name}`.toLocaleLowerCase("zh-CN").includes(query));
    tableBody.replaceChildren();
    count.textContent = `${records.size} 份文件`;

    if (!visibleRecords.length) {
      const row = document.createElement("tr");
      row.className = "filter-empty";
      const cell = document.createElement("td");
      cell.colSpan = 5;
      const message = document.createElement("span");
      message.className = "empty-table-message";
      message.textContent = records.size ? "没有符合搜索条件的标准文件" : "暂无记忆棉标准文件";
      cell.append(message);
      row.append(cell);
      tableBody.append(row);
      return;
    }

    visibleRecords.forEach((record) => {
      const row = document.createElement("tr");
      appendTextCell(row, record.standardName, "Word 文档");
      appendTextCell(row, record.file.name);
      appendTextCell(row, formatSize(record.file.size));
      appendTextCell(row, formatTime(record.uploadedAt));
      const actionCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "standard-row-actions";
      const previewButton = document.createElement("button");
      previewButton.type = "button";
      previewButton.className = "table-action";
      previewButton.dataset.standardPreview = record.id;
      previewButton.textContent = "预览";
      const download = document.createElement("a");
      download.className = "table-action";
      download.href = record.objectUrl;
      download.download = record.file.name;
      download.textContent = "下载";
      actions.append(previewButton, download);
      actionCell.append(actions);
      row.append(actionCell);
      tableBody.append(row);
    });
  }

  function xmlChildren(node, localName) {
    return [...node.children].filter((child) => child.localName === localName);
  }

  function paragraphText(paragraph) {
    return [...paragraph.getElementsByTagNameNS("*", "t")].map((node) => node.textContent).join("");
  }

  function appendParagraph(paragraph, target) {
    const text = paragraphText(paragraph);
    const styleNode = paragraph.getElementsByTagNameNS("*", "pStyle")[0];
    const styleId = styleNode?.getAttributeNS("http://schemas.openxmlformats.org/wordprocessingml/2006/main", "val")
      || styleNode?.getAttribute("w:val") || "";
    const headingMatch = styleId.match(/(?:heading|标题)([1-3])/i);
    let tagName = headingMatch ? `h${headingMatch[1]}` : /title|标题/i.test(styleId) ? "h1" : "p";
    if (!text && !paragraph.getElementsByTagNameNS("*", "br").length) return;
    const element = document.createElement(tagName);
    element.textContent = text || " ";
    if (paragraph.getElementsByTagNameNS("*", "numPr").length) element.classList.add("is-list-item");
    target.append(element);
  }

  function appendTable(tableNode, target) {
    const table = document.createElement("table");
    const body = document.createElement("tbody");
    xmlChildren(tableNode, "tr").forEach((rowNode) => {
      const row = document.createElement("tr");
      xmlChildren(rowNode, "tc").forEach((cellNode) => {
        const cell = document.createElement("td");
        const text = [...cellNode.getElementsByTagNameNS("*", "p")]
          .map((paragraph) => paragraphText(paragraph)).filter(Boolean).join("\n");
        cell.textContent = text;
        row.append(cell);
      });
      body.append(row);
    });
    table.append(body);
    target.append(table);
  }

  async function renderDocx(file, target) {
    if (!window.JSZip) throw new Error("Word 解析组件未加载");
    const archive = await window.JSZip.loadAsync(await file.arrayBuffer());
    const documentEntry = archive.file("word/document.xml");
    if (!documentEntry) throw new Error("文件中缺少 Word 正文");
    const xml = await documentEntry.async("string");
    const documentXml = new DOMParser().parseFromString(xml, "application/xml");
    if (documentXml.querySelector("parsererror")) throw new Error("Word 正文格式无法解析");
    const body = documentXml.getElementsByTagNameNS("*", "body")[0];
    if (!body) throw new Error("Word 文件没有正文");

    target.replaceChildren();
    [...body.children].forEach((node) => {
      if (node.localName === "p") appendParagraph(node, target);
      if (node.localName === "tbl") appendTable(node, target);
    });
    if (!target.children.length) {
      const empty = document.createElement("p");
      empty.className = "standard-preview-message";
      empty.textContent = "该文件没有可显示的正文内容";
      target.append(empty);
    }
  }

  async function openPreview(record) {
    const token = ++previewToken;
    previewTitle.textContent = record.standardName;
    previewFilename.textContent = record.file.name;
    previewSize.textContent = formatSize(record.file.size);
    previewDownload.href = record.objectUrl;
    previewDownload.download = record.file.name;
    previewContent.replaceChildren();
    const loading = document.createElement("p");
    loading.className = "standard-preview-message";
    loading.textContent = "正在解析 Word 文件…";
    previewContent.append(loading);
    if (!previewDialog.open) previewDialog.showModal();
    try {
      await renderDocx(record.file, previewContent);
    } catch (error) {
      if (token !== previewToken) return;
      previewContent.replaceChildren();
      const message = document.createElement("p");
      message.className = "standard-preview-message is-error";
      message.textContent = `${error.message}，请下载后使用 Word 打开。`;
      previewContent.append(message);
    }
  }

  uploadButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    fileInput.value = "";
    if (!file) return;
    if (!file.name.toLocaleLowerCase("zh-CN").endsWith(".docx")) {
      showToast("仅支持上传 .docx 格式的 Word 文件");
      return;
    }
    const id = `standard-${Date.now()}-${++sequence}`;
    records.set(id, {
      id,
      standardName: file.name.replace(/\.docx$/i, ""),
      file,
      uploadedAt: new Date(),
      objectUrl: URL.createObjectURL(file),
    });
    renderTable();
    showToast("记忆棉标准已上传");
  });
  tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-standard-preview]");
    if (!button) return;
    const record = records.get(button.dataset.standardPreview);
    if (record) openPreview(record);
  });
  search.addEventListener("input", renderTable);
  window.addEventListener("beforeunload", () => {
    records.forEach((record) => URL.revokeObjectURL(record.objectUrl));
  });

  renderTable();
})();
