import "/index.css";
import { ProjectContainer, ProjectCard_Section, nav } from "/src/common.js";
import { setupNavActive } from "/src/js/navActive.js";



console.log(logo);

const app = document.getElementById("app");
app.appendChild(ProjectCard_Section);
// ProjectContainer.appendChild(ProjectCard_Section);
setupNavActive();
// app.appendChild(ProjectContainer);
