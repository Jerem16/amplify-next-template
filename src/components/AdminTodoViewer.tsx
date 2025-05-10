"use client";

import React, { useEffect, useState } from "react";
import { downloadData } from "aws-amplify/storage";

type Todo = {
    id: number;
    title: string;
    done: boolean;
};

async function fetchAdminTodoFile(fileName: string): Promise<Todo[] | null> {
    try {
        const result = await downloadData({
            path: `admin-todos/${fileName}`,
            options: {
                bucket: "adminTodoStorage",
            },
        }).result;

        const text = await result?.body?.text();
        return text ? JSON.parse(text) : null;
    } catch (err) {
        console.error("Erreur lors du téléchargement :", err);
        return null;
    }
}

export default function AdminTodoViewer({ fileName }: { fileName: string }) {
    const [todos, setTodos] = useState<Todo[] | null>(null);

    useEffect(() => {
        fetchAdminTodoFile(fileName).then(setTodos);
    }, [fileName]);

    if (!todos) return <p>Chargement des tâches...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Tâches Admin depuis S3</h2>
            <ul className="list-disc pl-6 space-y-2">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={
                            todo.done ? "line-through text-gray-500" : ""
                        }
                    >
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
