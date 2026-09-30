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

> Este repositorio está en la etapa **HU-09 — `nutria-shell` como Host de Module
> Federation**: el Shell ya tiene registrado el Remote `nutria_mfe_afiliados`,
> pero todavía **no** consume su módulo `./Afiliados`. No hay autenticación,
> autorización, sesión ni Microfrontends renderizados.

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
| Webpack                     | 5.105.0    |
| Module Federation           | `@module-federation/nextjs-mf` 8.8.76 |
| pnpm                        | 12.4.2     |
| CSS                         | nativo     |
| ESLint                      | 9.39.5     |
| Router                      | Pages Router |

Module Federation se integra con `@module-federation/nextjs-mf` y su
`NextFederationPlugin`, sobre el Webpack que ya usa Next.js 15. No se usa
Turbopack.

> El Shell usa el **Pages Router** (`src/pages`) porque `@module-federation/nextjs-mf`
> solo soporta el directorio `pages`. El Remote `nutria-mfe-afiliados` usa el
> mismo enfoque.

> `webpack` se declara como dependencia de desarrollo (fijado en `5.105.0`, igual
> que el Remote) porque Next.js empaqueta su propia copia y el plugin necesita
> resolverlo como paquete. Además, los scripts de `dev`, `build` y `start` se
> ejecutan con `cross-env NEXT_PRIVATE_LOCAL_WEBPACK=true`, indicando a Next.js
> que use esa copia local de Webpack.

> `pnpm-workspace.yaml` fija `enhanced-resolve` en `5.20.1`: esa es la última
> versión compatible con Next.js 15.5.26 cuando se usa el Webpack local.

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
NUTRIA   Qué es · Arquitectura · Dominios · Roadmap        [Iniciar sesión]
```

Los enlaces del navbar apuntan a secciones de la misma página. Los
Microfrontends **no** controlan la navegación global. Más adelante podrán
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

### Configuración real del Host (HU-09)

El Host ya tiene registrado el Remote en `next.config.ts` mediante
`NextFederationPlugin`:

| Elemento          | Valor                                                          |
| ----------------- | -------------------------------------------------------------- |
| Host (name)       | `nutria_shell`                                                 |
| Remote registrado | `nutria_mfe_afiliados`                                         |
| Remote Entry      | `http://localhost:3001/_next/static/chunks/remoteEntry.js`     |

El Host **solo conoce la ubicación** del Remote Entry. Todavía **no consume** el
módulo `./Afiliados`: la composición se implementa en HU-10. El Remote pertenece
al repositorio independiente `nutria-mfe-afiliados` y **no** se modificó para
esta HU.

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

En **HU-09** el Shell ya quedó configurado como Host y registra el Remote
`nutria_mfe_afiliados` (sabe dónde está su Remote Entry). El **consumo** del
módulo `./Afiliados` corresponde a **HU-10**.

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

> **Estado de las etapas:** la etapa 1 está completada en el Shell. De la etapa
> 2, `nutria-mfe-afiliados` ya existe como Remote y el Shell ya está configurado
> como Host (HU-09); falta consumir el módulo `./Afiliados` (HU-10). Las etapas
> 3 a 5 están planificadas y todavía no se crean. La navegación del Shell ya está
> implementada; el resto de las capacidades transversales sigue pendiente.

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
│   └── favicon.ico
│
└── src/
    ├── pages/
    │   ├── _app.tsx             # estilos globales, <Head> y chrome del Shell
    │   ├── _document.tsx        # documento HTML y tipografías
    │   └── index.tsx            # ruta / (página principal del Shell)
    │
    ├── components/
    │   ├── landing/
    │   │   ├── Hero.tsx                 # presentación de NUTRIA
    │   │   ├── AboutSection.tsx         # ¿Qué es? — un taller, no un producto
    │   │   ├── ArchitectureSection.tsx   # NUTRIA → HOST → REMOTE
    │   │   ├── DomainsSection.tsx       # dominios de NUTRIA
    │   │   ├── DomainCard.tsx           # tarjeta de un dominio
    │   │   ├── RoadmapSection.tsx       # etapas del taller
    │   │   ├── Section.tsx              # base de las secciones
    │   │   ├── StateBadge.tsx           # etiqueta implementado / pendiente
    │   │   ├── Footer.tsx               # footer del Shell
    │   │   └── *.module.css
    │   ├── navigation/
    │   │   ├── Navbar.tsx               # navbar con enlaces a secciones
    │   │   └── Navbar.module.css
    │   └── shell/
    │       ├── ShellLayout.tsx          # navbar + contenido + footer
    │       └── ShellLayout.module.css
    │
    ├── config/
    │   └── architecture.ts      # identidad, secciones, arquitectura, dominios y roadmap
    │
    └── styles/
        ├── globals.css          # base, reset y desplazamiento suave
        ├── fonts.ts             # tipografías de NUTRIA (next/font)
        └── tokens.css           # tokens visuales de NUTRIA
