import type { SpringOptions } from 'motion/react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Image from 'next/image';

interface TiltedImageProps {
  src: string;
  alt: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedImage({
  src,
  alt,
  rotateAmplitude = 12,
  scaleOnHover = 1.08
}: TiltedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={ref}
      className="relative w-full h-full [perspective:1000px]"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{
          rotateX,
          rotateY,
          scale
        }}
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}