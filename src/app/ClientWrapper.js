'use client'; // This is a client component

import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar.js'; // Adjust the path to your Navbar component
import Footer from '../components/Footer.js'; // Import Footer

const ClientWrapper = ({ children }) => {
  const pathname = usePathname();

  // List of paths where the Navbar should be hidden
  const hideNavbarPaths = ['/signup', '/login'];

  return (
    <>
      {/* Render Navbar unless the current path matches one in the hideNavbarPaths array */}
      {!hideNavbarPaths.includes(pathname) && <Navbar />}
      
      {/* Main content */}
      {children}
      
      {/* Always render the Footer */}
      <Footer />
    </>
  );
};

export default ClientWrapper;
