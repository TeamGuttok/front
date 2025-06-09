export const BASE_URL =
  typeof window === 'undefined'
    ? process.env.API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL

// export const BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
