"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemaSubject = void 0;
// Sujeto (Tema) que notifica a los observadores (Usuarios)
class TemaSubject {
    constructor() {
        this.observadores = [];
    }
    agregarObservador(usuario) {
        this.observadores.push(usuario);
    }
    eliminarObservador(usuario) {
        this.observadores = this.observadores.filter((u) => u.id !== usuario.id);
    }
    notificar(alerta) {
        this.observadores.forEach((usuario) => {
            usuario.recibirAlerta(alerta);
        });
    }
}
exports.TemaSubject = TemaSubject;
//# sourceMappingURL=observer.js.map