# NUTRIA — `nutria-shell`

> Frontend principal de NUTRIA · HOST de Module Federation

---

## 1. Propósito del repositorio

`nutria-shell` es el **frontend principal de NUTRIA**. Es la aplicación desde la
que el usuario entra y sobre la que se construye todo lo demás.

Su responsabilidad es actuar como:

- **HOST** de Module Federation.
- **Orquestador** de los Microfrontends.
- **Punto de entrada** de la aplicación frontend.
- Responsable de la **composición** de los diferentes Microfrontends.
- Responsable de las **capacidades transversales** del frontend.

En esta primera etapa del taller solamente se trabaja con dos aplicaciones:

```
nutria-shell
     HOST
       │
       │ Module Federation
       ▼
nutria-mfe-afiliados
     REMOTE
```

`nutria-mfe-afiliados` vive en **otro repositorio**. Los demás Microfrontends
todavía no se crean y no se documentan como implementados.

> Este repositorio está en la etapa **HU-04 — Navegación del Shell**: la
> aplicación tiene su identidad visual y su navegación principal, pero todavía
> **no** hay dashboard, autenticación, autorización, sesión ni Microfrontends
> conectados.

---

## 2. Arquitectura

La arquitectura inicial del taller es:

```
                    NUTRIA
                      │
                      ▼
                nutria-shell
              HOST / ORQUESTADOR
                      │
              Module Federation
                      │
                      ▼
             nutria-mfe-afiliados
                    REMOTE
```

Para entender este diagrama:

- **`nutria-shell` es el HOST.** Es la aplicación anfitriona: la que el usuario
  abre y la que contiene la estructura general.
- **`nutria-shell` actúa como orquestador.** Decide qué Microfrontends se
  muestran, dónde y en qué momento.
- **`nutria-mfe-afiliados` es un Remote independiente.** Es otra aplicación,
  con su propio repositorio, su propio código y su propio proceso de build.
- **Cada Microfrontend tendrá su propio repositorio.** Por eso este repositorio
  no contiene el código de los MFEs.
- **Module Federation** es el mecanismo que permite que el HOST consuma los
  módulos que exponen los Remotes en tiempo de ejecución.

---

## 3. Repositorios independientes

NUTRIA adopta una arquitectura de Microfrontends en la que **cada aplicación
tiene su propio repositorio**:

```
Git
│
├── nutria-shell
│     └── HOST / Orquestador
│
├── nutria-mfe-afiliados
│     └── REMOTE
│
└── nutria-design-system
      └── recursos compartidos
```

Puntos clave:

- `nutria-shell` **NO contiene físicamente el código fuente** de los MFEs.
- Los MFEs son **aplicaciones independientes**, con su propio ciclo de vida.
- El Shell los **integra mediante Module Federation**, no por copia de código.
- `nutria-design-system` será un repositorio/librería independiente para
  compartir estilos y componentes.

---

## 4. Tecnología

Tecnologías definidas para el Shell y **versiones realmente instaladas**:

| Tecnología                  | Versión    |
| --------------------------- | ---------- |
| Next.js                     | 15.5.26    |
| React                       | 19.1.0     |
| TypeScript                  | 5.9.3      |
| Webpack                     | 5.111.1    |
| Module Federation           | 2.9.1      |
| pnpm                        | 12.4.2     |
| CSS                         | nativo     |
| ESLint                      | 9.39.5     |

Module Federation se integra con el plugin `@module-federation/enhanced` sobre
el Webpack que ya usa Next.js 15. No se usa Turbopack.

> `webpack` se declara como dependencia de desarrollo porque Next.js empaqueta su
> propia copia de Webpack y el plugin necesita resolverlo como paquete.

---

## 5. Responsabilidades del Shell

A continuación se describen conceptualmente las responsabilidades de
`nutria-shell`.

### Orquestación

El Shell es responsable de integrar y presentar los diferentes Microfrontends.
Él es quien los conoce y los coordina.

### Navegación

El Shell es responsable de la navegación principal de la aplicación. La
navegación ya está implementada (ver sección 15):

```
NUTRIA  ·  Inicio  ·  Afiliados (pendiente)
```

