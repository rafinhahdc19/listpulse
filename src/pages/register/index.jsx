import React from 'react'
import Image from 'next/image'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

const index = () => {
    const [erro, seterro] = useState("")
    const [success, setsuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setLoading(true)
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND+'/auth/register', formData);
            setLoading(false)
            console.log(response.data)
            seterro("")
            setsuccess(response.data)
        } catch (error) {
          console.log(error)
            setLoading(false)
            setsuccess("")
            try{
              if(error.status == 429){
                seterro("Muitas requisições, seja mais devagar.")
              }
              seterro(error.response.data.message)
            }catch(erro){
              seterro("Erro interno, volte mais tarde")
            }
        }
      }
    return (
        <>
          <main className='justify-center flex'>
            <div className='w-full'>
              <div className='justify-center flex my-5'>
                <Image className='select-none' alt='logo' src={"./baner.svg"} width="200" height="200"></Image>
              </div>
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
              
              <div className='bg-white rounded-lg p-6 mb-6 lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto drop-shadow-md'>
                <h1 className='font-bold text-2xl my-2 '>Cadastrar-se</h1>
                <h2 className='text-black text-lg mb-5 opacity-70 '>Insira suas credenciais abaixo:</h2>
                <form onSubmit={handleSubmit}>
                <label className='font-medium' htmlFor="username">Username</label>
                  <Input
                    size="lg"
                    focusBorderColor='blue.400'
                    className="my-2"
                    placeholder='username'
                    type="username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <label className='font-medium' htmlFor="email">Email</label>
                  <Input
                    size="lg"
                    focusBorderColor='blue.400'
                    className="my-2"
                    placeholder='Email'
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <label className='font-medium' htmlFor="password">Senha</label>
                  <Input
                    size="lg"
                    focusBorderColor='blue.400'
                    className="mb-4 mt-2"
                    placeholder='Senha'
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <Button
                    isLoading={loading}
                    bgColor="#2ABCA4"
                    colorScheme='green'
                    className="my-4 w-full"
                    color="white"
                    type="submit"
                  >
                    Cadastrar
                  </Button>
                </form>
                <div className='flex w-full justify-between'>
                  <div className='border-b mt-auto mb-auto w-full border-black/70'></div>
                  <p className='p-4 font-medium text-black/90 text-lg'>OU</p>
                  <div className='border-b mt-auto mb-auto w-full border-black/70'></div>
                </div>
    
                <p className='text-center text-lg opacity-70 mb-2 '>Já tem uma conta? Então faça <Link href={"/login"} className="text-[#2ABCA4]">Login</Link></p>
              </div>
            </div>
          </main>
        </>
      )
    }

export default index