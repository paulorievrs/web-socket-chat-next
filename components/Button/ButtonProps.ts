type ButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default ButtonProps;