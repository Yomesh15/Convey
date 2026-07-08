import mongoose from "mongoose"


const connectDatabase = async () =>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Database Connected !");
    } catch (error) {
        console.log(error);
        console.log("Failed to Connect Database !");
    }
}


export default connectDatabase