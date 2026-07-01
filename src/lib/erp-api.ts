// Camada de dados provisória: lê o painel financeiro do Apps Script (que lê a planilha).
// A busca roda no SERVIDOR (createServerFn) — evita CORS e mantém a URL fora do navegador.
// Quando o Supabase entrar, trocar o corpo do handler por query no banco.
import { createServerFn } from "@tanstack/react-start";

// URL /exec do Web App do Apps Script. Provisório — mover para variável de ambiente
// antes de produção, pois expõe o endpoint dos dados financeiros.
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

// Retorna o painel real, ou null se a planilha/endpoint estiver indisponível
// (a tela cai no mock nesse caso, sem quebrar).
export const fetchPainel = createServerFn({ method: "GET" })
  .inputValidator((d: PainelInput) => d)
  .handler(async ({ data }): Promise<Painel | null> => {
    const url =
      `${EXEC_URL}?action=getPainel` +
      `&papel=${encodeURIComponent(data.papel)}` +
      `&corretor=${encodeURIComponent(data.corretor)}`;
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) return null;
      const json = (await res.json()) as { ok?: boolean; data?: Painel };
      return json && json.ok && json.data ? json.data : null;
    } catch {
      return null;
    }
  });
