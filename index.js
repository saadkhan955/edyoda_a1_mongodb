import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = 'mongodb+srv://saadkhan955:0AErYLTjlqhAxVIp@cluster0.8yrfivj.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const collection = client.db("db").collection("restaurant");

    const query = {};
    const projection = {
      restaurant_id: 1,
      name: 1,
      zip_code: 1,
      _id: 0,
    };

    const cursor = collection.find(query, projection);
    cursor.forEach((document) => {
      console.log(document);
    });
  } finally {
  }
}
run().catch(console.dir);