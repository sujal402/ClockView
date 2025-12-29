import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.db_url;
const dbName = process.env.DB_NAME || process.env.db_name || "clockDB";
const options = {};

if (!uri) throw new Error("Please add MONGODB_URI or db_url to .env.local");

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
  console.log("Development DB Connection Established — URI:", uri);
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
export { dbName };
