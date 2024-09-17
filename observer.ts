import { IUsuario, IAlerta } from "./interfaces";

// Sujeto (Tema) que notifica a los observadores (Usuarios)
export class TemaSubject {
  private observadores: IUsuario[] = [];

  agregarObservador(usuario: IUsuario) {
    this.observadores.push(usuario);
  }

  eliminarObservador(usuario: IUsuario) {
    this.observadores = this.observadores.filter((u) => u.id !== usuario.id);
  }

  notificar(alerta: IAlerta) {
    this.observadores.forEach((usuario) => {
      usuario.recibirAlerta(alerta);
    });
  }
}
