import styles from "./button.module.scss";

import ButtonProps from "./ButtonProps";

export default function Button({
  label,
  onClick,
  className = "",
  type = "button"
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${className}`}
    >
      {label}
    </button>
  );
}
