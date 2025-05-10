"use client";

import React, { useEffect, useState } from "react";
import { downloadData } from "aws-amplify/storage";

type AdminTodoViewerProps = {
    fileName: string;
};
type Todo = {
    id: number;
    title: string;
    completed: boolean;
};
export default function AdminTodoViewer({ fileName }: AdminTodoViewerProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const result = await downloadData({
                    path: `admin-todos/${fileName}`,
                }).result;

                if (result instanceof Blob) {
                    const text = await result.text();
                    const data = JSON.parse(text);
                    setTodos(data);
                }
            } catch (error) {
                console.error("Erreur de chargement :", error);
            }
        };

        fetchTodos();
    }, [fileName]);

    return (
        <div>
            <h2 className="text-xl font-bold">Todos Admin</h2>
            {todos.length === 0 ? (
                <p>Aucune tâche trouvée.</p>
            ) : (
                <ul className="mt-2 space-y-2">
                    {todos.map((todo) => (
                        <li key={todo.id} className="p-2 bg-gray-100 rounded">
                            {todo.title} — {todo.completed ? "✔️" : "❌"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
