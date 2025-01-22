export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (body.email === 'admin' && body.password === 'admin') {
        return {
            user: { id: 1, email: body.email },
            token: 'your-jwt-token',
        };
    }

    throw createError({
        statusCode: 401,
        message: 'Invalid credentials',
    });
});
