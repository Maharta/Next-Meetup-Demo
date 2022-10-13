import { MongoClient } from "mongodb";

export async function getMeetup(filterOptions = {}, fieldFilterOptions = {}) {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://gdcr7:Rq1EPwspPIEoN3Ub@meetupnextjs.vonzt9e.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne(
      filterOptions,
      fieldFilterOptions
    );
    return selectedMeetup;
  } catch (error) {
    console.log(error.message);
  }
}
