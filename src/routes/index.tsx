import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Shield, UserRound } from "lucide-react";
import { USUARIOS, setUser, type Usuario } from "@/lib/session";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  function entrar(u: Usuario) {
    setUser(u.id);
    navigate({ to: "/dashboard" });
  }

  const admins = USUARIOS.filter((u) => u.papel === "admin");
  const corretores = USUARIOS.filter((u) => u.papel === "corretor");

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

      {/* Right: profile selector */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <motion.div
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

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Quem é você?</h1>
          <p className="text-muted-foreground mt-2">Escolha seu perfil para entrar.</p>

          <div className="mt-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              <Shield className="size-3.5" /> Administração
            </div>
            <div className="grid gap-2">
              {admins.map((u) => (
                <ProfileButton key={u.id} u={u} onClick={() => entrar(u)} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              <UserRound className="size-3.5" /> Corretores
            </div>
            <div className="grid gap-2">
              {corretores.map((u) => (
                <ProfileButton key={u.id} u={u} onClick={() => entrar(u)} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileButton({ u, onClick }: { u: Usuario; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 w-full rounded-2xl border border-border bg-card px-4 py-3 text-left shadow-card hover:border-primary hover:shadow-glow transition"
    >
      <div className="size-10 rounded-full gradient-brand grid place-items-center text-white text-sm font-bold shrink-0">
        {u.iniciais}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold truncate">{u.nome}</div>
        <div className="text-xs text-muted-foreground truncate">
          {u.papel === "admin" ? "Admin · acesso total" : `Corretor · ${u.instancia ?? ""}`}
        </div>
      </div>
      <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition" />
    </button>
  );
}
