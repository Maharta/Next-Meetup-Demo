import MeetupList from "../components/meetups/MeetupList";
import { getMeetups } from "../helpers/get-meetups";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>World Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of available world meetups to expand your network!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   // const req = context.req;
//   // const res = context.res
//   //fetch data from API or file system with server side code because this code will always run on server

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // can run server side code, this function will never make it to browser client
  const meetups = await getMeetups();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
        };
      }),
    },
    revalidate: 5,
  };
}

export default HomePage;
