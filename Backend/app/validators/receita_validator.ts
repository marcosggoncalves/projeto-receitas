import vine from "@vinejs/vine";

export const receitaValidator = vine.compile(
    vine.object({
        id: vine.number().optional(),
        nome: vine.string().maxLength(45),
        tempoPreparoMinutos: vine.number(),
        porcoes: vine.number(),
        modoPreparo: vine.string(),
        ingredientes: vine.string(),
        idUsuario: vine.number(),
        idCategoria: vine.number()
    })
);
