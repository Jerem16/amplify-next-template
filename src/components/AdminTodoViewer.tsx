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
        console.error("Error downloading file:", err);
        return null;
    }
}

export default function AdminTodoViewer({ fileName }: { fileName: string }) {
    const [todos, setTodos] = useState<Todo[] | null>(null);

    useEffect(() => {
        fetchAdminTodoFile(fileName).then(setTodos);
    }, [fileName]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">AdminTodo File Content</h2>
            {todos ? (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="p-2 bg-gray-100 rounded flex justify-between items-center"
                        >
                            <span>{todo.title}</span>
                            <span>{todo.done ? "✔️" : "❌"}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
