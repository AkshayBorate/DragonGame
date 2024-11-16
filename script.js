let score = 0;
let cross = true;

let audio = new Audio("./music.mp3");
let audiogo = new Audio("gameover.mp3");

document.addEventListener("keydown", () => {
    audio.play().catch(err => console.log("Error playing music:", err));
}, { once: true });

document.onkeydown = function (e) {
    console.log("Key code is ", e.keyCode);

    if (e.keyCode == 38) {
        let dino = document.querySelector(".dino");
        dino.classList.add("animateDino");

        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 700);
    }

    if (e.keyCode == 39) {
        let dino = document.querySelector(".dino");
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        if (dinoX < window.innerWidth - 112) {
            dino.style.left = (dinoX + 112) + "px";
        }
    }

    if (e.keyCode == 37) {
        let dino = document.querySelector(".dino");
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        if (dinoX > 0) {
            dino.style.left = (dinoX - 112) + "px";
        }
    }
};

setInterval(() => {
    let dino = document.querySelector(".dino");
    let gameOver = document.querySelector(".gameOver");
    let obstacle = document.querySelector(".obstacle");

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY);

    if (offsetX < 113 && offsetY < 52) {
        gameOver.style.visibility = "visible";
        obstacle.classList.remove("obstacleAni");
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        });
    } else if (offsetX < 73 && cross) {
        score += 100;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
            let newDur = Math.max(0.5, aniDur - 0.1);
            obstacle.style.animationDuration = newDur + "s";
        }, 500);
    }
}, 50);

function updateScore(score) {
    document.getElementsByClassName("scoreCount")[0].innerHTML = "Your score: " + score;
}

audio.onerror = () => console.error("Error loading music.mp3. Check the file path.");
audio.onplay = () => console.log("Music is playing successfully.");
