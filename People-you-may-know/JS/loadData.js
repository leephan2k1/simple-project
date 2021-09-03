// main slide
const ulSlideElement = document.querySelector(".carousel__slide");
console.log(ulSlideElement);
//random samefriend
function randomInt(min = 0, max = 1) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
let dogsName = [
  "Emn sieun depn",
  "cheems phámn quyết",
  "cheems dâmn troi",
  "doge mặt ngu",
  "doge watchdog",
  "dog cáu gắt",
  "cheems tiếmn hoám",
];
// Cần load 10 items từ máy
for (let i = 0; i < 10; i++) {
  //Tao li cho ul
  let cardItem = document.createElement("li");
  cardItem.setAttribute("class", "card-item");
  ulSlideElement.appendChild(cardItem);
  //Tao cardItem__content container nam trong cardItem
  let cardItem__content = document.createElement("div");
  cardItem__content.setAttribute("class", "card-item__content");
  cardItem.appendChild(cardItem__content);
  //Tao button remove nam trong cardItem__content
  let remove_card = document.createElement("div");
  remove_card.setAttribute("class", "remove-card");
  cardItem__content.appendChild(remove_card);
  //Tao remove-icon nam trong remove_card
  let remove_icon = document.createElement("img");
  remove_icon.setAttribute("class", "remove-icon");
  remove_icon.setAttribute("src", "./assets/img/211652_close_icon.svg");
  remove_icon.setAttribute("alt", "close");
  remove_card.appendChild(remove_icon);
  //Tao ci-content__img trong cardItem__content
  let ci_content__img = document.createElement("img");
  ci_content__img.setAttribute("class", "ci-content__img");
  ci_content__img.setAttribute("alt", "img");
  if (i < 7) {
    ci_content__img.setAttribute("src", `./assets/img/doge (${i + 1}).jpg`);
  } else if (i == 7) {
    ci_content__img.setAttribute("src", `./assets/img/doge (1).png`);
  } else if (i > 7) {
    ci_content__img.setAttribute("src", `./assets/img/cat (${i - 7}).jpg`);
  }
  cardItem__content.appendChild(ci_content__img);
  //Tao Ten
  let name = document.createElement("p");
  name.setAttribute("class", "offset-item-card card-item_name");
  if (i < 7) name.innerHTML = dogsName[i];
  else if (i == 7) name.innerHTML = "Cheems trua te^";
  else if (i > 7) name.innerHTML = "Neko-kun";
  cardItem__content.appendChild(name);
  //Tao same friend
  let sameFriend = document.createElement("div");
  sameFriend.setAttribute("class", "same-friends-row offset-item-card");
  let imgFsameFriend = document.createElement("img");
  let imgSsameFriend = document.createElement("img");
  imgFsameFriend.setAttribute("class", "same-friends--first same-friends");
  imgSsameFriend.setAttribute("class", "same-friends same-friends--second");
  imgFsameFriend.setAttribute(
    "src",
    `./assets/img/doge (${randomInt(1, 6)}).jpg`
  );
  imgSsameFriend.setAttribute(
    "src",
    `./assets/img/cat (${randomInt(1, 2)}).jpg`
  );
  sameFriend.appendChild(imgFsameFriend);
  sameFriend.appendChild(imgSsameFriend);
  //dem ban chung
  let countFriend = document.createElement("span");
  countFriend.setAttribute("class", "same-friends-count");
  let randomSameFriends = randomInt(1, 3);
  countFriend.innerHTML = `${randomSameFriends} bạn chung`;
  sameFriend.appendChild(countFriend);
  cardItem__content.appendChild(sameFriend);
  //button them ban
  let addFriendBtn = document.createElement("button");
  addFriendBtn.setAttribute("class", "add-friend-button");
  addFriendBtn.innerHTML += '<i class="fas fa-user-plus"></i>';
  addFriendBtn.innerHTML +=
    '<span class="add-friend-title"> Thêm bạn bè</span>';
  cardItem__content.appendChild(addFriendBtn);
  let sameFriendtooltip = document.createElement("div");
  sameFriendtooltip.setAttribute("class", "same-friend-tooltip");
  for (let i = 0; i < randomSameFriends; i++) {
    if (i % 2 == 0) sameFriendtooltip.innerHTML += "<p>Gâu Gâu</p>";
    else sameFriendtooltip.innerHTML += "<p>Meow Meow</p>";
  }
  sameFriend.appendChild(sameFriendtooltip);
}
