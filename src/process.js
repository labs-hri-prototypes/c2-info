const timetable_a2_link = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxH6TjeDZa9kL_qmmKQdNtyZLfdVgT3qe2WHSTZ4mXA1vn9rsMOPovZpB2x6LGcXSf48ukdfiSArNb/pub?gid=774741116&single=true&output=csv";
const data_a2 = fetch(timetable_a2_link)
  .then(data_a2 => data_a2.text())
  .catch(err => console.log(err));
data_a2.then(v => csvToJSON(v));
window.onload = function(){
  setInterval(function(){
    updateTime();
  }, 1000);
}

function updateTime() {
  let currentTime = new Date().toLocaleTimeString();
  /*
  let currentTime = new Date().toLocaleTimeString('en-US', { hour12: true,
                                               hour: "numeric",
                                               minute: "numeric"});
  */
  let currentTimeText = document.querySelector("#time_current");
  currentTimeText.innerText =`현재 시각 - ${currentTime}`;
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
  console.log(result);
}
