var side = 1;
var i = 0;

function loadList() {
    fetch(
        "https://link.samifying.com/api/status"
    ).then(
        rsp => rsp.json()
    ).then(
        data => {
            var players = data.players;
            document.getElementById('online').innerText = players.online;
            document.getElementById('max').innerText = players.max;
            document.getElementById('version').innerText = data.version.name;


            var playerList = players.sample;

            playerList.forEach(player => {
                fetch(
                    "https://link.samifying.com/api/user/" + player.id.replaceAll('-', '')
                ).then(
                    rsp => rsp.json()
                ).then(
                    discordInfo => {
                        i++;

                        if (player.name == "Anonymous Player") {
                            addPlayerAnonym(player, discordInfo);
                        } else {
                            addPlayer(player, discordInfo);
                        }

                        side++;

                        if (side == 3) {
                            side = 1;
                        }
                    }
                );
            });
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

    box.onclick = function () {
        navigator.clipboard.writeText('@' + discordInfo.name);
        var copy = document.getElementById('copyThing');
        copy.style = "animation: fadeaway 5s linear 2s 1 alternate;";
    };

    li.appendChild(box);
    list.appendChild(li);
}

function addPlayerAnonym(player, discordInfo) {
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

    var name = document.createElement('p');
    name.innerHTML = player.name;
    box.appendChild(name);

    li.appendChild(box);
    list.appendChild(li);
}