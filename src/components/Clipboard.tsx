import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Clipboard = ({ copied }: { copied: boolean }) => {
  return (
    <AnimatePresence>
      {copied && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='mt-4 font-bold'
        >
          copied to clipboard!
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export default Clipboard
