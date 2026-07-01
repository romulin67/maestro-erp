// Mock data para o MVP navegável do ApeCerto — dados alinhados à operação real.
// Time, empreendimentos (Moema/Campo Belo), 13 etapas do funil e vocabulário de status reais.
// Substituir por chamadas Supabase quando o backend for ativado.

export const KPIS = {
  vgvMes: 1_284_500,
  vgvMeta: 1_500_000,
  comissaoMes: 78_420,
  saldoCaixa: 342_891.4,
  pipelineAtivo: 47,
  visitasSemana: 22,
  taxaConversao: 0.184,
  slaResposta: 0.72,
};

// Status oficial da VENDAS: Pendente | Concluído | Pago | Distrato (não mexer — a DRE depende disso).
export const VENDAS = [
  { id: "V-2601", mes: "2026-06", empreendimento: "Claris Moema", bairro: "Moema", unidade: "43", cliente: "João Silva", corretor: "Claudia", vgv: 685_000, corretorRS: 13_700, apecerto: 6_850, romulo: 2_055, status: "Pago", origem: "Meta · Studio 400-700k" },
  { id: "V-2602", mes: "2026-06", empreendimento: "Jazz Moema", bairro: "Moema", unidade: "118", cliente: "Marina Costa", corretor: "Fabiano", vgv: 520_000, corretorRS: 9_100, apecerto: 5_200, romulo: 1_560, status: "Pendente", origem: "Meta · 1 dorm Campo Belo" },
  { id: "V-2603", mes: "2026-06", empreendimento: "Autoral Moema", bairro: "Moema", unidade: "72", cliente: "Sofia Menezes", corretor: "Tica", vgv: 610_000, corretorRS: 12_200, apecerto: 6_100, romulo: 1_830, status: "Concluído", origem: "Instagram Orgânico" },
  { id: "V-2604", mes: "2026-05", empreendimento: "Terrare", bairro: "Campo Belo", unidade: "62", cliente: "Diego Prado", corretor: "Elizangela", vgv: 540_000, corretorRS: 10_800, apecerto: 5_400, romulo: 1_620, status: "Pago", origem: "Meta · Studio Moema" },
  { id: "V-2605", mes: "2026-05", empreendimento: "Composite Moema", bairro: "Moema", unidade: "91", cliente: "Ana Beatriz", corretor: "Edrisia", vgv: 470_000, corretorRS: 8_225, apecerto: 4_700, romulo: 1_410, status: "Distrato", origem: "Portal ZAP" },
];

export const CAIXA = [
  { data: "2026-06-28", descricao: "Comissão Claris 43", categoria: "Comissão recebida", entrada: 13_700, saida: 0 },
  { data: "2026-06-27", descricao: "Pró-labore Samuel", categoria: "Retirada sócio", entrada: 0, saida: 18_000 },
  { data: "2026-06-25", descricao: "Meta Ads · Junho", categoria: "Marketing", entrada: 0, saida: 12_400 },
  { data: "2026-06-22", descricao: "Comissão Autoral 72", categoria: "Comissão recebida", entrada: 12_200, saida: 0 },
  { data: "2026-06-20", descricao: "DataCrazy · mensalidade", categoria: "SaaS", entrada: 0, saida: 1_890 },
  { data: "2026-06-18", descricao: "Aporte sócio", categoria: "Aporte", entrada: 40_000, saida: 0 },
  { data: "2026-06-15", descricao: "Aluguel escritório", categoria: "Fixo", entrada: 0, saida: 8_500 },
];

export const CAIXA_TREND = [
  { mes: "Jan", entrada: 82_000, saida: 61_000 },
  { mes: "Fev", entrada: 96_400, saida: 72_100 },
  { mes: "Mar", entrada: 71_200, saida: 68_900 },
  { mes: "Abr", entrada: 118_500, saida: 74_400 },
  { mes: "Mai", entrada: 104_800, saida: 81_200 },
  { mes: "Jun", entrada: 142_300, saida: 89_600 },
];

// Funil comercial oficial (13 etapas — spec do Samuel).
export const STAGES = [
  "Lead Novo",
  "Primeiro Contato",
  "Em Atendimento",
  "Qualificação",
  "Visita Agendada",
  "Visita Realizada",
  "Negociação",
  "Proposta",
  "Reserva",
  "Contrato",
  "Financiamento",
  "Venda",
  "Pós-venda",
] as const;
export type Stage = (typeof STAGES)[number];

