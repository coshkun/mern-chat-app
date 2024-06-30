import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractChatTime } from '../../utils/extractChatTime';

const Message = ({message}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const isFromMe = message.senderId === authUser.id;
  // const isFromOther = message.senderId === selectedConversation.id;
  const defaultPic = "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png";

  const chatClassName = isFromMe ? 'chat-end' : 'chat-start';
  const profilePic = isFromMe ? authUser.profilePic : (selectedConversation?.profilePic ?? defaultPic)
  const senderName = isFromMe ? authUser.fullName : (selectedConversation?.fullName ?? defaultPic)
  const bubleBgColor = isFromMe ? 'bg-blue-500' : '';
  const sentTime = extractChatTime(message.createdAt);
  //console.log(sentTime);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img
                    alt={`${senderName}'s profile pic`}
                    // "https://avatar.iran.liara.run/public/45"
                    // https://api.dicebear.com/9.x/adventurer/png?seed=Daisy
                    src={profilePic} />
            </div>
        </div>
        {/* <div className="chat-header">
            {senderName}
            <time className="text-xs opacity-50">{' ' + sentTime}</time>
        </div> */}
        <div className={`chat-bubble text-white ${bubleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{sentTime}</div> {/* ⎷⎷  */}
    </div>
  )
}

export default Message