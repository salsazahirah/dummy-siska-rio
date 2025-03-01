const bgm = document.querySelector(".bgm");
window.onload = function () {
    bgm.play().catch((error) => console.log("Autoplay prevented:", error));
};

window.onload = function () {
    if (sessionStorage.getItem("playAudio") === "true") {
        sessionStorage.removeItem("playAudio"); // Prevent replay on refresh
    }
};

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        bgm.pause(); // Pause bgm when user switches tab
    } else {
        bgm.play().catch((error) => console.log("Autoplay blocked:", error)); // Resume when tab is active again
    }
});

const audioControl = document.querySelector(".audio-control");
const iconPlay = document.querySelector(".icon-play");
const iconPause = document.querySelector(".icon-pause");

audioControl.addEventListener("click", () => {
    if (bgm.paused) {
        bgm.play();
        iconPlay.classList.add("hidden");
        iconPause.classList.remove("hidden");
    } else {
        bgm.pause();
        iconPlay.classList.remove("hidden");
        iconPause.classList.add("hidden");
    }
});

function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            (document.getElementById("days").innerText = "00"), (document.getElementById("hours").innerText = "00"), (document.getElementById("minutes").innerText = "00"), (document.getElementById("seconds").innerText = "00");
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        (document.getElementById("days").innerText = String(days).padStart(2, 0)), (document.getElementById("hours").innerText = String(hours).padStart(2, 0)), (document.getElementById("minutes").innerText = String(minutes).padStart(2, 0)), (document.getElementById("seconds").innerText = String(seconds).padStart(2, 0));
    }

    updateCountdown(); // Initial call to show the countdown immediately
    const timerInterval = setInterval(updateCountdown, 1000);
}

const targetDate = new Date("2025-04-26T09:00:00").getTime();
startCountdown(targetDate);

const formWishes = document.querySelector(".form-wishes");
const wishesAllList = document.querySelector(".wishes-all-list");
const wishesName = document.querySelector("#wishes-name");
const wishesMessage = document.querySelector("#wishes-message");
const wishesSend = document.querySelector("#wishes-send");
const wishesPopupError = document.querySelector(".wishes-popup-error");

wishesSend.addEventListener("click", function (e) {
    if (wishesMessage.value.length < 50) {
        e.preventDefault();
        wishesPopupError.classList.remove("hidden");
    } else {
        const newWish = document.createElement("div");
        newWish.className = "wish";

        const newWishName = document.createElement("div");
        newWishName.className = "wish-name";
        newWishName.innerHTML = wishesName.value;

        const newWishMessage = document.createElement("div");
        newWishMessage.className = "wish-message";
        newWishMessage.innerHTML = wishesMessage.value;

        newWish.appendChild(newWishName);
        newWish.appendChild(newWishMessage);

        wishesAllList.prepend(newWish);
    }
});

const rsvpAttendance = document.querySelector("#attendance");
const rsvpFormAttendees = document.querySelector(".form-attendees");
const rsvpConfirm = document.querySelector(".rsvp-confirm");
const rsvpPopup = document.querySelector(".rsvp-popup");
const rsvpPopupMessage = document.querySelector(".rsvp-popup .popup-message");
const rsvpName = document.querySelector("#rsvp-name");

rsvpAttendance.addEventListener("change", function () {
    if (this.value == "absent") {
        rsvpFormAttendees.classList.add("hidden");
    } else {
        rsvpFormAttendees.classList.remove("hidden");
    }
});

rsvpConfirm.addEventListener("click", function (e) {
    if (rsvpName.value == "") {
        e.preventDefault();
        rsvpPopupMessage.innerText = "Please fill your name";
        rsvpPopup.classList.remove("hidden");
    } else {
        rsvpPopupMessage.innerText = "Thank you for your confirmation!";
        rsvpPopup.classList.remove("hidden");
    }
});

const popupWrap = document.querySelectorAll(".popup-wrap");
const popupBack = document.querySelectorAll(".popup-back");
const popupClose = document.querySelectorAll(".popup-close");

function closePopup() {
    popupWrap.forEach((popup) => {
        popup.classList.add("hidden");
    });
}

popupBack.forEach((popup) => {
    popup.addEventListener("click", closePopup);
});
popupClose.forEach((popup) => {
    popup.addEventListener("click", closePopup);
});