Los Microfrontends **no** controlan la navegación global. Más adelante podrán
tener navegación interna propia, pero siempre dentro del Shell.

### Composición

El Shell determina **dónde y cómo** se presentan los diferentes MFEs dentro de su
interfaz.

### Seguridad transversal

La arquitectura contempla que el Shell sea responsable de las capacidades
transversales relacionadas con:

- autenticación
- autorización
- sesión
- control de acceso

> **Estas capacidades todavía NO están implementadas en esta etapa.** Se
> construirán más adelante en el taller.

Además, la seguridad del frontend **NO reemplaza** las validaciones de
seguridad que deben realizar los servicios backend. La autorización real
siempre debe verificarse del lado del servidor.

---

## 6. Module Federation

Module Federation cumple un papel sencillo: **permite que una aplicación use
módulos publicados por otra aplicación**, sin que tengan que formar parte del
mismo proyecto.

```
HOST
  │
  │ consume
  ▼
REMOTE
  │
  │ expone
  ▼
módulo/componente
```

### Host

Aplicación que **consume** módulos de otras aplicaciones.

En NUTRIA:

```
nutria-shell = HOST
```

### Remote

Aplicación independiente que **expone** módulos para que otras aplicaciones
puedan consumirlos.

En esta etapa:

```
nutria-mfe-afiliados = REMOTE
```

### `exposes`

Concepto utilizado por el **Remote** para indicar qué módulos pone a
disposición de otros.

### `remotes`

Concepto utilizado por el **Host** para declarar qué aplicaciones remotas
consume.

### `remoteEntry`

Punto de entrada que utiliza Module Federation para **descubrir y cargar** los
módulos expuestos por un Remote.

> Estos son los conceptos que se usarán en el taller. No se documentan aquí
> nombres de archivos, URLs, puertos ni configuraciones concretas, porque
> todavía no están implementados.

---

## 7. Relación con el backend

El Shell y los Microfrontends pertenecen a la **capa frontend**. La comunicación
con los microservicios del backend es **independiente** de Module Federation.

```
                    FRONTEND
                       │
                 nutria-shell
                 HOST / Orquestador
                       │
               Module Federation
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
    MFE Afiliados              otros MFEs
          │
          │ HTTP / APIs
          ▼
                 BACKEND
                    │
              Microservicios
                    │
                 Oracle
```

Es importante no confundir ambos mecanismos:

- **Module Federation** conecta y comparte **módulos frontend** (Host ↔ Remote).
- **REST / HTTP** conecta el **frontend con los servicios backend**.

Son mecanismos **diferentes y complementarios**. Module Federation no es una
alternativa a REST: uno resuelve la composición entre aplicaciones frontend y
el otro la comunicación con los datos del negocio.

---

## 8. Design System

NUTRIA tendrá un repositorio independiente:

```
nutria-design-system
```

Su objetivo será compartir:

- estilos
- componentes visuales
- tipografía
- colores
- espaciados
- botones
- inputs
- cards
- elementos visuales reutilizables

El Shell consumirá este Design System, y los Microfrontends también podrán
consumirlo.

Los estilos se desarrollarán utilizando **CSS**. No se utilizarán Tailwind,
styled-components ni CSS-in-JS.

El Design System debe permitir mantener una **identidad visual consistente**
entre el Shell y los diferentes MFEs.

> `nutria-design-system` todavía no existe. Se creará en la etapa 3 del
> roadmap.

---

## 9. Referencia visual

Existe un concepto visual de NUTRIA en:

```
NUTRIA_concepto_visual.html
```

El proyecto utiliza ese archivo como **referencia visual** para definir:

- colores
- tipografía
- espaciado
- navegación
- botones
- tarjetas
- formularios
- jerarquía visual

El HTML es únicamente una **referencia visual**. Los estilos se organizan en
archivos **CSS** dentro del proyecto. Más adelante, parte de estos tokens
pasarán al Design System `nutria-design-system`, que es un repositorio aparte.

### Decisiones visuales implementadas (HU-03)

La identidad visual del Shell ya está implementada en CSS:

