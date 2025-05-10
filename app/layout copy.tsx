"use client";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [todos, setTodos] = useState<Array<Schema["AdminTodo"]["type"]>>([]);

    function listTodos() {
        client.models.AdminTodo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }

    useEffect(() => {
        listTodos();
    }, []);

    return (
        <main>
            <h1>My todos</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.content}</li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br />
                <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
                    Review next steps of this tutorial.
                </a>
            </div>
            {children}
        </main>
    );
}
