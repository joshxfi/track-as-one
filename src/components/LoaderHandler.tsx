import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import Loader from './Loader';

interface LoaderProps {
  children: React.ReactNode;
}

const LoaderHandler: React.FC<LoaderProps> = ({ children }) => {
  const { loading } = useAuth();

  return <AnimatePresence>{loading ? <Loader /> : children}</AnimatePresence>;
};

export default LoaderHandler;
