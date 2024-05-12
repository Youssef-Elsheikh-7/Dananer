import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);
function Loader() {
  return (
    <div
      className=""
      style={{ margin: "auto", width: "100%", textAlign: "center" }}
    >
      <lord-icon
        src="https://cdn.lordicon.com/iawrhwdo.json"
        trigger="loop"
        delay="200"
        colors="primary:#3874ff,secondary:#3874ff"
        style={{ width: "150px", height: "150px" }}
      ></lord-icon>
    </div>
  );
}

export default Loader;
