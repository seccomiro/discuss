import { Socket } from "phoenix";

let socket = new Socket("/socket", { params: { token: window.userToken } });

socket.connect();

const createSocket = (topicId) => {
  let channel = socket.channel(`comments:${topicId}`, {});
  channel
    .join()
    .receive("ok", (resp) => {
      console.log("Joined successfully", resp);
    })
    .receive("error", (resp) => {
      console.log("Unable to join", resp);
    });

  document.querySelector("#comment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.querySelector("#comment-content").value;
    channel.push("comment:add", { content });
  });
};

window.createSocket = createSocket;
