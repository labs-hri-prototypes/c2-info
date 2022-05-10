
window.onload = function(){
  mainFunction();
}

function mainFunction() {
  console.log('window loaded');
  setInterval(function(){
    updateTime();
  }, 1000);
}

function updateTime() {
  let current = new Date();
  let startString;
  let endString;
  let endMinute;
  if(current.getMinutes() < 30) {
    startString = `${Math.floor(current.getHours()/10)}${current.getHours()%10}:00`;
    endString = `${Math.floor(current.getHours()/10)}${current.getHours()%10}:30`;
    endMinute = 30;
  }
  else {
    let hour = (current.getHours() + 1) % 24;
    startString = `${Math.floor(current.getHours()/10)}${current.getHours()%10}:30`;
    endString = `${Math.floor(hour/10)}${hour%10}:00`;
    endMinute = 60;
  }

  let minuteTillEnd = endMinute - current.getMinutes();
    ;
  let minuteText = `종료 시간까지 ${minuteTillEnd}분 남았습니다.`;

  document.querySelector("#time_current").innerText =
    `현재 시간 - ${stringifyTime(current)}:${Math.floor(current.getSeconds()/10)}${current.getSeconds()%10}`;
  document.querySelector('#time_started').innerText =
    `시작 시간 - ${startString}`;
  document.querySelector('#time_end').innerText =
    `종료 시간 - ${endString}`;
  document.querySelector("#minute_alert").innerText = minuteText;
  document.querySelector("#minute_warning").innerText = minuteText;

  let sectionDefault = document.querySelector("#section_default");
  let sectionAlert = document.querySelector("#section_alert");
  let sectionWarning = document.querySelector("#section_warning");

  if(minuteTillEnd <= 3) {
    sectionDefault.classList.add("hidden");
    sectionAlert.classList.add("hidden");
    sectionWarning.classList.remove("hidden");
  }
  else if( minuteTillEnd <= 10) {
    sectionDefault.classList.add("hidden");
    sectionAlert.classList.remove("hidden");
    sectionWarning.classList.add("hidden");
  }
  else {
    sectionDefault.classList.remove("hidden");
    sectionAlert.classList.add("hidden");
    sectionWarning.classList.add("hidden");
  }
}

function stringifyTime(input) {
  const time = `${Math.floor(input.getHours()/10)}${
      input.getHours()%10
    }:${Math.floor(input.getMinutes()/10)}${
      input.getMinutes()%10
    }`;
  return time;
}
