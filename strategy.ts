import { IAlerta, TipoAlerta } from "./interfaces";

// Estrategia base
export interface EstrategiaOrdenamiento {
  ordenar(alertas: IAlerta[]): IAlerta[];
}

// Estrategia para alertas urgentes (LIFO)
export class EstrategiaUrgente implements EstrategiaOrdenamiento {
  ordenar(alertas: IAlerta[]): IAlerta[] {
    return alertas
      .filter(
        (a) => a.tipo === TipoAlerta.Urgente && !a.leida && !a.estaExpirada()
      )
      .sort((a, b) => b.id - a.id); // LIFO
  }
}

// Estrategia para alertas informativas (FIFO)
export class EstrategiaInformativa implements EstrategiaOrdenamiento {
  ordenar(alertas: IAlerta[]): IAlerta[] {
    return alertas
      .filter(
        (a) =>
          a.tipo === TipoAlerta.Informativa && !a.leida && !a.estaExpirada()
      )
      .sort((a, b) => a.id - b.id); // FIFO
  }
}