// PIPELINE — negócios em andamento no funil (isto alimenta a aba CRM). Cada card ligado ao corretor da instância.
export const PIPELINE = [
  { id: "N-101", cliente: "João Mendes", empreendimento: "Claris Moema", unidade: "—", stage: "Lead Novo", corretor: "Claudia", vgv: 480_000, atualizado: "agora", origem: "Meta · Studio" },
  { id: "N-102", cliente: "Marina Costa", empreendimento: "Jazz Moema", unidade: "118", stage: "Primeiro Contato", corretor: "Fabiano", vgv: 520_000, atualizado: "há 2h", origem: "Meta · 1 dorm" },
  { id: "N-103", cliente: "Rafael Lima", empreendimento: "Autoral Moema", unidade: "—", stage: "Em Atendimento", corretor: "Tica", vgv: 610_000, atualizado: "há 3h", origem: "Instagram" },
  { id: "N-104", cliente: "Beatriz Souza", empreendimento: "Terrare", unidade: "—", stage: "Qualificação", corretor: "Claudia", vgv: 545_000, atualizado: "há 1d", origem: "Meta · Studio" },
  { id: "N-105", cliente: "Pedro Alves", empreendimento: "Composite Moema", unidade: "204", stage: "Visita Agendada", corretor: "Elizangela", vgv: 470_000, atualizado: "há 5h", origem: "Indicação" },
  { id: "N-106", cliente: "Camila Rocha", empreendimento: "Claris Moema", unidade: "51", stage: "Visita Realizada", corretor: "Fabiano", vgv: 495_000, atualizado: "há 6h", origem: "Meta · Studio" },
  { id: "N-107", cliente: "Lucas Pereira", empreendimento: "Jazz Moema", unidade: "77", stage: "Negociação", corretor: "Tica", vgv: 530_000, atualizado: "há 4h", origem: "Meta · 1 dorm" },
  { id: "N-108", cliente: "Aline Dias", empreendimento: "Autoral Moema", unidade: "63", stage: "Proposta", corretor: "Claudia", vgv: 610_000, atualizado: "há 1h", origem: "Instagram" },
  { id: "N-109", cliente: "Bruno Carvalho", empreendimento: "Terrare", unidade: "88", stage: "Reserva", corretor: "Edrisia", vgv: 540_000, atualizado: "há 2h", origem: "Meta · Studio" },
  { id: "N-110", cliente: "Fernanda Melo", empreendimento: "Claris Moema", unidade: "403", stage: "Contrato", corretor: "Fabiano", vgv: 685_000, atualizado: "há 1d", origem: "Meta · Studio" },
  { id: "N-111", cliente: "Gustavo Nunes", empreendimento: "Terrare", unidade: "112", stage: "Financiamento", corretor: "Elizangela", vgv: 505_000, atualizado: "há 2d", origem: "Indicação" },
  { id: "N-112", cliente: "Patrícia Gomes", empreendimento: "Composite Moema", unidade: "91", stage: "Venda", corretor: "Tica", vgv: 470_000, atualizado: "há 3d", origem: "Meta · Studio" },
  { id: "N-113", cliente: "Diego Ferreira", empreendimento: "Jazz Moema", unidade: "120", stage: "Pós-venda", corretor: "Claudia", vgv: 520_000, atualizado: "há 5d", origem: "Meta · 1 dorm" },
];

// Catálogo (tabelão). Status: Lançamento | Em obras | Pronto | Vendido.
export const PRODUTOS = [
  { id: "P-01", nome: "Claris Moema · 43", bairro: "Moema", tipo: "Studio · 28m²", preco: 685_000, status: "Em obras", tags: ["Metrô 5min", "Studio"], destaque: true },
  { id: "P-02", nome: "Jazz Moema · 118", bairro: "Moema", tipo: "1 dorm · 38m²", preco: 520_000, status: "Lançamento", tags: ["Varanda", "Pet"], destaque: false },
  { id: "P-03", nome: "Autoral Moema · 72", bairro: "Moema", tipo: "1 dorm · 42m²", preco: 610_000, status: "Em obras", tags: ["Lazer completo"], destaque: true },
  { id: "P-04", nome: "Terrare · 62", bairro: "Campo Belo", tipo: "Studio · 30m²", preco: 540_000, status: "Lançamento", tags: ["Home office"], destaque: false },
  { id: "P-05", nome: "Composite Moema · 204", bairro: "Moema", tipo: "1 dorm · 40m²", preco: 470_000, status: "Pronto", tags: ["Pronto p/ morar"], destaque: false },
  { id: "P-06", nome: "Terrare · 88", bairro: "Campo Belo", tipo: "Studio · 29m²", preco: 505_000, status: "Vendido", tags: [], destaque: false },
];

