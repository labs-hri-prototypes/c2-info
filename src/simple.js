const URLSearch = new URLSearchParams(location.search);
const place = searchParam('place');
const exception = [
  {
    place: 'a2',
    date: '2022-05-11',
    start: '16:00',
    end: '17:00'
  },
  {
    place: 'a2',
    date: '2022-05-16',
    start: '15:00',
    end: '16:00'
  },
  {
    place: 'a2',
    date: '2022-05-16',
    start: '17:00',
    end: '18:00'
  },
  {
    place: 'a2',
    date: '2022-05-19',
    start: '16:00',
    end: '17:00'
  },
  {
    place: 'a3',
    date: '2022-05-11',
    start: '17:00',
    end: '18:00'
  }
];


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
  let dateString = stringifyDate(current);
  let startString;
  let endString;
  let endTime;

  // set default time data
  if(current.getMinutes() < 30) {
    startString = `${Math.floor(current.getHours()/10)}${current.getHours()%10}:00`;
    endString = `${Math.floor(current.getHours()/10)}${current.getHours()%10}:30`;
    endTime = new Date(`${dateString} ${endString}`);
  }
  else {
    let hour = (current.getHours() + 1) % 24;
    startString = `${Math.floor(current.getHours()/10)}${current.getHours()%10}:30`;
    endString = `${Math.floor(hour/10)}${hour%10}:00`;
    endTime = new Date(`${dateString} ${endString}`);
  }
  
  exception.forEach(slot => {
    let slotStart = new Date(`${slot.date} ${slot.start}`);
    let slotEnd = new Date(`${slot.date} ${slot.end}`);

    if(
      slot.place = place &&
      current.getTime() >= slotStart.getTime() &&
      current.getTime() < slotEnd.getTime()
    ) {
      console.log("exceptional time");
      startString = slot.start;
      endString = slot.end;
      endTime = new Date(`${dateString} ${slot.end}`);
    }
  });

  let minuteTillEnd =
    Math.floor(endTime.getTime()/60000) -
    Math.floor(current.getTime()/60000);
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

function stringifyDate(input) {
  const date = `${
      input.getFullYear()
    }-${Math.floor((input.getMonth()+1)/10)}${
      (input.getMonth()+1)%10
    }-${Math.floor(input.getDate()/10)}${
      input.getDate()%10}`;
  return date;
}

function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}