| Elemento         | Decisión                                                        |
| ---------------- | --------------------------------------------------------------- |
| Colores          | Tokens de `src/styles/tokens.css` tomados del concepto visual   |
| Tipografía       | Fraunces (display), IBM Plex Sans (texto), IBM Plex Mono (técnico) |
| Tarjetas         | Fondo claro, borde de 1px, radio de 8px                          |
| Acento           | Franja vertical de 5px en color de acento en la tarjeta principal |
| Etiquetas        | Píldoras con fondo suave y texto en color de acento              |
| Espaciado        | Escala de 4px a 32px definida en tokens                          |
| Radios           | 6px, 8px y 999px (píldoras)                                      |
| Sombras          | Sombra mínima en tarjetas                                        |

Los estilos se aplican con **CSS Modules** en los componentes y una base
global en `src/styles/globals.css`. No se usa Tailwind, styled-components,
Emotion ni CSS-in-JS.

> Los tokens de `tokens.css` están marcados como base local. Cuando exista
> `nutria-design-system`, se reemplazarán por los tokens compartidos.

---

## 10. Primera etapa del taller

La primera etapa tiene un objetivo concreto:

```
HOST → MODULE FEDERATION → REMOTE
```

Específicamente:

```
nutria-shell
    │
    │ Module Federation
    ▼
nutria-mfe-afiliados
```

El objetivo es que el Shell **pueda consumir un módulo expuesto por el MFE de
Afilados**.

Esta integración será el **primer ejercicio práctico** del taller: el momento en
que se demuestra que la arquitectura Host/Remote funciona.

---

## 11. Roadmap

### Etapa 1 — Shell

- Crear `nutria-shell`.
- Configurar Next.js 15.
- Preparar estructura base.
- Preparar Host.

### Etapa 2 — Primer Remote

- Crear `nutria-mfe-afiliados`.
- Configurarlo como Remote.
- Exponer un módulo.
- Conectarlo con `nutria-shell`.

### Etapa 3 — Design System

- Crear `nutria-design-system`.
- Definir estilos compartidos.
- Crear componentes visuales reutilizables.
- Consumirlo desde Shell y MFEs.

### Etapa 4 — Nuevos Microfrontends

Posteriormente:

- `nutria-mfe-aportes`
- `nutria-mfe-empresas`
- `nutria-mfe-historial-laboral`
- `nutria-mfe-pensiones`

Cada uno en su **propio repositorio**.

### Etapa 5 — Capacidades transversales

Posteriormente implementar en el Shell:

- autenticación
- autorización
- sesión
- navegación
- control de acceso

> **Ninguna de estas etapas está completada.** Son el plan de trabajo del
> taller.

---

## 12. Estructura conceptual

Cada aplicación es un repositorio independiente:

```
Git Repositories
│
├── nutria-shell
│   └── Next.js 15
│       └── HOST / Orquestador
│
├── nutria-mfe-afiliados
│   └── REMOTE
│
└── nutria-design-system
    └── estilos y componentes compartidos
```

Los Microfrontends que se agregarán en etapas posteriores, cada uno en su propio
repositorio:

```
├── nutria-mfe-aportes
├── nutria-mfe-empresas
├── nutria-mfe-historial-laboral
└── nutria-mfe-pensiones
```

Dentro de este repositorio (`nutria-shell`) **no** se crean carpetas para los
demás MFEs.

---

## 13. Estructura real del proyecto

Estructura actual del repositorio (esqueleto del Host):

```text
nutria-shell/
│
├── README.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── next.config.ts
├── tsconfig.json
├── next-env.d.ts
├── eslint.config.mjs
├── .gitignore
├── NUTRIA_concepto_visual.html
│
├── public/
│
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── layout.tsx           # layout raíz: fuentes, estilos y chrome del Shell
    │   └── page.tsx             # ruta / (Inicio)
    │
    ├── components/
    │   ├── navigation/
    │   │   ├── ShellHeader.tsx        # navegación principal del Shell
    │   │   └── ShellHeader.module.css
    │   └── shell/
    │       ├── ShellLayout.tsx        # contenedor base del Shell
    │       ├── ShellLayout.module.css
    │       ├── ShellIdentity.tsx      # tarjeta de identidad del Shell
    │       ├── ShellIdentity.module.css
    │       ├── HostConcept.tsx        # NUTRIA → SHELL → HOST / ORQUESTADOR
    │       └── HostConcept.module.css
    │
    ├── config/
    │   └── architecture.ts      # identidad del Shell y items de navegación
    │
    └── styles/
        ├── globals.css          # base y reset
        └── tokens.css           # tokens visuales de NUTRIA
```

