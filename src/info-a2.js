setInterval(function(){
  updateTime();
}, 1000);

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
