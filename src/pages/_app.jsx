import '../styles/login.css'; 
import '../../globals.css';
import '../styles/map.css';
import '../styles/cityDetail.css';
import '../styles/city.css';  

import React from 'react';

export default function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}
