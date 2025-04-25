import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'text-sm bg-yellow-400 focus:ring-yellow-300 focus:bg-yellow-300 hover:bg-yellow-300 text-stone-800 inline-block rounded-full text-lg font-semibold uppercase tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed ';
  const styles = {
    primary: base + 'px-4 py-3 md:px-6 md:py-4',
    small: base + 'px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + 'px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    secondary:
      'text-sm border-2 border-stone-300 focus:ring-yellow-300 focus:bg-yellow-300 hover:bg-stone-300 text-stone-400 inline-block rounded-full  text-lg font-semibold uppercase tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed hover:text-stone-800 focus:text-stone-800 px-4 py-2.5 md:px-6 md:py-3.5',
  };
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );
  }
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
