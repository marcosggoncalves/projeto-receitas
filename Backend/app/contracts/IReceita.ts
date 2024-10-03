export interface IReceita {
    id?: number;
    nome?: string;
    tempoPreparoMinutos?: number;
    porcoes?: number;
    modoPreparo: string;
    ingredientes?: string;
    idUsuario: number;
    idCategoria?: number;
  }
  