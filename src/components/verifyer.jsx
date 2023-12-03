import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthVerify = ({ children, routerFunction }) => {
    const [isVerified, setIsVerified] = useState(false);
    const token = Cookies.get('token');

    useEffect(() => {
        const req = async (token) => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND+'/getuser/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200 && response.data.status === 1) {
                    setIsVerified(true);
                } else {
                    setIsVerified(false);
                    routerFunction();
                }
            } catch (error) {
                Cookies.remove('token')
                setIsVerified(false);
                routerFunction();
            }
        }

        if (token) {
            req(token);
        } else {
            setIsVerified(false);
            routerFunction();
        }
    }, []);
    
    return isVerified ? children : null;
};

export default AuthVerify;