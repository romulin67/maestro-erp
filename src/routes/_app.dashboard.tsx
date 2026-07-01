import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, TrendingUp, Wallet, Briefcase, Users, Activity, Wifi, WifiOff } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { useCurrentUser } from "@/lib/session";
import { fetchPainel, type Painel } from "@/lib/erp-api";
import { KPIS, brl, pct } from "@/lib/mock";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · ApeCerto" }] }),
  component: Dashboard,
});

interface VM {
  live: boolean;
  vgvTotal: number;
  comissao: number;
  nVendas: number;
  saldo: number | null;
  mensal: { mes: string; vgv: number }[];
  caixaMensal: { mes: string; entradas: number; saidas: number }[];
  ranking: { nome: string; vgv: number }[];
  vendas: { cliente?: string; empreendimento?: string; unidade?: string; vgv?: number; status?: string; corretor?: string }[];
}

// Sem planilha conectada: NADA de dado fictício — estado vazio.
// O que aparece na tela é sempre real (da planilha) ou claramente vazio.
function emptyVM(): VM {
  return {
    live: false,
    vgvTotal: 0,
    comissao: 0,
    nVendas: 0,
    saldo: null,
    mensal: [],
    caixaMensal: [],
    ranking: [],
    vendas: [],
  };
}

function buildVM(painel: Painel | null, isCorr: boolean): VM {
  if (!painel) return emptyVM();

  if (isCorr && painel.resumo) {
    return {
      live: true,
      vgvTotal: painel.resumo.vgvTotal || 0,
      comissao: painel.resumo.comissao || 0,
      nVendas: painel.resumo.fechadas || 0,
      saldo: null,
      mensal: (painel.resumo.mensal || []).map((m) => ({ mes: m.mes, vgv: m.vgv })),
      caixaMensal: [],
      ranking: [],
      vendas: painel.vendas || [],
    };
  }

  const vendas = painel.vendas || [];
  const vgvTotal = vendas.reduce((s, v) => s + (Number(v.vgv) || 0), 0);
  const comissao = vendas.reduce((s, v) => s + (Number(v.apecerto) || 0), 0);
  const rmap = new Map<string, number>();
  vendas.forEach((v) => {
    const k = v.corretor || "—";
    rmap.set(k, (rmap.get(k) || 0) + (Number(v.vgv) || 0));
  });
  const ranking = [...rmap.entries()].map(([nome, vgv]) => ({ nome, vgv })).sort((a, b) => b.vgv - a.vgv);
  return {
    live: true,
    vgvTotal,
    comissao,
    nVendas: vendas.length,
    saldo: painel.resultado?.saldoFinal ?? null,
    mensal: (painel.mensal || []).map((m) => ({ mes: m.mes, vgv: m.vgv })),
    caixaMensal: painel.caixaMensal || [],
    ranking,
    vendas: vendas.map((v) => ({
      cliente: v.cliente,
      empreendimento: v.empreendimento,
      unidade: v.unidade,
      vgv: v.vgv,
      status: v.statusGeral,
      corretor: v.corretor,
    })),
  };
}

const AXIS = "var(--muted-foreground)";
const kFmt = (v: number) => `${(v / 1000).toFixed(0)}k`;
const mFmt = (v: number) => `${(v / 1_000_000).toFixed(1)}M`;
const TT = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 };

