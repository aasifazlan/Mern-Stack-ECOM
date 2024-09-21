import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Initialize Redis with the full connection URL from the environment variable
export const redis = new Redis("rediss://default:AeW4AAIjcDFhNjI1ZDA2ZjgxMmU0YzEwOTc5MDZjNzYxYjMwNjVmOHAxMA@cheerful-cod-58808.upstash.io:6379");

// Test the connection and set a key
try {
  await redis.set('foo', 'bar');
  console.log('Successfully set key in Redis');
} catch (err) {
  console.error('Redis error:', err);
}
