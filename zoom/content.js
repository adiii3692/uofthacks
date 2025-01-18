function getRandomInterval(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomZoomLevel() {
    return Math.random() * (5 - 1) + 1; // Zoom between 1x and 5x
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
    const restDuration = getRandomInterval(1000, 10000); // Rest between 1s and 10s

    document.body.style.transform = "scale(1)"; // Reset zoom
    console.log(`⏸ Stopping zoom for ${restDuration / 1000} seconds`);

    setTimeout(startZooming, restDuration);
}

// Start the zoom cycle
startZooming();
