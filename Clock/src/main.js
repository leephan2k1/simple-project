const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let stopwatch_interval;

//Vong tron chay ben ngoai
//Global scope
const circle = $(".progress-time");
const timeText = $(".time-text");
const handHour = $(".hand-hour");
const handMinute = $(".hand-minute");

// const handSecond = $(".hand-second");
//Object luu lai bien thoi gian de resume stopwatch, timer
let objTime = {
  hour: 0,
  minute: 0,
  second: 0,
  runner: 0,
};

const circumference = circle.getTotalLength();
let date = new Date();
let run_time_hour, run_time_minute;
let hourText, minuteText, secondText;
// let run_time_second = date.getSeconds() * 6;
let run_time_circle;
let countDown_interval;
let interval_Time;

function validNumber(number) {
  if (number % 1 !== 0) return false;
  if (number < 0) return false;
  if (number > 99) return false;
  return true;
}
// id: 0 <> hour, 1 <> != hour
// id: 2 <> timer
function handleTimeText(number, id) {
  switch (id) {
    case 0:
      if (number > 12) number -= 12;
      break;
    case 1:
      if (number > 60) number = 1;
      break;
  }
  return number <= 9 ? "0" + number : number;
}
function stopWatch(objSaveTime) {
  secondText = objSaveTime.second;
  minuteText = objSaveTime.minute;
  hourText = objSaveTime.hour;
  let runner = objSaveTime.runner;
  stopwatch_interval = setInterval(function () {
    //Setup
    runner++;
    secondText++;
    minuteText = Math.floor(runner / 60);
    hourText = Math.floor(runner / 3600);

    //fix text:
    secondText = handleTimeText(secondText, 1);
    minuteText = handleTimeText(minuteText, 1);
    hourText = handleTimeText(hourText, 2);

    //reder text
    timeText.innerHTML = hourText + " : " + minuteText + " : " + secondText;

    //Setup deg
    let percentHour = Math.floor(+minuteText / 12) * 6;
    if (percentHour === 30) {
      run_time_hour = +hourText * 30;
    } else {
      run_time_hour = +hourText * 30 + percentHour;
    }

    run_time_minute = minuteText * 6;
    run_time_circle = 600 - secondText * 10;

    //Save:
    objSaveTime.hour = hourText;
    objSaveTime.minute = minuteText;
    objSaveTime.second = secondText;
    objSaveTime.runner = runner;

    //render graphic
    //Gio
    if (run_time_hour === 360) {
      handHour.style.transition = "none";
    } else {
      handHour.style.transition = "all 1s";
    }
    //Phut
    if (run_time_minute === "01") {
      handMinute.style.transition = "none";
    } else {
      handMinute.style.transition = "all 1s";
    }
    //giay
    if (run_time_circle === 590) {
      circle.style.transition = "none";
    } else {
      circle.style.transition = "stroke-dashoffset 1s";
    }
    circle.style.strokeDashoffset = `${run_time_circle}`;
    handHour.style.transform = `rotate(${run_time_hour}deg)`;
    handMinute.style.transform = `rotate(${run_time_minute}deg)`;
  }, 1000);
}
let resumTimer;
let stateCircle;
let resultTimer = [];
function timer(resumTimer, timeArr, stateCircle) {
  timeArr = resumTimer.timeArr;
  //Handle count down
  //Borrow stopwatch button :>

  $(".play").style.display = "none";
  let sumCountDown = +timeArr[2] + +timeArr[1] * 60 + +timeArr[0] * 3600;

  //setup
  run_time_circle = 0;
  if (stateCircle.state) {
    run_time_circle = stateCircle.state;
  }
  let percent;
  if (stateCircle.percent) {
    percent = stateCircle.percent;
  } else {
    percent = 600 / sumCountDown;
    stateCircle.percent = percent;
  }
  countDown_interval = setInterval(function () {
    //render text
    timeArr[0] = handleTimeText(timeArr[0], 2);
    timeArr[1] = handleTimeText(timeArr[1], 2);
    timeArr[2] = handleTimeText(timeArr[2], 2);
    timeText.innerHTML = timeArr[0] + " : " + timeArr[1] + ": " + timeArr[2];
    //convert to number
    timeArr[0] = +timeArr[0];
    timeArr[1] = +timeArr[1];
    timeArr[2] = +timeArr[2];

    timeArr[2]--;
    if (timeArr[2] < 0 && sumCountDown != 0) {
      timeArr[2] = 59;
      timeArr[1]--;
    }
    if (timeArr[1] < 0 && sumCountDown != 0) {
      timeArr[1] = 59;
      timeArr[0]--;
    }
    //Save time for resume/pause
    resumTimer.timeArr = timeArr;
    circle.style.strokeDashoffset = `${run_time_circle}`;
    circle.style.transition = "all 1s";
    if (run_time_circle < 600) run_time_circle += percent;
    stateCircle.state = run_time_circle;
    //step
    // console.log(timeArr);
    if (sumCountDown === 0) {
      clearInterval(countDown_interval);
      //delay 1s
      setTimeout(
        () =>
          alert(
            `Timer ${
              resultTimer[0] +
              "h " +
              resultTimer[1] +
              "m " +
              resultTimer[2] +
              "s"
            } complete!`
          ),
        1000
      );
      handleInput();
      //update 6.15pm
      btnStHandle.style.display = "none";
      btnStReset.style.display = "none";
    }
    sumCountDown--;
  }, 1000);
}
function resetTime(...elements) {
  elements.forEach((element) => {
    switch (element) {
      case $(".progress-time"):
        element.style.strokeDashoffset = `600`;
        break;
      case $(".time-text"):
        element.innerHTML = "00 : 00 : 00";
        break;
      case $(".hand-hour"):
      case $(".hand-minute"):
        element.style.transform = `rotate(0deg)`;
        break;
    }
  });
}
function callTime() {
  interval_Time = setInterval(function () {
    date = new Date();
    run_time_minute = date.getMinutes() * 6;
    let hour = date.getHours();
    let halfDay = "AM";
    //Xu li gio 24h -> AM PM
    if (hour > 11 && date.getMinutes() > 0) {
      hour = date.getHours() - 12;
      halfDay = "PM";
    } else {
      halfDay = "AM";
    }
    let percentHour = Math.floor(date.getMinutes() / 12) * 6;
    if (percentHour === 30) {
      run_time_hour = hour * 30;
    } else {
      run_time_hour = hour * 30 + percentHour;
    }
    run_time_circle = 600 - date.getSeconds() * 10;

    hourText = handleTimeText(date.getHours(), 0);
    minuteText = handleTimeText(date.getMinutes(), 1);
    secondText = handleTimeText(date.getSeconds(), 2);

    //render text
    timeText.innerHTML =
      hourText + " : " + minuteText + " : " + secondText + " " + halfDay;
    //Gio
    if (run_time_hour === 360) {
      handHour.style.transition = "none";
    } else {
      handHour.style.transition = "all 1s";
    }
    //Phut
    if (run_time_minute === 360) {
      handMinute.style.transition = "none";
    } else {
      handMinute.style.transition = "all 1s";
    }
    //Giay
    // if (run_time_second === 360) {
    //   handSecond.style.transition = "none";
    //   run_time_second = 1;
    // } else {
    //   handSecond.style.transition = "all 1s";
    //   run_time_second += 6;
    // }
    //Vong tron
    if (run_time_circle === 600) {
      circle.style.transition = "none";
    } else {
      circle.style.transition = "stroke-dashoffset 1s";
    }

    //Test kim giay va vong tron
    // console.log(date.getSeconds() + " " + run_time_circle);

    //Set goc cho kim dong ho
    circle.style.strokeDashoffset = `${run_time_circle}`;
    handHour.style.transform = `rotate(${run_time_hour}deg)`;
    handMinute.style.transform = `rotate(${run_time_minute}deg)`;

    //Test kim giay
    // handSecond.style.transform = `rotate(${run_time_second}deg)`;
  }, 1000);
}
const btnStopwatch = $(".stopwatch-function");
const btnTimer = $(".timer-function");
const btnBack = $(".back");
const wrapperFn = $(".wrapper-function");
const btnStHandle = $(".stopwatch-handle");
const btnStReset = $(".stopwatch-reset");

