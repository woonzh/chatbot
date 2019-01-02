var botTemplate = document.getElementById('bot_template');
var humanTemplate = document.getElementById('human_template');
var body=document.getElementById("body");
var textArea=document.getElementById("msg");
textArea.addEventListener("keyup", function(event){
    if (event.key=="Enter"){
        msgReceived();
    }
});

function cloneTemplate(template){
    var clone=template.cloneNode(true);
    return clone;
}

function textProcessing(txt){
    var newTxt=txt.replace(/\\r\\n/g, "<br>");
    var newTxt=newTxt.replace(/\\u2019/g, "'");
    var newTxt=newTxt.replace('"', "");
    return newTxt
}

function cloneBotMsg(txt){
    var clone=cloneTemplate(botTemplate);
    var msgFrame = clone.getElementsByClassName("msg_cotainer")[0];
    msgFrame.id="active";
    msgFrame.innerHTML = textProcessing(txt);
    body.appendChild(clone);
    body.scrollTop = body.scrollHeight;
}

function cloneHumanMsg(txt){
    var clone=cloneTemplate(humanTemplate);
    var msgFrame = clone.getElementsByClassName("msg_cotainer_send")[0];
    msgFrame.innerHTML = textProcessing(txt);
    body.appendChild(clone);
    body.scrollTop = body.scrollHeight;
}

function getResponse(msg){
    url="http://localhost:5000/query";
    $.ajax({
        url: url,
        data:{
            query:msg
        },
        type: 'GET',
        success: function (data) {
            var msgFrame=document.getElementById("active");
            msgFrame.innerHTML = textProcessing(data);
            msgFrame.id="";
            textArea.value="";
            textArea.disabled=false;
            body.scrollTop = body.scrollHeight;
        },
        error: function(jqxhr, status, exception) {
            alert('Exception:', exception);
            textArea.disabled=false;
        }
    });
}

function msgReceived(){
    msg=textArea.value
    cloneHumanMsg(msg);
    setTimeout(function(){cloneBotMsg('....')},300);
    textArea.disabled=true;
    textArea.value="";
    getResponse(msg);
}