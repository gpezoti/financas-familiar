const STORAGE_KEY = "gui-eve-finance-empty-v8";
const LEGACY_STORAGE_KEYS = [
  "gui-eve-finance-v1",
  "gui-eve-finance-empty-v2",
  "gui-eve-finance-empty-v3",
  "gui-eve-finance-empty-v4",
  "gui-eve-finance-empty-v5",
  "gui-eve-finance-empty-v6",
  "gui-eve-finance-empty-v7",
];
const TOTAL_MATCH_TOLERANCE_CENTS = 1;
const FINANCED_BALANCE_LABEL = "Saldo financiado (fatura anterior)";
const ADJUSTMENT_LABEL = "Ajuste da fatura (não detalhado no PDF)";
const PDF_COLUMN_SPLIT_FALLBACK = 330;
const SUPABASE_URL = "https://wwqylztfvgjauiwxieii.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cXlsenRmdmdqYXVpd3hpZWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyODg5NzMsImV4cCI6MjA5NDg2NDk3M30.WhqanwDQUlOihRIGK4ZPp06vHD2mJTCrVbqiZuKkSo8";
const CLOUD_TABLE = "finance_states";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const ownerLabels = {
  gui: "Gui",
  eve: "Eve",
  both: "Ambos",
  manual: "Manual",
};

const monthLabels = [
  ["2026-05", "Maio 26"],
  ["2026-06", "Junho 26"],
  ["2026-07", "Julho 26"],
  ["2026-08", "Agosto 26"],
  ["2026-09", "Setembro 26"],
  ["2026-10", "Outubro 26"],
  ["2026-11", "Novembro 26"],
  ["2026-12", "Dezembro 26"],
];

const fixedMayBills = [
  bill("4", "DME", 436.52, true),
  bill("5", "Angélica", 480, true),
  bill("5", "Contador", 200, true),
  bill("5", "Angra 4/6", 300, true),
  bill("7", "Chile 4/6", 515, true),
  bill("10", "Enrico", 400, true),
  bill("6", "Escola", 687.65, true),
  bill("11", "Personal", 157, true),
  bill("15", "Internet", 121, true),
  bill("17", "Song", 4038, true),
  bill("21", "Imposto", 0, false),
  bill("22", "Cartão", 0, true, "card"),
  bill("25", "Unimed", 1010.94, true),
  bill("27", "Condomínio", 450, true),
  bill("28", "Aluguel", 2183, true),
  bill("29", "Dolphin", 1632, true),
  bill("25", "Moveis 4/10", 985, true),
  bill("", "Gastos aleatórios", 188, true),
];

const defaultMonthlyIncomes = [
  incomeEntry("Solvace", 12078.69, true),
  incomeEntry("Ioasys", 12000, true),
];

const visibleMayCardItems = [
  tx("Azul", "PAULO SERGIO V 04/08", 674.5, "gui"),
  tx("Porto", "PBKIDS BRINQUEDOS 04/06", 55.84, "gui"),
  tx("Azul", "Vivara lojaviv 04/10", 358, "gui"),
  tx("Porto", "Meucell 07/10 CANAS", 1070, "gui"),
  tx("Azul", "InstitutoDrJose 09/10", 890, "gui"),
  tx("Porto", "PAYGO*SARAH MEDICIN 05/05", 337.96, "gui"),
  tx("Azul", "MERCADOLIVRE*PROTE09/09", 31.53, "gui"),
  tx("Porto", "ONF *onhapp 08/10", 252.9, "gui"),
  tx("Azul", "SHOPPING CENTER IG08/10", 74.06, "gui"),
  tx("Porto", "EBIESCOLAS BILINGUE 05/10", 66.23, "gui"),
  tx("Azul", "PEH MOVEIS E DECOR08/12", 174, "gui"),
  tx("Porto", "PORTO SEGURO AUTO PA/12", 201.99, "gui"),
  tx("Azul", "AMAZON MARKETPLACE06/10", 50.43, "gui"),
  tx("Porto", "PETZ DIGITAL 03/03", 123.84, "gui"),
  tx("Azul", "MERCADOLIVRE*MERCA06/07", 201.3, "gui"),
  tx("Porto", "SARAH MEDICIN 03/04", 294.28, "gui"),
  tx("Azul", "STARGAMES 3 06/10", 223.88, "gui"),
  tx("Porto", "CACAU SHOW 03/03", 67.96, "gui"),
  tx("Azul", "DROGARIA ARAUJO 05/06", 761.7, "both"),
  tx("Porto", "CASAS BAHIA S 03/10", 232.89, "gui"),
  tx("Azul", "NETFLIX ENTRETENIMENTO", 72.8, "gui"),
  tx("Porto", "SUPERMERCADO SAN MI 02/03", 90.81, "both"),
  tx("Azul", "APPLE.COM/BILL", 70, "gui"),
  tx("Porto", "SUPERMERCADOS SAN M 02/03", 158.77, "both"),
  tx("Azul", "AMAZON MARKETPLACE05/10", 117.8, "gui"),
  tx("Porto", "SLD SUPLEMENTOS POC 02/02", 110, "gui"),
  tx("Azul", "SNOWLAND PARTICIPA05/06", 108.39, "gui"),
  tx("Porto", "MERCADOLIVRE MERCAD 06/10", 279.11, "gui"),
  tx("Azul", "AMAZONMKTPLC*WEBFX05/05", 33.43, "gui"),
  tx("Azul", "BN *SONYPLAYSTATN", 79.59, "gui"),
  tx("Azul", "Amazon Ad free for Prim", 10, "gui"),
  tx("Azul", "DL *GOOGLE YouTubePrem", 26.9, "gui"),
  tx("Azul", "MERCADOLIVRE*COMCL05/07", 75.88, "gui"),
  tx("Azul", "MP*MELIMAIS", 9.9, "gui"),
  tx("Azul", "TOKIO MARINE*AUTO", 354.01, "gui"),
  tx("Azul", "onhap07/10", 298.6, "gui"),
  tx("Azul", "ANUIDADE DIFERENCI12/12", 52.5, "gui"),
  tx("Azul", "EBN*SONYPLAYST 04/04", 43.97, "gui"),
  tx("Azul", "DO RE MI 04/04", 32.52, "gui"),
  tx("Azul", "AmazonPrimeBR", 19.9, "gui"),
  tx("Azul", "SUPERMERCADO S 03/03", 86.62, "both"),
  tx("Azul", "DROGASIL1183PO 03/03", 140.11, "both"),
  tx("Azul", "MERCADOLIVRE*M 03/05", 29.74, "gui"),
  tx("Azul", "AMAZONMKTPLC*H 03/05", 30.98, "gui"),
  tx("Azul", "Col Bat*RBEROB 03/08", 59.75, "gui"),
  tx("Azul", "SUPERMERCADOS 03/03", 79.1, "both"),
  tx("Azul", "HOTEIS.COMHOTE 02/10", 88.19, "gui"),
  tx("Azul", "PETZ DIGITALEM 02/03", 145.95, "gui"),
  tx("Azul", "VICTO 02/02", 149.6, "gui"),
  tx("Azul", "SLD SUPLEMENTO 02/02", 80, "gui"),
  tx("Azul", "CHOCOLATARIA E 02/02", 148.49, "gui"),
  tx("Azul", "SUPERMERCADOS 02/02", 113.49, "both"),
  tx("Azul", "Saldo fatura Eve - Azul", 8330.12, "eve", "balance"),
  tx("Porto", "Saldo fatura Eve - Porto", 10776.83, "eve", "balance"),
];

const seedSummaries = {
  "2026-01": {
    label: "Janeiro 26",
    income: 34137.5,
    balance: 6311.65,
    cardSummary: { Azul: { gui: 4881, eve: 8317.57 }, Porto: { gui: 8282.43, eve: 11539.38 } },
  },
  "2026-02": {
    label: "Fevereiro 26",
    income: 26597.34,
    balance: 4267.15,
    cardSummary: { Azul: { gui: 4706.76, eve: 6622.17 }, Porto: { gui: 3016.75, eve: 9522.71 } },
  },
  "2026-03": {
    label: "Março 26",
    income: 26597.34,
    balance: 1400.03,
    cardSummary: { Azul: { gui: 4801.75, eve: 9934.76 }, Porto: { gui: 2975.88, eve: 10821.82 } },
  },
  "2026-04": {
    label: "Abril 26",
    income: 26597.34,
    balance: 563.59,
    cardSummary: { Azul: { gui: 5924.23, eve: 10513.88 }, Porto: { gui: 2496.98, eve: 10858.32 } },
  },
  "2026-05": {
    label: "Maio 26",
    income: 24078.69,
    balance: 5533.16,
    cardSummary: { Azul: { gui: 2998.81, eve: 8330.12 }, Porto: { gui: 1762.62, eve: 10776.83 } },
  },
  "2026-07": {
    label: "Julho 26",
    income: 24078.69,
    balance: 7709.13,
    cardSummary: { Azul: { gui: 1339.44, eve: 9989.49 }, Porto: { gui: 914.81, eve: 11624.64 } },
  },
  "2026-08": {
    label: "Agosto 26",
    income: 24078.69,
    balance: 6996.62,
    cardSummary: { Azul: { gui: 1350.6, eve: 9978.32 }, Porto: { gui: 669.11, eve: 11870.34 } },
  },
};

