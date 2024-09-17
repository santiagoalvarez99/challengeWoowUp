import { Alerta } from "./classes";
import { ITema, TipoAlerta } from "./interfaces";

export class AlertaFactory {
  public static crearAlerta(
    id: number,
    mensaje: string,
    tipo: TipoAlerta,
    expira: Date,
    tema: ITema[]
  ): Alerta {
    switch (tipo) {
      case TipoAlerta.Urgente:
        return new Alerta(id, mensaje, tipo, expira, false, tema);
      case TipoAlerta.Informativa:
        return new Alerta(id, mensaje, tipo, expira, false, tema);
      default:
        throw new Error("Tipo de alerta no soportado");
    }
  }
}
