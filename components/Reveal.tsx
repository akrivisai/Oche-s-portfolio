'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/content';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'article';
  delay?: number;
};

export function Reveal({ children, className, as = 'div', delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE as unknown as number[], delay }}
    >
      {children}
    </MotionTag>
  );
}
