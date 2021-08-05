const app = () => {
    const song = document.querySelector("audio");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".video-container video")

    //sounds
    const sounds = document.querySelectorAll(".audio-picker button");
    const timeSelect = document.querySelectorAll(".audio-timer button");
    const timeDisplay = document.querySelector(".time-display")

    const outlineLength = outline.getTotalLength();
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    timeSelect.forEach(option => {

        option.addEventListener('click', () => {
            fakeDuration = option.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
            checkPlaying(song);
        })

    });
    sounds.forEach(option => {
        option.addEventListener('click', () => {
            song.src = option.getAttribute("data-song");
            video.src = option.getAttribute("data-video");
            checkPlaying(song);
        })
    })

    const checkPlaying = son => {
        if (son.paused) {
            son.play();
            video.play();
            play.src = "assets/svg/pause.svg"
        } else {
            son.pause();
            video.pause();
            play.src = "assets/svg/play.svg"
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minute = Math.floor(elapsed / 60);
        let progress = outlineLength - ((currentTime / fakeDuration) * outlineLength);
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minute}:${seconds}`;
        if (currentTime >= fakeDuration) {
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = "assets/svg/play.svg";
        }
    }

};

app();