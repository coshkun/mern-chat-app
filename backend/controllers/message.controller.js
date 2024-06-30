import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
    // console.log("message sent!", req.params.id );
    // res.status(200).json({message:"message sent! " + `${req.params.id}` });
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //await newMessage.save();
        //await conversation.save();
        
        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);
        
        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to a specific client
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        const mappedMsg = {
            id : newMessage._id,
            senderId: newMessage.senderId,
            receiverId: newMessage.receiverId,
            message: newMessage.message,
            createdAt: newMessage.createdAt,
            updatedAt: newMessage.updatedAt
        };
        res.status(201).json(mappedMsg);
        
    } catch (error) {
        console.log("Error in message.controller.js, 'sendMessage' method.", error.message);
        return res.status(500).json({error:"Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if(!conversation) {
            //return res.status(404).json({error:"Conversation not found"});
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        const mappedMsg = messages.map( (message) => {
            return {
                id : message._id,
                senderId: message.senderId,
                receiverId: message.receiverId,
                message: message.message,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt
            };
        } )

        res.status(200).json(mappedMsg);
        
    } catch (error) {
        console.log("Error in message.controller.js, 'getMessages' method.", error.message);
        return res.status(500).json({error:"Internal server error"});
    }
};