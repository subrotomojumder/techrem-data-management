import '@/styles/globals.css';
import Layout from '../components/Layout';
// import 'rsuite/dist/rsuite.min.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component  {...pageProps} />
    </Layout>
  )
};

