import vine from "@vinejs/vine";

export const receitaValidator = vine.compile(
    vine.object({
        id: vine.number().optional(),
        nome: vine.string().maxLength(45).optional(),
        tempo_preparo_minutos: vine.number().optional(),
        porcoes: vine.number().optional(),
        modo_preparo: vine.string(),
        ingredientes: vine.string().optional(),
        id_usuario: vine.number(),
        id_categoria: vine.number().optional(),
        created_at: vine.date().optional(),
        updated_at: vine.date().optional(),
    })
);
