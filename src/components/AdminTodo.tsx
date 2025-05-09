// components/AdminTodo.tsx
"use client";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function AdminTodo() {
    const [todos, setTodos] = useState<Array<Schema["AdminTodo"]["type"]>>([]);

    useEffect(() => {
        const subscription = client.models.AdminTodo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
        return () => subscription.unsubscribe();
    }, []);

    function createTodo() {
        const content = window.prompt("Admin Todo content");
        if (content) {
            client.models.AdminTodo.create({ content });
        }
    }

    function deleteTodo(id: string) {
        if (confirm("Supprimer ce todo ?")) {
            client.models.AdminTodo.delete({ id });
        }
    }

    return (
        <div>
            <h2>Admin Todos</h2>
            <button onClick={createTodo}>+ New Admin Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.content}
                        <button onClick={() => deleteTodo(todo.id)}>🗑</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
