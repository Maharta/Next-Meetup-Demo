import MeetupDetail from "../components/meetups/MeetupDetail";
import { getMeetup } from "../helpers/get-meetup";
import { getMeetups } from "../helpers/get-meetups";
import { ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetailPage = ({ meetupData }) => {
  if (!meetupData.title) {
    return <p>Loading..</p>;
  }
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail {...meetupData} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const meetups = await getMeetups({}, { _id: 1 });
  const paths = meetups.map((meetup) => {
    return {
      params: {
        meetupId: meetup._id.toString(),
      },
    };
  });
  return {
    fallback: true,
    paths: paths,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const meetup = await getMeetup({ _id: ObjectId(meetupId) });

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetailPage;
