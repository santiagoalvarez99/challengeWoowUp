export enum TipoAlerta {
  Informativa,
  Urgente,
}

export interface IAlerta {
  id: number;
  mensaje: string;
  tipo: TipoAlerta;
  expira: Date;
  leida: boolean;
  tema: ITema;
  estaExpirada(): boolean;
}

export interface ITema {
  id: number;
  nombre: string;
}

export interface IUsuario {
  temasSeguidos: ITema[];
  id: number;
  nombre: string;
  sigueTema(tema: ITema): boolean;
  recibirAlerta(alerta: IAlerta): void;
  obtenerAlertasNoLeidas(): IAlerta[];
  marcarAlertaLeida(idAlerta: number): void;
}
