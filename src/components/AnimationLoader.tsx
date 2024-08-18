import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedLoader = ({
  isLoading,
  loadingContent,
  children,
  className = '',
}: {
    isLoading: boolean;
    loadingContent: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        {!isLoading ? (
          <motion.div
            key="content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center justify-center"
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="loader"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center justify-center"
          >
            {loadingContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedLoader;