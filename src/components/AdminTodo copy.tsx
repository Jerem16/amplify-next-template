// components/AdminTodo.tsx
"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { fetchAuthSession } from "aws-amplify/auth";

const client = generateClient<Schema>();

export default function AdminTodo() {
    const [todos, setTodos] = useState<Array<Schema["AdminTodo"]["type"]>>([]);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        const sub = client.models.AdminTodo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });

        // Vérifie si l'utilisateur est dans le groupe ADMINS
        async function checkGroup() {
            try {
                const session = await fetchAuthSession();
                const groups =
                    session.tokens?.idToken?.payload["cognito:groups"] || [];
                setCanEdit(groups.includes("ADMINS"));
            } catch (err) {
                // Utilisateur non connecté ou pas de token (public)
                setCanEdit(false);
            }
        }

        checkGroup();

        return () => sub.unsubscribe();
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
        <section>
            <h2>Todos Admin (visibles par tous)</h2>
            {canEdit && <button onClick={createTodo}>+ Ajouter</button>}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.content}
                        {canEdit && (
                            <button onClick={() => deleteTodo(todo.id)}>
                                🗑
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
