import { useEffect } from 'react';
import { useBackgroundImage } from '../hooks/useBackgroundImage';

interface BackgroundProps {
  query: string;
  apiKey?: string;
  onLoad?: () => void;
}

const Background = ({ query, apiKey, onLoad }: BackgroundProps) => {
  const { imageUrl, isLoading } = useBackgroundImage(query, apiKey);

  useEffect(() => {
    if (!isLoading && onLoad) {
      onLoad();
    }
  }, [isLoading, onLoad]);

  if (!imageUrl) {
    return (
      <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-100 dark:bg-zinc-900 transition-colors duration-500" />
    );
  }

  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center transition-opacity duration-1000"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
};

export default Background;