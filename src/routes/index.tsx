import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  function enter(e: React.FormEvent) {
    e.preventDefault();
    if (pin.length < 4) {
      setErr("PIN precisa ter pelo menos 4 dígitos.");
      return;
    }
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden md:flex flex-col justify-between p-10 gradient-brand text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_35%)]" />
        <div className="relative flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-white/15 backdrop-blur grid place-items-center">
            <Sparkles className="size-6" />
          </div>
          <div>
            <div className="font-display font-bold text-xl leading-none">ApeCerto</div>
            <div className="text-xs uppercase tracking-widest opacity-80 mt-1">Sistema Operacional</div>
          </div>
        </div>

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold leading-[1.05] max-w-md"
          >
            Uma espinha só para <span className="italic">todo</span> o negócio.
          </motion.h2>
          <p className="text-white/85 mt-4 max-w-md leading-relaxed">
            Financeiro, Negócios, Produtos, CRM e Conversas — cadastro único,
            comissão auditável, pipeline vivo.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {[
              { k: "R$ 12,4M", v: "VGV YTD" },
              { k: "47", v: "Pipeline" },
              { k: "R$ 0", v: "Divergência" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-white/12 backdrop-blur p-4 border border-white/15">
                <div className="font-display font-bold text-xl">{s.k}</div>
                <div className="text-[11px] uppercase tracking-widest opacity-80 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs opacity-75">v2.0 · integrado com DataCrazy e D-API</div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <motion.form
          onSubmit={enter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="md:hidden mb-8 flex items-center gap-3">
            <div className="size-11 rounded-2xl gradient-brand grid place-items-center text-white">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="font-display font-bold text-lg">ApeCerto</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Sistema Operacional</div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Entre com seu PIN</h1>
          <p className="text-muted-foreground mt-2">Acesso rápido, sem senha. Peça o seu no time de operações.</p>

          <div className="mt-8">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">PIN</label>
            <input
              autoFocus
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setErr("");
                setPin(e.target.value.replace(/\D/g, ""));
              }}
              placeholder="••••"
              className="mt-2 w-full h-16 text-center text-3xl font-bold tracking-[0.8em] rounded-2xl bg-card border border-border shadow-card focus:outline-none focus:border-primary focus:shadow-glow transition"
            />
            {err && <p className="text-destructive text-sm mt-2 font-medium">{err}</p>}
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-14 rounded-2xl gradient-brand text-white font-bold text-base shadow-glow hover:brightness-110 transition flex items-center justify-center gap-2"
          >
            Entrar <ArrowRight className="size-5" />
          </button>

          <p className="text-xs text-muted-foreground mt-6 text-center">
            Dica demo: digite qualquer PIN de 4+ dígitos para explorar.
          </p>
        </motion.form>
      </div>
    </div>
  );
}