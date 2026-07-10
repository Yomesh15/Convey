import dotenv from "dotenv"
dotenv.config()
import http from "http";
import { initSocket } from "./socket/socket.js";
import express from "express"
import connectDatabase from "./Database/db.js"
import cookieParser from "cookie-parser";
import UserRoute from "./routes/user.route.js"
import MessageRoute from "./routes/message.route.js"
import cors from "cors"
import sendOtpMail from "./utils/sendOtpMail.js";


const app = express()

// connect Daatabase
connectDatabase()

app.set("trust proxy", 1);


app.use(cors({
  origin: true,
  credentials: true,
}));


//middlewaee
app.use(cookieParser())
app.use(express.json())


// routes 
app.use("/user", UserRoute)
app.use("/message", MessageRoute)



app.get("/", (req, res) => {
    res.send("Convey ")
})


const PORT = process.env.PORT || 2005


const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {

    console.log(`Server : http://localhost:${PORT}`);

});