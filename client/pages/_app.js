//this file adds styling to all our pages
//the file redefines the app component
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/Header';

//don't call it App
const AppComponent = ({ Component, pageProps, currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

//in the _app file this function receives a different props
//the req, res are inside ctx property of the context
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  //getInitialProps in other pages is not called since we implemented this
  //so we need to call it manually
  console.log(data);
  const pageProps = await appContext.Component.getInitialProps?.(
    appContext.ctx
  );

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
