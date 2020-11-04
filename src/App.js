import React, { useState } from "react";
import "./App.css";
import { Fragment } from "react";
import { Navbar } from "./layouts/Navbar";
import { Leagues } from "./components/Leagues";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { League } from "./components/League";
import { NotFound } from "./components/NotFound";
import { Teams } from "./components/Teams";
import { Team } from "./components/Team";

const App = () => {
  const [leagues, setLeagues] = useState([]);
  const [game, setGame] = useState("All Games");
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [number,setNumber] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  console.log(leagues)

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar
          leagues={leagues}
          game={game}
          setGame={setGame}
          setCurrentPage={setCurrentPage}
          />
        <Switch>
          <Route  exact path="/">
            <Redirect to="/leagues"/>
          </Route>
          <Route
            exact
            path="/leagues"
            render={() => (
              <Leagues
                leagues={leagues}
                setLeagues={setLeagues}
                game={game}
                setGame={setGame}
                number={number}
                setNumber={setNumber}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          />
          <Route exact path="/teams" component={Teams} />
          <Route exact path="/leagues/:id" children={<League />} />
          <Route exact path="/teams/:id" children={<Team />} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
