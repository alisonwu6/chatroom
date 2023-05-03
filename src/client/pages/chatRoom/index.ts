import "./index.css";
import { io } from "socket.io-client";
import { name } from "@/utils";

console.log("client side chatroom page", name);

// 建立 node server 連接
const clientInfo = io()
clientInfo.on("join", (msg) => {
  console.log("msg", msg);
  
})