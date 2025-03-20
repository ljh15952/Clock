
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");  // 9시 → "09"
    const minutes = String(now.getMinutes()).padStart(2, "0"); // 5분 → "05"
    const seconds = String(now.getSeconds()).padStart(2, "0"); // 3초 → "03"
    document.getElementById("time").innerText = hours + " : " + minutes + " : " + seconds;

    const h = document.getElementById("target-hour").value;
    const m = document.getElementById("target-minute").value;

    const S1 = (now.getHours() * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds()
    const S2 = (h * 60 * 60) + (m * 60)
    const diff = (S2 - S1) + (24 * 60 * 60)
    const h1 = Math.floor(diff / 3600) % 24
    const m1 = Math.floor(diff / 60) % 60
    const s1 = diff % 60

    document.getElementById("remaining-time").innerText = 
    `남은 시간: ${h1}:${m1}:${s1}`;

}

setInterval(updateTime, 1000);