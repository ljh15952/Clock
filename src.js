function updateTime() {
    const now = new Date();

    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // 현재 시간 표시
    const h1 = String(hour).padStart(2, "0");
    const m1 = String(minute).padStart(2, "0");
    const s1 = String(second).padStart(2, "0");

    document.getElementById("current-time").innerText =
        `현재 시간: ${h1}:${m1}:${s1}`;

    // 목표 시간 가져오기
    const t_h = document.getElementById("target-hour").value;
    const t_m = document.getElementById("target-minute").value;

    if (t_h === "" || t_m === "") {
        return;
    }

    // 현재 시간을 초로 변환
    const S1 =
        (hour * 60 * 60) +
        (minute * 60) +
        second;

    // 목표 시간을 초로 변환
    const S2 =
        (Number(t_h) * 60 * 60) +
        (Number(t_m) * 60);

    // 남은 시간 계산
    const diff = (S2 - S1 + 24 * 60 * 60) % (24 * 60 * 60);

    const h2 = Math.floor(diff / 3600);
    const m2 = Math.floor((diff % 3600) / 60);
    const s2 = diff % 60;

    // 두 자리로 표시
    const h3 = String(h2).padStart(2, "0");
    const m3 = String(m2).padStart(2, "0");
    const s3 = String(s2).padStart(2, "0");

    document.getElementById("remaining-time").innerText =
        `남은 시간: ${h3}시간 ${m3}분 ${s3}초`;
}

// 바로 한 번 실행
updateTime();

// 1초마다 갱신
setInterval(updateTime, 1000);
