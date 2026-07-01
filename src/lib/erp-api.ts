// Leitura provisória do painel financeiro via Apps Script (que lê a planilha).
// Chamada DIRETA do cliente (GET simples) — sem server function, pra máxima
// compatibilidade de build. Se o navegador bloquear por CORS, retorna null e a
// tela cai no estado vazio (sem dados fictícios). Depois isso vem do Supabase.

const EXEC_URL =
  "https://script.google.com/macros/s/AKfycby_TK1W-RpA32ysdypZ52QHMrTdSGuWJ9fT0vCIU1XKMx2yY5fUXNXnNt6fPkWTpP77/exec";

export interface VendaRow {
  mes?: string;
  empreendimento?: string;
  bairro?: string;
  unidade?: string;
  cliente?: string;
  corretor?: string;
  vgv?: number;
  corretorRS?: number;
  apecerto?: number;
  statusGeral?: string;
  origem?: string;
}

export interface Painel {
  vendas?: VendaRow[];
  resultado?: {
    comissaoRecebida?: number;
    totalEntradas?: number;
    totalSaidas?: number;
    resultadoOperacional?: number;
    saldoFinal?: number;
  };
  caixaMensal?: { mes: string; entradas: number; saidas: number; saldo: number }[];
  mensal?: { mes: string; vendas: number; vgv: number }[];
  resumo?: {
    vgvTotal: number;
    comissao: number;
    fechadas: number;
    mensal: { mes: string; vendas: number; vgv: number }[];
  };
  corretor?: string;
}

export interface PainelInput {
  papel: "admin" | "corretor";
  corretor: string;
}

export async function fetchPainel(input: PainelInput): Promise<Painel | null> {
  const url =
    `${EXEC_URL}?action=getPainel` +
    `&papel=${encodeURIComponent(input.papel)}` +
    `&corretor=${encodeURIComponent(input.corretor)}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) return null;
    const json = (await res.json()) as { ok?: boolean; data?: Painel };
    return json && json.ok && json.data ? json.data : null;
  } catch {
    return null;
  }
}
