/**
 * Códigos de error específicos para operaciones de autenticación.
 *
 * Estos códigos permiten identificar el tipo de fallo sin exponer
 * detalles internos ni información sensible.
 */
export type AuthErrorCode =
  | "AUTH_INIT_ERROR"
  | "AUTH_LOGIN_ERROR"
  | "AUTH_LOGOUT_ERROR"
  | "AUTH_TOKEN_ERROR"
  | "AUTH_UNKNOWN_ERROR";

/**
 * Error estructurado para operaciones relacionadas con autenticación.
 *
 * Normaliza errores provenientes de Keycloak o de la capa de autenticación,
 * preservando el contexto donde ocurrieron y la causa original cuando es útil
 * para debugging.
 */
export class AuthError extends Error {
  /** Código que identifica el tipo de error de autenticación. */
  readonly code: AuthErrorCode;

  /** Contexto donde ocurrió el error (p.ej. "AuthService.init"). */
  readonly context: string;

  /** Causa original del error (preservada cuando es instancia de Error). */
  readonly cause?: Error;

  constructor(
    message: string,
    code: AuthErrorCode,
    context: string,
    cause?: Error
  ) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.context = context;
    this.cause = cause;

    // Preserva stack trace en entornos V8 (Node/Chromium)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }
  }
}

/**
 * Extrae un mensaje legible a partir de un valor desconocido.
 *
 * @param error - Valor capturado en catch (puede ser Error, string, objeto o null/undefined)
 * @returns Mensaje de error normalizado
 */
function extractMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message || "Error desconocido";
  }

  if (typeof error === "string") {
    const trimmed = error.trim();
    return trimmed.length > 0 ? trimmed : "Error desconocido";
  }

  if (error !== null && typeof error === "object") {
    // Intento defensivo: algunos SDKs devuelven { error, error_description }
    const maybeError = error as Record<string, unknown>;

    const errorField = typeof maybeError.error === "string" ? maybeError.error : undefined;
    const descField =
      typeof maybeError.error_description === "string"
        ? maybeError.error_description
        : undefined;

    const combined = [errorField, descField].filter(Boolean).join(": ");
    if (combined) return combined;

    // Evitamos serializar objetos grandes; devolvemos descriptor genérico
    return "Error de autenticación (objeto desconocido)";
  }

  if (error === null || error === undefined) {
    return "Error desconocido (sin detalles)";
  }

  // Fallback para otros tipos primitivos
  return String(error);
}

/**
 * Normaliza la causa original a una instancia de Error cuando es posible.
 *
 * Solo conservamos como `cause` un `Error` para mantener trazabilidad útil
 * y evitar exponer estructuras desconocidas.
 *
 * @param error - Valor original capturado
 * @returns Instancia de Error o undefined
 */
function normalizeCause(error: unknown): Error | undefined {
  if (error instanceof Error) {
    return error;
  }

  // No convertimos strings/objetos a Error artificialmente para no perder
  // la naturaleza original; la causa se conserva únicamente cuando aporta stack.
  return undefined;
}

/**
 * Asigna un código de error de autenticación según el contexto de la operación.
 *
 * La asignación es deliberadamente sencilla y específica para auth.
 *
 * @param context - Contexto de la operación (p.ej. "AuthService.init")
 * @returns Código de error de autenticación
 */
function mapCodeToContext(context: string): AuthErrorCode {
  const normalized = context.toLowerCase();

  if (normalized.includes("init")) {
    return "AUTH_INIT_ERROR";
  }
  if (normalized.includes("login")) {
    return "AUTH_LOGIN_ERROR";
  }
  if (normalized.includes("logout")) {
    return "AUTH_LOGOUT_ERROR";
  }
  if (normalized.includes("token") || normalized.includes("refresh")) {
    return "AUTH_TOKEN_ERROR";
  }

  return "AUTH_UNKNOWN_ERROR";
}

/**
 * Maneja y normaliza errores relacionados con autenticación.
 *
 * Recibe un error de tipo `unknown`, lo normaliza a `AuthError` con:
 * - Mensaje legible y seguro
 * - Código específico de autenticación
 * - Contexto de la operación
 * - Causa original (cuando es Error)
 *
 * **Importante:** No incluye JWT, tokens, credenciales ni información sensible
 * en mensajes o estructuras.
 *
 * @param error - Error capturado durante una operación de autenticación
 * @param context - Contexto donde ocurrió (ej. "AuthService.init", "AuthService.login", "AuthService.logout")
 * @returns Error estructurado de autenticación
 */
export function handleAuthError(error: unknown, context: string): AuthError {
  const safeContext = context || "AuthService.unknown";
  const message = extractMessage(error);
  const cause = normalizeCause(error);
  const code = mapCodeToContext(safeContext);

  return new AuthError(message, code, safeContext, cause);
}