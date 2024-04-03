import { Audio } from "expo-av";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PlayerContextType = {
  currentTrack: any;
  setCurrentTrack: React.Dispatch<React.SetStateAction<any>>;
  currrentPlayList: any[];
  setCurrentPlayList: React.Dispatch<React.SetStateAction<any[]>>;
  playSong: (params: any, index: number) => Promise<void>;
  pauseSong: () => void;
  resumeSong: () => void;
  stopSong: () => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
};
const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => useContext<PlayerContextType>(PlayerContext);

const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currrentPlayList, setCurrentPlayList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const soundRef = useRef<Audio.Sound | null>(null);
  useEffect(() => {
    // Clean up audio when component unmounts
    return () => {
      stopSong();
    };
  }, []);

  const playSong = async (track: any, index: number) => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });

      const previewUrl = track?.track?.preview_url;
      const { sound } = await Audio.Sound.createAsync(
        { uri: previewUrl },
        { shouldPlay: true, isLooping: false }
      );
      soundRef.current = sound;
      setCurrentTrack(track);
      setCurrentIndex(index);
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const pauseSong = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
    }
  };

  const resumeSong = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
    }
  };

  const stopSong = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      soundRef.current.unloadAsync();
      soundRef.current = null;
      setCurrentTrack(null);
    }
  };
  const playNextSong = () => {
    if (currentIndex < currrentPlayList.length - 1) {
      playSong(currrentPlayList[currentIndex + 1], currentIndex + 1);
    }
  };

  const playPreviousSong = () => {
    if (currentIndex > 0) {
      playSong(currrentPlayList[currentIndex - 1], currentIndex - 1);
    }
  };
  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        currrentPlayList,
        setCurrentPlayList,
        playSong,
        pauseSong,
        resumeSong,
        stopSong,
        playNextSong,
        playPreviousSong,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
export default PlayerProvider;
