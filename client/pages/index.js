import axios from 'axios';

//this is executed on the client
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing page</h1>;
};

//getInitialProps is automatically called by nextjs
//when waiting for the page to show
//gets called with properties such request object
LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    //we are on the server
    //need to add cookie and host for ingress
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    //we are on the browser
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;
