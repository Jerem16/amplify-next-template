import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    AdminTodo: a
        .model({
            content: a.string(),
        })
        .authorization((allow) => [
            allow.groups(["ADMINS"]).to(["create", "update", "delete", "read"]),
            // allow.publicApiKey().to(["read"]),
        ]),

    PublicTodo: a
        .model({
            content: a.string(),
        })
        .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "userPool",
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
