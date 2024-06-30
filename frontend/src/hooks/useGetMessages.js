import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
        setLoading(true);
    
        try {
            const res = await fetch(`/api/messages/${selectedConversation.id}`, {
                method: "GET",
                headers: { "Content-Type" : "application/json" }
            });
    
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
    
            setMessages(data)
    
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    
      };

      if(selectedConversation?.id) getMessages();
  }, [selectedConversation?.id, setMessages]);

  return { loading, messages };
}

export default useGetMessages