import * as React from 'react';
import range from 'lodash/range';

import useStyles, { IParticle, IStyleClasses } from './styles';

const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
const SIZE = 12; // max height for particle rectangles, diameter for particle circles
const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
const PARTICLE_COUNT = 150;
const DURATION = 3500;
const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];
const TEXTS = [''];
const IMAGES = [''];
const ONLY_CIRCLES = false;
const FADE_OUT = false;

interface IConfetti {
  particleCount?: number;
  duration?: number;
  colors?: string[];
  images?: string[];
  texts?: string[];
  particleSize?: number;
  force?: number;
  floorHeight?: number;
  floorWidth?: number;
  onlyCircles?: boolean;
  fadeOut?: boolean;
}

const createParticles = (count: number, colors: string[], images: string[], texts: string[]): IParticle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    color: colors[index % colors.length],
    degree: increment * index,
    image: images[index % images.length],
    text: texts[index % texts.length]
  }));
};

function ConfettiExplosion({
  particleCount = PARTICLE_COUNT,
  duration = DURATION,
  colors = COLORS,
  images = IMAGES,
  texts = TEXTS,
  particleSize = SIZE,
  force = FORCE,
  floorHeight = FLOOR_HEIGHT,
  floorWidth = FLOOR_WIDTH,
  onlyCircles = ONLY_CIRCLES,
  fadeOut = FADE_OUT
}: IConfetti) {
  const particles = createParticles(particleCount, colors, images, texts);
  const classes: IStyleClasses = useStyles({
    particles,
    duration,
    particleSize,
    force,
    floorWidth,
    floorHeight,
    onlyCircles,
    fadeOut
  })();

  return (
    <div className={classes.container}>
      {particles.map((particle, i) => (
        <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
          <div className={classes.particleSize}>{particle.text}</div>
        </div>
      ))}
    </div>
  );
}

export default ConfettiExplosion;
