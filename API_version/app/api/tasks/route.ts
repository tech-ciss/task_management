import { NextResponse } from "next/server";
import { createTask, getAllTasks } from "../../../lib/tasks-store";

export async function GET() {
  try {
    const tasks = getAllTasks();
    return NextResponse.json(tasks, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur interne." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: unknown };
    const text = typeof body?.text === "string" ? body.text.trim() : "";

    if (!text) {
      return NextResponse.json({ error: "Le champ text est requis." }, { status: 400 });
    }

    const task = createTask(text);
    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur interne." }, { status: 500 });
  }
}
