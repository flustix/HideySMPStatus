var side = 1;
var i = 0;

function loadList() {
    fetch(
        "https://api.samifying.com/v2/status"
    ).then(
        rsp => rsp.json()
    ).then(
        data => {
            var players = data.players;
            document.getElementById('online').innerText = players.online;
            document.getElementById('max').innerText = players.max;
            document.getElementById('version').innerText = data.version;

            var playerList = players.list;

            playerList.forEach(player => {
                fetch(
                    "https://link.samifying.com/api/user/" + player.id.replaceAll('-', '')
                ).then(
                    rsp => rsp.json()
                ).then(
                    discordInfo => {
                        i++;

                        addPlayer(player, discordInfo);

                        side++;

                        if (side == 3) {
                            side = 1;
                        }
                    }
                );
            });
            
            getTime(data.world.time);
        }
    );
}

function addPlayer(player, discordInfo) {
    var list = document.getElementById('player-list' + side);

    var li = document.createElement('li');
    li.id = "player" + i;

    var box = document.createElement('div');
    box.className = "playerBox";

    var iconbox = document.createElement('div');
    iconbox.className = "playerIconBox";

    var mcimg = document.createElement("img");
    mcimg.src = "https://visage.surgeplay.com/face/512/" + player.id;
    mcimg.className = "playerIcon";
    iconbox.appendChild(mcimg);
    box.appendChild(iconbox);

    var dcimg = document.createElement("img");
    dcimg.src = discordInfo.avatar;
    dcimg.className = "playerIcon playerIconDiscord";
    iconbox.appendChild(dcimg);
    box.appendChild(iconbox);

    var name = document.createElement('p');
    name.innerHTML = player.name + " / " + discordInfo.name;
    box.appendChild(name);

    var uuid = document.createElement('p');
    uuid.innerHTML = player.id;
    box.appendChild(uuid);

    li.appendChild(box);
    list.appendChild(li);
}

function getTime (time) {
    if (time >= 13000) {
        document.getElementById("timeimg").src = "assets/img/times/night.png";
    } else {
        document.getElementById("timeimg").src = "assets/img/times/day.png";
    }

    document.getElementById("time").innerHTML = formatTime(time);
}

function formatTime (time) {
    var actualMinutes = parseInt((time + 6000) / 16.666);
    var minutes = parseInt(actualMinutes % 60);
    var hours = parseInt(actualMinutes / 60);

    if (hours > 23) {
        hours -= 24;
    }

    var timeString = "";

    if (hours < 10) {
        timeString += "0";
    }
    timeString += hours;

    timeString += ":";

    if (minutes < 10) {
        timeString += "0";
    }
    timeString += minutes;

    return timeString;
}