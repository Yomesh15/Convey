import ConversationModel from "../models/conversation.model.js"
import MessageModel from "../models/message.model.js"

export const SendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let chats = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!chats) {
            chats = await ConversationModel.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessages = new MessageModel({
            senderId,
            receiverId,
            message,
            conversationId: chats._id
        })

        if (newMessages) {
            chats.messages.push(newMessages._id)
        }

        // ssocket io function
        await Promise.all([chats.save(), newMessages.save()])


        return res.status(200).json({ newMessages, success: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Intenal Server Error ", success: false })
    }
}


export const GetMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const chats = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages")

        if (!chats) {
            return res.status(200).json([])
        }

        const message = chats.messages

        return res.status(200).json({ message })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Intenal Server Error ", success: false })
    }
}