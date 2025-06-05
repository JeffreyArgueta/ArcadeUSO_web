import { useEffect, useState } from "react";
import { useSound } from "@/context/soundContext";
import soundOn from "@/assets/sound_on.png";
import soundOff from "@/assets/sound_off.png";
import styles from "./VolumeControl.module.css";

const VolumeControl = ({ className=`${styles.volumeControl}` }) => {
  const { sounds, isMuted, toggleMute, addListener, removeListener } = useSound();
  const { volumeAlert } = sounds;
  const [muted, setMuted] = useState(isMuted);

  useEffect(() => {
    const handleMuteChange = (mutedState) => {
      setMuted(mutedState);
    };

    addListener(handleMuteChange);
    return () => {
      removeListener(handleMuteChange);
    };
  }, [addListener, removeListener]);

  const handleVolumeClick = () => {
    toggleMute();
    volumeAlert.play();
  };

  return (
    <img
      className={className}
      src={muted ? soundOff : soundOn}
      alt="Volumen Control"
      onClick={handleVolumeClick}
    />
  );
};

export default VolumeControl;
