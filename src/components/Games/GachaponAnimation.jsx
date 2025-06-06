import { useState, useEffect, useCallback } from 'react';
import { getAllRewards } from "@/services/rewards"

const GachaponAnimation = ({ onUpdateCoins, onUpdateScore, onAnimationChange, onFinishAnimation }) => {
  const [animationState, setAnimationState] = useState("idle");
  const [currentReward, setCurrentReward] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const rewardsData = await getAllRewards();
        setRewards(rewardsData);
      } catch (error) {
        console.error("❌ Error obteniendo recompensas del Gachapon:", error);
      }
    };

    fetchRewards();
  }, []);

  useEffect(() => {
    if (onAnimationChange) {
      onAnimationChange(animationState, currentReward);
    }
  }, [animationState, currentReward, onAnimationChange]);

  const play = useCallback((currentCoins) => {
    if (currentCoins <= 0 || isPlaying || rewards.length === 0) {
      return false;
    }

    setIsPlaying(true);
    setAnimationState("inserting");
    onUpdateCoins(prev => prev - 1); // Restar una moneda al jugador

    setTimeout(() => {
      setAnimationState("showing");
      const reward = determineReward();
      setCurrentReward(reward.rarity);

      setTimeout(() => {
        setAnimationState("idle");
        setIsPlaying(false);
        if (onFinishAnimation) {
          onFinishAnimation(reward);
        }
      }, reward.duration);
    }, 900);

    return true;
  }, [isPlaying, rewards, onUpdateCoins, onFinishAnimation]);

  const determineReward = useCallback(() => {
    const rand = Math.random() * 100;
    let accumulated = 0;

    for (let r of rewards) {
      accumulated += r.chance;
      if (rand <= accumulated) return r;
    }
    return rewards[0];
  }, [rewards]);

  return {
    animationState,
    currentReward,
    play,
    isPlaying
  };
};

export default GachaponAnimation;
