import Image from 'next/image';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter()
  const redirectToLogin = () => {
    router.push("/dashboard");
  };
  useEffect(() => {
    redirectToLogin();
  }, [])
 

  return (
    <>
    </>
  );
}
