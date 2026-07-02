const PDP_COMPARE_FIXED = {
  id: "vivarea",
  name: "Raheja Vivarea",
  address: "Lower Parel, Mumbai",
  possession: "Ready to move",
  bhk: "3 & 4 BHK",
  carpet: "1,800 – 2,200 sq.ft",
  price: "₹1.4 Cr – ₹2.1 Cr",
  image: "/pdp-gallery/1.png",
};

const PDP_COMPARE_COMPETITORS = {
  lodha: {
    name: "Lodha World Towers",
    address: "Lower Parel, Mumbai",
    possession: "Ready to move",
    bhk: "3 – 5 BHK",
    carpet: "1,400 – 3,200 sq.ft",
    price: "₹2.5 Cr – ₹4.5 Cr",
    image: "/pdp-gallery/2.png",
  },
  luxurion: {
    name: "Lodha Luxurion",
    address: "Worli, Mumbai",
    possession: "Dec 2026",
    bhk: "3 & 4 BHK",
    carpet: "1,650 – 2,400 sq.ft",
    price: "₹3.2 Cr – ₹5.8 Cr",
    image: "/pdp-gallery/3.png",
  },
  piramal: {
    name: "Piramal Aranya",
    address: "Byculla, Mumbai",
    possession: "Ready to move",
    bhk: "2 – 4 BHK",
    carpet: "1,200 – 2,600 sq.ft",
    price: "₹1.8 Cr – ₹3.2 Cr",
    image: "/pdp-gallery/4.png",
  },
  artesia: {
    name: "Raheja Artesia",
    address: "Worli, Mumbai",
    possession: "Ready to move",
    bhk: "3 & 4 BHK",
    carpet: "1,500 – 2,800 sq.ft",
    price: "₹2.4 Cr – ₹4.2 Cr",
    image: "/pdp-gallery/5.png",
  },
  indiabulls: {
    name: "Indiabulls Blu",
    address: "Worli, Mumbai",
    possession: "Ready to move",
    bhk: "3 & 4 BHK",
    carpet: "1,350 – 2,500 sq.ft",
    price: "₹2.2 Cr – ₹3.8 Cr",
    image: "/pdp-gallery/2.png",
  },
};

