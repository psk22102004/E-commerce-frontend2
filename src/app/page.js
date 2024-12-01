import { redirect } from 'next/navigation';

const Page = () => {
  redirect('/signup');
  return null;
};

export default Page;
