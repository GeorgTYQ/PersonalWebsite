import { ProjectCard } from "./js/ProjectCard";
import { setupNavActive } from "./js/navActive";
import data from "../data/data.json";

// Navigation Bar
export const nav = document.querySelector("nav");
export const logo = nav.document.querySelector(".logo");



export const ProjectContainer = document.querySelector(".container");
export const ProjectCard_Section = new ProjectCard(data.profile_cards).dom;
