import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import React from 'react'
import Cookies from 'js-cookie'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

function AlertDialogForTask({ openForTask, setOpenForTask, status, taskId, collectionName, attCollections, title }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const token = Cookies.get('token');
    const [erro, seterro] = useState("")
    useEffect(() => {
        if (openForTask) {
            onOpen();
        } else {
            onClose();
        }
    }, [openForTask, onOpen, onClose]);
    const attStatus = async (newStatus) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND}/tasks/update`,
                {
                    taskId: taskId,
                    collectionName: collectionName,
                    newStatus: newStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                attCollections();
                setOpenForTask(false)
            } else {
                seterro("Não foi possivel alterar o nome da coleção. Tente mais tarde")
            }
        } catch (error) {
            seterro("Não foi possivel alterar o nome da coleção. Tente mais tarde" + error)
            console.error(error);
        }
    }
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Mude o status da sua tarefa!
                        </AlertDialogHeader>
                        {erro != "" ? (
                            <div className='lg:w-[87%] md:w-[83%] px-2 w-full ml-auto mr-auto'>
                                <Alert className='rounded-lg mb-2' status='error'>
                                    <AlertIcon />
                                    <AlertTitle>{erro}</AlertTitle>
                                </Alert>
                            </div>
                        ) : null}
                        <AlertDialogBody>
                            {status === 1 ? (
                                <span>{title}</span>
                            ) : (
                                <span>{title}</span>
                            )}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setOpenForTask(false)}>
                                Cancel
                            </Button>
                            {status === 1 ? (
                                <Button colorScheme='red' onClick={() => attStatus(0)} ml={3}>
                                    Pendente
                                </Button>
                            ) : (
                                <Button colorScheme='green' onClick={() => attStatus(1)} ml={3}>
                                    Concluído
                                </Button>
                            )}

                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
export default AlertDialogForTask