import { MongoClient } from 'mongodb';

async function queryRestaurants() {
  const uri = 'mongodb+srv://saadkhan955:0AErYLTjlqhAxVIp@cluster0.8yrfivj.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("assignment");
    const collection = database.collection("restaurant");

    const cursor = collection.find({
      name: {
        $regex: /^Caf/i
      }
    }, { _id: 0, name: 1, "address.coord": 1, cuisine: 1 });

    try {
      const restaurants = await cursor.toArray();
      restaurants.forEach(({ name, address, cuisine }) => {
        console.log({ name, coord: address.coord, cuisine });
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
