import "/index.css";
import { ProjectContainer, ProjectCard_Section, nav } from "/src/common.js";
import { setupNavActive } from "/src/js/navActive.js";
import { App } from "./src/js/3DBubbles.js/3DApp.js";
import { Model } from "./src/js/3DBubbles.js/3DModel.js";
const app = document.getElementById("app");

const dimension = new App();
const model = new Model(dimension.scene);

setupNavActive();
// Arrow scroll behavior
const arrow = document.getElementById("scrollHint");
const projectSection = document.getElementById("projects");

arrow.addEventListener("click", () => {
  // Append content once (if not already)
  if (!projectSection.hasChildNodes()) {
    ProjectContainer.appendChild(ProjectCard_Section);
    projectSection.appendChild(ProjectContainer);
  }
});
