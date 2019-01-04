let botTemplate = document.getElementById("bot_template");
let humanTemplate = document.getElementById("human_template");
let body = document.getElementById("body");
let textArea = document.getElementById("msg");
let microphone = document.getElementById("mic");

window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

let avatar = document.getElementById("avatar");
let timer = -10000;
let interval = 200;
let threshold = 800;
let mode = "text";

$("document").ready(() => {
  textArea.addEventListener("keyup", event => {
    if (event.key == "Enter") {
      msgReceived();
    }
  });

  setInterval(() => {
    timerChecker();
  }, interval);
});

const timerChecker = () => {
  if (mode == "voice") {
    if (timer > 0) {
      timer -= interval;
    } else {
      if (textArea.value !== "") {
        console.log("about to call message Received");
        let msg = textArea.value;
        micClicked();
        voiceReceived(msg);
      }
    }
  }
};

const timeInstantiate = () => {
  timer = threshold;
};

const toggleOnClick = () => {
  if (avatar.style.display == "none") {
    avatar.style.display = "block";
  } else {
    avatar.style.display = "none";
  }
};

recognition.onresult = event => {
  textArea.value = event.results[0][0].transcript;
  timeInstantiate();
};

const micClicked = () => {
  if (microphone.name == "inactive") {
    microphone.name = "active";
    microphone.src = "/static/images/microphone-active.png";
    recognition.start();
    mode = "voice";
  } else {
    microphone.name = "inactive";
    microphone.src = "/static/images/microphone-inactive.png";
    recognition.stop();
    mode = "text";
  }
};

const passMsgToHead = msg => {
  javascript: sayText(msg, 3, 1, 3);
};

const cloneTemplate = template => {
  let clone = template.cloneNode(true);
  return clone;
};

const textProcessing = txt => {
  let newTxt = txt.replace(/\\r\\n/g, "<br>");
  newTxt = newTxt.replace(/\\u2019/g, "'");
  newTxt = newTxt.replace('"', "");
  return newTxt;
};

const botTextProcessing = txt => {
  let newTxt = txt.replace(/\\r\\n/g, " ");
  newTxt = newTxt.replace(/\\u2019/g, " ");
  newTxt = newTxt.replace('"', "");
  newTxt = newTxt.replace('"', "");
  return newTxt;
};

const cloneBotMsg = txt => {
  let clone = cloneTemplate(botTemplate);
  let msgFrame = clone.getElementsByClassName("msg_cotainer")[0];
  msgFrame.id = "active";
  msgFrame.innerHTML = textProcessing(txt);
  body.appendChild(clone);
  body.scrollTop = body.scrollHeight;
};

const cloneHumanMsg = txt => {
  let clone = cloneTemplate(humanTemplate);
  let msgFrame = clone.getElementsByClassName("msg_cotainer_send")[0];
  msgFrame.innerHTML = textProcessing(txt);
  body.appendChild(clone);
  body.scrollTop = body.scrollHeight;
};

const getResponse = (msg, voice = false) => {
  url = "http://localhost:5000/query";
  $.ajax({
    url: url,
    data: {
      query: msg
    },
    type: "GET",
    success: data => {
      let msgFrame = document.getElementById("active");
      msgFrame.innerHTML = textProcessing(data);
      msgFrame.id = "";
      textArea.value = "";
      textArea.disabled = false;
      body.scrollTop = body.scrollHeight;
      textArea.focus();
      if (avatar.style.display === "block") {
        passMsgToHead(botTextProcessing(data));
      }
      if (voice) {
        micClicked();
      }
    },
    error: (jqxhr, status, exception) => {
      alert("Exception:", exception);
      textArea.disabled = false;
      if (voice) {
        micClicked();
      }
    }
  });
};

const voiceReceived = msg => {
  textArea.value = "";
  cloneHumanMsg(msg);
  setTimeout(() => {
    cloneBotMsg("....");
  }, 200);
  textArea.disabled = true;
  getResponse(msg, true);
};

const msgReceived = () => {
  msg = textArea.value;
  textArea.value = "";
  cloneHumanMsg(msg);
  setTimeout(() => {
    cloneBotMsg("....");
  }, 200);
  textArea.disabled = true;
  getResponse(msg);
};
