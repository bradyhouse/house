
<script setup lang="js">
import {ref, watch, onMounted } from "vue";
import { useGameStore } from '../../../store/tetris-game-store';
import { COLS, ROWS, COLORS, KEYS } from '../../../constants';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ArrowBigUp, ArrowBigDown,ArrowBigLeft, ArrowBigRight, Play, RotateCcw, Pause, Video, Grid2x2X, Grid2x2Plus } from 'lucide-vue-next';

const canvasEl = ref(null);
const playButtonEl = ref(null);
const pauseButtonEl = ref(null);
const resetButtonEl = ref(null);
const youtubeRef = ref(null);
const youtubeUrl = ref('https://www.youtube.com/embed/xCLTpcx9aO8?autoplay=1&controls=0&showinfo=0&modestbranding=1&mute=1');
const defaultYoutubeUrl = ref('https://www.youtube.com/embed/xCLTpcx9aO8');
const youtubePlayer = ref(null);
const showVideoDialog = ref(false);
const newVideoUrl = ref('https://www.youtube.com/embed/xCLTpcx9aO8');
const originalPlayerState = ref(null);
const disableInputArrows = ref(true);
const disableVideoButton = ref(false);
const disableGrid = ref(false);
const isGridDrawn = ref(false);
const ctx = ref(null);
const W = ref(0);
const H = ref(0);
const BLOCK_W = ref(0);
const BLOCK_H = ref(0);
const gameStore = useGameStore();


function newGame() {
    gameStore.isPlay = true;
    gameStore.clearAllIntervals(gameStore);
    gameStore.intervalRender = setInterval( render, 30 );
    gameStore.init(gameStore);
    gameStore.newShape(gameStore);
    gameStore.lose = false;
    gameStore.interval = setInterval( () => gameStore.tick(gameStore), 400 );
}

function drawGrid() {
  if (canvasEl.value && !disableGrid.value) {
    const gridSize = BLOCK_W.value;
    const gradient = ctx.value.createLinearGradient(0, 0, W.value, H.value);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.5, 'transparent');
    gradient.addColorStop(1, 'black');

    ctx.value.fillStyle = gradient;
    ctx.value.fillRect(0, 0, canvasEl.value.width, canvasEl.value.height);

    for(let x = 0; x <= canvasEl.value.width; x += gridSize) {
          ctx.value.beginPath();
          ctx.value.moveTo(x, 0);
          ctx.value.lineTo(x, canvasEl.value.height);
          ctx.value.strokeStyle = 'cyan';
          ctx.value.stroke();
    }

    for(let y = 0; y <= canvasEl.value.height; y += gridSize) {
        ctx.value.beginPath();
        ctx.value.moveTo(0, y);
        ctx.value.lineTo(canvasEl.value.width, y);
        ctx.value.strokeStyle = 'cyan';
        ctx.value.stroke();

    }
    isGridDrawn.value = true;

  }
}

function drawBlock(x, y, color) {
    const startX = BLOCK_W.value * x;
    const startY = BLOCK_H.value * y;

    const gradient = ctx.value.createLinearGradient(
        startX, startY,
        startX + BLOCK_W.value - 1, startY + BLOCK_H.value - 1
    );

    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, color);

    ctx.value.save();

    ctx.value.fillStyle =gradient;
    ctx.value.fillRect(startX, startY, BLOCK_W.value - 1, BLOCK_H.value - 1);

    ctx.value.restore();
    ctx.value.strokeStyle =  'transparent';
    ctx.value.strokeRect(startX, startY, BLOCK_W.value - 1, BLOCK_H.value - 1);
}

