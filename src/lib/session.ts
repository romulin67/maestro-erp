// Sessão de usuário do ApeCerto (perfil + papel + instância).
// Substitui o login por PIN. Quando o Supabase Auth entrar, trocar getUser/setUser
// por leitura da sessão autenticada + RLS por corretor.
import { useEffect, useState } from "react";

export type Papel = "admin" | "corretor";

export interface Usuario {
  id: string;
  nome: string;
  papel: Papel;
  iniciais: string;
  instancia?: string; // nome da instância no D-API (só corretor)
}

export const USUARIOS: Usuario[] = [
  { id: "samuel", nome: "Samuel Noviski", papel: "admin", iniciais: "SN" },
  { id: "djair", nome: "Djair", papel: "admin", iniciais: "DJ" },
  { id: "romulo", nome: "Rômulo", papel: "admin", iniciais: "RM" },
  { id: "claudia", nome: "Claudia", papel: "corretor", iniciais: "CL", instancia: "Claudia | D-Api" },
  { id: "tica", nome: "Tica", papel: "corretor", iniciais: "TI", instancia: "Tica 02 | D-Api" },
  { id: "elizangela", nome: "Elizangela", papel: "corretor", iniciais: "EL", instancia: "Eliz 2.0 | D-Api" },
  { id: "fabiano", nome: "Fabiano", papel: "corretor", iniciais: "FA", instancia: "Fabiano 02 | D-Api" },
  { id: "edrisia", nome: "Edrisia", papel: "corretor", iniciais: "ED", instancia: "Edrisia 1.0 | D-Api" },
];

const KEY = "apecerto.user";

export function setUser(id: string) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, id);
}

export function getUser(): Usuario {
  let id = "samuel";
  if (typeof window !== "undefined") id = localStorage.getItem(KEY) || "samuel";
  return USUARIOS.find((u) => u.id === id) || USUARIOS[0];
}

export function clearUser() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

// Hook seguro para SSR: começa com o padrão e resolve o usuário real após montar.
export function useCurrentUser(): Usuario {
  const [u, setU] = useState<Usuario>(USUARIOS[0]);
  useEffect(() => {
    setU(getUser());
  }, []);
  return u;
}

// Mapeia o nome da instância do D-API para o corretor dono dela.
const TOKENS: Record<string, string> = {
  fabiano: "fabiano",
  eliz: "elizangela",
  tica: "tica",
  edrisia: "edrisia",
  edris: "edrisia",
  claudia: "claudia",
};

export function corretorDaInstancia(instancia?: string): string {
  const s = (instancia || "").toLowerCase();
  for (const tok in TOKENS) if (s.includes(tok)) return TOKENS[tok];
  return "";
}
