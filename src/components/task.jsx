import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import Router from 'next/router';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Portal
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AlertDialogForTask from './openSetTask';

const Tasks = ({ titulo, attCollections, collectionName, status, taskId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [erro, seterro] = useState("")
    const [taskName, settaskName] = useState(titulo);
    const initialRef = React.useRef(null)
    const [newName, setNewName] = useState('');
    const finalRef = React.useRef(null)
    const token = Cookies.get('token');
    const deleteTask = async () => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_BACKEND}/tasks/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    data: {
                        taskId: taskId, collectionName: collectionName
                    },
                }
            );

            if (response.status === 200) {
                setNewName('');
                onClose();
                attCollections();
            } else {
                seterro("Não foi possivel deletar a coleção. Tente mais tarde")
            }
        } catch (error) {
            seterro("Não foi possivel deletar a coleção. Tente mais tarde")
            console.error(error);
        }
    }
    const handleSave = async () => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND}/tasks/update`,
                {
                    taskId: taskId,
                    collectionName: collectionName,
                    newName: newName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                settaskName(newName);
                setNewName('');
                onClose();
            } else {
                seterro("Não foi possivel alterar o nome da coleção. Tente mais tarde")
            }
        } catch (error) {
            seterro("Não foi possivel alterar o nome da coleção. Tente mais tarde" + error)
            console.error(error);
        }
    };
    const [StatusForTask, setStatusForTask] = useState(false)
    return (
        <>
        <button onClick={() => setStatusForTask(true)}>
            <div className='bg-[#2DAC9B37] rounded-xl pb-5 pt-2 pl-5 pr-1'>
                <div className='mb-5 flex justify-between'>
                    <h1 className='text-xl font-medium mt-auto mb-auto overflow-hidden whitespace-nowrap overflow-ellipsis'>{taskName}</h1>
                    <div className='mt-auto mb-auto flex'>
                        <button className='z-20 p-4' onClick={(e) => { e.stopPropagation(); onOpen(); }}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke-width='1.5'
                                stroke='currentColor'
                                className='w-6 h-6'
                            >
                                <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={` font-medium text-lg flex ${status === 1 ? 'text-green-700' : 'text-red-700'}`}>
                    {status === 1 ? 'Concluído' : 'Pendente'}
                </div>

            </div>
        </button>
            <AlertDialogForTask openForTask={StatusForTask} attCollections={attCollections} setOpenForTask={setStatusForTask} status={status} taskId={taskId} collectionName={collectionName}></AlertDialogForTask>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Altere o nome da sua coleção</ModalHeader>
                    {erro != "" ? (
                        <div className='lg:w-[87%] md:w-[83%] px-2 w-full ml-auto mr-auto'>
                            <Alert className='rounded-lg mb-2' status='error'>
                                <AlertIcon />
                                <AlertTitle>{erro}</AlertTitle>
                            </Alert>
                        </div>
                    ) : null}
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nome da coleção</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder={taskName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter className=' flex justify-between '>
                        <div className='mr-auto'>
                            <Button onClick={() => deleteTask()} colorScheme='red'>
                                Deletar
                            </Button>
                        </div>
                        <div>
                            <Button colorScheme='blue' mr={3} onClick={handleSave}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Tasks;


