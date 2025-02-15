interface FetchOptions extends RequestInit {
  timeout?: number
  retries?: number
  retryDelay?: number
  skipSessionCheck?: boolean
}

//const BASE_URL = '/api'
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
const DEFAULT_TIMEOUT = 10000 // 10 seconds
const DEFAULT_RETRIES = 1
const DEFAULT_RETRY_DELAY = 500 // 0.5 second

class Fetcher {
  private baseUrl: string

  constructor(baseUrl: string = '') {
    this.baseUrl = BASE_URL + baseUrl
  }

  private async checkSession(): Promise<void> {
    await this.request('/api/users/check-session', { skipSessionCheck: true })
  }

  private async request<T>(
    url: string,
    options: FetchOptions = {},
  ): Promise<T> {
    const {
      timeout = DEFAULT_TIMEOUT,
      retries = DEFAULT_RETRIES,
      retryDelay = DEFAULT_RETRY_DELAY,
      skipSessionCheck,
      ...fetchOptions
    } = options

    if (!skipSessionCheck && url !== '/api/users/check-session') {
      await this.checkSession()
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...fetchOptions,
        signal: controller.signal,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json() as Promise<T>
    } catch (error) {
      clearTimeout(timeoutId)

      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        return this.request<T>(url, {
          ...options,
          retries: retries - 1,
        })
      }

      throw new Error(
        `Request failed after ${DEFAULT_RETRIES} retries: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  public get<T>(
    url: string,
    options: Omit<FetchOptions, 'method'> = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'GET',
    })
  }

  public post<T>(
    url: string,
    body: unknown,
    options: Omit<FetchOptions, 'method' | 'body'> = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  public put<T>(
    url: string,
    body: unknown,
    options: Omit<FetchOptions, 'method' | 'body'> = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  public delete<T>(
    url: string,
    options: Omit<FetchOptions, 'method'> = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'DELETE',
    })
  }

  public patch<T>(
    url: string,
    body: unknown,
    options: Omit<FetchOptions, 'method' | 'body'> = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }
}

export default Fetcher