function Dashboard() {
  const user = useCurrentUser();
  const isCorr = user.papel === "corretor";
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
  const primeiroNome = user.nome.split(" ")[0];

  const [painel, setPainel] = useState<Painel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchPainel({ data: { papel: user.papel, corretor: isCorr ? user.nome : "" } })
      .then((d) => alive && setPainel(d))
      .catch(() => alive && setPainel(null))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [user.id, user.papel, user.nome, isCorr]);

  const vm = useMemo(() => buildVM(painel, isCorr), [painel, isCorr]);
  const metaPct = vm.vgvTotal / KPIS.vgvMeta;
  const ticket = vm.nVendas ? vm.vgvTotal / vm.nVendas : 0;

  const KPI = [
    { label: "VGV total", value: brl(vm.vgvTotal), icon: TrendingUp, tint: "from-primary/20 to-primary/0" },
    { label: isCorr ? "Sua comissão" : "Comissão ApeCerto", value: brl(vm.comissao), icon: Wallet, tint: "from-accent/25 to-accent/0" },
    { label: isCorr ? "Vendas suas" : "Contratos", value: `${vm.nVendas}`, icon: Briefcase, tint: "from-chart-3/25 to-chart-3/0" },
    isCorr
      ? { label: "Ticket médio", value: brl(ticket), icon: Activity, tint: "from-success/25 to-success/0" }
      : { label: "Saldo em caixa", value: vm.saldo != null ? brl(vm.saldo) : "—", icon: Activity, tint: "from-success/25 to-success/0" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${saudacao}, ${primeiroNome}.`}
        subtitle={
          loading
            ? "Carregando dados da planilha…"
            : vm.live
              ? "Dados ao vivo da planilha financeira."
              : "Sem conexão com a planilha — exibindo dados de exemplo."
        }
        actions={
          <Link
            to="/crm"
            className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-semibold flex items-center gap-2 shadow-glow"
          >
            Ver pipeline <ArrowUpRight className="size-4" />
          </Link>
        }
      />

      {/* selo de fonte */}
      <div className="flex items-center gap-2 text-xs font-semibold -mt-2">
        {vm.live ? (
          <span className="inline-flex items-center gap-1.5 text-success"><Wifi className="size-3.5" /> Planilha conectada</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground"><WifiOff className="size-3.5" /> {loading ? "conectando…" : "sem conexão com a planilha"}</span>
        )}
      </div>

      {!vm.live && !loading && (
        <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-foreground/80">
          <span className="font-semibold">Sem dados da planilha.</span> A dashboard mostra os números reais quando o Apps Script responde.
          Verifique se a implantação do Web App está com acesso <span className="font-semibold">"Qualquer pessoa"</span> e se as 3 URLs de teste retornam <code className="text-xs">{`{"ok":true`}</code>.
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl bg-card border border-border p-5 shadow-card"
          >
            <div className={`absolute -top-8 -right-8 size-32 rounded-full bg-gradient-to-br ${k.tint} blur-2xl`} />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{k.label}</div>
                <div className="font-display text-2xl md:text-3xl font-bold mt-2">{k.value}</div>
              </div>
              <div className="size-10 rounded-xl bg-muted grid place-items-center">
                <k.icon className="size-4 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Meta + VGV mensal */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-card border border-border p-6 shadow-card lg:col-span-1">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Meta de VGV</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold">{brl(vm.vgvTotal)}</span>
            <span className="text-muted-foreground text-sm">/ {brl(KPIS.vgvMeta)}</span>
          </div>
          <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(metaPct * 100, 100)}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="h-full gradient-brand"
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>{pct(metaPct)} atingido</span>
            <span>{brl(Math.max(KPIS.vgvMeta - vm.vgvTotal, 0))} restam</span>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-card lg:col-span-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">VGV por mês</div>
          <div className="font-display text-lg font-bold mt-1 mb-4">Evolução</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vm.mensal} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="mes" stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: string) => String(v).slice(0, 3)} />
                <YAxis stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} tickFormatter={mFmt} />
                <Tooltip contentStyle={TT} formatter={(v: number) => brl(v)} />
                <Bar dataKey="vgv" radius={[8, 8, 0, 0]} fill="var(--brand-purple)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Admin: caixa + ranking. Corretor: pula. */}
      {!isCorr && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-card lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Fluxo de caixa</div>
                <div className="font-display text-lg font-bold mt-1">Entradas e saídas por mês</div>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-primary" />Entradas</span>
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-accent" />Saídas</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vm.caixaMensal} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="mes" stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: string) => String(v).slice(0, 3)} />
                  <YAxis stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} tickFormatter={kFmt} />
                  <Tooltip contentStyle={TT} formatter={(v: number) => brl(v)} />
                  <Line type="monotone" dataKey="entradas" stroke="var(--brand-purple)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="saidas" stroke="var(--brand-orange)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Corretores</div>
            <div className="font-display text-lg font-bold mt-1 mb-3">VGV por corretor</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vm.ranking} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="nome" stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: string) => String(v).split(" ")[0]} />
                  <YAxis stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} tickFormatter={mFmt} />
                  <Tooltip contentStyle={TT} formatter={(v: number) => brl(v)} />
                  <Bar dataKey="vgv" radius={[8, 8, 0, 0]} fill="var(--brand-purple)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-2">
              {vm.ranking.slice(0, 6).map((c) => (
                <div key={c.nome} className="flex justify-between text-xs">
                  <span className="font-medium">{c.nome}</span>
                  <span className="text-muted-foreground">{brl(c.vgv)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Últimas vendas */}
      <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {isCorr ? "Suas vendas" : "Últimas vendas"}
            </div>
            <div className="font-display text-lg font-bold mt-1">Fluxo recente</div>
          </div>
          <Users className="size-4 text-muted-foreground" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {vm.vendas.slice(0, 8).map((v, i) => {
            const nome = v.cliente || v.empreendimento || "—";
            return (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/60 transition">
                <div className="size-9 rounded-full gradient-brand grid place-items-center text-white text-xs font-bold shrink-0">
                  {nome.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">{nome}</div>
                  <div className="text-xs text-muted-foreground truncate">{v.empreendimento} · {v.unidade || "—"}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold">{brl(Number(v.vgv) || 0)}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{v.status || "—"}</div>
                </div>
              </div>
            );
          })}
          {vm.vendas.length === 0 && (
            <div className="text-sm text-muted-foreground py-6 text-center sm:col-span-2">
              {loading ? "Carregando…" : vm.live ? "Nenhuma venda registrada ainda." : "Conecte a planilha para ver as vendas."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
