function getTime(time) {
    if (time >= 13000) {
        document.getElementById("timeimg").src = "assets/img/times/night.png";
    } else {
        document.getElementById("timeimg").src = "assets/img/times/day.png";
    }

    document.getElementById("time").innerHTML = formatTime(time);
}

function formatTime(time) {
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