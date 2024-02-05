import { MongoClient } from 'mongodb';

async function queryRestaurants() {
  const uri = 'mongodb+srv://saadkhan955:0AErYLTjlqhAxVIp@cluster0.8yrfivj.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("assignment");
    const collection = database.collection("restaurant");

    const cursor = collection.find({
      "grades.score": {
        $gt: 80,
        $lt: 100
      }
    }, { _id: 0, name: 1 });

    try {
      const names = await cursor.toArray();
      console.log(names.map(doc => doc.name));
    } finally {
    }


  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

queryRestaurants();
