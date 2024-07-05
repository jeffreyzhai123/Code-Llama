import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || ""; //sets default connection var as empty string

//copied from https://cloud.mongodb.com/v2/6681fd08ad8dcc317ee2ec65#/connect/Cluster0

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//executes immediate upon import
try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e.stack);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}

//creating a MongoDB object to be exported
// let db = client.db("database");

export default client;