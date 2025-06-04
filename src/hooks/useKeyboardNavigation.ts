import { useEffect } from 'react';

interface KeyboardNavigationOptions {
  onNext: () => void;
  onPrev: () => void;
  onFullscreen?: () => void;
}

export const useKeyboardNavigation = ({
  onNext,
  onPrev,
  onFullscreen
}: KeyboardNavigationOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          onNext();
          event.preventDefault();
          break;
        case 'ArrowLeft':
          onPrev();
          event.preventDefault();
          break;
        case 'f':
        case 'F':
          if (onFullscreen) {
            onFullscreen();
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrev, onFullscreen]);
};