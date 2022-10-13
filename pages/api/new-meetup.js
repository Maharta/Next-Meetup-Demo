import { MongoClient } from "mongodb";

// api/new-meetup POST

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://gdcr7:Rq1EPwspPIEoN3Ub@meetupnextjs.vonzt9e.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);
      client.close();
      res.status(201).json({
        message: "meetup inserted!",
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default handler;
