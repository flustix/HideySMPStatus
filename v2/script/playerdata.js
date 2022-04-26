function getIDs(discordData, playerData) {
    var idBox = document.createElement("div");
    idBox.id = "idBox";

    //minecraft
    var uuidBox = document.createElement("div");
    var uuidTitle = document.createElement("p");
    uuidTitle.textContent = "Minecraft UUID";
    uuidTitle.id = "idTitle";
    uuidBox.appendChild(uuidTitle);

    var uuidText = document.createElement("p");
    uuidText.textContent = playerData.id;
    uuidBox.appendChild(uuidText);
    idBox.appendChild(uuidBox);

    //discord
    var dcidBox = document.createElement("div");
    var dcidTitle = document.createElement("p");
    dcidTitle.textContent = "Discord ID";
    dcidTitle.id = "idTitle";
    dcidBox.appendChild(dcidTitle);

    var dcidText = document.createElement("p");
    dcidText.textContent = discordData.id;
    dcidBox.appendChild(dcidText);
    idBox.appendChild(dcidBox);

    return idBox;
}

function getIcons(dcLink, mcLink) {
    var iconBox = document.createElement("div");
    iconBox.id = "playerIconBox";

    var mcIcon = document.createElement("img");
    mcIcon.className = "playerIcon mcIcon";
    mcIcon.src = mcLink;
    iconBox.appendChild(mcIcon);

    var dcIcon = document.createElement("img");
    dcIcon.className = "playerIcon dcIcon";
    dcIcon.src = dcLink + "?size=256";
    iconBox.appendChild(dcIcon);

    return iconBox;
}