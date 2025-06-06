import { useState, useRef } from "react";
import { useSound } from "@/context/soundContext";
import { createAttempt } from "@/services/gachapon";
import { updateUser } from "@/services/api";
import GachaponInstructions from "@/components/PixelModal/instrucciones-gachapon";
import GachaponAnimation from "./GachaponAnimation";
import RecompensaModal from "@/components/PixelModal/custom-modal";

import clouds from "@/assets/gachapon/Nubes.gif";
import common from "@/assets/gachapon/Comun.gif";
import epic from "@/assets/gachapon/Epico.gif";
import legendary from "@/assets/gachapon/Legendario.gif";
import insertCoin from "@/assets/gachapon/Inserte Moneda.gif";
import coinInserted from "@/assets/gachapon/Moneda In.gif";

import styles from "./Gachapon.module.css";

const Gachapon = ({ user, setUser }) => {
  const { sounds } = useSound();
  const { click, coin } = sounds;
  const { comun, epico, legendario } = sounds;
  const [showInstructions, setShowInstructions] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const [recompensaActual, setRecompensaActual] = useState(null);
  const gachaMachineRef = useRef(null);

  const [coins, setCoins] = useState(user.uso_coins);
  const [score, setScore] = useState(user.daro_points);

  const handleAnimationChange = (state, reward) => {
    const gachaMachine = gachaMachineRef.current;
    if (!gachaMachine) return;

    switch (state) {
      case "inserting":
        gachaMachine.src = coinInserted;
        break;
      case "showing":
        let rarity = null;
        if (reward && typeof reward === "object" && reward.rarity) {
          rarity = reward.rarity;
        } else if (typeof reward === "string") {
          rarity = reward;
        }

        if (rarity) {
          switch (rarity.toLowerCase()) {
            case "common":
              comun.play();
              break;
            case "epic":
              epico.play();
              break;
            case "legendary":
              legendario.play();
              break;
            default:
              console.error("Rareza no encontrada:", rarity);
              break;
          }
          gachaMachine.src = getRewardGif(rarity);
        } else {
          console.error("Reward o reward.rarity es undefined o reward no es objeto:", reward);
        }
        break;
      default:
        gachaMachine.src = insertCoin;
        break;
    }
  };

  const handleFinishAnimation = async (reward) => {
    if (reward) {
      setRecompensaActual(reward);
      setShowReward(true);

      const newScore = score + reward.daro_points_value;
      setScore(newScore);

      // 🔥 Guardar intento en el backend
      try {
        await createAttempt({ id_user: user.id_user, id_reward: reward.id_reward });
        const updatedUser = await updateUser(user.id_user, { uso_coins: coins - 1, daro_points: newScore });
        setUser(updatedUser);
        setCoins(updatedUser.uso_coins);
      } catch (error) {
        console.error("❌ Error actualizando datos del usuario:", error);
      }
    }
  };

  const getRewardGif = (rarity) => {
    if (!rarity) return insertCoin;
    switch (rarity.toLowerCase()) {
      case "common": return common;
      case "epic": return epic;
      case "legendary": return legendary;
      default: return insertCoin;
    }
  };

  const { play, isPlaying } = GachaponAnimation({
    onUpdateCoins: setCoins,
    onUpdateScore: setScore,
    onAnimationChange: handleAnimationChange,
    onFinishAnimation: handleFinishAnimation
  });

  const handlePlay = () => {
    click.play();
    coin.play();
    play(coins);
  };

  const handleCloseModal = () => {
    setShowReward(false);
    setRecompensaActual(null);
  };

  return (
    <>
      <div className={styles.Content}>
        {showInstructions && (
          <GachaponInstructions onClose={() => setShowInstructions(false)} />
        )}

        <div className={styles.areaGachapon}>
          <img src={clouds} className={`${styles.nubes} ${styles.nubesIzquierda}`} alt="Nubes pixel" />
          <div className={styles.gachaponContainer}>
            <div className={styles.gachapon}>
              <img
                ref={gachaMachineRef}
                className={`${styles.gachaMachine} ${isPlaying ? styles.playing : ''}`}
                src={insertCoin}
                alt="Gachapon"
              />
              <button
                type="button"
                onClick={handlePlay}
                disabled={isPlaying || coins <= 0}
              >
                {isPlaying ? '...' : ' ¡ Usar USO Coins !'}
              </button>
            </div>
          </div>
          <img src={clouds} className={`${styles.nubes} ${styles.nubesDerecha}`} alt="Nubes pixel" />
        </div>

        {showReward && recompensaActual && (
          <RecompensaModal rarity={recompensaActual.rarity} points={recompensaActual.daro_points_value} onClose={handleCloseModal} />
        )}
      </div >
    </>
  );
};

export default Gachapon;