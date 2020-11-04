import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { SerieItem } from "../layouts/SerieItem";

const token = process.env.REACT_APP_API_TOKEN;

export const Team = ({ match }) => {
  const { id } = useParams();

  const [team, setTeam] = useState(null);

  useEffect(() => {
    console.log(id);
    const callAPI = async () => {
      const response = await fetch(
        `/api/teams/${id}?token=${token}`
      );
      if (response.status !== 200) {
        <Redirect to="/NotFound" />;
      } else {
        const data = await response.json();
        setTeam(data);
      }
    };
    callAPI();
  }, []);

  return (
    <div className="container text-center">
      {team && (
        <div>
          <img
            className="img-fuild mt-2"
            src={
              team.image_url
                ? team.image_url
                : "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
            }
            alt=""
            style={{maxHeight:"400px"}}
          />
          <h2 className="mt-4">{team.name}</h2>
          <h3 style={{ marginBottom: 50 }} className="mt-2">
            Game: {team.current_videogame.name}
          </h3>
          <hr></hr>
          <h4>Players 🎮 : </h4>
          <span style={{fontSize:20,fontWeight:"bold"}}>
            {team.players.length !== 0 && team.players.map((player,index)=>{
                return (<span className={index===0?"":"ml-4"}>{player.name}</span>)
            })}
          </span>
        </div>
      )}
    </div>
  );
};
