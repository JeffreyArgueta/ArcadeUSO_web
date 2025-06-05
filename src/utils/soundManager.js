import { Howl } from "howler";

const buttonSound = new Howl({
  src: ["/sounds/button-click.mp3"],
  volume: 0.6,
  preload: true,
});

const backgroundMusic = new Howl({
  src: ["/sounds/8-bit-loop-189494.mp3"],
  volume: 0.3,
  loop: true,
  preload: true,
});

export const playButtonSound = () => {
  buttonSound.play();
};

export const playBackgroundMusic = () => {
  if (!backgroundMusic.playing()) {
    backgroundMusic.play();
  }
};

export const stopBackgroundMusic = () => {
  backgroundMusic.stop();
};
