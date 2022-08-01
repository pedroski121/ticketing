//_app acts as a wrapper for components we want to show on the screen
// This makes the bootstrap component to be available in all the pages 
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../build-client/build-client';
import Header from '../components/header';
const AppComponent = ({Component, pageProps, currentUser}) => {
    return <div>
            <Header currentUser={currentUser}/>
            <Component {...pageProps}/>
        </div>
}


AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const {data} = await client.get('/api/users/currentuser');
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        pageProps, 
        ...data
    }
};

export default AppComponent;