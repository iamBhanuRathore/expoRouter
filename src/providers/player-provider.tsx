import React, { createContext, useContext, useEffect, useState } from "react";

type PlayerContextType = {
  currentTrack: any;
  setCurrentTrack: React.Dispatch<React.SetStateAction<any>>;
};
const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => useContext<PlayerContextType>(PlayerContext);

const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};
export default PlayerProvider;
