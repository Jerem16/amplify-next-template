type AuthContext = {
    identity: {
        claim: (key: string) => string;
    };
};

export const isAdmin = (ctx: AuthContext) => {
    return ctx.identity.claim("email") === process.env.ADMIN_EMAIL;
};