function render() {
    ctx.value.clearRect(0, 0, W.value, H.value);
    drawGrid();

    // Draw board pieces with gradient
    ctx.value.strokeStyle = 'transparent';
    for (var x = 0; x < COLS; ++x) {
        for (var y = 0; y < ROWS; ++y) {
            if (gameStore.board && gameStore.board[y][x]) {
                // Use colors array for base color
                const baseColor = COLORS[gameStore.board[y][x] - 1];

                // Create gradient based on base color
                const gradient = ctx.value.createLinearGradient(
                    BLOCK_W.value * x, BLOCK_H.value * y,
                    BLOCK_W.value * x + BLOCK_W.value - 1, BLOCK_H.value * y + BLOCK_H.value - 1
                );

                // Add color stops with slight variations of base color
                gradient.addColorStop(0, baseColor);
                gradient.addColorStop(1, adjustColor(baseColor, -30));

                ctx.value.fillStyle = gradient;
                drawBlock(x, y, baseColor);
            }
        }
    }

    // Draw current piece with gradient
    ctx.value.fillStyle = 'red';
    ctx.value.strokeStyle = '#40E0D0';
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            if (gameStore.current && gameStore.current[y][x]) {
                const baseColor = COLORS[gameStore.current[y][x] - 1];

                const gradient = ctx.value.createLinearGradient(
                    BLOCK_W.value * (gameStore.currentX + x), BLOCK_H.value * (gameStore.currentY + y),
                    BLOCK_W.value * (gameStore.currentX + x) + BLOCK_W.value - 1,
                    BLOCK_H.value * (gameStore.currentY + y) + BLOCK_H.value - 1
                );

                gradient.addColorStop(0, baseColor);
                gradient.addColorStop(1, adjustColor(baseColor, -30));

                ctx.value.fillStyle = gradient;
                drawBlock(gameStore.currentX + x, gameStore.currentY + y, baseColor);
            }
        }
    }
}

function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = (num >> 16) + percent;
    const g = ((num >> 8) & 0x00FF) + percent;
    const b = (num & 0x0000FF) + percent;

    return '#' + (
        0x1000000 +
        (r < 255 ? (r < 0 ? 0 : r) : 255) * 0x10000 +
        (g < 255 ? (g < 0 ? 0 : g) : 255) * 0x100 +
        (b < 255 ? (b < 0 ? 0 : b) : 255)
    ).toString(16).slice(1);
}

function initKeyboardListeners() {
  document.body.onkeydown = function( e ) {

    if ( typeof KEYS[ e.keyCode ] != 'undefined' ) {
        gameStore.keyPress( KEYS[ e.keyCode ], gameStore, render );
        render();
    }
};
}

//#region YouTube Handlers

const initYouTubePlayer = async () => {
  if (!youtubeRef.value) return;
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(script);
};

const onPlayerStateChange = (event) => {
  if (event.data === YT.PlayerState.ENDED) {
    youtubePlayer.value.seekTo(0);
    youtubePlayer.value.playVideo();
  }
};

const onError = (error) => {
  console.error('YouTube player error:', error);
};

//#endregion
//#region Watchers

watch(youtubeUrl, () => {
  handleVideoChange();
});

watch(youtubeRef, () => {
  if (youtubeRef.value) {
    initYouTubePlayer();
  }
});


watch(canvasEl, () => {
  if (canvasEl.value) {
    initKeyboardListeners();
    ctx.value = canvasEl.value.getContext( '2d' );
    W.value = window.innerWidth - 300;
    H.value = window.innerHeight - 200;
    canvasEl.value.width = W.value;
    canvasEl.value.height = H.value;
    BLOCK_W.value = W.value / COLS;
    BLOCK_H.value = H.value / ROWS;
    drawGrid();
  }``
});

//#endregion

//#region Video Config Dialog Handlers

const confirmVideoChange = async () => {
  // Update video URL
  youtubeUrl.value = `${newVideoUrl.value}?autoplay=1&controls=0&showinfo=0&modestbranding=1&mute=1`;

  // Reset dialog
  showVideoDialog.value = false;
  initYouTubePlayer();
};