```

Separación de responsabilidades:

| Carpeta         | Contenido                                            |
| --------------- | ---------------------------------------------------- |
| `src/pages`     | Páginas y documento de Next.js (Pages Router)        |
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
>
> Todos los scripts se ejecutan con `cross-env NEXT_PRIVATE_LOCAL_WEBPACK=true`
> (igual que el Remote) para que Next.js use la copia local de `webpack`.

---

## 15. Página principal y navegación

La ruta `/` muestra la página principal de NUTRIA, que pertenece al
**SHELL-NUTRIA (HOST / ORQUESTADOR)**. Se implementó en HU-05 y se compone en
`src/pages/index.tsx` a partir de los componentes de `src/components/landing/`.

```
Shell-Nutria
│
├── Navbar          →  Qué es · Arquitectura · Dominios · Roadmap · Iniciar sesión
├── Hero            →  presentación de NUTRIA
├── ¿Qué es?        →  un taller, no un producto
├── Arquitectura    →  NUTRIA → nutria-shell (HOST) → nutria-mfe-afiliados (REMOTE)
├── Dominios        →  Afiliados, Aportes, Empresas, Historial Laboral, Pensiones
├── Roadmap         →  etapas 01 a 05 con su estado
└── Footer          →  identidad y secciones
```

Características:

- El navbar vive en `src/components/navigation/Navbar.tsx` y se monta desde
  `ShellLayout`, igual que el footer: ambos son chrome del Shell.
- Los enlaces son anclas a secciones de la misma página
  (`#que-es`, `#arquitectura`, `#dominios`, `#roadmap`) y se declaran en
  `src/config/architecture.ts` (`SECTION_LINKS`).
- `globals.css` define `scroll-behavior: smooth` y `scroll-padding-top` para
  que las anclas no queden ocultas bajo el navbar; se desactiva con
  `prefers-reduced-motion`.
- En móvil (≤ 900px) el navbar se colapsa en un botón de menú y el roadmap
  pasa de fila a columna.
- **"Iniciar sesión" es solo visual**: no hay login, sesión, roles ni
  autorización. El botón está marcado con `aria-disabled="true"`.

### Rutas

| Ruta | Contenido                        | Estado       |
| ---- | -------------------------------- | ------------ |
| `/`  | Página principal del Shell       | Implementada |

No existe ninguna otra ruta. Los dominios son tarjetas informativas: no
enlazan a rutas inexistentes, no importan código de otros repositorios y no
simulan Remotes.

---

## 16. Estado actual

El proyecto se encuentra en la historia de usuario **HU-09 — Configurar
`nutria-shell` como Host de Module Federation**. La aplicación compila, la
página principal funciona y el Host ya tiene registrado el Remote.

Implementado:

- Aplicación Next.js 15 con TypeScript, Pages Router y pnpm.
- Navbar, footer y layout del Shell (`_app.tsx`, `_document.tsx`) y página
  principal.
- Identidad visual de NUTRIA basada en `NUTRIA_concepto_visual.html`
  (HU-03), con tokens en `src/styles/tokens.css`.
- Navegación por anclas y comportamiento responsive (HU-04 → HU-05).
- Página principal con Hero, ¿Qué es?, Arquitectura, Dominios y Roadmap
  (HU-05).
- **Host de Module Federation (HU-09):** `NextFederationPlugin` configurado en
  `next.config.ts` con el nombre `nutria_shell` y el Remote
  `nutria_mfe_afiliados` registrado.

### HU-09 — Host de Module Federation

- El Shell funciona como **Host** con `@module-federation/nextjs-mf`
  (`NextFederationPlugin`).
- El Host se llama **`nutria_shell`**.
- El Remote **`nutria_mfe_afiliados`** está registrado en `remotes`.
- La URL del Remote Entry de desarrollo es
  **`http://localhost:3001/_next/static/chunks/remoteEntry.js`** y responde
  `200` cuando el Remote está ejecutándose.
- El Remote pertenece al repositorio independiente **`nutria-mfe-afiliados`**
  y **no** se modificó para esta HU.
- El Host **todavía NO consume** el módulo `./Afiliados`. No hay import, ni
  `dynamic import`, ni `React.lazy`, ni ruta `/afiliados`, ni navegación hacia
  Afiliados. Tampoco hay comunicación Host ↔ Remote.
- El consumo del módulo `./Afiliados` se implementará en **HU-10**.

> El Host conoce *dónde* encontrar el Remote, pero la integración
> Host → Remote a nivel de módulo todavía no está activa.

Planeado / futuro:

- [x] Navegación del Shell
- [x] Página principal / Dashboard del Shell
- [x] `nutria-mfe-afiliados` como repositorio independiente (HU-06 → HU-08)
- [x] Configurar `nutria-shell` como Host de Module Federation (HU-09)
- [ ] Consumir el módulo `./Afiliados` desde el Host (HU-10)
- [ ] `nutria-design-system`
- [ ] `nutria-mfe-aportes`, `nutria-mfe-empresas`,
      `nutria-mfe-historial-laboral` y `nutria-mfe-pensiones`
- [ ] Autenticación, autorización, sesión y control de acceso
- [ ] Integrar APIs del backend

> En esta etapa todavía **no** se consume ningún Microfrontend, y no hay
> autenticación, autorización ni sesión. Los dominios y las etapas del roadmap
> se muestran como información del Shell.
