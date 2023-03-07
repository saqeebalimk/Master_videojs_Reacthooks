import React, { useState, useEffect } from "react";
import { Link, NavLink, generatePath } from "react-router-dom";
import { Player } from "../components/Player";
import playlist from "../playlist.json";
import ROUTES from "../routes.json";

import "videojs-plus/dist/plugins/unload";

const playerOptions = {};

const delay = ms => new Promise(_ => setTimeout(_, ms));

async function fakeApi(index) {
  await delay(2000);
  return playlist[index] ? playlist[index] : playlist[0];
}

export function DynamicWithApi({ match, history }) {
  const [player, setPlayer] = useState(null);
  const [video, setVideo] = useState(null);
  const index = Number(match.params.index);

  useEffect(() => {
    if (player) {
      player.unload({ loading: true });
      fakeApi(index).then(setVideo);
    }
  }, [player, index]);

  useEffect(() => {
    if (player && video) {
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
      <h2>Dynamic Video With API</h2>
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
              to={generatePath(ROUTES.DYNAMIC_WITH_API, { index })}
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
