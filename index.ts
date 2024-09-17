import { SistemaAlertas, Usuario, Tema } from "./classes";
import { AlertaFactory } from "./factory";
import { TipoAlerta } from "./interfaces";
import { TemaSubject } from "./observer";

// Inicializar el sistema de alertas
const sistema = new SistemaAlertas();
const usuario1 = new Usuario(1, "Juan");
const temaNoticias = new Tema(1, "Noticias");

sistema.registrarUsuario(usuario1);
sistema.registrarTema(temaNoticias);

sistema.suscribirUsuarioATema(usuario1, temaNoticias);

const alerta = AlertaFactory.crearAlerta(
  1,
  "Nueva noticia",
  TipoAlerta.Informativa,
  new Date(),
  [temaNoticias]
);
sistema.enviarAlertaATodos(temaNoticias, alerta);

console.log(usuario1.obtenerAlertasNoLeidas());
