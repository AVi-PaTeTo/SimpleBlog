import { useState } from "react";
import filterIcon from "../assets/filter.png";
import riseIcon from "../assets/rise.png"
import fallIcon from "../assets/fall.png"

function SearchAndSort({ onFilterChange }) {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("+");
  const [popUpActive, setPopUpActive] = useState(false);
  const [activeButton, setActiveButton] = useState([
    { id: "ascending", active: true },
    { id: "descending", active: false },
  ]);

  const showPopUp = () => {
    setPopUpActive((prev) => !prev);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      onFilterChange(searchText ? `?search=${searchText}` : "");
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSortOrder = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    setActiveButton((prev) =>
      prev.map((button) => ({
        ...button,
        active: button.id === e.target.id,
      }))
    );
  };

  const applySortFilters = () => {
    const baseFilter = `?ordering=${sortOrder}${sortBy}`;
    const filterString = searchText ? `${baseFilter}&search=${searchText}` : baseFilter;
    onFilterChange(filterString);
    showPopUp();
  };

  return (
    <div className="search">
      <input
        onKeyDown={handleSearchEnter}
        onChange={handleChange}
        name="search-bar"
        type="text"
        value={searchText}
      />
      <div className="filter-dropdown">
        <button onClick={showPopUp}>
          Sort
          <img src={filterIcon} alt="" />
        </button>
        <div style={{ visibility: popUpActive ? "visible" : "hidden" }} className="sort-modal">
          <div className="sort-radio">
            <input
              checked={sortBy === "created_at"}
              type="radio"
              id="sort-date"
              name="sortOption"
              value="created_at"
              onChange={(e) => setSortBy(e.target.value)}
            />
            <label htmlFor="sort-date">Date</label>
          </div>
          <div className="sort-radio">
            <input
              checked={sortBy === "comment_count"}
              type="radio"
              id="sort-popularity"
              name="sortOption"
              value="comment_count"
              onChange={(e) => setSortBy(e.target.value)}
            />
            <label htmlFor="sort-popularity">Popularity</label>
          </div>
          <div className="sort-order">
            <button
              style={{ backgroundColor: activeButton[0].active ? "#836FFF" : "#d3d6db" }}
              onClick={handleSortOrder}
              value="+"
              id="ascending"
            >
              <img className="sort-order-img" src={riseIcon} alt="ascending" />
            </button>
            <button
              style={{ backgroundColor: activeButton[1].active ? "#836FFF" : "#d3d6db" }}
              onClick={handleSortOrder}
              value="-"
              id="descending"
            >
              <img className="sort-order-img" src={fallIcon} alt="descending" />
            </button>
          </div>
          <button onClick={applySortFilters} className="apply">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchAndSort;