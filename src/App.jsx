import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// --- PALETTES ----------------------------------------------------------------
const PALETTES = {
  dourado: {
    name: "Dourado",
    dark: {
      bg: "#0f0f0f", bg2: "#1a1a1a", bg3: "#252525", bg4: "#2a2a2a",
      text: "#f0ead6", text2: "#aaaaaa", text3: "#666666", text4: "#444444",
      accent: "#c8a96e", accentBg: "#c8a96e22", accentBorder: "#c8a96e44",
      accentText: "#0f0f0f", border: "#252525",
      up: "#ff6666", upBg: "#ff444422", down: "#66ff99", downBg: "#44ff7722",
      navBg: "#141414", shadow: "rgba(200,169,110,0.3)",
    },
    light: {
      bg: "#faf8f2", bg2: "#f0ead6", bg3: "#e8dfca", bg4: "#ddd5bc",
      text: "#2a2215", text2: "#6b5b3e", text3: "#9a8060", text4: "#bba880",
      accent: "#a07840", accentBg: "#a0784018", accentBorder: "#a0784044",
      accentText: "#ffffff", border: "#ddd5bc",
      up: "#c0392b", upBg: "#c0392b18", down: "#27ae60", downBg: "#27ae6018",
      navBg: "#ede8dc", shadow: "rgba(160,120,64,0.25)",
    },
  },
  nord: {
    name: "Nórdica",
    dark: {
      bg: "#2e3440", bg2: "#3b4252", bg3: "#434c5e", bg4: "#4c566a",
      text: "#eceff4", text2: "#d8dee9", text3: "#8090a0", text4: "#5a6a7a",
      accent: "#88c0d0", accentBg: "#88c0d022", accentBorder: "#88c0d044",
      accentText: "#2e3440", border: "#434c5e",
      up: "#bf616a", upBg: "#bf616a22", down: "#a3be8c", downBg: "#a3be8c22",
      navBg: "#242930", shadow: "rgba(136,192,208,0.3)",
    },
    light: {
      bg: "#eceff4", bg2: "#e5e9f0", bg3: "#d8dee9", bg4: "#cdd3de",
      text: "#2e3440", text2: "#3b4252", text3: "#5a6a7a", text4: "#8090a0",
      accent: "#5e81ac", accentBg: "#5e81ac18", accentBorder: "#5e81ac44",
      accentText: "#ffffff", border: "#d0d6e2",
      up: "#bf616a", upBg: "#bf616a18", down: "#a3be8c", downBg: "#a3be8c18",
      navBg: "#e0e5ef", shadow: "rgba(94,129,172,0.25)",
    },
  },
  gruvbox: {
    name: "Gruvbox",
    dark: {
      bg: "#282828", bg2: "#3c3836", bg3: "#504945", bg4: "#665c54",
      text: "#ebdbb2", text2: "#d5c4a1", text3: "#928374", text4: "#665c54",
      accent: "#d79921", accentBg: "#d7992122", accentBorder: "#d7992144",
      accentText: "#282828", border: "#504945",
      up: "#cc241d", upBg: "#cc241d22", down: "#98971a", downBg: "#98971a22",
      navBg: "#1d2021", shadow: "rgba(215,153,33,0.3)",
    },
    light: {
      bg: "#fbf1c7", bg2: "#f2e5bc", bg3: "#ebdbb2", bg4: "#d5c4a1",
      text: "#3c3836", text2: "#504945", text3: "#7c6f64", text4: "#928374",
      accent: "#b57614", accentBg: "#b5761418", accentBorder: "#b5761444",
      accentText: "#fbf1c7", border: "#d5c4a1",
      up: "#9d0006", upBg: "#9d000618", down: "#79740e", downBg: "#79740e18",
      navBg: "#ede8ca", shadow: "rgba(181,118,20,0.25)",
    },
  },
  rosePine: {
    name: "Rosé Pine",
    dark: {
      bg: "#191724", bg2: "#1f1d2e", bg3: "#26233a", bg4: "#312e44",
      text: "#e0def4", text2: "#c4c0da", text3: "#726d89", text4: "#524f67",
      accent: "#eb6f92", accentBg: "#eb6f9222", accentBorder: "#eb6f9244",
      accentText: "#191724", border: "#312e44",
      up: "#eb6f92", upBg: "#eb6f9222", down: "#9ccfd8", downBg: "#9ccfd822",
      navBg: "#120f20", shadow: "rgba(235,111,146,0.3)",
    },
    light: {
      bg: "#faf4ed", bg2: "#fffaf3", bg3: "#f2e9e1", bg4: "#dfdad9",
      text: "#575279", text2: "#6e6a86", text3: "#9893a5", text4: "#b4afbe",
      accent: "#b4637a", accentBg: "#b4637a18", accentBorder: "#b4637a44",
      accentText: "#faf4ed", border: "#dfdad9",
      up: "#b4637a", upBg: "#b4637a18", down: "#286983", downBg: "#28698318",
      navBg: "#f0e9e0", shadow: "rgba(180,99,122,0.25)",
    },
  },
  meiaNoite: {
    name: "Meia-Noite",
    dark: {
      bg: "#000000", bg2: "#0a0a0a", bg3: "#111111", bg4: "#1a1a1a",
      text: "#ffffff", text2: "#cccccc", text3: "#666666", text4: "#333333",
      accent: "#4fc3f7", accentBg: "#4fc3f722", accentBorder: "#4fc3f744",
      accentText: "#000000", border: "#111111",
      up: "#ff5252", upBg: "#ff525222", down: "#69f0ae", downBg: "#69f0ae22",
      navBg: "#000000", shadow: "rgba(79,195,247,0.3)",
    },
    light: {
      bg: "#f5f5f5", bg2: "#eeeeee", bg3: "#e0e0e0", bg4: "#bdbdbd",
      text: "#212121", text2: "#424242", text3: "#757575", text4: "#9e9e9e",
      accent: "#0288d1", accentBg: "#0288d118", accentBorder: "#0288d144",
      accentText: "#ffffff", border: "#e0e0e0",
      up: "#d32f2f", upBg: "#d32f2f18", down: "#388e3c", downBg: "#388e3c18",
      navBg: "#eeeeee", shadow: "rgba(2,136,209,0.25)",
    },
  },
  papel: {
    name: "Papel",
    dark: {
      bg: "#000000", bg2: "#0d0d0d", bg3: "#1a1a1a", bg4: "#262626",
      text: "#f5f0e8", text2: "#c8bfa8", text3: "#6b6050", text4: "#3d3530",
      accent: "#e8c97a", accentBg: "#e8c97a22", accentBorder: "#e8c97a44",
      accentText: "#000000", border: "#1a1a1a",
      up: "#e07070", upBg: "#e0707022", down: "#7ec88a", downBg: "#7ec88a22",
      navBg: "#000000", shadow: "rgba(232,201,122,0.3)",
    },
    light: {
      bg: "#ffffff", bg2: "#fafaf8", bg3: "#f2f0eb", bg4: "#e8e4db",
      text: "#1a1410", text2: "#4a3f2f", text3: "#8a7a60", text4: "#b8a888",
      accent: "#7a5c20", accentBg: "#7a5c2018", accentBorder: "#7a5c2044",
      accentText: "#ffffff", border: "#e8e4db",
      up: "#b03030", upBg: "#b0303018", down: "#2a7a3a", downBg: "#2a7a3a18",
      navBg: "#f2f0eb", shadow: "rgba(122,92,32,0.2)",
    },
  },
  catppuccin: {
    name: "Catppuccin",
    dark: {
      bg: "#1e1e2e", bg2: "#181825", bg3: "#313244", bg4: "#45475a",
      text: "#cdd6f4", text2: "#bac2de", text3: "#7f849c", text4: "#585b70",
      accent: "#cba6f7", accentBg: "#cba6f722", accentBorder: "#cba6f744",
      accentText: "#1e1e2e", border: "#313244",
      up: "#f38ba8", upBg: "#f38ba822", down: "#a6e3a1", downBg: "#a6e3a122",
      navBg: "#11111b", shadow: "rgba(203,166,247,0.3)",
    },
    light: {
      bg: "#eff1f5", bg2: "#e6e9ef", bg3: "#dce0e8", bg4: "#ccd0da",
      text: "#4c4f69", text2: "#5c5f77", text3: "#8c8fa1", text4: "#acafc0",
      accent: "#8839ef", accentBg: "#8839ef18", accentBorder: "#8839ef44",
      accentText: "#ffffff", border: "#ccd0da",
      up: "#d20f39", upBg: "#d20f3918", down: "#40a02b", downBg: "#40a02b18",
      navBg: "#dce0e8", shadow: "rgba(136,57,239,0.25)",
    },
  },
};

const DEFAULT_MARKETS = ["Mercado A", "Mercado B", "Mercado C", "Outro"];
const MONTHS     = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const MONTHS_FULL = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho",
                     "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const STORAGE_KEY  = "lista-compras-v2";
const SETTINGS_KEY = "lista-compras-settings";

const SORT_OPTIONS = [
  { key: "insertion",          label: "Ordem de inserção" },
  { key: "alpha",              label: "Alfabética (A->Z)" },
  { key: "alpha-checked-last", label: "Alfabética + marcados abaixo" },
  { key: "checked-last",       label: "Inserção + marcados abaixo" },
  { key: "checked-first",      label: "Marcados primeiro" },
  { key: "price-asc",          label: "Menor preço total primeiro" },
  { key: "price-desc",         label: "Maior preço total primeiro" },
];

// --- HELPERS -----------------------------------------------------------------
function fmt(v) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);
}
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function todayStr() { return new Date().toISOString().split("T")[0]; }
function monthKey(d) {
  const x = new Date(d + "T12:00");
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(k) {
  const [y, m] = k.split("-");
  return `${MONTHS[parseInt(m) - 1]}/${y.slice(2)}`;
}
function monthLabelFull(k) {
  const [y, m] = k.split("-");
  return `${MONTHS_FULL[parseInt(m) - 1]} ${y}`;
}
function listTotal(list) {
  return list.items.reduce((s, i) => s + i.qty * i.price, 0);
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

function maskCurrency(raw) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits, 10) / 100).toFixed(2).replace(".", ",");
}
function unmaskCurrency(masked) {
  return parseFloat((masked || "").replace(",", ".")) || 0;
}

function applySortKey(items, sortKey) {
  const arr = [...items];
  switch (sortKey) {
    case "alpha":
      return arr.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    case "alpha-checked-last":
      return arr.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? 1 : -1;
        return a.name.localeCompare(b.name, "pt-BR");
      });
    case "checked-last":
      return arr.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? 1 : -1;
        return 0;
      });
    case "checked-first":
      return arr.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? -1 : 1;
        return 0;
      });
    case "price-asc":
      return arr.sort((a, b) => a.qty * a.price - b.qty * b.price);
    case "price-desc":
      return arr.sort((a, b) => b.qty * b.price - a.qty * a.price);
    default:
      return arr; // insertion order
  }
}

