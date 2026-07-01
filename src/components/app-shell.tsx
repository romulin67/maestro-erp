import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  Briefcase,
  Building2,
  Users,
  MessagesSquare,
  Search,
  Bell,
  LogOut,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/financeiro", label: "Financeiro", icon: Wallet },
  { to: "/negocios", label: "Negócios", icon: Briefcase },
  { to: "/produtos", label: "Produtos", icon: Building2 },
  { to: "/crm", label: "CRM", icon: Users },
  { to: "/conversas", label: "Conversas", icon: MessagesSquare },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full flex text-foreground">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground sticky top-0 h-screen">
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="size-10 rounded-2xl gradient-brand grid place-items-center shadow-glow">
            <Sparkles className="size-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-none">ApeCerto</div>
            <div className="text-[11px] uppercase tracking-widest opacity-60 mt-1">Sistema Operacional</div>
          </div>
        </div>

        <nav className="px-3 mt-2 flex-1 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-sidebar-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mx-3 mb-4 rounded-2xl bg-sidebar-accent/60 border border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full gradient-brand grid place-items-center text-white text-sm font-bold">RM</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Rômulo M.</div>
              <div className="text-xs opacity-60 truncate">Operações · Admin</div>
            </div>
            <Link to="/" className="ml-auto opacity-60 hover:opacity-100" aria-label="Sair">
              <LogOut className="size-4" />
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 glass border-b border-border/60 px-4 md:px-8 h-16 flex items-center gap-3">
          <div className="md:hidden size-9 rounded-xl gradient-brand grid place-items-center text-white">
            <Sparkles className="size-4" />
          </div>
          <div className="relative flex-1 max-w-xl">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar cliente, unidade, corretor…"
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-transparent focus:bg-card focus:border-border focus:outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-success/15 text-success">
              DataCrazy · online
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/15 text-accent-foreground/80">
              D-API · online
            </span>
          </div>
          <button className="relative size-10 rounded-xl bg-muted/50 hover:bg-muted grid place-items-center" aria-label="Notificações">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-accent" />
          </button>
        </header>

        <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>

        <nav className="md:hidden sticky bottom-0 glass border-t border-border/60 grid grid-cols-6 py-1">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <Link key={to} to={to} className={`flex flex-col items-center gap-0.5 py-2 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="size-4" />
                <span className="truncate max-w-full">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}