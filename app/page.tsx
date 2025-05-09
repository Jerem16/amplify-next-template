"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
Amplify.configure(outputs);

const client = generateClient<Schema>();
export default function App() {
    const { user, signOut } = useAuthenticator();
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    function listTodos() {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }

    function deleteTodo(id: string) {
        if (confirm("Supprimer ce todo ?")) {
            client.models.Todo.delete({ id });
        }
    }

    useEffect(() => {
        listTodos();
    }, []);

    function createTodo() {
        client.models.Todo.create({
            content: window.prompt("Todo content"),
        });
    }

    return (
        <main>
            <h1>{user?.signInDetails?.loginId}'s todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.content}
                        <button onClick={() => deleteTodo(todo.id)}>🗑</button>
                    </li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br />
                <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
                    Review next steps of this tutorial.
                </a>
                <button onClick={signOut}>Sign out</button>
            </div>
        </main>
    );
}
