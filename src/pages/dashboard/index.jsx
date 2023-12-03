import AuthVerify from '@/components/verifyer';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Navbar from '@/components/navbar';
import Collection from '@/components/collection';
import { Spinner } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import axios from 'axios';
import CreateCollection from '@/components/createCollection';
import { useRouter } from 'next/router';


const Index = () => {
  
  const router = useRouter();
  const redirectToLogin = () => {
    router.push('/login');
  };
  const [collections, setCollections] = useState([]);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');
  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/collections`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCollections(response.data.collections);
      setLoading(false);
    } catch (error) {
      setErro(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  const attCollections = async () => {
    await fetchCollections();
  };
  return (
    <AuthVerify routerFunction={redirectToLogin}>
      <Navbar></Navbar>
      {loading && (
        <div className='flex w-full ml-auto mr-auto'>
          <Spinner
          className='ml-auto mr-auto'
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </div>
      )}
      {erro !== '' && (
        <div className='lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto'>
          <Alert className='rounded-lg mb-2' status='error'>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{erro}</AlertDescription>
          </Alert>
        </div>
      )}
      {!loading && erro === '' && (
        <main className='lg:max-w-7xl ml-auto mr-auto'>
          <div className='grid  lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 px-4'>
            {collections.map((collection) => (
              <Collection
                key={collection.id}
                titulo={collection.titulo}
                tasks={collection.tasksCount}
                attCollections={() => attCollections()}
              ></Collection>
            ))}
            <CreateCollection attCollections={() => attCollections()}></CreateCollection>
          </div>
        </main>
      )}
    </AuthVerify>
  );
};

export default Index;
