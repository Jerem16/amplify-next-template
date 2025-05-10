import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: "amplifyTeamDrive",
    access: (allow) => ({
        "profile-pictures/{entity_id}/*": [
            allow.guest.to(["read"]),
            allow.entity("identity").to(["read", "write", "delete"]),
        ],
        "picture-submissions/*": [
            allow.authenticated.to(["read", "write"]),
            allow.guest.to(["read", "write"]),
        ],
    }),
});
export const firstBucket = defineStorage({
    name: "firstBucket",
    isDefault: true, // identify your default storage bucket (required)
});

export const secondBucket = defineStorage({
    name: "secondBucket",
    access: (allow) => ({
        "private/{entity_id}/*": [
            allow.entity("identity").to(["read", "write", "delete"]),
        ],
    }),
});
