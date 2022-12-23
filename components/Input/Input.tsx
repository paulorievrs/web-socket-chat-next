import InputProps from "./InputProps";
import style from "./input.module.scss";

export default function Input({
  placeholder,
  className = "",
  value,
  setValue,
  error
}: InputProps) {
  return (
    <div className={`${style.inputWrapper} ${className}`}>
      <input
        className={style.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <small className={style.error}>{error}</small>}
    </div>
  );
}
