import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CAIXA, CAIXA_TREND, KPIS, brl, brl2 } from "@/lib/mock";

export const Route = createFileRoute("/_app/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro · ApeCerto" }] }),
  component: FinanceiroPage,
});

function FinanceiroPage() {
  const entradas = CAIXA.reduce((s, r) => s + r.entrada, 0);
  const saidas = CAIXA.reduce((s, r) => s + r.saida, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financeiro"
        subtitle="Caixa, comissões e conciliação — tudo em uma linha do tempo auditável."
        actions={
          <>
            <button className="h-10 px-4 rounded-xl border border-border bg-card text-sm font-semibold flex items-center gap-2 hover:bg-muted transition">
              <Download className="size-4" /> Exportar
            </button>
            <button className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-semibold flex items-center gap-2 shadow-glow">
              <Plus className="size-4" /> Novo lançamento
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Saldo em caixa" value={brl2(KPIS.saldoCaixa)} tint="from-primary/25 to-primary/0" />
        <StatCard label="Entradas do mês" value={brl2(entradas)} up icon={ArrowUpRight} tint="from-success/25 to-success/0" />
        <StatCard label="Saídas do mês" value={brl2(saidas)} down icon={ArrowDownRight} tint="from-accent/25 to-accent/0" />
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Fluxo consolidado</div>
            <div className="font-display text-lg font-bold mt-1">Entradas × Saídas · 6 meses</div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CAIXA_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-purple)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} formatter={(v: number) => brl(v)} />
              <Area type="monotone" dataKey="entrada" stroke="var(--brand-purple)" strokeWidth={2.5} fill="url(#ga)" />
              <Area type="monotone" dataKey="saida" stroke="var(--brand-orange)" strokeWidth={2.5} fill="url(#gb)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Movimentações</div>
            <div className="font-display text-lg font-bold mt-1">Junho / 2026</div>
          </div>
          <div className="flex gap-2">
            {["Todas", "Entradas", "Saídas"].map((t, i) => (
              <button key={t} className={`px-3 h-8 rounded-full text-xs font-semibold border ${i === 0 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-muted-foreground bg-muted/50">
                <th className="text-left font-semibold px-6 py-3">Data</th>
                <th className="text-left font-semibold px-6 py-3">Descrição</th>
                <th className="text-left font-semibold px-6 py-3">Categoria</th>
                <th className="text-right font-semibold px-6 py-3">Entrada</th>
                <th className="text-right font-semibold px-6 py-3">Saída</th>
              </tr>
            </thead>
            <tbody>
              {CAIXA.map((r, i) => (
                <tr key={i} className="border-t border-border hover:bg-muted/40 transition">
                  <td className="px-6 py-3 text-muted-foreground">{new Date(r.data).toLocaleDateString("pt-BR")}</td>
                  <td className="px-6 py-3 font-medium">{r.descricao}</td>
                  <td className="px-6 py-3"><span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-semibold">{r.categoria}</span></td>
                  <td className="px-6 py-3 text-right font-semibold text-success">{r.entrada ? brl2(r.entrada) : "—"}</td>
                  <td className="px-6 py-3 text-right font-semibold text-destructive">{r.saida ? brl2(r.saida) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label, value, up, down, icon: Icon, tint,
}: {
  label: string; value: string; up?: boolean; down?: boolean;
  icon?: React.ComponentType<{ className?: string }>; tint: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 shadow-card">
      <div className={`absolute -top-8 -right-8 size-32 rounded-full bg-gradient-to-br ${tint} blur-2xl`} />
      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
        <div className="font-display text-3xl font-bold mt-2">{value}</div>
        {(up || down) && Icon && (
          <div className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold ${up ? "text-success" : "text-destructive"}`}>
            <Icon className="size-3" /> {up ? "+12,4%" : "-8,2%"} vs. mês passado
          </div>
        )}
      </div>
    </div>
  );
}