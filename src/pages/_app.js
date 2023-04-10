import '@/styles/globals.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});


  return (
    <Provider store={store}>
      <div className='bg-gray-50'>
        <Navbar></Navbar>
        <Component user={user} setUser={setUser} {...pageProps} />
        <Footer></Footer>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </Provider>
  )
};

