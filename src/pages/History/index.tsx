import { useSelector } from "react-redux";
import { RootState } from "../../libs/redux/store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function HistoryPage() {
  const fullHistory = useSelector(
    (state: RootState) => state.searchHistory.terms
  );
  const [displayedHistory, setDisplayedHistory] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    setDisplayedHistory(fullHistory.slice(0, itemsPerPage * page));
  }, [fullHistory, page]);

  const loadMoreHistory = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreHistory();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedHistory]);

  const handleHistoryItemClick = (term: string) => {
    navigate("/", { state: { term } });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Search History</h2>
      <ul className="mt-8 divide-y divide-gray-200">
        {displayedHistory.map((term, index) => (
          <li
            key={index}
            className="p-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleHistoryItemClick(term)}
          >
            {term}
          </li>
        ))}
      </ul>
      {page * itemsPerPage < fullHistory.length && (
        <button
          onClick={loadMoreHistory}
          className="w-full py-2 mt-4 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Load More
        </button>
      )}
    </div>
  );
}