const handleVideoChange = () => {
  if (originalPlayerState.value) {
    // Restore previous state after video loads
    onYouTubeIframeAPIReady = () => {
      if (originalPlayerState.value.playing === 1) {
        youtubePlayer.value.playVideo();
      }
      youtubePlayer.value.seekTo(originalPlayerState.value.currentTime);
      originalPlayerState.value = null;
    };
  }
};

function resetVideoSelection() {
    // Update video URL
    youtubeUrl.value = `${defaultYoutubeUrl.value}?autoplay=1&controls=0&showinfo=0&modestbranding=1&mute=1`;
    // Reset dialog
    showVideoDialog.value = false;
    newVideoUrl.value = youtubeUrl.value;
    initYouTubePlayer();
}

//#endregion
//#region Event Handlers

function playButtonClicked() {
    if (!gameStore.isPlay) {
        newGame();
    } else if (!gameStore.lose) {
        gameStore.intervalRender = setInterval( render, 30 );
        gameStore.interval = setInterval( () => gameStore.tick(gameStore), 400 );
    }
    disableInputArrows.value = false;
    if(playButtonEl.value) {
      playButtonEl.value.disabled = true;
    }
    if(pauseButtonEl.value) {
      pauseButtonEl.value.disabled = false;
    }
    if(resetButtonEl.value) {
      resetButtonEl.value.disabled = false;
    }


}

async function resetButtonClicked() {
    gameStore.clearAllIntervals(gameStore);
    ctx.value.clearRect( 0, 0, W, H );
    drawGrid();
    gameStore.isPlay = false;
    gameStore.lose = false;
    newGame();
    if(playButtonEl.value) {
      playButtonEl.value.disabled = true;
    }
    if(pauseButtonEl.value) {
      pauseButtonEl.value.disabled = false;
    }
    if(resetButtonEl.value) {
      resetButtonEl.value.disabled = false;
    }

}

function pauseButtonClicked() {

    if (gameStore.interval) {
      clearInterval(gameStore.interval);
      gameStore.interval = null;
    }

    if (gameStore.intervalRender) {
      clearInterval(gameStore.intervalRender);
      gameStore.intervalRender = null;
    }

    disableInputArrows.value = true;

    if(playButtonEl.value) {
      playButtonEl.value.disabled = false;
    }
    if(pauseButtonEl.value) {
      pauseButtonEl.value.disabled = true;
    }
}

function videoButtonClicked() {
  showVideoDialog.value = true;
}

function disableGridButtonClicked() {
  disableGrid.value = !disableGrid.value;
  if (disableGrid.value) {
    ctx.value.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
  } else {
    drawGrid();
  }
}

//#endregion
//#region Arrow Button Event Handlers

function leftButtonClicked() {
  gameStore.moveLeft(gameStore);
}

function downButtonClicked() {
  gameStore.moveDown(gameStore);
}

function upButtonClicked() {
  gameStore.moveUp(gameStore);
}

function rightButtonClicked() {
  gameStore.moveRight(gameStore);
}


//#endregion
//#region Life Cycle Hooks

onMounted(() => {
  window.onYouTubeIframeAPIReady = () => {
    youtubePlayer.value = new YT.Player(youtubeRef.value, {
      events: {
        'onStateChange': onPlayerStateChange,
        'onError': onError
      }
    });

    watch(
      () => gameStore.isPlay,
      (newValue) => {
        if (youtubePlayer.value) {
          if (newValue) {
            youtubePlayer.value.playVideo();
          } else {
            youtubePlayer.value.pauseVideo();
          }
        }
      }
    );
  };
});

//#endregion

