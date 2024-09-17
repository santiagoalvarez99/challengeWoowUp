import { IAlerta, ITema, IUsuario, TipoAlerta } from "./interfaces";
import { TemaSubject } from "./observer";
import { EstrategiaInformativa, EstrategiaUrgente } from "./strategy";

// Clase Alerta
export class Alerta implements IAlerta {
  constructor(
    public id: number,
    public mensaje: string,
    public tipo: TipoAlerta,
    public expira: Date,
    public leida: boolean = false,
    public tema: ITema
  ) {}

  estaExpirada(): boolean {
    return new Date() > this.expira;
  }
}

// Clase Tema
export class Tema implements ITema {
  constructor(public id: number, public nombre: string) {}
}

// Clase Usuario
export class Usuario implements IUsuario {
  private alertas: IAlerta[] = [];
  public temasSeguidos: ITema[] = [];

  constructor(public id: number, public nombre: string) {}

  sigueTema(tema: ITema): boolean {
    return this.temasSeguidos.some((t) => t.id === tema.id);
  }

  recibirAlerta(alerta: IAlerta) {
    this.alertas.push(alerta);
  }

  obtenerAlertasNoLeidas(): IAlerta[] {
    const alertasUrgentes = new EstrategiaUrgente().ordenar(this.alertas);
    const alertasInformativas = new EstrategiaInformativa().ordenar(
      this.alertas
    );

    return [...alertasUrgentes, ...alertasInformativas];
  }

  marcarAlertaLeida(idAlerta: number) {
    const alerta = this.alertas.find((a) => a.id === idAlerta);
    if (alerta) {
      alerta.leida = true;
    }
  }
}

// Clase SistemaAlertas
export class SistemaAlertas {
  private usuarios: IUsuario[] = [];
  private alertas: IAlerta[] = [];
  private temas: Map<number, TemaSubject> = new Map();

  registrarUsuario(usuario: IUsuario) {
    this.usuarios.push(usuario);
  }

  registrarTema(tema: ITema) {
    const temaSubject = new TemaSubject();
    this.temas.set(tema.id, temaSubject);
  }

  // El usuario se suscribe (sigue) a un tema
  suscribirUsuarioATema(usuario: IUsuario, tema: ITema) {
    const temaSubject = this.temas.get(tema.id);
    if (temaSubject) {
      temaSubject.agregarObservador(usuario);
    }
  }

  enviarAlertaATodos(tema: ITema, alerta: IAlerta) {
    const temaSubject = this.temas.get(tema.id);
    if (temaSubject) {
      temaSubject.notificar(alerta); // Notifica a todos los usuarios suscritos a este tema
    }
  }

  enviarAlertaAUsuario(usuario: IUsuario, alerta: IAlerta) {
    usuario.recibirAlerta(alerta); // Envía alerta solo a ese usuario
  }

  obtenerAlertasPorTema(tema: Tema): IAlerta[] {
    return this.alertas.filter((alerta) =>
      this.usuarios.some(
        (u) => u.temasSeguidos.includes(tema) && alerta.tema === tema
      )
    );
  }
}
