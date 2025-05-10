"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const publicClient = generateClient<Schema>();

export default function PublicAdminTodos() {
    const [todos] = useState<Schema["AdminTodo"]["type"][]>([]);

    // useEffect(() => {
    //     publicClient.models.AdminTodo.list()
    //         .then((result) => {
    //             console.log("AdminTodos publics via API Key", result);
    //             setTodos(result.data);
    //         })
    //         .catch((err) => console.error("Erreur lecture publique", err));
    // }, []);

    return (
        <section>
            <h2>Todos (gérés par l'équipe admin)</h2>
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo) => <li key={todo.id}>{todo.content}</li>)
                ) : (
                    <li>Aucun todo public disponible.</li>
                )}
            </ul>
        </section>
    );
}