// Algumas faturas (Porto) listam o pagamento da fatura anterior dentro dos
// lançamentos e o embutem no total; outras (Itaú) mantêm um bloco separado.
let importAllowsPayments = false;
let currentMonth = "2026-05";
let currentCard = "Azul";
let state = loadState();
let supabaseClient = null;
let currentUser = null;
let cloudSaveTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  wireEvents();
  initializeCloudSync();
  render();
});

function bill(day, description, amount, paid = false, source = "manual") {
  return {
    id: crypto.randomUUID(),
    day,
    description,
    amount,
    paid,
    source,
  };
}

function incomeEntry(description, amount, received = false, day = "") {
  return {
    id: crypto.randomUUID(),
    day,
    description,
    amount,
    received,
  };
}

function tx(card, description, amount, owner = "manual", source = "seed", date = "") {
  return {
    id: crypto.randomUUID(),
    card,
    date,
    description,
    amount,
    owner,
    source,
    reviewed: owner !== "manual",
    status: owner === "manual" ? "manual" : source === "projection" ? "projected" : "auto",
  };
}

function loadState() {
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return migrateState(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const months = Object.fromEntries(
    monthLabels.map(([key, label]) => [
      key,
      {
        label,
        income: 0,
        balance: null,
        incomes: defaultIncomesForMonth(key),
        bills: defaultBillsForMonth(key),
        transactions: [],
        statementTotals: { Azul: null, Porto: null },
        cardSummary: null,
      },
    ]),
  );

  const initial = {
    months,
    rules: [],
    updatedAt: new Date().toISOString(),
  };
  projectFutureInstallments(initial);
  return initial;
}

function migrateState(nextState) {
  monthLabels.forEach(([key]) => {
    const month = ensureMonth(key, nextState);
    month.statementTotals = month.statementTotals ?? { Azul: null, Porto: null };
    if (!Array.isArray(month.incomes)) {
      month.incomes = month.income ? [incomeEntry("Entrada", Number(month.income) || 0, true)] : defaultIncomesForMonth(key);
    }
    if (!Array.isArray(month.bills) || !month.bills.length) {
      month.bills = defaultBillsForMonth(key);
    }

    const cardBill = month.bills.find(isCardBill);
    if (cardBill) {
      cardBill.source = "card";
      cardBill.amount = 0;
    }
  });

  return nextState;
}

function defaultBillsForMonth(monthKey) {
  return (monthKey === "2026-05" ? fixedMayBills : projectedBillsFor(monthKey)).map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));
}

function defaultIncomesForMonth(monthKey) {
  return defaultMonthlyIncomes.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
    received: monthKey === "2026-05",
  }));
}

function saveState() {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleCloudSave();
}

function wireEvents() {
  document.getElementById("monthSelect").addEventListener("change", (event) => {
    currentMonth = event.target.value;
    render();
  });

  document.getElementById("azulInput").addEventListener("change", (event) => {
    importStatement(event.target.files[0], "Azul");
    event.target.value = "";
  });

  document.getElementById("portoInput").addEventListener("change", (event) => {
    importStatement(event.target.files[0], "Porto");
    event.target.value = "";
  });

  document.getElementById("undoImportBtn").addEventListener("click", undoImportForMonth);

  document.getElementById("addTransactionBtn").addEventListener("click", () => {
    ensureMonth(currentMonth).transactions.unshift(tx(currentCard, "Novo gasto", 0, "manual", "manual"));
    saveState();
    render();
  });

  document.getElementById("addBillBtn").addEventListener("click", () => {
    ensureMonth(currentMonth).bills.unshift(bill("", "Nova conta", 0, false));
    saveState();
    render();
  });

  document.getElementById("addIncomeBtn").addEventListener("click", () => {
    ensureMonth(currentMonth).incomes.unshift(incomeEntry("Nova entrada", 0, false));
    saveState();
    render();
  });

  document.getElementById("recalculateBtn").addEventListener("click", () => {
    projectFutureInstallments(state);
    saveState();
    render();
  });

  document.getElementById("saveSnapshotBtn").addEventListener("click", async () => {
    saveState();
    if (currentUser) await saveCloudState();
    setFeedback(currentUser ? "Tudo salvo neste navegador e na nuvem." : "Tudo salvo neste navegador.");
  });

  document.getElementById("sendLoginBtn").addEventListener("click", sendLoginLink);
  document.getElementById("loadCloudBtn").addEventListener("click", loadCloudState);
  document.getElementById("saveCloudBtn").addEventListener("click", saveCloudState);
  document.getElementById("signOutBtn").addEventListener("click", signOutCloud);

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (!confirm("Restaurar a base inicial e apagar alterações locais?")) return;
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    render();
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab, .view").forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.view).classList.add("active");
    });
  });

  document.querySelectorAll("[data-card-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      currentCard = button.dataset.cardTab;
      renderTransactions();
    });
  });
}

async function initializeCloudSync() {
  const client = getSupabaseClient();
  updateSyncButtons();

  if (!client) {
    setSyncStatus("Supabase ainda sem chave publica. Cole a anon public key em app.js para ativar celular.");
    return;
  }

  const { data } = await client.auth.getSession();
  currentUser = data.session?.user ?? null;
  updateSyncButtons();
  setSyncStatus(currentUser ? `Logado como ${currentUser.email}.` : "Digite seu e-mail para receber o link de acesso.");

  client.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user ?? null;
    updateSyncButtons();
    setSyncStatus(currentUser ? `Logado como ${currentUser.email}.` : "Sessao encerrada.");
  });
}

function getSupabaseClient() {
  if (typeof window === "undefined" || !SUPABASE_URL || !SUPABASE_ANON_KEY || !window.supabase?.createClient) return null;
  if (!supabaseClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

async function sendLoginLink() {
  const client = getSupabaseClient();
  if (!client) {
    setSyncStatus("Supabase nao configurado. Falta colar a anon public key em app.js.");
    return;
  }

  const email = document.getElementById("syncEmail").value.trim();
  if (!email) {
    setSyncStatus("Digite seu e-mail para enviar o link de acesso.");
    return;
  }

  const { error } = await client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.href.split("#")[0] },
  });
  setSyncStatus(error ? `Erro ao enviar link: ${error.message}` : "Link enviado. Abra o e-mail neste aparelho.");
}

async function loadCloudState() {
  const client = getSupabaseClient();
  const user = await requireCloudUser(client);
  if (!user) return;

  const { data, error } = await client.from(CLOUD_TABLE).select("state, updated_at").eq("user_id", user.id).maybeSingle();
  if (error) {
    setSyncStatus(`Erro ao carregar nuvem: ${error.message}`);
    return;
  }

  if (!data?.state) {
    setSyncStatus("Nao ha dados salvos na nuvem para este usuario.");
    return;
  }

  state = migrateState(data.state);
  saveState();
  render();
  setSyncStatus(`Dados carregados da nuvem. Ultima atualizacao: ${formatSyncDate(data.updated_at)}.`);
}

async function saveCloudState() {
  const client = getSupabaseClient();
  const user = await requireCloudUser(client);
  if (!user) return;

  const payload = {
    user_id: user.id,
    state,
    updated_at: new Date().toISOString(),
  };
  const { error } = await client.from(CLOUD_TABLE).upsert(payload, { onConflict: "user_id" });
  setSyncStatus(error ? `Erro ao salvar nuvem: ${error.message}` : "Dados salvos na nuvem.");
}

async function signOutCloud() {
  const client = getSupabaseClient();
  if (!client) return;
  await client.auth.signOut();
  currentUser = null;
  updateSyncButtons();
  setSyncStatus("Sessao encerrada neste aparelho.");
}

async function requireCloudUser(client) {
  if (!client) {
    setSyncStatus("Supabase nao configurado. Falta colar a anon public key em app.js.");
    return null;
  }

  const { data, error } = await client.auth.getUser();
  if (error || !data.user) {
    setSyncStatus("Entre pelo link de e-mail antes de usar a nuvem.");
    return null;
  }

  currentUser = data.user;
  updateSyncButtons();
  return data.user;
}

