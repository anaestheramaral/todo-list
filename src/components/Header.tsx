import Logo from "../assets/Logo.svg";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.logo}>
      <img src={Logo} alt="todo" />
    </div>
  )
}