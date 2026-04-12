import { ensure, invariant, requireCond } from "@/utils/contracts";

const HTTP_METHODS = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
] as const;

type HttpMethod = (typeof HTTP_METHODS)[number];

function isHttpMethod(value: string): value is HttpMethod {
  return (HTTP_METHODS as readonly string[]).includes(value);
}

function isBodyInit(value: BodyInit | null): boolean {
  if (value === null) {
    return true;
  }
  if (typeof value === "string") {
    return true;
  }
  if (typeof value !== "object") {
    return false;
  }
  return (
    value instanceof Blob ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value) ||
    (typeof ReadableStream !== "undefined" && value instanceof ReadableStream)
  );
}

/**
 * Guaranteed execution contract: one entry point, success or failure as values (no throw).
 */
export interface IRequestExecutor<T> {
  Execute(): Promise<T | Error>;
}

/**
 * Fluent `fetch` wrapper for calling backend microservices, with design-by-contract checks.
 * {@link MicroserviceRequestBuilder.Execute} implements {@link IRequestExecutor}.
 */
export class MicroserviceRequestBuilder<T = unknown>
  implements IRequestExecutor<T>
{
  private _url = "";
  private _method: HttpMethod = "GET";
  private _headers: HeadersInit | undefined;
  private _body: BodyInit | null | undefined;
  private _signal: AbortSignal | undefined;
  private _parseJson = true;

  url(value: string): this {
    requireCond(typeof value === "string", "url must be a string");
    requireCond(value.length > 0, "url must be non-empty");
    this._url = value;
    ensure(this._url === value, "internal URL must match assigned value");
    return this;
  }

  method(value: string): this {
    requireCond(typeof value === "string", "method must be a string");
    const upper = value.toUpperCase();
    requireCond(isHttpMethod(upper), `Unsupported HTTP method: ${value}`);
    this._method = upper as HttpMethod;
    ensure(
      this._method === upper,
      "internal method must hold normalized value",
    );
    return this;
  }

  headers(value: HeadersInit): this {
    try {
      new Headers(value);
    } catch {
      throw new Error(
        "[PRECONDITION FAILED] headers must be a valid HeadersInit",
      );
    }
    this._headers = value;
    ensure(
      this._headers === value,
      "internal headers must match assigned value",
    );
    return this;
  }

  body(value: BodyInit | null): this {
    requireCond(
      isBodyInit(value),
      "body must be null or a supported BodyInit (string, Blob, FormData, buffer, stream)",
    );
    this._body = value;
    ensure(this._body === value, "internal body must match assigned value");
    return this;
  }

  signal(value: AbortSignal): this {
    requireCond(
      value instanceof AbortSignal,
      "signal must be an AbortSignal instance",
    );
    this._signal = value;
    ensure(this._signal === value, "internal signal must match assigned value");
    return this;
  }

  /** When false, successful responses return `undefined as T` (caller should use T = void). */
  parseJson(value: boolean): this {
    requireCond(typeof value === "boolean", "parseJson must be a boolean");
    this._parseJson = value;
    ensure(
      this._parseJson === value,
      "internal parseJson must match assigned value",
    );
    return this;
  }

  /**
   * Runs the configured request. Never throws: failures are returned as `Error`.
   * Contract violations use the same `Error` channel (including thrown `[PRECONDITION FAILED]` / `[POSTCONDITION FAILED]` from checks).
   */
  async Execute(): Promise<T | Error> {
    try {
      requireCond(this._url.length > 0, "URL must be non-empty before Execute");
      invariant(
        this._method === "GET" || this._method === "HEAD"
          ? this._body === undefined || this._body === null
          : true,
        "GET/HEAD must not send a body",
      );

      const res = await fetch(this._url, {
        method: this._method,
        headers: this._headers,
        body: this._body ?? undefined,
        signal: this._signal,
      });

      if (!res.ok) {
        const detail = await safeReadBodySnippet(res);
        return new Error(
          `HTTP ${res.status} ${res.statusText}${detail ? `: ${detail}` : ""}`,
        );
      }

      if (this._parseJson) {
        const text = await res.text();
        if (text.length === 0) {
          return undefined as T;
        }
        let parsed: unknown;
        try {
          parsed = JSON.parse(text) as unknown;
        } catch {
          return new Error(
            "[POSTCONDITION FAILED] Response body is not valid JSON",
          );
        }
        ensure(
          parsed !== undefined,
          "Parsed JSON must be defined when body was non-empty",
        );
        return parsed as T;
      }

      await res.text();
      return undefined as T;
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      return new Error(String(e));
    }
  }
}

async function safeReadBodySnippet(res: Response): Promise<string | null> {
  try {
    const clone = res.clone();
    const t = await clone.text();
    const max = 512;
    if (t.length <= max) {
      return t;
    }
    return `${t.slice(0, max)}…`;
  } catch {
    return null;
  }
}