function scheduleCloudSave() {
  if (!currentUser || !getSupabaseClient()) return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(() => {
    saveCloudState();
  }, 900);
}

function updateSyncButtons() {
  const configured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase?.createClient);
  const logged = Boolean(currentUser);
  const loginButton = document.getElementById("sendLoginBtn");
  const loadButton = document.getElementById("loadCloudBtn");
  const saveButton = document.getElementById("saveCloudBtn");
  const signOutButton = document.getElementById("signOutBtn");
  if (!loginButton) return;

  loginButton.disabled = !configured || logged;
  loadButton.disabled = !configured || !logged;
  saveButton.disabled = !configured || !logged;
  signOutButton.disabled = !configured || !logged;
}

function setSyncStatus(message) {
  const element = document.getElementById("syncStatus");
  if (element) element.textContent = message;
}

function formatSyncDate(value) {
  if (!value) return "sem data";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function render() {
  renderMonthSelect();
  renderSummary();
  renderBreakdown();
  renderTransactions();
  renderIncomes();
  renderBills();
  renderProjection();
}

function renderMonthSelect() {
  const select = document.getElementById("monthSelect");
  select.innerHTML = monthLabels
    .map(([key, label]) => `<option value="${key}" ${key === currentMonth ? "selected" : ""}>${label}</option>`)
    .join("");
}

function renderSummary() {
  const totals = calculateMonthTotals(currentMonth);
  document.getElementById("guiTotal").textContent = currency.format(totals.guiPayable);
  document.getElementById("eveTotal").textContent = currency.format(totals.evePayable);
  document.getElementById("sharedTotal").textContent = currency.format(totals.both);
  document.getElementById("manualCount").textContent = String(totals.manualCount);
}

function renderBreakdown() {
  const root = document.getElementById("cardBreakdown");
  const totals = calculateMonthTotals(currentMonth);
  const cards = ["Azul", "Porto"];

  root.innerHTML =
    cards
      .map((card) => {
        const cardTotals = totals.cards[card] ?? emptyTotals();
        const statementTotal = totals.statementTotals?.[card];
        const difference = statementTotal ? (toCents(cardTotals.total) - toCents(statementTotal)) / 100 : null;
        return `
          <article class="breakdown-card">
            <h3>${card}</h3>
            ${line("Gui", cardTotals.gui)}
            ${line("Eve", cardTotals.eve)}
            ${line("Ambos", cardTotals.both)}
            ${line("Itens lidos", cardTotals.total)}
            ${statementTotal ? line("Total da fatura", statementTotal) : ""}
            ${difference ? line("Diferença", difference) : ""}
          </article>
        `;
      })
      .join("") +
    `
      <article class="breakdown-card">
        <h3>Consolidado</h3>
        ${line("Gui + 50% juntos", totals.guiPayable)}
        ${line("Eve + 50% juntos", totals.evePayable)}
        ${line("Total faturas", totals.exactTotal)}
      </article>
    `;
}

function renderTransactions() {
  const root = document.getElementById("transactionList");
  renderCardTabs();

  const transactions = ensureMonth(currentMonth).transactions.filter((item) => item.card === currentCard);
  if (!transactions.length) {
    root.innerHTML = emptyState();
    return;
  }

  root.innerHTML = transactions.map(renderTransactionRow).join("");
  root.querySelectorAll("[data-tx-field]").forEach((input) => {
    input.addEventListener("input", updateTransactionFromInput);
  });
  root.querySelectorAll("[data-owner]").forEach((button) => {
    button.addEventListener("click", () => updateOwner(button.dataset.id, button.dataset.owner));
  });
  root.querySelectorAll("[data-remove-tx]").forEach((button) => {
    button.addEventListener("click", () => removeTransaction(button.dataset.removeTx));
  });
  root.querySelectorAll("[data-reviewed]").forEach((input) => {
    input.addEventListener("change", () => updateReviewed(input.dataset.reviewed, input.checked));
  });
}

function renderCardTabs() {
  const month = ensureMonth(currentMonth);
  document.querySelectorAll("[data-card-tab]").forEach((button) => {
    const card = button.dataset.cardTab;
    const count = month.transactions.filter((item) => item.card === card).length;
    const itemsTotal = month.transactions
      .filter((item) => item.card === card)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const total = month.statementTotals?.[card] ?? itemsTotal;

    button.classList.toggle("active", card === currentCard);
    button.textContent = `${card} (${count}) - ${currency.format(total)}`;
  });
}

function renderTransactionRow(item) {
  const status = item.status === "manual" ? "manual" : item.status === "projected" ? "projected" : "auto";
  const statusLabel = status === "manual" ? "Decidir" : status === "projected" ? "Projetado" : "Auto";
  return `
    <article class="transaction-row">
      <select data-tx-field="card" data-id="${item.id}">
        ${["Azul", "Porto"].map((card) => `<option ${card === item.card ? "selected" : ""}>${card}</option>`).join("")}
      </select>
      <input type="text" value="${escapeAttr(item.date ?? "")}" placeholder="Data" data-tx-field="date" data-id="${item.id}" aria-label="Data da cobrança" />
      <input type="text" value="${escapeAttr(item.description)}" data-tx-field="description" data-id="${item.id}" />
      <input type="number" step="0.01" value="${Number(item.amount).toFixed(2)}" data-tx-field="amount" data-id="${item.id}" />
      <div class="segmented" role="group" aria-label="Responsável">
        ${["gui", "eve", "both"].map((owner) => ownerButton(item, owner)).join("")}
      </div>
      <span class="status ${status}">${statusLabel}</span>
      <label class="check-cell">
        <input type="checkbox" ${item.reviewed ? "checked" : ""} data-reviewed="${item.id}" />
        OK
      </label>
      <button class="ghost small" data-remove-tx="${item.id}">Remover</button>
    </article>
  `;
}

function renderBills() {
  const root = document.getElementById("billList");
  const month = ensureMonth(currentMonth);
  const bills = month.bills;
  if (!bills.length) {
    root.innerHTML = emptyState();
    renderAccountsSummary();
    return;
  }

  root.innerHTML = bills.map((item) => renderBillRow(item, currentMonth)).join("");
  root.querySelectorAll("[data-bill-field]").forEach((input) => {
    input.addEventListener("input", updateBillFromInput);
  });
  root.querySelectorAll("[data-bill-paid]").forEach((input) => {
    input.addEventListener("change", () => {
      const item = findBill(input.dataset.billPaid);
      item.paid = input.checked;
      saveState();
      renderSummary();
      renderAccountsSummary();
      renderProjection();
    });
  });
  root.querySelectorAll("[data-remove-bill]").forEach((button) => {
    button.addEventListener("click", () => removeBill(button.dataset.removeBill));
  });
  renderAccountsSummary();
}

function renderBillRow(item, monthKey) {
  const cardBill = isCardBill(item);
  const amount = getBillAmount(item, monthKey);
  return `
    <article class="bill-row ${cardBill ? "calculated" : ""}">
      <input type="text" value="${escapeAttr(item.day)}" data-bill-field="day" data-id="${item.id}" aria-label="Dia" />
      <input type="text" value="${escapeAttr(item.description)}" data-bill-field="description" data-id="${item.id}" />
      <input type="number" min="0" step="0.01" value="${Number(amount).toFixed(2)}" data-bill-field="amount" data-id="${item.id}" ${cardBill ? "disabled" : ""} />
      <label class="check-cell">
        <input type="checkbox" ${item.paid ? "checked" : ""} data-bill-paid="${item.id}" />
        Paga
      </label>
      <button class="ghost small" data-remove-bill="${item.id}" ${cardBill ? "disabled" : ""}>Remover</button>
    </article>
  `;
}

function renderIncomes() {
  const root = document.getElementById("incomeList");
  const incomes = ensureMonth(currentMonth).incomes ?? [];
  if (!incomes.length) {
    root.innerHTML = emptyState();
    return;
  }

  root.innerHTML = incomes.map(renderIncomeRow).join("");
  root.querySelectorAll("[data-income-field]").forEach((input) => {
    input.addEventListener("input", updateIncomeFromInput);
  });
  root.querySelectorAll("[data-income-received]").forEach((input) => {
    input.addEventListener("change", () => {
      const item = findIncome(input.dataset.incomeReceived);
      item.received = input.checked;
      saveState();
      renderAccountsSummary();
      renderProjection();
    });
  });
  root.querySelectorAll("[data-remove-income]").forEach((button) => {
    button.addEventListener("click", () => removeIncome(button.dataset.removeIncome));
  });
}

function renderIncomeRow(item) {
  return `
    <article class="income-row">
      <input type="text" value="${escapeAttr(item.day ?? "")}" data-income-field="day" data-id="${item.id}" aria-label="Dia da entrada" />
      <input type="text" value="${escapeAttr(item.description)}" data-income-field="description" data-id="${item.id}" />
      <input type="number" min="0" step="0.01" value="${Number(item.amount).toFixed(2)}" data-income-field="amount" data-id="${item.id}" />
      <label class="check-cell">
        <input type="checkbox" ${item.received ? "checked" : ""} data-income-received="${item.id}" />
        Recebida
      </label>
      <button class="ghost small" data-remove-income="${item.id}">Remover</button>
    </article>
  `;
}

function renderAccountsSummary() {
  const root = document.getElementById("accountsSummary");
  if (!root) return;
  const summary = calculateAccountsSummary(currentMonth);
  root.innerHTML = `
    <article class="account-total ${summary.balance >= 0 ? "positive" : "negative"}">
      <span>Entradas</span>
      <strong>${currency.format(summary.incomeTotal)}</strong>
    </article>
    <article class="account-total">
      <span>Contas pagas</span>
      <strong>${currency.format(summary.paidTotal)}</strong>
    </article>
    <article class="account-total warning">
      <span>Falta pagar</span>
      <strong>${currency.format(summary.pendingTotal)}</strong>
    </article>
    <article class="account-total">
      <span>Total de contas</span>
      <strong>${currency.format(summary.billsTotal)}</strong>
    </article>
    <article class="account-total ${summary.balance >= 0 ? "positive" : "negative"}">
      <span>Saldo final</span>
      <strong>${currency.format(summary.balance)}</strong>
    </article>
  `;
}

function renderProjection() {
  const root = document.getElementById("projectionList");
  root.innerHTML = monthLabels
    .filter(([key]) => key >= currentMonth)
    .slice(0, 6)
    .map(([key, label]) => {
      const totals = calculateMonthTotals(key);
      return `
        <article class="projection-card">
          <h3>${label}</h3>
          ${line("Gui", totals.guiPayable)}
          ${line("Eve", totals.evePayable)}
          ${line("Juntos", totals.both)}
          ${line("Faturas", totals.exactTotal)}
          ${line("Contas + cartão Gui", calculateBillsTotal(key))}
          ${line("Saldo do mês", calculateAccountsSummary(key).balance)}
          <p class="muted">${totals.manualCount} gasto(s) pendente(s)</p>
        </article>
      `;
    })
    .join("");
}

function line(label, amount) {
  return `<div class="breakdown-line"><span>${label}</span><strong>${currency.format(amount || 0)}</strong></div>`;
}

function ownerButton(item, owner) {
  return `<button class="${item.owner === owner ? "active" : ""}" data-owner="${owner}" data-id="${item.id}">${ownerLabels[owner]}</button>`;
}

async function importStatement(file, card) {
  if (!file) return;
  try {
    const importData = await readFileData(file);
    const rows = importData.rows;
    importAllowsPayments = Boolean(importData.allowPayments);
    const imported = normalizeImportedRows(rows, card);
    if (!imported.length) {
      setFeedback(`Não encontrei lançamentos úteis em ${file.name}. Confira se a fatura tem descrição e valor.`);
      return;
    }

    const importedTotal = imported.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const chargesTotal = importData.currentChargesTotal ?? importData.statementTotal;
    const adjustment = resolveStatementAdjustment(importedTotal, chargesTotal);
    if (adjustment === null) {
      setFeedback(
        `Importação de ${file.name} cancelada: a soma dos itens (${currency.format(importedTotal)}) não bate com o total oficial (${currency.format(chargesTotal)}). Nada foi importado.`,
      );
      return;
    }
    if (adjustment !== 0) {
      imported.push({ ...tx(card, ADJUSTMENT_LABEL, adjustment, "manual", "import", ""), occurrence: 0 });
    }

    const financedBalance = Number(importData.financedBalance || 0);
    if (financedBalance > 0) {
      imported.push({
        ...tx(card, FINANCED_BALANCE_LABEL, financedBalance, "manual", "import", ""),
        occurrence: 0,
      });
    }

    const targetMonth = resolveStatementMonth(importData.statementMonth);
    const month = ensureMonth(targetMonth);
    month.statementTotals = month.statementTotals ?? { Azul: null, Porto: null };
    if (importData.statementTotal) month.statementTotals[card] = importData.statementTotal;

    // A fatura real substitui as parcelas que tinham sido projetadas para este mês;
    // sem isso cada parcela apareceria duas vezes (a projeção e o lançamento real).
    const replacedProjections = month.transactions.filter(isProjectionOfCard(card)).length;
    month.transactions = month.transactions.filter((item) => !isProjectionOfCard(card)(item));

    const before = month.transactions.length;
    let skipped = 0;
    let added = 0;

    imported.forEach((item) => {
      const classified = classifyTransaction(item);
      if (hasDuplicateTransaction(month, classified)) {
        skipped += 1;
        return;
      }

      month.transactions.push(classified);
      rememberRule(classified);
      added += 1;
    });

    currentMonth = targetMonth;
    projectFutureInstallments(state);
    saveState();
    render();
    const totalMessage = importData.statementTotal
      ? ` Total da fatura lido: ${currency.format(importData.statementTotal)}. Itens lidos: ${currency.format(importedTotal)}.` +
        (financedBalance > 0
          ? ` Saldo financiado da fatura anterior: ${currency.format(financedBalance)} (lançado como item separado).`
          : "")
      : ` Itens lidos: ${currency.format(importedTotal)}.`;
    const adjustmentMessage = adjustment
      ? ` A fatura não detalha ${currency.format(Math.abs(adjustment))} dos lançamentos; a diferença entrou como "${ADJUSTMENT_LABEL}".`
      : "";
    const projectionMessage = replacedProjections
      ? ` ${replacedProjections} parcela(s) projetada(s) foram substituídas pelos lançamentos reais.`
      : "";
    setFeedback(
      `${added} lançamento(s) importado(s) da fatura ${card} em ${monthLabelFor(targetMonth)}. ${skipped} duplicado(s) ignorado(s). Total agora: ${before + added}.${totalMessage}${adjustmentMessage}${projectionMessage}`,
    );
  } catch (error) {
    setFeedback(`Falha ao importar ${file.name}: ${error.message}`);
  }
}

// Retorna 0 quando fecha, o valor do ajuste quando o usuário aceita importar com
// diferença, e null quando ele cancela (nada é importado).
function resolveStatementAdjustment(importedTotal, chargesTotal) {
  if (chargesTotal === null || chargesTotal === undefined) return 0;

  const differenceCents = toCents(importedTotal) - toCents(chargesTotal);
  if (Math.abs(differenceCents) <= TOTAL_MATCH_TOLERANCE_CENTS) return 0;

  const accepted = window.confirm(
    `A soma dos lançamentos lidos (${currency.format(importedTotal)}) não bate com o total oficial da fatura (${currency.format(
      chargesTotal,
    )}).\n\nDiferença: ${currency.format(differenceCents / 100)}.\n\nIsso acontece quando o PDF do banco não detalha todos os lançamentos. Clique OK para importar e registrar a diferença como "${ADJUSTMENT_LABEL}" (o total do cartão fecha com o boleto), ou Cancelar para não importar nada.`,
  );
  if (!accepted) return null;

  return -differenceCents / 100;
}

function isProjectionOfCard(card) {
  return (item) => item.source === "projection" && item.card === card;
}

function monthLabelFor(monthKey) {
  return monthLabels.find(([key]) => key === monthKey)?.[1] ?? monthKey;
}

// A fatura sempre entra no mês do próprio vencimento, não no mês que estiver
// selecionado na tela — era isso que fazia a fatura de agosto cair em maio.
function resolveStatementMonth(statementMonth) {
  if (!statementMonth) return currentMonth;
  return monthLabels.some(([key]) => key === statementMonth) ? statementMonth : currentMonth;
}

function extractStatementMonthFromLines(lines) {
  for (const line of lines) {
    if (!/vencimento/.test(compactNormalizedText(line))) continue;
    const match = String(line).match(/\b(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})\b/);
    if (!match) continue;
    return `${match[3]}-${String(Number(match[2])).padStart(2, "0")}`;
  }
  return null;
}

