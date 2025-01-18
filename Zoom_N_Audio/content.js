function getRandomInterval(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomZoomLevel() {
    return Math.random() * (10 - 5) + 5; // Zoom between 5x and 10x
}

function disruptAudio() {
    const disruptionDuration = getRandomInterval(5000, 15000); // Disrupt for 5-15s

    // Find all audio and video elements
    const mediaElements = document.querySelectorAll("audio, video");

    if (mediaElements.length === 0) {
        console.log("🔇 No audio/video elements found. Retrying...");
        setTimeout(disruptAudio, 3000); // Retry after 3s
        return;
    }

    mediaElements.forEach(media => {
        const randomEffect = Math.floor(Math.random() * 3); // Choose a random effect

        if (randomEffect === 0) {
            media.muted = !media.muted;
            console.log(`🔇 Mute toggled: ${media.muted}`);
        } else if (randomEffect === 1) {
            media.playbackRate = getRandomInterval(0.5, 2.0); // Change speed (0.5x - 2x)
            console.log(`⏩ Speed set to: ${media.playbackRate.toFixed(2)}x`);
        } else {
            if (!media.paused) {
                media.pause();
                console.log("⏸ Playback paused.");
            } else {
                media.play();
                console.log("▶️ Playback resumed.");
            }
        }
    });

    setTimeout(stopDisruption, disruptionDuration);
}

function stopDisruption() {
    const restDuration = getRandomInterval(5000, 15000); // Rest for 5-15s
    const mediaElements = document.querySelectorAll("audio, video");

    mediaElements.forEach(media => {
        media.muted = false;
        media.playbackRate = 1.0; // Reset speed
        if (media.paused) media.play(); // Resume if paused
    });

    console.log(`⏳ Stopping disruption for ${restDuration / 1000} seconds.`);
    setTimeout(disruptAudio, restDuration);
}

// Detect dynamically added media elements
function observeDOMChanges() {
    const observer = new MutationObserver(() => {
        console.log("🔍 Checking for new media elements...");
        disruptAudio();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function startZooming() {
    const zoomDuration = getRandomInterval(1000, 10000); // Zoom lasts between 1s and 10s
    const zoomLevel = getRandomZoomLevel();

    document.body.style.transform = `scale(${zoomLevel})`;
    document.body.style.transformOrigin = "center center";
    console.log(`🔍 Zooming to ${zoomLevel.toFixed(2)} for ${zoomDuration / 1000} seconds`);

    setTimeout(stopZooming, zoomDuration);
}

function stopZooming() {
    const restDuration = getRandomInterval(5000, 10000); // Rest between 5s and 10s

    document.body.style.transform = "scale(1)"; // Reset zoom
    console.log(`⏸ Stopping zoom for ${restDuration / 1000} seconds`);

    setTimeout(startZooming, restDuration);
}

// Start the zoom cycle
startZooming();
// Start disruption loop after ensuring media elements exist
setTimeout(disruptAudio, 3000);
observeDOMChanges();
