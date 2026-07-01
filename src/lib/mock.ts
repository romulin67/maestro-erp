// Mock data para o MVP navegável do ApeCerto.
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

export const VENDAS = [
  { id: "V-2601", mes: "2026-06", empreendimento: "Edifício Pavão", bairro: "Moema", unidade: "142", cliente: "Marina Alvarenga", corretor: "Rafael Souza", vgv: 890_000, corretorRS: 26_700, apecerto: 8_900, romulo: 2_670, status: "Fechado", origem: "Meta Ads · Moema Prime" },
  { id: "V-2602", mes: "2026-06", empreendimento: "Residencial Ipê", bairro: "Vila Mariana", unidade: "84", cliente: "Bruno Kato", corretor: "Camila Reis", vgv: 620_000, corretorRS: 18_600, apecerto: 6_200, romulo: 1_860, status: "Em cartório", origem: "Indicação · Rafael S." },
  { id: "V-2603", mes: "2026-06", empreendimento: "Jardins Alto", bairro: "Jardins", unidade: "1201", cliente: "Sofia Menezes", corretor: "Rafael Souza", vgv: 1_450_000, corretorRS: 43_500, apecerto: 14_500, romulo: 4_350, status: "Fechado", origem: "Instagram Orgânico" },
  { id: "V-2604", mes: "2026-05", empreendimento: "Residencial Ipê", bairro: "Vila Mariana", unidade: "62", cliente: "Diego Prado", corretor: "Lucas Mano", vgv: 540_000, corretorRS: 16_200, apecerto: 5_400, romulo: 1_620, status: "Fechado", origem: "Meta Ads · Ipê Retarget" },
  { id: "V-2605", mes: "2026-05", empreendimento: "Edifício Pavão", bairro: "Moema", unidade: "91", cliente: "Ana Beatriz", corretor: "Camila Reis", vgv: 780_000, corretorRS: 23_400, apecerto: 7_800, romulo: 2_340, status: "Distrato", origem: "Portal ZAP" },
];

