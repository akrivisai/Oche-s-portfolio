'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { EASE } from '@/lib/content';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'article';
  delay?: number;
  style?: CSSProperties;
};

export function Reveal({ children, className, as = 'div', delay = 0, style }: RevealProps) {
  const reduce = useReducedMotion();

  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE as unknown as number[], delay }}
    >
      {children}
    </MotionTag>
  );
}
