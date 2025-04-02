const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

// Load Background Image
const background = new Image();
background.src = "background.jpg"; // Ensure this file is uploaded

// Load Person Image (with transparency)
const person = new Image();
person.src = "person.png"; // Ensure this is a PNG with transparency

// Function to load custom font
function loadFont(callback) {
    const customFont = new FontFace("CustomFont", "url('custom-font.ttf')");
    customFont.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        callback(); // Call the drawing function after the font loads
    }).catch(error => console.error("Font loading error:", error));
}

// Draw the image once both images are loaded
background.onload = person.onload = function() {
    loadFont(drawImage);
};

function drawImage(name = "YOUR NAME") {
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Adjust canvas size based on screen width
    const screenWidth = window.innerWidth;
    let canvasWidth = 1500;
    let canvasHeight = 500
}

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 1. Draw Background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // 2. Set up text properties (scale font size for mobile)
    const fontSize = screenWidth < 768 ? 80 : 120; // Smaller font for mobile
    ctx.font = `${fontSize}px CustomFont`; // Use custom font
    ctx.fillStyle = "#D6D0AC";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#D6D0AC";
    ctx.lineWidth = screenWidth < 768 ? 3 : 5; // Smaller outline for mobile

    // 3. Position text (centered with 0.5cm gap from top)
    const gapInPixels = (2.0 / 2.5) * 85;  // Convert 0.5 cm to pixels (≈19px)
    const textX = canvas.width / 2;
    const textY = gapInPixels + fontSize; // Adjust based on font size

    // 4. Draw Text with Outline for Visibility
    ctx.strokeText(name, textX, textY);
    ctx.fillText(name, textX, textY);

    // 5. Draw Person Image (on Top of the Text)
    ctx.drawImage(person, 0, 0, person.width, person.height);

    // Add animation to canvas
    canvas.classList.add("fade-in");

    // Show the download button after generating the poster
    document.getElementById("downloadBtn").style.display = "block";
}

function generateImage() {
    let name = document.getElementById("nameInput").value.trim();
    if (name === "") {
        alert(" Enter your name!");
        return;
    }
    drawImage(name);
}

// Download Image
function downloadImage() {
    const link = document.createElement("a");
    link.download = "suriya-stardom-poster.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
}
