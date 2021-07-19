const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
let delBtns = document.querySelectorAll(".delBtn");

const handleDelete = async ({ target }) => {
  const comment = target.parentNode;
  const commentId = comment.dataset.id;
  videoComments.removeChild(comment);
  await fetch(`/api/comments/${commentId}`, {
    method: "DELETE"
  });
};

const addComment = (text, id) => {
  
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.className = "delBtn";
  span2.addEventListener('click', handleDelete);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();   // fetch(POST) 완료 후 백엔드에서 넘겨준 comment._id를 받음.
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if(delBtns) {
for (const delBtn of delBtns) {
  delBtn.addEventListener('click', handleDelete);
}
}
