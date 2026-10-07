const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`mt-5 bg-primary p-3 shadow-xl hover:bg-white text-secondary ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
