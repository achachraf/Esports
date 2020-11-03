import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { SerieItem } from "../layouts/SerieItem";

const token = process.env.REACT_APP_API_TOKEN;

export const League = ({ match }) => {
  const { id } = useParams();

  const [league, setLeague] = useState(null);

  const [redirect,setRedirect] = useState(false)

  useEffect(() => {
    console.log(id);
    const callAPI = async () => {
      const response = await fetch(
        `https://api.pandascore.co/leagues/${id}?token=${token}`
      );
      console.log(response)
      if (response.status != 200) {
        setRedirect(true)
      } else {
        const data = await response.json();
        setLeague(data);
      }
    };
    callAPI();
  }, []);
  
  
  return (
    <div className="container text-center">
      {redirect && <Redirect to="/404" />}
      {league && (
        <div>
          <img
            className="img-fuild mt-2"
            src={
              league.image_url
                ? league.image_url
                : "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
            }
            alt=""
            style={{maxHeight:"400px"}}
          />
          <h2 className="mt-4">{league.name}</h2>
          <h3 style={{ marginBottom: 50 }} className="mt-2">
            {league.videogame.name}
          </h3>
          <hr></hr>
          {league.series.length !== 0 &&
            league.series.map((serie) => {
              return (
                <SerieItem
                  fullName={serie.full_name}
                  beginAt={serie.begin_at}
                  winnerId={serie.winner_id}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};
