export const config = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongodbURL: process.env.DATABASE_URL,
  });