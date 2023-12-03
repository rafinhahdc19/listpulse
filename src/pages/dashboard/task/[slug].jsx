import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useRouter } from 'next/router';
import AuthVerify from '@/components/verifyer';
import { useEffect, useState } from 'react';
import CreateTask from '@/components/createTask';
import Tasks from '@/components/task';

const Index = () => {
    const token = Cookies.get('token');
    const router = useRouter();
    const redirectToLogin = () => {
        router.push('/login');
    };
    const { slug } = router.query;
    const [tasks, setTasks] = useState([]);
    const [setedTasks, setsetedTasks] = useState(false)
    const redirectToDashboard = () => {
        router.push('/dashboard');
    };
    const newSlug =  decodeURIComponent(slug)
    const fetchData = async () => {
        
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND}/tasks`,
                {
                    name: newSlug,
                    page: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setTasks(response.data.tasks);
            }
        } catch (error) {
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND}/tasks`,
                    {
                        name: newSlug,
                        page: 1,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
    
                if (response.status === 200) {
                    setsetedTasks(true)
                    setTasks(response.data.tasks);
                    
                }
            } catch (error) {
                // Lidar com erros, se necessário
            }
        };
    
        if (newSlug !== undefined && setedTasks == false) {
            fetchData();
        }
    }, [newSlug, tasks]);
    return (
        <>
            <AuthVerify routerFunction={redirectToLogin}>
                <nav className='lg:max-w-7xl ml-auto mr-auto py-3 px-2 text-2xl font-semibold justify-between flex'>
                    <button onClick={() => Router.push("/dashboard")} className='flex gap-2 mt-auto mb-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                        <span className='mt-auto mb-auto'>Voltar</span>
                    </button>
                </nav>
                <main>
                    <div><h1 className='font-medium my-2 mb-5 text-2xl text-center'>{slug}</h1></div>
                    <div className='grid mb-6 lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 px-4'>
                        {tasks.map((task) => (
                            <Tasks
                                key={task.id}
                                titulo={task.titulo}
                                attCollections={fetchData}
                                taskId={task.id}
                                collectionName={newSlug}
                                status={task.status}
                            ></Tasks>
                        ))}
                        <CreateTask collection={slug} attCollections={fetchData}></CreateTask>
                    </div>
                </main>
            </AuthVerify>
        </>
    )
}

export default Index;