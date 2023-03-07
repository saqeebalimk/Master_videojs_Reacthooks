import React, { useState, useEffect } from "react";
import { Link, NavLink, generatePath } from "react-router-dom";
import { Player } from "../components/Player";
import playlist from "../playlist.json";
import ROUTES from "../routes.json";

const playerOptions = {};

export function Dynamic({ match, history }) {
  const [player, setPlayer] = useState(null);
  const index = Number(match.params.index);
  const video = playlist[index];

  useEffect(() => {
    if (player) {
      player.src(video.sources);
    }
  }, [video, player]);

  // auto play next
  useEffect(() => {
    if (player) {
      const onPlayerEnded = () => {
        let nextIndex = index + 1;
        if (!playlist[nextIndex]) {
          nextIndex = 0;
        }

        history.replace(generatePath(ROUTES.DYNAMIC, { index: nextIndex }));
      };

      player.on("ended", onPlayerEnded);

      return () => {
        player.off("ended", onPlayerEnded);
      };
    }
  }, [player, index, history]);

  return (
    <div className="dynamic">
      <br />
      <h2>Dynamic Video </h2>
      <Player
        playerOptions={playerOptions}
        onPlayerInit={setPlayer}
        onPlayerDispose={setPlayer}
      />
      <br />
      <Link to="/">Back To Home</Link>
      
      <div
        style={{
          marginTop: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <h4 style={{ margin: "0 10px 0 0" }}>Click to switch video:</h4>
        <div className="playlist">
          {playlist.map(({ title }, index) => (
            <NavLink
              exact
              to={generatePath(ROUTES.DYNAMIC, { index })}
              style={{ marginRight: 5 }}
              key={title}
            >
              {index}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
