import './globals.css'; // Your global styles
import 'bootstrap-icons/font/bootstrap-icons.css';
import ClientWrapper from './ClientWrapper.js'; // Import ClientWrapper

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {/* Wrap children in ClientWrapper */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
