const Input = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
