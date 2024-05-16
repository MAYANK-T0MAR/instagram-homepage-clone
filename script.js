import {arr} from './contents.js';
const storySection = document.querySelector("#story-section")
const storyContent = document.querySelector(".story-content")
const container = document.querySelector(".container")
const menu = document.querySelector("#menu")
const story = document.querySelector(".story")
const isLiked = [];

var data = ""
var postData = ""
arr.forEach(function(elem, i) {
    data += `
            <div class="single-story">
                <div class="story">
                    <img id="${i}" src="${elem.pfp}" alt="pfp">
                </div>
                <div class="namesBelow">
                    ${elem.username}
                </div>
            </div>
            `
    postData += `
    <div class="post">
    <div class="post-name">
        <div class="post-pfp">
            <img id="${i}" src="${elem.pfp}" alt="post">
        </div>
        <div class="post-username">${elem.username}</div>
        <div class="post-options">
            <img src="icons/more.png" alt="">
        </div>
    </div>
    <div class="post-image" style="background-image: url('${elem.post}')">
        <div class="heart-popup"></div>
    </div>
    <div class="post-actions">
        <div class="social">
            <div class="like">
                <img src="icons/heart.png" alt="">
            </div>
            <div class="comment">
                <img src="icons/chat (1).png" alt="">
            </div>
            <div class="send">
                <img src="icons/direct-instagram.png" alt="">
            </div>
        </div>
        <div class="save">
            <img src="icons/bookmark (2).png" alt="">
        </div>
    </div>
    <div class="info">
        <span class="text">${elem.likes} likes <br>${elem.username}</span>
        <span class="coments">view all 5 comments</span>
    </div>
</div>
    `
});


storySection.innerHTML = data; //to insert stories data in the story section div
menu.insertAdjacentHTML('beforebegin', postData);  //to insert post data in the container div just before menu (as menu is a static div so it'll be there just after the story section div before the post data arrives and we have to make sure that the menu div always sticks to the bottom of the container and the post data goes between story section div and menu div hence insertAdjacentHTML(beforebegin))
storySection.addEventListener("click", function(dets){
    viewStory(dets); //view story function in story section (viewstory function defined below)
    dets.target.parentElement.style.background = "#a3a3a3";    
    const postImage = container.querySelector(`.post img[id='${dets.target.id}']`);
    postImage.parentElement.style.background = "none";
    postImage.parentElement.style.padding = "0";
    
    
})

const postName = document.querySelectorAll(".post-name");

postName.forEach(function(elem){
    elem.addEventListener("click", function(dets){
        viewStory(dets); //view story function in post section div where the user pfp displays (viewstory function defined below)
        dets.target.parentElement.style.background = "none";
        dets.target.parentElement.style.padding = "0";
        var imageId = dets.target.id;
        storySection.querySelector(`img[id='${imageId}']`).parentElement.style.background = "#a3a3a3";
    })
})



//---------------------double tap to like functionality--------------------
const postImages = document.querySelectorAll(".post-image");
const heartPopups = document.querySelectorAll(".heart-popup");
const likeButtons = document.querySelectorAll(".like");
const likes = document.querySelectorAll(".info");

postImages.forEach(function(postImage, index){
    isLiked[index] = false;
    postImage.addEventListener("dblclick", function(){
        const heartPopup = heartPopups[index];
        const particularLikeButton = likeButtons[index];
        // Add the animation class
        heartPopup.classList.add("animate-heart");
        particularLikeButton.querySelector("img").src = "icons/heartRed.png";
        
        if(!isLiked[index]){
            arr[index].likes++;
            const like = likes[index]
            like.innerHTML =  `<span class="text">${arr[index].likes} likes <br>${arr[index].username}</span>
                            <span class="coments">view all 5 comments</span>`
        }
        isLiked[index] = true;

        // After a delay, remove the animation class to enable re-triggering
        setTimeout(function() {
            heartPopup.classList.remove("animate-heart");
        }, 1000);
        event.preventDefault();
    });
});
//---------------------double tap to like functionality--------------------





//---------------------Tap on the like button to like functionality--------------------
document.addEventListener("DOMContentLoaded", function() {
    const likeButtons = document.querySelectorAll(".like");

    likeButtons.forEach(function(particularLikeButton, index) {
        // let isLiked = false;
        const like = likes[index];
        particularLikeButton.addEventListener("click", function() {
            const image = particularLikeButton.querySelector("img");
            if (!isLiked[index]) {
                image.src = "icons/heartRed.png";
                arr[index].likes++;
                like.innerHTML =  `<span class="text">${arr[index].likes} likes <br>${arr[index].username}</span>
                                    <span class="coments">view all 5 comments</span>`
            } else {
                image.src = "icons/heart.png";
                arr[index].likes--;
                like.innerHTML =  `<span class="text">${arr[index].likes} likes <br>${arr[index].username}</span>
                                    <span class="coments">view all 5 comments</span>`

            }
            isLiked[index] = !isLiked[index]; // Toggle the state
        });
    });
});
//---------------------Tap on the like button to like functionality--------------------



//---------------------function to view stories--------------------
function viewStory(dets){
    storyContent.style.backgroundImage = `url(${arr[dets.target.id].story})`
    document.querySelector(".pfp").style.backgroundImage = `url(${arr[dets.target.id].pfp})`
    document.querySelector("#inside-story-name").innerHTML = arr[dets.target.id].username
    storyContent.style.display = "flex"
    container.style.overflowY = "hidden"
    container.style.padding = "0"

    var timeoutID = setTimeout(function(){
        storyContent.style.display = "none"
        container.style.overflowY = "auto"
    }, 8000);



    document.querySelector("#cross").addEventListener("click", function(){
        clearTimeout(timeoutID)
        storyContent.style.display = "none"
        container.style.overflowY = "auto"
    });


}
//---------------------function to view stories--------------------



