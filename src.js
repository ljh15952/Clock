function changeText() {
    document.getElementById("text").innerText = "변경된 텍스트!";
}



function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    document.getElementById("time").innerText = hours + " : " + minutes + " : " + seconds;
}

setInterval(updateTime, 1000);
updateTime();