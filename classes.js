"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaAlertas = exports.Usuario = exports.Tema = exports.Alerta = void 0;
const observer_1 = require("./observer");
const strategy_1 = require("./strategy");
// Clase Alerta
class Alerta {
    constructor(id, mensaje, tipo, expira, leida = false, tema) {
        this.id = id;
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.expira = expira;
        this.leida = leida;
        this.tema = tema;
    }
    estaExpirada() {
        return new Date() > this.expira;
    }
}
exports.Alerta = Alerta;
// Clase Tema
class Tema {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}
exports.Tema = Tema;
// Clase Usuario
class Usuario {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.alertas = [];
        this.temasSeguidos = [];
    }
    sigueTema(tema) {
        return this.temasSeguidos.some((t) => t.id === tema.id);
    }
    recibirAlerta(alerta) {
        this.alertas.push(alerta);
    }
    obtenerAlertasNoLeidas() {
        const alertasUrgentes = new strategy_1.EstrategiaUrgente().ordenar(this.alertas);
        const alertasInformativas = new strategy_1.EstrategiaInformativa().ordenar(this.alertas);
        return [...alertasUrgentes, ...alertasInformativas];
    }
    marcarAlertaLeida(idAlerta) {
        const alerta = this.alertas.find((a) => a.id === idAlerta);
        if (alerta) {
            alerta.leida = true;
        }
    }
}
exports.Usuario = Usuario;
// Clase SistemaAlertas
class SistemaAlertas {
    constructor() {
        this.usuarios = [];
        this.alertas = [];
        this.temas = new Map();
    }
    registrarUsuario(usuario) {
        this.usuarios.push(usuario);
    }
    registrarTema(tema) {
        const temaSubject = new observer_1.TemaSubject();
        this.temas.set(tema.id, temaSubject);
    }
    // El usuario se suscribe (sigue) a un tema
    suscribirUsuarioATema(usuario, tema) {
        const temaSubject = this.temas.get(tema.id);
        if (temaSubject) {
            temaSubject.agregarObservador(usuario);
        }
    }
    enviarAlertaATodos(tema, alerta) {
        const temaSubject = this.temas.get(tema.id);
        if (temaSubject) {
            temaSubject.notificar(alerta); // Notifica a todos los usuarios suscritos a este tema
        }
    }
    enviarAlertaAUsuario(usuario, alerta) {
        usuario.recibirAlerta(alerta); // Envía alerta solo a ese usuario
    }
    obtenerAlertasPorTema(tema) {
        return this.alertas.filter((alerta) => this.usuarios.some((u) => u.temasSeguidos.includes(tema) && alerta.tema === tema));
    }
}
exports.SistemaAlertas = SistemaAlertas;
//# sourceMappingURL=classes.js.map