// Base de clientes (CRM). Tags: Quente | Morno | Novo | Comprador.
export const CLIENTES = [
  { id: "C-01", nome: "João Silva", tel: "+55 11 9 8123-4501", tag: "Comprador", corretor: "Claudia", unidade: "Claris 43", ultimo: "há 2h" },
  { id: "C-02", nome: "Marina Costa", tel: "+55 11 9 8123-4502", tag: "Quente", corretor: "Fabiano", unidade: "Jazz 118", ultimo: "há 5h" },
  { id: "C-03", nome: "Rafael Lima", tel: "+55 11 9 8123-4503", tag: "Morno", corretor: "Tica", unidade: "Autoral —", ultimo: "há 1d" },
  { id: "C-04", nome: "Beatriz Souza", tel: "+55 11 9 8123-4504", tag: "Quente", corretor: "Claudia", unidade: "Terrare —", ultimo: "há 3h" },
  { id: "C-05", nome: "Pedro Alves", tel: "+55 11 9 8123-4505", tag: "Novo", corretor: "Elizangela", unidade: "Composite 204", ultimo: "agora" },
  { id: "C-06", nome: "Aline Dias", tel: "+55 11 9 8123-4506", tag: "Quente", corretor: "Claudia", unidade: "Autoral 63", ultimo: "há 1h" },
];

export const CONVERSAS = [
  { id: "K-1", cliente: "João Silva", ultima: "Confirmado! Vejo você às 15h na portaria.", quando: "10:24", naoLidas: 0, canal: "WhatsApp", corretor: "Claudia", online: true },
  { id: "K-2", cliente: "Marina Costa", ultima: "Consegue reduzir 3% no valor da unidade?", quando: "09:58", naoLidas: 2, canal: "WhatsApp", corretor: "Fabiano", online: true },
  { id: "K-3", cliente: "Rafael Lima", ultima: "Vou ver com minha esposa e retorno.", quando: "ontem", naoLidas: 0, canal: "WhatsApp", corretor: "Tica", online: false },
  { id: "K-4", cliente: "Beatriz Souza", ultima: "Perfeito, aguardo a proposta.", quando: "08:41", naoLidas: 1, canal: "WhatsApp", corretor: "Claudia", online: false },
  { id: "K-5", cliente: "Pedro Alves", ultima: "Recém-chegado do Meta Ads — precisa qualificar.", quando: "agora", naoLidas: 3, canal: "WhatsApp", corretor: "Elizangela", online: true },
];

export const MENSAGENS = [
  { de: "cliente", texto: "Oi! Vi o anúncio do studio no Claris Moema. Ainda tem disponível?", quando: "10:12" },
  { de: "corretor", texto: "Oi João! Tem sim. Quer agendar uma visita ainda essa semana?", quando: "10:14" },
  { de: "cliente", texto: "Consigo hoje às 15h?", quando: "10:20" },
  { de: "corretor", texto: "Fechado. Te mando a localização no privado.", quando: "10:22" },
  { de: "cliente", texto: "Confirmado! Vejo você às 15h na portaria.", quando: "10:24" },
];

export const CORRETORES = [
  { nome: "Claudia", vgv: 1_845_000, fechadas: 3, pipeline: 12 },
  { nome: "Fabiano", vgv: 1_690_000, fechadas: 3, pipeline: 11 },
  { nome: "Tica", vgv: 1_240_000, fechadas: 2, pipeline: 9 },
  { nome: "Elizangela", vgv: 980_000, fechadas: 2, pipeline: 7 },
  { nome: "Edrisia", vgv: 640_000, fechadas: 1, pipeline: 5 },
];

export const ORIGENS = [
  { origem: "Meta · Studio", leads: 148, fechados: 6, custo: 12_400 },
  { origem: "Meta · 1 dorm", leads: 96, fechados: 4, custo: 8_900 },
  { origem: "Instagram Orgânico", leads: 62, fechados: 3, custo: 0 },
  { origem: "Indicação", leads: 22, fechados: 4, custo: 0 },
  { origem: "Portal ZAP", leads: 18, fechados: 1, custo: 1_800 },
];

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const brl2 = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
