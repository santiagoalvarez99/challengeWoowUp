# Sistema de Alertas

Este proyecto implementa un sistema de alertas que permite a los usuarios recibir notificaciones sobre temas de su interés.

## Estructura del Proyecto

El proyecto consta de los siguientes archivos principales:

1. `classes.ts`: Contiene las implementaciones de las clases principales del sistema.
2. `interfaces.ts`: Define las interfaces utilizadas en el proyecto.
3. `alert_system_uml.mmd`: Diagrama UML que representa la estructura del sistema.
4. `test.ts`: Contiene las pruebas unitarias del sistema.
5. `tsconfig.json`: Archivo de configuración de TypeScript.

### Descripción de los Componentes Principales

#### Interfaces (en `interfaces.ts`)

- `IAlerta`: Define la estructura de una alerta.
- `ITema`: Define la estructura de un tema.
- `IUsuario`: Define la estructura y comportamiento de un usuario.

#### Clases (en `classes.ts`)

- `Alerta`: Implementa la interfaz `IAlerta`.
- `Tema`: Implementa la interfaz `ITema`.
- `Usuario`: Implementa la interfaz `IUsuario`.
- `SistemaAlertas`: Gestiona todo el sistema de alertas.
- `TemaSubject`: Implementa el patrón Observador para notificar a los usuarios sobre nuevas alertas.
- `EstrategiaInformativa` y `EstrategiaUrgente`: Implementan el patrón Estrategia para ordenar las alertas.

#### Pruebas (en `test.ts`)

Este archivo contiene una serie de pruebas unitarias que verifican el correcto funcionamiento de los diferentes componentes del sistema. Las pruebas cubren aspectos como:

- Registro de usuarios y temas
- Suscripción a temas
- Envío y recepción de alertas
- Marcado de alertas como leídas
- Filtrado de alertas expiradas
- Ordenamiento de alertas

#### Configuración de TypeScript (en `tsconfig.json`)

Este archivo contiene la configuración del compilador de TypeScript, especificando opciones como la versión de ECMAScript objetivo, los módulos a utilizar, y otras configuraciones importantes para el proyecto.

## Funcionamiento del Sistema

1. **Registro de Usuarios y Temas**:

   - Los usuarios se registran en el sistema mediante `SistemaAlertas.registrarUsuario()`.
   - Los temas se registran usando `SistemaAlertas.registrarTema()`.

2. **Suscripción a Temas**:

   - Los usuarios pueden suscribirse a temas de interés con `SistemaAlertas.suscribirUsuarioATema()`.

3. **Envío de Alertas**:

   - Las alertas se pueden enviar a todos los usuarios suscritos a un tema con `SistemaAlertas.enviarAlertaATodos()`.
   - También se pueden enviar alertas individuales con `SistemaAlertas.enviarAlertaAUsuario()`.

4. **Recepción y Gestión de Alertas**:

   - Los usuarios reciben alertas a través del método `Usuario.recibirAlerta()`.
   - Pueden obtener sus alertas no leídas con `Usuario.obtenerAlertasNoLeidas()`.
   - Las alertas se pueden marcar como leídas usando `Usuario.marcarAlertaLeida()`.

5. **Ordenamiento de Alertas**:
   - Las alertas se ordenan utilizando las estrategias `EstrategiaInformativa` y `EstrategiaUrgente`.

## Patrones de Diseño Utilizados

1. **Patrón Observador**: Implementado en `TemaSubject` para notificar a los usuarios sobre nuevas alertas.
2. **Patrón Estrategia**: Utilizado para ordenar las alertas (`EstrategiaInformativa` y `EstrategiaUrgente`).

## Diagrama UML

El archivo `alert_system_uml.mmd` contiene un diagrama de clases UML que representa visualmente la estructura del sistema. Puedes visualizarlo directamente en GitHub o usando cualquier herramienta que soporte diagramas Mermaid.

## Cómo Ejecutar

Este proyecto está implementado en TypeScript. Para ejecutarlo:

1. Asegúrate de tener Node.js y npm instalados.
2. Instala las dependencias con `npm install`.
3. Compila el código TypeScript con `npx tsc`.
4. Ejecuta el código compilado con Node.js.

### Ejecutar las Pruebas

Para ejecutar las pruebas unitarias:

1. Compila el código TypeScript: `tsc`
2. Ejecuta el archivo de pruebas: `node test.js`

Verás los resultados de las pruebas en la consola. Si todas las pruebas pasan, verás el mensaje "TODOS LOS TESTS PASARON".
