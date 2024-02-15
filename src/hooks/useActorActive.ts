import { useState, useEffect } from 'react';

const useActivityDetector = (inactiveDuration: number = 5000): boolean => {
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const handleActivity = () => {
      setIsActive(true);
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => setIsActive(false), inactiveDuration);
    };

    // Add event listeners for user activity
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keydown', handleActivity);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      clearTimeout(inactivityTimer);
    };
  }, [inactiveDuration]);

  return isActive;
};

export default useActivityDetector;
