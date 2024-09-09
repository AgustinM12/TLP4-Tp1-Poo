export type env = string | undefined

// PORT=5000
// SECRET=123456
// URI=mongodb://127.0.0.1:27017/POO

export const PORT: env = process.env.PORT || "5000"
export const URI: env = process.env.URI || "mongodb://127.0.0.1:27017/POO"
export const secretKey: env = process.env.SECRET || "123456"