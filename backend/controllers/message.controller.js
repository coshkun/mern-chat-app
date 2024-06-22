import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


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

        // SOCKET IO FUNCTIONALITY WILL GO HERE

        //await newMessage.save();
        //await conversation.save();

        // this will run in parallel
        Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
        
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

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error in message.controller.js, 'getMessages' method.", error.message);
        return res.status(500).json({error:"Internal server error"});
    }
};