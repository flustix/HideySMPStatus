var side = 1;
var i = 0;

function loadList() {
    fetch(
        "https://api.samifying.com/v2/status"
    ).then(
        rsp => rsp.json()
    ).then(
        data => {
            loadStuff(data);
        }
    ).catch(
        loadError()
    );
}

function loadStuff(data) {
    document.getElementById("noplayers").innerHTML = "";
    document.getElementById("noplayerssub").innerHTML = "";

    var players = data.players;
    document.getElementById('online').innerText = players.online;
    document.getElementById('max').innerText = players.max;
    document.getElementById('version').innerText = data.version;

    var playerList = players.list;

    if (playerList.length == 0) {
        document.getElementById("noplayers").innerHTML = "No players online :(";
        document.getElementById("noplayerssub").innerHTML = "Check back later";
    } else {
        loadPlayers(playerList);
        getTime(data.world.time);
    }
}

function loadPlayers (playerList) {
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

function loadError() {
    document.getElementById("noplayers").innerHTML = "Internal Error";
    document.getElementById("noplayerssub").innerHTML = "Please Report this issue on the <a href='google.com' class='linkHighlight'>github</a>!";
}