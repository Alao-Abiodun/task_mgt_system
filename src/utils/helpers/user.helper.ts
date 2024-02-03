export const removePasswordFromObject = (user: any): object => {
    const { password, ...rest } = user;
    return rest;
};
