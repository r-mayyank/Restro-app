'use client'

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedFormContainerProps {
  children: ReactNode;
  step: number;
}

export function AnimatedFormContainer({ children, step }: AnimatedFormContainerProps) {
  return (
    <AnimatePresence>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

