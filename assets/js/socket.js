import { Socket } from "phoenix";

let socket = new Socket("/socket", { params: { token: window.userToken } });

socket.connect();

const createSocket = (topicId) => {
  let channel = socket.channel(`comments:${topicId}`, {});
  channel
    .join()
    .receive("ok", (resp) => {
      renderComments(resp.comments);
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

const renderComments = (comments) => {
  const commentsHtml = comments.map(
    (comment) => `
    <li class="collection-item">
      ${comment.content}
    </li>
  `
  );
  document.querySelector("#comment-list").innerHTML = commentsHtml.join("");
};

window.createSocket = createSocket;
