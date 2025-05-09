// components/UserTodo.tsx
"use client";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function UserTodo() {
    const [todos, setTodos] = useState<Array<Schema["PublicTodo"]["type"]>>([]);

    useEffect(() => {
        const subscription = client.models.PublicTodo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
        return () => subscription.unsubscribe();
    }, []);

    function createTodo() {
        const content = window.prompt("Your Todo");
        if (content) {
            client.models.PublicTodo.create({ content });
        }
    }

    function deleteTodo(id: string) {
        if (confirm("Supprimer ce todo ?")) {
            client.models.PublicTodo.delete({ id });
        }
    }

    return (
        <div>
            <h2>User Todos</h2>
            <button onClick={createTodo}>+ New Todo</button>
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
