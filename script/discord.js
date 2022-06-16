function loadDiscord() {
    fetch(
        "https://discord.com/api/guilds/264801645370671114/widget.json"
    ).then(
        rsp => rsp.json()
    ).then(
        data => {
            var discordMemberList = document.getElementById("discordMemberList");
            data.members.forEach(member => {
                var discordMemberBox = document.createElement("div");

                var avatar = document.createElement("img");
                avatar.src = member.avatar_url;
                discordMemberBox.appendChild(avatar);

                var name = document.createElement("p");
                name.innerText = member.username;
                discordMemberBox.appendChild(name);

                switch (member.status) {
                    case 'online': {
                        name.className = "discordOnline";
                        break;
                    }   case 'idle': {
                        name.className = "discordIdle";
                        break;
                    }   case 'dnd': {
                        name.className = "discordDnD";
                        break;
                    }
                }

                discordMemberList.appendChild(discordMemberBox);
            });
        }
    ).catch(
        e => {
            console.log(e);
            displayError(e);
        }
    )
}