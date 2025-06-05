import PropTypes from "prop-types";
import { handleClose } from "@/utils/handleClose";
import { useNicknameForm } from "@/hooks/useNicknameForm";
import Modal from "@/components/Modal";
import Notification from "@/components/Notification";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import styles from "./Nickname.module.css";

const Nickname = ({ user, setUser, isNicknameUpdated, setIsNicknameUpdated, switchToDashboard }) => {

  const { formData, errors, loading, showNotification, setShowNotification, handleChange, handleSubmit } =
    useNicknameForm(user, setUser, setIsNicknameUpdated, switchToDashboard);

  return (
    <>
      {
        showNotification &&
        <Notification
          message={`¡Bienvenido ${user.username}!`}
          type="success"
          onClose={() => setShowNotification(false)}
        />
      }
      <Modal title="¿Estás listo para dejar tu marca?" onClose={() => handleClose()} disabled={true} >
        <p className={styles.paragraph}>
          No eres un número. <span className={styles.arcadeUso}>ArcadeUSO</span> espera conocer tu identidad.
        </p>
        <form className={styles.NicknameForm} onSubmit={handleSubmit}>
          <InputField
            label="Nickname"
            type="text"
            name="username"
            autocomplete="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="3 a 12 caracteres"
          />
          {errors.username && <span className={styles.errorMessage}>{errors.username}</span>}

          <Button text={loading ? "Generando identidad en ArcadeUSO..." : "¡Listo para jugar!"} type="submit" onClick={handleSubmit} disabled={isNicknameUpdated} />
        </form>
      </Modal>
    </>
  );
};

Nickname.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  isNicknameUpdated: PropTypes.bool.isRequired,
  setIsNicknameUpdated: PropTypes.func.isRequired,
  switchToDashboard: PropTypes.func.isRequired,
};

export default Nickname;
