// Setup sprite sheet animation variables
const canvas = document.getElementById('spriteCanvas');
const ctx = canvas.getContext('2d');

const spriteSheet = new Image();
spriteSheet.src = 'images/spriteviewer/bun_anim.png'; // Sprite sheet source

let spriteWidth, spriteHeight, totalFrames;
let currentFrame = 0;
let isPlaying = false;
let animationInterval;
let frameDelay = 100; // Delay in ms between frames (adjust for speed)

// Automatically set sprite width, height, and total frames based on the sprite sheet image
spriteSheet.onload = () => {
  // Get the sprite sheet width and height
  spriteWidth = spriteSheet.height; // Assuming square frames
  spriteHeight = spriteSheet.height;
  totalFrames = Math.floor(spriteSheet.width / spriteWidth); // Calculate total frames by dividing width by frame width

  // Set the canvas size based on the frame size
  canvas.width = spriteWidth;
  canvas.height = spriteHeight;

  // Disable image smoothing to preserve pixel art quality
  ctx.imageSmoothingEnabled = false;

  // Draw the first frame
  drawFrame();
};

// Draw current frame on canvas
function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const x = currentFrame * spriteWidth; // Calculate the x-coordinate based on current frame
  ctx.drawImage(spriteSheet, x, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
}

// Start the animation
function playAnimation() {
  if (!isPlaying) {
    isPlaying = true;
    animationInterval = setInterval(() => {
      currentFrame = (currentFrame + 1) % totalFrames;
      drawFrame();
    }, frameDelay);
  }
}

// Pause the animation
function pauseAnimation() {
  if (isPlaying) {
    clearInterval(animationInterval);
    isPlaying = false;
  }
}

// Stop the animation and reset to first frame
function stopAnimation() {
  clearInterval(animationInterval);
  isPlaying = false;
  currentFrame = 0;
  drawFrame();
}

// Handle keyboard input for frame control
function handleKeyboardInput(event) {
  if (isPlaying) return; // Ignore keyboard input while animation is playing

  if (event.key === 'ArrowRight') {
    currentFrame = (currentFrame + 1) % totalFrames;
    drawFrame();
  } else if (event.key === 'ArrowLeft') {
    currentFrame = (currentFrame - 1 + totalFrames) % totalFrames;
    drawFrame();
  }
}

// Event listeners for buttons
document.getElementById('playBtn').addEventListener('click', playAnimation);
document.getElementById('pauseBtn').addEventListener('click', pauseAnimation);
document.getElementById('stopBtn').addEventListener('click', stopAnimation);
document.getElementById('prevBtn').addEventListener('click', () => {
  currentFrame = (currentFrame - 1 + totalFrames) % totalFrames;
  drawFrame();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  currentFrame = (currentFrame + 1) % totalFrames;
  drawFrame();
});

// Event listener for keyboard input
document.addEventListener('keydown', handleKeyboardInput);
