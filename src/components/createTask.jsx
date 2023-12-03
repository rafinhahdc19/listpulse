import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
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
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateTask = ({attCollections, collection}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState("")
    const token = Cookies.get('token');
    const [erro, seterro] = useState("")
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const handleSave = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND}/tasks/create`,
                {
                    collection:collection,
                    name: name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Verificar se a requisição foi bem-sucedida antes de fechar o modal
            console.log(response)
            if (response.status === 201) {
                onClose();
                
                attCollections();
                
                
            } else {
                
                seterro(response?.data?.error || "Erro interno do servidor");
            }
        } catch (error) {
            seterro(error?.response?.data?.error || "Erro interno do servidor");
            console.error(error);
        }
    };
    return (
        <>
            <button  onClick={onOpen}>
                <div className='  border-[#2DAC9B67] border-2 rounded-xl p-[2.85rem] flex'>

                    <div className='ml-auto mr-auto mt-auto mb-auto'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            className='w-10 h-10'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 6v12m6-6H6'
                            />
                        </svg>
                    </div>

                </div>
            </button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crie uma nova tarefa</ModalHeader>
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
                            <FormLabel>Nome da tarefa</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder={"Minha tarefa"}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleSave()}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateTask