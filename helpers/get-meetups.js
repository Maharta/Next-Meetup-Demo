import { MongoClient } from "mongodb";

export async function getMeetups(filterOptions = {}, fieldFilterOptions = {}) {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@meetupnextjs.vonzt9e.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection
      .find(filterOptions, fieldFilterOptions)
      .toArray();
    console.log(meetups);
    client.close();
    return meetups;
  } catch (error) {
    console.log(error.message);
  }
}
