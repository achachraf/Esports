import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Typography,
  Select,
  MenuItem,
  IconButton
} from "@material-ui/core";
import ToolBar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import "./navStyles.css";
import {SportsEsports} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  headerButtons: {
    color: "white",
    marginLeft: 20,
  },
}));

export const Navbar = ({
  leagues,
  setGame,
  game,
  setCurrentPage,
}) => {
  const classes = useStyles();

  const [games, setGames] = useState(["All Games"]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (leagues && leagues.length != 0) {
      setLoading(false);
    }
  }, [leagues]);

  useEffect(() => {
    let tempGames = ["All Games"];
    for (let league of leagues) {
      if (!tempGames.includes(league.videogame.name)) {
        tempGames = [...tempGames, league.videogame.name];
      }
    }
    setGames(tempGames);
  }, [loading]);

  const handleChange = (e) => {
    setGame(e.target.value);
    setCurrentPage(1)
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <SportsEsports />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            <Link to="/">E-Sports Demo</Link>
          </Typography>
          <div className="header-buttons">
            {games.length > 1 && (
              <Select
                className="menu-element"
                variant="outlined"
                id="selectMenu"
                onChange={handleChange}
                value={game}
              >
                {games.length > 1 &&
                  games.map((game, index) => (
                    <MenuItem key={index} value={game}>{game}</MenuItem>
                  ))}
              </Select>
            )}
            <Button variant="outlined" className="menu-element" color="inherit">
              <Link to="/teams">Teams</Link>
            </Button>
            <Button variant="outlined" className="menu-element" color="inherit">
              <Link to="/leagues">Leagues</Link>
            </Button>
          </div>
        </ToolBar>
      </AppBar>
    </div>
  );
};