Separación de responsabilidades:

| Carpeta         | Contenido                                            |
| --------------- | ---------------------------------------------------- |
| `src/app`       | Páginas y layout de Next.js (App Router)             |
| `src/components`| Componentes reutilizables del Shell                   |
| `src/styles`    | Estilos CSS globales, tokens y CSS Modules            |
| `src/config`    | Datos de configuración del Shell                     |

---

## 14. Instalación y ejecución

### Requisitos

- Node.js 22
- pnpm 12

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

El Shell queda disponible en `http://localhost:3000` (puerto por defecto de
Next.js).

### Build de producción

```bash
pnpm build
pnpm start
```

### Otros comandos

```bash
pnpm lint        # ESLint
pnpm typecheck   # TypeScript (tsc --noEmit)
```

> Los scripts de `dev` y `build` **no** usan Turbopack. Module Federation requiere
> el bundler Webpack, que es el bundler por defecto de Next.js 15.

---

## 15. Navegación del Shell

La navegación principal pertenece al **Shell** y se implementó en HU-04. Vive
en `src/components/navigation/ShellHeader.tsx` y se monta desde
`src/app/layout.tsx`, de modo que todo el contenido de la aplicación queda
dentro del chrome del Host.

```
┌─────────────────────────────────────────────────────┐
│ N NUTRIA          Inicio          Afiliados (pend.) │
└─────────────────────────────────────────────────────┘
```

Características:

- Los items se declaran en `src/config/architecture.ts` (`NAV_ITEMS`).
- El item activo se detecta con `usePathname()` y se marca con
  `aria-current="page"` más un estilo propio.
- Se usa `next/link` para la navegación, sin recargar la aplicación y sin
  librerías de routing adicionales.
- En móvil (≤ 860px) la navegación se colapsa en un botón de menú sencillo.

### Rutas

| Ruta      | Contenido                        | Estado         |
| --------- | -------------------------------- | -------------- |
| `/`       | Pantalla de identidad del Shell  | Implementada   |
| `/afiliados` | Punto de acceso al MFE Afiliados | **No creada** |

`Afiliados` aparece en la navegación como item **pendiente**, sin enlace: el
repositorio `nutria-mfe-afiliados` todavía no existe y no se simuló ningún
Remote. Cuando exista, se declarará su ruta y se habilitará el enlace.

---

## 16. Estado actual

El proyecto se encuentra en la historia de usuario **HU-04 — Navegación del
Shell**. La aplicación compila y la navegación principal funciona.

Implementado:

- Aplicación Next.js 15 con TypeScript y pnpm.
- Layout raíz y pantalla base del Shell.
- Identidad visual: `ShellIdentity` y `HostConcept` (HU-03).
- Navegación principal del Shell con item activo y menú móvil (HU-04).
- Tokens CSS y estilos basados en `NUTRIA_concepto_visual.html`.
- Preparación técnica de Module Federation en `next.config.ts`.

Pendiente:

- [x] Navegación del Shell
- [ ] Dashboard
- [ ] Autenticación, autorización y sesión
- [ ] Composición real de Microfrontends
- [ ] Crear `nutria-mfe-afiliados` como repositorio independiente
- [ ] Registrar el primer Remote en el Host
- [ ] Crear `nutria-design-system`
- [ ] Incorporar los demás Microfrontends
- [ ] Integrar APIs del backend

> En esta etapa **no** hay dashboard, autenticación, autorización, sesión ni
> Remotes implementados. El item `Afiliados` es solo un punto de navegación
> reservado: no existe ninguna implementación local del MFE.
