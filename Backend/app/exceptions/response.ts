import { errors } from "@vinejs/vine";
import { errors as lucidErrors } from "@adonisjs/lucid"
import { Response } from "@adonisjs/core/http"; 
import { Mensagens } from "../constants/mensagens.js"; 
import { formatBodyRequest } from "../utils/format_body_request.js";

export const errorResponse = (response: Response, error: any) => {
    let status = 500; // Status code padrão para erro interno do servidor
    let message = Mensagens.ERROR_SERVIDOR;
    let data: any;
     
    // Verifica se o erro possui um status definido
    if (error && error.status) {
        status = error.status;
    }

    // Verifica se o erro possui uma mensagem definida
    if (error && error.message) {
        message = error.message;
    }
   
    // Verifica se o erro é uma exceção de validação
    if (error instanceof errors.E_VALIDATION_ERROR) {
        status = 400; // Bad request
        message = Mensagens.DADOS_INVALIDOS;
        data = formatBodyRequest(error.messages);
    }

    // Verifica se o erro é uma exceção de "registro não encontrado"
    if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
        status = 404;  
        message = Mensagens.NAO_ENCONTRADO
    }

    switch (error?.code) {
        case 'ER_DUP_ENTRY':
            status = 400; // Bad request
            message = Mensagens.USUARIO_DUPLICADO;
            break;
        case 'E_INVALID_CREDENTIALS':
            status = 401; // Unauthorized
            message = Mensagens.CREDENCIAIS_INVALIDAS;
            break;
    }

    return response.status(status).send({
        status: false,
        message: message,
        data: data
    });
};
