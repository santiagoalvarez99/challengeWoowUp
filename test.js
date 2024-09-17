"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const interfaces_1 = require("./interfaces");
const factory_1 = require("./factory");
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Test failed");
    }
}
function testRegistrarUsuario() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    sistema.registrarUsuario(usuario1);
    assert(sistema["usuarios"].length === 1, "El usuario no fue registrado correctamente.");
    console.log("testRegistrarUsuario: PASSED");
}
function testRegistrarTema() {
    const sistema = new classes_1.SistemaAlertas();
    const tema1 = new classes_1.Tema(1, "Noticias");
    sistema.registrarTema(tema1);
    assert(sistema["temas"].has(tema1.id), "El tema no fue registrado correctamente.");
    console.log("testRegistrarTema: PASSED");
}
function testSeguirTema() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    const tema1 = new classes_1.Tema(1, "Noticias");
    sistema.registrarUsuario(usuario1);
    sistema.registrarTema(tema1);
    sistema.suscribirUsuarioATema(usuario1, tema1);
    const temaSubject = sistema["temas"].get(tema1.id);
    // Verificamos si el temaSubject no es undefined antes de continuar
    if (!temaSubject) {
        throw new Error("El tema no fue registrado correctamente en el sistema.");
    }
    assert(temaSubject["observadores"].length === 1, "El usuario no se suscribió correctamente al tema.");
    console.log("testSeguirTema: PASSED");
}
function testEnviarAlertaATodos() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    const usuario2 = new classes_1.Usuario(2, "Ana");
    const temaNoticias = new classes_1.Tema(1, "Noticias");
    const temaDeportes = new classes_1.Tema(2, "Deportes");
    sistema.registrarUsuario(usuario1);
    sistema.registrarUsuario(usuario2);
    sistema.registrarTema(temaNoticias);
    sistema.registrarTema(temaDeportes);
    //suscribo a los usuarios con el patron Observer a los temas
    sistema.suscribirUsuarioATema(usuario1, temaNoticias);
    sistema.suscribirUsuarioATema(usuario2, temaDeportes);
    const alertaNoticias = factory_1.AlertaFactory.crearAlerta(1, "Nueva noticia", interfaces_1.TipoAlerta.Informativa, new Date(new Date().getTime() + 100000), temaNoticias);
    sistema.enviarAlertaATodos(temaNoticias, alertaNoticias);
    assert(usuario1.obtenerAlertasNoLeidas().length === 1, "El usuario que sigue el tema no recibió la alerta.");
    assert(usuario2.obtenerAlertasNoLeidas().length === 0, "El usuario que no sigue el tema recibió la alerta incorrectamente.");
    console.log("testEnviarAlertaATodos: PASSED");
}
function testEnviarAlertaAUsuario() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    sistema.registrarUsuario(usuario1);
    const temaNoticias = new classes_1.Tema(1, "Noticias");
    sistema.suscribirUsuarioATema(usuario1, temaNoticias);
    const alerta1 = factory_1.AlertaFactory.crearAlerta(1, "Alerta personalizada", interfaces_1.TipoAlerta.Urgente, new Date(new Date().getTime() + 100000), temaNoticias);
    sistema.enviarAlertaAUsuario(usuario1, alerta1);
    assert(usuario1.obtenerAlertasNoLeidas().length === 1, "El usuario no recibió la alerta personalizada.");
    console.log("testEnviarAlertaAUsuario: PASSED");
}
function testMarcarAlertaComoLeida() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    sistema.registrarUsuario(usuario1);
    const temaNoticias = new classes_1.Tema(1, "Noticias");
    const alerta1 = factory_1.AlertaFactory.crearAlerta(1, "Nueva noticia", interfaces_1.TipoAlerta.Informativa, new Date(new Date().getTime() + 100000), temaNoticias);
    sistema.enviarAlertaAUsuario(usuario1, alerta1);
    usuario1.marcarAlertaLeida(alerta1.id);
    assert(usuario1.obtenerAlertasNoLeidas().length === 0, "El usuario no marcó la alerta como leída correctamente.");
    console.log("testMarcarAlertaComoLeida: PASSED");
}
function testAlertasNoExpiradas() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    sistema.registrarUsuario(usuario1);
    const alertaExpirada = factory_1.AlertaFactory.crearAlerta(1, "Alerta expirada", interfaces_1.TipoAlerta.Informativa, new Date(Date.now() - 10000), new classes_1.Tema(1, "Noticias"));
    const alertaValida = factory_1.AlertaFactory.crearAlerta(2, "Alerta válida", interfaces_1.TipoAlerta.Urgente, new Date(new Date().getTime() + 100000), new classes_1.Tema(1, "Noticias"));
    sistema.enviarAlertaAUsuario(usuario1, alertaExpirada);
    sistema.enviarAlertaAUsuario(usuario1, alertaValida);
    const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();
    assert(alertasNoLeidas.length === 1, "No filtró correctamente las alertas expiradas.");
    assert(alertasNoLeidas[0].id === 2, "La alerta válida no se obtuvo correctamente.");
    console.log("testAlertasNoExpiradas: PASSED");
}
function testOrdenamientoAlertas() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    sistema.registrarUsuario(usuario1);
    const alerta1 = factory_1.AlertaFactory.crearAlerta(1, "Alerta informativa 1", interfaces_1.TipoAlerta.Informativa, new Date(new Date().getTime() + 100000), new classes_1.Tema(1, "Noticias"));
    const alerta2 = factory_1.AlertaFactory.crearAlerta(2, "Alerta urgente 1", interfaces_1.TipoAlerta.Urgente, new Date(new Date().getTime() + 100000), new classes_1.Tema(1, "Noticias"));
    const alerta3 = factory_1.AlertaFactory.crearAlerta(3, "Alerta informativa 2", interfaces_1.TipoAlerta.Informativa, new Date(new Date().getTime() + 100000), new classes_1.Tema(1, "Noticias"));
    const alerta4 = factory_1.AlertaFactory.crearAlerta(4, "Alerta urgente 2", interfaces_1.TipoAlerta.Urgente, new Date(new Date().getTime() + 100000), new classes_1.Tema(1, "Noticias"));
    sistema.enviarAlertaAUsuario(usuario1, alerta1);
    sistema.enviarAlertaAUsuario(usuario1, alerta2);
    sistema.enviarAlertaAUsuario(usuario1, alerta3);
    sistema.enviarAlertaAUsuario(usuario1, alerta4);
    const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();
    assert(alertasNoLeidas[0].id === 4 && alertasNoLeidas[1].id === 2, "Las alertas urgentes no están ordenadas correctamente (LIFO).");
    assert(alertasNoLeidas[2].id === 1 && alertasNoLeidas[3].id === 3, "Las alertas informativas no están ordenadas correctamente (FIFO).");
    console.log("testOrdenamientoAlertas: PASSED");
}
function testAlertaExpirada() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    sistema.registrarUsuario(usuario1);
    const alertaExpirada = factory_1.AlertaFactory.crearAlerta(1, "Alerta expirada", interfaces_1.TipoAlerta.Informativa, new Date(new Date().getTime() - 100000), // Fecha de expiración en el pasado
    new classes_1.Tema(1, "Noticias"));
    sistema.enviarAlertaAUsuario(usuario1, alertaExpirada);
    const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();
    assert(alertasNoLeidas.length === 0, "La alerta expirada no fue filtrada correctamente.");
    console.log("testAlertaExpirada: PASSED");
}
function testMarcarMultiplesAlertasLeidas() {
    const sistema = new classes_1.SistemaAlertas();
    const usuario1 = new classes_1.Usuario(1, "Juan");
    sistema.registrarUsuario(usuario1);
    const alerta1 = factory_1.AlertaFactory.crearAlerta(1, "Alerta 1", interfaces_1.TipoAlerta.Informativa, new Date(new Date().getTime() + 100000), new classes_1.Tema(1, "Noticias"));
    const alerta2 = factory_1.AlertaFactory.crearAlerta(2, "Alerta 2", interfaces_1.TipoAlerta.Informativa, new Date(new Date().getTime() + 100000), new classes_1.Tema(1, "Noticias"));
    sistema.enviarAlertaAUsuario(usuario1, alerta1);
    sistema.enviarAlertaAUsuario(usuario1, alerta2);
    usuario1.marcarAlertaLeida(alerta1.id);
    usuario1.marcarAlertaLeida(alerta2.id);
    assert(usuario1.obtenerAlertasNoLeidas().length === 0, "No se marcaron todas las alertas como leídas correctamente.");
    console.log("testMarcarMultiplesAlertasLeidas: PASSED");
}
// Ejecutamos los tests
try {
    testRegistrarUsuario();
    testRegistrarTema();
    testSeguirTema();
    testEnviarAlertaATodos();
    testEnviarAlertaAUsuario();
    testMarcarAlertaComoLeida();
    testAlertasNoExpiradas();
    testOrdenamientoAlertas();
    testAlertaExpirada();
    testMarcarMultiplesAlertasLeidas();
    console.log("TODOS LOS TESTS PASARON");
}
catch (error) {
    const e = error;
    console.log(e.message);
}
//# sourceMappingURL=test.js.map