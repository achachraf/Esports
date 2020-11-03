import React, { useState, useEffect } from "react";
import { LeagueLayout } from "../layouts/LeagueLayout";
import { TeamItem } from "../layouts/TeamItem";
import { Pagination } from "./Pagination";

const token = process.env.REACT_APP_API_TOKEN;

export const Teams = () => {

  const [teams, setTeams] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [number,setNumber] = useState(0)

  const LEAGUE_PER_PAGE = 4;

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(
        `https://api.pandascore.co/codmw/teams?page[size]=${LEAGUE_PER_PAGE}&page[number]=${currentPage}&token=${token}`
      );
      const data = await response.json();
      setTeams(data);
    };
    // setTeams()
    callAPI();
    window.scrollTo(0,0);
  }, [currentPage]);

  useEffect(()=>{
    const callAPI = async ()=>{
        const response = await fetch(
            `/api/teams?token=${token}`
          );
        const data = await response.json();
        console.log(data)
        console.log(Math.ceil(data.length/LEAGUE_PER_PAGE))
        setNumber(Math.ceil(data.length/LEAGUE_PER_PAGE));
    }
    callAPI()
  },[])

  return (
    <div>
      <div className="container">
        {teams.length !== 0 && number!==0 &&
          teams.map((team) => {
            return (
              <TeamItem
                name={team.name}
                image={team.image_url}
                id={team.id}
              />
            );
          })}

        <div className="row justify-content-center mt-5">
          <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} number={number} />
        </div>
      </div>
    </div>
  );
};

