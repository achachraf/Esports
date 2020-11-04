import React, { useEffect, useState } from "react";
import { LEAGUES_PER_PAGE,TEAMS_PER_PAGE } from "../utils/constants";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  game,
  leagues,
  total
}) => {
  const handleClick = (e) => {
    setCurrentPage(parseInt(e.target.textContent));
  };

  const handleNext = (e) => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = (e) => {
    setCurrentPage(currentPage - 1);
  };

  const [number, setNumber] = useState(0);

  useEffect(()=>{
    console.log(total)
    if(total){
      setNumber(Math.ceil(total/TEAMS_PER_PAGE))
    }
  },[total])

  useEffect(() => {
    let ct = 0;
    console.log(game);
    if (leagues) {
      if (game === "All Games") {
        ct = leagues.length;
      } else {
        for (let league of leagues) {
          if (league.videogame.name === game) {
            ct++;
          }
        }
      }
      console.log(ct);
      setNumber(Math.ceil(ct / LEAGUES_PER_PAGE));
    }
  }, [leagues, game]);

  useEffect(()=>{
    console.log("number is:" + number)
  },[number])

  return (
    <div>
      {number !== 0 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={(currentPage == 1 ? "disabled " : "") + "page-item"}>
              <button onClick={handlePrev} className={"page-link"}>
                Previous
              </button>
            </li>
            {[...Array(number).keys()].map((elm) => {
              if (elm + 1 <= 4) {
                return (
                  <li
                    key={elm}
                    className={
                      (elm + 1 === currentPage ? "active " : "") + " page-item"
                    }
                  >
                    <button onClick={handleClick} className={"page-link"}>
                      {elm + 1}
                    </button>
                  </li>
                );
              }
            })}

            {currentPage > 4 && currentPage !== number && (
              <li className="active page-item">
                <button onClick={handleClick} className={"page-link"}>
                  {currentPage}
                </button>
              </li>
            )}

            {number > 5 && <li className="page-item mr-1 ml-1">...</li>}

            {number > 4 && (
              <li
                className={
                  (number === currentPage ? "active " : "") + " page-item"
                }
              >
                <button onClick={handleClick} className={"page-link"}>
                  {number}
                </button>
              </li>
            )}

            <li
              className={
                (currentPage == number ? "disabled " : "") + "page-item"
              }
            >
              <button onClick={handleNext} className="page-link">
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

{
  
}