</script>
<template>
  <div class="h-100">
    <div class="row">
      <div class="col">
        <div class="w-100 d-flex align-items-center justify-content-center">
          <br/>
          <br/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div style="width: 30%;"></div>
      </div>
      <div class="col">
        <div class="game-container">
          <div class="video-wrapper">
            <iframe
              ref="youtubeRef"
              class="youtube-background btn"
              :src="youtubeUrl"
              frameborder="0"
              loop="true"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <canvas
            ref="canvasEl"
            width='768'
            height='1024'
            class="game-canvas btn"
          ></canvas>
        </div>

      </div>
      <div class="col">
          <div style="width: 30%;"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="game-controls">
          <table style="width: 100%;">
            <tr>
              <td style="width: 40%;">
                 <button class="btn btn-sm" :disabled="disableInputArrows" @mousedown="leftButtonClicked"><ArrowBigLeft /></button>
                <button class="btn btn-sm" :disabled="disableInputArrows" @click="downButtonClicked"><ArrowBigDown /></button>
                <button class="btn btn-sm" :disabled="disableInputArrows" @click="upButtonClicked"><ArrowBigUp /></button>
                <button class="btn btn-sm" :disabled="disableInputArrows" @click="rightButtonClicked"><ArrowBigRight /></button>
              </td>
              <td><button class="btn btn-sm" ref="resetButtonEl" disabled="true" id="resetbutton" @click="resetButtonClicked"><RotateCcw /></button></td>
              <td><button class="btn btn-sm" ref="playButtonEl"  id="playbutton" @click="playButtonClicked"><Play /></button></td>
              <td><button class="btn btn-sm" ref="pauseButtonEl" disabled="true" id="pausebutton" @click="pauseButtonClicked"><Pause /></button></td>
              <td style="width: 40%;">
                <button class="btn btn-sm" ref="videoButtonEl" id="videobutton" :disabled="disableVideoButton" @click="videoButtonClicked"><Video /></button>
                <button class="btn btn-sm" ref="disableGridEl" id="disableGridButton" @click="disableGridButtonClicked">
                  <span v-if="disableGrid"><Grid2x2Plus /></span>
                  <span v-else>
                     <Grid2x2X />
                  </span>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
    <Dialog
    v-model:visible="showVideoDialog"
    header="Change Background Video"
    :modal="true"
    class="video-dialog"
  >
    <div class="dialog-content">
      <InputText
        v-model="newVideoUrl"
        placeholder="Enter YouTube video URL"
        class="mb-3"
      />

      <div class="preview-section">
        <iframe
          v-if="newVideoUrl"
          :src="`${newVideoUrl}?autoplay=1&controls=0&showinfo=0&modestbranding=1`"
          frameborder="0"
          allowfullscreen
          class="preview-frame"
        ></iframe>
      </div>

      <div class="dialog-buttons">
        <Button
          label="reset"
          class="btn btn-secondary"
          @click="resetVideoSelection"
          >

        </Button>
        <Button
          label="Cancel"
          @click="showVideoDialog = false"
          class="btn btn-secondary"
        ></Button>
        <Button
          label="Confirm"
          @click="confirmVideoChange"
          class="btn btn-primary"
        ></Button>
      </div>
    </div>
  </Dialog>
</template>
<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.3s ease;
  filter: blur(1px);
}

.youtube-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit:fill;
  opacity: 1; /* Adjust transparency */
  pointer-events: none;
}

.game-canvas {
  z-index: 2;
  background-color: transparent;
}

.game-controls {
    width: 100%;
    text-align: center;
    padding: .2rem;
    border-radius: 12px;
}

.game-control-button {
    width: 100%;
    height: 50px;
    display: block;
    margin: auto;
    margin-top: 10px;
    font-family: Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
    background-color: white;
    cursor: pointer;
    border-radius: 12px;
}

#resetbutton,
#pausebutton,
#playbutton,
#youtubebutton {
    width: 100% !important;
}

.video-dialog {
  max-width: 600px;
}

.preview-section {
  margin: 1rem 0;
}

.preview-frame {
  width: 100%;
  height: 200px;
  border-radius: 8px;
}

.dialog-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.video-change-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}


</style>
