import React, { useState, useEffect } from "react";
import { LeagueLayout } from "../layouts/LeagueLayout";
import { TeamItem } from "../layouts/TeamItem";
import { Pagination } from "./Pagination";
import {API,API_TOKEN,TEAMS_PER_PAGE} from "../utils/constants"

// const token = process.env.REACT_APP_API_TOKEN;

export const Teams = () => {

  const [teams, setTeams] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [number,setNumber] = useState(0)

  // let total = null;

  const [total,setTotal] = useState(null)

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(
        `${API}/codmw/teams?page[size]=${TEAMS_PER_PAGE}&page[number]=${currentPage}&token=${API_TOKEN}`
      );
      if(total === null){
        setTotal(response.headers.get("x-total"))
        console.log(total);
      }
      const data = await response.json();
      console.log(data);
      setTeams(data);
    };
    // setTeams()
    callAPI();
    window.scrollTo(0,0);
  }, [currentPage]);


  useEffect(()=>{
    console.log(teams)
  },[teams])

  // useEffect(()=>{
  //   const callAPI = async ()=>{
  //       const response = await fetch(
  //           `${API}/teams?token=${token}`
  //         );
  //       const data = await response.json();
  //       console.log(data)
  //       console.log(Math.ceil(data.length/LEAGUE_PER_PAGE))
  //       setNumber(Math.ceil(data.length/LEAGUE_PER_PAGE));
  //   }
  //   callAPI()
  // },[])

  return (
    <div>
      <div className="container">
        {teams.length !== 0  &&
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
          <Pagination 
          setCurrentPage={setCurrentPage} 
          currentPage={currentPage} 
          total={total} />
        </div>
      </div>
    </div>
  );
};

