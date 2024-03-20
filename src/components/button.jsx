/**
 * Wrapper for the standard button with fancy styling.
 */
const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="mt-5 bg-primary p-3 shadow-xl hover:bg-white text-secondary"
    >
      {children}
    </button>
  );
};

export default Button;
