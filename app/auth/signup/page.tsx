'use client'
 
import { useRouter } from 'next/navigation';

export const Page = () => {
  const router = useRouter();

  return router.push('/auth/login');
}

export default Page
