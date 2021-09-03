// event for hide all frame
const hideAll = document.querySelector("#hide-all");
hideAll.addEventListener("click", function () {
  const mainFrame = document.querySelector(".carousel");
  mainFrame.remove();
});
// ---------------------------

// event for button option
const btnOption = document.querySelector(".btn-option");
const dropdown = document.querySelector(".dropdown-option");
dropdown.remove();
btnOption.addEventListener("click", function () {
  if (btnOption.querySelector(".dropdown-option") != null) {
    dropdown.remove();
  } else {
    btnOption.appendChild(dropdown);
  }
});
//event for remove card
let btnsRemove = document.querySelectorAll(".remove-card");
// console.log(Array.from(btnsRemove));
let countCards = btnsRemove.length;
for (let i = 0; i < btnsRemove.length; i++) {
  btnsRemove[i].onclick = function () {
    const cardItem = btnsRemove[i].closest(".card-item");
    countCards--;
    cardItem.remove();
    if (countCards == 0) {
      const mainFrame = document.querySelector(".carousel");
      mainFrame.remove();
    }
  };
}
// ---------------------------
// handle event control navigation
let nexBtn = document.querySelector(".next-icon");
let prevBtn = document.querySelector(".previous-icon");
let list = document.querySelector(".carousel__slide");
let listElems = document.querySelectorAll(".card-item");
//Chiều dài mỗi elem.
let width = 155;
//Số elem hiển thị trên container
let count = 5;
//Vị trí khi scroll
let position = 0;
//Khi click previous:
//position += chiều dài elem x số lượng
//Khi click previous:
//position -= chiều dài elem x số lượng
prevBtn.onclick = function () {
  position += width * count;
  //Khi chạm tới đầu, reset về 0
  position = Math.min(position, 0);
  if (position === 0)
    setTimeout(function () {
      prevBtn.style.display = "none";
    }, 1000);
  //margin-left của ul tăng lên
  //<=> "khung nhìn" lùi ra trước
  list.style.marginLeft = position + "px";
};
nexBtn.onclick = function () {
  position -= width * count;
  //Khi chạm về điểm cuối
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + "px";
  prevBtn.style.display = "inline-block";
};
//handle event for add friend button
const addFriendbtns = document.querySelectorAll(".add-friend-button");
addFriendbtns.forEach(function (btn) {
  btn.onclick = function () {
    alert("Bạn không có cửa đâu, hihi");
  };
});
