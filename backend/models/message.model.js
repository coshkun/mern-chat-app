import { mongoose } from 'mongoose';

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
    // createdAt, updatedAt (mongoose will add automaticaly)
}, {timestamps: true});

//Export the model
const Message = mongoose.model('Message', messageSchema);
export default Message;