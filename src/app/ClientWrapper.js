'use client'; 

import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

const ClientWrapper = ({ children }) => {
  const pathname = usePathname();

  const hideNavbarPaths = ['/signup', '/login'];

  return (
    <>
      {!hideNavbarPaths.includes(pathname) && <Navbar />}
      
      {/* Main content */}
      {children}
      
      <Footer />
    </>
  );
};

export default ClientWrapper;
