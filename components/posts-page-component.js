import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, mainPosts } from "../index.js";
import { likeClick, DeletelikeClick } from "../api.js";
import { formatDistanceToNow } from "date-fns";
import ru from "date-fns/locale/ru";



export let UserId;
export function setUserId(newUserId) {
  UserId = newUserId;
};

export let IsLiked;
export function setIsLiked(newIsLiked) {
  IsLiked = newIsLiked;
};



export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api


  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */


  //${new Date(`${post.createdAt}`).toLocaleString()}

  console.log("Актуальный список постов:", posts);

  // свой код ->
  const postsHtml = posts.map((post, index) => {
    return `
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" class="${post.isLiked === true ? "delete-Like-button" : "like-button"}">
            <img src="${post.isLiked === true ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length === 0 ? " пока никто не лайкнул..." : post.likes.length === 1 ? post.likes[post.likes.length - 1]?.name : post.likes[post.likes.length - 1]?.name + "  и еще  " + (post.likes.length - 1)} </strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">
            ${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
          ${formatDistanceToNow(new Date(post.createdAt), {
      locale: ru,
    })}
          </p>
        </li>`
  }).join('');

  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">${postsHtml}</ul>
    </div>`;
  // <- свой код

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      setUserId(userEl.dataset.userId);
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });

    });
  }



  // свой код ->
  //кнопка лайков

  for (let likeButtonElement of document.querySelectorAll(".like-button")) {
    likeButtonElement.addEventListener('click', () => {
      likeButtonElement.classList.add("loading-like");
      likeClick({
        token: getToken(),
        PostId: likeButtonElement.dataset.postId,
      }).then(() => {
        mainPosts();
        likeButtonElement.classList.remove("loading-like");
      })
        .catch((error) => {
          console.warn(error);
          //goToPage(POSTS_PAGE);
        });
    });
  };

  for (let likeButtonElement of document.querySelectorAll(".delete-Like-button")) {
    likeButtonElement.addEventListener('click', () => {
      likeButtonElement.classList.add("loading-like");
      DeletelikeClick({
        token: getToken(),
        PostId: likeButtonElement.dataset.postId,
      }).then(() => {
        mainPosts();
        likeButtonElement.classList.remove("loading-like");

      }).catch((error) => {
        console.warn(error);
      });
    });
  };
}
// <- свой код