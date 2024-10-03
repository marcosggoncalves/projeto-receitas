import vine from "@vinejs/vine";

export const usuarioLoginValidator = vine.compile(
    vine.object({
        login: vine.string().minLength(1),
        senha: vine.string().minLength(1)
    })
);
