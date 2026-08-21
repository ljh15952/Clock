// =========================
// DOM
// =========================

const targetHourInput =
    document.getElementById("target-hour");

const targetMinuteInput =
    document.getElementById("target-minute");

const currentTimeElement =
    document.getElementById("current-time");

const remainingTimeElement =
    document.getElementById("remaining-time");

const remainingMinutesElement =
    document.getElementById("remaining-minutes");

const remainingSecondsElement =
    document.getElementById("remaining-seconds");

const gaugeBar =
    document.getElementById("gauge-bar");

const gaugeText =
    document.getElementById("gauge-text");


// 모래시계

const hourglass =
    document.getElementById("hourglass-svg");

const upperSand =
    document.getElementById("upper-sand");

const lowerSand =
    document.getElementById("lower-sand");

const hourglassPercent =
    document.getElementById("hourglass-percent");

const hourglassLabel =
    document.getElementById("hourglass-label");



// =========================
// 타이머 상태
// =========================

let initialDiff = null;

let previousTarget = null;

let targetTimestamp = null;



// =========================
// 숫자 범위 제한
// =========================

function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}



// =========================
// 목표 시간 생성
// =========================

function createTargetTimestamp(
    now,
    hour,
    minute
) {

    const target =
        new Date(now);

    target.setHours(
        hour,
        minute,
        0,
        0
    );


    // 이미 지난 시간이면
    // 다음 날로 설정

    if (
        target.getTime() <=
        now.getTime()
    ) {

        target.setDate(
            target.getDate() + 1
        );

    }


    return target.getTime();

}



// =========================
// 모래시계 업데이트
// =========================

function updateHourglass(
    percent,
    running
) {

    if (
        percent === null ||
        !Number.isFinite(percent)
    ) {

        upperSand.style.setProperty(
            "--sand-scale",
            0
        );

        lowerSand.style.setProperty(
            "--sand-scale",
            0
        );

        hourglass.classList.remove(
            "running"
        );

        hourglassPercent.innerText =
            "--%";

        hourglassLabel.innerText =
            "목표 시간을 입력하세요";

        return;

    }


    const safePercent =
        clamp(percent, 0, 100);

    const upperRatio =
        safePercent / 100;

    const lowerRatio =
        1 - upperRatio;


    // 위쪽 모래 감소

    upperSand.style.setProperty(
        "--sand-scale",
        upperRatio
    );


    // 아래쪽 모래 증가

    lowerSand.style.setProperty(
        "--sand-scale",
        lowerRatio
    );


    // 떨어지는 모래 표시

    if (running) {

        hourglass.classList.add(
            "running"
        );

    } else {

        hourglass.classList.remove(
            "running"
        );

    }


    hourglassPercent.innerText =
        `${safePercent.toFixed(1)}%`;


    if (safePercent <= 0) {

        hourglassLabel.innerText =
            "시간 종료";

    } else {

        hourglassLabel.innerText =
            "남은 모래";

    }

}



// =========================
// 입력값이 없을 때 초기화
// =========================

function resetTimerDisplay() {

    remainingTimeElement.innerText =
        "--시간 --분 --초";

    remainingMinutesElement.innerText =
        "--";

    remainingSecondsElement.innerText =
        "--";

    gaugeBar.style.width =
        "0%";

    gaugeText.innerText =
        "--%";


    initialDiff = null;

    previousTarget = null;

    targetTimestamp = null;


    updateHourglass(
        null,
        false
    );

}



// =========================
// 시간 업데이트
// =========================

function updateTime() {

    const now =
        new Date();


    // =========================
    // 현재 시간
    // =========================

    const hour =
        now.getHours();

    const minute =
        now.getMinutes();

    const second =
        now.getSeconds();


    const h =
        String(hour)
            .padStart(2, "0");

    const m =
        String(minute)
            .padStart(2, "0");

    const s =
        String(second)
            .padStart(2, "0");


    currentTimeElement.innerText =
        `${h}:${m}:${s}`;



    // =========================
    // 입력값
    // =========================

    const hourValue =
        targetHourInput.value;

    const minuteValue =
        targetMinuteInput.value;


    if (
        hourValue === "" ||
        minuteValue === ""
    ) {

        resetTimerDisplay();

        return;

    }



    const targetHour =
        Number(hourValue);

    const targetMinute =
        Number(minuteValue);



    // =========================
    // 입력값 검증
    // =========================

    if (
        !Number.isInteger(targetHour) ||
        !Number.isInteger(targetMinute) ||
        targetHour < 0 ||
        targetHour > 23 ||
        targetMinute < 0 ||
        targetMinute > 59
    ) {

        resetTimerDisplay();

        return;

    }



    // =========================
    // 목표 시간이 변경된 경우
    // =========================

    const currentTarget =
        `${targetHour}:${targetMinute}`;


    if (
        previousTarget !==
        currentTarget
    ) {

        targetTimestamp =
            createTargetTimestamp(
                now,
                targetHour,
                targetMinute
            );


        initialDiff =
            Math.ceil(
                (
                    targetTimestamp -
                    now.getTime()
                )
                / 1000
            );


        previousTarget =
            currentTarget;

    }



    // =========================
    // 남은 초
    // =========================

    const diff =
        Math.max(
            0,

            Math.ceil(
                (
                    targetTimestamp -
                    now.getTime()
                )
                / 1000
            )
        );



    // =========================
    // 시 / 분 / 초
    // =========================

    const remainingHours =
        Math.floor(
            diff / 3600
        );


    const remainingMinutesPart =
        Math.floor(
            (diff % 3600) / 60
        );


    const remainingSecondsPart =
        diff % 60;



    // =========================
    // 전체 분 / 초
    // =========================

    const totalMinutes =
        Math.floor(
            diff / 60
        );


    const totalSeconds =
        diff;



    // =========================
    // 화면 표시
    // =========================

    remainingTimeElement.innerText =
        `${remainingHours}시간 ` +
        `${remainingMinutesPart}분 ` +
        `${remainingSecondsPart}초`;


    remainingMinutesElement.innerText =
        totalMinutes;


    remainingSecondsElement.innerText =
        totalSeconds;



    // =========================
    // 퍼센트
    // =========================

    let percent = 0;


    if (
        initialDiff !== null &&
        initialDiff > 0
    ) {

        percent =
            (
                diff /
                initialDiff
            )
            * 100;

    }


    percent =
        clamp(
            percent,
            0,
            100
        );



    // =========================
    // 게이지
    // =========================

    gaugeBar.style.width =
        `${percent}%`;

    gaugeText.innerText =
        `${percent.toFixed(1)}%`;



    // =========================
    // 모래시계
    // =========================

    updateHourglass(
        percent,
        diff > 0
    );

}



// =========================
// 최초 실행
// =========================

updateTime();



// =========================
// 주기적 업데이트
// =========================

setInterval(
    updateTime,
    250
);



// =========================
// 입력 변경
// =========================

targetHourInput.addEventListener(
    "input",
    updateTime
);


targetMinuteInput.addEventListener(
    "input",
    updateTime
);
