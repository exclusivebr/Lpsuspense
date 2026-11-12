"use server";

import { redirect } from "next/navigation";
import { requireStudent } from "@/lib/accounts";
import { novoIdTentativa, salvarTentativa } from "@/lib/resultados";
import { corrigir, getSimulado, validarTurbo } from "@/lib/simulados";

export async function enviarSimulado(formData: FormData) {
  const aluno = await requireStudent();
  const sim = getSimulado(String(formData.get("simuladoId") ?? ""));
  if (!sim) throw new Error("Simulado inválido.");

  let ids: string[];
  let brutas: unknown[];
  try {
    ids = JSON.parse(String(formData.get("questoes") ?? "[]"));
    brutas = JSON.parse(String(formData.get("respostas") ?? "[]"));
  } catch {
    throw new Error("Dados inválidos.");
  }
  if (!Array.isArray(ids) || !Array.isArray(brutas) || ids.some((x) => typeof x !== "string")) throw new Error("Dados inválidos.");
  const valido = sim.tipo === "turbo" ? validarTurbo(ids) : ids.length === sim.questoes.length && ids.every((id, i) => id === sim.questoes[i]);
  if (!valido) throw new Error("As questões não conferem com o simulado.");

  const respostas = ids.map((_, i) => {
    const v = brutas[i];
    return typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 4 ? v : null;
  });
  const duracao = Math.max(0, Math.min(Number(formData.get("duracao")) || 0, sim.minutos * 60 + 120));

  const id = novoIdTentativa();
  await salvarTentativa({
    id,
    aluno: aluno.id,
    simuladoId: sim.id,
    titulo: sim.titulo,
    questoes: ids,
    respostas,
    duracaoSeg: duracao,
    finalizadoEm: new Date().toISOString(),
    ...corrigir(ids, respostas),
  });
  redirect(`/area/resultado/${id}`);
}
