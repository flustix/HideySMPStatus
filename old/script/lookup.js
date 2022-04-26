function load() {
    var urlParams = new URLSearchParams(window.location.search);
    var userParam = urlParams.get("username");
    document.getElementById("inputUsername").value = userParam;

    if (userParam != null && userParam != "") {
        getUser(userParam);
    } else {
        document.getElementById("dcUsername").innerHTML = "Please specify a user";
    }
}

function getUser(usr) {
    fetch(
        "https://link.samifying.com/api/lookup/" + usr
    ).then(
        rsp => {
            if (rsp.status !== 200) {
                throw new Error("User not found");
            }
            return rsp.json();
        }
    ).then(
        data => {
            loadUser(data);
        }
    ).catch(e => {
        document.getElementById("dcUsername").innerHTML = e.message;
    });
}

function loadUser (data) {
    var pfp = document.getElementById("pfp");
    pfp.src = data.avatar;

    document.getElementById("dcUsername").innerHTML = data.name;
    document.getElementById("dcNickname").innerHTML = data.nickname;
    document.getElementById("dcID").innerHTML = data.id;

    var isMod = data.moderator;
    var isSupporter = data.supporter;
    var tags = "";

    if (isMod)
        tags += "<span class='tagMod'>Moderator</span>";

    if (isSupporter) {
        if (isMod)
            tags += " ";

        tags += "<span class='tagSupporter'>Supporter</span>";
    }

        document.getElementById("userTags").innerHTML += tags;
}