function useSystemDark() {
  const getInitial = () => {
    if (typeof window === "undefined") return true;
    // Android WebView injects this before page renders
    if (typeof window.__androidDarkMode === "boolean") return window.__androidDarkMode;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const [dark, setDark] = useState(getInitial);
  useEffect(() => {
    // Listen for Android dark mode changes (when user toggles while app is open)
    const handleAndroid = () => {
      if (typeof window.__androidDarkMode === "boolean") setDark(window.__androidDarkMode);
    };
    window.addEventListener("androidDarkModeChange", handleAndroid);
    // Also listen to standard media query as fallback
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMq = (e) => {
      if (typeof window.__androidDarkMode !== "boolean") setDark(e.matches);
    };
    mq.addEventListener("change", handleMq);
    return () => {
      window.removeEventListener("androidDarkModeChange", handleAndroid);
      mq.removeEventListener("change", handleMq);
    };
  }, []);
  return dark;
}

// --- MINI CHART COMPONENTS ---------------------------------------------------
function HorizontalBars({ data, t, fs, onBarClick }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {data.map((d, i) => (
        <div key={i} onClick={() => onBarClick && onBarClick(d)} style={{ cursor: onBarClick ? "pointer" : "default" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: Math.max(10, fs - 3), color: t.text2 }}>{d.label}</span>
            <span style={{ fontSize: Math.max(10, fs - 3), color: t.accent, fontWeight: "bold" }}>{fmt(d.value)}</span>
          </div>
          <div style={{ height: 8, background: t.bg3, borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${Math.max(d.value > 0 ? 3 : 0, (d.value / max) * 100)}%`,
                background: `linear-gradient(90deg, ${t.accent}, ${t.accent}88)`,
                borderRadius: 4,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- MAIN APP -----------------------------------------------------------------
export default function App() {
  const systemDark = useSystemDark();

  const [settings, setSettings] = useState({
    paletteKey: "dourado",
    paletteMode: "dark", // "dark" | "light"
    markets: DEFAULT_MARKETS,
    customPalettes: {},
    hiddenPalettes: [], // built-in palette keys hidden by user
    sortKey: "insertion",
    fontSize: 15,
    backBehavior: "confirm", // "confirm" | "minimize" | "nothing"
    tabPosition: "bottom", // "top" | "bottom"
    hapticEnabled: true,
    totalPosition: "top",
    restockEnabled: true,
    priceHistoryMonths: 6, // 1-12 months of price history to consider
    detailedMode: false, // Modo detalhado (marca, peso, unidade)
    dismissedRestock: [],
  });
  const [data, setData] = useState({ lists: [], priceHistory: {} });

  // Navigation
  const [view, setView] = useState("home"); // start on home
  const [activeListId, setActiveListId] = useState(null);

  // List detail
  const [newItem, setNewItem] = useState({ name: "", qty: "", price: "", brand: "", weight: "", unit: "un" });
  const [autocomplete, setAutocomplete] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [listMenuOpen, setListMenuOpen] = useState(false);
  const [listMenuSection, setListMenuSection] = useState(null); // "sort"|"filter"|"total"|null
  const [listPriceFilter, setListPriceFilter] = useState(null); // null | "cheaper" | "pricier"
  const [settingsOpen, setSettingsOpen] = useState(null); // which accordion section is open
  const [showNewListForm, setShowNewListForm] = useState(false);
  // Which month groups are expanded. Current month always starts expanded.
  const [showHistory, setShowHistory] = useState(false);
  const [showFuture, setShowFuture] = useState(false);
  const [showRestoreHidden, setShowRestoreHidden] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeletePaletteKey, setConfirmDeletePaletteKey] = useState(null);
  const [openHistoryMonths, setOpenHistoryMonths] = useState({}); // { "2026-01": true }
  const [confirmModal, setConfirmModal] = useState(null); // { title, message, onConfirm }
  const [importConfirm, setImportConfirm] = useState(null); // { parsed } — pending import waiting confirmation
  const [backupManager, setBackupManager] = useState(null); // null | { backups: [] }
  const [editingItem, setEditingItem] = useState(null);

  // Home / search
  const [searchQuery, setSearchQuery] = useState("");

  // Item price history search
  const [itemSearchQuery, setItemSearchQuery] = useState("");
  const [itemSearchSuggestions, setItemSearchSuggestions] = useState([]);
  const [itemSearchSelected, setItemSearchSelected] = useState(null);
  const [showItemSuggestions, setShowItemSuggestions] = useState(false);

  // Custom palette editor
  const [customPaletteEditor, setCustomPaletteEditor] = useState(null);
  // null | { name, darkBg, darkAccent, lightBg, lightAccent, editKey }

  // New list
  const [newListName, setNewListName] = useState("");
  const [newListMarket, setNewListMarket] = useState("");
  const [newMarketName, setNewMarketName] = useState("");
  const [editingMarketIdx, setEditingMarketIdx] = useState(null);
  const [editingMarketVal, setEditingMarketVal] = useState("");

  // Duplicate modal
  const [duplicateSource, setDuplicateSource] = useState(null);
  const [duplicateZero, setDuplicateZero] = useState(false);
  const [duplicateMarket, setDuplicateMarket] = useState(null); // market for duplicate
  const [editingListHeader, setEditingListHeader] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [editListName, setEditListName] = useState("");
  const [editListMarket, setEditListMarket] = useState("");
  const [editListDate, setEditListDate] = useState("");

  // Analysis
  const [analysisTab, setAnalysisTab] = useState("monthly");
  const [chartMode, setChartMode] = useState("hbars");
  const [analysisMonth, setAnalysisMonth] = useState(() => monthKey(todayStr()));
  // Products tab filters
  const [prodSearch, setProdSearch] = useState("");
  const [prodPeriod, setProdPeriod] = useState("all");
  const [prodMarket, setProdMarket] = useState("all");
  const [prodSort, setProdSort] = useState("recurrence");
  const [prodExpanded, setProdExpanded] = useState(null);
  const [prodFilterOpen, setProdFilterOpen] = useState(null);
  const [basedOnListModal, setBasedOnListModal] = useState(false); // quick-copy modal

  // Toast
  const [toast, setToast] = useState(null);

  // -- Theme --
  const hiddenSet = new Set(settings.hiddenPalettes || []);
  const allPalettes = {
    ...Object.fromEntries(Object.entries(PALETTES).filter(([k]) => !hiddenSet.has(k))),
    ...(settings.customPalettes || {}),
  };
  const isDark = (settings.paletteMode ?? "dark") === "dark";
  const palette = allPalettes[settings.paletteKey] || PALETTES.dourado;
  const t = isDark ? palette.dark : palette.light;
  const markets = settings.markets?.length ? settings.markets : DEFAULT_MARKETS;
  const fs = settings.fontSize || 15;

  // -- Persistence --
  useEffect(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        // Migrate old format
        if (p.themeMode !== undefined) {
          p.paletteMode = p.themeMode === "light" ? "light" : "dark";
          delete p.themeMode;
        }
        if (!p.paletteMode) p.paletteMode = "dark";
        // Remove legacy "bars" chartMode
        if (p.chartMode === "bars") p.chartMode = "hbars";
        setSettings(p);
        setNewListMarket(p.markets?.[0] || DEFAULT_MARKETS[0]);
      } else {
        setNewListMarket(DEFAULT_MARKETS[0]);
      }
    } catch { setNewListMarket(DEFAULT_MARKETS[0]); }
    try {
      const d = localStorage.getItem(STORAGE_KEY);
      if (d) setData(JSON.parse(d));
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  // -- Toast --
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    window.showToast = showToast;
    return () => { delete window.showToast; };
  }, [showToast]);


  // -- Navigation helper --
  function navigate(v) {
    setView(v);
    setSearchQuery("");
    setListMenuOpen(false);
    setListPriceFilter(null);
  }

  // -- Check for updates via GitHub Releases API --
  async function checkForUpdate() {
    setUpdateStatus("checking");
    setUpdateInfo(null);
    try {
      const res = await fetch(
        "https://api.github.com/repos/thespation/lista-compras-android/releases/latest",
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const latest = (data.tag_name || "").replace(/^v/i, "");
      const current = "1.8.1";
      const apkAsset = (data.assets || []).find((a) => a.name.endsWith(".apk"));
      const downloadUrl = apkAsset ? apkAsset.browser_download_url : data.html_url;
      if (latest && latest !== current) {
        setUpdateStatus("available");
        setUpdateInfo({ version: latest, body: data.body || "", url: downloadUrl });
      } else {
        setUpdateStatus("up-to-date");
      }
    } catch (e) {
      setUpdateStatus("error");
    }
  }

  // -- Android back button handler (called from MainActivity.java) --
  useEffect(() => {
    window.__androidBack = () => {
      if (backupManager) { setBackupManager(null); return; }
      if (importConfirm) { setImportConfirm(null); return; }
      if (confirmModal) { setConfirmModal(null); return; }
      if (customPaletteEditor) { setCustomPaletteEditor(null); return; }
      if (editingItem) { setEditingItem(null); return; }
      if (editingListHeader) { setEditingListHeader(false); return; }
      if (duplicateSource) { setDuplicateSource(null); return; }
      if (settingsOpen) { setSettingsOpen(null); return; }
      if (prodFilterOpen) { setProdFilterOpen(null); return; }
      if (prodExpanded) { setProdExpanded(null); return; }
      if (view === "list-detail") { setView("home"); setSearchQuery(""); setListMenuOpen(false); setListPriceFilter(null); return; }
      if (view === "about") { setView("settings"); return; }
      if (view === "settings" || view === "analysis") { setView("home"); return; }
      // On home: apply backBehavior setting
      const behavior = settings.backBehavior || "confirm";
      if (behavior === "confirm") {
        setConfirmModal({
          title: "Sair do app?",
          message: "Deseja fechar o Lista de Compras?",
          confirmLabel: "Sair",
          cancelLabel: "Cancelar",
          onConfirm: () => {
            if (window.AndroidBridge && window.AndroidBridge.exitApp) {
              window.AndroidBridge.exitApp();
            }
          },
        });
      } else if (behavior === "minimize") {
        if (window.AndroidBridge && window.AndroidBridge.minimizeApp) {
          window.AndroidBridge.minimizeApp();
        }
      }
      // "nothing" → do nothing
    };
    return () => { window.__androidBack = null; };
  });

  // -- List CRUD --
  const currentList = data.lists.find((l) => l.id === activeListId) || null;

  function updateList(listId, updater) {
    setData((d) => ({ ...d, lists: d.lists.map((l) => (l.id === listId ? updater(l) : l)) }));
  }

  function recordPriceHistory(itemName, price, list, baseData) {
    const ph = { ...((baseData || data).priceHistory) };
    const k = itemName.toLowerCase();
    if (!ph[k]) ph[k] = [];
    ph[k] = [
      { date: list.date, price, market: list.market },
      ...ph[k].filter((h) => !(h.date === list.date && h.market === list.market)),
    ].slice(0, 60);
    return ph;
  }

  // Returns true only if a priceHistory entry matches an actual item in an existing list
  // Checks date + market + price (tolerância de 0.001 para float)
  const validPriceEntry = useCallback((h, itemName, lists) => {
    // Match by market + item name + price (date may differ if user edited it)
    return lists.some((l) =>
      l.market === h.market &&
      l.items.some((i) =>
        i.name.toLowerCase() === itemName.toLowerCase() &&
        Math.abs(i.price - h.price) < 0.01
      )
    );
  }, []);

  // Cutoff date based on priceHistoryMonths setting
  const priceHistoryCutoff = useMemo(() => {
    const months = settings.priceHistoryMonths || 6;
    const now = new Date();
    // Start of current month minus (months-1) = beginning of window
    const cutoff = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
    return cutoff.toISOString().slice(0, 10);
  }, [settings.priceHistoryMonths]);

  function createList() {
    if (!newListName.trim()) return;
    const list = { id: uid(), name: newListName.trim(), market: newListMarket, date: todayStr(), items: [] };
    setData((d) => ({ ...d, lists: [list, ...d.lists] }));
    setNewListName("");
    setActiveListId(list.id);
    setShowNewListForm(false);
    setView("list-detail");
    showToast("Lista criada!");
  }

  function doDuplicate() {
    if (!duplicateSource) return;
    const copy = {
      ...duplicateSource,
      id: uid(),
      name: duplicateSource.name + " (cópia)",
      date: todayStr(),
      market: duplicateMarket || duplicateSource.market,
      items: duplicateSource.items.map((i) => ({
        ...i,
        id: uid(),
        checked: false,
        price: duplicateZero ? 0 : i.price,
        qty: i.qty,
      })),
    };
    setData((d) => ({ ...d, lists: [copy, ...d.lists] }));
    setDuplicateSource(null);
    showToast(duplicateZero ? "Duplicada com valores zerados!" : "Lista duplicada!");
  }

  function deleteList(id) {
    setData((d) => ({ ...d, lists: d.lists.filter((l) => l.id !== id) }));
    showToast("Lista removida");
  }

  // -- Item CRUD --
  function handleNameInput(val) {
    setNewItem((i) => ({ ...i, name: val }));
    if (val.length < 2) { setShowAutocomplete(false); return; }
    const lower = val.toLowerCase();
    const matches = Object.entries(data.priceHistory)
      .filter(([k]) => k.includes(lower))
      .map(([k, entries]) => {
        const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
        return { name: k, lastPrice: sorted[0]?.price };
      })
      .slice(0, 5);
    setAutocomplete(matches);
    setShowAutocomplete(matches.length > 0);
  }

  function handleItemSearch(val) {
    setItemSearchQuery(val);
    setItemSearchSelected(null);
    if (val.length < 2) { setShowItemSuggestions(false); setItemSearchSuggestions([]); return; }
    const lower = val.toLowerCase();
    const matches = Object.entries(data.priceHistory)
      .filter(([k]) => k.includes(lower))
      .map(([k, entries]) => {
        const valid = entries.filter((h) => validPriceEntry(h, k, data.lists));
        const sorted = [...valid].sort((a, b) => b.date.localeCompare(a.date));
        return { name: k, lastPrice: sorted[0]?.price, count: valid.length };
      })
      .filter((m) => m.count > 0)
      .slice(0, 8);
    setItemSearchSuggestions(matches);
    setShowItemSuggestions(matches.length > 0);
  }

  function selectItemHistory(itemName) {
    setItemSearchQuery(itemName);
    setShowItemSuggestions(false);
    const entries = data.priceHistory[itemName] || [];
    // Only keep entries that match an existing list (same date + market)
    const validEntries = entries.filter((h) => validPriceEntry(h, itemName, data.lists));
    const sorted = [...validEntries]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 10);
    setItemSearchSelected({ name: itemName, entries: sorted });
  }

  function buildCustomPalette(e) {
    // e = { name, darkBg, darkAccent, lightBg, lightAccent }
    const mix = (hex, amt) => {
      const n = parseInt(hex.slice(1), 16);
      const r = Math.min(255, Math.max(0, (n >> 16) + amt));
      const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
      const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    };
    const alpha = (hex, a) => hex + Math.round(a * 255).toString(16).padStart(2, "0");
    const dark = {
      bg: e.darkBg,
      bg2: mix(e.darkBg, 18), bg3: mix(e.darkBg, 32), bg4: mix(e.darkBg, 48),
      text: "#eceff4", text2: "#c0c8d4", text3: "#7a8898", text4: "#4a5868",
      accent: e.darkAccent,
      accentBg: alpha(e.darkAccent, 0.13), accentBorder: alpha(e.darkAccent, 0.3),
      accentText: e.darkBg, border: mix(e.darkBg, 32),
      up: "#bf616a", upBg: alpha("#bf616a", 0.13), down: "#a3be8c", downBg: alpha("#a3be8c", 0.13),
      navBg: mix(e.darkBg, -8), shadow: alpha(e.darkAccent, 0.25),
    };
    const light = {
      bg: e.lightBg,
      bg2: mix(e.lightBg, -8), bg3: mix(e.lightBg, -18), bg4: mix(e.lightBg, -30),
      text: "#2e3440", text2: "#3b4252", text3: "#6a7888", text4: "#9aaabb",
      accent: e.lightAccent,
      accentBg: alpha(e.lightAccent, 0.1), accentBorder: alpha(e.lightAccent, 0.3),
      accentText: "#ffffff", border: mix(e.lightBg, -28),
      up: "#bf616a", upBg: alpha("#bf616a", 0.1), down: "#a3be8c", downBg: alpha("#a3be8c", 0.1),
      navBg: mix(e.lightBg, -14), shadow: alpha(e.lightAccent, 0.2),
    };
    return { name: e.name || "Personalizada", dark, light };
  }

  function saveCustomPalette() {
    if (!customPaletteEditor) return;
    const pal = buildCustomPalette(customPaletteEditor);
    const key = customPaletteEditor.editKey || ("custom_" + uid());
    setSettings((s) => ({
      ...s,
      customPalettes: { ...(s.customPalettes || {}), [key]: pal },
      paletteKey: key,
    }));
    setCustomPaletteEditor(null);
    showToast("Paleta salva!");
  }

  function pickAutocomplete(item) {
    setNewItem((i) => ({
      ...i,
      name: capitalize(item.name),
      // Only fill price from history if user hasn't typed a price yet
      price: i.price && i.price !== "0,00" ? i.price : (item.lastPrice ? maskCurrency(String(Math.round((item.lastPrice || 0) * 100))) : i.price),
    }));
    setShowAutocomplete(false);
  }

  // Returns { arrow: "up"|"down", pct, lastPrice } or null
  // Compares currentPrice against the most recent PREVIOUS purchase price
  // (ignores entries with the same price as currentPrice from the current list date)
  function getPriceHint(itemName, currentPrice, excludeDate, excludeMarket) {
    if (!itemName || !currentPrice) return null;
    const key = itemName.trim().toLowerCase();
    // Find the last LIST (other than current) that contains this item
    const cutoff = priceHistoryCutoff;
    const otherLists = data.lists
      .filter((l) => !(l.date === excludeDate && l.market === excludeMarket) && l.date >= cutoff)
      .sort((a, b) => b.date.localeCompare(a.date));
    let lastPrice = null;
    for (const list of otherLists) {
      const found = list.items.find((i) => i.name.toLowerCase() === key);
      if (found && found.price > 0) { lastPrice = found.price; break; }
    }
    if (!lastPrice || lastPrice === 0) return null;
    if (Math.abs(currentPrice - lastPrice) < 0.001) return null;
    const pct = Math.abs(((currentPrice - lastPrice) / lastPrice) * 100);
    if (pct < 0.5) return null;
    return { arrow: currentPrice > lastPrice ? "up" : "down", pct, lastPrice };
  }

  const CATALOG = ["Arroz", "Feijao", "Acucar", "Cafe", "Leite", "Pao frances", "Pao de forma", "Macarrao", "Oleo", "Azeite", "Sal", "Farinha de trigo", "Farinha de mandioca", "Ovos", "Carne moida", "Frango", "Linguica", "Queijo", "Manteiga", "Margarina", "Presunto", "Tomate", "Cebola", "Alho", "Batata", "Cenoura", "Banana", "Maca", "Laranja", "Limao", "Papel higienico", "Sabonete", "Shampoo", "Creme dental", "Detergente", "Sabao em po", "Sabao em barra", "Amaciante", "Agua sanitaria", "Esponja de louca", "Saco de lixo", "Papel toalha", "Absorvente", "Fralda", "Gas de cozinha", "Achocolatado", "Biscoito", "Farinha de milho", "Fermento em po", "Milho verde", "Molho de tomate"];

  function createSeedList() {
    const iso = new Date().toISOString().slice(0, 10);
    const market = (settings.markets && settings.markets[0]) || "Mercado";
    const seed = { id: uid(), name: "Mercado do Mes", market, date: iso, items: CATALOG.map((n) => ({ id: uid(), name: n, qty: 1, price: 0, checked: false, priceHint: null })) };
    setData((d) => ({ ...d, lists: [seed, ...d.lists] }));
    setActiveListId(seed.id);
    setView("list-detail");
    showToast("Lista do mes criada com " + CATALOG.length + " itens!");
  }

  function handleNameInput(v) {
    setNewItem((i) => ({ ...i, name: v }));
    const q = v.trim().toLowerCase();
    if (!q) { setShowAutocomplete(false); setAutocomplete([]); return; }
    const pool = [];
    const seen = new Set();
    const push = (name, price) => { const k = name.toLowerCase(); if (!seen.has(k)) { seen.add(k); pool.push({ name, lastPrice: price || 0 }); } };
    Object.entries(data.priceHistory || {}).forEach(([k, arr]) => { if (k.includes(q) && arr && arr.length) push(k, arr[0].price); });
    (data.lists || []).forEach((l) => (l.items || []).forEach((it) => { if (it.name.toLowerCase().includes(q)) push(it.name, it.price || 0); }));
    CATALOG.forEach((n) => { if (n.toLowerCase().includes(q)) push(n, 0); });
    setAutocomplete(pool.slice(0, 8));
    setShowAutocomplete(pool.length > 0);
  }

  function addItem() {
    if (!newItem.name.trim() || !currentList) return;
    const price = unmaskCurrency(newItem.price);
    const qty = parseInt(newItem.qty, 10) || 1;
    // Get hint BEFORE recording history so comparison uses previous purchases
    const hint = price > 0 ? getPriceHint(newItem.name.trim(), price) : null;
    const item = { id: uid(), name: capitalize(newItem.name.trim()), qty, price, checked: false, priceHint: hint || null, brand: newItem.brand.trim() || null, weight: newItem.weight.trim() || null, unit: newItem.unit || "un" };
    const ph = price > 0 ? recordPriceHistory(item.name, price, currentList) : data.priceHistory;
    setData((d) => ({
      ...d,
      priceHistory: ph,
      lists: d.lists.map((l) =>
        l.id === currentList.id ? { ...l, items: [...l.items, item] } : l
      ),
    }));
    setNewItem({ name: "", qty: "", price: "", brand: "", weight: "", unit: "un" });
    setShowAutocomplete(false);
    showToast("Item adicionado!");
  }

  function haptic(type = "light") {
    if (settings.hapticEnabled === false) return;
    const ms = type === "light" ? 30 : type === "medium" ? 60 : 100;
    try {
      if (window.AndroidBridge && typeof window.AndroidBridge.vibrate === "function") {
        window.AndroidBridge.vibrate(ms);
      } else if (navigator.vibrate) {
        navigator.vibrate(ms);
      }
    } catch (e) { /* ignore */ }
  }

  function toggleItem(itemId) {
    // Compute allDone based on current state BEFORE update
    const currentItems = currentList.items.map((i) =>
      i.id === itemId ? { ...i, checked: !i.checked } : i
    );
    const allDone = currentItems.length > 0 && currentItems.every((i) => i.checked);

    updateList(currentList.id, (l) => ({
      ...l,
      items: l.items.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i)),
    }));

    haptic("light");


  }

  function removeItem(itemId) {
    updateList(currentList.id, (l) => ({ ...l, items: l.items.filter((i) => i.id !== itemId) }));
  }

  function saveEditItem() {
    if (!editingItem?.name.trim()) return;
    const price = unmaskCurrency(editingItem.price);
    const qty = parseInt(editingItem.qty, 10) || 1;
    // Exclude the current list's own entry so editing a typo doesn't generate a false hint
    const hint = getPriceHint(editingItem.name.trim(), price, currentList?.date, currentList?.market);
    const ph = recordPriceHistory(editingItem.name, price, currentList);
    setData((d) => ({
      ...d,
      priceHistory: ph,
      lists: d.lists.map((l) =>
        l.id === currentList.id
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === editingItem.id
                  ? { ...i, name: capitalize(editingItem.name.trim()), qty, price, priceHint: hint || null }
                  : i
              ),
            }
          : l
      ),
    }));
    setEditingItem(null);
    showToast("Item salvo!");
  }

  function markAll(checked) {
    updateList(currentList.id, (l) => ({ ...l, items: l.items.map((i) => ({ ...i, checked })) }));
    setListMenuOpen(false);
  }

  // -- Markets --
  function addMarket() {
    const name = newMarketName.trim();
    if (!name || markets.includes(name)) return;
    setSettings((s) => ({ ...s, markets: [...markets, name] }));
    setNewMarketName("");
    showToast("Mercado adicionado!");
  }
  function removeMarket(idx) {
    const updated = markets.filter((_, i) => i !== idx);
    setSettings((s) => ({ ...s, markets: updated }));
    if (newListMarket === markets[idx]) setNewListMarket(updated[0] || "");
  }
  function saveMarketEdit() {
    const val = editingMarketVal.trim();
    if (!val || editingMarketIdx === null) return;
    setSettings((s) => ({ ...s, markets: markets.map((m, i) => (i === editingMarketIdx ? val : m)) }));
    setEditingMarketIdx(null);
    setEditingMarketVal("");
    showToast("Mercado atualizado!");
  }

  // -- Themes --
  function removeCustomTheme(key) {
    setSettings((s) => {
      const cp = { ...(s.customPalettes || {}) };
      delete cp[key];
      return { ...s, customPalettes: cp, paletteKey: s.paletteKey === key ? "dourado" : s.paletteKey };
    });
    showToast("Tema removido");
  }

  // -- Data export/import --
  // ── BACKUP SYSTEM (localStorage-based, works in Android WebView) ──
  const BACKUP_INDEX_KEY = "lista-compras-backups";

  function getBackupIndex() {
    try { return JSON.parse(localStorage.getItem(BACKUP_INDEX_KEY) || "[]"); } catch { return []; }
  }

  function saveBackupIndex(index) {
    localStorage.setItem(BACKUP_INDEX_KEY, JSON.stringify(index));
  }

  function exportData() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const ts = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const key = `lista-compras-backup-${Date.now()}`;
    const payload = JSON.stringify({ ...data, settings, exportedAt: now.toISOString(), version: "1.8.1" });
    try {
      // Check available localStorage space (~5MB limit)
      const used = JSON.stringify(localStorage).length;
      const available = 5 * 1024 * 1024 - used;
      if (payload.length > available - 50000) {
        showToast("⚠️ Armazenamento quase cheio. Apague backups antigos antes de salvar.");
        return;
      }
      localStorage.setItem(key, payload);
      const index = getBackupIndex();
      index.unshift({ key, name: `Backup ${ts}`, date: now.toISOString(), size: payload.length, lists: data.lists.length });
      saveBackupIndex(index);
      showToast("Configurações salvas localmente!");
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        showToast("⚠️ Armazenamento cheio. Apague backups antigos em Dados.");
      } else {
        showToast("Erro ao salvar backup.");
      }
    }
  }

  function shareExport() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const filename = `ListaCompras_${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_${pad(now.getHours())}h${pad(now.getMinutes())}.json`;
    const payload = JSON.stringify({ ...data, settings, exportedAt: now.toISOString(), version: "1.8.1" }, null, 2);
    if (window.AndroidBridge?.saveFile) {
      window.AndroidBridge.saveFile(filename, payload);
    } else if (window.AndroidBridge?.share) {
      window.AndroidBridge.share(payload);
    } else if (navigator.share) {
      navigator.share({ text: payload });
    } else {
      showToast("Compartilhamento não disponível");
    }
  }

  function deleteBackup(key) {
    localStorage.removeItem(key);
    const index = getBackupIndex().filter((b) => b.key !== key);
    saveBackupIndex(index);
    setBackupManager((bm) => ({ ...bm, backups: index }));
  }

  function restoreBackup(backup) {
    try {
      const raw = localStorage.getItem(backup.key);
      if (!raw) { showToast("Backup não encontrado."); return; }
      const parsed = JSON.parse(raw);
      if (!parsed.lists || !Array.isArray(parsed.lists)) { showToast("Backup inválido."); return; }
      setImportConfirm({ parsed, filename: backup.name });
    } catch { showToast("Erro ao ler backup."); }
  }

  function confirmImport() {
    if (!importConfirm) return;
    // Auto-backup current state before overwriting
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const ts = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const autoKey = `lista-compras-backup-${Date.now()}`;
    try {
      const autoPayload = JSON.stringify({ ...data, settings, exportedAt: now.toISOString(), version: "1.8.1" });
      localStorage.setItem(autoKey, autoPayload);
      const index = getBackupIndex();
      index.unshift({ key: autoKey, name: `Auto-backup antes de importar ${ts}`, date: now.toISOString(), size: autoPayload.length, lists: data.lists.length });
      saveBackupIndex(index);
    } catch { /* ignore if storage full */ }

    const parsed = importConfirm.parsed;
    setData({ lists: parsed.lists, priceHistory: parsed.priceHistory || {} });
    if (parsed.settings) {
      setSettings((s) => ({ ...s, ...parsed.settings }));
    }
    showToast(`${parsed.lists.length} listas importadas! Backup anterior salvo automaticamente.`);
    setImportConfirm(null);
    setBackupManager(null);
  }


  // -- Analysis data --
  const allMonthKeys = useMemo(
    () => [...new Set(data.lists.map((l) => monthKey(l.date)))].sort(),
    [data.lists]
  );

  // ensure current analysisMonth is in list, else pick last
  const safeMonth = allMonthKeys.includes(analysisMonth)
    ? analysisMonth
    : allMonthKeys[allMonthKeys.length - 1] || monthKey(todayStr());

  const annualYears = useMemo(() => {
    const yearSet = new Set(allMonthKeys.map((k) => k.split("-")[0]));
    return [...yearSet].sort().map((y) => {
      const months = MONTHS.map((label, idx) => {
        const key = `${y}-${String(idx + 1).padStart(2, "0")}`;
        const val = data.lists
          .filter((l) => monthKey(l.date) === key)
          .reduce((s, l) => s + listTotal(l), 0);
        return { label, key, value: val };
      });
      return { year: y, months, total: months.reduce((s, m) => s + m.value, 0) };
    });
  }, [allMonthKeys, data.lists]);

  const selectedMonthLists = data.lists.filter((l) => monthKey(l.date) === safeMonth);
  const prevMonthKey = (() => {
    const [y, m] = safeMonth.split("-").map(Number);
    return m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
  })();
  const prevMonthLists = data.lists.filter((l) => monthKey(l.date) === prevMonthKey);

  const productComparison = useMemo(() => {
    const cur = {};
    const prev = {};
    selectedMonthLists.forEach((l) =>
      l.items.forEach((i) => {
        const k = i.name.toLowerCase();
        if (!cur[k] || i.price > cur[k]) cur[k] = i.price;
      })
    );
    prevMonthLists.forEach((l) =>
      l.items.forEach((i) => {
        const k = i.name.toLowerCase();
        if (!prev[k] || i.price > prev[k]) prev[k] = i.price;
      })
    );
    return Object.keys({ ...cur, ...prev })
      .map((k) => ({
        name: capitalize(k),
        cur: cur[k],
        prev: prev[k],
        diff: (cur[k] > 0 && prev[k] > 0) ? ((cur[k] - prev[k]) / prev[k]) * 100 : null,
      }))
      .filter((p) => p.diff !== null && isFinite(p.diff))
      .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  }, [selectedMonthLists, prevMonthLists]);

  const sortedItems = useMemo(
    () => currentList ? applySortKey(currentList.items, settings.sortKey) : [],
    [currentList, settings.sortKey]
  );

  // Apply price filter
  const displayedItems = listPriceFilter
    ? sortedItems.filter((item) => {
        const hint = item.priceHint || getPriceHint(item.name, item.price);
        if (!hint) return false;
        return listPriceFilter === "cheaper" ? hint.arrow === "down" : hint.arrow === "up";
      })
    : sortedItems;

  // Filtered lists for home
  const filteredLists = useMemo(() => data.lists.filter(
    (l) =>
      !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ), [data.lists, searchQuery]);

  // -- Style shortcuts --
  const inp = {
    display: "block", width: "100%", marginTop: 6, padding: "11px 13px",
    background: t.bg3, border: `1px solid ${t.bg4}`, borderRadius: 10,
    color: t.text, fontSize: fs, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
  };
  const primaryBtn = {
    display: "block", width: "100%", padding: "13px", background: t.accent,
    color: t.accentText, border: "none", borderRadius: 10, fontSize: fs - 1,
    fontFamily: "inherit", fontWeight: "bold", letterSpacing: 1, cursor: "pointer",
  };
  const card = {
    background: t.bg2, border: `1px solid ${t.border}`,
    borderRadius: 14, padding: 16, marginBottom: 12,
  };
  const tabBtn = (active) => ({
    flex: 1, padding: "8px 4px", fontSize: fs - 4, letterSpacing: 0.5,
    cursor: "pointer", fontFamily: "inherit",
    border: `1px solid ${active ? t.accent : t.border}`,
    background: active ? t.accentBg : "transparent",
    color: active ? t.accent : t.text3, borderRadius: 8,
  });

  const navItems = [
    { key: "home",     icon: "🛒", label: "Listas" },
    { key: "analysis", icon: "📊", label: "Análise" },
    { key: "settings", icon: "⚙️", label: "Configurações" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: t.bg,
        height: "100vh",
        maxWidth: 430,
        margin: "0 auto",
        color: t.text,
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        fontSize: fs,
      }}
    >

      {/* -- TOAST -- */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: t.accent, color: t.accentText, padding: "9px 22px",
          borderRadius: 20, fontFamily: "monospace", fontSize: fs - 2,
          zIndex: 1000, fontWeight: "bold", letterSpacing: 1,
          boxShadow: `0 4px 20px ${t.shadow}`, whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}

      {/* -- TAB BAR — rendered at top or bottom based on setting -- */}
      {(() => {
        const tabPos = settings.tabPosition || "bottom";
        if (view === "list-detail") return null;
        const isBottom = tabPos === "bottom";
        return (
          <div style={{
            flexShrink: 0,
            display: "flex",
            order: isBottom ? 99 : 0,
            borderTop: isBottom ? `1px solid ${t.border}` : "none",
            borderBottom: isBottom ? "none" : `1px solid ${t.border}`,
            background: t.bg2,
          }}>
            {navItems.map((item) => {
              const active = view === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => navigate(item.key)}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: 3, padding: "10px 4px",
                    background: "none", border: "none",
                    color: active ? t.accent : t.text3,
                    cursor: "pointer", fontFamily: "inherit",
                    borderTop: isBottom ? `2px solid ${active ? t.accent : "transparent"}` : "none",
                    borderBottom: isBottom ? "none" : `2px solid ${active ? t.accent : "transparent"}`,
                  }}
                >
                  <span style={{ fontSize: fs + 4 }}>{item.icon}</span>
                  <span style={{ fontSize: fs - 5, letterSpacing: 0.3, color: active ? t.accent : t.text2 }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        );
      })()}



      {/* ======================================================================
          H O M E
      ====================================================================== */}
      {view === "home" && (
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 40, paddingTop: 0 }}>
          {/* Header */}
          <div style={{
            padding: "14px 24px 18px", paddingTop: 20,
            background: `linear-gradient(160deg, ${t.bg2}, ${t.bg})`,
            borderBottom: `1px solid ${t.border}`,
          }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Listas", value: (() => { const n = data.lists.filter((l) => monthKey(l.date) === monthKey(todayStr())).length; return n + (n === 1 ? " lista" : " listas"); })() },
                { label: "Este mês", value: fmt(data.lists.filter((l) => monthKey(l.date) === monthKey(todayStr())).reduce((s, l) => s + listTotal(l), 0)), onClick: () => { setView("analysis"); setAnalysisTab("monthly"); setAnalysisMonth(monthKey(todayStr())); } },
                { label: "Produtos", value: (() => { const curMk = monthKey(todayStr()); const lists = data.lists.filter((l) => monthKey(l.date) === curMk); const names = new Set(lists.flatMap((l) => l.items.map((i) => i.name.toLowerCase()))); return names.size; })() },
              ].map((s) => (
                <div key={s.label} onClick={s.onClick || undefined} style={{ flex: 1, background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 8px", cursor: s.onClick ? "pointer" : "default" }}>
                  <div style={{ fontSize: fs - 6, color: t.text3, letterSpacing: 1, textAlign: "center" }}>{s.label.toUpperCase()}</div>
                  <div style={{ fontSize: fs, color: t.accent, marginTop: 2, fontWeight: "bold", textAlign: "center" }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <input
                value={itemSearchQuery}
                onChange={(e) => handleItemSearch(e.target.value)}
                onFocus={() => itemSearchQuery.length >= 2 && setShowItemSuggestions(itemSearchSuggestions.length > 0)}
                placeholder="🔍 Buscar histórico de preço de item..."
                style={{ ...inp, marginTop: 0, paddingRight: itemSearchQuery ? 34 : undefined }}
              />
              {itemSearchQuery ? (
                <button
                  onClick={() => { setItemSearchQuery(""); setItemSearchSuggestions([]); setShowItemSuggestions(false); setItemSearchSelected(null); }}
                  style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: t.text3, fontSize: fs, cursor: "pointer", lineHeight: 1, padding: "2px 4px" }}
                >✕</button>
              ) : null}
              {showItemSuggestions && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50, background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 10, overflow: "hidden", boxShadow: `0 8px 24px ${t.shadow}`, marginTop: 4 }}>
                  {itemSearchSuggestions.map((s) => (
                    <div
                      key={s.name}
                      onClick={() => selectItemHistory(s.name)}
                      style={{ padding: "10px 14px", cursor: "pointer", borderBottom: `1px solid ${t.bg3}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <span style={{ fontSize: fs - 1, color: t.text }}>{s.name}</span>
                      <span style={{ fontSize: fs - 4, color: t.text3 }}>{s.count} registro{s.count !== 1 ? "s" : ""}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Item history result */}
            {itemSearchSelected && (() => {
              const { name, entries } = itemSearchSelected;
              const prices = entries.map((e) => e.price);
              const minP = Math.min(...prices);
              const maxP = Math.max(...prices);
              const avgP = prices.reduce((a, b) => a + b, 0) / prices.length;
              return (
                <div style={{ marginTop: 12, background: t.bg2, border: `1px solid ${t.accentBorder}`, borderRadius: 12, overflow: "hidden" }}>
                  {/* Header */}
                  <div style={{ padding: "12px 14px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: fs, fontWeight: "bold", color: t.accent }}>{name}</div>
                      <div style={{ fontSize: fs - 4, color: t.text3, marginTop: 2 }}>{entries.length} registro{entries.length !== 1 ? "s" : ""}</div>
                    </div>
                    <button onClick={() => { setItemSearchSelected(null); setItemSearchQuery(""); }} style={{ background: t.bg3, border: "none", color: t.text3, width: 28, height: 28, borderRadius: 7, cursor: "pointer", fontSize: 14 }}>✕</button>
                  </div>
                  {/* Min / avg / max */}
                  <div style={{ display: "flex", borderBottom: `1px solid ${t.border}` }}>
                    {[["Mínimo", minP, t.down], ["Média", avgP, t.accent], ["Máximo", maxP, t.up]].map(([label, val, color]) => (
                      <div key={label} style={{ flex: 1, padding: "10px 8px", textAlign: "center", borderRight: label !== "Máximo" ? `1px solid ${t.border}` : "none" }}>
                        <div style={{ fontSize: fs - 5, color: t.text3, letterSpacing: 0.5 }}>{label.toUpperCase()}</div>
                        <div style={{ fontSize: fs - 1, fontWeight: "bold", color, marginTop: 3 }}>{fmt(val)}</div>
                      </div>
                    ))}
                  </div>
                  {/* Table header */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "7px 12px", background: t.bg3 }}>
                    {["Data", "Mercado", "Valor", "Diferença"].map((h) => (
                      <div key={h} style={{ fontSize: fs - 5, color: t.text3, fontWeight: "bold", letterSpacing: 0.5 }}>{h.toUpperCase()}</div>
                    ))}
                  </div>
                  {/* Rows — newest first, oldest has no diff */}
                  {entries.map((entry, idx) => {
                    const next = entries[idx + 1]; // older entry
                    let diffEl = <span style={{ color: t.text4 }}>—</span>;
                    if (next) {
                      const diff = entry.price - next.price;
                      const pct = next.price > 0 ? Math.abs((diff / next.price) * 100).toFixed(1) : "0.0";
                      const isUp = diff > 0;
                      const color = isUp ? t.up : t.down;
                      diffEl = (
                        <span style={{ color, fontSize: fs - 3 }}>
                          {isUp ? "▲" : "▼"} {fmt(Math.abs(diff))} ({pct}%)
                        </span>
                      );
                    } else {
                      diffEl = <span style={{ fontSize: fs - 4, color: t.text4, fontStyle: "italic" }}>1ª compra</span>;
                    }
                    return (
                      <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "9px 12px", borderTop: `1px solid ${t.bg3}`, alignItems: "center" }}>
                        <div style={{ fontSize: fs - 3, color: t.text2 }}>
                          {new Date(entry.date + "T12:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                        </div>
                        <div style={{ fontSize: fs - 4, color: t.text3 }}>{entry.market || "—"}</div>
                        <div style={{ fontSize: fs - 2, fontWeight: "bold", color: t.text }}>{fmt(entry.price)}</div>
                        <div>{diffEl}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Inline new list form */}
          <div style={{ padding: "12px 24px 0" }}>
            {!showNewListForm ? (
              <button onClick={() => setShowNewListForm(true)} style={primaryBtn}>+ NOVA LISTA</button>
            ) : (
              <div style={{ background: t.bg2, border: `1px solid ${t.accentBorder}`, borderRadius: 14, padding: 16, marginBottom: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: fs, fontWeight: "bold", color: t.accent }}>Nova Lista</div>
                  <button onClick={() => { setShowNewListForm(false); setNewListName(""); }} style={{ background: "none", border: "none", color: t.text3, cursor: "pointer", fontSize: fs + 2, padding: "0 4px" }}>✕</button>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>NOME DA LISTA</label>
                  <div style={{ position: "relative", marginTop: 6 }}>
                    <input
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="Ex: Compras de sexta"
                      style={{ ...inp, marginTop: 0, paddingRight: newListName ? 34 : undefined }}
                      onKeyDown={(e) => e.key === "Enter" && createList()}
                      autoFocus
                    />
                    {newListName ? (
                      <button
                        onClick={() => setNewListName("")}
                        style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: t.text3, fontSize: fs, cursor: "pointer", lineHeight: 1, padding: "2px 4px" }}
                      >✕</button>
                    ) : null}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>MERCADO</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, marginBottom: 8 }}>
                    {markets.map((m, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", borderRadius: 20, overflow: "hidden", border: `1px solid ${newListMarket === m ? t.accent : t.border}`, background: newListMarket === m ? t.accentBg : t.bg3 }}>
                        {editingMarketIdx === idx ? (
                          <>
                            <input
                              value={editingMarketVal}
                              onChange={(e) => setEditingMarketVal(e.target.value)}
                              onKeyDown={(e) => { if (e.key === "Enter") saveMarketEdit(); if (e.key === "Escape") setEditingMarketIdx(null); }}
                              style={{ ...inp, marginTop: 0, border: "none", background: "transparent", padding: "6px 10px", fontSize: fs - 2, width: 100, outline: "none", color: t.text }}
                              autoFocus
                            />
                            <button onClick={saveMarketEdit} style={{ background: "none", border: "none", color: t.accent, padding: "6px 8px", cursor: "pointer", fontSize: fs - 2 }}>✓</button>
                            <button onClick={() => setEditingMarketIdx(null)} style={{ background: "none", border: "none", color: t.text3, padding: "6px 6px 6px 0", cursor: "pointer", fontSize: fs - 2 }}>✕</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setNewListMarket(m)} style={{ background: "none", border: "none", padding: "6px 10px", fontSize: fs - 2, cursor: "pointer", color: newListMarket === m ? t.accent : t.text2, fontFamily: "inherit", fontWeight: newListMarket === m ? "bold" : "normal" }}>
                              🏪 {m}
                            </button>
                            <button onClick={() => { setEditingMarketIdx(idx); setEditingMarketVal(m); }} style={{ background: "none", border: "none", color: t.text4, padding: "6px 4px 6px 0", cursor: "pointer", fontSize: fs - 4 }}>✏️</button>
                            {markets.length > 1 && (
                              <button onClick={() => removeMarket(idx)} style={{ background: "none", border: "none", color: t.text4, padding: "6px 8px 6px 2px", cursor: "pointer", fontSize: fs - 4 }}>✕</button>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      value={newMarketName}
                      onChange={(e) => setNewMarketName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addMarket()}
                      placeholder="+ Novo mercado..."
                      style={{ ...inp, marginTop: 0, flex: 1, padding: "8px 12px", borderStyle: "dashed" }}
                    />
                    <button
                      onClick={addMarket}
                      disabled={!newMarketName.trim()}
                      style={{ background: newMarketName.trim() ? t.accent : t.bg4, color: newMarketName.trim() ? t.accentText : t.text4, border: "none", borderRadius: 10, padding: "9px 14px", cursor: newMarketName.trim() ? "pointer" : "default", fontFamily: "inherit", fontWeight: "bold", fontSize: fs, flexShrink: 0 }}
                    >+</button>
                  </div>
                </div>

                <button onClick={createList} style={primaryBtn}>CRIAR LISTA</button>
                {data.lists.length > 0 && (
                  <button
                    onClick={() => setBasedOnListModal(true)}
                    style={{ width: "100%", marginTop: 8, padding: "10px", background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 10, color: t.text2, fontSize: fs - 2, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    📋 Basear em lista anterior
                  </button>
                )}
              </div>
            )}
          </div>

          <div style={{ padding: "14px 24px 0" }}>
            {filteredLists.length === 0 ? (
              <div style={{ textAlign: "center", padding: "50px 0", color: t.text4 }}>
                <div style={{ fontSize: 38 }}>🛒</div>
                <div style={{ marginTop: 10, fontSize: fs }}>Nenhuma lista encontrada</div>\n              <button onClick={createSeedList} style={{ ...primaryBtn, padding: "12px 18px", marginTop: 18 }}>\u{1F6D2} CRIAR LISTA DO MES (ITENS BASICOS)</button>\n              <div style={{ display: "none" }}></div>
              </div>
) : (() => {
              const now = new Date();
              const curMk = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
              const todayStr2 = now.toISOString().slice(0,10);
              const futureLists = filteredLists.filter((l) => (l.date || "") > todayStr2 && !(l.date || "").startsWith(curMk));
              const futureIds = new Set(futureLists.map((l) => l.id));
              const currentLists = filteredLists.filter((l) => (l.date || "").startsWith(curMk) && !futureIds.has(l.id));
              const historyLists = filteredLists.filter((l) => !(l.date || "").startsWith(curMk) && !futureIds.has(l.id) && (l.date || "") <= todayStr2);

              // Group history by month
              const histGroups = {};
              historyLists.forEach((list) => {
                const mk = list.date ? list.date.substring(0, 7) : "0000-00";
                if (!histGroups[mk]) histGroups[mk] = [];
                histGroups[mk].push(list);
              });
              const histKeys = Object.keys(histGroups).sort((a, b) => b.localeCompare(a));

              const renderListCard = (list, idx, lists) => (
                          <div
                            key={list.id}
                            style={{ ...card, cursor: "pointer", margin: 0, borderRadius: 0, border: "none", borderBottom: idx < lists.length - 1 ? `1px solid ${t.bg3}` : "none" }}
                            onClick={() => { setActiveListId(list.id); setSearchQuery(""); setView("list-detail"); }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: "bold", fontSize: fs + 1 }}>{list.name}</div>
                                <div style={{ fontSize: fs - 3, color: t.text3, marginTop: 2 }}>
                                  {list.market} · {new Date(list.date + "T12:00").toLocaleDateString("pt-BR")}
                                </div>
                              </div>
                              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                                <div style={{ color: t.accent, fontWeight: "bold", fontSize: fs + 3 }}>{fmt(listTotal(list))}</div>
                                <div style={{ fontSize: fs - 4, color: t.text3 }}>{list.items.length} vol · {list.items.reduce((s,i)=>s+(parseInt(i.qty,10)||1),0)} itens</div>
                              </div>
                            </div>
                            {list.items.length > 0 && (
                              <div style={{ marginTop: 8, display: "flex", gap: 5, flexWrap: "wrap" }}>
                                {list.items.slice(0, 5).map((i) => (
                                  <span key={i.id} style={{ background: t.bg3, borderRadius: 6, padding: "2px 7px", fontSize: fs - 4, color: t.text3, textDecoration: i.checked ? "line-through" : "none" }}>
                                    {i.name}
                                  </span>
                                ))}
                                {list.items.length > 5 && <span style={{ fontSize: fs - 4, color: t.text4 }}>+{list.items.length - 5}</span>}
                              </div>
                            )}
                            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setDuplicateSource(list); setDuplicateZero(false); setDuplicateMarket(list.market); }}
                                style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, color: t.accent, borderRadius: 8, padding: "4px 10px", fontSize: fs - 4, cursor: "pointer", fontFamily: "inherit" }}
                              >
                                ⧉ Duplicar
                              </button>
                              {confirmDeleteId === list.id ? (
                                <>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); deleteList(list.id); setConfirmDeleteId(null); }}
                                    style={{ background: "#c0392b22", border: "1px solid #c0392b66", color: "#e74c3c", borderRadius: 8, padding: "4px 10px", fontSize: fs - 4, cursor: "pointer", fontFamily: "inherit", fontWeight: "bold" }}
                                  >
                                    ✕ Confirmar
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(null); }}
                                    style={{ background: "none", border: "none", color: t.text4, fontSize: fs - 4, cursor: "pointer", padding: "4px 0", fontFamily: "inherit" }}
                                  >
                                    Cancelar
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(list.id); }}
                                  style={{ background: "none", border: "none", color: t.text4, fontSize: fs - 4, cursor: "pointer", padding: "4px 0", fontFamily: "inherit" }}
                                >
                                  ✕ Remover
                                </button>
                              )}
                            </div>
                          </div>
              );

              return (
                <>
                  {/* Listas Futuras */}
                  {futureLists.length > 0 && (
                    <div style={{ marginBottom: 8 }}>
                      <button
                        onClick={() => setShowFuture((v) => !v)}
                        style={{ width: "100%", padding: "12px", background: t.bg2, border: `1px solid ${t.border}`, borderRadius: showFuture ? "12px 12px 0 0" : 12, color: t.text3, fontSize: fs - 2, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8, borderBottom: showFuture ? "none" : `1px solid ${t.border}` }}
                      >
                        <span>📅</span>
                        <span>Listas Futuras</span>
                        <span style={{ marginLeft: "auto", fontSize: fs - 4, background: t.accentBg, color: t.accent, borderRadius: 6, padding: "1px 7px" }}>{futureLists.length}</span>
                        <span style={{ fontSize: fs - 3, transition: "transform 0.2s", display: "inline-block", transform: showFuture ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {showFuture && (
                        <div style={{ border: `1px solid ${t.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                          {futureLists.map((list, idx) => renderListCard(list, idx, futureLists))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Current month lists */}
                  {currentLists.length === 0 && !searchQuery ? (
                    <div style={{ textAlign: "center", padding: "30px 0", color: t.text4, fontSize: fs - 1 }}>
                      Nenhuma lista este mês
                    </div>
                  ) : (
                    <div style={{ border: `1px solid ${t.accentBorder}`, borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
                      {currentLists.map((list, idx) => renderListCard(list, idx, currentLists))}
                    </div>
                  )}

                  {/* History — Meses anteriores */}
                  {historyLists.length > 0 && (
                    <div style={{ marginTop: 4 }}>
                      {/* Toggle button */}
                      <button
                        onClick={() => setShowHistory((v) => !v)}
                        style={{ width: "100%", padding: "12px", background: t.bg2, border: `1px solid ${t.border}`, borderRadius: showHistory ? "12px 12px 0 0" : 12, color: t.text3, fontSize: fs - 2, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8, borderBottom: showHistory ? "none" : `1px solid ${t.border}` }}
                      >
                        <span>🗂️</span>
                        <span>Meses anteriores</span>
                        <span style={{ marginLeft: "auto", fontSize: fs - 3, transition: "transform 0.2s", display: "inline-block", transform: showHistory ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>

                      {showHistory && (() => {
                        // Group by year first, then month
                        const byYear = {};
                        histKeys.forEach((mk) => {
                          const yr = mk.substring(0, 4);
                          if (!byYear[yr]) byYear[yr] = [];
                          byYear[yr].push(mk);
                        });
                        const years = Object.keys(byYear).sort((a, b) => b - a);

                        return (
                          <div style={{ border: `1px solid ${t.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                            {years.map((yr, yi) => (
                              <div key={yr}>
                                {/* Year header */}
                                <div style={{ padding: "6px 14px", background: t.bg4 || t.bg3, borderTop: yi > 0 ? `1px solid ${t.border}` : "none" }}>
                                  <span style={{ fontSize: fs - 4, fontWeight: "bold", color: t.text3, letterSpacing: 1 }}>{yr}</span>
                                </div>
                                {/* Month rows */}
                                {byYear[yr].map((mk) => {
                                  const mo = mk.substring(5, 7);
                                  const monthName = mo && mo !== "00" ? MONTHS_FULL[parseInt(mo, 10) - 1] : "Data desconhecida";
                                  const lists = histGroups[mk];
                                  const groupTotal = lists.reduce((s, l) => s + listTotal(l), 0);
                                  const isMonthOpen = !!openHistoryMonths[mk];
                                  return (
                                    <div key={mk}>
                                      {/* Month header — tap to expand */}
                                      <div
                                        onClick={() => setOpenHistoryMonths((o) => ({ ...o, [mk]: !o[mk] }))}
                                        style={{ padding: "11px 14px", background: t.bg3, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${t.border}`, cursor: "pointer" }}
                                      >
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                          <span style={{ fontSize: fs - 3, transition: "transform 0.15s", display: "inline-block", transform: isMonthOpen ? "rotate(90deg)" : "none", color: t.text3 }}>▶</span>
                                          <span style={{ fontSize: fs - 1, fontWeight: "bold", color: t.text2 }}>{monthName}</span>
                                        </div>
                                        <span style={{ fontSize: fs - 3, color: t.text3 }}>{lists.length} lista{lists.length !== 1 ? "s" : ""} · {fmt(groupTotal)}</span>
                                      </div>
                                      {/* Lists inside month */}
                                      {isMonthOpen && (
                                        <div style={{ borderTop: `1px solid ${t.bg3}` }}>
                                          {lists.map((list, idx) => renderListCard(list, idx, lists))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* ======================================================================
          L I S T   D E T A I L
      ====================================================================== */}
      {view === "list-detail" && currentList && (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

          {/* -- Fixed top section -- */}
          <div style={{ flexShrink: 0, background: t.bg2, borderBottom: `1px solid ${t.border}`, zIndex: 10 }}>

            {/* Compact top bar: [← Voltar]  [☰ title]  [⋮] */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 12px", paddingTop: "calc(10px + env(safe-area-inset-top, 0px))",
              borderBottom: `1px solid ${t.bg3}`,
            }}>
              {/* Left: back button */}
              <button
                onClick={() => { setView("home"); setSearchQuery(""); setListMenuOpen(false); setListPriceFilter(null); }}
                style={{ background: "none", border: "none", color: t.accent, fontSize: fs, cursor: "pointer", padding: "4px 6px", fontFamily: "inherit", flexShrink: 0, display: "flex", alignItems: "center", gap: 4, borderRadius: 8 }}
              >
                ← Voltar
              </button>

              {/* Centre: list name (tap to edit) */}
              <div
                style={{ flex: 1, minWidth: 0, textAlign: "center", cursor: "pointer" }}
                onClick={() => { setEditListName(currentList.name); setEditListMarket(currentList.market); setEditListDate(currentList.date); setEditingListHeader(true); }}
              >
                <div style={{ fontSize: fs - 1, fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: t.text }}>
                  {currentList.name}
                </div>
                <div style={{ fontSize: fs - 4, color: t.text3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  ✏️ {currentList.market} · {new Date(currentList.date + "T12:00").toLocaleDateString("pt-BR")}
                </div>
              </div>

              {/* Right: sort/actions menu */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => setListMenuOpen((v) => !v)}
                  style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text2, borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: fs + 2, fontFamily: "inherit", lineHeight: 1 }}
                  title="Ordenar e ações"
                >
                  ⋮
                </button>

                {/* Dropdown menu — compact accordion */}
                {listMenuOpen && (
                  <>
                    <div onClick={() => { setListMenuOpen(false); setListMenuSection(null); }} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
                    <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 99, background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 12, minWidth: 240, maxWidth: 280, boxShadow: `0 8px 32px rgba(0,0,0,0.5)`, overflow: "hidden" }}>
                      {/* Ordenar por */}
                      <button onClick={() => setListMenuSection(listMenuSection === "sort" ? null : "sort")}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "11px 16px", background: listMenuSection === "sort" ? t.accentBg : "none", border: "none", borderBottom: `1px solid ${t.bg3}`, color: listMenuSection === "sort" ? t.accent : t.text, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: fs - 6, color: listMenuSection === "sort" ? t.accent : t.text3, letterSpacing: 1 }}>ORDENAR POR</div>
                          <div style={{ fontSize: fs - 2, marginTop: 1 }}>{SORT_OPTIONS.find((o) => o.key === settings.sortKey)?.label || "Padrão"}</div>
                        </div>
                        <span style={{ fontSize: fs - 4, display: "inline-block", transform: listMenuSection === "sort" ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {listMenuSection === "sort" && SORT_OPTIONS.map((opt) => (
                        <button key={opt.key} onClick={() => { setSettings((s) => ({ ...s, sortKey: opt.key })); setListMenuSection(null); }}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "9px 16px 9px 24px", background: settings.sortKey === opt.key ? t.accentBg : t.bg3, border: "none", borderBottom: `1px solid ${t.bg2}`, color: settings.sortKey === opt.key ? t.accent : t.text2, cursor: "pointer", fontFamily: "inherit", fontSize: fs - 3 }}
                        ><span>{opt.label}</span>{settings.sortKey === opt.key && <span>✓</span>}</button>
                      ))}
                      {/* Filtrar preço */}
                      {(() => {
                        const filterOpts = [{ key: null, label: "Todos os itens", icon: "○" }, { key: "cheaper", label: "Ficou mais barato", icon: "▼" }, { key: "pricier", label: "Ficou mais caro", icon: "▲" }];
                        const cur = filterOpts.find((o) => o.key === listPriceFilter) || filterOpts[0];
                        return (<>
                          <button onClick={() => setListMenuSection(listMenuSection === "filter" ? null : "filter")}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "11px 16px", background: listMenuSection === "filter" ? t.accentBg : "none", border: "none", borderBottom: `1px solid ${t.bg3}`, color: listMenuSection === "filter" ? t.accent : t.text, cursor: "pointer", fontFamily: "inherit" }}
                          >
                            <div style={{ textAlign: "left" }}>
                              <div style={{ fontSize: fs - 6, color: listMenuSection === "filter" ? t.accent : t.text3, letterSpacing: 1 }}>FILTRAR PREÇO</div>
                              <div style={{ fontSize: fs - 2, marginTop: 1 }}>{cur.label}</div>
                            </div>
                            <span style={{ fontSize: fs - 4, display: "inline-block", transform: listMenuSection === "filter" ? "rotate(180deg)" : "none" }}>▾</span>
                          </button>
                          {listMenuSection === "filter" && filterOpts.map(({ key, label, icon }) => (
                            <button key={String(key)} onClick={() => { setListPriceFilter(key); setListMenuSection(null); }}
                              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 16px 9px 24px", background: listPriceFilter === key ? t.accentBg : t.bg3, border: "none", borderBottom: `1px solid ${t.bg2}`, color: listPriceFilter === key ? t.accent : t.text2, cursor: "pointer", fontFamily: "inherit", fontSize: fs - 3 }}
                            ><span style={{ width: 12 }}>{icon}</span><span style={{ flex: 1 }}>{label}</span>{listPriceFilter === key && <span>✓</span>}</button>
                          ))}
                        </>);
                      })()}
                      {/* Total */}
                      <button onClick={() => setListMenuSection(listMenuSection === "total" ? null : "total")}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "11px 16px", background: listMenuSection === "total" ? t.accentBg : "none", border: "none", borderBottom: `1px solid ${t.bg3}`, color: listMenuSection === "total" ? t.accent : t.text, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: fs - 6, color: listMenuSection === "total" ? t.accent : t.text3, letterSpacing: 1 }}>TOTAL</div>
                          <div style={{ fontSize: fs - 2, marginTop: 1 }}>{settings.totalPosition === "bottom" ? "Rodapé" : "Topo"}</div>
                        </div>
                        <span style={{ fontSize: fs - 4, display: "inline-block", transform: listMenuSection === "total" ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {listMenuSection === "total" && [["top","Topo"],["bottom","Rodapé"]].map(([k,l]) => (
                        <button key={k} onClick={() => { setSettings((s) => ({ ...s, totalPosition: k })); setListMenuSection(null); }}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "9px 16px 9px 24px", background: settings.totalPosition === k ? t.accentBg : t.bg3, border: "none", borderBottom: `1px solid ${t.bg2}`, color: settings.totalPosition === k ? t.accent : t.text2, cursor: "pointer", fontFamily: "inherit", fontSize: fs - 3 }}
                        ><span>{l}</span>{settings.totalPosition === k && <span>✓</span>}</button>
                      ))}
                      {/* Ações */}
                      <div style={{ padding: "8px 16px 4px", fontSize: fs - 6, letterSpacing: 1, color: t.text3, borderTop: `1px solid ${t.border}` }}>AÇÕES</div>
                      <button onClick={() => {
                          const lines = [`📋 ${currentList.name} — ${currentList.market}`, `📅 ${new Date(currentList.date + "T12:00").toLocaleDateString("pt-BR")}`, "", ...sortedItems.map((i) => `${i.checked ? "✅" : "⬜"} ${i.name}${i.qty > 1 ? ` (${i.qty}x)` : ""} — ${fmt(i.price)}`), "", `Total: ${fmt(listTotal(currentList))}`].join("\n");
                          setListMenuOpen(false); setListMenuSection(null);
                          if (window.AndroidBridge?.share) window.AndroidBridge.share(lines); else if (navigator.share) navigator.share({ text: lines });
                        }}
                        style={{ display: "block", width: "100%", padding: "10px 16px", background: "none", border: "none", borderBottom: `1px solid ${t.bg3}`, color: t.text, cursor: "pointer", fontFamily: "inherit", fontSize: fs - 2, textAlign: "left" }}
                      >↗ Exportar lista</button>
                      <button onClick={() => { markAll(true); setListMenuOpen(false); setListMenuSection(null); }}
                        style={{ display: "block", width: "100%", padding: "10px 16px", background: "none", border: "none", borderBottom: `1px solid ${t.bg3}`, color: t.text, cursor: "pointer", fontFamily: "inherit", fontSize: fs - 2, textAlign: "left" }}
                      >✓ Marcar todos</button>
                      <button onClick={() => { markAll(false); setListMenuOpen(false); setListMenuSection(null); }}
                        style={{ display: "block", width: "100%", padding: "10px 16px", background: "none", border: "none", color: t.text, cursor: "pointer", fontFamily: "inherit", fontSize: fs - 2, textAlign: "left" }}
                      >○ Desmarcar todos</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Total strip — top or bottom based on setting */}
            {(() => {
              const isBottom = settings.totalPosition === "bottom";
              const strip = (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: t.bg2, borderTop: isBottom ? `1px solid ${t.border}` : "none", borderBottom: isBottom ? "none" : `1px solid ${t.border}`, flexShrink: 0 }}>
                  <div style={{ fontSize: fs - 4, color: t.text3 }}>
                    {currentList.items.filter((i) => i.checked).length}/{currentList.items.length} marcados
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: fs - 4, color: t.text3, letterSpacing: 1 }}>
                      {currentList.items.some((i) => !i.price) ? "≈ TOTAL" : "TOTAL"}
                    </span>
                    <span style={{ fontSize: fs + 6, color: t.accent, fontWeight: "bold", lineHeight: 1 }}>{fmt(listTotal(currentList))}</span>
                  </div>
                </div>
              );
              return isBottom ? null : strip;
            })()}


            {/* Add item form */}
            <div style={{ padding: "10px 16px 12px", background: t.bg, borderBottom: `1px solid ${t.border}`, position: "relative" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 56px 70px", gap: 6, marginBottom: 8 }}>
                <div style={{ position: "relative" }}>
                  <input
                    value={newItem.name}
                    onChange={(e) => handleNameInput(e.target.value)}
                    placeholder="Produto"
                    style={{ ...inp, marginTop: 0, paddingRight: newItem.name ? "32px" : "10px" }}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                  />
                  {newItem.name && (
                    <div
                      onClick={() => setNewItem({ name: "", qty: "", price: "", brand: "", weight: "", unit: "un" })}
                      style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: t.text3, fontSize: fs + 2, fontWeight: "bold", padding: "4px", zIndex: 60 }}
                    >
                      ✕
                    </div>
                  )}
                  {showAutocomplete && (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 10, zIndex: 50, overflow: "hidden", boxShadow: `0 8px 24px ${t.shadow}` }}>
                      {autocomplete.map((ac) => {
                        const existingItem = currentList?.items.find((i) => i.name.toLowerCase() === ac.name.toLowerCase());
                        return (
                          <div key={ac.name} style={{ borderBottom: `1px solid ${t.border}` }}>
                            <div
                              onClick={() => pickAutocomplete(ac)}
                              style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: existingItem ? t.accentBg : "transparent" }}
                            >
                              <div>
                                <span style={{ textTransform: "capitalize", fontSize: fs - 1, color: existingItem ? t.accent : t.text }}>{ac.name}</span>
                                {existingItem && (
                                  <span style={{ fontSize: fs - 5, color: t.accent, marginLeft: 8, background: t.accentBg, padding: "1px 6px", borderRadius: 4 }}>já na lista</span>
                                )}
                              </div>
                              <span style={{ color: t.accent, fontSize: fs - 2 }}>{fmt(ac.lastPrice)}</span>
                            </div>
                            {existingItem && (
                              <div
                                onClick={() => { setEditingItem({ ...existingItem, price: maskCurrency(String(Math.round(existingItem.price * 100))) }); setShowAutocomplete(false); setNewItem({ name: "", qty: "", price: "" }); }}
                                style={{ padding: "7px 14px", cursor: "pointer", background: t.accentBg, display: "flex", alignItems: "center", gap: 6 }}
                              >
                                <span style={{ fontSize: fs - 4, color: t.accent }}>✏️ Editar item existente ({existingItem.qty}x · {fmt(existingItem.price)})</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  value={newItem.qty}
                  onChange={(e) => setNewItem((i) => ({ ...i, qty: e.target.value.replace(/[^0-9]/g, "") }))}
                  placeholder="Qtd"
                  style={{ ...inp, marginTop: 0 }}
                  min="1"
                  step="1"
                />
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={newItem.price}
                    onChange={(e) => setNewItem((i) => ({ ...i, price: maskCurrency(e.target.value) }))}
                    placeholder="0,00"
                    style={{ ...inp, marginTop: 0 }}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                  />
                  {(() => {
                    const hint = unmaskCurrency(newItem.price) > 0 ? getPriceHint(newItem.name, unmaskCurrency(newItem.price)) : null;
                    if (!hint) return null;
                    return (
                      <div style={{
                        position: "absolute", top: "50%", right: 6, transform: "translateY(-50%)",
                        fontSize: fs - 5, fontWeight: "bold", lineHeight: 1,
                        color: hint.arrow === "down" ? t.down : t.up,
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                        pointerEvents: "none",
                      }}>
                        <span>{hint.arrow === "down" ? "▼" : "▲"}</span>
                        <span style={{ fontSize: fs - 7 }}>{hint.pct.toFixed(0)}%</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
              {/* Campos de Modo Detalhado */}
              {settings.detailedMode && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 60px", gap: 6, marginBottom: 8 }}>
                  <input
                    value={newItem.brand}
                    onChange={(e) => setNewItem((i) => ({ ...i, brand: e.target.value }))}
                    placeholder="Marca"
                    style={{ ...inp, marginTop: 0, fontSize: fs - 2 }}
                  />
                  <input
                    value={newItem.weight}
                    onChange={(e) => setNewItem((i) => ({ ...i, weight: e.target.value.replace(/[^0-9.]/g, "") }))}
                    placeholder="Peso"
                    style={{ ...inp, marginTop: 0, fontSize: fs - 2 }}
                    inputMode="decimal"
                  />
                  <select
                    value={newItem.unit}
                    onChange={(e) => setNewItem((i) => ({ ...i, unit: e.target.value }))}
                    style={{ ...inp, marginTop: 0, fontSize: fs - 2, padding: "0 4px" }}
                  >
                    <option value="un">un</option>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              )}
              <button onClick={addItem} style={{ ...primaryBtn, padding: "10px" }}>+ ADICIONAR</button>
            </div>
          </div>

          {/* -- Scrollable items -- */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 20px" }}>
            {/* Active filter badge */}
            {listPriceFilter && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0 4px", marginBottom: 2 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: listPriceFilter === "cheaper" ? t.downBg : t.upBg,
                  color: listPriceFilter === "cheaper" ? t.down : t.up,
                  borderRadius: 20, padding: "4px 12px", fontSize: fs - 4, fontWeight: "bold",
                }}>
                  {listPriceFilter === "cheaper" ? "▼ Mais baratos" : "▲ Mais caros"}
                  <span
                    onClick={() => setListPriceFilter(null)}
                    style={{ marginLeft: 4, cursor: "pointer", opacity: 0.7, fontSize: fs - 3 }}
                  >✕</span>
                </div>
              </div>
            )}
            {sortedItems.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: t.text4, fontSize: fs }}>
                Nenhum item ainda
              </div>
            )}
            {sortedItems.length > 0 && displayedItems.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: t.text4, fontSize: fs }}>
                Nenhum item com variação de preço encontrado
              </div>
            )}
            {displayedItems.map((item) => {
              const hint = item.priceHint || getPriceHint(item.name, item.price);
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: `1px solid ${t.bg3}` }}>
                  <div
                    onClick={() => toggleItem(item.id)}
                    style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${item.checked ? t.accent : t.bg4}`, background: item.checked ? t.accent : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs - 3, color: t.accentText }}
                  >
                    {item.checked ? "✓" : ""}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: fs, textDecoration: item.checked ? "line-through" : "none", color: item.checked ? t.text4 : t.text, wordBreak: "break-word" }}>
                      {item.name}
                    </div>
                    {(item.brand || item.weight) && (
                      <div style={{ fontSize: fs - 4, color: t.text3, marginTop: 1 }}>
                        {[item.brand, item.weight ? item.weight + (item.unit || "un") : null].filter(Boolean).join(" \u00b7 ")}
                      </div>
                    )}
                    <div style={{ fontSize: fs - 3, color: t.text3, display: "flex", alignItems: "center", gap: 5 }}>
                      <span>{item.qty}x {fmt(item.price)}</span>
                      {hint && (
                        <span style={{
                          color: hint.arrow === "down" ? t.down : t.up,
                          fontWeight: "bold", fontSize: fs - 4, lineHeight: 1,
                          display: "inline-flex", alignItems: "center", gap: 2,
                        }}>
                          {hint.arrow === "down" ? "▼" : "▲"}{hint.pct.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ color: item.checked ? t.text4 : t.accent, fontWeight: "bold", fontSize: fs }}>
                    {fmt(item.qty * item.price)}
                  </div>
                  <button
                    onClick={() => setEditingItem({ ...item, price: maskCurrency(String(Math.round(item.price * 100))), qty: item.qty.toString() })}
                    style={{ background: "none", border: "none", color: t.text3, cursor: "pointer", fontSize: fs + 1, padding: "0 2px" }}
                  >
                    ✏️
                  </button>
                </div>
              );
            })}
          </div>
        {/* Bottom total footer */}
        {settings.totalPosition === "bottom" && currentList && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: t.bg2, borderTop: `1px solid ${t.border}`, flexShrink: 0 }}>
            <div style={{ fontSize: fs - 4, color: t.text3 }}>
              {currentList.items.filter((i) => i.checked).length}/{currentList.items.length} marcados
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: fs - 4, color: t.text3, letterSpacing: 1 }}>
                {currentList.items.some((i) => !i.price) ? "≈ TOTAL" : "TOTAL"}
              </span>
              <span style={{ fontSize: fs + 6, color: t.accent, fontWeight: "bold", lineHeight: 1 }}>{fmt(listTotal(currentList))}</span>
            </div>
          </div>
        )}
        </div>
      )}

      {/* ======================================================================
          A N A L Y S I S
      ====================================================================== */}
      {view === "analysis" && (
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 40 }}>
          {/* Header */}
          <div style={{ padding: "16px 24px 16px", borderBottom: `1px solid ${t.border}`, background: t.bg2 }}>
            <h2 style={{ margin: "0 0 16px", fontWeight: "normal", fontSize: fs + 8 }}>Análise</h2>
            <div style={{ display: "flex", gap: 7 }}>
              {[["annual", "📅 Anual"], ["monthly", "🗓 Mensal"], ["markets", "📋 Produtos"]].map(([k, l]) => (
                <button key={k} onClick={() => setAnalysisTab(k)} style={tabBtn(analysisTab === k)}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{ padding: "16px 24px" }}>

            {/* ── Global summary card ── */}
            {data.lists.length > 0 && (() => {
              const curMk = monthKey(todayStr());
              const yearStr = curMk.slice(0, 4);
              const allThisYear = data.lists.filter((l) => l.date.startsWith(yearStr));
              const totalYear = allThisYear.reduce((s, l) => s + listTotal(l), 0);
              const thisMonth = data.lists.filter((l) => monthKey(l.date) === curMk).reduce((s, l) => s + listTotal(l), 0);

              // Find previous month with data
              const [cy, cm] = curMk.split("-").map(Number);
              let prevLabel = "MÊS ANTERIOR";
              let prevValue = 0;
              let prevFound = false;

              // Check immediately previous month first
              const immPrevMk = cm === 1 ? `${cy-1}-12` : `${cy}-${String(cm-1).padStart(2,"0")}`;
              const immPrevTotal = data.lists.filter((l) => monthKey(l.date) === immPrevMk).reduce((s, l) => s + listTotal(l), 0);

              if (immPrevTotal > 0) {
                prevValue = immPrevTotal;
                prevFound = true;
                prevLabel = "MÊS ANTERIOR";
              } else {
                // Find last month with data before current
                const allMonthsWithData = [...new Set(data.lists.map((l) => monthKey(l.date)))]
                  .filter((mk) => mk < curMk)
                  .sort((a, b) => b.localeCompare(a));
                if (allMonthsWithData.length > 0) {
                  const lastMk = allMonthsWithData[0];
                  prevValue = data.lists.filter((l) => monthKey(l.date) === lastMk).reduce((s, l) => s + listTotal(l), 0);
                  prevFound = true;
                  const [ly, lm] = lastMk.split("-").map(Number);
                  const monthName = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][lm-1];
                  // Show year only if different year, except Dec→Jan (same turn of year)
                  const showYear = ly !== cy && !(lm === 12 && cm === 1);
                  prevLabel = `ÚLTIMA COMPRA${showYear ? ` (${ly})` : ""} — ${monthName}`;
                }
              }

              const diff = (prevValue > 0 && prevFound) ? ((thisMonth - prevValue) / prevValue) * 100 : null;

              return (
                <div style={{ ...card, background: t.bg2, marginBottom: 16, display: "flex", gap: 0 }}>
                  <div style={{ flex: 1, textAlign: "center", borderRight: `1px solid ${t.border}`, paddingRight: 8 }}>
                    <div style={{ fontSize: fs - 5, color: t.text3, letterSpacing: 1 }}>ANO {yearStr}</div>
                    <div style={{ fontSize: fs + 2, color: t.accent, fontWeight: "bold" }}>{fmt(totalYear)}</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", borderRight: `1px solid ${t.border}`, padding: "0 6px" }}>
                    <div style={{ fontSize: fs - 6, color: t.text3, letterSpacing: 0.3, lineHeight: 1.2, marginBottom: 2 }}>{prevLabel}</div>
                    <div style={{ fontSize: fs + 2, color: t.accent, fontWeight: "bold" }}>{prevFound ? fmt(prevValue) : fmt(0)}</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", paddingLeft: 8 }}>
                    <div style={{ fontSize: fs - 5, color: t.text3, letterSpacing: 1 }}>ESTE MÊS</div>
                    <div style={{ fontSize: fs + 2, color: diff === null ? t.accent : diff > 5 ? t.up : diff < -5 ? t.down : t.accent, fontWeight: "bold" }}>{fmt(thisMonth)}</div>
                    {diff !== null && <div style={{ fontSize: fs - 6, color: diff > 0 ? t.up : t.down }}>{diff > 0 ? "▲" : "▼"} {Math.abs(diff).toFixed(1)}%</div>}
                  </div>
                </div>
              );
            })()}

            {/* ── Restock alert (products tab only) ── */}
            {analysisTab === "markets" && settings.restockEnabled !== false && (() => {
              const curMk = monthKey(todayStr());
              const prevMk = (() => { const [y, m] = curMk.split("-").map(Number); return m === 1 ? `${y-1}-12` : `${y}-${String(m-1).padStart(2,"0")}`; })();
              const thisMonthItems = new Set(data.lists.filter((l) => monthKey(l.date) === curMk).flatMap((l) => l.items.map((i) => i.name.toLowerCase())));
              // Regular items: appeared in at least 2 of the last 3 months before this one
              const months3 = [prevMk,
                (() => { const [y, m] = prevMk.split("-").map(Number); return m === 1 ? `${y-1}-12` : `${y}-${String(m-1).padStart(2,"0")}`; })(),
                (() => { const [y, m] = prevMk.split("-").map(Number); const pm = m <= 2 ? 12 + m - 2 : m - 2; const py = m <= 2 ? y - 1 : y; return `${py}-${String(pm).padStart(2,"0")}`; })(),
              ];
              const freq = {};
              months3.forEach((mk) => {
                data.lists.filter((l) => monthKey(l.date) === mk).forEach((l) => {
                  l.items.forEach((i) => { const k = i.name.toLowerCase(); freq[k] = (freq[k] || 0) + 1; });
                });
              });
              const dismissed = settings.dismissedRestock || [];
              const missing = Object.entries(freq)
                .filter(([k, cnt]) => cnt >= 2 && !thisMonthItems.has(k) && !dismissed.includes(k))
                .map(([k]) => capitalize(k));
              if (missing.length === 0) return null;
              return (
                <div style={{ ...card, background: t.accentBg, border: `1px solid ${t.accentBorder}`, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontSize: fs - 4, color: t.accent, letterSpacing: 1 }}>🛒 VOCÊ PODE ESTAR PRECISANDO DE</div>
                    <button
                      onClick={() => setSettings((s) => ({ ...s, restockEnabled: false }))}
                      style={{ background: "none", border: "none", color: t.text4, fontSize: fs - 4, cursor: "pointer", fontFamily: "inherit" }}
                    >desativar</button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {missing.slice(0, 8).map((name) => (
                      <div key={name} style={{ display: "flex", alignItems: "center", background: t.bg2, border: `1px solid ${t.accentBorder}`, borderRadius: 8, overflow: "hidden" }}>
                        <span style={{ color: t.text, padding: "3px 8px", fontSize: fs - 3 }}>{name}</span>
                        <button
                          onClick={() => setSettings((s) => ({ ...s, dismissedRestock: [...(s.dismissedRestock || []), name.toLowerCase()] }))}
                          style={{ background: "none", border: "none", borderLeft: `1px solid ${t.accentBorder}`, color: t.text4, padding: "3px 7px", cursor: "pointer", fontSize: fs - 4, lineHeight: 1 }}
                        >✕</button>
                      </div>
                    ))}
                  </div>
                  {dismissed.length > 0 && (
                    <button
                      onClick={() => setSettings((s) => ({ ...s, dismissedRestock: [] }))}
                      style={{ marginTop: 8, background: "none", border: "none", color: t.accent, fontSize: fs - 4, cursor: "pointer", fontFamily: "inherit", padding: 0 }}
                    >↺ Restaurar removidos ({dismissed.length})</button>
                  )}
                </div>
              );
            })()}

            {/* -- ANNUAL ------------------------------------------- */}
            {analysisTab === "annual" && (
              <div>
                <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
                  {[["hbars", "↔ Horizontal"], ["numbers", "🔢 Números"]].map(([k, l]) => (
                    <button key={k} onClick={() => setChartMode(k)} style={tabBtn(chartMode === k)}>{l}</button>
                  ))}
                </div>

                {annualYears.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: t.text4, fontSize: fs }}>Sem dados ainda</div>
                ) : annualYears.map((yr) => {
                  const activeMonths = yr.months.filter((m) => m.value > 0);
                  const bestMonth = activeMonths.length > 0 ? activeMonths.reduce((a, b) => a.value > b.value ? a : b) : null;
                  const cheapestMonth = activeMonths.length > 0 ? activeMonths.reduce((a, b) => a.value < b.value ? a : b) : null;
                  return (
                  <div key={yr.year} style={card}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ fontSize: fs + 2, color: t.text2, fontWeight: "bold" }}>{yr.year}</div>
                      <div style={{ color: t.accent, fontWeight: "bold", fontSize: fs + 2 }}>{fmt(yr.total)}</div>
                    </div>

                    {/* Best / cheapest month highlight */}
                    {activeMonths.length >= 2 && (
                      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                        <div style={{ flex: 1, background: t.upBg, borderRadius: 8, padding: "6px 10px" }}>
                          <div style={{ fontSize: fs - 6, color: t.up, letterSpacing: 0.5 }}>MÊS MAIS CARO</div>
                          <div style={{ fontSize: fs - 2, fontWeight: "bold", color: t.up }}>{bestMonth?.label}</div>
                          <div style={{ fontSize: fs - 4, color: t.up }}>{fmt(bestMonth?.value)}</div>
                        </div>
                        <div style={{ flex: 1, background: t.downBg, borderRadius: 8, padding: "6px 10px" }}>
                          <div style={{ fontSize: fs - 6, color: t.down, letterSpacing: 0.5 }}>MÊS MAIS BARATO</div>
                          <div style={{ fontSize: fs - 2, fontWeight: "bold", color: t.down }}>{cheapestMonth?.label}</div>
                          <div style={{ fontSize: fs - 4, color: t.down }}>{fmt(cheapestMonth?.value)}</div>
                        </div>
                      </div>
                    )}

                    {chartMode === "hbars" && (
                      <div>
                        <HorizontalBars data={activeMonths} t={t} fs={fs} onBarClick={(m) => { setAnalysisTab("monthly"); setAnalysisMonth(m.key); }} />
                        <div style={{ fontSize: fs - 5, color: t.text4, textAlign: "center", marginTop: 6 }}>Toque numa barra para ver o mês</div>
                      </div>
                    )}
                    {chartMode === "numbers" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {yr.months.map((m) => (
                          <div
                            key={m.key}
                            onClick={() => { if (m.value > 0) { setAnalysisTab("monthly"); setAnalysisMonth(m.key); } }}
                            style={{ background: m.value > 0 ? t.bg3 : t.bg2, borderRadius: 8, padding: "8px 10px", opacity: m.value > 0 ? 1 : 0.35, cursor: m.value > 0 ? "pointer" : "default", border: `1px solid ${m.key === bestMonth?.key ? t.up : m.key === cheapestMonth?.key ? t.down : "transparent"}` }}
                          >
                            <div style={{ fontSize: fs - 4, color: t.text3 }}>{m.label}</div>
                            <div style={{ fontSize: fs - 1, color: m.value > 0 ? t.accent : t.text4, fontWeight: "bold", marginTop: 2 }}>
                              {m.value > 0 ? fmt(m.value) : "--"}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            )}

            {/* -- MONTHLY ------------------------------------------ */}
            {analysisTab === "monthly" && (
              <div>
                {/* Month navigator */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <button
                    onClick={() => { const idx = allMonthKeys.indexOf(safeMonth); if (idx > 0) setAnalysisMonth(allMonthKeys[idx - 1]); }}
                    disabled={allMonthKeys.indexOf(safeMonth) <= 0}
                    style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text2, borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: fs + 2, opacity: allMonthKeys.indexOf(safeMonth) <= 0 ? 0.3 : 1 }}
                  >‹</button>
                  <div style={{ flex: 1, textAlign: "center", fontSize: fs + 1, color: t.text, fontWeight: "bold" }}>
                    {monthLabelFull(safeMonth)}
                  </div>
                  <button
                    onClick={() => { const idx = allMonthKeys.indexOf(safeMonth); if (idx < allMonthKeys.length - 1) setAnalysisMonth(allMonthKeys[idx + 1]); }}
                    disabled={allMonthKeys.indexOf(safeMonth) >= allMonthKeys.length - 1}
                    style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text2, borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: fs + 2, opacity: allMonthKeys.indexOf(safeMonth) >= allMonthKeys.length - 1 ? 0.3 : 1 }}
                  >›</button>
                </div>

                {/* View toggle */}
                <div style={{ display: "flex", gap: 7, marginBottom: 16 }}>
                  {[["chart", "📊 Gráfico"], ["numbers", "🔢 Números"]].map(([k, l]) => (
                    <button key={k} onClick={() => setChartMode(k)} style={tabBtn(chartMode === k)}>{l}</button>
                  ))}
                </div>

                {selectedMonthLists.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: t.text4, fontSize: fs }}>
                    Sem listas neste mês
                  </div>
                ) : (
                  <>
                    {/* Summary card */}
                    <div style={{ ...card, background: t.accentBg, border: `1px solid ${t.accentBorder}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontSize: fs - 4, color: t.accent, letterSpacing: 2 }}>TOTAL DO MÊS</div>
                          <div style={{ fontSize: fs + 10, color: t.accent, fontWeight: "bold", lineHeight: 1.1 }}>
                            {fmt(selectedMonthLists.reduce((s, l) => s + listTotal(l), 0))}
                          </div>
                          <div style={{ fontSize: fs - 3, color: t.text3, marginTop: 4 }}>
                            {selectedMonthLists.length} lista{selectedMonthLists.length !== 1 ? "s" : ""}
                            {" · "}ticket médio {fmt(selectedMonthLists.reduce((s, l) => s + listTotal(l), 0) / selectedMonthLists.length)}
                          </div>
                        </div>
                        {prevMonthLists.length > 0 && (() => {
                          const cur = selectedMonthLists.reduce((s, l) => s + listTotal(l), 0);
                          const prev = prevMonthLists.reduce((s, l) => s + listTotal(l), 0);
                          const diff = (prev > 0 && isFinite(prev)) ? ((cur - prev) / prev) * 100 : 0;
                          return (
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: fs - 4, color: t.text3 }}>vs {monthLabel(prevMonthKey)}</div>
                              <div style={{ fontSize: fs + 3, color: diff > 0 ? t.up : t.down, fontWeight: "bold" }}>
                                {diff > 0 ? "↑" : "↓"} {Math.abs(diff).toFixed(1)}%
                              </div>
                              <div style={{ fontSize: fs - 4, color: t.text3 }}>{fmt(prev)}</div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Market breakdown for the month */}
                      {(() => {
                        const mktMap = {};
                        selectedMonthLists.forEach((l) => {
                          if (!mktMap[l.market]) mktMap[l.market] = 0;
                          mktMap[l.market] += listTotal(l);
                        });
                        const mkts = Object.entries(mktMap).sort((a, b) => b[1] - a[1]);
                        if (mkts.length <= 1) return null;
                        return (
                          <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${t.accentBorder}` }}>
                            <div style={{ fontSize: fs - 5, color: t.accent, letterSpacing: 1, marginBottom: 6 }}>GASTO POR MERCADO</div>
                            {mkts.map(([mkt, total]) => (
                              <div key={mkt} style={{ display: "flex", justifyContent: "space-between", fontSize: fs - 3, marginBottom: 3 }}>
                                <span style={{ color: t.text2 }}>{mkt}</span>
                                <span style={{ color: t.accent, fontWeight: "bold" }}>{fmt(total)}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Lists — chart or numbers mode */}
                    {chartMode === "chart" ? (
                      <div style={card}>
                        <div style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3, marginBottom: 14 }}>LISTAS DO MÊS</div>
                        <HorizontalBars
                          data={selectedMonthLists.map((l) => ({ label: l.name.slice(0, 10), value: listTotal(l) }))}
                          t={t} fs={fs}
                        />
                      </div>
                    ) : (
                      selectedMonthLists.map((l) => (
                        <div
                          key={l.id}
                          style={{ ...card, cursor: "pointer" }}
                          onClick={() => { setActiveListId(l.id); setView("list-detail"); }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                              <div style={{ fontSize: fs, fontWeight: "bold" }}>{l.name}</div>
                              <div style={{ fontSize: fs - 3, color: t.text3 }}>
                                {l.market} · {new Date(l.date + "T12:00").toLocaleDateString("pt-BR")}
                              </div>
                              <div style={{ fontSize: fs - 3, color: t.text3, marginTop: 2 }}>{l.items.length} itens</div>
                            </div>
                            <div style={{ color: t.accent, fontWeight: "bold", fontSize: fs + 2, flexShrink: 0, marginLeft: 10 }}>
                              {fmt(listTotal(l))}
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Items above historical average */}
                    {(() => {
                      const aboveAvg = selectedMonthLists.flatMap((l) =>
                        l.items.filter((item) => {
                          const key = item.name.toLowerCase();
                          const hist = data.priceHistory[key] || [];
                          const valid = hist.filter((h) => validPriceEntry(h, key, data.lists));
                          if (valid.length < 2) return false;
                          const avg = valid.reduce((s, h) => s + h.price, 0) / valid.length;
                          return avg > 0 && item.price > avg * 1.10; // 10% acima da média
                        }).map((item) => {
                          const key = item.name.toLowerCase();
                          const hist = data.priceHistory[key] || [];
                          const valid = hist.filter((h) => validPriceEntry(h, key, data.lists));
                          const avg = valid.reduce((s, h) => s + h.price, 0) / valid.length;
                          return { name: item.name, price: item.price, avg, pct: avg > 0 ? ((item.price - avg) / avg) * 100 : 0 };
                        })
                      );
                      const unique = Object.values(aboveAvg.reduce((acc, i) => { if (!acc[i.name] || i.pct > acc[i.name].pct) acc[i.name] = i; return acc; }, {}));
                      if (unique.length === 0) return null;
                      return (
                        <div style={{ ...card, border: `1px solid ${t.upBg}` }}>
                          <div style={{ fontSize: fs - 4, letterSpacing: 2, color: t.up, marginBottom: 10 }}>⚠️ ACIMA DA MÉDIA HISTÓRICA</div>
                          {unique.sort((a, b) => b.pct - a.pct).map((item) => (
                            <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${t.bg3}` }}>
                              <div>
                                <div style={{ fontSize: fs - 2, fontWeight: "bold" }}>{item.name}</div>
                                <div style={{ fontSize: fs - 4, color: t.text3 }}>Média: {fmt(item.avg)}</div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: fs - 2, color: t.up, fontWeight: "bold" }}>{fmt(item.price)}</div>
                                <div style={{ fontSize: fs - 4, color: t.up }}>▲ {item.pct.toFixed(1)}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Product price comparison vs prev month */}
                    {productComparison.length > 0 && (
                      <div style={card}>
                        <div style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3, marginBottom: 14 }}>
                          COMPARAÇÃO COM {monthLabel(prevMonthKey).toUpperCase()}
                        </div>
                        {productComparison.slice(0, 12).map((p) => (
                          <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${t.bg3}` }}>
                            <div style={{ fontSize: fs - 2, flex: 1 }}>{p.name}</div>
                            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                              <div style={{ fontSize: fs - 3, color: t.text3 }}>{fmt(p.prev)} → {fmt(p.cur)}</div>
                              <div style={{ fontSize: fs - 3, color: p.diff > 0 ? t.up : t.down, fontWeight: "bold", minWidth: 48, textAlign: "right" }}>
                                {p.diff > 0 ? "▲" : "▼"} {Math.abs(p.diff).toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* -- MARKETS ------------------------------------------ */}
            {analysisTab === "markets" && (() => {
              // ── Build product data from existing lists only ──
              const now = new Date();
              const cutoff = { "1m": 1, "3m": 3, "6m": 6, "all": null }[prodPeriod];
              const cutoffDate = cutoff
                ? new Date(now.getFullYear(), now.getMonth() - cutoff, 1).toISOString().slice(0, 10)
                : null;

              // Gather all valid entries per item from existing lists
              const productMap = {};
              Object.entries(data.priceHistory).forEach(([itemName, entries]) => {
                const validEntries = entries.filter((h) => {
                  if (!validPriceEntry(h, itemName, data.lists)) return false;
                  if (h.date < priceHistoryCutoff) return false;
                  if (cutoffDate && h.date < cutoffDate) return false;
                  if (prodMarket !== "all" && h.market !== prodMarket) return false;
                  return true;
                });
                if (validEntries.length === 0) return;
                const sorted = [...validEntries].sort((a, b) => b.date.localeCompare(a.date));
                const prices = sorted.map((e) => e.price);
                const avg = prices.reduce((s, p) => s + p, 0) / prices.length;
                const lastPrice = prices[0];
                const prevPrice = prices[1] ?? null;
                const variation = (prevPrice > 0 && lastPrice > 0) ? ((lastPrice - prevPrice) / prevPrice) * 100 : null;
                // cheapest market
                const byMarket = {};
                validEntries.forEach((e) => {
                  if (!byMarket[e.market] || e.price < byMarket[e.market]) byMarket[e.market] = e.price;
                });
                const cheapestMarket = Object.entries(byMarket).sort((a, b) => a[1] - b[1])[0];
                productMap[itemName] = { name: capitalize(itemName), recurrence: validEntries.length, avg, lastPrice, variation, cheapestMarket: cheapestMarket?.[0], cheapestPrice: cheapestMarket?.[1], history: sorted };
              });

              // Filter by search
              let products = Object.values(productMap).filter((p) =>
                !prodSearch || p.name.toLowerCase().includes(prodSearch.toLowerCase())
              );

              // Sort
              products.sort((a, b) => {
                if (prodSort === "name") return a.name.localeCompare(b.name);
                if (prodSort === "avg") return a.avg - b.avg;
                if (prodSort === "recurrence") return b.recurrence - a.recurrence;
                if (prodSort === "variation") return (Math.abs(b.variation ?? 0)) - (Math.abs(a.variation ?? 0));
                if (prodSort === "total") return (b.avg * b.recurrence) - (a.avg * a.recurrence);
                if (prodSort === "histVariation") {
                  const range = (p) => {
                    const prices = p.history.map((e) => e.price);
                    return prices.length < 2 ? 0 : ((Math.max(...prices) - Math.min(...prices)) / Math.min(...prices)) * 100;
                  };
                  return range(b) - range(a);
                }
                return 0;
              });

              const allMarkets = [...new Set(data.lists.map((l) => l.market))].sort();

              return (
                <div>
                  {/* ── Filters ── */}
                  <div style={{ background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
                    {/* Search */}
                    <div style={{ position: "relative", marginBottom: 10 }}>
                      <input
                        value={prodSearch}
                        onChange={(e) => setProdSearch(e.target.value)}
                        placeholder="🔍 Buscar produto..."
                        style={{ ...inp, marginTop: 0, marginBottom: 0, paddingRight: prodSearch ? 34 : undefined }}
                      />
                      {prodSearch ? (
                        <button
                          onClick={() => setProdSearch("")}
                          style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: t.text3, fontSize: fs, cursor: "pointer", lineHeight: 1, padding: "2px 4px" }}
                        >✕</button>
                      ) : null}
                    </div>

                    {/* 3-column custom dropdown grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {[
                        {
                          key: "period",
                          label: "Período",
                          value: prodPeriod,
                          current: { "all":"Tudo", "6m":"6 meses", "3m":"3 meses", "1m":"1 mês" }[prodPeriod],
                          options: [["all","Tudo"], ["6m","6 meses"], ["3m","3 meses"], ["1m","1 mês"]],
                          onSelect: setProdPeriod,
                        },
                        {
                          key: "market",
                          label: "Mercado",
                          value: prodMarket,
                          current: prodMarket === "all" ? "Todos" : prodMarket,
                          options: [["all","Todos"], ...allMarkets.map((m) => [m, m])],
                          onSelect: setProdMarket,
                        },
                        {
                          key: "sort",
                          label: "Ordenar",
                          value: prodSort,
                          current: { recurrence:"Recorrência", name:"Nome", avg:"Preço médio", variation:"Variação", total:"Gasto total", histVariation:"Variação hist." }[prodSort],
                          options: [["recurrence","Mais comprados"], ["name","Nome"], ["avg","Preço médio"], ["variation","Variação"], ["total","Maior gasto"], ["histVariation","Maior variação"]],
                          onSelect: setProdSort,
                        },
                      ].map(({ key, label, value, current, options, onSelect }) => (
                        <div key={key} style={{ position: "relative" }}>
                          <div style={{ fontSize: fs - 6, color: t.text3, letterSpacing: 0.5, marginBottom: 4, textAlign: "center" }}>{label.toUpperCase()}</div>
                          <button
                            onClick={() => setProdFilterOpen(prodFilterOpen === key ? null : key)}
                            style={{ width: "100%", padding: "7px 6px", background: prodFilterOpen === key ? t.accentBg : t.bg3, border: `1px solid ${prodFilterOpen === key ? t.accent : t.border}`, borderRadius: 8, color: prodFilterOpen === key ? t.accent : t.text, fontSize: fs - 4, fontFamily: "inherit", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}
                          >
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>{current}</span>
                            <span style={{ fontSize: fs - 6, flexShrink: 0 }}>{prodFilterOpen === key ? "▴" : "▾"}</span>
                          </button>
                          {prodFilterOpen === key && (
                            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 200, background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 10, overflow: "hidden", boxShadow: `0 8px 24px ${t.shadow}`, marginTop: 3 }}>
                              {options.map(([k, l]) => (
                                <div
                                  key={k}
                                  onClick={() => { onSelect(k); setProdFilterOpen(null); }}
                                  style={{ padding: "10px 12px", fontSize: fs - 3, color: value === k ? t.accent : t.text, background: value === k ? t.accentBg : "transparent", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${t.bg3}` }}
                                >
                                  {l}
                                  {value === k && <span style={{ color: t.accent }}>✓</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Close dropdowns when tapping outside */}
                  {prodFilterOpen && (
                    <div onClick={() => setProdFilterOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />
                  )}

                  {/* ── Table header ── */}
                  {products.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: t.text4, fontSize: fs }}>
                      {prodSearch ? "Nenhum produto encontrado" : "Sem dados ainda"}
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 44px 80px 70px", gap: 4, padding: "6px 12px", background: t.bg3, borderRadius: "10px 10px 0 0", border: `1px solid ${t.border}`, borderBottom: "none" }}>
                        {[["PRODUTO","left"], ["Nº","center"], ["MÉDIA","right"], ["VARIAÇÃO","right"]].map(([h, align]) => (
                          <div key={h} style={{ fontSize: fs - 6, color: t.text3, fontWeight: "bold", letterSpacing: 0.5, textAlign: align }}>{h}</div>
                        ))}
                      </div>

                      {/* ── Rows ── */}
                      <div style={{ border: `1px solid ${t.border}`, borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                        {products.map((p, idx) => {
                          const isExpanded = prodExpanded === p.name;
                          const varColor = p.variation === null ? t.text4 : p.variation > 0 ? t.up : p.variation < 0 ? t.down : t.text3;
                          const varText = p.variation === null ? "—" : `${p.variation > 0 ? "▲" : "▼"} ${Math.abs(p.variation).toFixed(1)}%`;

                          // Mini sparkline — last 6 prices
                          const spark = p.history.slice(0, 6).map((e) => e.price).reverse();
                          const sparkMin = Math.min(...spark);
                          const sparkMax = Math.max(...spark);
                          const sparkRange = sparkMax - sparkMin || 1;

                          return (
                            <div key={p.name} style={{ borderTop: idx > 0 ? `1px solid ${t.bg3}` : "none" }}>
                              {/* Main row */}
                              <div
                                onClick={() => setProdExpanded(isExpanded ? null : p.name)}
                                style={{ display: "grid", gridTemplateColumns: "1fr 44px 80px 70px", gap: 4, padding: "10px 12px", cursor: "pointer", background: isExpanded ? t.accentBg : "transparent", alignItems: "center" }}
                              >
                                <div>
                                  <div style={{ fontSize: fs - 2, fontWeight: "bold", color: isExpanded ? t.accent : t.text }}>
                                    {p.name}
                                  </div>
                                  <div style={{ fontSize: fs - 5, color: t.text3, marginTop: 1, display: "flex", alignItems: "center", gap: 4 }}>
                                    último: {fmt(p.lastPrice)}
                                    {p.lastPrice > p.avg * 1.1 && (
                                      <span style={{ color: t.up }}>⚠️</span>
                                    )}
                                  </div>
                                </div>
                                <div style={{ fontSize: fs - 2, color: t.text2, textAlign: "center" }}>
                                  <div style={{ fontWeight: "bold" }}>{p.recurrence}x</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <div style={{ fontSize: fs - 2, color: t.accent, fontWeight: "bold" }}>{fmt(p.avg)}</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <div style={{ fontSize: fs - 3, color: varColor, fontWeight: "bold" }}>{varText}</div>
                                </div>
                              </div>

                              {/* Expanded detail */}
                              {isExpanded && (
                                <div style={{ background: t.bg2, borderTop: `1px solid ${t.border}`, padding: "12px 14px" }}>
                                  {/* Sparkline */}
                                  {spark.length > 1 && (
                                    <div style={{ marginBottom: 12 }}>
                                      <div style={{ fontSize: fs - 5, color: t.text3, letterSpacing: 0.5, marginBottom: 6 }}>HISTÓRICO DE PREÇO</div>
                                      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
                                        {spark.map((price, i) => {
                                          const h = Math.max(6, ((price - sparkMin) / sparkRange) * 40 + 6);
                                          const isLast = i === spark.length - 1;
                                          return (
                                            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                              <div style={{ fontSize: fs - 7, color: isLast ? t.accent : t.text4 }}>
                                                {fmt(price).replace("R$\u00a0", "")}
                                              </div>
                                              <div style={{ width: "100%", height: h, background: isLast ? t.accent : t.bg4, borderRadius: 3 }} />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Stats grid */}
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
                                    {[
                                      ["Mínimo", fmt(Math.min(...p.history.map((e) => e.price))), t.down],
                                      ["Média", fmt(p.avg), t.accent],
                                      ["Máximo", fmt(Math.max(...p.history.map((e) => e.price))), t.up],
                                    ].map(([label, val, color]) => (
                                      <div key={label} style={{ background: t.bg3, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                                        <div style={{ fontSize: fs - 6, color: t.text3, marginBottom: 3 }}>{label.toUpperCase()}</div>
                                        <div style={{ fontSize: fs - 3, fontWeight: "bold", color }}>{val}</div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Cheapest market */}
                                  {p.cheapestMarket && (
                                    <div style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                      <div style={{ fontSize: fs - 3, color: t.text2 }}>🏪 Mais barato em <span style={{ fontWeight: "bold", color: t.accent }}>{p.cheapestMarket}</span></div>
                                      <div style={{ fontSize: fs - 2, fontWeight: "bold", color: t.accent }}>{fmt(p.cheapestPrice)}</div>
                                    </div>
                                  )}

                                  {/* Last purchases */}
                                  <div style={{ marginTop: 10 }}>
                                    <div style={{ fontSize: fs - 5, color: t.text3, letterSpacing: 0.5, marginBottom: 6 }}>ÚLTIMAS COMPRAS</div>
                                    {p.history.slice(0, 5).map((e, i) => (
                                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: i < Math.min(4, p.history.length - 1) ? `1px solid ${t.bg3}` : "none" }}>
                                        <div style={{ fontSize: fs - 4, color: t.text3 }}>
                                          {new Date(e.date + "T12:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })} · {e.market}
                                        </div>
                                        <div style={{ fontSize: fs - 3, fontWeight: "bold", color: t.text }}>{fmt(e.price)}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ textAlign: "center", padding: "10px 0", fontSize: fs - 4, color: t.text4 }}>
                        {products.length} produto{products.length !== 1 ? "s" : ""}
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

          </div>
        </div>
      )}

      {/* ======================================================================
          S E T T I N G S
      ====================================================================== */}
      {view === "settings" && (() => {
        // Accordion helper
        const toggle = (key) => setSettingsOpen((o) => o === key ? null : key);
        const isOpen = (key) => settingsOpen === key;

        const AccordionHeader = ({ skey, icon, title, subtitle }) => (
          <div
            onClick={() => toggle(skey)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "15px 16px", cursor: "pointer",
              borderBottom: isOpen(skey) ? `1px solid ${t.border}` : "none",
            }}
          >
            <span style={{ fontSize: fs + 2 }}>{icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: fs - 1, fontWeight: "bold", color: t.text }}>{title}</div>
              {subtitle && <div style={{ fontSize: fs - 4, color: t.text3, marginTop: 2 }}>{subtitle}</div>}
            </div>
            <span style={{ color: t.text3, fontSize: fs - 2, transition: "transform 0.2s", display: "inline-block", transform: isOpen(skey) ? "rotate(180deg)" : "none" }}>▾</span>
          </div>
        );

        const acCard = { ...card, padding: 0, overflow: "visible", marginBottom: 10 };
        const body = { padding: "14px 16px 16px" };

        return (
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 40px" }}>
            <h2 style={{ margin: "0 0 20px", fontWeight: "normal", fontSize: fs + 8, paddingLeft: 8 }}>Configurações</h2>


            {/* 2 — APARÊNCIA */}
            <div style={acCard}>
              <AccordionHeader skey="theme" icon="🎨" title="Tema"
                subtitle={`${allPalettes[settings.paletteKey]?.name || "Dourado"} · ${settings.paletteMode === "dark" ? "Escuro" : "Claro"}`}
              />
              {isOpen("theme") && (
                <div style={body}>
                  {/* Paleta */}
                  <div style={{ border: `1px solid ${t.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 4 }}>
                    <div style={{ padding: "12px 12px 14px", background: t.bg2 }}>
                      {/* Light/dark toggle */}
                      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                        {[["dark", "🌙 Escuro"], ["light", "☀️ Claro"]].map(([k, l]) => (
                          <button key={k} onClick={() => setSettings((s) => ({ ...s, paletteMode: k }))}
                            style={{ flex: 1, padding: "8px 4px", fontSize: fs - 3, border: `1px solid ${settings.paletteMode === k ? t.accent : t.border}`, background: settings.paletteMode === k ? t.accentBg : t.bg3, color: settings.paletteMode === k ? t.accent : t.text2, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
                          >{l}</button>
                        ))}
                      </div>
                      {/* Palettes */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {Object.entries(allPalettes).map(([key, pal]) => {
                          const active = settings.paletteKey === key;
                          const isCustom = key.startsWith("custom_");
                          const desc = { dourado: "Clássica e elegante", nord: "Ártico e limpa", gruvbox: "Retrô e quente", rosePine: "Suave e floral", catppuccin: "Pastel techno", meiaNoite: "OLED · preto absoluto", papel: "Tinta sobre papel" };
                          return (
                            <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <button onClick={() => setSettings((s) => ({ ...s, paletteKey: key }))}
                                style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: active ? t.accentBg : t.bg3, border: `1px solid ${active ? t.accent : t.border}`, borderRadius: 10, cursor: "pointer", textAlign: "left" }}
                              >
                                <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                                  {[pal.dark.bg, pal.dark.accent].map((c, i) => <div key={i} style={{ width: 10, height: 26, borderRadius: i === 0 ? "3px 0 0 3px" : 0, background: c }} />)}
                                  <div style={{ width: 1, background: t.border }} />
                                  {[pal.light.bg, pal.light.accent].map((c, i) => <div key={i} style={{ width: 10, height: 26, borderRadius: i === 1 ? "0 3px 3px 0" : 0, background: c }} />)}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: fs - 2, color: active ? t.accent : t.text, fontWeight: active ? "bold" : "normal" }}>
                                    {pal.name}{isCustom && <span style={{ fontSize: fs - 6, color: t.accent, marginLeft: 5, background: t.accentBg, padding: "1px 5px", borderRadius: 4 }}>custom</span>}
                                  </div>
                                  <div style={{ fontSize: fs - 5, color: t.text3 }}>{desc[key] || "Tema importado"}</div>
                                </div>
                                {active && <span style={{ color: t.accent }}>✓</span>}
                              </button>
                              {!isCustom && (
                                <button
                                  onClick={() => {
                                    if (settings.paletteKey === key) setSettings((s) => ({ ...s, paletteKey: "dourado" }));
                                    setSettings((s) => ({ ...s, hiddenPalettes: [...(s.hiddenPalettes || []), key] }));
                                  }}
                                  style={{ background: t.upBg, border: `1px solid ${t.up}33`, color: t.up, borderRadius: 8, padding: "7px 9px", cursor: "pointer", fontSize: fs - 3, flexShrink: 0 }}
                                  title="Ocultar paleta"
                                >✕</button>
                              )}
                              {isCustom && (
                                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                  <button
                                    onClick={() => {
                                      const p = pal.dark;
                                      // Reverse-engineer the 4 key colors from saved palette
                                      setCustomPaletteEditor({
                                        name: pal.name,
                                        darkBg: p.bg,
                                        darkAccent: p.accent,
                                        lightBg: pal.light.bg,
                                        lightAccent: pal.light.accent,
                                        editKey: key,
                                      });
                                    }}
                                    style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, color: t.accent, borderRadius: 8, padding: "7px 9px", cursor: "pointer", fontSize: fs - 3, flexShrink: 0 }}
                                  >✏️</button>
                                  {confirmDeletePaletteKey === key ? (
                                    <>
                                      <button
                                        onClick={() => { removeCustomTheme(key); setConfirmDeletePaletteKey(null); }}
                                        style={{ background: t.upBg, border: `1px solid ${t.up}66`, color: t.up, borderRadius: 8, padding: "7px 9px", cursor: "pointer", fontSize: fs - 3, fontWeight: "bold", flexShrink: 0 }}
                                      >✕ OK</button>
                                      <button
                                        onClick={() => setConfirmDeletePaletteKey(null)}
                                        style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text3, borderRadius: 8, padding: "7px 9px", cursor: "pointer", fontSize: fs - 3, flexShrink: 0 }}
                                      >Não</button>
                                    </>
                                  ) : (
                                    <button
                                      onClick={() => setConfirmDeletePaletteKey(key)}
                                      style={{ background: t.upBg, border: `1px solid ${t.up}33`, color: t.up, borderRadius: 8, padding: "7px 9px", cursor: "pointer", fontSize: fs - 3, flexShrink: 0 }}
                                    >✕</button>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {/* Add custom palette button */}
                        <button
                          onClick={() => setCustomPaletteEditor({ name: "Minha Paleta", darkBg: "#1e1e2e", darkAccent: "#88c0d0", lightBg: "#eceff4", lightAccent: "#5e81ac", editKey: null })}
                          style={{ width: "100%", padding: "10px 12px", background: t.bg3, border: `1px dashed ${t.border}`, borderRadius: 10, color: t.text3, fontSize: fs - 2, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                        >
                          <span>🎨</span> Criar paleta personalizada
                        </button>

                        {/* Restore hidden palettes — compact single row */}
                        {(settings.hiddenPalettes || []).length > 0 && (
                          <div style={{ marginTop: 6 }}>
                            <button
                              onClick={() => setShowRestoreHidden((v) => !v)}
                              style={{ width: "100%", padding: "8px 12px", background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: showRestoreHidden ? "10px 10px 0 0" : 10, color: t.accent, fontSize: fs - 3, cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                            >
                              <span>↺ Restaurar temas ocultos ({(settings.hiddenPalettes || []).length})</span>
                              <span style={{ fontSize: fs - 4, transition: "transform 0.2s", display: "inline-block", transform: showRestoreHidden ? "rotate(180deg)" : "none" }}>▾</span>
                            </button>
                            {showRestoreHidden && (
                              <div style={{ border: `1px solid ${t.accentBorder}`, borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                                {(settings.hiddenPalettes || []).map((k) => (
                                  <button key={k}
                                    onClick={() => { setSettings((s) => ({ ...s, hiddenPalettes: (s.hiddenPalettes || []).filter((h) => h !== k) })); if ((settings.hiddenPalettes || []).length <= 1) setShowRestoreHidden(false); }}
                                    style={{ width: "100%", padding: "9px 12px", background: t.bg2, border: "none", borderBottom: `1px solid ${t.bg3}`, color: t.text2, fontSize: fs - 3, cursor: "pointer", fontFamily: "inherit", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                  >
                                    <span>{PALETTES[k]?.name || k}</span>
                                    <span style={{ color: t.accent, fontSize: fs - 2 }}>↺</span>
                                  </button>
                                ))}
                                <button
                                  onClick={() => { setSettings((s) => ({ ...s, hiddenPalettes: [] })); setShowRestoreHidden(false); }}
                                  style={{ width: "100%", padding: "9px 12px", background: t.accentBg, border: "none", color: t.accent, fontSize: fs - 3, cursor: "pointer", fontFamily: "inherit", fontWeight: "bold", textAlign: "center" }}
                                >↺ Restaurar todos</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* 3 — FONTE */}
            <div style={acCard}>
              <AccordionHeader skey="font" icon="🔢" title="Tamanho da fonte" subtitle={`${fs}px · Toque para ajustar`} />
              {isOpen("font") && (
                <div style={body}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <button onClick={() => setSettings((s) => ({ ...s, fontSize: Math.max(11, (s.fontSize || 15) - 1) }))}
                      style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text, width: 38, height: 38, borderRadius: 8, cursor: "pointer", fontSize: 20, fontFamily: "inherit", flexShrink: 0 }}>-</button>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: fs + 4, color: t.accent, fontWeight: "bold" }}>{fs}px</div>
                      <div style={{ fontSize: fs, color: t.text3, marginTop: 4 }}>Texto de exemplo</div>
                    </div>
                    <button onClick={() => setSettings((s) => ({ ...s, fontSize: Math.min(22, (s.fontSize || 15) + 1) }))}
                      style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text, width: 38, height: 38, borderRadius: 8, cursor: "pointer", fontSize: 20, fontFamily: "inherit", flexShrink: 0 }}>+</button>
                  </div>
                  <input type="range" min={11} max={22} value={fs}
                    onChange={(e) => setSettings((s) => ({ ...s, fontSize: Number(e.target.value) }))}
                    style={{ width: "100%", accentColor: t.accent }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: fs - 5, color: t.text4, marginTop: 4 }}>
                    <span>Menor (11)</span><span>Maior (22)</span>
                  </div>
                </div>
              )}
            </div>

            {/* 1 — NAVEGAÇÃO */}
            <div style={acCard}>
              <AccordionHeader skey="items" icon="📦" title="Itens" subtitle="Campos extras ao adicionar produtos" />
              {isOpen("items") && (
                <div style={body}>
                  <div style={{ fontSize: fs - 4, letterSpacing: 1, color: t.text3, marginBottom: 10, marginTop: 16 }}>CAMPOS DO ITEM</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 10 }}>
                    <div>
                      <div style={{ fontSize: fs - 2, color: t.text }}>Modo detalhado</div>
                      <div style={{ fontSize: fs - 5, color: t.text3, marginTop: 2 }}>Exibe campos de Marca, Peso e Unidade ao adicionar itens</div>
                    </div>
                    <div
                      onClick={() => setSettings((s) => ({ ...s, detailedMode: !s.detailedMode }))}
                      style={{ width: 48, height: 26, borderRadius: 13, cursor: "pointer", flexShrink: 0, marginLeft: 12, background: settings.detailedMode ? t.accent : t.bg4, position: "relative", transition: "background 0.2s" }}
                    >
                      <div style={{ position: "absolute", top: 3, left: settings.detailedMode ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div style={acCard}>
              <AccordionHeader skey="nav" icon="👆" title="Navegação"
                subtitle="Escolher personalização"
              />
              {isOpen("nav") && (
                <div style={body}>
                  <div style={{ fontSize: fs - 4, letterSpacing: 1, color: t.text3, marginBottom: 10, marginTop: 16 }}>ALERTA DE REPOSIÇÃO</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 10 }}>
                    <div>
                      <div style={{ fontSize: fs - 2, color: t.text }}>Sugestão de itens frequentes</div>
                      <div style={{ fontSize: fs - 5, color: t.text3, marginTop: 2 }}>Sugere itens comprados regularmente que ainda não estão no mês atual</div>
                    </div>
                    <div
                      onClick={() => setSettings((s) => ({ ...s, restockEnabled: s.restockEnabled === false ? true : false }))}
                      style={{ width: 48, height: 26, borderRadius: 13, cursor: "pointer", flexShrink: 0, marginLeft: 12, background: settings.restockEnabled !== false ? t.accent : t.bg4, position: "relative", transition: "background 0.2s" }}
                    >
                      <div style={{ position: "absolute", top: 3, left: settings.restockEnabled !== false ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
                    </div>
                  </div>


                  {/* Haptic feedback toggle */}
                  <div style={{ fontSize: fs - 4, letterSpacing: 1, color: t.text3, marginBottom: 10, marginTop: 16 }}>TOQUE TÁTIL</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 10 }}>
                    <div>
                      <div style={{ fontSize: fs - 2, color: t.text }}>Vibração ao marcar item</div>
                      <div style={{ fontSize: fs - 5, color: t.text3, marginTop: 2 }}>Pulso tátil ao marcar/desmarcar um produto</div>
                    </div>
                    <div
                      onClick={() => setSettings((s) => ({ ...s, hapticEnabled: !s.hapticEnabled }))}
                      style={{ width: 48, height: 26, borderRadius: 13, cursor: "pointer", flexShrink: 0, background: settings.hapticEnabled !== false ? t.accent : t.bg4, position: "relative", transition: "background 0.2s" }}
                    >
                      <div style={{ position: "absolute", top: 3, left: settings.hapticEnabled !== false ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
                    </div>
                  </div>

                  {/* Restock alert toggle */}
                  <div style={{ fontSize: fs - 4, letterSpacing: 1, color: t.text3, marginBottom: 10, marginTop: 16 }}>POSIÇÃO DA BARRA DE NAVEGAÇÃO</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { key: "top",    label: "⬆️ Acima",  desc: "Topo da tela" },
                      { key: "bottom", label: "⬇️ Abaixo", desc: "Base da tela" },
                    ].map(({ key, label, desc }) => {
                      const active = (settings.tabPosition || "bottom") === key;
                      return (
                        <button key={key}
                          onClick={() => setSettings((s) => ({ ...s, tabPosition: key }))}
                          style={{ flex: 1, padding: "10px 8px", background: active ? t.accentBg : t.bg3, border: `1px solid ${active ? t.accent : t.border}`, borderRadius: 10, cursor: "pointer", textAlign: "center" }}
                        >
                          <div style={{ fontSize: fs, marginBottom: 2, color: active ? t.accent : t.text }}>{label}</div>
                          <div style={{ fontSize: fs - 5, color: active ? t.accent : t.text3 }}>{desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  
                  {/* Price history period */}
                  <div style={{ fontSize: fs - 4, letterSpacing: 1, color: t.text3, marginBottom: 10, marginTop: 16 }}>HISTÓRICO DE PREÇOS</div>
                  <div style={{ padding: "12px", background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 10, marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: fs - 2, color: t.text }}>Período considerado</div>
                        <div style={{ fontSize: fs - 5, color: t.text3, marginTop: 2 }}>Compras mais antigas são ignoradas nas comparações</div>
                      </div>
                      <div style={{ fontSize: fs + 2, color: t.accent, fontWeight: "bold", minWidth: 52, textAlign: "right" }}>
                        {settings.priceHistoryMonths || 6} {(settings.priceHistoryMonths || 6) === 1 ? "mês" : "meses"}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: fs - 4, color: t.text3 }}>1</span>
                      <input
                        type="range" min={1} max={12}
                        value={settings.priceHistoryMonths || 6}
                        onChange={(e) => setSettings((s) => ({ ...s, priceHistoryMonths: Number(e.target.value) }))}
                        style={{ flex: 1, accentColor: t.accent }}
                      />
                      <span style={{ fontSize: fs - 4, color: t.text3 }}>12</span>
                    </div>
                  </div>

                  <div style={{ fontSize: fs - 4, letterSpacing: 1, color: t.text3, marginBottom: 10, marginTop: 16 }}>BOTÃO VOLTAR (na tela inicial)</div>
                  {[
                    { key: "confirm",  label: "Perguntar antes de sair", desc: "Exibe confirmação antes de fechar o app" },
                    { key: "minimize", label: "Minimizar o app",          desc: "Vai para segundo plano sem perguntar" },
                    { key: "nothing",  label: "Fazer nada",           desc: "Botão voltar sem efeito na tela inicial" },
                  ].map(({ key, label, desc }) => {
                    const active = (settings.backBehavior || "confirm") === key;
                    return (
                      <button key={key}
                        onClick={() => setSettings((s) => ({ ...s, backBehavior: key }))}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", marginBottom: 8, background: active ? t.accentBg : t.bg3, border: `1px solid ${active ? t.accent : t.border}`, borderRadius: 10, cursor: "pointer", textAlign: "left" }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: fs - 2, color: active ? t.accent : t.text, fontWeight: active ? "bold" : "normal" }}>{label}</div>
                          <div style={{ fontSize: fs - 5, color: t.text3, marginTop: 2 }}>{desc}</div>
                        </div>
                        {active && <span style={{ color: t.accent }}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>


            <div style={acCard}>
              <AccordionHeader skey="data" icon="💾" title="Dados" subtitle="Exportar, importar ou apagar" />
              {isOpen("data") && (
                <div style={body}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button onClick={exportData} style={primaryBtn}>💾 SALVAR CONFIGURAÇÕES</button>
                    <button
                      onClick={() => setBackupManager({ backups: getBackupIndex() })}
                      style={{ padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", fontWeight: "bold", letterSpacing: 1, cursor: "pointer" }}>
                      📂 ESCOLHER CONFIGURAÇÃO PARA RESTAURAR
                    </button>

                    <div style={{ height: 1, background: t.border }} />

                    {/* Share full backup (for transfer between devices) */}
                    <button
                      onClick={shareExport}
                      style={{ padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                      📤 EXPORTAR TUDO
                    </button>

                    {/* Import from file */}
                    <button
                      onClick={() => {
                        if (window.AndroidBridge?.pickFile) {
                          // Set up callback for when file is picked
                          window.__onFilePicked = (content) => {
                            try {
                              const parsed = JSON.parse(content);
                              if (!parsed.lists || !Array.isArray(parsed.lists)) { showToast("Arquivo inválido — sem listas."); return; }
                              setImportConfirm({ parsed, filename: "Arquivo selecionado" });
                            } catch {
                              showToast("Erro ao ler o arquivo. Verifique se é um backup válido.");
                            }
                          };
                          window.AndroidBridge.pickFile();
                        } else {
                          showToast("Seletor de arquivos não disponível nesta versão.");
                        }
                      }}
                      style={{ padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                      📥 IMPORTAR CONFIGURAÇÕES
                    </button>

                    <div style={{ height: 1, background: t.border }} />

                    {/* History cleanup */}
                    <button
                      onClick={() => setConfirmModal({
                        title: "🧹 Limpar histórico de preços?",
                        message: "Remove do banco interno os itens que não existem em nenhuma lista atual — dados de listas deletadas e preços antigos corrigidos. Os itens das suas listas atuais não são afetados.",
                        onConfirm: () => {
                          const validKeys = new Set(
                            data.lists.flatMap((l) => l.items.map((i) => i.name.toLowerCase()))
                          );
                          const cleaned = Object.fromEntries(
                            Object.entries(data.priceHistory).filter(([k]) => validKeys.has(k))
                          );
                          const removed = Object.keys(data.priceHistory).length - Object.keys(cleaned).length;
                          setData((d) => ({ ...d, priceHistory: cleaned }));
                          showToast(removed > 0 ? `${removed} item(s) removido(s) do histórico` : "Histórico já está limpo");
                        },
                      })}
                      style={{ padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                      🧹 LIMPAR HISTÓRICO DE PREÇOS
                    </button>

                    <div style={{ height: 1, background: t.border, margin: "4px 0" }} />

                    <button
                      onClick={() => setConfirmModal({
                        title: "⚠️ Apagar tudo?",
                        message: "Isso apagará TODAS as listas e o histórico de preços permanentemente. Esta ação não pode ser desfeita.",
                        onConfirm: () => { setData({ lists: [], priceHistory: {} }); showToast("Todos os dados apagados."); },
                      })}
                      style={{ padding: "11px", background: t.upBg, color: t.up, border: `1px solid ${t.up}33`, borderRadius: 10, fontSize: fs - 2, fontFamily: "inherit", cursor: "pointer", width: "100%" }}
                    >
                      🗑 Apagar todos os dados
                    </button>
                  </div>

                  </div>
              )}
            </div>

            {/* Sobre o Aplicativo link */}
            <button
              onClick={() => setView("about")}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text2, fontSize: fs - 1, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}
            >
              <span style={{ fontSize: fs + 2 }}>ℹ️</span>
              <span>Sobre o Aplicativo</span>
              <span style={{ marginLeft: "auto", color: t.text4 }}>›</span>
            </button>

          </div>
        );
      })()}

      {/* ── ABOUT VIEW ── */}
      {view === "about" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <button
              onClick={() => setView("settings")}
              style={{ background: "none", border: "none", color: t.accent, fontSize: fs, cursor: "pointer", padding: "4px 6px", fontFamily: "inherit" }}
            >← Voltar</button>
          </div>

          {/* App icon + name */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAB0/klEQVR42u39aaxtSXbfif1WxN7nnDu+ecjMly9fzlWVY2VlZRVrYFWRIosiRUpNSS1QVJNqtwG3/MFotA0b8AcDtmG04S+G/EFuwI2GBVmtbjctSCbFoooUi6xRNeY8z8Obp/vueM7ZO2L5Q0TsHfsM970ibd9q3neIy3p5hzPsHbFirf/6r/9ffu9P/1Pl9uP2Y58+zO1LcPtxewPcftx+3N4Atx+3H7c3wO3H7cftDXD7cftxewPcftx+3N4Atx+3H7c3wO3H7cftDXD7cftxewPcftx+/BV7FLcvwf/vH5L9//ah3Oag3N4Af4GHxsWk2aLSbKnN+n73L+f9vLtk9aZLOn9GnVziChhBUbx6VD2qGv9aQAzGmPBfqs0TaPb55Ba2FVOvrnM+g/wlr/etfv/2Brila2oKg7EWVe3cKgEQyW6baRaFQTAY0PAdY4S4pprnQYTmm/nzSLYQ4t+nb6rO2CLxacKvCKoaXkPCojZo+Jm2sdxLeA8igpcaM3b0nWHRDhjYAcYWGApqXzGsdxhWY5xWDPsGXxTYCkQsKhI/i4nP311roqDqQeJ7iNdERPCqE1tDs8/mETGopmug2aYM/98bH/6iuRQm/syjKqia5loqinoXPrPSPJfGaxS2ujT3x7cXurmeqkpZyP47AUQEY0xz0Yx0I7iqIibcrFSoWLFYb1CTRUnTXuDwp+12EqS9jxJek7h4VKQpgbxqs9BB48KX9qkk3VwJCw8w4uLWlGZxObFQCHZ7xErV58ih05w8dD/Lg2NYswTiw/tzQ3S0zs54g7UbH3H5+ttcGm2ys7xI6QqMetQKqjYs6okNYBTUezC+3QBpuamG6yLSLm5JCzhsKlETTyWdCuIqIKJxIwlCieIQA3gFH04uAbw6sOH7khZ1s+Uk+2rveXOvyK+35rFqP2yAtCxtTAfCAgo3qY20eE+hBh9WLWqFKi5kyWJTc0Glm9ZoXAje+7h4040w8cL7ZqGrTqRLmh3xaZ2oayKlOEVFUaPUUmMU+mNhOLzG3YOHeODez9DrHYSNq1RnX8JtXoVqC/UO7AKmWKS30OeOhQOcOPkY1y6+xetrF7m+shxeoTa4osJQUPiiG9NVw0JtPpN2o71KE39V2wWpauNC9U10dsa1f6lpMQs2JmFqakQ0XgOJASfGdzHh9Y3g4oZMJxGqqLr4eymls53N4NXveRa1dzWApvSGLHJLe7FEQsRBsBJuqGq4AU10E5PnL82F1YmjtslzsjCjmkefm9UEEA5117xHzVIr4w2opx6e5fGDn+fuM5+muvgeow+/gdk+i7odjCkp4snlUdSPcWLw9HHLxzi8usKnryzw/IXLfHTyENYvUtYebxUvHolvP7y2b1KtfGO36ZwHleZ0TJ+3icDxxNLJTy1gMM3GCS+qExG8vb7e++Y5w/sK70Wmgt3saysm3T/dZxsgFnth8ZkpRMRITC7EgJoscucLr8315RbOz/xvO6WCtDl/E/BVOydI+A/f5r7qUGMQFF87xIJuXeLR/qe46/hnGb7879DLrzPQEc4OMEvH0c0trt/YQr1ncTBgsHoYi0Md9G6ssTW+waC/wCNrNVsffsTW6YcwzsRor4j6rCzubupwDdMR6LMCOqVCgkj8t9emQDfi8Vm6lNJS733z2dtroHGttlcxpbDhhA1pWTf1kuwEDqlV2oj6U9y7fYACSSe6dLZDJ3Ltjs7k9W8312yjUVoszQ1QH04SBFHXZPXk9YPGKi8hOijehDTIGIOOdrijvoO77n2Snff+GDn/EmUBdTHAmgEfvfo6r7/zDpe3x9TqOTDo8/BdJzj9wB30D6ziS89CXeB8zdLqAqfOnuWFA0vo4eP0xjA2NQ4Xk5a4WJFQ16jBYENtEyO4ao0ThyhYU8TTjrgQTbOhFZeditIU9Glht0CDzj0g0yJvo4h2ToWUfjbnaNxonXsl+3EDqDRFZYjmIfM06tp0RQUxNDm6yY55nZH2eJ9SlG6+nCKYEQl5vIAXwXvBSo1HUIqAMJHSlBrEoTFR8zFlsgKKx4my4Hrs9A394Rp3H/0kfmud4sIr+D4416PUJV5/4Sd88+V3eMkYLpYFI4H+5g5PvPoWv7R1iUc++SQLCysIntLXqC040V9mcO4imwcPUxjBa0C/FBevgwmfRVJUHSNWUO9wFDgExWHVot6jWseNb+K/UxQu0jnXfO4EOYgQXsPTXEOP4mV2gBERxBbh9WKgSXVUvomsJdwnUQw2pkw3g53/iqJAgmTRPlxZgw3F5aw8vsUNYo7aPkP7O5qdKN2aQFoUFBGHtQK+h8gYL9tUXrAejFdEHR6PpCObGqUOz+8dhRFGDHBjS3/bs3rqENWVtzGmpnCLmFK5ePYsP3r5Q75W1Vy2fZadUFihQvjXUrF5YcyDlyqW7lFUbFw4lv7SCqfeucj3eh8gdx5iID3i+YMATlyAzRKSZfqID+lNJVt4Kyy4JZwKY1NTqKL4uBhNZ7GZdCJm92QysKTvywTIkCJ8+j1jDCohNQyonE7ch3QKzzqd99EJ0GBACs5ItzhozkbtIBwJ5vMomFA8h43iQ17boBKSRX1pCsd8IxkRFIMXjzWKHVvsSFjoL9I3FisGxKOiWDEYBZF+iMK+whahUKytRWph+UhJrxhQ7VxGjGB8D0zNuQtn+dGo5ryBu1b7nLrjGAsHl6i959qFNV758AOeZ4svF3fgxhVGPFDirLCysMzjK/dwyB6kKE2AbVVCnyBi6imVqG04NZ1RSgc7aze4UKzhlxYxaltEXkwGi4Z6IRXXpJ8Zk6VLaeF6fEKepD25OzVSloZ6r+0p430HMGj+PqZcew0D7XkNMNUE03hhlCaSpBuXIrJ6RXDh4naQHY8xNhz1JDzcZkW0xvRJQ7NJDLh1VoZHefien2d1+SBoHc//kDu3NUCMnBrzZqOAg6qG0lBfehsz2gEzwNvwHBs7O7zWE04dOsHDH7uLxSNLDEyfUnvccfQEz/tNPmQZDtyNXnwTSoP3SulWuOvTz3DfQ5+FkYZIoQJqwvuQKkO1BHy8Zt6BtfiNd7jzxa/x5sY1Lp88hfVQJPQoNTck/1wmx3oRAWtDXeS9Brha0imiIA409BPC97rNrfzfCbJummFeJ2qy/boBYnQ3neuh+Cb99+GUJ/QBPC5Ad84jYuNxW1GroxqHm6TqsGIpigEiJd7XGBPwZxGLUmfoj+L8Ilxf46G7H2KlFLbf/Ca22sBjEXUYN2oKTjUhsxYfexKmCE2lCChqNQRGlBbwHmscS4sLLFjLnffdzfLKMr1aERtwGrtYcvz0CZYO3gn9lbDwPXgcZiDo1kU2X/hTCvXAGO10gjVjWwjYhFgqngIrO5xAuPzqa1zsr1CtHqdXj2MVUdAzceGJCbVNbIwhY8SHq61aI0aRoofBYrCIF5wQ8H4coQvW7ZKbVCt47YINTVcxoXsSYWW/PzdA4Mi01IFUMEl+MmiM2ozC4mUZxTF2V9GqoF8cZnHhKIdXjrE0OM6gfxhjBvR7KxRmEDqY4dwNxV2EPUXAOGFoPfXz/5oBfer3v489/xNKY1F6IGU4RWKX0kdeTzqRjEnHlGAVMEXIsbVAXFiRD9x3nC9cvM6Lo4rjtoBCMFpijKUWYdke5ZEHH8dtXsWI4mP7yWiN27xMKdcofRXxAulQIZoT0whebLMxCi+IHbFVjzA3Kk4NH2bx8d9iQSoWLDjTwxiDif0UT0xvvKd2O1TVFrXbYmd4leH4BqPhGjujDxhXWxjbQ0tBfB9lCFIhuogJtXJWQofr47NULQSS9t+qOtWz2X8pUIQgE/SZlr9XjzHp+PUYq6gv2RneACk5fvCznDj8OIcP3kshB3B1STUyVGyj4tgZerwLvBXvHaphI9i4SBUPrmBr6xoHrgzpHYFq5zK2LMH0QW3IOERbOFQTtULACKJFu11F8QSI0WPQwmG84cCBw/z255/mn7x1mctX1jh+4iCFAakqqjXH5x76HA8dWmb8ynOU1uLEYFRx0ketAI5a2gRaslqoiacCXlxsXwlODJYe0i9ZPHCQH37/JYYbL3Dq1GmOHTyAXehjRDE20iy8iWgQiCxj5BSFNawueI4csNhiTFVfYHP7Ha5ce50b2++BbFEUfWhQpNhd9y7c0tSwE8FIxsvyXZrGNDViP22AyHER71q832oLyqlijAdxbA/HGD3CfXd9mTuOf4qeuZOdrYob14c4N8L7YXwKixjBe/C+Rn2R5bexYSOCdw4Vw/jGeUyxg2hNPd6ipIeLKFRgaLZR14sJnU6JTf3YFxBSUWeaisaZmlIt+B4njx/gP7/vaf7s0lWujnbAWAaDRT7x6Cd44ugyo1e/QU83wQwaQkN8pVhoRmxdabB5kTZYhI9mm5RIY5NxIJ7VVcvi2jUuXr7E6oEj9AYrLFkorIBTjIDTMWgVT8oakR0qVyDjErYFxFKY+1gY3MuZU59la+sCl298l/XN1xEzojCLeHWoVCEoSAgF6KwOsI+nKj8zSNCebIAUFNQIuCocmVIE9CDmlLYQnHds79ScOvkFHjz9VZw7wvW1darhOoUJx/9wXLG9vc7m5gY7o21GoxGj8SieHi4et1mfhsQctYwu/JjfeLQP9ZCichiKWCRLLK4zGI9Q9KUCHXGdDyOJggAUdRkhx4rR9jbL5ir/wYMPM+4fwonQw2PXL7PzwrcQt4kreogqFpcR78hSQul2vyeZyC1uEE/QEAgGC0dYdZf44bN/wruX3mF59QCHV1fp9QctGdG3XV1jDEVR0u8vsLS0yoGVgxw6cJhySRntwHjdQXGSU8d+k50D73Dh4r9ne/gGtjSo9gAXT8K2iZi/TYfSvOBed8D2ngoRc0ZTtB1DMYDDFI6dHY/lKM889rc4uPwEFy6uMxxfod9boPZDzl86x+Ur59navsFwvEHttnDqw8JviGK+6TN0mzawMxxz+OrLHDr0C+j25VDcmskbYibIS66l9zZBbZp6HbZCOPJ7VOiNjxjfOIv2l7DW4qohfrRN3yrOFA2M+xePiDM63ljK/gJHVuDqj37Eut5g9dARNrYWWVhcoiwKbFEgUmQktYhsqUW1xJo+i/0ljh29k7vuvJfjR0/Sk4KtdSh6H+PMqbu5tv4dzl78LkW5FRA4X85tagmhq6l7zP/Z+w2gGe/f20DCEofXGnrC5tYOi8XH+LlP/jajnYO898ElegsgdsSbb7/HR+ffZWt0GcwYYwBTo1JDpAXk3P9Ek07pQ4JKR1vb3LmgLC4cwV17G6M+ohp5zi1Ti2yyccdU27895mpTYtVjrWLFo/Um1A5vStzCUmCGepeTLna/bDMgxmk+TYAq1ZeIsdx1YImji5tcrCsOlAViLMb2KHp9rLUYm1PBI98/gc66zVa1yebZq7x/9g0OrB7jgXs/zr2nz4Cv2NnyHFr+KssLZ3jng/8e74YUZUhBY6M6HFiJ3hJp1OH9e0T8Pt0AKWcQjzcplzaYnrK15Ti48Ck+/cRvceWCYXPnBv1+nwvnL/DO+69yY+MCXsZQDmNeXIAWqNqMuSjZmo2UgdhYUxHEOWQ05o4TR8EW6GgLxLeRUGaylSY2wJxN3aRYsd5Iz+kDwQI81nmMH+KlwEuJyRCSzkkw2WSiTVeajZB3FjvcKsUXJYtLBacWx7w7HiJ+B+d6eK1RihgQbGywmbhi48yDeFCPMYqaGtSxtvE+P37pHBcu388jD3yaAweOsrV9g0FxHx+75z/lzQ/+BVX9EUVhcR4E27QaVFNAojPDkG/afbQBEunNxUaKw9iCrZ1tDi4+zjNP/EecPbtJXQdK70uvPM/FS29RyzZa1qB1GAjBxEWVU4WzNj6+IY3hYzlsDE6Vvhtz/ORJcFswHsf0R5pmdF6rdKKszj/WJGdrqsc6Om2+tiw0oLbN+2dQPrr7UGZs7LgpVTuvrfF1FA9Fge33eGAZ/vT8GKkqag/O13EmwCBiI3iZynkXGKKpqJeWQoJRRBznL73H9RvXefC+j/PA6Y8xrmqcLvHwvX+fl9/8r9ip1+j3F3BsY6QXCnMfjoMu68dkG2BvHmaP1n88pmOX0RhG40365gxPP/4POftRxbgy7IxG/Oi5b/H+uReozRqObbwfZxunS7vNi0WJnd6G3xI7uQZl25cMGHFs+ShsbYEfUVCQguD/dws0YdZAfJgO6/LtZ/VKbtZLmU6BsoEhEQox3H9okf5oiy3n8epCB1eloeKHAjhno0ynVhJ5R6oGYxzD8RVefOW7vPL6jzDWUVWe0c4BHr7/HzAaDqjqG5GJCup1+lTL+gF7+dhbWRTxcdqohxsv8vQj/4Arl5XhyDEcb/L8Sz9gbfMcpjei9nXLh1eD0OtMGAUei2Ajvp3fQCMCxiJiQmNpvMNR1lhePYofbVObMarZ/O3c4nKC/vuXaoO77MvfvLad8W9h4r1o/j0JWH9pOXVowKJ6xjsVWjmco6VWEGqXnKLQBpCAFLWNrJY8Z4xFxPH6W8/yyhs/xpbKdr2Bunt45MFfY2NtG3Um5vpdPlazQeNz799GGGBE2dhc5xP3/22EO1jfuoIpLK++9iJb4yvY0sXBsJg2xDwaCSeHkYz92WmRhimodOgaBC16lOrR8SYHe0Kvb9i5ukHhDVpYMHVIkyR1mLIRPtONtjm8mgJbzpvvDqBNltPSbN7EwlSZwM4lS5xkUu/CThTHvm2UJQTMR8pBscTRAz3uGDjOj0NjyohijaGwBUYEI4FerUqH7hw+q8P7/POmwZoYP4ua1958lt5gmQdOP87W9nUOHfosdx07y4dXvsahQyeo6yr2LkwzuK8a6en7tgiOS7OqhhxYuo+7T3yRDz68Tq834NU3XuTajfOI3QnIUIJOfR0KM6uMxxV1XWNsPvsaLq6J9AeTqR+EfVKwbUfcuPYRJ04fAKlw22v0dka4/mY8jdKxHKfRmi0UU5a0mMVOsBlTSpfa/y6b1IoM1CwVEGkbZz4VHJ0JnG7TsIsfWDCGtgKerh0UcArqKg4MhHuXhzx36RzLy44hY4ZuSL+/QGkMVvLCxzSDMSIG78MGWVhYQIzgatdGbokMXCpefu1HHF45yZHDq6yt3+De01/i/NUfs72zxWBQZjQSsoE23b8bQMNUN+Oh5YlH/ybraxZrLJcuXeCjs2/izRb4urOIMKBO2d4cc+TgYc7c8yDHj53EFkU4xhXSAJKIBJwjRi4BSlU2Sth+9wXuWH8TdjYYX3kPt30VkbWAjKhvyHKJUZqPAqZelDFFGJXpULfTmlQwroF6Jf59N4q2S1UFOjMMET1Rn58EeTlt2lNBJ/dJNy1SV3H+7BUeP3qQ6olf4czp0xw6cJilpWXKso9aEBtOgDCjK82YozFC5WvOnfuIN996HVXP0vJyR4RAAGuF0egKz778bb78hV/GilBVB3jovl/j+df+7/QHq6iTcIp6ZtYt+6wPoBgx1JVyYPleDq3cz0fnNnBa8/6Hr+F0E6/jCM/5hqPuXI26gr/25b/BU488zqAoOwCamVVrZ2lz+u9r1XXGZ8/hr5/DblxEygEmplY+DWxIKpk1lSvN33vV5vebzq1MRmzbfFaRIFeizZtMKhgSm4ImOxGyqD6ByjYJkrpuv0KkG/sTcxulLIURBUf9Or/41Ge4/xOPc+zIMZaXVrHlzWt9pwE1Onfuff7ff/j7vH3ufQ4ePDTB5bH0ygEXrr7Fh2cf5qHTT7IzGnL00CdZ6v9b1m9cZHl5FfU11pQ/ExygPYdBEU81qjlz+hlGQ6UoHBfOXmZt4zJiR4hWeApUDEXtqXH42vC3/8Z/yMdOn2FzNGZtez2M18XVbRqSWCYSFXNjj8GaCq8F1z54m+OLNeMbV7AaBl8CL8k3YGBKL1JGItKmWmIyTYWEnvruzfQxOjaL00x3iiVirqKpaJ/VEdapYXjpDO9rM/Obt1jQkJJpoRxYsVw/f5Wzr/8Au7LM5vYNVlYPsbS4TGnDyKKRSIn2bZMyDOSHxuKJo3fwn/zO/5j/+l/8M15/83UOHz0UxAG0KccpreHNN1/gzF0PIapU4x4nTjzBi6/+S5YGC2DjTMcESLGXZ8EewaCC9zU9u8rRQ59gc7NG1XL+4ntUbgOvFeolfEUUYbg15JlPfpaPnT7D+sYm9fYQo1AYS1kUFBLQH2NtRChCkVfYAmssRVFipaAerVPvrDHAM9xaC4vIuzDoknd5I79eUpMqi8zSNh7oCkDlUGz7n9pAlulf4cRQaf/djhtqB4XppICkKbf8xJAJZCoR+SLVXA0LvR6FtZjNc1R1jXcaqcuCsQXWlpiixNqSoiiDgp2xWFtQFIK1hvE43JPf+pt/l+XBAlfXruHUN11dr46yKLh6/QJnL7xNv1cyGtUcOfwwqj02t67FNHVSHW6PQZi9if9C7casLJ5G/UFq79nYGnL1xkd4HeKc4L1F1GDVUGtNr1jkiY8/QVXVaO3DCHuu8CDM5ZensT5jLMO16+joItY5/PZ6LHw9BhfyHKJawoSuZg4LJtzcmMjMlKBiNwkdpjnYBAPmX+k6GGMaraPZC7olqs36XB3YMhbG2qlXlLLXp7/UY2n7fYbb21R1hXeO2rkggaIaGLIz5Qvje7AWX9UcXj3Al7/w81y7dJnhcIhzrsHzvSreOD44+zZSQO0dveIUvd4xrq/fYDyumteZU9/vn0ZYXVUcWDnFuPJ4GXPjRiC1aRrxwwd2vULtKg4fPMKBlYNsj0aoAW/C3MBUp3YKqkw31ePrms21axSyhXUeP9wMxZ+E9Cfk6z7qfvomyIu0Q97NF77F8dU1Ubf75SPFYXoDmEZ6UZuUpd00LWIiTaWr7fmSRXjTMETb4aL2fYcToN/rs7C8QLn9EcOdLerahU0QP3POYWqef0bdJtYwHI+4/8y9LNoeO2vrVNW42USKYgvl0tXzDMc7SOFAl1gcnGBzc8xwZ0xd17i48YDmb/dZDaCoDlhZuodR5fEqrK1fDEezlZZxLKH6VDxlEW+sBnaNk5CF2yxfnUcpiFeakTcMr33EKd1muO2xWkPZx4hBpMRGXr0Y6eDhzCimDVnfQWOR2wyJCb4TnVt0paVUTMA3HQW2iUZCEp4yKT0znTJfE5KkRMGuVr6wwODZodIBsnGDem0TOWNR5/GuwjnbnC5N4EgbNiKzueKGEkZOi7LP1tYWg8UFLEJZls0pu719g42NNQ4dOAnesVAeZ7gzZlhXFGNDKSa0WMTR4Z7spw1g6NHvLTMah5x0a/sGXh0mgwq993HAxTMehUjTJAozLtqsFKgZq1ShkoK+cbzxw29xaAH6vR6FLZrOpm/URqEtqdtVnz9/0r/pRMikhKaz2J2+lQaZjPZR5LcLa05gWJmKnWb8H42IVTpF0phpqIMAs8DGxnncjTW26oJqtBOZq2529JWsbddofGojLJyi9nA4ZOhHjKs61F22wFiDYKnrHTY2b3D00GnUj+mVBxkNlapy1IWjNg5rggCASRys/USGU1WKoqSwA3ZcWEhVNQQqRMou7deHjeCc666HOC2lWXs9/7s2ooVBe4ujX92gvvtpPlp+jOq9f8PiyiEa3TIxYRieVkW6q4vTxsB24bTpSlJRa2SeNKcXBOTISCI+a4fGoFkmGp6bVlJEA04vEakJp2cuOgu1hjl1myK/8c3zGynZqTZZHy3w9uAh7jt4NAaRlps/qfGZ36cuhSFc+xCQRlTUjJ1Hao8USumTCJZnZ2cLYwoqP2Shd5RqbBiPa+qij7MOKUPfJ9Ba9lUKFPVoxGBMGdrseKp6HKVpIg5PrtAsM0kxOTQ5L/9v8GwxjM2A5YURJ3/+d3hjXOKuvk3tPLWr8c5D3Yrv1r6K6RcxXzeZKG93sEk1wqipmNUwHYyGnkE4uexMnk1baEpb6IpvVO4aKfdJgS+iujKCisVq2ABWJMgixugtRY+t4i7GvRP4e57myPGTlEWBsZLVDNOFdx5UJnH7dH+qqqauPWWpuDrUTGURflhVo6DeIYKRJTbWR4yGI0a2R78wGG+irOPeWm3skTCWIlLgvI35tKF2Gjjk2o3gQbbDxqM5LIZaPCayGdV0b9TksEhzMxFK02Oxv8jJex5h9NV/xNvvvsmNa9fYGY8YDYeICwvex5ay0dY7wGWQgUmyfxLJYU0Htt2ARZOna4dsFqjwBjU2pAFJ2CsWxg2VOZ1NUQoxUBs0UotTCuEnUkCDSZKG2pIDe2XJ4YMHOH3mbg4cWqEo+/R6PQqbinHZ9bTOT1MRjUI1UHtQP46z10U8CX3D9Qm6iiVKxWhYU4+GjHt9Rt4glaFvLN5IPLn2HRdIWmQlSXxLNxdMDdYA1c9BC+YIts76txEoegNWVoWH7iu5+/gRbmyss7m9xWg8xjnXfFkThcJj3u68Qw2xYJ6AMyeovdZabBbbUs6eUg2xljCBaZqAkDvNhA/epkKiyWopFuiujmQy05kh1kybPxHNxBqsLVhcXGJxcZH+YInBYJF+v6TXK8NU2ByIdfIUCIYlNChOo97tE98/EjkibOu1DgPz6kP+X6cvT107ylL3fDJyT9mgSbMnae90isBU2M1om2sDrs++YZOLUrOis7AWej2sMfSKHv3FZZaHO9R13YHochw/+Xs1NF5rIgms7WvkO3YWZTq9D2ts/DvT/n6mkRpOF9+ouIX0SuNJkJ4nGFLkVOWGq2QkjFmaKKBLEK0ty7DgQ/Tv0ytNOAGs3TX3l8xGKlNQzDZdEt2Vdiwn0bGTsLFX6sozHtW4BaWuw4kY1Dv2Ngf6mTHJkwlei+/ku3n/n0a3PtqkzD22J7/XpCdF0UTiQVlgFwa4ukZrlymaRRXC+DrGWrx6+v0BaMF4tIV3wTrIWEFM0Xmv6rXVzsw2USiUTUf3tG2YZd1caaFMTQYZ0RrJTQhDdDdsO47ZQLBisNaGbrAtwgllBDHsep1kQnYy70RPIm1ECrbveCtEYEAMVe2o6jo0MuOJkeqofVcDtAtecQKikbosAtZkKgkSiz0C/bgTYbJTpNHLkan8f9ap0xSh3mONofQeX5QZkqRAGaQCEQpT8PXv/zc8++p3ePC+R3j845/j9LGHWeqdxPkd6jpuSMkWdFRr09QQ8z7zwpIZ+XX+/uiagmhr9TSJdHVTHxpYlInr0HSxxXR4+Km4n7UJpuTPYzPCpXPP02nWJS+yAHL4xs8AgVodtXgqrajrClcVuH5FXUOvLPesF7B3qhBm2pYojJ1KkoW6aXrYKGQamZLjnpcapYhpjGmmx6y1UwvSiEO0RIpVbmx+yB9+579jrb7AO5df4s9//DXuOPEADz/4KR598BEeOPkEpS5GpTua1EA6IdJPLfhpmFF2hSHzVKqDdjVKU3RqgumNlajZXfebyQU/mf/ngSa/ZfM6uOEUipRt0xkACBvIBe1Q7/beanXvdIH8DD9bTV3V1uGRXNcnu2EmKstpdgLkpnmdlGCXTWGt7UiBJ+5NeF8VULOydJTPPP4VvvXsv6Vim2F5g/evP8eb332Rr31L+Wuf/Fv8zm/8r6irDBlSM1HJt7LhTLhPtrLlQm6y1VlgmibbTLYZwilKY7UVi3BjpgrjKRcXWsh2MtQ01rVTJ0ErcNuY9WWzvrkla1PYK5krT5C7DJKVgnPgam16fHvBiNhDcdzskk7C/C3xvbk4oeBre7TtRdPOENXNNCfnITeTjTQljkjqmIJFfvc3/jO+8Klf5oevfIcX3voO19evUC5YRtU6r7z7PBvbaywVBwM1SFyUTsykS6JxhCAN5ThRDdCkXxohVW/ywySI/JLVPhAVGsJzOAL8qdkqSj2Gqc/bsFkn0qgJSonO7LYnuUgbFbfzAt+HvL5R+A6okZhsrtgr+EC885oxY9mzRvAeSSPGz2s0ObGAi1z0zkURyVSiY8RXxXiPt9LxEG6gvyz67QaPzmqedVIGfFA5E6FmiNQlD5/6OR6++7PsfOU/4g++88/4/e/8Hr3lHpv1OuvVNY4dvANXOcQ6BNtGfPWBLJccbURwuZEcPbo+WvVEVO53FogXz3g8jgzuVoC23STz06A8tdTUM5i+UO1m0YmNIBKV42YZ3cWTT1tOkZese17X4KPZoKS0MLfE2m9FsGbKYfpT/J1Ih5vSNs10KqP8aSS4Z3OJEmjpcaNtai+srJzk0Qe+xB99999g8Hit+H/+0T9hZekYuFAAumS8F90kjfd49Q1/p25QoSS17hs0JIhV2caU22bmeNV4zOHVk/zKF36TlfJInGGbcbLOaQo25noTJ96s/84gnixs+dbXeVKMK98jvtvPadifmhtqhFRoL1sBe8QFoulANtHXtJNRszrHHc6NyFQt0dIKdAK1oLH+zBf1rN/Pf5YXy81GsDWmsFS+ZnlwmMW+Ycd7xHhefee7jGO0tAreauwXRIdhbT8LPhiDNDQLCiAY2iHJjd43ibE1YQwyLd7hpuOeO8/whce+ytZwiJHZs42zfNJudgLOhJB9O5Ya3lf4MqZreao5BUXatGoSfWv5VMkccb91gmP+qdFcOfEuvXhMlOojV2eTZAEqUyhEog94NHYqW3XiRm58ktg2w8t2cjE0UbHJh3vNAq4drC6vsrS4wtbO5SBvaEsYedTUOA0a/UYzTR1xTX8AH6yems0lHpWq+WxGTSuboorU0OuvIoWiUmNFWVk4jGoP0ZpJ47rJumZmZM/juk7UU3RTT7KAkxp3qRHYvkYUNxaNbjORZhFremsM2OCtEOgfHudqvO6tNNWeNsIarU7S0HiSFjFtnSChI+VEMw3jaLicSSZ40tht21322nYu0Z9OiaBpyEVmjqE1pcPXDHoDFgdH8FsXqbXm9PGP8aWnfh1fj0AKkLJBWlQdSN2CQhrc5TVat3oTN0EDAJXhRIjQbq+s+caPvsa7l17FlAXLvVVOHrqDylfB5xgzt8CfhfGbvE5qrcGi1CIzbWabYCAGdeHaMkWh0MZeNbQEfFOjSfhB4G4lr7WG87R3cOjPTCdYOyqv2ZHaFAptvZBOVq/MVlbOaAGyy+LeDcfunA4xRDZ+YUCvXGB1aRW95MEYlvuH+MWnf5NiZPEC3qQJsyjJqGYCU6fjwu7VN+JUGjk3aJgTGOuYf/fd38MzpK4GHDl4nNWlw3jnmwGiWenL5ITZrBNisvhqDSxkDqkwPAI9XduUUaevoU5Ay0baArlj0L0vT4DOTQmLVSdcHzqQeZ5Lxg1hJKRPLusVyORr3KQrPKv9n/PjmYIDFec8AwYcXD2MeKEo4PrmOdbWrrJkVhmaHWxSeoiLw6tpB2EAoy3V2oviogdwm4CEVKEsepy/9gHX1j+gb3rsjHa44+idLPVW2RyPgwmgmKmcfl7/Y7K2aZE2nXtSdE6WuJilkVT0rSxMzuOSFrlrXzuTmJ+EYPfTBpDYwApWRD5Kb0TSr6TZ1nRshta9yRyLWpWFVlXTZNGsC2tqIpxOQ3pzbvxkpDRMRq2wgA6t3kmtYwZ2le2ddXbGN1hZPYx400CbTW4tMZGKlAH1sdBOi0pMZu4RuEo4R1EucuH6ObZHI4r+IcRV3HP8AbQ06DgY65kZJ8Cs/56dAs1OP2ZRLZoNGrF9V/uJ08WEbRxru2TX1JwGPsjHBFE0EwZ7fIWwsGcbwOzhARDUF6ISm28YjdrpKqZxP/Ha1a0kL1Blakyy+d5f8oiVOO/bLTRDrXJw9URoQAHbw01ubF3BYLBOEBxoHfoJ6jA+QKE2fNiuoKEq4iWYkaqJfxsG7kU8H118i7EO8baiKEvuPHaG2rswBiZ2Zspzs1NvGryc3RPppEAJuvax0J2I3R7axZ33NDPY1bvQ72nkICUffNo3G6ClL0xf+FRMxf/O0BiZuGmzcnmZ09iZB//NQoG6R75mjK9uz+HIylEGMsAYz8gPub5xPaRySY4xT0XSVNe8RRmjZTsjLlF6cci5K69HX4Mxy4sHOH74brRWDC6oWeR59y5kwJkQJ7orNNqlY+RUjglpc813SPfb+eKfvJctxUX30wZoefD5h5+UD2m8yTWwNpnR8Nn15naOeaaO9HkbZlZtMLmBvYeDy4dZKBfwOCoZs7ZxPXLgDZlayQSXJgUAOp4GaclL0wcIReNovMXltXPY3jJ1rRw+cJKVxWM4FyRXzORz7HIC7PZZb7lRGJE6n/VLmhpgjvNjqhXagNAl97H/ToDE/DQzNr42w/CiJuPSZJz5fOxPQ45ukIYz33whU6hEq9YWBk18GjNMNOLmf6WRLfcy2dAx1DpkcXGJhd4BnFZIXbJ+4ypeoBbfafAINk5OBQ8ufKhpxIFxGv83MGFNnL10VEivx9rWZdbXL9MvB1BX3HngXvr9RZzWIEX0MtaZacs86nQObXoSXeHmXXPvI2ybfn+iEy8IVkyjqGfwGC8oNRjFS1RU9drIxOz1Y49mgtsLNmUuR662ENru6jXAbhPWoPhbpzi0C0Gmd+JkVhw7zNJ5R2RoSXBWH/QWWRoc5NLGB1AYrm1ewnkXIE9TNQzOsHnbusabUM+097/L2BRVjFd6Vrl05QO2dzaQxUVElbtP3BuKWJKpn8482ebl8dOkvwQi7J6F+MThodVFnT48Zlg8SUCzfFTxkKRblEyN4RaI738lYdC8GGZ6ODt2TSdKsAaLT3RQmVtkd21Pd3N2ESYjoDRFdMe4QtqYHjbACgdXj6LXFVvCjeE1Kh1RSAmULQ04yaGnk0U1DpNIg7unghtSsW8oKDl7+Tw7taOv0C8HnDp5b3Rjn54bmEdpmDV3kAMFzU2Yk/tPUUc0BADXoZE3Uh7hb3waPEjyLIbsReLzJlfKfUaFyJ12k0xgfrGDJIih0flGgwetTseafJ52JtQksyVV8hFEnX1GdRdW1gwLYVAppOTwgWP4WukVJRub61zbucwCi0jtM3Vq7ez4RAHJa4V8J6oB4wzVqMfbl18DG4SsDiyucOLIHThX/4WXzMzZCKaL19npkHavl3ZRuHmRzkZadG7yp5mS3r7rAxD7AF66i617rmaa+5lHFUAtitxCE0Wi2kTCo002yCHGdjSFpjRwolrbrEmtkDsbrPEcOniESmChV3J18xz/+J/+Lyko8GacdY61PVkIqtAhIGoMAEWkTweRMKthwVTUrO1cZbm/zKja5uDB+1lZPBJmkX8KpKd7TUxr4rFL8JjdH0l9Gom6TmEmwKPUeApTxjxf8GJQCpBRcLSpwfs60iFS9qN7mv78TKRATY6ZXEnYZTpImYrg8ygAM1UktMgiOGDm64l2zee0LYqbIlJRDwdXj9EzfaxYVGqu7HwQcnpfNNwhrxo0fVSbznDTJQaKKMWucWDGR2TMGLAYdKDUW55DS3cyKA4wqoZZg01m5viT5L88l+9IuM84IfIJufRvpStClrR/ku2T9xqV7LrwqMTXdM6Fa9FxjJxThu2LDRBZmiEK+YbZmQ+9B2KnNPo8ab5Ub0Jsm7LflIlceDItmfH3s4rJfGGoeLwTDq8eZ2AXwDksBXVtGFZDvB01XVMc2LrNcRRBiiJoDAFD8Z1xQm+j0nJtEKdQe/x2j4dOP4i1dZjUzLrMU3n9TSBeVekQ3iY5WLP4Q0lPFCxI1P7RTmeyCWLqu6ORDYkwe7jYEJtgReyXDSCtsHIsqkxkC7ZITEuJ1haCaW5UvihnnQTdIZB4i03V1gxiZqLAs5tFk+KMYbk6LxxYPMJCucCO3sDXwpP3f5bTxx9irOG1xAQNzMIEmrfzyqgeouIoyyhM1RxGQfnZmSoECCmD8Z+vOb58J09/7EuMdnJBgRnktluqAybSRLTjQ5NftMniOfCv4unlM0q3T3Lwna5YKIKNZDVAJjUvuXHIfqsBUByuGbtTwIlEZks8IZK9kXHUmS/WrON9Foen+f1kmyWm9XrJjCtmRf/kAJB3QLWzIwoqqVjsrVDaFbbrUWBu7gxYMY/hJaijiQYVuIVBn/vOnGHEDf71n/yXbI6uUBRFIihhVLAarTm8a/lS8X2/Pn6OUhZ54mNfxFX1VP0ya9xzuuBtNXzyotykYBOjeGNA36i2R8Id4Su4EbrYg5joKotDqcOXOoQS8NhG2j0KhBUWxCHG7kd59LxBG1rk2pFHCaeBZOJR6v1PjXB0OpW7LPp5b07yzTbBNLVecX7MoYUDPPXAZ/j6D/45Yg2vv/0iG1f69HtHEQ1ONmXZQ0zJO2++x/XRq/zZC7+H69VYI03nGC+oU5xx9ItFSizOjxkPa7SwbPs1ZDDgk5/47NSRNE8FY9ZwDFOjpLcSrCROq6WegTSd4M6wfRwDVc09DLo1lO/UJ9PSx/tnAzR5YZDU7lByU7qj0o7iZRwSnYzWc4q+3RCReYoRkinQmdhsy/yumx6EUfDWob7gb/7C73D3HQ+yMb7KxmgbXxcsLy1x+uQDHFm6C/GGhQVhoTzMTv1F7rr7CNe2LlFYi1eHZUzpLdYu4Yqaq6MrVPU2g6LPoaVTSF1SV2t89tFfgXEBMp4+sWbwgDo1yxxayK1o83d+I70Ore9x209I9YWNmyFOjeWKHllQmmf9tG+K4HYjREgtNncb2XMC89KKie6ifiZENBnx0gzwPD78vPx50rtqqseQRV6Nk1xjJ5RygM899df4/W//U5595evsVNcRLMdX7uXXv/QP+eTDX2a8vYMRz6Bc4m9/+T+OKso+KF5rSa9nubD+Pv/Nv/m/8M6Fl0ArBrKInjT82i//Lg8c+QTjDcembIVZA5392WcV8Z20aHLBawtF7nYyBrHbbqXQ2kZ1sRzpxPVcY7UtrBP9u/1T3W8bIJ3GEZt3ET2wUYFYI26vijjFopi4KD2+UVaelb830J1M3/x5iySPoLfCqFQRjBY4MSyWjn/+tX/Mv/rBP2OpKNE6IFWX187xzj99g//Zb/9vefzBLzEc1RRsUo17OKkbElnPCJd2zvGP//n/hjfPvUBhlAKDmOt8sP4mb599if/Fb/9fObZyHFMT0sOJODBL2WGmuhs6uzOs3fmK9NQ2f34ANRgbi9/aRN6VYoWoCm0x1rSzw/FUSDKXmnmSBRc4ma5L/v/42FMy3KQfbrjQvlUma/KO5LHV7VjuFulmFBszcfLdTohdG0ME1/OyMLx/8S2+99Ifs7A04P5jT/Gf/b3/gt/6pX/E4eU7GPXW+Fff/H8wrLYDpi8GCpOdeoZy0ON7L/4J711+lsHCAZ554Ff5n//2f8GXP/m3WF48zIWts/z5j/4Vvb7F+paOsVsdNGl8MY/hmtcGGhWo8695ffwJae5mhmMKgo7X36vHedelVKPstV/83sujT/1bMk+uiDhEzojqrbEWpxbtbpVeI88+IYsyI7q2dIhgYqHeU/SFDy6/zXA8xFHw1c//PZ557FeBEe9efo9vvfJ1Lm9e4drGZe5YuZuxVnh8I18Yvio+Ov8+tXiWCstvfvV3OHPoYzx815O8e/ZVXtt6iQ8uvcZOVaEFjVSGMdI0liZz6Xn8n7lQb66wJ/NOS2kACY2DTC1IkalPeJ26fnkPJpdPyXWC9uKxhxVIbiytTYdSwvgXiG8nulRajZk5Wj63jjxNQqTa0fefZxOqaANLRlubIHdogi6QSo1IxdsfvUQ93uD8lXc5d+kcVoTSGHq9HkHZx4YucvN/IGIZ2AWst4zHO7zy/ouMTMVbF97k8uY1hIJeabGFjzIi6Zq1qs+3Flxmn3K5j4Lq9OLtnHpMevxOklK0qW9oZI5DPmowmEhfb3hAfp9SITIxv7DoW+wi+4U0QeSaxTKL5TgpfNVRNZNdRv5yE7t4U4RZJ7xM1nlBkc2W1LXn/rseYaF/hKq6yNef/T3ePv8GN7aucXHrPeqR44EHHuHQ6hHGOw4rBeJrVKJBNmF24IF7Ps7Xf2xxC8rv/cl/yY+e/wYXr7/DjruGjj0fO/MEfVPEfohki3G6EXYzmHem9PkE36pT/CY0KXKA/JxpPrKGmsT6TYmOMtHeNsxuxD4PBrunBkl7egJMRpNMXxITh6a7Qy2zvAF0wuh5Mi+9GQg189szHSenL5xRpR7BicP38xtf/AfIVp/tep0ff/TnvHP9VbaH17nnyEP8xi/8Lr6mIY41He+4gYfjLZ78xBf4ucd+k+H6mHV/kR+//20ubZ1ja33E0w99kc899WvsbFvE1ME9hlujet+0PpoV6bNTtqOohzbXO7lZNvcuDSg1cU1a9esGlm15Q91hpX12AuRNk+nayjYiTUGlPNzslCvOhfc6WHd2PMv0SeBVsXO6yHPz6Mn9pRbUY4xSjWq+8vRvcnBwmG/88A+4uHWBxWLAx+/9FL/4+b/FocUTuJEgFrwJxn+G3NQDCh3wH//6/5QHTt3HT175t9zYWqPXL3nigS/y1Z/7e/TtMs5XwbOArubOrPc/U9PnVjbJjA0xKQszc96AlrqSlLxVPSLBkSahdslCNm0m590+HYiBji11a77gm//0GWrdGEFn+P5kE6ih09A1dzYd1Ekar63dEKHZm0Cb4lDTDZdQu7jK8OnHfpEnPv45NnbWGZQlS4NjjKsaV40x1kYZmOk0Q6PGTqElv/TMb/KlJ3+V7dGI3qBkqXeY8XBEXQ8RK+BLImECuPlc8yyIdOp3JzqMk5urHYjxoX6JxERxM1wqjcE0ZoIFSB0kK72P/sa51aqbXAX7awN43xVHau2JWv68xrG/HPqbp3LmJ4dWsqZyLpEyMSw2My+eohJrN8dOWXEyubZWGY4roGR14ThePduj7eBEUxSN0vNM+DXmDg6ohiNEDIuD5cAUHa0H3D9phZp6pgrbrUC5Mz+v3x2C77psBo9nklMmEyZfDTztsyEf18xHB22kXPljT2lAe7cBJHFL8tNAMt6OZjPDE3n4bg0qI10BK53DN28o0ZPNpMw5RXOzN7J8Nkn95UiItqN/qorTQFazxk7DgDNTkpbhaq1tpuJMbCx1N0y3mTUv/dlt4XcAgzh0N88XrKVTtCONuVZoSCl9kDxJsCya8f4j5SXvSUQI2Pu9hUD3FgXShCpk/HOvHcQhODW28ucZEjqH/qwdu5mOPPeMSrb98yBFIlmOShLglVZxmgmd/baDL62rZYccJnPTrO5bma3pOVmQTkoU/jSLfzeJl8689cT7bCHW7iBLcnxp31/byAyezr5pjokIRWE76NwkNWL/pUAmyKHjw7SU12QaS/ckSGmSkYDDN9NTcZg+Q21ETMDjfYkRxUovatgHEXYV392AUYMnWA2F4tvbGusLnPeo9biqouyXjMZCoZ5aDMZLoP3OEXSaFKWdnU7ZxvM3H/+cHEaZV6maibNtNyKgZNTmVLDKHAhmapKuE2BCA0R8kOP2JvChmKJl5Pa1BqdK7YNpiBfTTMfN0xHaNzVA0gGdNxLRzsR0B2SMSrBXNdK0DdrFLIiUUAy5MnqDtY1LUZq8Jbal2x/cSYJ0oUooyZyAr+COg2d4/aPv8O9+/N/yS0/9Lp9/7O/BdtI1dY3VkfpM5Iub59GNKd7ESTXP2Waepj8Tehk3E/PqzA/k9dCcDTxzYaakPZ7UaWai0QCNBYVqnuIGhTuvSp3Ib9Gj2GkXTt1XG6DtrEsn+nXN3Lp2PnlenoyZuxmEYpwgpeftq8/x/IdfZ+zXMSYUbgbbkSFBw2hjGAoJOpyuBtPr8cb5mu+8/E2ucZ1/8ef/B2pf8YuP/EPceBsxNWivCwnK7MJ0Jle/Q+noMjQnT4yb0T50zmabKY6VFT3zOEE+K1ARGvmW5tVUA6xpTOuSpJnke9JzmrjX1tqI4mkrk0jR1gj7rxHGTSOmZG32m+lept+3xrA1vMTrH/05I3+VXg/KsqBnB5TW0LeGfmHDV69gUBQMSku/N6CQVQ4sn8AB33vlO9R+m0N2Ee1X/Nf/8v/MuQsf0C97oEVUe9PdI+a8z3YT+u+uFI8ZRLP0u7mR9tzCq4PC+bntSZ9hbzpDynyuJ0Bm+9oW2qY1JzfScZ3ZaxRo7zaABqqsFw15vldctM5RrxgxQZZQDQ7BmeCbokqjEi2TRaMYRCyjasTQbVKUGhpHvoibyKKUKEX4csHV0GBRDwtLC6yPtvn+T77FSLew5SILYjn7ynX663cwHm2BlIAJaZCY6Si7SyGaO9GLCUOhYSxwGnef+1xRrlEnu8p5quUjjVy7IrQ3Y792JNDnpkFtvdbugShlacL8RpKPFAkiR4IDX8fZh5YRKnvrkLrXG2D6hpgmUtCRO9cYrZq8cld2J8GcDo8VhxiHLYrgvpJpgAYVbwUpqH3BYOEIm8NtvvfjrzGuN+lLiS16vPTqdQ6NP8E/+Ov/iOPH78K5CmN9c6NnoTa7kc9uhacjkkdMc1OqwywpkmZgBrmpd/LMEyhr2Gnj0JMK10h208QMpfV9m6I4Z6Z/BE0kn0Ggu4tq/VWGQZPSTLzZ1tr2qGzEpLKBGVV2ixehDxAhCXGIOCwL1Kbkyto1jh08hvE1LrqjSGzsVN7TW1jixs4W3/3Rn7LjrlHYAfgV3njxbez2CX7n1/9zPv3kz7OwsIR3dYOLO+dvuhin4cRd0o8Zn/FmC3aSt5O1p6akzWGS2yRT6Y+ZkSrlAER30bav673HqgUkIGiaNSDjpm6M82SGFOa+RIFmQIepMOzo1Wi7ZSYJnt0JrlRQeYxVhvU6P3ntJa5tXuXuI/fw5IOfa/BzMYKrlYXFAWvb1/j+c99lx69jzBK1M7z66tv0Xc1Xn/wcT37yKRYPLeJcdHL0JV6Uoijb/oNIGw3nFf1Rz1TpmksIpjHV1omudwvVNyFjeoOIdnhQBtOxPhJJjM68gdb17/LeRd+v2ZuyCUyaCWCRWaOmnsDExtas0Wnyxl2cB97rTbCndGgVHyySNEqVN8VuXDDeozY4qxQ+TFMZQ5eFmG0eT4VKGZpSpuDc5XNsbl5leVBy6fJ5nnU/4OlHnkEcbFdDFpcOs72xyQ+e/S47Zh1jLeKFN954n8IV/PznPsuJ1QP0eyt4o1CnN+aoVHj55Y+4ceM6xgaevm+m2QJePm1GlwpVg0rRbgrj0Kgj1Kg2RA+0pK4s0oKlmrSQYitXKbLN5/F+HDWJTLOBvHchKnsNIrwSFqUTz6Bc4LFP3MWBpUW8htxddQ6hLiJvtfd4r3jnoCgSPhxtbsPIaJrpcM41GzwM8tjbJ0Cbk04fxY1DSpoKE6ai61ysO0KTVT3GFAXXLgsHjyxSDHb46PrbVM+P+dTHPsOR5RNc3bjGn77wBygjFnTASApeeu0jFsbwi194ijvP3Em95sAbjBocoYArCsuF85d56cXX8VaoVPEqcZGlAi92SuP7cb7tmBqRCaHkUIw30VlctsvDl1PXNqOiobYNmiphv2SzDTjfqm7E2idFcJAmVRSBoiioh+ssLghPP/kI9XjcsTadQt6yTZngzt0kdHOakE/qf9Juzn17AnTy43Q0Jqg6EbRksk3PTF5Ok1NLWEje14zHOxxYWebeO0/zwmuvcvLeFYqi5KOrH7Lz/IhHHniS517+ETus0TcllVNeef0ddFv5/Oc+zT2n76C2VTDgDu5dqPFNZFxZWuLokRU2hpsM6MfGkI3UbRdM/ZpFbNqkJ50KmjX3gnZInJ3VYLInZAJdHu9NV5xLsrrCZ8ss65RLNKrLp3w0M7oOp4DSX1jhzOlTwZdAZOYJMOnoInSd4ZsRR+cyODZynOKxrd5HLziak2yv+UB7fAJ0ufazprHy0UndBTYTkWYWKfyOR5zj0QfvQmTMC2+8xckTRygGnqvbF/jWs3+MFMoiAypnePGN97BDzy898wRn7rsTXxhcvR1pFK2ct6rias/SygI///NPMR5tYqQX55Z9s4MD5BebSsbiMHRsQmVKfq0t5l1rlxSTmg5VOQWGdorLd07BxnhCyWQPpW0gxvQnGIw7esUCywPBV+NWPToLLI22p05I2yPZ+5TotpMhSBrYo8ZI50BDfFC/M+U+ToFIHH8fxgs1mknT8vpFTegWausTMCmO1T17faBBYFt0RByPPHwfthjwwssvcejOZXq9sklFxsbx+itn6Q37fOnTT3DP/XdSFBXe1YFu4RUnFT7WFoUxgbTnPGUh9MrlWMbGIriFy5uMwauiJi1a066kzF60SZemZ+BorF7zEzNG+4CWZb6/SEdzP1GTG6Jsbi0ev+mcY1z5jmxK01mXVsQ/8WC9CebgUgniYk2hoXHmCFHdeBBvUKpIh7ax4AYrDiM1IiXG7lNpxJYNGiN3c4NtiKQ/papbyDS0mURS7xDr8aYCrXn4wbswheMnL7zG8okFDh4S/AieffUiK77kFz7zGHefuYuyJ3hfxejq0JjXt5h2i3fnwrwuU0zLN0Baw94leoHviPwmvoHEPF5Fc9X2bgHanAj5dQjvyec1ANNqcSHTmOxct/wpshy9i5zqBIvTT9C4Mzg251plu857n5kFJoBA2t6O7ruJsC7XpbU7Mo1rClOu8TJ1U6fou6Ko1igugilChWAVbFVx35lTiMKPXnye7XXL9UvrrGifLz3zFKdPHaPo1XFOXqK7uw8MygTxTUTiPD/2dJ3RjbRRttE5yppL+WdsjKSNzFLdmdNNnuPlO4frk6ch3b81mVrbjGH5SXmUjKclE7LzjTSKMkV10Gh9E9BYE9Ux9h4F2nMuUD4F5tU12pKtXaPOQJXnnQIhB3eVNk0h03hQKerH3H/mKF/45JPoesGyLPOVJz7OvacOIz1P7XfwfoTXGucDWuKrKNcSi0vmNLpkxr8VZi7UmRQEkZnPpbfA39nt2v40HeDdZgk6NYYn73K1hXEahDepQPaoj4rTKMa0vg/GmJ8JKHTvXCI1mqQRnSDJ2uVxPqA1xM5ohzPM3NoCz4JaBGW8vcXSkR7QCwtHlEIroMfdp8/wa4eOMdwecuDgMmUvTGB5s0iSSKGA0bWrLFT3URYLiDcY5pPNJiO3TvrozlmYk5G99c7SWzcCn3NCdKLzDJ7/7idIN53KgQvjwoyv07qxkA1CA2G2QkWoY58nuPKE4KTRXVPj4JLFBFvVfSmP3mDT0epT2+ZRXh/QKebm+3mlxed8xbGD93Jq5Yu8+tHvY/uCS7msq2IuHEKUWOXatfVGt1KM4F3YbH5kMNvH+cwTf51+v8DpOMp+35q6wq1ojOYDMj7D1I3MToLSiOKtPKfMkHa51RMid8rMA07qafhYeHttU8Kw2XNKdLaZmyeO1BdMsBjYrz7B7TngMNLHqw0TUn6WWrPMZEfmStCN2oN6VCusHOCLj/4OK2+c4tzFs9Spde/HTa4qEkypU4FWFBbjAyXAe0d/YZWPfeKzPHjPxxCpiJbFfyHEYjJvn2JaZlKEpiPYdWsbalZ0n3Vq3KoW6qw5geYe2GxICZmAtFtwoPULm2hVig16cdqtf/bVBsipVI3QkmslM9L3GnIbJppotL690yxCxTuLsQ7HOktLli8/8euMxmHaSxsfLm0hRG8jvdcF9WmNr+GDc0mx0EdljHfBYC/n5PBTnAIdQKhZFBlO2hYLsfHWFqSzVJ/nbYh5s8GzTob5m1I7/Yl5G6mldafmsGLERsjTIxMDPq0fRKYcB+j+PAG0YQuGBeIjhOkbaDD0aVo/3aYhlrrB0UigpdUGK6WgMyO4oMaBHZTN/EDpszJCwKs0iIbD441rWmmFL6BWvFqshPllzcWs5qAu84bgG+xdOwDo9GKldVa8WW5/s4U/K92Zdwo0+j8J98/gKu+D4kNo9mVqDpFj5LXN6wXBSqbgEXVQXZyB8L6O+kA+Bhbdj3To8MENybFRQvSARgYkKEK0Ub5p9Oikr3DWV+hw8sFoFW+ooFoGQlvT0VSKXFArSZtEaLCWirI0LEvJsK6oJwS5dEaqMLc20JwX0+bSk1qcOa9ebrKwZzk5zvq33sLU2qR/AB1GLlktoM09EiNonZ0sdE+1lvjW0jWc92AEF4mP+bjrviyCyRsqwlzd+o4CchpE30XOEAFrejjv2R6toaZGKcH4DndefWbL2hkA8QwWDvHh9ge8/dFPeOr0L7BanmBcbzfRP8fHb5Z2hPpPAoauMyRIsuPhZgPyN4vos352sxpkN1f4uRtFu5s+wM7dNFcyGyyk1Yr2Eqb6fha0gfaQDp2gy5annuSyJXYlhYgpT6QXua1qMzwfQ6gYoScF18cf8sL5b7KxfR5MBRTYnBSm4Fx73IdRS8UzBi05dvAEf/bcH/LWlWd58b0v8z/6yv+Ofu9OKjem9EXg50gr4jVvIU42XBIzszPqIK1SQzIKZw5sOS8NmrcZpxCzyWs5tXHmw7ZJWDI0vNomWjIAN9HxUyL5L3JdMKJNx9eIYEMbLLp27tb2+yuNAmU3XzNl6JheTCpGTnUx09rNijsTURrHDs9/+Gd8cON5+mWS8yviJJiJlj2ErnGEd4K0ouBUWFxe4k+e/X9x7uqHHFxe5MWL3+b/9vX/I/+TX/3fU7KIL8ZhMF6lo0O62ywwaVMb6SyoSXhTfopG1c38gXdDjTrfz6HOCUWH/LOZxE712tA20uncfEkwM2n7NqEBZiU0Eg0mCBNrHJa3Zr+qQmRHsGk1/nPnEO1Ew5tDeAqoMVzbvsKFjbcoex5rCmzRo7AFVnpBLEt6GCnDz2xJYctwk0zBysoRXnjlJ7x/8c0g5zHqsbMx5lvf/zZXL19nUVbwFC0/7xY7srkkyuwFOYGuTEGXN3G1nANhzu6kd8coJ9T+b9q40+zE7tYqbdqTv7YRg7VFDALdcclZXm/7ZANkejBKZ/E3uWGzGfTmbuiqOIk5tIOiriKvvUB0EDVociKvQeghlAEO9QMWF1d58dXv8MHFd+jbJcqiz4Ur63z0gzGfO/YrDFhgXAwx6hBHPDmYaU7HjKXXMeHWyUWXnXJKR1uzewLOc3iZB8PO+h3pAAeTXm2zRLk6cK60swxdo4zWscZa27yOn2HGkeRR9qkynDZ0aPEhjXBRDj2PiF59kOHLbptJkJtIZ/8mj8MSaV0MXUFvsU+hFuMtW24bJOSk4k1sxgQ384WlFZ575Xt8cPFtFsoFikK4cGWLs89d5a8/+p/wa7/wWxw8dAjnx1gRag2jjeGAqjATc72N8dzEJ+8YTkQ6s2iW+vj2OoiGtM5LW+mEz67djm2Ky54OJyPZTqW+iY+/0PbzBHEuSJVYMzMVn+w8B7w/3Dz1GtThfeJy+VDsp9dUC1R4L9TqgvWDj/ZXRpoaYX+iQHn0g0Y1YGbem47NKeEnnYhm8dmi8qAta9499wrnLpzngdMf5/Sx+9ne2gIDjnH0CRjQXyp5/vV/zzsX3qIYlFhjuXLpOu+8eYEvfOLn+I2v/l3ue+ghjC0aWrOhxhYlxljAhp5CRh+WWQK+TEfMAJ87vLoGEg4DMIo1JlqNhs+Z+FGFp6mgVQRn2tqp2/DyWZQHophXzvr0UqDaw9V1lHmc7dzTngQ+GndKsnIL3/cejbYfSTKFOJdsTIGxtiHDhekwR2PCuv+4QN3Bi9T5NJ0ju/UR7pimzjk2U0RLP+r1erx35XVeevNlZGD5yVs/wKrhzsP3sD3cwRdBAaG3MOCF177PexdewfZ72KLkysU1PnjjAp9+8lEeu/tR7jn9EEVh8S4NtivGlJw7d4m19W1MKQ1BMswvK9abzgZNaOCkKZyqosa2pwEStErjKSdGsB0WbKYh3Gj8t+oOMuk5EpNt78LQzBhPTRhdFGMwOmax3+O+u08R5MPqmzTToppD7uaZqY36OCyfT9CJlUbtO/d689kA0b49AZIiRJtzMsUfafBxSUfofBO8EI3CZd4e1nhvWCoX8c7x4/e+R+1q7j5+H9sVLC72ee7V7/H+hXcoen2ssVz8aI13X/2QZx5/lMcfOU2xqYjvdTZtURScv3SDb37/eRwFjnZVNtHWm1YDNIda0+rNcuqG/yMh95dIBvQm+lc0xtjxCdV3a43YdLLWZCh82zxX355MTHZ+raD1Dlo5Hnv4NMNxUL02M3oP6VQJ89dtPeU1NwfryvZKbILlso3eZddqjwdi9rQINqlBkg2c5LPCnYsZI4qPRXG46GaKqisieIFRNeb4wcP4keHq5XXKosQIvPDuT3j7/FusrBzgx6/+iHcuvk7Rs5R2gUvn13j3xfd57KH7eeLJB1la6lMzwqlrCvXmfVmgVyBlj772KKXEUmApKKTARgVkk30cY8BG2C+gTuFLRDE2TLQZo4gNCozGgjWKiQbWNvaRCyOU1mBDKwQrQmGCaZ8VoUjfjzfYiMOKYvBY9RSEr14c4y/o0S8X2hQHOgu2a0MlU24+af7XazIecRhNv2lDYeN8VL4Q1EiUdtzTFsDPxgkgRCnD2OFNFz5FUh+1Qp0LcnzW2syMYroDnGxVKzeitJZPPfYU3/7h97h+aY2DRw+xLTu89P6zvH/+La5vX8L0wRZw4cPLvPXqRzz9+ON86lMPc+DAgIoqFLoTr+PqmuOHVvnFz3+Kja1tet7jCVqmot05nkQbThNU6TOFznY7PTWrYZU4UyY6ZmY6eR3nHGI/wiS5Ec1fN4MtZ3SFnXoW+gPuOH6U0XgYggqzJdc1mw8QYzIaijbyNkH5oWWC+pwurdKo/wWOkXa6+vtwAyQUQ6YkNpoFLt35KhejcEuDzlOfuEB9hXNDvIw4vLzMlz/9Wb7/7Pe5euE6B46vMPI7rO3sYIqawixy4aPrvPf6WT75yCM8/dQjrB4oUa1CQ86U8ea3x7ZXRdyYY6uLnDi4DIzCpdSWVpH9cwqu1ckObZZCNFwhOiTRbGYgV5Nof96qMk/O+krjsqkNAD8xa+E9db2DYmbyiHLeVfJha5itvtX6NLkcS1bMpbonD1xp7lv22ChsD21Su4vb1d3iK8BvBmtNs2CSGvO8SSkx0nQfVR0qQ8QZDi33+dynn+bff/85rp2/zuGTh3GMKIseH757g3dePs9nPvkYT33yYVZXSryvQFwYEqdE1XUjbszp6yoKYZng/p4gw3YTyxSi0sr0T9KhtfHOkonutxjfhVB1InMV31V1JucXmcB5ktleZYU3QIUUisfErvy0aHFzTyy4uqZ2roV5J3o3CQVqSzXX2ajNwJMx6B6XwWbvUp8Y7YzGKs3jcNE6M0kBRjltfJgVjvr/kgGogXvuozZOUE8rpMTGG+mNo/ZjlhcGfObTn6LPAufev4RX4e03r/DWK+d48tEHeOpTD7K6uoSTYEOtKjgZ4dQEHZuocZO4S94LKhoIdqKNAJUmlmPEucVISPGiipuY+DtGGhqAmJAG5sYUxO+nO5SgYiMGE2sFawn/zgUGUpsvQagoxoTrGf4ujJgaE2oSZx3OSpBEjAKVkx3sKd+BOBwPgrehuAnQr0e8R9VSJ/l2cahxqI3WqomdG5hDsZjaZxtAkohSRp81qaCdYbqQF585itLJ/zuPCmSMV3AKNZ7a1awuDPjcMw9zcNDjxe++y/k3r/LMY5/g8888ysHVAi9DvI5Rrah9mBHAbuGN4jPuQ3JBSahVbFLMhGbbgXHo0ot1ytxiLmCcC1JN1j27oGuzqBQiXfmUWUIDc43Dic4u0qp3TFMZpDPimfhajQuo726qvYZC964G2IXjkqcQNuX6u1ylZqHFCabRyDEaK2axh3MEqA+H6ojV5SW++HOf4dTxC4yHY86cuYtDhxfxOkbER6VmwZgCqUvYtpH05jKsvkWdukPkEw2+nBIxh8+fK2LPYm22aIs0htPmp7BHnZ4cm28KnOf/kx3g/B5olrvrhFzf1KC9tLVc0x1Xpmgj+48K0VCbZ7jFT6HJLf7RuQHNL7TzBF5hdfk4snOYG+N3WFjuoVWNEfAi6GgBjOH0AwdBPYV1DN1OaOA0qZZFqy2untvgycO/zFKxiNdqQoNIOrDhtFhU1wBCJ7DyJt3J8fJOpG5za8mKApmz0Hdb/LttinnD87vPC4dGmmoreBXSG9P5zOF+mgnTvNSwi+ia7MsN0PoC45LToGRtlMgojJ3MwNOvmzRjrkm0h9p5lgdH+OKDv8WfPfevuHH+I5wfIfSD5Hi8UcpKKG4TCtGxGVUcBQ8c/3k+9YlfRkobISafKaclSLCVMZlaYOQul90F3m5inRn5UwQ2+eKf4BbNG3G8aSozZ874phsr5wQZg9YTzFUUHx0wC7Xh/nnBaNFcByM2pEFeo22t2Z8OMZ2blSRSJDVgpOWNxEdgF97aCF1dCffe8wQnD32Mq9cuUFUjRApUq24lIqaF7JJziTG4ukZ6Cxw5epilhVDQ6aQuUBPZZ0XI7qEmM/L26ek3Okprs2Dem3XUb/bz3VKcmz2PMaZjdmGthbrtZM/2IpNmWCZs6jpwnogonTNIYfY3GS7o4UvDIQn8qMC3sXFiSDMseZb0nzTD8RHJ0ArnDb2VkrsO3tOqueVEL40QYf58pl3UoR7wQIG43NG1nUrTW1w8s97z7PHGW1vku5lpT8pG7gYbzzo1Ztcg+YbRjPCmGB8QIfGajUFKq9Ga+4ilCUDxEQ1LDBLZvxugMV6uXUdoKTW9TDKbuBWxXNWAmce8srSBiUhsEEU4OpC2Er8ojVxGJmOTF8cubF07RMYdjaJZdcitnEyzCtbdDPZuJdrP+pvJn+f5/iy06VbkE9tOsDQdX42pq2+UrVNgUBxtEew0KO8ZbFCCU2YaDO6vDdAMVCiBUBw2QuLHk83OhjUtE0jCjOJOw6A71mKM5dzF62zvhHFIFYe4KqY9NBpDOeKUonBKv5aXSo4dW6Wu0wimzh0mn/X9ua7tc9Tbpgw/so73vBneea89a0FPDbjsMjw/O11rZVHS7IOLQ+4uXn+imnat7cS3twEGtYGHjkROUCMdyX5MgSagOWPNFHyWw24a0yJhnhZPPExQRAp+8OOXefn1d+n1FzqoS95RDsd6+2KtzigYlPF4xNOfepzHHjxN7Yf4zKBst8U7T8kOdof/Zp0qk93lW42Wu72/eYWx3jwH645ZJtpH+vKtZGKuFmcyCciuCfqUHeD+2ADa6ZMnFWHtQtQ6eZT71qkl0nWnnlXBFobLazd44eV3+dxnHuf+++/EVSOslHgpWt2dmYYTkXKgwQHyxy+8xvMvv8UD995FaQgc+l3y6VuRL7xVacPdFufNPINnbYRZQlu3WjDPem4RQZ1vNqn3kzBvluFCJp6lnZ/lo5P7CgYNhhCBM+Il86iVTHiKmKSLBN3QDLJUmIFjhydytQMxHD96hJWepWYBMYFsQRbx0dx4NO8zwEIfDqwuU7ka7xQtDCL+lvQ5c4TlVqRMdlNsm1dj3Cpycisn0CyBrVmboKmNTMvj8d4hpoexmbF3gzIIQk0pAlhUDF5M0/oRZH8OxEjTQIopTVZ0+vxoTQKsUVVglmhIvthUknINoJ6xG+K0j3MFTqqI5TNxfPvWTjRNNSn0PdQ+3GDrfOCfSaIm602192/Vkf1m6dA8hOZWToBZJ9K8WuPmrxMbYN5HIe8wz2ESn2nC4C3dV3BYEawt8GIi0yvcK0X3XBx07wZiMrSlE4mSwlgHO2+lO2ZFsmYRZTWDc67lqKcLrXnTLJs7iCxGSZIkTPBnTHQ4ZzZysVuhu9v3k63RfF2feRtq+n3MQlPy529NxqX5vs9oHLtBuKE3k1k7yTyZ+AjlZgJmeQMtmZZIJ8Xtmobvvz4AHV5Ym+fnim/ZYtitEPSZR5dXzVzNJ4q1ZAlkTPf4n0AlvCq1c7EHIR1PsLxBFFjHedScLT/YXShd+9e88TWNxeeukO2cQS4Rn37fWjMVwdOQfvueozarMc2AjnP+phu58S5o+iqTm5BON33y3jT3oEk3XewGs/82gBJ4OyoTPJoMJeg0crJCbgpDz4Y0vOoEAzJKLcLNi7pMdt0DxoWTwolGejWdpplzBTs7W2EW19tm8+SeW4kG4TNvXWZQnvKZ35xoZiLy1Eiu5EMlTU+DbEC92xdJr9eoYDekwRRVPNb0WVwo8W4cVN12O7URjErjaj+NTkV5d2MjncWgvgatEelFGYmYeqrt+invpw3g082Jla/s4oqSRJjmoiwdmcGuC32aI85ZlfNy8YRohMwpqFebuMAak+4YQbd3an74o1e5sb2OEwO1nUrLgDioLnN9xRJf1HtHO8zezjeHRVxnWv0CGpATkzaKtIvcxGjvtdXc8dE53hgTBvgz1W2VMX0Z8NmnH+bE4UVq5zujjjItM4EV6bjJywQ/qvvpgspFV5Uu1n+RE7QvG2GZmF5wQled6FqS2e20DvFtFNWZxnJJlCksKG1pC95POSXObVxlG6bpL3htECpjCtbWrvLh2UuYhT47tQe3gzHapCt5mjV59oFMNaQSbaBlgxrasQHJSxJCNymjgSRxXTEhRfG0UX6ioE4qE80+M5YbW9tcvHyNO44fRuttYHYq1klFoVm8LdQ6bbPUbVp2XX+SuME+nAfIPG81mafplGZOt3PQ6sxMMsxafaGu8/yku7p2pNO4CSyYNG5ce9Pi4q3riiMnDvLwx05z+foVDlKCW6SZc4/vr0lfkuFfFijTCGdQqa6bN5tGQYN5diTfmbozGq1aBAVmF7kd1kb1ibQB4uvnorx0JefTkzkZsXh8hfvvO0XlRsyRL22ijBHBORdABnTXBlq6V2lm2GtrZpIGoPbaKHXPXCJN0Alu0p8cSmuM11KG5GnUA9JGkIkjWLMCSwBrgiZJh5Y8w/d23nYzanDW40Uw3oD1TQLvvVJYw6c/+SDe3xdvZFfCq1VWyGfeJUdgJ4zyWu2gDqEtXYn8vUvWFEzXwUgWkbPN0oE4WxWKtjkmWFsGpqZ3HcLfTHi26ZV4RAWrFrxBfWB2ThXPcdPYODedp6YaTfP2pSpEujEm+WLFqNcWeN3xw3bIgl3JX95nmkGNE303TdoNnmz1NiXsvjSXkC9kQi3n/Dji3RE8TSiU0MiIN+tAMiQnP2nIbV6nP1OgFfjOwm3yZm1riPS9nDox9fmS+XfarlEKsfajuf2CbrBIXKnYl9ExSarUxHnllF416Fj0CzDGYKOEuvqWBbrXBhl7NBNMh+pgZlFw483yyQEyd4hhlmEbXbmPfOY4BT/f6tcwgyrc3Gzvm/a+ycW38hOHzF4pw+W7GjzMHJmcxN39TYlzk7CmacYzp2Z65zS0OsJjHbv62V7Bc+1TpVtTdD430zRxbTTUoyebBxGLNcWej0P+TPQBWviTiUIrKImJ2T1L7N4sh6pt1rw10YMY3xnZm3C0aqNzJuEmoukAaJALpdtPmKQyT9YU3QXdpVPPsz2apFG0yIl2psjmwbjswhi9Fef43eyYcs2+hvdvzC3p+iQ7WtVIn9ZZAME+2wDhoiZpkMDbFyV6aeU3UBuKcj5oPsUKjfQJT0lVOS5dXOfwyjLjahvvLUZsJ41qhtUlsVIiGQ4FX3H54lVGrqIuHP0OKqUdb6zJCDqLTyMdR0u5pUU5j1F6s8U7u3vM1Pu91UEdso65eEWNARs40A5HEeVi1AfOT3wlnImfT4NwTeJAqniccXixey6PuGdFcEMvyApgxWeO8C09ORlGpGvlZw2BoAiWuq45fHiBBx84xh//+Tf41vf6uNpFM27XisKa7jSYsaadv8UzrEvGwyG//MWnKHsrVNU2lvqmkN0srs08Ts6s6a2/VG8l1y7dhYqx2xzxPOedHEUSI1hr28NGun/bqlxkyI8xWarXPOFc15y/+idAalBFuZHaVRkWnqUpqahtdZbnmj5HEQIsFV/54jPcd+Yerq/vYKWMp4rrMhHzAXQjAcaMsoLOwfGVBR4+fZTR8EbQ/jQ65VU2C1GaazK3C2nu5inUNGR7s7z9VqjVu506nZFI9QFeNUGi1/vJplf3fxq1DLrU9VaukakBo/21AST6RHoFE/6dMPfcN4CGBqEzCXHdRk/SqAoSfx8/cxJvChChUJepF0tXW8fkujwt2lM5z/rYxVE/F/vCN1+oszx8Z50ONxujnOQe7Zb6TKI/tzokf8spVEf+ZxpXC/m8dGRO0nBMruLd2MFGBMsYs99SoDB/69wITwW+xBjDoDdoGj85ciLRVFnJfMMmjvkmHxef3RbH9sijjEm0gVa6Nbt/rRNfVhtow2ps4Neb8PpnokkzUpx5ac+tnBJ/0ZmAm51Ms34204ibYChlxQXxgQmt1uAkXyHAYq+PUOMRqtpjYic+iCIajDexZtuHRbCIMBrtUNXbiFlAxNDr9fEu0Q5oaAsp7td1zXg8bgrXHEGYS3KLzSOZQbDrAFDZ91zqxDYhzzeLfx5MeWsKZ3pLaMtfKKTs6ugiN+3Wztp88wS1jBjGTsI9IkNysva7EcPCYCkUxaLsDDdxviZYSbWcINmlO/9Xug9gjGE03mE83qAowhG4unKAIFMygZ/7kB5tbGxy9drVRipxFiy4W9ScJKlNpiaJ8y4ToL3OWUjtcJrOXOyT3/e+qwXaWWy0OL0yLf+i6E0XemoYTn5/VmGsbfuse4JmAAQTcGeDmHnYGUW5mKkxyxBRjC1ZXT1MNQ7Pu755BefGFLaYCFzsKRFuTzZAchiv3Yi1jSv0+gbnxxw7dgeFLTs3sbn51rJ24zqvv/Y6lasorMG7mlaQLeafKo3qdBBjlc5XEsKa/D80FcXd308cIon5beOLpcmLQNrGWjPqEdwrU2fUNEKyXR18kys5p3eiEuXJM2hMTPw+nc+W/2/6XOk6pPdpmu9LNPMLymxGIySsNsj0pOeNf5+6tJrr56qjKAxbO0Our21A5CpNnqa1qzmwcpCVlUO4usZaw9Vrl3Bat8ibSDYIsu9SoMhL90MuXvuA06e+yPrGFseP3sWBlUPc2L5CUfSaSOQ1zONu7Wzy+ltv4jx85fOfpd8rGY6rDHeOTuQd+cAgYZ5czhuDB7qzBGmQxsfxSPWKmm6vIejZtDz7MCPTNb9Oitf5e4ifglwr1Cefs0zDv+UggzeaucwoJk2zGTodXe9clBiP68nnuqJtjRM0fLLmn0oz5DPV13C+ef7kxyai9Ps9nMJLb7zN2voWw52d0Fx02lJFJMxjn77zHhYWl1lf26CslQuX3gPjo0x8LI6TPazfZzBoSiXKsse5i69irODdgOWVgtN3P8SzL12lLGn8qATomwJbWi5cucrmlnL2/Qv88le/zPETR2JK1K6nRkcnOM41N4dIG56coEpjTqLxOEy693RN7LqMUjBKx0qo44oShXhTwW4k/H5anE41zhhMz0E0BLhJRp0wgbG30uwGaZm0RhrTwUA0i/5ciTtkpJ1803aLNv0Rza6LhM3onHD16gbPv/AqW2PD+uY1rly7wsk7D9GI/MaXtzLggfsfoRqPUbVsbN7g/IW36PXoFNM5A2DfFcHeexaWlnjjzZfZ3D7LYHCS0WiLB+9/glfffBnVreC44gy2EMR7Dh85yvvn3+fh+5Z57c33ePv9f8qDD9/HyZMnKcsymExgArnOZzIr8fWstbmldHvDI4ErELZSm74tzDpjftpG4NToSbz9xjopuaBrCzO1EoDtQI73wXjPRv/cxLOZRQ5r7GOlW98YMVN+AWnxNq4umeRjpzaK7yxYvoYUzdWu49mAKk4dGxtbXLp4HTElJ0/dyTe//id4cY3mUmpsDocVZ+6+l7vuPMPGVkXtRly8+D6Xrr7H0uoizqeuvmk+96S16z7pBCul7TEaXeeNN/89j9z/W1y+fo7Dh+7iEx97nGdf/AYLi4POLO9gYYH+wPL8i9/n4XueBApefu1tXn7jHQob+PHFxCZronhcBAbpFKJNKgQYa/FGpvLatPhTNt24psRVlA97pAVuRLDSnjKtqyVtvZErv2WSgjTE6gzmzRqEZhLZEhPSCZNZLeUFb1Z7eO9pVHgi7dklA4+4EH3GQg005oLBYMDBgwdZXO7zh//2v+eFl37IHXedDIxQ06pCiCqf+dQXqCtBqBhub/D2uz9hZ/saR44da2qc5P6DyH4diAlShysLKzz7/O/z4JmvgPYYVxs88ejTfHT+Da6snaPfW8DXMRp7z9EjR1m7cp0fPv8tTp+6j6NHj7OwsIA1BSKWwtgmN04m003/QHLh27hAfNvdMdYGh/a4qLoy5qZxdUwUZ/U6we+XZm7XmFYVLT1XIOrlxnnCpFmF6qyRTcWra+sYBKPp1JpWqlAUTzv9JpIX9YpENby0QVwDOkhnliClR8ZYvHd8eP59nn3uh7z7weucOHGShV6PwtjQebewvbXNp5/6PKfvPMPO1pDRzg5r1y7x3PN/wsLAUFBSGhvmAiK5MIQou/9SoBSNDh8+yisvv86Lr/8BD9z1u4zG1+j3S774c7/CH/zRf0s1Ggdb1NQRNYa7Tp/i3NkPefv9F3j7PcHafhDAVcGYMqYbvkVrUpGb06SbYfM2LUlWrT7TDkrTWiKCsbaxcU2G1Om5E2VaZ9g7tQZzdbOZkjSJiFAURVNw6lTfIA2uuNZyCBr5+KTq0KZisRvuXeywtsVu3oHP9Y3quu7UOUJIyxrYF8fOzhbXr1+jKCx33HEny8vL9AcDisLQLy3j4Zg7TtzDZ5/+a2xurlMUwuXLV3ntrW/z/tkXufv00VDoi2mk0pvO8R4XAXs4EKP0++Fo/Xff/Of0f+EBjhz4OK4ac3jlTn7hi7/BH//Zv6SuK4qijLmqUPYLjp88ydLiImvX19jY2GBne5uqcjj11L5uC8JaMsm+iaGQmNbkvYng0uibhZ0GzdHpei0Vkm3e3HoNpNOi9c8NcVnI7UzzhTDZu8gldaKufsbidHS5UGnkkciIFfKOuOnodKpEAbFU7EYdplyZI0kWSszV+/2Sk3eeoN/v0ev1GAwW6JU9+r0B9bjmwMpRfu2X/y5a9zC9IefPXefC5df4/k/+JQtLUBQWY2uMNVhjmw2WNqzsT3l0QYzj8PGDfHThVb72jf8TX/70/5p77noI1SF3nbiXr3757/CNb/8bhtU6Ra8M0ddAWRYsLC5hi4KVgwdxlYsboA5DNL6l4eYNCKE7sJ5b+uyqN5Srz01oCjWRHhO7yGRpz0Qa0yFiyDTPJ/PwnWz05c04P5H2JIpIK3vtI/qUrCazwfUoRNW8rqcj+Ds5fmHoBXdJGzZF0evT61nKvmFUbXHs8N38jV/9+/QXVvG6w+a1Dc5/+B4vvvbHXLn+NmfuOU1hDYUNfm8prRIJc8x2j2cC9q4GEMFTs7xacPLkSd566yW+/o1/wpd+7h/y8IOPUY0cdxw/w69+9T/kz7/7h5y//D69sqS0A6TXA99DrMWWY+rKU7qYKjg3NSvQoDm+u6BFzFyYttM1VTr/zlUpElhrJoZdOl3m5J07ycERaRbALMcWnaNEnfqXbSrn2j6E+sbrwIigEuxIW60hR+7RpiodaRJDd7N7bFz8QlHYJmXbGY546IFH+ZVf/DuUxSLew87WiJdefJaLl3/M8y/9KSdOHKcsCgpjKEyJMTYIdxFqKiPhne7PDQBYKRAV7jxxF9cuX+H8uW/zJ9+s8P53+dhDT+HUsbx0kF/75b/DCy/9kBde+gHb4w3Kssdg0VLWA2rXoxrVeK847zriWTcbNDE6TfjKlRN0Rt9g8vkTxJoQJs3Bz0SoI5N3ST2JVHskiNLtboGab4BGQSipK8S0LQT/NlUKCJPESbbIesV3jPfUdzlAUxugLGK9YcE7RpsbrKwc5ctf+VUee/Rz+LqksGM213d49oc/5MK1Z/n+s/8dyyuWpYWlMDsQN461If2xhY0w6PRY5746AawtoRaWl4ecPnWKG9e3uXjtWf7oT0dsb/19PvHIMyytLuOrHs888Qs8cObjPPfqj3jnvdfY3r4WBzNKisWFMAwfZ3nTQm2otimCSztTgPdIrR2uT4cvY4IatU5Qkr338/X2s5QleRk0Opo5vN5o+USINah3Ne+l7UfM4PijeNPtTRjf6qGmzZoabGkDtCea77jGo2bXDeDU4WqPG48Z9Jd47Mmn+cwzX+TAyjF2RmN6A+HC2au89Px3ubb2Cj96+Q+gN+bw4bsobBieL4oY/Y1t6SiSG4/vtxMghkljAKtUfszBY31OnjrO5lsf8eHl7/G1P1vn+toWj37iaU7dc4KqrlheuoOvfO4/4Jkn1zh/8R0+PPsWly+dY2N7i/F4FGyWsk3gtM7IadLkzo15deMH4CMV2oaURNq5gQCh5ul1LG5NvhEknibtBqqlpZtJ2gCZE2aqFZIqRpNeRb8t4pDOpM6oZtIUEnWH1NfttBXS8K1MXHCq4TOk2Qs6zjimw/U33oUi2PQoipIDy0c4fuwkp07dyz13P8ih1ROM3TpYT1kqP/nRt/ng3XfY3HiV51/7IygrTh65I1BHrKHsFdjSYMoAl1pRrPEY0TB7be3+G4lsN4LHmALLIkWv4uRdx9jcHKN6kWtbP+HPfnCea9d/lQfP/w3uve8ejpwoqcZ9+uUSD937FA/d9wTD0Q7bwy22httsbVxHI6daaLuqCQb1E9i7RLGmxslcWs1LyQrgTkoimaNA2hySSGRt9KybkU4y6ca2ODdGOilX8s3y6gMfp5lSM53G16RtqSSINb1fF1it1pZBeaH5eRo+CnIvrcF9t/OL9xgxDPoLLC+vsLx6kH5vEfUG7x1j3UJ9j4/eOctzz36Py1fe4vrmm7z27ndZWe1z4ugJjAETF39RWorSYktLYYTCRghXFGMtxu7LPoA2ymioYo2lsMLysnLm3uP07DKXLl9k7do63/vJv+CdD1/n3nef4czpx7n/nk9w5MhR8A5PwNYXBsssLB7g+KFTHWUJyQZdlKRJ3xLypj2aJ/Nuskmz7s+Mdv1tvdEZE1Tt/JSfPP6kyVOC06JvN4jP1J8beFMmJsuQDl0oPXWAOH3sIbSm3c0JksusACap1jXNbGk0QFUVCovznroes7l1g4vnPuLdt97i0qWXuH7jTd4/9wrrOxc5cuxuDh04RNEbU5Y9isJSpry/KMK/C8EWBdYED7cEPe9Tl0jN5EhCUTToC4cO9PB3CCLLlDLg+tol3vrwT3j//E849e6jvHnno5w89gDHj97NwSPHWF5ZpTdYxBQ9Slu2kT8rPpuup2TDGCqZlqt2rD1noUNA06yShK4IWXe2e1L4TFc09Z98xNw1Ftgt1YFO51l9YpWajOKwm49AbsQd5BzDyWIaDf4GJY0nYfp943Vi+RlUHc5XVFXF9tYW165f4sq181y+dJbNGx9ybeNtLl57m8tXL7C4ssTpM/exMOhR2JrClvR6BWVZILagLEvKsgwbomcpmgI4UMVR3Y8eYUQorwCpEaA0gY9iBgUHDiwyGi4jukOvd5SyN+Da2nXe/OCbfHDuOY4fuodDK3ewtHSMhYVDLC4cZKF/gHIwaCccorwKGUvSWRf5RZFPExeKMTFf1tbEIaQ2XXmWplurSm0znj9gfd14D4dUxjUIUmqQBdOOlmyXKBOJYGeTGXX2vM5Fh3rAFkW7uchMQXw7yCyxpknNJhC8U5yvYloVdUcbwbHwN67RQfWoOsbjHUajEds7Q3ZG19gZXWZt/TzXbnzE9ugGC0t97rr7Dg6srFJYoSg8pjABlOgXFL0Caw1lKRQFlD0TUqFegVjBFCYzSdmXMGjC4aNmpCpSgjGepeUFjvrDWHODojT0F0tWDy2yubnDxvoGV9ff5Or1N1BKvBqKokdZDCilH4u66FWb6W2Gzm+K0iF9kZizG2NQEaqJaTFj5mjraEhZOrx/qeNmsTHLaSkXDU1CA1TrIr8pRfckF26ikFcRlVMRpa4dTjwq0kTOwmtHeLaWDOdPk23NkZBU5ByKD89sbFsEZ4xZVFHxgYnra7yvqBnivEddoKIsL/c4feJulpb79Msi5PWFxdoSsZayX1KWpukZ9HolZc9SxlogdIVppFWMkf13AjSHrRgQ3wygByRF6PVgabmH6iJlz9DfGlHsWBYGAw4tH2JnNGQ4GjGM/1uNdxjWN7hRQ+0i0corJlkfxYha4ZoJsjRqmeBLYyziaQRjjWm1ixKhro2aEixTs0htfB0RmSznQTLIsY3O4XciuW5Czc2E9mgmBQPUWTPPBHmWxtXeByHfROdOELBzvtO1FtGsqG7HShvjjuSPLIkEJ/T7PRb6ywwGBWVPGAxK+sUAWwSdz7Is6NkCY6EoTaA6lAVlaSnLIqY9RUCCjGALExc/EQQgm5TT/bYBYh7aMC9jBNRA5ur3DLooCAW2GFD0FxiWO1S9EX23wHBcUrsB3nvqGlytOF/HNMM3Ebfh5ycEKG6ysJazWoHWtVA1pCPS2lbiGrqBNFr8kuGjKjUBFIqGGPhGfqXTX4DIVs3yfW1HKr0q1ra9BFK3NtsgxnSlED1MqF6Hk8DHzwEEF8f2Ujec6PAaNHLqEmcMrJHQAcZE1MZiCiiMx9iCogj5fWGFooyR3AimCIs/RPy4CQoTbaCIFk7akPm6rVHdTxsgFYm25cIrGHFYo4gW9MseLHqsLbA2RJu632dnPKZXj6lrR+08rvbR2idIfDcGeUqHLmyaaxxY8WpoBmfcRIOrtAaTcdW9BiKZNES4Vg1B48/yjnKRKT8n3pDXADEGQxDfNKrEG9RpBrF6JEOQqsidT6mjjQSCtMjVZB3tOCGWUKCwzn0LN6oP+lYSVJpFQ8ojEucSTH6aRNQ0MThtWOCFtRRlibVCWbQ1lI0wZ0htLGUBtvAUURUaseHdx1aLFW2H3XS/nQDSRR4liwApMpS9HmIFqMCE/LEuC4q6pF/3qKo6dCmdj1Hd4bxrEBuyAZikihzkudOwSLuAGz2giCAVEkbEW/gw+gY0g92Z9VGWR0tMkUyM7jl1Ohfiqr2jmQX2oQ+QD8EkJAegio0sE0O4YHHRtDshXs0kWSMSZlEX5SZxYWjISPMew6ljwFVNT4LkIDPBkwotktCXKGzI6wOMGYzJQ8FtMpzfRt6Px8QNYa2NdGjihumib/uvBtB59qKQ5NAlTqYPBgYpaoyRcJHVUrmSqqpwtcd74inQ2holCnKL5xMnkWLki6OMjcRfokp7F9Mb4vRSokYoaU2YdAJkUivGmJayHI2fEv9mSrM/cWA0cHXIoMhUWKv3Ie1KsGmkSKSh9g5DNf6eSzArKRUzeA3OvCmKt7MIJg7H9xq9O0Fw0XzDGNPxXUMUI1BIWMyFtQHJiY0tawvKIpwCQTdU40Jvi3eMINZgIyepMK2S9x5lQD8DNqkyrX2fJDnEGIxaihiZiE0iqwarln5pUe+pK9/k9R09HUn2RMQJKo1e2fF4j93blPO3lGMfIqhmBDnxAUWJObIhQ1KayS+adC7N2+TOkM2wvtG4WE1wM8q8iUNRLo0Ue4BCXScquyw9MiINyzUVtQ4N0CiCkm8AE6HO1mMgwcSpn+HwUy4zEqN1GO5vF7wtDNjI7DSGwpjGpjWcKOFvmgGbZqYiUiFygrjusxMgjC5qa5sTL4VvCtQwjWQKRR0UzmJKwVnBOk9PBWcrnK8pSxPw8nhxZzmPpAiapw0uKU+rhsjVEbSKKYJMKCOnKBp7BklCxNCS2EJQd82gfHBuNA3+P8sgL+0UYyRrXaRc3seTK3qKmQzm1BAQ8gZcovh7H5zakTrCswaljtdcOq4v6TOm2iQ/m0PHNukntZvJRpV0MYq1CWUK79kaE7rSUaVCjLRjquICYVv3tgu8pxsgLJyOQEbm+dtGwiS4WhTh5jgv+NrHKF60cF6WRmjOZYDuUZ7XW1lDSEQzMwxtaATJTqgdbcxsj5DM4sh3VeoaWyWdcGedRdGeFNmdVFPW1i2ydatu5xI0N8CLHEuX5gY8qnXst5iwPXKvp8zUjznG3pP/Tos8rGnfzkxnJMIOrNv0StLfxDkANU0dpPttAxgBU8gu1TFMC9cZhAJkr70F/4f5uFmaPWXw95fKTHQa6egk/LD30rg/MxZJPyWN4mfAW+p/iI9ble/VW/z9v/gr/uzcP3N7Wdx+7OfH7Q1w+3F7A9x+3H7c3gC3H7cftzfA7cftx+0NcPtx+3F7A9x+3H7c3gC3H7cftzfA7cftx+0NcPtx+3F7A9x+3H78VXv8fwAtxrRWSeUUbQAAAABJRU5ErkJggg==" alt="Lista de Compras" style={{ width: 96, height: 96, borderRadius: 22, display: "block", margin: "0 auto 10px" }} />
            <div style={{ fontSize: fs + 8, fontWeight: "bold", color: t.accent }}>Lista de Compras</div>
            <div style={{ fontSize: fs - 2, color: t.text3, marginTop: 6 }}>Versão 1.8.1</div>
          </div>

          {/* Info cards */}
          {[
            { icon: "👨‍💻", label: "Desenvolvedor", value: "William Santos", link: null },
            { icon: "✉️", label: "Contato", value: "thespation@gmail.com", link: "mailto:thespation@gmail.com?subject=Agradecimento%20pelo%20app%20Lista%20de%20Compras" },
          ].map(({ icon, label, value, link }) => (
            <div
              key={label}
              onClick={link ? () => { if (window.AndroidBridge?.openUrl) window.AndroidBridge.openUrl(link); else window.location.href = link; } : undefined}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: t.bg2, border: `1px solid ${link ? t.accentBorder : t.border}`, borderRadius: 12, marginBottom: 10, cursor: link ? "pointer" : "default" }}
            >
              <span style={{ fontSize: fs + 4 }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: fs - 3, color: t.text3 }}>{label}</div>
                <div style={{ fontSize: fs, color: link ? t.accent : t.text, fontWeight: "bold", marginTop: 2 }}>{value}</div>
              </div>
              {link && <span style={{ fontSize: fs - 3, color: t.accent }}>›</span>}
            </div>

          ))}

          {/* ── Check for updates ── */}
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <button
              onClick={checkForUpdate}
              disabled={updateStatus === "checking"}
              style={{ width: "100%", padding: "14px", background: updateStatus === "available" ? t.accentBg : t.bg2, border: `1px solid ${updateStatus === "available" ? t.accent : t.border}`, borderRadius: 12, color: updateStatus === "available" ? t.accent : t.text2, fontSize: fs - 1, fontFamily: "inherit", cursor: updateStatus === "checking" ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontWeight: updateStatus === "available" ? "bold" : "normal" }}
            >
              {updateStatus === "checking" && <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span>}
              {updateStatus === "available" && <span>🆕</span>}
              {updateStatus === "up-to-date" && <span>✅</span>}
              {updateStatus === "error" && <span>⚠️</span>}
              {(!updateStatus) && <span>🔄</span>}
              <span>
                {updateStatus === "checking" && "Verificando..."}
                {updateStatus === "up-to-date" && "Você está na versão mais recente!"}
                {updateStatus === "available" && `Nova versão disponível: v${updateInfo.version}`}
                {updateStatus === "error" && "Falha ao verificar — tente novamente"}
                {!updateStatus && "Verificar atualização"}
              </span>
            </button>

            {/* Update available — changelog + download button */}
            {updateStatus === "available" && updateInfo && (
              <div style={{ marginTop: 10, background: t.bg2, border: `1px solid ${t.accentBorder}`, borderRadius: 12, overflow: "hidden" }}>
                {updateInfo.body ? (
                  <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.border}` }}>
                    <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 6, fontWeight: "bold", letterSpacing: 0.5 }}>O QUE HÁ DE NOVO</div>
                    <div style={{ fontSize: fs - 2, color: t.text2, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{updateInfo.body}</div>
                  </div>
                ) : null}
                <button
                  onClick={() => {
                    const url = updateInfo.url || "https://github.com/thespation/lista-compras-android/releases";
                    if (window.AndroidBridge && window.AndroidBridge.openUrl) {
                      window.AndroidBridge.openUrl(url);
                    } else {
                      window.open(url, "_blank");
                    }
                  }}
                  style={{ ...primaryBtn, width: "100%", borderRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, margin: 0 }}
                >
                  ⬇️ BAIXAR ATUALIZAÇÃO
                </button>
              </div>
            )}
          </div>

          <div style={{ padding: "14px 16px", background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 12, fontSize: fs - 3, color: t.text3, lineHeight: 1.7, textAlign: "center" }}>
            App desenvolvido para uso pessoal.<br/>
            Seus dados ficam salvos localmente no celular.
          </div>
        </div>
      )}

      {/* -- BASED ON LIST MODAL -- */}
      {basedOnListModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", flexDirection: "column" }}>
          <div onClick={() => setBasedOnListModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, marginTop: "auto", width: "100%", maxWidth: 430, marginLeft: "auto", marginRight: "auto", background: t.bg2, borderRadius: "20px 20px 0 0", maxHeight: "80vh", display: "flex", flexDirection: "column", border: `1px solid ${t.border}` }}>
            <div style={{ padding: "18px 20px 12px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div style={{ fontSize: fs + 1, fontWeight: "bold" }}>📋 Basear em lista anterior</div>
              <button onClick={() => setBasedOnListModal(false)} style={{ background: t.bg3, border: "none", color: t.text2, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <div style={{ overflowY: "auto", flex: 1, padding: "12px 16px" }}>
              <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 12 }}>
                Escolha uma lista para copiar os produtos (preços zerados):
              </div>
              {[...data.lists].sort((a, b) => b.date.localeCompare(a.date)).map((l) => (
                <div
                  key={l.id}
                  onClick={() => {
                    const copiedItems = l.items.map((i) => ({ ...i, id: uid(), checked: false, price: 0, priceHint: null }));
                    setData((d) => ({
                      ...d,
                      lists: [{ id: uid(), name: newListName.trim() || l.name, market: newListMarket || l.market, date: todayStr(), items: copiedItems }, ...d.lists],
                    }));
                    setNewListName("");
                    setNewListMarket("");
                    setBasedOnListModal(false);
                    setActiveListId(undefined);
                    setTimeout(() => {
                      setData((d) => { const newest = d.lists[0]; setActiveListId(newest.id); return d; });
                      setView("list-detail");
                    }, 50);
                  }}
                  style={{ padding: "12px 14px", background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 10, marginBottom: 8, cursor: "pointer" }}
                >
                  <div style={{ fontSize: fs - 1, fontWeight: "bold", color: t.text }}>{l.name}</div>
                  <div style={{ fontSize: fs - 4, color: t.text3, marginTop: 3 }}>
                    {l.market} · {new Date(l.date + "T12:00").toLocaleDateString("pt-BR")} · {l.items.length} itens
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -- CUSTOM PALETTE EDITOR MODAL -- */}
      {customPaletteEditor && (() => {
        const e = customPaletteEditor;
        const preview = buildCustomPalette(e);
        const ColorField = ({ label, value, onChange }) => (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1, fontSize: fs - 3, color: t.text2 }}>{label}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: value, border: `2px solid ${t.border}`, flexShrink: 0 }} />
              <input
                type="color"
                value={value}
                onChange={(ev) => onChange(ev.target.value)}
                style={{ width: 38, height: 38, border: "none", borderRadius: 8, cursor: "pointer", background: "none", padding: 0 }}
              />
              <input
                type="text"
                value={value}
                onChange={(ev) => { if (/^#[0-9a-fA-F]{0,6}$/.test(ev.target.value)) onChange(ev.target.value); }}
                style={{ ...inp, width: 90, padding: "6px 8px", fontSize: fs - 3, marginTop: 0, fontFamily: "monospace" }}
              />
            </div>
          </div>
        );
        return (
          <div style={{ position: "fixed", inset: 0, zIndex: 900, display: "flex", flexDirection: "column" }}>
            <div onClick={() => setCustomPaletteEditor(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
            <div style={{ position: "relative", zIndex: 1, marginTop: "auto", width: "100%", maxWidth: 430, marginLeft: "auto", marginRight: "auto", background: t.bg2, borderRadius: "20px 20px 0 0", maxHeight: "90vh", display: "flex", flexDirection: "column", border: `1px solid ${t.border}`, boxShadow: "0 -8px 40px rgba(0,0,0,0.6)" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px 12px", borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
                <div style={{ fontSize: fs + 1, fontWeight: "bold" }}>🎨 Paleta Personalizada</div>
                <button onClick={() => setCustomPaletteEditor(null)} style={{ background: t.bg3, border: "none", color: t.text2, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
              </div>

              <div style={{ overflowY: "auto", flex: 1, padding: "16px 20px 24px" }}>
                {/* Name */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 6, fontWeight: "bold", letterSpacing: 0.5 }}>NOME DA PALETA</div>
                  <input
                    value={e.name}
                    onChange={(ev) => setCustomPaletteEditor((p) => ({ ...p, name: ev.target.value }))}
                    style={{ ...inp, marginTop: 0 }}
                    placeholder="Ex: Meu Tema"
                  />
                </div>

                {/* Dark mode colors */}
                <div style={{ marginBottom: 16, background: t.bg3, borderRadius: 12, padding: "14px 14px 6px" }}>
                  <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 12, fontWeight: "bold", letterSpacing: 0.5 }}>🌙 MODO ESCURO</div>
                  <ColorField label="Cor de fundo"  value={e.darkBg}     onChange={(v) => setCustomPaletteEditor((p) => ({ ...p, darkBg: v }))} />
                  <ColorField label="Cor de destaque" value={e.darkAccent} onChange={(v) => setCustomPaletteEditor((p) => ({ ...p, darkAccent: v }))} />
                </div>

                {/* Light mode colors */}
                <div style={{ marginBottom: 16, background: t.bg3, borderRadius: 12, padding: "14px 14px 6px" }}>
                  <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 12, fontWeight: "bold", letterSpacing: 0.5 }}>☀️ MODO CLARO</div>
                  <ColorField label="Cor de fundo"   value={e.lightBg}     onChange={(v) => setCustomPaletteEditor((p) => ({ ...p, lightBg: v }))} />
                  <ColorField label="Cor de destaque" value={e.lightAccent} onChange={(v) => setCustomPaletteEditor((p) => ({ ...p, lightAccent: v }))} />
                </div>

                {/* Preview */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 8, fontWeight: "bold", letterSpacing: 0.5 }}>PRÉVIA</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["🌙", preview.dark], ["☀️", preview.light]].map(([icon, pt]) => (
                      <div key={icon} style={{ flex: 1, background: pt.bg, borderRadius: 12, padding: 12, border: `1px solid ${pt.border}` }}>
                        <div style={{ fontSize: fs - 3, color: pt.text3, marginBottom: 6 }}>{icon} {e.name || "Paleta"}</div>
                        <div style={{ background: pt.bg2, borderRadius: 8, padding: "8px 10px", marginBottom: 6 }}>
                          <div style={{ fontSize: fs - 2, color: pt.accent, fontWeight: "bold" }}>R$ 42,50</div>
                          <div style={{ fontSize: fs - 5, color: pt.text3 }}>3 itens</div>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <div style={{ flex: 1, height: 6, borderRadius: 3, background: pt.accent }} />
                          <div style={{ flex: 1, height: 6, borderRadius: 3, background: pt.bg3 }} />
                          <div style={{ flex: 1, height: 6, borderRadius: 3, background: pt.bg3 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save */}
                <button
                  onClick={saveCustomPalette}
                  disabled={!e.name.trim()}
                  style={{ ...primaryBtn, opacity: e.name.trim() ? 1 : 0.5 }}
                >
                  ✓ SALVAR PALETA
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* -- BACKUP MANAGER MODAL -- */}
      {backupManager && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", flexDirection: "column" }}>
          <div onClick={() => setBackupManager(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, marginTop: "auto", width: "100%", maxWidth: 430, marginLeft: "auto", marginRight: "auto", background: t.bg2, borderRadius: "20px 20px 0 0", maxHeight: "80vh", display: "flex", flexDirection: "column", border: `1px solid ${t.border}`, boxShadow: "0 -8px 40px rgba(0,0,0,0.6)" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 12px" }}>
              <div>
                <div style={{ fontSize: fs + 1, fontWeight: "bold" }}>📂 Backups salvos</div>
                <div style={{ fontSize: fs - 3, color: t.text3, marginTop: 2 }}>{backupManager.backups.length} backup{backupManager.backups.length !== 1 ? "s" : ""} encontrado{backupManager.backups.length !== 1 ? "s" : ""}</div>
              </div>
              <button onClick={() => setBackupManager(null)} style={{ background: t.bg3, border: "none", color: t.text2, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            {/* List */}
            <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 20px" }}>
              {backupManager.backups.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: t.text4 }}>
                  <div style={{ fontSize: 32 }}>🗄️</div>
                  <div style={{ marginTop: 10, fontSize: fs - 1 }}>Nenhum backup ainda</div>
                  <div style={{ marginTop: 6, fontSize: fs - 3, color: t.text3 }}>Toque em "Salvar backup agora" para criar um.</div>
                </div>
              ) : backupManager.backups.map((backup) => (
                <div key={backup.key} style={{ background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
                  <div style={{ fontSize: fs - 1, fontWeight: "bold", marginBottom: 4 }}>{backup.name}</div>
                  <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 10 }}>
                    {backup.lists} lista{backup.lists !== 1 ? "s" : ""} · {(backup.size / 1024).toFixed(1)} KB
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => restoreBackup(backup)}
                      style={{ flex: 1, padding: "9px", background: t.accentBg, color: t.accent, border: `1px solid ${t.accentBorder}`, borderRadius: 8, fontSize: fs - 2, fontFamily: "inherit", fontWeight: "bold", cursor: "pointer" }}>
                      ↩ Restaurar
                    </button>
                    <button
                      onClick={() => setConfirmModal({
                        title: "🗑 Excluir backup?",
                        message: `Excluir "${backup.name}"? Esta ação não pode ser desfeita.`,
                        onConfirm: () => deleteBackup(backup.key),
                      })}
                      style={{ padding: "9px 14px", background: t.upBg, color: t.up, border: `1px solid ${t.up}33`, borderRadius: 8, fontSize: fs - 2, fontFamily: "inherit", cursor: "pointer" }}>
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -- CONFIRM MODAL (replaces window.confirm for Android WebView) -- */}
      {confirmModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div onClick={() => setConfirmModal(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: t.bg2, borderRadius: 18, padding: 24, border: `1px solid ${t.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: fs + 2, fontWeight: "bold", marginBottom: 12, color: t.up }}>{confirmModal.title}</div>
            <div style={{ fontSize: fs - 1, color: t.text2, lineHeight: 1.6, marginBottom: 24 }}>{confirmModal.message}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmModal(null)} style={{ flex: 1, padding: "12px", background: t.bg3, color: t.text, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                {confirmModal.cancelLabel || "Cancelar"}
              </button>
              <button onClick={() => { confirmModal.onConfirm(); setConfirmModal(null); }} style={{ flex: 1, padding: "12px", background: t.upBg, color: t.up, border: `1px solid ${t.up}44`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", fontWeight: "bold", cursor: "pointer" }}>
                {confirmModal.confirmLabel || "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- IMPORT CONFIRM MODAL -- */}
      {importConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div onClick={() => setImportConfirm(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: t.bg2, borderRadius: 18, padding: 24, border: `1px solid ${t.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: fs + 2, fontWeight: "bold", marginBottom: 12 }}>📥 Importar configurações?</div>
            <div style={{ fontSize: fs - 1, color: t.text2, lineHeight: 1.6, marginBottom: 10 }}>
              Serão importadas <strong style={{ color: t.accent }}>{importConfirm.parsed.lists.length} listas</strong>
              {importConfirm.parsed.settings ? " e todas as configurações (tema, preferências, mercados)." : "."}
            </div>
            <div style={{ fontSize: fs - 2, padding: "10px 12px", background: t.upBg, color: t.up, borderRadius: 8, marginBottom: 10, lineHeight: 1.5 }}>
              ⚠️ Os dados atuais serão substituídos. Esta ação não pode ser desfeita.
            </div>
            <div style={{ fontSize: fs - 3, padding: "8px 12px", background: t.accentBg, color: t.accent, borderRadius: 8, marginBottom: 20, lineHeight: 1.5 }}>
              ✅ Um backup automático dos dados atuais será salvo antes de importar, permitindo restaurar se necessário.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setImportConfirm(null)} style={{ flex: 1, padding: "12px", background: t.bg3, color: t.text, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                Cancelar
              </button>
              <button onClick={confirmImport} style={{ flex: 1, padding: "12px", background: t.accent, color: t.accentText, border: "none", borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", fontWeight: "bold", cursor: "pointer" }}>
                Importar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- EDIT ITEM MODAL -- */}
      {editingItem && (
        <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex", alignItems: "flex-end" }}>
          <div onClick={() => setEditingItem(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 430, margin: "0 auto", background: t.bg2, borderRadius: "20px 20px 0 0", padding: "22px 22px 40px", border: `1px solid ${t.border}`, boxShadow: "0 -8px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontWeight: "normal", fontSize: fs + 4 }}>Editar Item</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: t.bg3, border: "none", color: t.text2, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: fs + 1 }}>✕</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>PRODUTO</label>
              <input value={editingItem.name} onChange={(e) => setEditingItem((i) => ({ ...i, name: e.target.value }))} style={inp} autoFocus />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>QUANTIDADE</label>
                <input
                  type="number"
                  value={editingItem.qty}
                  onChange={(e) => setEditingItem((i) => ({ ...i, qty: e.target.value.replace(/[^0-9]/g, "") }))}
                  onFocus={(e) => e.target.select()}
                  onBlur={(e) => setEditingItem((i) => ({ ...i, qty: String(Math.max(1, parseInt(i.qty, 10) || 1)) }))}
                  style={inp}
                  min="1"
                  step="1"
                />
              </div>
              <div>
                <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>VALOR UNIT.</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem((i) => ({ ...i, price: maskCurrency(e.target.value) }))}
                    style={{ ...inp, paddingRight: 30 }}
                    placeholder="0,00"
                  />
                  {(() => {
                    const hint = getPriceHint(editingItem.name, unmaskCurrency(editingItem.price), currentList?.date, currentList?.market);
                    if (!hint) return null;
                    return (
                      <div style={{
                        position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)",
                        fontSize: fs - 4, fontWeight: "bold", lineHeight: 1,
                        color: hint.arrow === "down" ? t.down : t.up,
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                        pointerEvents: "none",
                      }}>
                        <span>{hint.arrow === "down" ? "▼" : "▲"}</span>
                        <span style={{ fontSize: fs - 7 }}>{hint.pct.toFixed(0)}%</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
            {/* Price hint explanation when visible */}
            {(() => {
              const hint = getPriceHint(editingItem.name, unmaskCurrency(editingItem.price), currentList?.date, currentList?.market);
              if (!hint) return null;
              return (
                <div style={{ marginBottom: 12, fontSize: fs - 4, color: hint.arrow === "down" ? t.down : t.up, display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: hint.arrow === "down" ? t.downBg : t.upBg, borderRadius: 8 }}>
                  <span style={{ fontSize: fs - 2 }}>{hint.arrow === "down" ? "▼" : "▲"}</span>
                  <span>
                    {hint.arrow === "down" ? "Mais barato" : "Mais caro"} que a última compra ({fmt(hint.lastPrice)}) — {hint.pct.toFixed(1)}%
                  </span>
                </div>
              );
            })()}
            {editingItem.price && editingItem.qty && (
              <div style={{ background: t.bg3, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: t.text3, fontSize: fs - 2 }}>Subtotal</span>
                <span style={{ color: t.accent, fontWeight: "bold" }}>
                  {fmt(unmaskCurrency(editingItem.price || "0") * (parseInt(editingItem.qty, 10) || 1))}
                </span>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                onClick={() => { removeItem(editingItem.id); setEditingItem(null); showToast("Item removido"); }}
                style={{ padding: "12px", background: t.upBg, color: t.up, border: `1px solid ${t.up}33`, borderRadius: 10, fontSize: fs - 1, cursor: "pointer", fontFamily: "inherit", fontWeight: "bold" }}
              >
                🗑 REMOVER
              </button>
              <button onClick={saveEditItem} style={primaryBtn}>✓ SALVAR</button>
            </div>
          </div>
        </div>
      )}

      {/* -- EDIT LIST HEADER MODAL -- */}
      {editingListHeader && currentList && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div onClick={() => setEditingListHeader(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: t.bg2, borderRadius: 18, padding: 24, border: `1px solid ${t.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: fs + 2, fontWeight: "bold", marginBottom: 18 }}>✏️ Editar lista</div>

            <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 5 }}>Nome da lista</div>
            <input
              value={editListName}
              onChange={(e) => setEditListName(e.target.value)}
              autoFocus
              style={{ ...inp, marginBottom: 16 }}
            />

            <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 5 }}>Data</div>
            <input
              type="date"
              value={editListDate}
              onChange={(e) => setEditListDate(e.target.value)}
              style={{ ...inp, marginBottom: 16, colorScheme: settings.paletteMode === "dark" ? "dark" : "light" }}
            />

            <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 8 }}>Mercado</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              {markets.map((m) => (
                <div
                  key={m}
                  onClick={() => setEditListMarket(m)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: editListMarket === m ? t.accentBg : t.bg3, border: `1px solid ${editListMarket === m ? t.accent : t.border}`, borderRadius: 10, cursor: "pointer" }}
                >
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${editListMarket === m ? t.accent : t.text4}`, background: editListMarket === m ? t.accent : "transparent", flexShrink: 0 }} />
                  <span style={{ fontSize: fs - 1, color: editListMarket === m ? t.accent : t.text, fontWeight: editListMarket === m ? "bold" : "normal" }}>{m}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditingListHeader(false)} style={{ flex: 1, padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!editListName.trim()) return;
                  updateList(currentList.id, (l) => ({ ...l, name: editListName.trim(), market: editListMarket, date: editListDate || l.date }));
                  setEditingListHeader(false);
                  showToast("Lista atualizada!");
                }}
                style={{ ...primaryBtn, flex: 1 }}
              >
                ✓ Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- DUPLICATE MODAL -- */}
      {duplicateSource && (
        <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={() => setDuplicateSource(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: t.bg2, borderRadius: 16, padding: 24, border: `1px solid ${t.border}`, boxShadow: `0 8px 40px rgba(0,0,0,0.5)` }}>
            <h3 style={{ margin: "0 0 6px", fontWeight: "normal", fontSize: fs + 3 }}>Duplicar Lista</h3>
            <p style={{ margin: "0 0 16px", fontSize: fs - 2, color: t.text3 }}>"{duplicateSource.name}"</p>

            {/* Market selector */}
            <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 6 }}>Mercado</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {markets.map((m) => (
                <button key={m} onClick={() => setDuplicateMarket(m)}
                  style={{ padding: "6px 12px", fontSize: fs - 3, fontFamily: "inherit", borderRadius: 8, cursor: "pointer", background: duplicateMarket === m ? t.accentBg : t.bg3, border: `1px solid ${duplicateMarket === m ? t.accent : t.border}`, color: duplicateMarket === m ? t.accent : t.text2, fontWeight: duplicateMarket === m ? "bold" : "normal" }}
                >{m}</button>
              ))}
            </div>

            {/* Zero values toggle */}
            <div
              onClick={() => setDuplicateZero((v) => !v)}
              style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 14, background: t.bg3, borderRadius: 10, cursor: "pointer", marginBottom: 20, border: `1px solid ${duplicateZero ? t.accent : t.border}` }}
            >
              <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${duplicateZero ? t.accent : t.bg4}`, background: duplicateZero ? t.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: t.accentText, flexShrink: 0, marginTop: 1 }}>
                {duplicateZero ? "✓" : ""}
              </div>
              <div>
                <div style={{ fontSize: fs - 1, color: duplicateZero ? t.accent : t.text, fontWeight: duplicateZero ? "bold" : "normal" }}>
                  Zerar todos os valores
                </div>
                <div style={{ fontSize: fs - 4, color: t.text3, marginTop: 3, lineHeight: 1.5 }}>
                  Itens copiados com preço R$0,00 para preencher na hora das compras
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                onClick={() => setDuplicateSource(null)}
                style={{ padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancelar
              </button>
              <button onClick={doDuplicate} style={primaryBtn}>⧉ DUPLICAR</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