function undoImportForMonth() {
  const month = ensureMonth(currentMonth);
  const importedItems = month.transactions.filter((item) => item.source === "import");

  if (!importedItems.length) {
    setFeedback(`Não há lançamentos importados em ${monthLabelFor(currentMonth)} para desfazer.`);
    return;
  }

  const confirmed = window.confirm(
    `Remover ${importedItems.length} lançamento(s) importado(s) de ${monthLabelFor(currentMonth)}? Lançamentos manuais não são afetados.`,
  );
  if (!confirmed) return;

  month.transactions = month.transactions.filter((item) => item.source !== "import");
  month.statementTotals = { Azul: null, Porto: null };
  projectFutureInstallments(state);
  saveState();
  render();
  setFeedback(
    `${importedItems.length} lançamento(s) importado(s) removido(s) de ${monthLabelFor(currentMonth)}. Restaram ${month.transactions.length}.`,
  );
}

async function readFileData(file) {
  const isPdf = /\.pdf$/i.test(file.name);
  const isExcel = /\.(xlsx|xls)$/i.test(file.name);
  if (isPdf) return readPdfData(file);

  if (isExcel) {
    if (!window.XLSX) throw new Error("biblioteca XLSX não carregou; exporte a fatura em CSV e tente novamente");
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: false, defval: "" });
    return { rows, statementTotal: extractStatementTotalFromRows(rows) };
  }

  const text = await file.text();
  const rows = parseCsv(text);
  return { rows, statementTotal: extractStatementTotalFromRows(rows) };
}

