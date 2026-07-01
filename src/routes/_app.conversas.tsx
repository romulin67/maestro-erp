import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Paperclip, Phone, Video, MoreVertical, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CONVERSAS, MENSAGENS } from "@/lib/mock";

export const Route = createFileRoute("/_app/conversas")({
  head: () => ({ meta: [{ title: "Conversas · ApeCerto" }] }),
  component: ConversasPage,
});

function ConversasPage() {
  const [sel, setSel] = useState(CONVERSAS[0].id);
  const conv = CONVERSAS.find((c) => c.id === sel) ?? CONVERSAS[0];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Conversas"
        subtitle="Central unificada · WhatsApp via D-API, DM Instagram e histórico DataCrazy."
      />

      <div className="grid lg:grid-cols-[340px_1fr] gap-4 h-[calc(100vh-220px)] min-h-[520px]">
        {/* List */}
        <aside className="rounded-2xl bg-card border border-border shadow-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <input
              placeholder="Buscar conversa…"
              className="w-full h-10 px-4 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-border focus:outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSAS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSel(c.id)}
                className={`w-full text-left px-4 py-3 border-b border-border transition flex items-start gap-3 ${
                  sel === c.id ? "bg-primary/5" : "hover:bg-muted/40"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="size-11 rounded-full gradient-brand grid place-items-center text-white text-sm font-bold">
                    {c.cliente.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                  </div>
                  {c.online && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-success ring-2 ring-card" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-semibold text-sm truncate">{c.cliente}</div>
                    <div className="text-[11px] text-muted-foreground shrink-0">{c.quando}</div>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <div className="text-xs text-muted-foreground truncate">{c.ultima}</div>
                    {c.naoLidas > 0 && (
                      <span className="text-[10px] font-bold size-5 rounded-full gradient-brand text-white grid place-items-center shrink-0">
                        {c.naoLidas}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{c.canal}</span>
                    <span className="text-[10px] text-muted-foreground">· {c.corretor}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Thread */}
        <section className="rounded-2xl bg-card border border-border shadow-card overflow-hidden flex flex-col">
          <header className="p-4 border-b border-border flex items-center gap-3">
            <div className="size-10 rounded-full gradient-brand grid place-items-center text-white text-sm font-bold">
              {conv.cliente.split(" ").map((x) => x[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{conv.cliente}</div>
              <div className="text-xs text-muted-foreground truncate">{conv.canal} · {conv.online ? "online agora" : "offline"} · {conv.corretor}</div>
            </div>
            <div className="flex items-center gap-1">
              <button className="size-9 rounded-lg hover:bg-muted grid place-items-center" aria-label="Ligar"><Phone className="size-4" /></button>
              <button className="size-9 rounded-lg hover:bg-muted grid place-items-center" aria-label="Vídeo"><Video className="size-4" /></button>
              <button className="size-9 rounded-lg hover:bg-muted grid place-items-center" aria-label="Mais"><MoreVertical className="size-4" /></button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklab,var(--brand-purple)_5%,transparent),transparent_50%)]">
            {MENSAGENS.map((m, i) => {
              const me = m.de === "corretor";
              return (
                <div key={i} className={`flex ${me ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    me ? "gradient-brand text-white rounded-br-sm" : "bg-card border border-border rounded-bl-sm"
                  }`}>
                    <div>{m.texto}</div>
                    <div className={`text-[10px] mt-1 ${me ? "text-white/70" : "text-muted-foreground"}`}>{m.quando}</div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-2xl px-4 py-3 text-sm border border-dashed border-primary/40 bg-primary/5 flex items-start gap-2">
                <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Sugestão da IA</div>
                  <div className="mt-1">Envie a proposta com desconto de 2% já pré-preenchida? A cliente sinalizou fechamento.</div>
                  <div className="mt-2 flex gap-2">
                    <button className="text-xs font-semibold px-3 py-1 rounded-lg gradient-brand text-white">Usar</button>
                    <button className="text-xs font-semibold px-3 py-1 rounded-lg border border-border">Editar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="p-4 border-t border-border">
            <div className="flex items-center gap-2 rounded-xl bg-muted/60 border border-border pl-2">
              <button className="size-9 rounded-lg hover:bg-muted grid place-items-center" aria-label="Anexar"><Paperclip className="size-4 text-muted-foreground" /></button>
              <input
                placeholder="Escreva uma mensagem…"
                className="flex-1 h-11 bg-transparent focus:outline-none text-sm"
              />
              <button className="h-9 px-4 mr-1 rounded-lg gradient-brand text-white text-sm font-bold flex items-center gap-1.5">
                <Send className="size-4" /> Enviar
              </button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}