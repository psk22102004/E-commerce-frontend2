import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ClientWrapper from './ClientWrapper.js'; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
