import { redirect } from 'next/navigation';

const Page = () => {
  // Redirect to the signup page
  redirect('/signup');
  return null; // Render nothing as the user is redirected
};

export default Page;
