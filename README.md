# NUTRIA — Taller de Module Federation

## 1. Descripción

NUTRIA es el contexto académico sobre el que se construye este taller. El
repositorio corresponde a un **taller** cuyo objetivo es aprender a
desarrollar una arquitectura de **Micro Frontends** utilizando **Module
Federation**.

La idea central es construir un **contenedor principal (Host)** capaz de
consumir distintos **Micro Frontends independientes (Remotes)**, cada uno
perteneciente a un dominio del negocio.

El taller no busca desarrollar funcionalidades de negocio complejas. Su
objetivo es comprender, de forma práctica y progresiva, el siguiente flujo:

```
HOST
  ↓
Module Federation
  ↓
REMOTE
  ↓
módulo expuesto
  ↓
renderizado dentro del HOST
```

> **Este repositorio es un proyecto nuevo y se encuentra en etapa inicial.**
> La arquitectura descrita en este documento es la arquitectura **objetivo**,
> que se construirá durante el taller. No es un sistema productivo.

---

## 2. Arquitectura objetivo

```
                         ┌───────────────────┐
                         │    SHELL-NUTRIA   │
                         │       HOST        │
                         │                   │
                         │ Contenedor        │
                         │ principal         │
                         └─────────┬─────────┘
                                   │
                         Module Federation
                                   │
             ┌─────────────────────┼─────────────────────┐
             │                     │                     │
             ▼                     ▼                     ▼
      ┌────────────┐        ┌────────────┐        ┌────────────┐
      │ AFILIADOS  │        │  APORTES   │        │ EMPRESAS   │
      │   REMOTE   │        │   REMOTE   │        │   REMOTE   │
      └────────────┘        ┌────────────┘        └────────────┘
                                   │
                              ┌────┴─────┐
                              ▼          ▼
                       ┌────────────┐ ┌────────────┐
                       │ HISTORIAL  │ │ PENSIONES  │
                       │   REMOTE   │ │   REMOTE   │
                       └────────────┘ └────────────┘
```

### Conceptos clave

**Host**
Es la aplicación principal (contenedor/shell). Es responsable de definir la
estructura general, la navegación y los puntos de entrada donde se monta cada
Micro Frontend. En el taller, el Host es `shell-nutria`.

**Remote**
Es una aplicación independiente que expone uno o más módulos para ser
consumidos por un Host. Cada Remote mantiene su propio código, su propio
proceso de build y su propio ciclo de despliegue. En el taller, cada Remote
se corresponde con un dominio: `mfe-afiliados`, `mfe-aportes`,
`mfe-empresas`, `mfe-historial-laboral` y `mfe-pensiones`.

**Module Federation**
Es el mecanismo que habilita la integración en runtime entre aplicaciones
separadas. Permite que el Host resuelva y cargue módulos publicados por otros
proyectos en tiempo de ejecución, sin necesidad de compilar todo en un único
bundle.

**Relación Host → Remote**
El Host *declara* qué módulo remoto necesita consumir (su nombre público y su
origen). El Remote, por su parte, *expone* ese módulo publicado bajo ese mismo
nombre. Cuando el Host lo referencia, el módulo se carga y se renderiza dentro
de la interfaz del Host, manteniendo su implementación en el repositorio del
Remote.

---

## 3. Estructura de árbol

La siguiente es la **estructura objetivo** del taller, es decir, la que se
construirá progresivamente. Actualmente el repositorio contiene únicamente los
archivos base:

```text
NUTRIA-MODULE-FEDERATION/
│
├── shell-nutria/                  # HOST
├── mfe-afiliados/                 # REMOTE
├── mfe-aportes/                   # REMOTE
├── mfe-empresas/                  # REMOTE
├── mfe-historial-laboral/         # REMOTE
├── mfe-pensiones/                 # REMOTE
├── NUTRIA_concepto_visual.html
├── .gitignore
└── README.md
```

Los directorios `shell-nutria/` y `mfe-*/` **aún no existen**; se agregarán a
medida que se completen las etapas descritas en la sección 8.

---

## 4. Módulos federados conectados desde un contenedor principal

El flujo de integración del taller es el siguiente:

```
HOST
  │
  │ Module Federation
  ▼
REMOTE
  │
  │ expone módulo
  ▼
Módulo federado
  │
  ▼
HOST
```

Pasos del flujo:

1. El **Remote** publica (*expone*) un módulo bajo un nombre público.
2. El **Host** declara ese mismo nombre público y le indica de dónde obtenerlo.
3. El **Host** importa el módulo y lo renderiza en su propia interfaz.
4. El módulo se visualiza **dentro** del Host, como parte de la aplicación.

