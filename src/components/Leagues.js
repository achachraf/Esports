import React, { useState, useEffect } from "react";
import { LeagueLayout } from "../layouts/LeagueLayout";
import { Pagination } from "./Pagination";
import { LEAGUES_PER_PAGE, API_TOKEN,API } from "../utils/constants";

export const Leagues = ({
  leagues,
  setLeagues,
  game,
  number,
  setNumber,
  currentPage,
  setCurrentPage,
}) => {
  const [loading, setLoading] = useState(true);

  const [workingLeagues, setWorkingLeagues] = useState([]);

  useEffect(() => {
    console.log("working Leagues:");
    console.log(workingLeagues);
  }, [workingLeagues]);

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(
        `${API}/leagues?token=${API_TOKEN}`
      );
      const data = await response.json();
      setLeagues(data);
      setNumber(Math.ceil(data.length / LEAGUES_PER_PAGE));
    };
    if (setLeagues) {
      console.log("calling api...");
      callAPI();
      window.scrollTo(0, 0);
    }
  }, [setLeagues]);

  useEffect(() => {
    if (leagues && leagues.length > 0) {
      setLoading(false);
    }
  }, [leagues]);

  useEffect(() => {
    console.log(game);
    console.log(workingLeagues);
    if (game === "All Games") {
      setWorkingLeagues(
        leagues.slice(
          (currentPage - 1) * LEAGUES_PER_PAGE,
          currentPage * LEAGUES_PER_PAGE
        )
      );
    } else {
      setWorkingLeagues(
        leagues
          .filter((league) => league.videogame.name === game)
          .slice(
            (currentPage - 1) * LEAGUES_PER_PAGE,
            currentPage * LEAGUES_PER_PAGE
          )
      );
    }
  }, [game, loading, currentPage]);

  return (
    <div>
      <div className="container">
        {leagues &&
          leagues.length !== 0 &&
          number !== 0 &&
          workingLeagues.map((league,index) => {
            return (
              <LeagueLayout
                key={index}
                title={league.name}
                image={league.image_url}
                id={league.id}
              />
            );
          })}

        <div className="row justify-content-center mt-5">
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            number={number}
            leagues={leagues}
            game={game}
          />
        </div>
      </div>
    </div>
  );
};
