// ---------- SCREEN NAVIGATION ----------

function nextScreen(current, next) {
    document.getElementById(`screen${current}`).classList.remove("active");
    document.getElementById(`screen${current}`).style.display = "none";

    document.getElementById(`screen${next}`).style.display = "block";
    document.getElementById(`screen${next}`).classList.add("active");
}

let selectedDate = "";
let selectedTime = "";
let selectedActivity = "";

// ---------- YES BUTTON ----------

const yesBtn = document.getElementById("yesBtn");

yesBtn.addEventListener("click", () => {

    createHeartBurst();

    setTimeout(() => {
        nextScreen(3, 4);
    }, 1200);

});

// ---------- NO BUTTON ----------

const noBtn = document.getElementById("noBtn");

let noMessages = [
    "No 😅",
    "Are you sure?",
    "Really sure?",
    "Still trying? 😂",
    "Not happening 😭"
];

let noAttempt = 0;

let noX = 0;
let noDirection = 1;

setTimeout(() => {

    setInterval(() => {

        noX += (1.5 * noDirection);

        if (noX > 35) noDirection = -1;
        if (noX < -35) noDirection = 1;

        noBtn.style.transform =
            `translateX(${noX}px)`;

    }, 50);

}, 3000);

noBtn.addEventListener("mouseenter", dodgeNoButton);
noBtn.addEventListener("touchstart", dodgeNoButton);

function dodgeNoButton() {

    const randomX =
        Math.floor(Math.random() * 80) - 40;

    const randomY =
        Math.floor(Math.random() * 25) - 12;

    noBtn.style.transform =
        `translate(${randomX}px, ${randomY}px)`;

    if (noAttempt < noMessages.length) {
        noBtn.innerText = noMessages[noAttempt];
        noAttempt++;
    }

}

// ---------- DATE ----------

document.getElementById("dateNext")
.addEventListener("click", () => {

    selectedDate =
        document.getElementById("datePicker").value;

    if (!selectedDate) {
        alert("Pick a date first 😊");
        return;
    }

    nextScreen(4, 5);

});

// ---------- TIME ----------

document.getElementById("timeNext")
.addEventListener("click", () => {

    selectedTime =
        document.getElementById("timePicker").value;

    nextScreen(5, 6);

});

// ---------- ACTIVITIES ----------

const cards =
document.querySelectorAll(".activity-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        selectedActivity =
            card.dataset.activity;

        card.classList.add("selected");

        card.innerHTML +=
        `<div class="selected-tag">✓ Selected</div>`;

        setTimeout(() => {

            nextScreen(6, 7);

            startLoading();

        }, 1000);

    });

});

// ---------- LOADING ----------

function startLoading() {

    const messages = [
        "Planning perfect date...",
        "Checking availability...",
        "Finding best vibes...",
        "Almost done...",
        "Success ❤️"
    ];

    let progress = 0;
    let messageIndex = 0;

    const loadingText =
        document.getElementById("loadingText");

    const progressFill =
        document.getElementById("progressFill");

    const interval = setInterval(() => {

        progress += 2;

        progressFill.style.width =
            progress + "%";

        if (
            progress % 20 === 0 &&
            messageIndex < messages.length - 1
        ) {

            messageIndex++;

            loadingText.innerText =
                messages[messageIndex];

        }

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                showFinalScreen();

            }, 600);

        }

    }, 70);

}

// ---------- FINAL SCREEN ----------

function showFinalScreen() {

    nextScreen(7, 8);

    const summary =
        document.getElementById("finalSummary");

    summary.innerHTML = `
        <p>📅 <strong>${selectedDate}</strong></p>
        <p>⏰ <strong>${selectedTime}</strong></p>
        <p>✨ <strong>${selectedActivity}</strong></p>
    `;

}

// ---------- WHATSAPP ----------

const WHATSAPP_NUMBER =
"237678445361";

document
.getElementById("whatsappBtn")
.addEventListener("click", () => {

    const message =

`Hey 😊

I completed your date invitation.

📅 Date: ${selectedDate}

⏰ Time: ${selectedTime}

✨ Activity: ${selectedActivity}

Now I guess you actually have to plan this 😅`;

    const url =
`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

});

// ---------- HEART CONFETTI ----------

function createHeartBurst() {

    const container =
        document.getElementById("confettiContainer");

    for (let i = 0; i < 40; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML = "❤️";

        heart.className =
            "heart-confetti";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.top =
            "50vh";

        heart.style.animationDelay =
            Math.random() * 0.4 + "s";

        heart.style.transform =
            `rotate(${Math.random()*360}deg)`;

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 3000);

    }

}
