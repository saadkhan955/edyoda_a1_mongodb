import { MongoClient } from 'mongodb';

async function queryRestaurants() {
  const uri = 'mongodb+srv://saadkhan955:0AErYLTjlqhAxVIp@cluster0.8yrfivj.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("assignment");
    const collection = database.collection("restaurant");

    const cursor = collection.find({}, { _id: 0, restaurant_id: 1, name: 1, "address.zipcode": 1 });

    try {
      const documents = await cursor.toArray();
      documents.forEach(({ restaurant_id, name, address }) => {
        console.log({ restaurant_id, name, zipcode: address.zipcode });
      });
    } finally {
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

queryRestaurants();
