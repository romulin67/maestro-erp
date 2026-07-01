import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Filter, Plus } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { NEGOCIOS, STAGES, brl } from "@/lib/mock";

export const Route = createFileRoute("/_app/negocios")({
  head: () => ({ meta: [{ title: "Negócios · ApeCerto" }] }),
  component: NegociosPage,
});

const STAGE_TINT: Record<string, string> = {
  Novo: "bg-muted text-muted-foreground",
  Qualificação: "bg-chart-3/15 text-chart-3",
  Visita: "bg-warning/20 text-warning",
  Proposta: "bg-accent/20 text-accent-foreground",
  "Em cartório": "bg-primary/15 text-primary",
  Fechado: "bg-success/20 text-success",
};

function NegociosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline de negócios"
        subtitle={`${NEGOCIOS.length} negócios ativos · ${brl(NEGOCIOS.reduce((s, n) => s + n.vgv, 0))} em VGV potencial`}
        actions={
          <>
            <button className="h-10 px-4 rounded-xl border border-border bg-card text-sm font-semibold flex items-center gap-2 hover:bg-muted transition">
              <Filter className="size-4" /> Filtros
            </button>
            <button className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-semibold flex items-center gap-2 shadow-glow">
              <Plus className="size-4" /> Novo negócio
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {STAGES.map((stage) => {
          const items = NEGOCIOS.filter((n) => n.stage === stage);
          const total = items.reduce((s, n) => s + n.vgv, 0);
          return (
            <div key={stage} className="rounded-2xl bg-card/60 border border-border p-3 min-h-[420px] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stage}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{items.length} · {brl(total)}</div>
                </div>
                <div className="size-6 rounded-full bg-muted grid place-items-center text-[10px] font-bold">{items.length}</div>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto">
                {items.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="rounded-xl bg-card border border-border p-3 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{n.cliente}</div>
                        <div className="text-xs text-muted-foreground truncate">{n.empreendimento} · {n.unidade}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${STAGE_TINT[n.stage]}`}>
                        {n.stage}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">{brl(n.vgv)}</span>
                      <span className="text-[11px] text-muted-foreground">{n.corretor}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{n.origem}</span>
                      <span>{n.atualizado}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}