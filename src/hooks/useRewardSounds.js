import { useSound } from "../context/soundContext.jsx";

export const useRewardSounds = () => {
  const { playComplexSound, stopCurrentReward } = useSound();
  
  return {
    playCommon: () => playComplexSound('comun'),
    playEpic: () => playComplexSound('epico'),
    playLegendary: () => playComplexSound('legendario'),
    stopCurrentReward
  };
};