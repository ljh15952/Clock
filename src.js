// =========================
// 게이지 시작 남은 시간
// =========================

let initialDiff = null;


// 이전 목표 시간
let previousTarget = null;



function updateTime() {

    const now = new Date();


    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();



    // =========================
    // 현재 시간 표시
    // =========================

    const h1 =
        String(hour).padStart(2, "0");

    const m1 =
        String(minute).padStart(2, "0");

    const s1 =
        String(second).padStart(2, "0");


    document.getElementById("current-time").innerText =
        `현재 시간: ${h1}:${m1}:${s1}`;



    // =========================
    // 목표 시간 가져오기
    // =========================

    const t_h =
        document.getElementById("target-hour").value;

    const t_m =
        document.getElementById("target-minute").value;



    // =========================
    // 목표 시간이 입력되지 않은 경우
    // =========================

    if (t_h === "" || t_m === "") {

        document.getElementById("remaining-time").innerText =
            "남은 시간: --시간 --분 --초";

        document.getElementById("remaining-minutes").innerText =
            "남은 분 : --";

        document.getElementById("remaining-seconds").innerText =
            "남은 초 : --";

        document.getElementById("gauge-bar").style.width =
            "0%";

        document.getElementById("gauge-text").innerText =
            "--%";


        initialDiff = null;
        previousTarget = null;


        return;
    }



    // =========================
    // 시간을 초로 변환
    // =========================


    // 현재 시간 → 초

    const S1 =
        (hour * 60 * 60) +
        (minute * 60) +
        second;



    // 목표 시간 → 초

    const S2 =
        (Number(t_h) * 60 * 60) +
        (Number(t_m) * 60);



    // =========================
    // 남은 전체 초 계산
    // =========================

    const diff =
        (S2 - S1 + (24 * 60 * 60))
        % (24 * 60 * 60);



    // =========================
    // 시 / 분 / 초
    // =========================

    const h2 =
        Math.floor(diff / 3600);


    const m2 =
        Math.floor(
            (diff % 3600) / 60
        );


    const s2 =
        diff % 60;



    // =========================
    // 전체 남은 분
    // =========================

    const remainingMinutes =
        Math.floor(diff / 60);



    // =========================
    // 전체 남은 초
    // =========================

    const remainingSeconds =
        diff;



    // =========================
    // 화면에 표시
    // =========================

    document.getElementById("remaining-time").innerText =
        `남은 시간: ${h2}시간 ${m2}분 ${s2}초`;


    document.getElementById("remaining-minutes").innerText =
        `남은 분 : ${remainingMinutes}`;


    document.getElementById("remaining-seconds").innerText =
        `남은 초 : ${remainingSeconds}`;



    // =========================
    // 게이지 계산
    // =========================

    const currentTarget =
        `${t_h}:${t_m}`;



    // 목표 시간이 변경된 경우
    if (previousTarget !== currentTarget) {

        // 현재 남은 시간을 100% 기준으로 저장
        initialDiff = diff;

        previousTarget = currentTarget;
    }



    // =========================
    // 게이지 퍼센트
    // =========================

    let percent = 0;


    if (initialDiff > 0) {

        percent =
            (diff / initialDiff) * 100;
    }



    // 0 ~ 100 사이로 제한
    percent =
        Math.max(
            0,
            Math.min(100, percent)
        );



    // =========================
    // 게이지 표시
    // =========================

    document.getElementById("gauge-bar").style.width =
        `${percent}%`;


    document.getElementById("gauge-text").innerText =
        `${percent.toFixed(1)}%`;

}



// =========================
// 처음 한 번 실행
// =========================

updateTime();



// =========================
// 1초마다 실행
// =========================

setInterval(
    updateTime,
    1000
);



// =========================
// 목표 시간을 변경하면
// 바로 업데이트
// =========================

document
    .getElementById("target-hour")
    .addEventListener(
        "input",
        updateTime
    );


document
    .getElementById("target-minute")
    .addEventListener(
        "input",
        updateTime
    );
