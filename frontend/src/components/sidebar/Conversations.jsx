import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  //console.log("Conversations: ", conversations);

  return (
    <div className='py-2 flex flex-col overflow-auto'>
        { conversations.map((item, idx) => {
          return <Conversation
                    key={item.id}
                    conversation={item}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === conversations.length - 1}
                 />
        }) }

        { loading ? <span className='loading loading-spinner mx-auto' /> : null }
    </div>
  )
}

export default Conversations


// STARTER CODE
// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//     </div>
//   )
// }

// export default Conversations