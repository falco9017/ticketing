import buildClient from '../api/build-client';

//this is executed on the client
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

//getInitialProps is automatically called by nextjs
//when waiting for the page to show
//gets called with properties such request object
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
