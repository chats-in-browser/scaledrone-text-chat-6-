//In CSS, change the color in the last lines to change text color.
//in CSS, change size:medium|xx-small|x-small|small|large|x-large|xx-large|smaller|larger|length|initial|inherit;
//Grzegorz Brzęczyszczykiewicz

/*var id = prompt("");*//*HbdbzAINeNp3Eh8f*/
var drone = new ScaleDrone(prompt("Enter, please, id-chat"));

drone.on('open', function (error) {
  if (error) return console.error(error);

  var room = drone.subscribe('general-chat');

  room.on('open', function (error) {
    if (error) return console.error(error);
    console.log('Connected to room');
  });

  room.on('data', addMessageToScreen);
});

function onSubmitForm(event) {
  var nameEl = document.querySelector('.input.name')
    , contentEl = document.querySelector('.input.content');

  if (nameEl.value && contentEl.value) {
    sendMessageToScaleDrone(nameEl.value, contentEl.value);
    contentEl.value = '';
  }
}

function sendMessageToScaleDrone(name, content) {
  drone.publish({
    room: 'general-chat',
    message: {
      name: name,
      content: content
    }
  });
}

function addMessageToScreen(message) {
  var div = document.createElement('div');
  div.innerHTML = '<b>' + message.name + '</b>: ' + message.content;
  div.classList.add('message');
  document.querySelector('.text-area').appendChild(div);
}