//hande stopwatch:
btnStopwatch.onclick = function () {
  resetTime(circle, timeText, handHour, handMinute);
  clearInterval(interval_Time);
  btnTimer.remove();
  btnStopwatch.remove();
  btnBack.style.display = "flex";
  btnStHandle.style.display = "flex";
  btnStReset.style.display = "flex";
  const toggle = btnStHandle.querySelector(".fas");
  toggle.classList.add("fa-play");

  //handle play:
  let play = false;
  btnStHandle.onclick = function () {
    // console.log("stopwatch test");
    if (!play) play = true;
    else play = false;

    // toggle.classList.remove("fa-play");
    // console.log(toggle);
    if (play) {
      toggle.classList.remove("fa-play");
      toggle.classList.add("fa-pause");
      stopWatch(objTime);
    } else {
      toggle.classList.toggle("fa-pause");
      toggle.classList.toggle("fa-play");
      clearInterval(stopwatch_interval);
    }
  };
  //Handle reset stopwatch
  btnStReset.onclick = function () {
    objTime.hour = objTime.minute = objTime.second = objTime.runner = 0;
    resetTime(circle, timeText, handHour, handMinute);
    clearInterval(stopwatch_interval);
    play = false;
    const toggle = btnStHandle.querySelector(".fas");
    console.log(toggle);
    if (!toggle.classList.contains("fa-play")) {
      toggle.classList.add("fa-play");
    }
    if (toggle.classList.contains("fa-pause")) {
      toggle.classList.remove("fa-pause");
    }
    // toggle.classList.toggle("fa-pause");
  };
};

