import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Plus, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CLIENTES } from "@/lib/mock";

export const Route = createFileRoute("/_app/crm")({
  head: () => ({ meta: [{ title: "CRM · ApeCerto" }] }),
  component: CrmPage,
});

const TAG_TINT: Record<string, string> = {
  Quente: "bg-destructive/15 text-destructive",
  Morno: "bg-warning/20 text-warning",
  Novo: "bg-primary/15 text-primary",
  Comprador: "bg-success/20 text-success",
};

function CrmPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM · Clientes"
        subtitle="Base viva sincronizada com o DataCrazy. Cada cliente ligado à sua unidade e ao seu corretor."
        actions={
          <>
            <button className="h-10 px-4 rounded-xl border border-border bg-card text-sm font-semibold flex items-center gap-2 hover:bg-muted transition">
              <UserPlus className="size-4" /> Importar
            </button>
            <button className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-semibold flex items-center gap-2 shadow-glow">
              <Plus className="size-4" /> Novo cliente
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: "Base total", v: "1.284" },
          { l: "Quentes agora", v: "37" },
          { l: "Sem toque > 7d", v: "62" },
          { l: "Novos hoje", v: "8" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{s.l}</div>
            <div className="font-display text-2xl md:text-3xl font-bold mt-2">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Clientes</div>
            <div className="font-display text-lg font-bold mt-1">{CLIENTES.length} exibidos</div>
          </div>
          <div className="flex gap-2">
            {["Todos", "Quentes", "Novos", "Compradores"].map((t, i) => (
              <button key={t} className={`px-3 h-8 rounded-full text-xs font-semibold border ${i === 0 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-muted-foreground bg-muted/50">
                <th className="text-left font-semibold px-6 py-3">Cliente</th>
                <th className="text-left font-semibold px-6 py-3">Tag</th>
                <th className="text-left font-semibold px-6 py-3">Unidade vinculada</th>
                <th className="text-left font-semibold px-6 py-3">Corretor</th>
                <th className="text-left font-semibold px-6 py-3">Último contato</th>
                <th className="text-right font-semibold px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {CLIENTES.map((c) => (
                <tr key={c.id} className="border-t border-border hover:bg-muted/40 transition">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full gradient-brand grid place-items-center text-white text-xs font-bold">
                        {c.nome.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="font-semibold">{c.nome}</div>
                        <div className="text-xs text-muted-foreground">{c.tel}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${TAG_TINT[c.tag] ?? "bg-muted text-muted-foreground"}`}>{c.tag}</span>
                  </td>
                  <td className="px-6 py-3 font-medium">{c.unidade}</td>
                  <td className="px-6 py-3 text-muted-foreground">{c.corretor}</td>
                  <td className="px-6 py-3 text-muted-foreground">{c.ultimo}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="size-8 rounded-lg hover:bg-muted grid place-items-center" aria-label="Ligar"><Phone className="size-4 text-muted-foreground" /></button>
                      <button className="size-8 rounded-lg hover:bg-muted grid place-items-center" aria-label="WhatsApp"><MessageCircle className="size-4 text-muted-foreground" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}