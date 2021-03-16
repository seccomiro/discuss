import { Socket } from "phoenix";

let socket = new Socket("/socket", { params: { token: window.userToken } });

socket.connect();

const createSocket = (topicId) => {
  let channel = socket.channel(`comments:${topicId}`, {});
  channel
    .join()
    .receive("ok", (resp) => renderComments(resp.comments))
    .receive("error", (resp) => {
      console.log("Unable to join", resp);
    });

  channel.on(`comments:${topicId}:new`, (event) =>
    renderComment(event.comment)
  );

  document.querySelector("#comment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.querySelector("#comment-content").value;
    channel.push("comment:add", { content });
  });
};

const renderComments = (comments) =>
  (document.querySelector("#comment-list").innerHTML = comments
    .map(commentTemplate)
    .join(""));

const renderComment = (comment) =>
  (document.querySelector("#comment-list").innerHTML += commentTemplate(
    comment
  ));

const commentTemplate = (comment) => `
    <li class="collection-item">
      ${comment.content}
    </li>
  `;

window.createSocket = createSocket;