//handle back to main
function backToMain() {
  if (countDown_interval) {
    // console.log("test clear timer interval");
    clearInterval(countDown_interval);
  }
  if (stopwatch_interval) clearInterval(stopwatch_interval);
  const inputElements = $$(".wrapper-input");
  btnStopwatch.remove();
  wrapperFn.appendChild(btnStopwatch);
  wrapperFn.appendChild(btnTimer);
  btnBack.style.display = "none";
  btnStHandle.style.display = "none";
  btnStReset.style.display = "none";
  const toggle = btnStHandle.querySelector(".fas");
  toggle.classList.remove("fa-pause");
  $(".play").style.display = "none";
  inputElements.forEach((elem) => {
    elem.style.display = "none";
  });
  callTime();
}
btnBack.onclick = function () {
  backToMain();
};

//Handle Timer
const inputElements = $$(".wrapper-input");
const plusBtns = $$(".plus");
const minusBtns = $$(".minus");
const btnPlay = $(".play");
function handleInput() {
  resetTime(circle, timeText, handHour, handMinute);
  clearInterval(interval_Time);
  forTimer = true;
  btnTimer.remove();
  btnStopwatch.remove();
  btnBack.style.display = "flex";
  btnPlay.style.display = "block";
  inputElements.forEach((elem) => {
    elem.style.display = "flex";
  });
  plusBtns.forEach((btn) => {
    btn.onmousedown = function () {
      const parent = btn.closest(".wrapper-input");
      const input = parent.querySelector(".inputTime");
      input.value = +input.value;
      if (input.value < 100) input.value++;
    };
  });
  minusBtns.forEach((btn) => {
    btn.onmousedown = function () {
      const parent = btn.closest(".wrapper-input");
      const input = parent.querySelector(".inputTime");
      input.value = +input.value;
      if (input.value > 0) input.value--;
    };
  });
}
btnTimer.onclick = function () {
  handleInput();
  // btnStHandle.style.display = "flex";
  // btnStReset.style.display = "flex";
  let timeArr = [];
  let isValid;

  btnPlay.onclick = function () {
    //i think this block code not yet optimize, but it's working :D @auth: LEE
    const ipHour = $("#ipHour");
    const ipMinute = $("#ipMinute");
    const ipSecond = $("#ipSecond");
    timeArr[0] = ipHour.value;
    timeArr[1] = ipMinute.value;
    timeArr[2] = ipSecond.value;
    for (let i = 0; i < timeArr.length; i++) {
      isValid = true;
      if (!validNumber(timeArr[i])) {
        alert("Valid input integers in the range: 0 to 99");
        isValid = false;
        break;
      }
    }
    if (+timeArr[0] === 0 && +timeArr[1] === 0 && +timeArr[2] === 0) {
      alert("At least 1 second!");
      isValid = false;
    }
    // console.log(isValid);
    if (isValid) {
      //update 6.28pm 10/9/2021
      btnStHandle.style.display = "flex";
      btnStReset.style.display = "flex";
      // console.log(isValid);
      inputElements.forEach((elem) => {
        elem.style.display = "none";
      });
      //convert to number
      timeArr[0] = +timeArr[0];
      timeArr[1] = +timeArr[1];
      timeArr[2] = +timeArr[2];
      //optimize time number
      timeArr[1] += Math.floor(+timeArr[2] / 60);
      timeArr[0] += Math.floor(+timeArr[1] / 60);
      if (timeArr[1] > 60) timeArr[1] -= 60;
      if (timeArr[2] > 60) timeArr[2] -= 60;
      resultTimer = [...timeArr];
      resumTimer = { timeArr: timeArr };
      stateCircle = { state: 0, percent: 0 };
      timer(resumTimer, timeArr, stateCircle);
    }
    //handle play:
    let play = true;
    const toggle = btnStHandle.querySelector(".fas");
    toggle.classList.remove("fa-play");
    toggle.classList.add("fa-pause");
    //Play/pause
    btnStHandle.onclick = function () {
      // console.log("timer test");
      if (play) play = false;
      else play = true;
      toggle.classList.toggle("fa-play");
      toggle.classList.toggle("fa-pause");
      if (!play) {
        clearInterval(countDown_interval);
      } else {
        timer(resumTimer, timeArr, stateCircle);
      }
    };
    //Reset
    btnStReset.onclick = function () {
      const toggle = btnStHandle.querySelector(".fas");
      toggle.classList.remove("fa-pause");
      toggle.classList.add("fa-play");
      toggle.classList.toggle("fa-play");
      toggle.classList.toggle("fa-pause");
      const temp = [...resultTimer];
      play = true;
      clearInterval(countDown_interval);
      timer({ timeArr: temp }, temp, { state: 0, percent: 0 });
    };
  };
};
callTime();
