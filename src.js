
function updateTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const h1 = String(hour).padStart(2, "0");  // 9시 → "09"
    const m1 = String(minute).padStart(2, "0"); // 5분 → "05"
    const s1 = String(second).padStart(2, "0"); // 3초 → "03"
    document.getElementById("current-time").innerText = `현재 시간: ${h1}:${m1}:${s1}`;

    const t_h = document.getElementById("target-hour").value;
    const t_m = document.getElementById("target-minute").value;

    if (t_h == '' || t_m == '')
        return;

    const S1 = (hour * 60 * 60) + (minute * 60) + second
    const S2 = (t_h * 60 * 60) + (t_m * 60)
    const diff = (S2 - S1) + (24 * 60 * 60)
    const h2 = Math.floor(diff / 3600) % 24
    const m2 = Math.floor(diff / 60) % 60
    const s2 = diff % 60

    document.getElementById("remaining-time").innerText =
        `남은 시간: ${h2}:${m2}:${s2}`;

}

setInterval(updateTime, 1000);