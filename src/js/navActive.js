export function setupNavActive() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  const navItems = nav.querySelectorAll("li");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
}
