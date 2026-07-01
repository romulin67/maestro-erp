import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, TrendingUp, Wallet, Briefcase, Users, Activity } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { KPIS, CAIXA_TREND, ORIGENS, CORRETORES, VENDAS, brl, pct } from "@/lib/mock";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · ApeCerto" }] }),
  component: Dashboard,
});

const KPI = [
  { label: "VGV do mês", value: brl(KPIS.vgvMes), delta: "+18,4%", icon: TrendingUp, tint: "from-primary/20 to-primary/0" },
  { label: "Comissão", value: brl(KPIS.comissaoMes), delta: "+12,1%", icon: Wallet, tint: "from-accent/25 to-accent/0" },
  { label: "Pipeline ativo", value: `${KPIS.pipelineAtivo}`, delta: "+6", icon: Briefcase, tint: "from-chart-3/25 to-chart-3/0" },
  { label: "Conversão", value: pct(KPIS.taxaConversao), delta: "+2,3pp", icon: Activity, tint: "from-success/25 to-success/0" },
];

const PIE_COLORS = ["var(--brand-purple)", "var(--brand-orange)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function Dashboard() {
  const metaPct = KPIS.vgvMes / KPIS.vgvMeta;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bom dia, Rômulo."
        subtitle="Junho/2026 · 3 vendas fechadas · pipeline em ritmo acima da meta."
        actions={
          <Link
            to="/negocios"
            className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-semibold flex items-center gap-2 shadow-glow"
          >
            Ver pipeline <ArrowUpRight className="size-4" />
          </Link>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative overflow-hidden rounded-2xl bg-card border border-border p-5 shadow-card`}
          >
            <div className={`absolute -top-8 -right-8 size-32 rounded-full bg-gradient-to-br ${k.tint} blur-2xl`} />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{k.label}</div>
                <div className="font-display text-2xl md:text-3xl font-bold mt-2">{k.value}</div>
                <div className="text-xs mt-1.5 text-success font-semibold">{k.delta} vs. mês passado</div>
              </div>
              <div className="size-10 rounded-xl bg-muted grid place-items-center">
                <k.icon className="size-4 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Meta + Caixa */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-card border border-border p-6 shadow-card lg:col-span-1">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Meta VGV Junho</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold">{brl(KPIS.vgvMes)}</span>
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
            <span>{brl(KPIS.vgvMeta - KPIS.vgvMes)} restam</span>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">SLA de resposta</div>
            <div className="mt-2 font-display text-2xl font-bold">{pct(KPIS.slaResposta)}</div>
            <div className="text-xs text-muted-foreground mt-1">conversas atendidas em &lt; 15min</div>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Fluxo de caixa</div>
              <div className="font-display text-lg font-bold mt-1">Últimos 6 meses</div>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-primary" />Entradas</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-accent" />Saídas</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CAIXA_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="mes" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                  formatter={(v: number) => brl(v)}
                />
                <Line type="monotone" dataKey="entrada" stroke="var(--brand-purple)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="saida" stroke="var(--brand-orange)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Origens + Corretores + Últimas */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Origem dos leads</div>
          <div className="font-display text-lg font-bold mt-1 mb-3">Atribuição real</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ORIGENS} dataKey="leads" nameKey="origem" innerRadius={40} outerRadius={70} paddingAngle={3}>
                  {ORIGENS.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="var(--card)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {ORIGENS.slice(0, 4).map((o, i) => (
              <div key={o.origem} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  {o.origem}
                </span>
                <span className="text-muted-foreground">{o.leads} leads · {o.fechados} fechados</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Corretores · Junho</div>
          <div className="font-display text-lg font-bold mt-1 mb-3">VGV por corretor</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CORRETORES} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="nome" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: string) => v.split(" ")[0]} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => brl(v)} />
                <Bar dataKey="vgv" radius={[8, 8, 0, 0]} fill="var(--brand-purple)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-2">
            {CORRETORES.map((c) => (
              <div key={c.nome} className="flex justify-between text-xs">
                <span className="font-medium">{c.nome}</span>
                <span className="text-muted-foreground">{c.fechadas} fech. · {c.pipeline} pipe</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Últimas vendas</div>
              <div className="font-display text-lg font-bold mt-1">Fluxo recente</div>
            </div>
            <Users className="size-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {VENDAS.slice(0, 5).map((v) => (
              <div key={v.id} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-muted/60 transition">
                <div className="size-9 rounded-full gradient-brand grid place-items-center text-white text-xs font-bold">
                  {v.cliente.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">{v.cliente}</div>
                  <div className="text-xs text-muted-foreground truncate">{v.empreendimento} · {v.unidade}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{brl(v.vgv)}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{v.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}