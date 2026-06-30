'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  const ringSpringConfig = { damping: 20, stiffness: 200 };
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(!!isClickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.body.classList.add('cursor-hidden');

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('cursor-hidden');
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.5 : isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: isPointer
              ? 'rgba(34, 197, 94, 0.9)'
              : 'rgba(56, 189, 248, 0.9)',
            boxShadow: isPointer
              ? '0 0 10px rgba(34, 197, 94, 0.8)'
              : '0 0 10px rgba(56, 189, 248, 0.8)',
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.8 : 1,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-8 h-8 rounded-full border"
          style={{
            borderColor: isPointer
              ? 'rgba(34, 197, 94, 0.5)'
              : 'rgba(56, 189, 248, 0.5)',
          }}
        />
      </motion.div>
    </>
  );
}
