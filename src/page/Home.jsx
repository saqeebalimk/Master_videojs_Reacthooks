import React from "react";
import { Link, generatePath } from "react-router-dom";
import ROUTES from "../routes.json";

export function Home() {
  return (
    <ul>
      <li>
        <Link to={ROUTES.STATIC}>Static Video</Link>
      </li>
      <li>
        <Link to={generatePath(ROUTES.DYNAMIC, { index: 0 })}>
          Dynamic Video
        </Link>
      </li>
      <li>
        <Link to={generatePath(ROUTES.DYNAMIC_WITH_API, { index: 0 })}>
          Dynamic Video With API Request
        </Link>
      </li>
    </ul>
  );
}
