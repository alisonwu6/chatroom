import "./index.css";
import { io } from "socket.io-client";

const url = new URL(location.href);
const userName = url.searchParams.get("user_name");
const roomName = url.searchParams.get("room_name");

if (!userName || !roomName) {
  location.href = "/main/main.html";
}

// 建立 node server 連接
const clientInfo = io()
clientInfo.emit("join", {userName, roomName});

const textInput = document.getElementById("textInput") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const chatBoard = document.getElementById("chatBoard") as HTMLDivElement;
const backBtn = document.getElementById("backBtn") as HTMLButtonElement;
const headerRoomName = document.getElementById("headerRoomName") as HTMLParagraphElement;
headerRoomName.innerText = roomName || "-";

function msgHandler(msg: string) {
  const divBox = document.createElement("div");
  divBox.classList.add("flex", "justify-end", "mb-4", "items-end");
  divBox.innerHTML = `
    <div class="flex justify-end mb-4 items-end">
      <p class="text-xs text-gray-700 mr-4">00:00</p>
      <div>
        <p class="text-xs text-white mb-1 text-right">${userName}</p>
        <p
          class="mx-w-[50%] break-all bg-white px-4 py-2 rounded-bl-full rounded-br-full rounded-tl-full"
        >
          ${msg}
        </p>
      </div>
    </div>
  `
  chatBoard.appendChild(divBox);
  textInput.value = "";
  chatBoard.scrollTop = chatBoard.scrollHeight;
}

function roomMsgHandler(msg: string) {
  const divBox = document.createElement("div");
  divBox.classList.add("flex", "justify-center", "mb-4", "items-center")
  divBox.innerHTML = `
    <p class="text-gray-700 text-sm">${msg}</p>
  `
  chatBoard.append(divBox);
  chatBoard.scrollTop = chatBoard.scrollHeight;
}

submitBtn.addEventListener("click", () => {
  const textValue = textInput.value;
  clientInfo.emit("chat", textValue);
})

backBtn.addEventListener("click", () => {
  location.href = "/main/main.html";
})

clientInfo.on("join", (msg) => {
  console.log("msg", msg);
  roomMsgHandler(msg);
})

clientInfo.on("chat", (msg) => {
  msgHandler(msg);
})

clientInfo.on("leave", (msg) => {
  console.log("client leave:", msg);
  roomMsgHandler(msg);
})