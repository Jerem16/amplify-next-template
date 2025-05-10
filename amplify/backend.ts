import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { adminTodoStorage } from "./storage/resource";
defineBackend({
    auth,
    adminTodoStorage,
});
