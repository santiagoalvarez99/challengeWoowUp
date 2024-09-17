import { SistemaAlertas, Usuario, Tema, Alerta } from "./classes";
import { TipoAlerta } from "./interfaces";
import { AlertaFactory } from "./factory";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message || "Test failed");
  }
}

function testRegistrarUsuario() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");
  sistema.registrarUsuario(usuario1);

  assert(
    sistema["usuarios"].length === 1,
    "El usuario no fue registrado correctamente."
  );
  console.log("testRegistrarUsuario: PASSED");
}

function testRegistrarTema() {
  const sistema = new SistemaAlertas();
  const tema1 = new Tema(1, "Noticias");
  sistema.registrarTema(tema1);

  assert(
    sistema["temas"].has(tema1.id),
    "El tema no fue registrado correctamente."
  );
  console.log("testRegistrarTema: PASSED");
}

function testSeguirTema() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");
  const tema1 = new Tema(1, "Noticias");

  sistema.registrarUsuario(usuario1);
  sistema.registrarTema(tema1);

  sistema.suscribirUsuarioATema(usuario1, tema1);

  const temaSubject = sistema["temas"].get(tema1.id);

  // Verificamos si el temaSubject no es undefined antes de continuar
  if (!temaSubject) {
    throw new Error("El tema no fue registrado correctamente en el sistema.");
  }
  assert(
    temaSubject["observadores"].length === 1,
    "El usuario no se suscribió correctamente al tema."
  );
  console.log("testSeguirTema: PASSED");
}

function testEnviarAlertaATodos() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");
  const usuario2 = new Usuario(2, "Ana");

  const temaNoticias = new Tema(1, "Noticias");
  const temaDeportes = new Tema(2, "Deportes");

  sistema.registrarUsuario(usuario1);
  sistema.registrarUsuario(usuario2);
  sistema.registrarTema(temaNoticias);
  sistema.registrarTema(temaDeportes);

  //suscribo a los usuarios con el patron Observer a los temas
  sistema.suscribirUsuarioATema(usuario1, temaNoticias);
  sistema.suscribirUsuarioATema(usuario2, temaDeportes);

  const alertaNoticias = AlertaFactory.crearAlerta(
    1,
    "Nueva noticia",
    TipoAlerta.Informativa,
    new Date(new Date().getTime() + 100000),
    [temaNoticias]
  );

  sistema.enviarAlertaATodos(temaNoticias, alertaNoticias);

  assert(
    usuario1.obtenerAlertasNoLeidas().length === 1,
    "El usuario que sigue el tema no recibió la alerta."
  );
  assert(
    usuario2.obtenerAlertasNoLeidas().length === 0,
    "El usuario que no sigue el tema recibió la alerta incorrectamente."
  );
  console.log("testEnviarAlertaATodos: PASSED");
}

function testEnviarAlertaAUsuario() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");

  sistema.registrarUsuario(usuario1);

  const temaNoticias = new Tema(1, "Noticias");

  sistema.suscribirUsuarioATema(usuario1, temaNoticias);

  const alerta1 = AlertaFactory.crearAlerta(
    1,
    "Alerta personalizada",
    TipoAlerta.Urgente,
    new Date(new Date().getTime() + 100000),
    [temaNoticias]
  );
  sistema.enviarAlertaAUsuario(usuario1, alerta1);

  assert(
    usuario1.obtenerAlertasNoLeidas().length === 1,
    "El usuario no recibió la alerta personalizada."
  );
  console.log("testEnviarAlertaAUsuario: PASSED");
}

function testMarcarAlertaComoLeida() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");
  sistema.registrarUsuario(usuario1);

  const temaNoticias = new Tema(1, "Noticias");

  const alerta1 = AlertaFactory.crearAlerta(
    1,
    "Nueva noticia",
    TipoAlerta.Informativa,
    new Date(new Date().getTime() + 100000),
    [temaNoticias]
  );
  sistema.enviarAlertaAUsuario(usuario1, alerta1);

  usuario1.marcarAlertaLeida(alerta1.id);

  assert(
    usuario1.obtenerAlertasNoLeidas().length === 0,
    "El usuario no marcó la alerta como leída correctamente."
  );
  console.log("testMarcarAlertaComoLeida: PASSED");
}

