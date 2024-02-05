import { MongoClient } from 'mongodb';

async function queryRestaurants() {
  const uri = 'mongodb+srv://saadkhan955:0AErYLTjlqhAxVIp@cluster0.8yrfivj.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("assignment");
    const collection = database.collection("restaurant");

    const updateResult = await collection.updateMany(
      { "grades.grade": "B" }, // Match documents with grade B
      { $set: { "grades.$.grade": "A" } } // Update the matched grade to A
    );



    try {
      console.log(`${updateResult.modifiedCount} documents updated.`);
    } finally {
      // No need to explicitly close the cursor; MongoDB drivers handle this automatically
    }


  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

queryRestaurants();
