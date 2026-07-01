import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { VENDAS, brl } from "@/lib/mock";

export const Route = createFileRoute("/_app/negocios")({
  head: () => ({ meta: [{ title: "Negócios · ApeCerto" }] }),
  component: NegociosPage,
});

// Vocabulário oficial da VENDAS. Não inventar status novos (a DRE depende destes).
const STATUS_TINT: Record<string, string> = {
  Pendente: "bg-warning/20 text-warning",
  Concluído: "bg-chart-3/15 text-chart-3",
  Pago: "bg-success/20 text-success",
  Distrato: "bg-destructive/15 text-destructive",
};
const statusTint = (s: string) => STATUS_TINT[s] ?? "bg-muted text-muted-foreground";

const FILTROS = ["Todos", "Pendente", "Concluído", "Pago", "Distrato"] as const;

function NegociosPage() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<(typeof FILTROS)[number]>("Todos");

  const lista = VENDAS.filter((v) => {
    const okStatus = status === "Todos" || v.status === status;
    const okBusca =
      !busca ||
      `${v.cliente} ${v.empreendimento} ${v.unidade} ${v.corretor} ${v.origem}`
        .toLowerCase()
        .includes(busca.toLowerCase());
    return okStatus && okBusca;
  });

  const vgvTotal = VENDAS.reduce((s, v) => s + v.vgv, 0);
  const pagos = VENDAS.filter((v) => v.status === "Pago").length;
  const distratos = VENDAS.filter((v) => v.status === "Distrato").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Negócios · Contratos"
        subtitle={`${VENDAS.length} contratos · ${brl(vgvTotal)} em VGV · um lead só vira negócio quando há contrato`}
        actions={
          <button className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-semibold flex items-center gap-2 shadow-glow">
            <Plus className="size-4" /> Novo negócio
          </button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: "Contratos", v: String(VENDAS.length) },
          { l: "VGV total", v: brl(vgvTotal) },
          { l: "Pagos", v: String(pagos) },
          { l: "Distratos", v: String(distratos) },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{s.l}</div>
            <div className="font-display text-2xl font-bold mt-2">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar cliente, empreendimento, unidade, origem…"
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-transparent focus:bg-card focus:border-border focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTROS.map((f) => (
              <button
                key={f}
                onClick={() => setStatus(f)}
                className={`px-3 h-8 rounded-full text-xs font-semibold border ${
                  status === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-muted-foreground bg-muted/50">
                <th className="text-left font-semibold px-6 py-3">Cliente</th>
                <th className="text-left font-semibold px-6 py-3">Empreendimento / Unid.</th>
                <th className="text-left font-semibold px-6 py-3">Corretor</th>
                <th className="text-left font-semibold px-6 py-3">Origem</th>
                <th className="text-right font-semibold px-6 py-3">VGV</th>
                <th className="text-left font-semibold px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((v) => (
                <tr key={v.id} className="border-t border-border hover:bg-muted/40 transition">
                  <td className="px-6 py-3 font-semibold">{v.cliente}</td>
                  <td className="px-6 py-3">
                    <div className="font-medium">{v.empreendimento} <span className="text-muted-foreground">· {v.unidade}</span></div>
                    <div className="text-xs text-muted-foreground">{v.bairro}</div>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{v.corretor}</td>
                  <td className="px-6 py-3 text-muted-foreground">{v.origem}</td>
                  <td className="px-6 py-3 text-right font-bold text-primary">{brl(v.vgv)}</td>
                  <td className="px-6 py-3">
                    <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusTint(v.status)}`}>{v.status}</span>
                  </td>
                </tr>
              ))}
              {lista.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground text-sm">
                    Nenhum contrato com esse filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
