"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstrategiaInformativa = exports.EstrategiaUrgente = void 0;
const interfaces_1 = require("./interfaces");
// Estrategia para alertas urgentes (LIFO)
class EstrategiaUrgente {
    ordenar(alertas) {
        return alertas
            .filter((a) => a.tipo === interfaces_1.TipoAlerta.Urgente && !a.leida && !a.estaExpirada())
            .sort((a, b) => b.id - a.id); // LIFO
    }
}
exports.EstrategiaUrgente = EstrategiaUrgente;
// Estrategia para alertas informativas (FIFO)
class EstrategiaInformativa {
    ordenar(alertas) {
        return alertas
            .filter((a) => a.tipo === interfaces_1.TipoAlerta.Informativa && !a.leida && !a.estaExpirada())
            .sort((a, b) => a.id - b.id); // FIFO
    }
}
exports.EstrategiaInformativa = EstrategiaInformativa;
//# sourceMappingURL=strategy.js.map