async function readPdfData(file) {
  if (!window.pdfjsLib) {
    throw new Error("leitor de PDF não carregou; exporte a fatura em CSV/XLSX ou abra com internet");
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    pdfjsLib.GlobalWorkerOptions.workerSrc ||
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const lines = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    lines.push(...groupPdfTextLines(content.items));
  }

  const normalizedLines = normalizePdfChargeLines(lines);
  const summary = extractStatementSummaryFromLines(normalizedLines);
  const statementTotal = summary.statementTotal;
  if (statementTotal === null) {
    throw new Error("leitura bloqueada: não encontrei o total oficial da fatura no PDF");
  }

  // A soma dos lançamentos só fecha com o "total desta fatura" quando não há saldo
  // financiado/rotativo vindo da fatura anterior. Quando a fatura traz o subtotal
  // "total dos lançamentos atuais", é ele que serve de âncora para a conferência.
  const currentChargesTotal = summary.currentChargesTotal ?? statementTotal;

  // Quando a fatura publica o subtotal "total dos lançamentos atuais" (Itaú), esse
  // subtotal NÃO inclui os pagamentos da fatura anterior, então as linhas de
  // pagamento ficam de fora. Quando a âncora é o total da fatura (Porto), o total
  // já vem líquido dos pagamentos e essas linhas precisam entrar.
  const preferPayments = summary.currentChargesTotal === null;

  importAllowsPayments = true;
  const chargeLines = filterCurrentChargeLines(normalizedLines);

  const variants = [preferPayments, !preferPayments].map((allowPayments) => {
    importAllowsPayments = allowPayments;
    const rows = chargeLines.map(parsePdfLineToRow).filter(Boolean);
    return { allowPayments, rows, total: sumRowsAmount(rows) };
  });

  const exact = variants.find(
    (variant) => Math.abs(toCents(variant.total) - toCents(currentChargesTotal)) <= TOTAL_MATCH_TOLERANCE_CENTS,
  );
  const chosen = exact ?? variants[0];
  importAllowsPayments = chosen.allowPayments;

  if (!chosen.rows.length) {
    throw new Error("não encontrei texto de lançamentos no PDF; se for imagem/escaneado, envie CSV ou Excel");
  }

  return {
    rows: chosen.rows,
    allowPayments: chosen.allowPayments,
    statementTotal,
    currentChargesTotal,
    financedBalance: summary.financedBalance,
    statementMonth: extractStatementMonthFromLines(normalizedLines),
  };
}

function groupPdfTextLines(items) {
  const visibleItems = items.filter((item) => item.str && item.str.trim());
  const columnSplit = detectPdfColumnSplit(visibleItems);
  const lines = [];

  visibleItems.forEach((item) => {
    const x = item.transform?.[4] ?? 0;
    const y = item.transform?.[5] ?? 0;
    const column = columnSplit === null ? 0 : Number(x >= columnSplit);
    let line = lines.find((candidate) => candidate.column === column && Math.abs(candidate.y - y) <= 6);

    if (!line) {
      line = { column, y, parts: [] };
      lines.push(line);
    }

    line.parts.push({ x, text: item.str.trim() });
  });

  return lines
    .flatMap((line) =>
      splitPdfLineParts(line.parts).map((segment) => ({
        ...segment,
        y: line.y,
        column: columnSplit === null ? pdfColumnBucket(segment.x) : line.column,
      })),
    )
    .sort((a, b) => {
      const columnDifference = a.column - b.column;
      if (columnDifference) return columnDifference;
      if (Math.abs(b.y - a.y) > 6) return b.y - a.y;
      return a.x - b.x;
    })
    .map((segment) => segment.text)
    .filter(Boolean);
}

// Páginas de fatura têm duas colunas independentes. Se as duas forem agrupadas na
// mesma linha, o texto da coluna da direita entra na descrição e, pior, o último
// valor da linha (que é o da direita) vira o valor do lançamento.
function detectPdfColumnSplit(items) {
  if (items.length < 40) return null;

  const spans = items.map((item) => {
    const x = item.transform?.[4] ?? 0;
    return [x, x + (item.width || 0)];
  });
  const maxX = Math.max(...spans.map(([, end]) => end));
  if (!Number.isFinite(maxX) || maxX <= 0) return null;

  const occupied = new Array(Math.ceil(maxX) + 2).fill(false);
  spans.forEach(([start, end]) => {
    const from = Math.max(0, Math.floor(start));
    const to = Math.min(occupied.length - 1, Math.ceil(end));
    for (let pixel = from; pixel <= to; pixel += 1) occupied[pixel] = true;
  });

  const searchStart = Math.floor(maxX * 0.4);
  const searchEnd = Math.ceil(maxX * 0.68);
  let best = null;
  let gapStart = null;

  for (let pixel = searchStart; pixel <= searchEnd; pixel += 1) {
    if (!occupied[pixel]) {
      if (gapStart === null) gapStart = pixel;
      continue;
    }
    if (gapStart !== null && pixel - gapStart >= 8 && (!best || pixel - gapStart > best.size)) {
      best = { size: pixel - gapStart, center: (gapStart + pixel) / 2 };
    }
    gapStart = null;
  }
  if (gapStart !== null && searchEnd - gapStart >= 8 && (!best || searchEnd - gapStart > best.size)) {
    best = { size: searchEnd - gapStart, center: (gapStart + searchEnd) / 2 };
  }
  if (!best) return null;

  const leftCount = spans.filter(([start]) => start < best.center).length;
  const rightCount = spans.length - leftCount;
  if (leftCount < spans.length * 0.2 || rightCount < spans.length * 0.2) return null;
  return best.center;
}

function splitPdfLineParts(parts) {
  const segments = [];
  let current = [];

  parts
    .sort((a, b) => a.x - b.x)
    .forEach((part) => {
      const currentText = current.map((item) => item.text).join(" ");
      const startsCharge = /^\d{1,2}[\/.-]\d{1,2}(?:[\/.-]\d{1,4})?\b/.test(part.text);
      const startsSection = /^(comprasparceladas|lancamentos|data|encargos|totaldoslancamentos|dolardeconversao|repassedeliof|repasseiof|repasse|totallancamentos)/.test(
        compactNormalizedText(part.text),
      );
      const startsNewVisualColumn = current.length && part.x - current[0].x > 160;
      const startsSecondColumn =
        startsNewVisualColumn &&
        ((startsCharge && (findMoneyInText(currentText) !== null || !looksLikePdfChargeLine(currentText))) || startsSection);

      if (startsSecondColumn) {
        segments.push(joinPdfParts(current));
        current = [part];
        return;
      }

      current.push(part);
    });

  if (current.length) segments.push(joinPdfParts(current));
  return segments;
}