const PDP_COMPARE_POOL_ORDER = ["lodha", "luxurion", "piramal", "artesia", "indiabulls"];

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function initPdpCompare() {
  const section = document.getElementById("pdp-compare-section");
  const pillsHost = document.getElementById("pdp-compare-pills-host");
  const matrixHost = document.getElementById("pdp-compare-matrix-host");
  const matrixOuter = document.getElementById("pdp-compare-matrix-outer");
  const loadingEl = document.getElementById("pdp-compare-loading");
  if (!section || !pillsHost || !matrixHost || !matrixOuter || !loadingEl) return;

  /** @type {string[]} */
  let selectedIds = ["lodha", "piramal"];
  let refreshTimer = 0;

  const getSlots = () => {
    const a = selectedIds[0] ?? null;
    const b = selectedIds[1] ?? null;
    return [a, b];
  };

  const renderMatrixHtml = () => {
    const fixed = PDP_COMPARE_FIXED;
    const [s1, s2] = getSlots();
    const col1 = s1 ? PDP_COMPARE_COMPETITORS[s1] : null;
    const col2 = s2 ? PDP_COMPARE_COMPETITORS[s2] : null;

    const heroCell = (data, { fixedCol, empty }) => {
      if (empty) {
        return `<th class="pdp-compare-matrix__hero" scope="col"><div class="pdp-compare-matrix__hero-img" role="img" aria-label=""></div><p class="pdp-compare-matrix__hero-title pdp-compare-matrix__cell--empty">Add a property</p></th>`;
      }
      const img = `<img class="pdp-compare-matrix__hero-img" src="${escapeHtml(data.image)}" width="320" height="180" alt="" loading="lazy" decoding="async" />`;
      const thCls = `pdp-compare-matrix__hero${fixedCol ? " pdp-compare-matrix__cell--fixed" : ""}`;
      return `<th class="${thCls}" scope="col">${img}<p class="pdp-compare-matrix__hero-title">${escapeHtml(data.name)}</p></th>`;
    };

    const dataCell = (text, { fixedCol, empty }) => {
      if (empty) {
        return `<td class="pdp-compare-matrix__cell pdp-compare-matrix__cell--empty">—</td>`;
      }
      const cls = fixedCol
        ? "pdp-compare-matrix__cell pdp-compare-matrix__cell--fixed"
        : "pdp-compare-matrix__cell";
      return `<td class="${cls}">${escapeHtml(text)}</td>`;
    };

    const row = (label, vFixed, v1, v2, empty1, empty2) => `
      <tr>
        <th class="pdp-compare-matrix__label" scope="row">${escapeHtml(label)}</th>
        ${dataCell(vFixed, { fixedCol: true, empty: false })}
        ${dataCell(v1, { fixedCol: false, empty: empty1 })}
        ${dataCell(v2, { fixedCol: false, empty: empty2 })}
      </tr>`;

    return `
      <table class="pdp-compare-matrix">
        <thead>
          <tr>
            <th class="pdp-compare-matrix__corner" scope="col"></th>
            ${heroCell(fixed, { fixedCol: true, empty: false })}
            ${col1 ? heroCell(col1, { fixedCol: false, empty: false }) : heroCell(null, { fixedCol: false, empty: true })}
            ${col2 ? heroCell(col2, { fixedCol: false, empty: false }) : heroCell(null, { fixedCol: false, empty: true })}
          </tr>
        </thead>
        <tbody>
          ${row("Project", fixed.name, col1?.name ?? "", col2?.name ?? "", !col1, !col2)}
          ${row("Address", fixed.address, col1?.address ?? "", col2?.address ?? "", !col1, !col2)}
          ${row("Possession", fixed.possession, col1?.possession ?? "", col2?.possession ?? "", !col1, !col2)}
          ${row("BHK", fixed.bhk, col1?.bhk ?? "", col2?.bhk ?? "", !col1, !col2)}
          ${row("Carpet size", fixed.carpet, col1?.carpet ?? "", col2?.carpet ?? "", !col1, !col2)}
          ${row("Price", fixed.price, col1?.price ?? "", col2?.price ?? "", !col1, !col2)}
        </tbody>
      </table>`;
  };

  const renderPills = () => {
    const fixedPill = `<span class="pdp-compare__pill pdp-compare__pill--fixed">${escapeHtml(PDP_COMPARE_FIXED.name)}</span>`;

    const selectedPills = selectedIds
      .filter(id => PDP_COMPARE_COMPETITORS[id])
      .map(id => {
        const p = PDP_COMPARE_COMPETITORS[id];
        return `<button type="button" class="pdp-compare__pill pdp-compare__pill--selected" data-compare-remove="${escapeHtml(id)}" aria-label="Remove ${escapeHtml(p.name)} from comparison">
          ${escapeHtml(p.name)}<span class="pdp-compare__pill-x" aria-hidden="true">×</span>
        </button>`;
      })
      .join("");

    const suggestPills = PDP_COMPARE_POOL_ORDER.filter(id => !selectedIds.includes(id))
      .map(id => {
        const p = PDP_COMPARE_COMPETITORS[id];
        if (!p) return "";
        return `<button type="button" class="pdp-compare__pill pdp-compare__pill--suggest" data-compare-add="${escapeHtml(id)}">
          <span class="pdp-compare__pill-plus" aria-hidden="true">+</span>${escapeHtml(p.name)}
        </button>`;
      })
      .join("");

    const addOther = `<button type="button" class="pdp-compare__pill pdp-compare__pill--add" data-compare-add-other>Add other property</button>`;

    pillsHost.innerHTML = `${fixedPill}${selectedPills}${suggestPills}${addOther}`;
  };

  const applyMatrix = () => {
    matrixHost.innerHTML = renderMatrixHtml();
  };

  /** Only the matrix waits on the skeleton; pills update immediately. */
  const scheduleMatrixRefresh = () => {
    window.clearTimeout(refreshTimer);
    matrixOuter.setAttribute("aria-busy", "true");
    loadingEl.hidden = false;
    matrixOuter.classList.add("is-loading");

    refreshTimer = window.setTimeout(() => {
      try {
        applyMatrix();
      } finally {
        loadingEl.hidden = true;
        matrixOuter.classList.remove("is-loading");
        matrixOuter.removeAttribute("aria-busy");
      }
    }, 500);
  };

  section.addEventListener("click", ev => {
    const t = ev.target;
    if (!(t instanceof Element)) return;

    const removeBtn = t.closest("[data-compare-remove]");
    if (removeBtn instanceof HTMLButtonElement) {
      const id = removeBtn.getAttribute("data-compare-remove");
      if (!id) return;
      selectedIds = selectedIds.filter(x => x !== id);
      renderPills();
      scheduleMatrixRefresh();
      return;
    }

    const addBtn = t.closest("[data-compare-add]");
    if (addBtn instanceof HTMLButtonElement) {
      const id = addBtn.getAttribute("data-compare-add");
      if (!id || !PDP_COMPARE_COMPETITORS[id]) return;
      if (selectedIds.includes(id)) return;
      if (selectedIds.length >= 2) {
        selectedIds = [...selectedIds.slice(1), id];
      } else {
        selectedIds = [...selectedIds, id];
      }
      renderPills();
      scheduleMatrixRefresh();
      return;
    }

    if (t.closest("[data-compare-add-other]")) {
      ev.preventDefault();
    }
  });

  renderPills();
  applyMatrix();
}
