import React from 'react'
import { motion } from 'framer-motion'

interface ErrorMSGProps {
  error: string
  showError: boolean
}

const ErrorMSG: React.FC<ErrorMSGProps> = ({ error, showError }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showError ? 1 : 0 }}
      className='text-center font-bold text-sm mt-2 text-primary'
    >
      <p>{error}</p>
    </motion.div>
  )
}

export default ErrorMSG
