import React from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router';
const Navbar = () => {
    return (
        <>
            <nav className='lg:max-w-7xl ml-auto mr-auto py-6 px-2 text-2xl font-semibold justify-between flex'><h1>Olá, Senti Saudades😀</h1><button onClick={() => {Cookies.remove('token'); Router.push("/login")}} className='hover:bg-gray-200 p-1 ease-in-out duration-300 rounded-xl'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            </button></nav>
        </>
    )
}

export default Navbar