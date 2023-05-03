import "./index.css";
import { io } from "socket.io-client";

const url = new URL(location.href);
const userName = url.searchParams.get("user_name");
const roomName = url.searchParams.get("room_name");

if (!userName || !roomName) {
  location.href = "/main/main.html";
}

console.log('chat', userName, roomName);

// 建立 node server 連接
const clientInfo = io()
clientInfo.on("join", (msg) => {
  console.log("msg", msg);
  
})