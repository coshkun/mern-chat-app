import { mongoose } from 'mongoose';

// Declare the Schema of the Mongo model
var conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
    // createdAt, updatedAt (mongoose will add automaticaly)
}, {timestamps: true});

//Export the model
const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;