export interface IReceita {
    id?: number;
    nome?: string;
    tempo_preparo_minutos?: number;
    porcoes?: number;
    modo_preparo: string;
    ingredientes?: string;
    id_usuario: number;
    id_categoria?: number;
  }
  