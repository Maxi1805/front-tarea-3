import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import Chat from './components/Chat';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [backURL, setBackURL] = useState('https://back-tarea-3.onrender.com');

  useEffect(() => {
    const maxAttemptsDuration = 60000;
    let startTime = Date.now();
  
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
  
      if (elapsed >= maxAttemptsDuration) {
        setBackURL('https://back-tarea-3-production.up.railway.app');
        setIsConnected(true);
        clearInterval(intervalId);
        return;
      }
  
      if (!isConnected) {
        fetch('https://back-tarea-3.onrender.com')
          .then(() => {
            setIsConnected(true);
            clearInterval(intervalId);
          })
          .catch(() => setIsConnected(false));
      }
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, [isConnected]);
  
  

  return (
    <div className="bg-gray-100 flex w-screen h-screen">
      <div className="w-3/4 min-h-screen p-8 overflow-scroll">
        <MovieList selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
      </div>
      <div className="w-1/4 bg-gray-200 min-h-screen">
        <Chat selectedMovie={selectedMovie} isConnected={isConnected} backURL={backURL} />
      </div>
    </div>
  );
}

export default App;
