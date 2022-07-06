var playersList;
var config;
var apiData;
var content;
var curPlayerID = -1;

async function loadConf() {
    content = document.getElementById("content");
    await $.getJSON('config.json', function (data) {
        config = data;
    });
    getList();
    loadDiscord();

    setInterval(function () {
        // clearList();
        // getList();
    }, 10000);
}

function getList() {
    addLoading();
    fetch(
        config.apiLink + "status"
    ).then(
        rsp => rsp.json()
    ).then(
        data => {
            apiData = data;
            loadList(apiData);
        }
    ).catch(
        e => {
            console.log(e);
            displayError(e);
        }
    )
}

function clearList() {
    document.getElementById("playerList").innerHTML = "";
}

function loadList(data) {
    var players = data.players;
    playersList = players.list.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    var playerCountBox = document.createElement("div");
    var playerCount = document.createElement("p");  
    playerCount.className = "playerCount";
    playerCount.textContent = `${players.online}/${players.max} Players`;
    playerCountBox.appendChild(playerCount);
    document.getElementById("playerCount").innerHTML = playerCountBox.innerHTML;

    loadPlayers(playersList);
}

function loadPlayers(list) {
    var i = 0;
    list.forEach(player => {
        var playerList = document.getElementById("playerList");
        var box = document.createElement("div");
        box.id = "sidebarPlayerBox";
        box.className = "sidebarTab";

        var bgBox = document.createElement("div");
        bgBox.className = "sidebarTabBG";

        var skinBox = document.createElement("div");

        var skin = document.createElement("img");
        skin.src = "https://visage.surgeplay.com/face/512/" + player.id;
        skin.id = "playerBoxSkin";
        skinBox.appendChild(skin);

        var name = document.createElement("div");
        name.textContent = player.name;
        name.id = "playerBoxName";

        box.appendChild(bgBox);
        box.appendChild(skinBox);
        box.appendChild(name);

        box.setAttribute("onclick", "switchPlayerData(" + i + ");");

        playerList.appendChild(box);
        i++;
    });
    removeLoading();
}

function switchPlayerData(id) {
    if (id == curPlayerID)
        return;

    curPlayerID = id;

    addLoading();
    var curPlayerData = playersList[id];
    fetch(
        config.apiLink + 'user?uuid=' + curPlayerData.id
    ).then(
        drsp => drsp.json()
    ).then(
        discord => {
            var contentBox = document.createElement("div");

            var playerName = document.createElement("p");
            playerName.textContent = curPlayerData.name;
            playerName.id = "contentPlayerName";
            contentBox.appendChild(playerName);

            var discordName = document.createElement("p");
            discordName.textContent = discord.name;
            discordName.id = "contentPlayerDiscordName";
            contentBox.appendChild(discordName);

            contentBox.appendChild(getIcons(discord.avatar, "https://visage.surgeplay.com/face/512/" + curPlayerData.id));
            contentBox.appendChild(getIDs(discord, curPlayerData));

            setContent(contentBox);
            removeLoading();
        }
    ).catch(
        e => {
            console.log(e);
            displayError(e);
        }
    );
}

function removeLoading() {
    document.getElementById("loadingOverlay").style.opacity = 0;
    document.getElementById("loadingOverlay").style.width = 0;
    document.getElementById("loadingOverlay").style.height = 0;
    document.getElementById("loadingOverlay").style.display = "none";
}

function addLoading() {
    document.getElementById("loadingOverlay").style.opacity = 1;
    document.getElementById("loadingOverlay").style.width = "110px";
    document.getElementById("loadingOverlay").style.height = "110px";
    document.getElementById("loadingOverlay").style.display = "initial";
}

function displayError(e) {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.width = 0;
    sidebar.style.visibility = "hidden";
    
    var rightsidebar = document.getElementById("rightBar");
    rightsidebar.style.width = 0;
    rightsidebar.style.visibility = "hidden";

    var content = document.getElementById("content");
    content.style.backgroundColor = "#202020DD";
    content.style.marginLeft = "0";
    content.style.width = "100%";
    content.style.maxWidth = "100%";
    content.style.visibility = "visible";
    content.style.textAlign = "center";

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

    removeLoading();
}

function soonDisplay() {
    curPlayerID = -1;
    var contentBox = document.createElement("div");

    var soonText = document.createElement("p");
    soonText.textContent = "soon ;>";
    soonText.id = "soonText";
    contentBox.appendChild(soonText);

    setContent(contentBox);
}

//load stuff into the actual content div
function setContent(newContent) {
    content.innerHTML = newContent.innerHTML;
}

function loadPlugins() {
    curPlayerID = -1;
    var pluginList = apiData.plugins;
    var pluginContentBox = document.createElement("div");

    var pluginTitle = document.createElement("p");
    pluginTitle.textContent = "Plugins"
    pluginTitle.className = "pluginTitle";
    pluginContentBox.appendChild(pluginTitle);

    var pluginBox = document.createElement("div");
    pluginBox.className = "pluginList";

    pluginList.forEach(plugin => {
        var pluginInfoBox = document.createElement("div");
        pluginInfoBox.className = "plugin";

        var pluginName = document.createElement("h1");
        pluginName.innerHTML = plugin.name;
        pluginInfoBox.appendChild(pluginName);

        var pluginDesc = document.createElement("p");
        pluginDesc.innerHTML = plugin.description;
        pluginInfoBox.appendChild(pluginDesc);

        var pluginVer = document.createElement("span");
        pluginVer.innerHTML = "v" + plugin.version;
        pluginInfoBox.appendChild(pluginVer);

        pluginInfoBox.innerHTML = `<a href="${plugin.website}" target="_blank">${pluginInfoBox.innerHTML}</a>`;

        pluginBox.appendChild(pluginInfoBox);
    });

    pluginContentBox.appendChild(pluginBox);
    setContent(pluginContentBox);
}