function joinPdfParts(parts) {
  return {
    x: parts[0]?.x ?? 0,
    text: parts
      .map((part) => part.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim(),
  };
}

function pdfColumnBucket(x) {
  return x >= PDF_COLUMN_SPLIT_FALLBACK ? 1 : 0;
}

function normalizePdfChargeLines(lines) {
  const normalized = [];
  let pending = "";

  lines.forEach((line) => {
    const text = line.replace(/\s+/g, " ").trim();
    if (!text) return;

    const startsCharge = /^\d{1,2}[\/.-]\d{1,2}(?:[\/.-]\d{1,4})?\b/.test(text);
    const hasMoney = findMoneyInText(text) !== null;

    if (startsCharge) {
      if (pending && parsePdfLineToRow(pending)) normalized.push(pending);
      pending = text;

      if (hasMoney) {
        normalized.push(pending);
        pending = "";
      }
      return;
    }

    if (pending) {
      pending = `${pending} ${text}`.replace(/\s+/g, " ").trim();
      if (findMoneyInText(pending) !== null) {
        normalized.push(pending);
        pending = "";
      }
      return;
    }

    normalized.push(text);
  });

  if (pending && parsePdfLineToRow(pending)) normalized.push(pending);
  return normalized;
}

function filterCurrentChargeLines(lines) {
  let futureSection = false;
  let inChargesSection = false;
  let currentChargeCount = 0;

  return lines.filter((line) => {
    const text = normalizeText(line);
    const compactText = compactNormalizedText(line);
    const cleanedLine = stripTrailingPdfNoise(line);
    const cleanedLooksLikeCharge = looksLikePdfChargeLine(cleanedLine);
    const parsedCandidate = parsePdfLineToRow(line);

    if (
      /comprasparceladasproximasfaturas|proximasparcelas|parcelasfuturas|proximasfaturas|lancamentosfuturos|parcelasavencer|parcelamentosfuturos|comprasfuturas|limitesdecredito|encargoscobrados/.test(
        compactText,
      ) ||
      /parcelas futuras|lancamentos futuros|encargos cobrados/.test(text)
    ) {
      futureSection = currentChargeCount > 0;
      return false;
    }

    if (
      /^lancamentos\b|compras e saques|demonstrativo de despesas|despesas no brasil|lancamentos produtos e servicos|produtos servicos|data estabelecimento valor em r|dia mes descricao r us/.test(text) ||
      /lancamentoscomprasesaques|lancamentosprodutoseservicos|produtosservicos|dataestabelecimentovaloremr|diamesdescricaorus/.test(compactText)
    ) {
      inChargesSection = true;
      if (!looksLikePdfChargeLine(line)) return false;
    }

    if (
      /resumo|total da fatura|valor total|total a pagar|pagamentos efetuados|pagamentos creditos|limites disponiveis|total nacional|total no exterior|saldo convertido|nosso numero|codigo beneficiario|autenticacao mecanica|o demonstrativo acima|lancamentos atuais|valor do documento|uso do banco|carteira especie/.test(text) ||
      /totaldafatura|valortotal|totalapagar|pagamentosefetuados|pagamentoscreditos|limitesdisponiveis|totalnacional|totalnoexterior|saldoconvertido|codigobeneficiario|lancamentosatuais|valordodocumento|usodobanco|carteiraespecie/.test(compactText)
    ) {
      return false;
    }

    if (/dolardeconversao|totallancamentosinter/.test(compactText) && !cleanedLooksLikeCharge) return false;
    if (futureSection) return false;
    if (!inChargesSection && !parsedCandidate) return false;
    if (/repasse.*iof/.test(text) && parsedCandidate) {
      currentChargeCount += 1;
      return true;
    }
    if (!parsedCandidate) return false;
    currentChargeCount += 1;
    return true;
  });
}

function extractStatementTotalFromLines(lines) {
  return extractStatementSummaryFromLines(lines).statementTotal;
}

function extractStatementSummaryFromLines(lines) {
  // O PDF quebra palavras acentuadas em pedaços ("Lan", "ç", "amentos"), por isso a
  // busca dos rótulos usa o texto compactado (sem espaços nem acentos).
  const normalizedLines = lines.map((line) => ({ line, text: compactNormalizedText(line) }));

  return {
    statementTotal: findLabeledMoneyInLines(normalizedLines, [
      /totaldestafatura/,
      /ototaldasuafaturae/,
      /ovalordafaturae/,
      /valortotaldafatura/,
      /totaldafatura(?!anterior)/,
      /totalapagar/,
      /valorapagar/,
      /saldodafatura/,
    ]),
    currentChargesTotal: findLabeledMoneyInLines(normalizedLines, [
      /totaldoslancamentosatuais/,
      /totaldelancamentosatuais/,
      /totaldoslancamentosdoperiodo/,
      /lancamentosatuais/,
    ]),
    financedBalance:
      findLabeledMoneyInLines(normalizedLines, [/saldofinanciado/, /saldorotativo/, /saldodocreditorotativo/]) ?? 0,
  };
}

function findLabeledMoneyInLines(normalizedLines, patterns) {
  for (const pattern of patterns) {
    const index = normalizedLines.findIndex(({ text }) => pattern.test(text));
    if (index < 0) continue;

    const sameLineValue = findMoneyInText(normalizedLines[index].line);
    if (sameLineValue !== null) return sameLineValue;

    const nextLineValue = findMoneyInText(normalizedLines[index + 1]?.line);
    if (nextLineValue !== null) return nextLineValue;
  }

  return null;
}

function extractStatementTotalFromRows(rows) {
  const match = rows.find((row) => {
    const label = normalizeText(row.join(" "));
    return /(total da fatura|valor total da fatura|total a pagar|valor a pagar|saldo da fatura)/.test(label) && findMoney(row) !== null;
  });

  return match ? findMoney(match) : null;
}


function sumRowsAmount(rows) {
  return rows.reduce((sum, row) => sum + (parseMoney(row[2]) || 0), 0);
}


function toCents(value) {
  return Math.round((Number(value) || 0) * 100);
}

function formatMoneyValue(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parsePdfLineToRow(line) {
  let text = line.replace(/\s+/g, " ").trim();
  const iofRow = parseIofPdfLine(text);
  if (iofRow) return iofRow;

  text = stripTrailingPdfNoise(text);
  const firstDateIndex = text.search(/\b\d{1,2}[\/.-]\d{1,2}(?:[\/.-]\d{1,4})?\b/);
  if (firstDateIndex > 0 && findMoneyInText(text.slice(0, firstDateIndex)) === null) text = text.slice(firstDateIndex).trim();

  const dateMatch = text.match(/\b\d{1,2}[\/.-]\d{1,2}(?:[\/.-]\d{1,4})?\b/);
  const moneyMatches = [...text.matchAll(/(?:R\$\s*)?-?\d{1,3}(?:\.\d{3})*,\d{2}|(?:R\$\s*)?-?\d+,\d{2}/g)];

  if (!dateMatch || !moneyMatches.length) return null;
  if (!importAllowsPayments && isPaymentOrCreditLine(text)) return null;

  const amountMatch = moneyMatches[moneyMatches.length - 1];
  const amount = parseMoney(amountMatch[0]);
  if (!amount) return null;

  const description = cleanPdfDescription(text, dateMatch[0], amountMatch[0]);
  if (!description || shouldIgnoreImportedDescription(description)) return null;

  return [dateMatch[0], description, amountMatch[0]];
}

function parseIofPdfLine(line) {
  if (!/repasse.*iof/i.test(normalizeText(line))) return null;
  const amount = findMoneyInText(line);
  if (!amount) return null;
  return ["", "Repasse de IOF", formatMoneyValue(amount)];
}

function stripTrailingPdfNoise(line) {
  const markers = [
    "lancamentosnocartao",
    "lancamentosprodutoseservicos",
    "dataprodutosservicosvalor",
    "comprasparceladas",
    "encargoscobrados",
    "dolardeconversao",
    "totallancamentosinter",
  ];
  let markerIndex = line.length;

  for (let index = 0; index < line.length; index += 1) {
    const compactTail = compactNormalizedText(line.slice(index));
    if (markers.some((marker) => compactTail.startsWith(marker))) {
      markerIndex = index;
      break;
    }
  }

  return line.slice(0, markerIndex).trim();
}

function cleanPdfDescription(line, dateText, amountText) {
  return cleanDescription(
    mergeSplitAccents(line)
      .replace(dateText, " ")
      .replace(amountText, " ")
      .replace(/\b(R\$|BRL)\b/gi, " ")
      .replace(/\b(compra|nacional|internacional|lan[cç]amento)\b/gi, " "),
  );
}

// O pdf.js devolve letras acentuadas como itens separados ("Ita", "ú", "Avisa"),
// o que gera descrições do tipo "Ita ú Avisa". Aqui as partes voltam a se juntar.
function mergeSplitAccents(text) {
  let merged = String(text ?? "");
  let previous = "";
  while (merged !== previous) {
    previous = merged;
    merged = merged
      // "Ita ú" -> "Itaú" (o pedaço acentuado cola na palavra anterior)
      .replace(/([A-Za-zÀ-ÿ]) ([À-ÿ]{1,2})(?=\s|$)/g, "$1$2")
      // "Itaú rio" -> só cola o resto se a continuação for minúscula ("Ita ú Avisa" mantém o espaço)
      .replace(/([À-ÿ]) ([a-zà-ÿ])/g, "$1$2");
  }
  return merged;
}

function looksLikePdfChargeLine(line) {
  return /\b\d{1,2}[\/.-]\d{1,2}(?:[\/.-]\d{1,4})?\b/.test(String(line ?? "")) && findMoneyInText(line) !== null;
}

function isPaymentOrCreditLine(line) {
  const text = normalizeText(line);
  return /pagamento|pagamentos/.test(text);
}

function parseCsv(text) {
  const delimiter = text.includes(";") ? ";" : ",";
  return text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.split(delimiter).map((cell) => cell.trim()));
}

function normalizeImportedRows(rows, card) {
  const headerIndex = rows.findIndex((row) => row.some((cell) => /descri|hist[oó]rico|lan[çc]amento|estabelecimento/i.test(cell)));
  const header = headerIndex >= 0 ? rows[headerIndex].map(normalizeText) : [];
  const body = rows.slice(headerIndex >= 0 ? headerIndex + 1 : 0);
  const descriptionIndex = findHeaderIndex(header, ["descricao", "historico", "lancamento", "estabelecimento", "compra"]);
  const amountIndex = findHeaderIndex(header, ["valor", "amount", "debito"]);
  const dateIndex = findHeaderIndex(header, ["data", "date"]);

  const normalizedRows = body
    .map((row) => {
      const description = cleanDescription(
        descriptionIndex >= 0 ? row[descriptionIndex] : row.find((cell) => cell && !parseMoney(cell) && !looksLikeDate(cell)),
      );
      const amount = amountIndex >= 0 ? parseMoney(row[amountIndex]) : findMoney(row);
      const date = dateIndex >= 0 ? row[dateIndex] : row.find(looksLikeDate) ?? "";
      if (!date && row.length <= 2) return null;
      if (!description || !amount || shouldIgnoreImportedDescription(description)) return null;
      return tx(card, description, amount, "manual", "import", normalizeDateLabel(date));
    })
    .filter(Boolean);

  const occurrences = new Map();
  return normalizedRows.map((item) => {
    const key = [item.card, normalizeDateLabel(item.date), installmentRuleKey(item.description), Number(item.amount || 0).toFixed(2)].join("|");
    const occurrence = occurrences.get(key) ?? 0;
    occurrences.set(key, occurrence + 1);
    return { ...item, occurrence };
  });
}

function hasDuplicateTransaction(month, item) {
  const itemKey = transactionDedupKey(item);
  return month.transactions.some((existing) => transactionDedupKey(existing) === itemKey);
}

function transactionDedupKey(item) {
  return [
    item.card,
    normalizeDateLabel(item.date),
    installmentRuleKey(item.description),
    Number(item.amount || 0).toFixed(2),
    item.occurrence ?? 0,
  ].join("|");
}

function shouldIgnoreImportedDescription(description) {
  const text = normalizeText(description);
  if (!text) return true;
  if (!importAllowsPayments && /\bpagamentos?\b/.test(text)) return true;

  // Rótulos de resumo começam pela palavra-chave ("Total desta fatura", "Limite
  // total"); nome de estabelecimento pode conter a palavra no meio
  // ("CONECTCAR_FATURA") e não deve ser descartado.
  if (
    /^(total|subtotal|saldo|valor a pagar|valor total|encargos|limite|limites|vencimento|resumo|demonstrativo|despesas no|proxima fatura|proximas faturas|demais faturas|proximas parcelas|parcelas futuras|parcelas a vencer|lancamentos futuros|credito rotativo)\b/.test(
      text,
    )
  ) {
    return true;
  }

  return /\b(total (da|desta) fatura|total dos lancamentos|total para proximas faturas|total das despesas)\b/.test(text);
}

function classifyTransaction(item) {
  const key = installmentRuleKey(item.description);
  const normalized = normalizeText(item.description);
  const existingRule = state.rules.find((rule) => rule.key === key || normalized.includes(rule.key));

  // Linhas de parcelamento/refinanciamento da própria fatura não são consumo de
  // ninguém: ficam como "manual" para não ratear valores altos automaticamente.
  if (isStatementLevelEntry(item.description)) {
    return { ...item, owner: "manual", reviewed: false, status: "manual" };
  }

  const owner = Number(item.amount) < 0 ? "both" : autoOwner(item.description, existingRule?.owner);

  return {
    ...item,
    owner,
    reviewed: Number(item.amount) < 0 ? false : owner !== "manual",
    status: Number(item.amount) < 0 ? "manual" : owner === "manual" ? "manual" : "auto",
  };
}

function isStatementLevelEntry(description) {
  const text = normalizeText(description);
  return (
    /credito por parcelament|parcela de ref|iof refinanciamento|saldo financiado|encargos de parcelamento/.test(text) ||
    /^pagamento|devolucao iof|^ajuste da fatura/.test(text)
  );
}

function autoOwner(description, fallbackOwner) {
  const text = normalizeText(description);
  if (/(supermerc|drog|farma|farmacia|araujo|drogasil|natus farma|pacheco)/.test(text)) return "both";
  if (/\b(mercado|mercados|mercadinho|mercearia)\b/.test(text)) return "both";
  if (fallbackOwner) return fallbackOwner;
  return "manual";
}

function projectFutureInstallments(nextState) {
  monthLabels.forEach(([key]) => {
    if (key <= currentMonth) return;
    const month = ensureMonth(key, nextState);
    month.transactions = month.transactions.filter((item) => item.source !== "projection");
  });

  Object.entries(nextState.months).forEach(([monthKey, month]) => {
    month.transactions
      .filter((item) => item.source !== "projection")
      .forEach((item) => {
        const installment = getInstallment(item.description);
        if (!installment || installment.current >= installment.total) return;

        for (let index = installment.current + 1; index <= installment.total; index += 1) {
          const futureKey = addMonths(monthKey, index - installment.current);
          if (!nextState.months[futureKey]) continue;
          const projected = {
            ...item,
            id: crypto.randomUUID(),
            date: shiftDateLabel(item.date, monthKey, index - installment.current),
            description: item.description.replace(installment.raw, `${String(index).padStart(2, "0")}/${String(installment.total).padStart(2, "0")}`),
            source: "projection",
            status: "projected",
            reviewed: item.owner !== "manual",
          };
          const exists = nextState.months[futureKey].transactions.some(
            (existing) =>
              existing.source === "projection" &&
              normalizeText(existing.description) === normalizeText(projected.description) &&
              existing.card === projected.card,
          );
          if (!exists) nextState.months[futureKey].transactions.push(projected);
        }
      });
  });
}

function projectedBillsFor(monthKey) {
  const base = fixedMayBills
    .filter((item) => item.description !== "Gastos aleatórios" && !/^Moveis/i.test(item.description))
    .map((item) => ({ ...item, id: crypto.randomUUID(), paid: false }));

  const moveisNumber = Math.max(1, Math.min(10, Number(monthKey.slice(5, 7)) - 1));
  base.push(bill("25", `Moveis ${moveisNumber}/10`, 985, false));
  return base;
}

function calculateBillsTotal(monthKey) {
  return ensureMonth(monthKey).bills.reduce((sum, item) => sum + getBillAmount(item, monthKey), 0);
}

function calculateIncomeTotal(monthKey) {
  return (ensureMonth(monthKey).incomes ?? []).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
}

function calculateReceivedIncomeTotal(monthKey) {
  return (ensureMonth(monthKey).incomes ?? [])
    .filter((item) => item.received)
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
}

function calculateAccountsSummary(monthKey) {
  const month = ensureMonth(monthKey);
  const incomeTotal = calculateIncomeTotal(monthKey);
  const receivedIncomeTotal = calculateReceivedIncomeTotal(monthKey);
  const billsTotal = calculateBillsTotal(monthKey);
  const paidTotal = month.bills.filter((item) => item.paid).reduce((sum, item) => sum + getBillAmount(item, monthKey), 0);
  const pendingTotal = Math.max(0, billsTotal - paidTotal);

  return {
    incomeTotal,
    receivedIncomeTotal,
    billsTotal,
    paidTotal,
    pendingTotal,
    balance: incomeTotal - billsTotal,
    cashBalance: receivedIncomeTotal - paidTotal,
  };
}

function getBillAmount(item, monthKey) {
  return isCardBill(item) ? calculateMonthTotals(monthKey).guiPayable : Number(item.amount) || 0;
}

function isCardBill(item) {
  return item?.source === "card" || normalizeText(item?.description) === "cartao";
}

function calculateMonthTotals(monthKey) {
  const month = ensureMonth(monthKey);
  month.statementTotals = month.statementTotals ?? { Azul: null, Porto: null };
  const cards = {
    Azul: emptyTotals(),
    Porto: emptyTotals(),
  };

  month.transactions.forEach((item) => {
    const cardTotals = cards[item.card] ?? emptyTotals();
    const owner = item.owner === "manual" ? "manual" : item.owner;
    cardTotals[owner] += Number(item.amount) || 0;
    cardTotals.total += Number(item.amount) || 0;
    cards[item.card] = cardTotals;
  });

  const gui = cards.Azul.gui + cards.Porto.gui;
  const eve = cards.Azul.eve + cards.Porto.eve;
  const both = cards.Azul.both + cards.Porto.both;
  const total = cards.Azul.total + cards.Porto.total;
  const manualCount = month.transactions.filter((item) => item.owner === "manual" || item.status === "manual").length;
  const exactTotal = ["Azul", "Porto"].reduce(
    (sum, card) => sum + (month.statementTotals?.[card] ?? cards[card].total),
    0,
  );

  return {
    cards,
    gui,
    eve,
    both,
    total,
    exactTotal,
    statementTotals: month.statementTotals,
    manualCount,
    guiPayable: gui + both / 2,
    evePayable: eve + both / 2,
  };
}

function emptyTotals() {
  return { gui: 0, eve: 0, both: 0, manual: 0, total: 0 };
}

function updateTransactionFromInput(event) {
  const item = findTransaction(event.target.dataset.id);
  const field = event.target.dataset.txField;
  item[field] = field === "amount" ? Number(event.target.value) : event.target.value;
  if (field === "description") {
    const owner = autoOwner(item.description, state.rules.find((rule) => rule.key === installmentRuleKey(item.description))?.owner);
    if (owner !== "manual") {
      item.owner = owner;
      item.reviewed = true;
      item.status = "auto";
    }
  }
  rememberRule(item);
  projectFutureInstallments(state);
  saveState();
  renderSummary();
  renderBreakdown();
  renderProjection();
}

function updateOwner(id, owner) {
  const item = findTransaction(id);
  item.owner = owner;
  item.reviewed = true;
  item.status = "auto";
  rememberRule(item);
  projectFutureInstallments(state);
  saveState();
  render();
}

function updateReviewed(id, reviewed) {
  const item = findTransaction(id);
  item.reviewed = reviewed;
  saveState();
}

function removeTransaction(id) {
  const month = ensureMonth(currentMonth);
  month.transactions = month.transactions.filter((item) => item.id !== id);
  projectFutureInstallments(state);
  saveState();
  render();
}

function updateBillFromInput(event) {
  const item = findBill(event.target.dataset.id);
  const field = event.target.dataset.billField;
  if (isCardBill(item) && field === "amount") return;
  item[field] = field === "amount" ? Number(event.target.value) : event.target.value;
  saveState();
  renderAccountsSummary();
  renderProjection();
}

function removeBill(id) {
  const month = ensureMonth(currentMonth);
  month.bills = month.bills.filter((item) => item.id !== id);
  saveState();
  render();
}

function updateIncomeFromInput(event) {
  const item = findIncome(event.target.dataset.id);
  const field = event.target.dataset.incomeField;
  item[field] = field === "amount" ? Number(event.target.value) : event.target.value;
  saveState();
  renderAccountsSummary();
  renderProjection();
}

function removeIncome(id) {
  const month = ensureMonth(currentMonth);
  month.incomes = (month.incomes ?? []).filter((item) => item.id !== id);
  saveState();
  render();
}

function findTransaction(id) {
  const item = ensureMonth(currentMonth).transactions.find((transaction) => transaction.id === id);
  if (!item) throw new Error("lançamento não encontrado");
  return item;
}

function findBill(id) {
  const item = ensureMonth(currentMonth).bills.find((billItem) => billItem.id === id);
  if (!item) throw new Error("conta não encontrada");
  return item;
}

function findIncome(id) {
  const item = (ensureMonth(currentMonth).incomes ?? []).find((incomeItem) => incomeItem.id === id);
  if (!item) throw new Error("entrada não encontrada");
  return item;
}

function ensureMonth(monthKey, targetState = state) {
  if (!targetState.months[monthKey]) {
    const label = monthLabels.find(([key]) => key === monthKey)?.[1] ?? monthKey;
    targetState.months[monthKey] = {
      label,
      income: 0,
      balance: null,
      incomes: defaultIncomesForMonth(monthKey),
      bills: [],
      transactions: [],
      statementTotals: { Azul: null, Porto: null },
      cardSummary: null,
    };
  }
  return targetState.months[monthKey];
}

function rememberRule(item) {
  if (!item || item.owner === "manual") return;
  const key = installmentRuleKey(item.description);
  if (!key || key.length < 4) return;
  const existing = state.rules.find((rule) => rule.key === key);
  if (existing) {
    existing.owner = item.owner;
    existing.card = item.card;
  } else {
    state.rules.push({ key, owner: item.owner, card: item.card });
  }
}

function buildRulesFromTransactions(transactions) {
  return transactions
    .filter((item) => item.owner !== "manual")
    .map((item) => ({ key: installmentRuleKey(item.description), owner: item.owner, card: item.card }))
    .filter((rule, index, rules) => rule.key && rules.findIndex((other) => other.key === rule.key) === index);
}

function getInstallment(description) {
  const match = String(description).match(/(\d{1,2})\s*\/\s*(\d{1,2})/);
  if (!match) return null;
  const current = Number(match[1]);
  const total = Number(match[2]);
  if (!current || !total || current > total || total < 2) return null;
  return { current, total, raw: match[0] };
}

function installmentRuleKey(description) {
  return normalizeText(description).replace(/\b\d{1,2}\s*\/\s*\d{1,2}\b/g, "").replace(/\d+/g, "").trim();
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function compactNormalizedText(value) {
  return normalizeText(value).replace(/\s+/g, "");
}

function cleanDescription(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function parseMoney(value) {
  if (typeof value === "number") return value;
  const text = String(value ?? "").trim();
  if (!text) return null;
  if (text.includes("/")) return null;
  if (/[a-zA-ZÀ-ÿ]/.test(text) && !/(R\$|BRL)/i.test(text)) return null;
  const cleaned = text.replace(/[^\d,.-]/g, "");
  if (!/\d/.test(cleaned)) return null;
  const normalized = cleaned.includes(",") ? cleaned.replace(/\./g, "").replace(",", ".") : cleaned;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function findMoney(row) {
  const numbers = row.map(parseMoney).filter((value) => value !== null);
  return numbers.length ? numbers[numbers.length - 1] : null;
}

function findMoneyInText(text) {
  const matches = String(text ?? "").match(/(?:R\$\s*)?-?\d{1,3}(?:\.\d{3})*,\d{2}|(?:R\$\s*)?-?\d+,\d{2}/g);
  if (!matches?.length) return null;
  return parseMoney(matches[matches.length - 1]);
}

function looksLikeDate(value) {
  return /^\d{1,2}[/-]\d{1,2}(?:[/-]\d{1,4})?/.test(String(value ?? "").trim());
}

function findHeaderIndex(header, candidates) {
  return header.findIndex((cell) => candidates.some((candidate) => cell.includes(candidate)));
}

function addMonths(monthKey, amount) {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, month - 1 + amount, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function shiftDateLabel(dateLabel, baseMonthKey, monthsToAdd) {
  const normalized = normalizeDateLabel(dateLabel);
  const match = normalized.match(/^(\d{2})\/(\d{2})(?:\/(\d{2,4}))?$/);
  if (!match) return normalized;

  const [baseYear] = baseMonthKey.split("-").map(Number);
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = match[3] ? normalizeYear(match[3]) : baseYear;
  const date = new Date(year, month - 1 + monthsToAdd, day);
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function normalizeDateLabel(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";

  const match = text.match(/\b(\d{1,2})[\/.-](\d{1,2})(?:[\/.-](\d{1,4}))?\b/);
  if (!match) return text;

  const day = String(Number(match[1])).padStart(2, "0");
  const month = String(Number(match[2])).padStart(2, "0");
  const year = match[3] && String(match[3]).length > 1 ? String(match[3]).padStart(2, "0") : "";
  return year ? `${day}/${month}/${year}` : `${day}/${month}`;
}

function normalizeYear(value) {
  const year = Number(value);
  return year < 100 ? 2000 + year : year;
}

function setFeedback(message) {
  document.getElementById("importFeedback").textContent = message;
}

function emptyState() {
  return document.getElementById("emptyStateTemplate").innerHTML;
}

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
