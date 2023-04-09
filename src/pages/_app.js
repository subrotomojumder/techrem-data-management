import '@/styles/globals.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});


  return (<div className='bg-gray-50'>
    <Navbar></Navbar>
    <Component user={user} setUser={setUser} {...pageProps} />
    <Footer></Footer>
  </div>)
}

