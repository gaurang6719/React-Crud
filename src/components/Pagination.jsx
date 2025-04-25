import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  itemPerPage,
  setItemPerPage,
  filteredData,
  isSelectedOpen,
  setIsSelectedOpen,
}) => {
  return (
    <div className="pagination-wrapper">
      <div className="select-box">
        <select
          name="items"
          id=""
          value={itemPerPage}
          onChange={(e) => {
            const value =
              e.target.value === "all"
                ? filteredData.length
                : parseInt(e.target.value);
            setItemPerPage(value);
            handlePageChange(1); // Reset to first page
          }}
          onClick={() => setIsSelectedOpen(!isSelectedOpen)}
        >
          <option value="10">10 RECORD PER PAGE</option>
          <option value="20">20 RECORD PER PAGE</option>
          <option value="40">40 RECORD PER PAGE</option>
        </select>
        {isSelectedOpen ? (
          <div className="chevron">
            <ChevronUp />
          </div>
        ) : (
          <div className="chevron">
            <ChevronDown />
          </div>
        )}
      </div>

      <div className="pagination">
        <button
          className="btn prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn page-number ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="rotate" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
