import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-yellow-100 focus:ring-yellow-500 placeholder:text-stone-400 w-28 rounded-full px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-2 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
