"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertaFactory = void 0;
const classes_1 = require("./classes");
const interfaces_1 = require("./interfaces");
class AlertaFactory {
    static crearAlerta(id, mensaje, tipo, expira, tema) {
        switch (tipo) {
            case interfaces_1.TipoAlerta.Urgente:
                return new classes_1.Alerta(id, mensaje, tipo, expira, false, tema);
            case interfaces_1.TipoAlerta.Informativa:
                return new classes_1.Alerta(id, mensaje, tipo, expira, false, tema);
            default:
                throw new Error("Tipo de alerta no soportado");
        }
    }
}
exports.AlertaFactory = AlertaFactory;
//# sourceMappingURL=factory.js.map