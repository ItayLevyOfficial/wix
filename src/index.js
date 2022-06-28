import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Gallery } from "./gallery/Gallery.view";
import { ImageFinder } from "./gallery/ImageFinder";
import { initiateTest } from "./testframework/javascript/TestManager";

// Create a global instance for ImageFinder
const imageFinder = new ImageFinder();
window.imageFinder = imageFinder;

ReactDOM.render(
  <Gallery imageFinder={imageFinder} />,
  document.getElementById("root"),
  () => {
    initiateTest();
  }
);