> **Importante:** el código del Remote permanece en su propia aplicación. No
> se copia físicamente al Host. Lo que viaja entre aplicaciones es una
> referencia al módulo publicado, no el código fuente del Remote.

Este punto es fundamental: un Remote puede evolucionar y publicarse de forma
independiente, sin necesidad de reescribir el Host.

---

## 5. Next.js y tecnologías

El taller utilizará el siguiente stack frontend:

- **Next.js 15** o una versión anterior compatible con la estrategia de
  Module Federation que se adopte.
- **React**
- **TypeScript**
- **Module Federation**

> La versión exacta de Next.js, el plugin de federation y el resto de
> dependencias **aún no están definidos** en el proyecto. No se documenta aquí
> configuración alguna porque todavía no existe: la configuración real de
> `next.config` y `remotes` se escribirá cuando se construya el Host y el
> primer Remote.

---

## 6. Design System

El taller puede apoyarse en una librería de componentes desarrollada en
React como **Design System** compartido por el Host y los Remotes.

Sin embargo, el Design System **no es el objetivo principal de este
repositorio**. El foco del taller es aprender cómo un Host consume Micro
Frontends mediante Module Federation. Cualquier decisión sobre estilos,
tokens o librería de componentes es secundaria y se irá tomando durante el
desarrollo.

---

## 7. Inicio del proyecto

El repositorio se encuentra actualmente en estado inicial: **no existen
todavía comandos de inicio, scripts ni configuraciones**, porque las
aplicaciones aún no han sido creadas.

El flujo de arranque previsto para el taller es el siguiente:

1. **Crear el Host** (`shell-nutria`) con Next.js + React + TypeScript.
2. **Crear el primer Remote** (`mfe-afiliados`) como proyecto independiente.
3. **Configurar Module Federation** en ambas aplicaciones.
4. **Exponer un módulo** desde el Remote.
5. **Consumirlo desde el Host** importando el módulo remoto.
6. **Validar la integración** comprobando que el módulo se renderiza dentro
   del Host.
7. **Agregar los demás Remotes** replicando el patrón ya validado.

> Cuando existan scripts y comandos reales, esta sección se actualizará con las
> instrucciones exactas de ejecución.

---

## 8. Etapas del taller

### Etapa 1
Crear `shell-nutria` como **HOST**.

### Etapa 2
Crear `mfe-afiliados` como primer **REMOTE**.

### Etapa 3
Conectar el Host con el primer Remote:

```
shell-nutria
    │
    ▼
mfe-afiliados
```

### Etapa 4
Agregar los restantes Remotes, aplicando el mismo patrón ya validado:

- `mfe-aportes`
- `mfe-empresas`
- `mfe-historial-laboral`
- `mfe-pensiones`

---

## 9. Objetivos de aprendizaje

- Concepto de **Micro Frontends** y sus ventajas frente a un monolito de
  frontend.
- Diferencia entre **Host** y **Remote**.
- Funcionamiento interno de **Module Federation**.
- Publicación y consumo de **módulos expuestos**.
- **Consumo de módulos federados** desde una aplicación anfitriona.
- **Integración de aplicaciones independientes** en runtime.
- **Organización por dominios** como criterio para separar los Micro
  Frontends.

---

## 10. Relación con backend

El frontend del taller pertenece al contexto general de NUTRIA y,
posteriormente, podrá consumir las APIs del backend. De manera conceptual:

```
FRONTEND
   │
   ▼
SHELL-NUTRIA
   │
   ├── MFE Afiliados
   ├── MFE Aportes
   ├── MFE Empresas
   ├── MFE Historial
   └── MFE Pensiones
             │
             ▼
        APIs BACKEND
             │
             ▼
       Microservicios
             │
             ▼
        Oracle / PL-SQL
```

> Esta relación es **únicamente conceptual** en el contexto del taller. La
> implementación interna del backend no forma parte de este repositorio ni
> está documentada aquí.

---

## 11. Estado del proyecto

El proyecto se encuentra en **etapa inicial / en desarrollo**. El repositorio
es nuevo y la implementación del Host y de los Remotes **será construida
durante el taller**.

Checklist:

- [x] Crear repositorio
- [ ] Crear Host
- [ ] Crear primer Remote
- [ ] Configurar Module Federation
- [ ] Conectar Host → Remote
- [ ] Agregar demás Remotes
- [ ] Integrar funcionalidades
- [ ] Integrar backend
