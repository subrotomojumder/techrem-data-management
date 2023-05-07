import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';
import "react-datepicker/dist/react-datepicker.css";
// import 'rsuite/dist/rsuite.min.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component  {...pageProps} />
    </Layout>
  )
};

