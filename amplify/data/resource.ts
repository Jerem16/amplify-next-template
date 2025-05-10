import type { ClientSchema } from "@aws-amplify/backend";
import { a, defineData } from "@aws-amplify/backend";
import { addUserToGroup } from "./add-user-to-group/resource";
const schema = a.schema({
    AdminTodo: a
        .model({
            content: a.string(),
        })
        .authorization((allow) => [
            allow.groups(["ADMINS"]).to(["create", "update", "delete", "read"]),
            allow.owner().to(["read"]),
        ]),

    PublicTodo: a
        .model({
            content: a.string(),
        })
        .authorization((allow) => [allow.owner()]),
    addUserToGroup: a
        .mutation()
        .arguments({
            userId: a.string().required(),
            groupName: a.string().required(),
        })
        .authorization((allow) => [allow.group("ADMINS")])
        .handler(a.handler.function(addUserToGroup))
        .returns(a.json()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "iam",
    },
});
