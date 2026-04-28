import { NextResponse } from "next/server";
import { deleteTaskById, updateTaskStatus } from "../../../../lib/tasks-store";
import type { TaskStatus } from "../../../../types/task";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as { status?: unknown };
    const status = body?.status;

    if (status !== "pending" && status !== "completed") {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }

    const updated = updateTaskStatus(id, status as TaskStatus);
    if (!updated) {
      return NextResponse.json({ error: "Tâche introuvable." }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur interne." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const deleted = deleteTaskById(id);

    if (!deleted) {
      return NextResponse.json({ error: "Tâche introuvable." }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur interne." }, { status: 500 });
  }
}
