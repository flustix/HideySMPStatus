var playersList;
var apiLink;

async function loadConf() {
    await $.getJSON('config.json', function(data) {         
        apiLink = data.apiLink;
    });
    getList();
}

function getList() {
    console.log("loading... " + apiLink)
    fetch(
        apiLink
    ).then(
        rsp => rsp.json()
    ).then(
        data => {
            loadList(data);
        }
    ).catch(
        e => {
            console.log(e);
            console.log(apiLink);

            var sidebar = document.getElementById("sidebar");
            sidebar.style.width = 0;
            sidebar.style.visibility = "hidden";

            var content = document.getElementById("content");
            content.style.backgroundColor = "#202020DD";

            var text = document.createElement("p");
            text.innerHTML = "An error occoured!";
            text.style.position = "absolute";
            text.style.top = "50%";
            text.style.left = "50%";
            text.style.transform = "translate(-50%, -50%)";
            text.style.fontSize = "64px";

            var err = document.createElement("p");
            err.innerHTML = e;
            err.style.position = "absolute";
            err.style.bottom = "20px";
            err.style.left = "50%";
            err.style.transform = "translateX(-50%)";

            content.appendChild(text);
            content.appendChild(err);
        }
    )
}

function loadList(data) {
    var players = data.players;
    playersList = players.list;

    loadPlayers(playersList);
}

function loadPlayers(list) {
    var i = 0;
    list.forEach(player => {
        console.log("loading player " + player.name + " (" + player.id + ")");
        var sidebar = document.getElementById("sidebarList");

        var box = document.createElement("div");
        box.id = "sidebarPlayerBox";

        var skinBox = document.createElement("div");

        var skin = document.createElement("img");
        skin.src = "https://visage.surgeplay.com/face/512/" + player.id;
        skin.id = "playerBoxSkin";
        skinBox.appendChild(skin);

        var name = document.createElement("div");
        name.textContent = player.name;
        name.id = "playerBoxName";

        box.appendChild(skinBox);
        box.appendChild(name);

        box.setAttribute("onclick", "switchPlayerData(\"" + i + "\");");

        sidebar.appendChild(box);
        i++;
    });
}

function switchPlayerData(id) {
    
}