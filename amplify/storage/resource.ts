import { defineStorage } from "@aws-amplify/backend";

export const adminTodoStorage = defineStorage({
    name: "adminTodoStorage",
    isDefault: true, // si tu n'as qu'un seul bucket
    access: (allow) => ({
        // Accès en lecture aux invités pour tous les fichiers AdminTodo
        "admin-todos/*": [
            allow.guest.to(["read"]),
            allow.authenticated.to(["read", "write", "delete"]),
        ],
    }),
});
