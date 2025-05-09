
export const isAdmin = ({
    user,
}: {
    user?: { signInDetails?: { loginId?: string } };
}) => {
    return user?.signInDetails?.loginId === process.env.ADMIN_EMAIL;
};
