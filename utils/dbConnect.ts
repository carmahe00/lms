import mongoose from 'mongoose';

const { DB_URL, MONGODB_DB, MONGOUSER, MONGOPASSWORD } = process.env;

if (!DB_URL) throw new Error('DB_URL not defined');


// Extend NodeJS global type for caching
declare global {
  // Avoid duplicate declarations in case of module reload
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Initialize the global cache if not present
global.mongooseCache ||= {
  conn: null,
  promise: null,
};

const cached = global.mongooseCache;

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${DB_URL}`);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
