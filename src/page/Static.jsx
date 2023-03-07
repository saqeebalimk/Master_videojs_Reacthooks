import React from "react";
import { Link } from "react-router-dom";
import { Player } from "../components/Player";

const playerOptions = {
  sources: [
    {
      src: "https://vjs.zencdn.net/v/oceans.mp4"
    }
  ]
};

export function Static() {
  return (
    <div className="static">
      <h2>Static Video</h2>
      <Player playerOptions={playerOptions} />
      <br />
      <Link to="/">Back To Home</Link>
      
    </div>
  );
}
