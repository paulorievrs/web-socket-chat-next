import { RefObject } from "react";

type InputProps = {
  placeholder?: string;
  className?: string;
  inputValue?: string;
  value: string;
  setValue: (value: string) => void;
  error?: string;
};

export default InputProps;