export const CAIXA = [
  { data: "2026-06-28", descricao: "Comissão Pavão 142", categoria: "Comissão recebida", entrada: 26_700, saida: 0 },
  { data: "2026-06-27", descricao: "Pró-labore Samuel", categoria: "Retirada sócio", entrada: 0, saida: 18_000 },
  { data: "2026-06-25", descricao: "Meta Ads · Junho", categoria: "Marketing", entrada: 0, saida: 12_400 },
  { data: "2026-06-22", descricao: "Comissão Ipê 84", categoria: "Comissão recebida", entrada: 18_600, saida: 0 },
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

export const NEGOCIOS = [
  { id: "N-101", cliente: "Marina Alvarenga", empreendimento: "Edifício Pavão", unidade: "142", stage: "Fechado", corretor: "Rafael S.", vgv: 890_000, atualizado: "há 2h", origem: "Meta Ads" },
  { id: "N-102", cliente: "Rodrigo Peixoto", empreendimento: "Jardins Alto", unidade: "804", stage: "Proposta", corretor: "Camila R.", vgv: 1_150_000, atualizado: "há 5h", origem: "Portal ZAP" },
  { id: "N-103", cliente: "Helena Yara", empreendimento: "Residencial Ipê", unidade: "72", stage: "Visita", corretor: "Lucas M.", vgv: 590_000, atualizado: "há 1d", origem: "Instagram" },
  { id: "N-104", cliente: "Tiago Bertoni", empreendimento: "Edifício Pavão", unidade: "38", stage: "Qualificação", corretor: "Rafael S.", vgv: 720_000, atualizado: "há 3h", origem: "Meta Ads" },
  { id: "N-105", cliente: "Nina Coelho", empreendimento: "Jardins Alto", unidade: "1502", stage: "Novo", corretor: "—", vgv: 1_720_000, atualizado: "agora", origem: "Indicação" },
  { id: "N-106", cliente: "Bruno Kato", empreendimento: "Residencial Ipê", unidade: "84", stage: "Em cartório", corretor: "Camila R.", vgv: 620_000, atualizado: "há 1d", origem: "Indicação" },
  { id: "N-107", cliente: "Larissa Prado", empreendimento: "Jardins Alto", unidade: "902", stage: "Proposta", corretor: "Lucas M.", vgv: 1_320_000, atualizado: "há 6h", origem: "Portal VivaReal" },
  { id: "N-108", cliente: "Otávio Muniz", empreendimento: "Edifício Pavão", unidade: "77", stage: "Visita", corretor: "Rafael S.", vgv: 810_000, atualizado: "há 4h", origem: "Meta Ads" },
];

export const STAGES = ["Novo", "Qualificação", "Visita", "Proposta", "Em cartório", "Fechado"] as const;
export type Stage = (typeof STAGES)[number];

export const PRODUTOS = [
  { id: "P-01", nome: "Edifício Pavão · 142", bairro: "Moema", tipo: "3 dorm · 92m²", preco: 890_000, status: "Pronto", tags: ["Mobiliado", "Metrô 5min"], destaque: true },
  { id: "P-02", nome: "Residencial Ipê · 84", bairro: "Vila Mariana", tipo: "2 dorm · 68m²", preco: 620_000, status: "Pronto", tags: ["Varanda", "Pet"], destaque: false },
  { id: "P-03", nome: "Jardins Alto · 1201", bairro: "Jardins", tipo: "4 dorm · 180m²", preco: 1_450_000, status: "Lançamento", tags: ["Cobertura", "Vista"], destaque: true },
  { id: "P-04", nome: "Edifício Pavão · 38", bairro: "Moema", tipo: "2 dorm · 62m²", preco: 720_000, status: "Pronto", tags: ["Reformado"], destaque: false },
  { id: "P-05", nome: "Jardins Alto · 804", bairro: "Jardins", tipo: "3 dorm · 132m²", preco: 1_150_000, status: "Lançamento", tags: ["Home office"], destaque: false },
  { id: "P-06", nome: "Residencial Ipê · 62", bairro: "Vila Mariana", tipo: "2 dorm · 68m²", preco: 540_000, status: "Vendido", tags: [], destaque: false },
];

export const CLIENTES = [
  { id: "C-01", nome: "Marina Alvarenga", tel: "+55 11 9 8123-4501", tag: "Comprador", corretor: "Rafael S.", unidade: "Pavão 142", ultimo: "há 2h" },
  { id: "C-02", nome: "Rodrigo Peixoto", tel: "+55 11 9 8123-4502", tag: "Quente", corretor: "Camila R.", unidade: "Jardins 804", ultimo: "há 5h" },
  { id: "C-03", nome: "Helena Yara", tel: "+55 11 9 8123-4503", tag: "Morno", corretor: "Lucas M.", unidade: "Ipê 72", ultimo: "há 1d" },
  { id: "C-04", nome: "Tiago Bertoni", tel: "+55 11 9 8123-4504", tag: "Quente", corretor: "Rafael S.", unidade: "Pavão 38", ultimo: "há 3h" },
  { id: "C-05", nome: "Nina Coelho", tel: "+55 11 9 8123-4505", tag: "Novo", corretor: "—", unidade: "Jardins 1502", ultimo: "agora" },
  { id: "C-06", nome: "Larissa Prado", tel: "+55 11 9 8123-4506", tag: "Quente", corretor: "Lucas M.", unidade: "Jardins 902", ultimo: "há 6h" },
];

export const CONVERSAS = [
  { id: "K-1", cliente: "Marina Alvarenga", ultima: "Confirmado! Vejo você às 15h na portaria.", quando: "10:24", naoLidas: 0, canal: "WhatsApp", corretor: "Rafael S.", online: true },
  { id: "K-2", cliente: "Rodrigo Peixoto", ultima: "Consegue reduzir 3% no valor da unidade?", quando: "09:58", naoLidas: 2, canal: "WhatsApp", corretor: "Camila R.", online: true },
  { id: "K-3", cliente: "Helena Yara", ultima: "Vou ver com meu marido e retorno.", quando: "ontem", naoLidas: 0, canal: "WhatsApp", corretor: "Lucas M.", online: false },
  { id: "K-4", cliente: "Tiago Bertoni", ultima: "Perfeito, aguardo a proposta.", quando: "08:41", naoLidas: 1, canal: "Instagram", corretor: "Rafael S.", online: false },
  { id: "K-5", cliente: "Nina Coelho", ultima: "Recém-chegada do Meta Ads — precisa qualificar.", quando: "agora", naoLidas: 3, canal: "WhatsApp", corretor: "—", online: true },
];

export const MENSAGENS = [
  { de: "cliente", texto: "Oi! Vi o anúncio do apê 142 no Pavão. Ainda está disponível?", quando: "10:12" },
  { de: "corretor", texto: "Oi Marina! Está sim. Quer agendar uma visita ainda essa semana?", quando: "10:14" },
  { de: "cliente", texto: "Consigo hoje às 15h?", quando: "10:20" },
  { de: "corretor", texto: "Fechado. Te mando a localização no privado.", quando: "10:22" },
  { de: "cliente", texto: "Confirmado! Vejo você às 15h na portaria.", quando: "10:24" },
];

export const CORRETORES = [
  { nome: "Rafael Souza", vgv: 3_120_000, fechadas: 4, pipeline: 12 },
  { nome: "Camila Reis", vgv: 2_450_000, fechadas: 3, pipeline: 9 },
  { nome: "Lucas Mano", vgv: 1_780_000, fechadas: 2, pipeline: 7 },
];

export const ORIGENS = [
  { origem: "Meta Ads", leads: 148, fechados: 6, custo: 12_400 },
  { origem: "Instagram Orgânico", leads: 62, fechados: 3, custo: 0 },
  { origem: "Portal ZAP", leads: 41, fechados: 2, custo: 3_200 },
  { origem: "Indicação", leads: 22, fechados: 4, custo: 0 },
  { origem: "Portal VivaReal", leads: 18, fechados: 1, custo: 1_800 },
];

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const brl2 = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const pct = (n: number) => `${(n * 100).toFixed(1)}%`;