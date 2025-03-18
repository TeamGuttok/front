// interface FetchOptions extends RequestInit {
//   timeout?: number
//   retries?: number
//   retryDelay?: number
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
// const DEFAULT_TIMEOUT = 10000 // 10 seconds
// const DEFAULT_RETRIES = 1
// const DEFAULT_RETRY_DELAY = 500 // 0.5 second

// class Fetcher {
//     private baseUrl: string
    
//     constructor(baseUrl: string = '') {
//     this.baseUrl = BASE_URL + baseUrl
// }

//   private async request<T>(
//     url: string,
//     options: RequestInit): Promise<T> {

//     const controller = new AbortController()
//     const timeoutId = setTimeout(() => controller.abort(), 10000) // 10초 타임아웃


//     try {
//       const response = await fetch(`${this.baseUrl}${url}`, {
//         ...options,
//         signal: controller.signal,
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           ...options.headers,
//         },
//       })

//       clearTimeout(timeoutId)

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       return response.json() as Promise<T>
//     } catch (error) {
//       clearTimeout(timeoutId)
//       throw error
//     }
// }

//   public get<T>(
//     url: string,
//     options: Omit<FetchOptions, 'method'> = {},
//   ): Promise<T> {
//     return this.request<T>(url, {
//       ...options,
//       method: 'GET',
//     })
//   }

//   public post<T>(
//     url: string,
//     body: unknown,
//     options: Omit<FetchOptions, 'method' | 'body'> = {},
//   ): Promise<T> {
//     return this.request<T>(url, {
//       ...options,
//       method: 'POST',
//       body: JSON.stringify(body),
//     })
//   }

//   public put<T>(
//     url: string,
//     body: unknown,
//     options: Omit<FetchOptions, 'method' | 'body'> = {},
//   ): Promise<T> {
//     return this.request<T>(url, {
//       ...options,
//       method: 'PUT',
//       body: JSON.stringify(body),
//     })
//   }

//   public delete<T>(
//     url: string,
//     options: Omit<FetchOptions, 'method'> = {},
//   ): Promise<T> {
//     return this.request<T>(url, {
//       ...options,
//       method: 'DELETE',
//     })
//   }

//   public patch<T>(
//     url: string,
//     body: unknown,
//     options: Omit<FetchOptions, 'method' | 'body'> = {},
//   ): Promise<T> {
//     return this.request<T>(url, {
//       ...options,
//       method: 'PATCH',
//       body: JSON.stringify(body),
//     })
//   }
// }

// export default new Fetcher()
