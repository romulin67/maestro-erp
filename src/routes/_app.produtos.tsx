import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, MapPin, Plus, Star } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { PRODUTOS, brl } from "@/lib/mock";

export const Route = createFileRoute("/_app/produtos")({
  head: () => ({ meta: [{ title: "Produtos · ApeCerto" }] }),
  component: ProdutosPage,
});

const STATUS_TINT: Record<string, string> = {
  Pronto: "bg-success/20 text-success",
  Lançamento: "bg-accent/20 text-accent-foreground",
  Vendido: "bg-muted text-muted-foreground",
};

function ProdutosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfólio de unidades"
        subtitle={`${PRODUTOS.length} imóveis · ${brl(PRODUTOS.reduce((s, p) => s + p.preco, 0))} em VGV disponível`}
        actions={
          <>
            {["Todos", "Pronto", "Lançamento", "Vendido"].map((t, i) => (
              <button key={t} className={`h-10 px-3 rounded-xl text-sm font-semibold border ${i === 0 ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card text-muted-foreground hover:bg-muted"}`}>{t}</button>
            ))}
            <button className="h-10 px-4 rounded-xl gradient-brand text-white text-sm font-semibold flex items-center gap-2 shadow-glow">
              <Plus className="size-4" /> Nova unidade
            </button>
          </>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUTOS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-3xl bg-card border border-border shadow-card overflow-hidden hover:-translate-y-1 hover:shadow-glow transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg,
                    oklch(${0.55 + (i * 0.05) % 0.3} 0.15 ${(i * 60) % 360}),
                    oklch(${0.72 - (i * 0.03) % 0.2} 0.18 ${(i * 60 + 40) % 360}))`,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
              {p.destaque && (
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-white/95 text-primary px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="size-3 fill-accent text-accent" /> Destaque
                </span>
              )}
              <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${STATUS_TINT[p.status]}`}>{p.status}</span>
              <button className="absolute bottom-3 right-3 size-9 rounded-full bg-white/95 grid place-items-center hover:scale-110 transition" aria-label="Favoritar">
                <Heart className="size-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display font-bold text-lg truncate">{p.nome}</h3>
              </div>
              <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="size-3" /> {p.bairro} · {p.tipo}
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">a partir de</div>
                  <div className="font-display text-2xl font-bold text-gradient-brand">{brl(p.preco)}</div>
                </div>
                <button className="text-xs font-semibold text-primary hover:underline">Ver ficha →</button>
              </div>
              {p.tags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}