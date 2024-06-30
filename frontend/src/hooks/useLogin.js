import { useState } from "react"
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username, password) => {
        setLoading(true);
        try {
            if(!username || !password) {
                throw new Error("Please fill in all the fields");
            }

            //console.log(JSON.stringify({username, password}));
            
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({username, password})
            });

            const data = await res.json();
            //console.log(data);
            if(data.error) {
                throw new Error(data.error);
            }

            // implement local-storage
            localStorage.setItem("chat-app-user", JSON.stringify(data));
            // implement context
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, login }
};

export default useLogin;