function testAlertasNoExpiradas() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");

  sistema.registrarUsuario(usuario1);

  const alertaExpirada = AlertaFactory.crearAlerta(
    1,
    "Alerta expirada",
    TipoAlerta.Informativa,
    new Date(Date.now() - 10000),
    [new Tema(1, "Noticias")]
  );
  const alertaValida = AlertaFactory.crearAlerta(
    2,
    "Alerta válida",
    TipoAlerta.Urgente,
    new Date(new Date().getTime() + 100000),
    [new Tema(1, "Noticias")]
  );

  sistema.enviarAlertaAUsuario(usuario1, alertaExpirada);
  sistema.enviarAlertaAUsuario(usuario1, alertaValida);

  const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();
  assert(
    alertasNoLeidas.length === 1,
    "No filtró correctamente las alertas expiradas."
  );
  assert(
    alertasNoLeidas[0].id === 2,
    "La alerta válida no se obtuvo correctamente."
  );
  console.log("testAlertasNoExpiradas: PASSED");
}

function testOrdenamientoAlertas() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");

  sistema.registrarUsuario(usuario1);

  const alerta1 = AlertaFactory.crearAlerta(
    1,
    "Alerta informativa 1",
    TipoAlerta.Informativa,
    new Date(new Date().getTime() + 100000),
    [new Tema(1, "Noticias")]
  );
  const alerta2 = AlertaFactory.crearAlerta(
    2,
    "Alerta urgente 1",
    TipoAlerta.Urgente,
    new Date(new Date().getTime() + 100000),
    [new Tema(1, "Noticias")]
  );
  const alerta3 = AlertaFactory.crearAlerta(
    3,
    "Alerta informativa 2",
    TipoAlerta.Informativa,
    new Date(new Date().getTime() + 100000),
    [new Tema(1, "Noticias")]
  );
  const alerta4 = AlertaFactory.crearAlerta(
    4,
    "Alerta urgente 2",
    TipoAlerta.Urgente,
    new Date(new Date().getTime() + 100000),
    [new Tema(1, "Noticias")]
  );

  sistema.enviarAlertaAUsuario(usuario1, alerta1);
  sistema.enviarAlertaAUsuario(usuario1, alerta2);
  sistema.enviarAlertaAUsuario(usuario1, alerta3);
  sistema.enviarAlertaAUsuario(usuario1, alerta4);

  const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();

  assert(
    alertasNoLeidas[0].id === 4 && alertasNoLeidas[1].id === 2,
    "Las alertas urgentes no están ordenadas correctamente (LIFO)."
  );
  assert(
    alertasNoLeidas[2].id === 1 && alertasNoLeidas[3].id === 3,
    "Las alertas informativas no están ordenadas correctamente (FIFO)."
  );
  console.log("testOrdenamientoAlertas: PASSED");
}

function testAlertaExpirada() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");

  sistema.registrarUsuario(usuario1);

  const alertaExpirada = AlertaFactory.crearAlerta(
    1,
    "Alerta expirada",
    TipoAlerta.Informativa,
    new Date(new Date().getTime() - 100000), // Fecha de expiración en el pasado
    [new Tema(1, "Noticias")]
  );

  sistema.enviarAlertaAUsuario(usuario1, alertaExpirada);

  const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();
  assert(
    alertasNoLeidas.length === 0,
    "La alerta expirada no fue filtrada correctamente."
  );
  console.log("testAlertaExpirada: PASSED");
}

function testMarcarMultiplesAlertasLeidas() {
  const sistema = new SistemaAlertas();
  const usuario1 = new Usuario(1, "Juan");

  sistema.registrarUsuario(usuario1);

  const alerta1 = AlertaFactory.crearAlerta(
    1,
    "Alerta 1",
    TipoAlerta.Informativa,
    new Date(new Date().getTime() + 100000),
    [new Tema(1, "Noticias")]
  );
  const alerta2 = AlertaFactory.crearAlerta(
    2,
    "Alerta 2",
    TipoAlerta.Informativa,
    new Date(new Date().getTime() + 100000),
    [new Tema(1, "Noticias")]
  );

  sistema.enviarAlertaAUsuario(usuario1, alerta1);
  sistema.enviarAlertaAUsuario(usuario1, alerta2);

  usuario1.marcarAlertaLeida(alerta1.id);
  usuario1.marcarAlertaLeida(alerta2.id);

  assert(
    usuario1.obtenerAlertasNoLeidas().length === 0,
    "No se marcaron todas las alertas como leídas correctamente."
  );
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
} catch (error) {
  const e = error as Error;
  console.log(e.message);
}
