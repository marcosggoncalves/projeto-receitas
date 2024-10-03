import vine from "@vinejs/vine";

export const usuarioValidator = vine.compile(
    vine.object({
        id: vine.number().optional(),
        nome: vine.string().maxLength(45),
        login: vine.string().minLength(1),   
        senha: vine.string().minLength(1) 
    })
);
