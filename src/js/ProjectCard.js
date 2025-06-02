import { getDominantColor, rgbToRgba } from "./utils.js";

class ProjectCard {
  #dom;
  #projectList = [];

  constructor(items) {
    this.#projectList = items;
    this.#build();
  }

  #build() {
    this.#dom = document.createElement("div");
    this.#dom.classList.add("card_grid");
    this.#projectList.forEach((element) => {
      this.#dom.appendChild(new ProjectCardItem(element).dom);
    });
  }

  get dom() {
    return this.#dom;
  }
}

class ProjectCardItem {
  #dom;
  #ItemDetails = [];

  constructor(item) {
    this.#ItemDetails = item;
    this.#build();
  }

  async #build() {
    this.#dom = document.createElement("div");
    this.#dom.classList.add("card");

    // Set background image styles
    this.#dom.style.backgroundImage = `url(${this.#ItemDetails.img_src})`;
    this.#dom.style.backgroundSize = "cover";
    this.#dom.style.backgroundPosition = "center";
    this.#dom.style.backgroundRepeat = "no-repeat";

    // Title section
    this.#dom.innerHTML = `
    <div class="title_top">
      <div class="title_list">
        <h2>${this.#ItemDetails.title}</h2>
      </div>
    </div>
  `;

    // Create icon_list div dynamically
    const iconListDiv = document.createElement("div");
    iconListDiv.classList.add("icon_list");

    this.#ItemDetails.icons.forEach((iconObj) => {
      const iconUrl = document.createElement("a");
      iconUrl.href = iconObj.web_url; // link URL

      iconUrl.target = "_blank"; // open in new tab (optional)
      iconUrl.rel = "noopener noreferrer"; // security best practice

      const iconEl = document.createElement("i");
      iconObj.icon_class_list.forEach((cls) => iconEl.classList.add(cls));

      iconUrl.appendChild(iconEl);
      iconListDiv.appendChild(iconUrl);
    });

    // Append icon_list to icon_bottom div
    const iconBottomDiv = document.createElement("div");
    iconBottomDiv.classList.add("icon_bottom");
    iconBottomDiv.appendChild(iconListDiv);

    this.#dom.appendChild(iconBottomDiv);

    // Get dominant color from the background image and set hover shadow
    try {
      const dominantColor = await getDominantColor(this.#ItemDetails.img_src);
      const shadowColor = rgbToRgba(dominantColor, 0.5); // 50% opacity

      this.#dom.style.transition = "box-shadow 0.3s ease";

      this.#dom.addEventListener("mouseenter", () => {
        this.#dom.style.boxShadow = `0 0 25px 5px ${shadowColor}`;
      });
      this.#dom.addEventListener("mouseleave", () => {
        this.#dom.style.boxShadow = "none";
      });
    } catch (e) {
      console.warn("Could not load image for dominant color", e);
    }
  }

  get dom() {
    return this.#dom;
  }
}

export { ProjectCard };
