import { getPosts, AddPostClick } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { getToken } from "../index.js";



export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    // свой код ->
    const appHtml = `
           <div class="page-container">
               <div class="header-container"></div>
               <div class="form">
                   <h3 class="form-title">
                    Добавить пост
                     </h3>
                   <div class="form-inputs">
                           <div class="upload-image-container"></div>
                           <div>Опишите фотографию:</div>
                           <textarea type="textarea" id="text-input" class="input" rows="4" style="resize: none; height: 100px;"></textarea>
                       <div class="form-error"></div>
                       <button class="button" id="add-button">
                        Добавить
                       </button>
                   </div>
               </div>
           </div>    
     `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    const text = document.getElementById("text-input").value;

    document.getElementById("add-button").addEventListener("click", () => {
      return AddPostClick({
        token: getToken(),
        description: text,
        imageUrl: imageUrl,
      }).then(() => {
        return getPosts();
      });
    });
  };


  // <- свой код

  render();
}
//document.getElementById("add-button").addEventListener("click", () => {
//onAddPostClick({
// description: "Описание картинки",
// imageUrl: "https://image.png",
//});
//});

/*onAddPostClick({
  description: text,
  imageUrl: imageUrl,
}).catch((error) => {
  console.warn(error);
  //setError(error.message);
});*/
