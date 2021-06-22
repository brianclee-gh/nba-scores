import axios from "axios";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Scoreboard() {

  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [date, setDate] = useState(new Date());

  const displayToday = games.map((game) =>
    <li key={game.id} id={game.id} className="game-card">
      <p>{game.home_team.abbreviation}: {game.home_team_score}</p>
      <p>{game.visitor_team.abbreviation}: {game.visitor_team_score}</p>
    </li>
  );

  const changeDate = (day) => {
    if (day === 'yesterday') {
      setDate(new Date(date.setDate(date.getDate() - 1)));
    }

    if (day === 'tomorrow') {
      setDate(new Date(date.setDate(date.getDate() + 1)));
    }

  };

  const formatDateString = (date) => {
    return date.toDateString();
  };

  const formatISODate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  useEffect(() => {

    const options = {
      method: 'GET',
      gamesUrl: 'https://www.balldontlie.io/api/v1/games?dates[]=',
      teamsUrl: 'https://www.balldontlie.io/api/v1/teams'
    };

    const getData = () => {
      const isoDate = formatISODate(date);

      axios.get(options.gamesUrl + isoDate).then(function (response) {
        setGames((response.data.data))
      }).catch(function (error) {
        return(error);
      });

      axios.get(options.teamsUrl).then(function (response) {
        setTeams((response.data.data))
        console.log(response.data.data)
      }).catch(function (error) {
        return(error);
      })
    };

    getData();

  }, [date])


  return (
    <div className="main">
      <div id="score-header">

        <div id="btns">
          <button className="btn" onClick={() => changeDate('yesterday')} id="yesterday">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div id="date">{formatDateString(date)}</div>
          <button className="btn" onClick={() => changeDate('tomorrow')} id="tomorrow">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <ul id="scores">
        {displayToday
          ? displayToday
          : "Loading..."}
      </ul>
    </div>
  )
}

export default Scoreboard