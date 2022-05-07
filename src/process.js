const a2_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxH6TjeDZa9kL_qmmKQdNtyZLfdVgT3qe2WHSTZ4mXA1vn9rsMOPovZpB2x6LGcXSf48ukdfiSArNb/pub?gid=774741116&single=true&output=csv";
const a3_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxH6TjeDZa9kL_qmmKQdNtyZLfdVgT3qe2WHSTZ4mXA1vn9rsMOPovZpB2x6LGcXSf48ukdfiSArNb/pub?gid=1707891176&single=true&output=csv";
const no_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxH6TjeDZa9kL_qmmKQdNtyZLfdVgT3qe2WHSTZ4mXA1vn9rsMOPovZpB2x6LGcXSf48ukdfiSArNb/pub?gid=1180224127&single=true&output=csv";
const URLSearch = new URLSearchParams(location.search);

const place = searchParam('place');
const csv_url = (place == 'a2') ? a2_url : (place == 'a3') ? a3_url : no_url;
/* DEBUG */ console.log(`import csv from url: ${csv_url}`);

let csv_data;

window.onload = function(){
  const v = fetch(csv_url)
    .then(v => v.text())
    .then(v => csvToJSON(v))
    .then(() => mainFunction())
    .catch(err => console.log(err));
}

function mainFunction() {
  console.log('window loaded');
  setInterval(function(){
    updateTime();
  }, 1000);
}

function updateTime() {
  let current = new Date();
  let timeObject = findTimeSlot(current);
  console.log(current);
  console.log(timeObject);
  let minuteTillEnd =
    Math.floor(timeObject.end.getTime()/60000) -
    Math.floor(current.getTime()/60000);
  let minuteText = `종료 시간까지 ${minuteTillEnd}분 남았습니다.`;

  document.querySelector("#time_current").innerText =
    `현재 시간 - ${stringifyTime(current)}:${Math.floor(current.getSeconds()/10)}${current.getSeconds()%10}`;
  document.querySelector('#time_started').innerText =
    `시작 시간 - ${stringifyTime(timeObject.start)}`;
  document.querySelector('#time_end').innerText =
    `종료 시간 - ${stringifyTime(timeObject.end)}`;
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

function findTimeSlot(inputTime){
  let currentTime = stringifyTime(inputTime);
  let currentDate = stringifyDate(inputTime);
  let name, start, end;
  csv_data.forEach(slot => {
    let startTime = new Date(`${slot.date} ${slot.startTime}`);
    let endTime = new Date(`${slot.date} ${slot.endTime}`);
    let cTime = new Date(`${currentDate} ${currentTime}`);
    if(slot.date == currentDate && startTime <= cTime && endTime > cTime ) {
      name = slot.nameParsed;
      start = startTime;
      end = endTime;
    }
  });
  let output = {
    name: name,
    start: start,
    end: end
  }
  return output;
}

function csvToJSON(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers;
  headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
      var obj = {};

      if(lines[i] == undefined || lines[i].trim() == "") {
          continue;
      }

      var words = lines[i].split(",");
      for(var j = 0; j < words.length; j++) {
          obj[headers[j].trim()] = words[j];
      }

      result.push(obj);
  }
  /* DEBUG */ console.log(result);
  csv_data = result;
}

function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
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
