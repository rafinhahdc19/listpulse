import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const EmailVerify = () => {
  const [erro, seterro] = useState("")
  const [success, setsuccess] = useState("")
  const [loading, setloading] = useState(false)
  const router = useRouter();

  const verifyUser = async (slug) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND+'/auth/emailverify/verify', {
        vslug: slug
      });
      setloading(false);
      setsuccess(response.data.message)
      setTimeout(() => {
        Router.push("/login")
      }, 1000);
    } catch (error) {
      setloading(false);
      try{
        seterro(error.response.data.message)
        setTimeout(() => {
          Router.push("/login")
        }, 2000);
      }catch(erro){
        seterro("Erro interno, volte mais tarde")
        setTimeout(() => {
          Router.push("/login")
        }, 2000);
      }
      
      
    }
  };

  useEffect(() => {

    if (router.query.slug) {
      verifyUser(router.query.slug);
    }
  }, [router.query.slug]); 

  return (
    <>
      <div className='flex justify-center m-4 items-center'>
      {erro != "" ? (
                    <div className='lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto'>
                        <Alert className='rounded-lg mb-2' status='error'>
                        <AlertIcon />
                        <AlertTitle>{erro}</AlertTitle>
                        </Alert>
                    </div>
                ) : null}
                {success != "" ? (
                    <div className='lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto'>
                        <Alert className='rounded-lg mb-2' status='success'>
                        <AlertIcon />
                        <AlertTitle>{success}</AlertTitle>
                        </Alert>
                    </div>
                ) : null}
      </div>
    </>
  );
};

export default EmailVerify;
