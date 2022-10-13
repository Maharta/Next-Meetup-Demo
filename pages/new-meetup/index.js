import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useFetch } from "../../hooks/useFetch";
import { Fragment } from "react";
import Head from "next/head";

const NewMeetupPage = (props) => {
  const { error, isLoading, sendRequest } = useFetch("/api/new-meetup");
  const addMeetup = async (meetUpData) => {
    const data = await sendRequest({
      method: "POST",
      body: JSON.stringify(meetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data) {
      alert("Data added");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetup, create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetup} />
      {error && <p>{error.message}</p>}
    </Fragment>
  );
};

export default NewMeetupPage;
