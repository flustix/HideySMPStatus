function getIDs(player) {
    const idBox = document.createElement("div");
    idBox.id = "idBox";

    //minecraft
    const uuidBox = document.createElement("div");
    const uuidTitle = document.createElement("p");
    uuidTitle.textContent = "Minecraft UUID";
    uuidTitle.id = "idTitle";
    uuidBox.appendChild(uuidTitle);

    const uuidText = document.createElement("p");
    uuidText.textContent = player.uuid;
    uuidBox.appendChild(uuidText);
    idBox.appendChild(uuidBox);

    //discord
    const dcidBox = document.createElement("div");
    const dcidTitle = document.createElement("p");
    dcidTitle.textContent = "Discord ID";
    dcidTitle.id = "idTitle";
    dcidBox.appendChild(dcidTitle);

    const dcidText = document.createElement("p");
    dcidText.textContent = player.discordId;
    dcidBox.appendChild(dcidText);
    idBox.appendChild(dcidBox);

    return idBox;
}

function getIcons(dcLink, mcLink) {
    const iconBox = document.createElement("div");
    iconBox.id = "playerIconBox";

    const mcIcon = document.createElement("img");
    mcIcon.className = "playerIcon mcIcon";
    mcIcon.src = mcLink;
    iconBox.appendChild(mcIcon);

    const dcIcon = document.createElement("img");
    dcIcon.className = "playerIcon dcIcon";
    dcIcon.src = dcLink + "?size=256";
    iconBox.appendChild(dcIcon);

    return iconBox;
}