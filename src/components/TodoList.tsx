"use client";

import React from "react";
import todos from "../data/data.json";

type Todo = {
    id: number;
    title: string;
    done: boolean;
};

export default function TodoList() {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Liste de Tâches</h2>
            <ul className="list-disc pl-6 space-y-2">
                {todos.map((todo: Todo) => (
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
