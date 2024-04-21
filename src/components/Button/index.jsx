
const Button = ({ type = 'primary', size = 'medium', iconLeft, iconRight, children, onClick }) => {
  const buttonSizeClass =
    size === 'small' ? 'px-3 py-1 text-sm' : size === 'large' ? 'px-4 py-2 text-lg' : 'px-4 py-2 text-base';

  const buttonTypeClass = type === 'primary' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-500 text-white';

  return (
    <button
      className={`rounded-full flex items-center focus:outline-none focus:ring-2 py-2 px-4 focus:ring-${type === 'primary' ? 'blue' : 'gray'}-500 ${buttonSizeClass} ${buttonTypeClass}`}
      onClick={onClick}
    >
    {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;