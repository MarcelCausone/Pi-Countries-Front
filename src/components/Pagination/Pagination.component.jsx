import "./pagination.css";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const next = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
      // Desplázate al principio de la página
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      // Desplázate al principio de la página
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-around" }}
        className="pagination-container"
      >
        <h3 className="pagination-button prev" onClick={prev}>
          Prev
        </h3>
        <h3>
          {currentPage} / {nPages}
        </h3>
        <h3 className="pagination-button next" onClick={next}>
          Next
        </h3>
      </div>
    </>
  );
};

export default Pagination;
