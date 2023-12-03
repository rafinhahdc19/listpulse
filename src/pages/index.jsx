import Image from 'next/image';
import Router from 'next/router';

const redirectToLogin = async () => {
  await Router.push("/dashboard");
};

export default function Home() {
  redirectToLogin();

  return (
    <>
    </>
  );
}
