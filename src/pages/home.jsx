import { useNavigate } from 'react-router-dom'
import '@/styles/home.css'

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    setTimeout(() => { navigate('/login'); }, 500);
  };

  return (
    <div className="overlay">
      <div className='home-container'>
        <div className='game-title'>
          <h1>Arcade</h1>
          <h1>USO</h1>
        </div>
        <button className='start-button' onClick={handleStart}>
          TOCAR PARA COMENZAR
        </button>
      </div>
    </div>
  );
};

export default Home;
