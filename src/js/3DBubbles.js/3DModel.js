// model.js
import * as THREE from "three";

export class Model {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.spheres = [];
    this.tempVector = new THREE.Vector3();

    const { radii: visibleRadii, positions: visiblePositions } =
      getResponsiveBubbles();

    this.radii = visibleRadii;
    this.positions = visiblePositions;

    // Then use `visibleRadii` and `visiblePositions` to create your bubbles

    this.material = new THREE.MeshLambertMaterial({
      color: "#d5bdaf",
    });

    this.initSpheres();
  }

  initSpheres() {
    this.positions.forEach((pos, index) => {
      const radius = this.radii[index];
      const geometry = new THREE.SphereGeometry(radius, 16, 16);
      const sphere = new THREE.Mesh(geometry, this.material);
      sphere.position.set(pos.x, -25, pos.z); // Start below screen
      sphere.userData = { originalPosition: { ...pos }, radius };
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      this.spheres.push(sphere);
      this.group.add(sphere);
    });

    this.scene.add(this.group);
  }

  getSpheres() {
    return this.spheres;
  }

  getGroup() {
    return this.group;
  }
}

function getResponsiveBubbles() {
  const radii = [
    1, 0.6, 0.8, 0.4, 0.9, 0.7, 0.9, 0.3, 0.2, 0.5, 0.6, 0.4, 0.5, 0.6, 0.7,
    0.3, 0.4, 0.8, 0.7, 0.5, 0.4, 0.6, 0.35, 0.38, 0.9,

    0.3, 0.6, 0.4, 0.2, 0.35, 0.5, 0.15, 0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8,
    0.7, 0.8, 0.3, 0.5, 0.6, 0.55, 0.42, 0.75, 0.66, 0.6, 0.7, 0.5, 0.6, 0.35,
    0.35, 0.35, 0.8, 0.6, 0.7, 0.8, 0.4, 0.89, 0.3,

    0.3, 0.6, 0.4, 0.2, 0.52, 0.5, 0.15, 0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8,
    0.7, 0.8, 0.3, 0.5, 0.6, 0.8, 0.7, 0.75, 0.66, 0.6, 0.7, 0.5, 0.6, 0.35,
    0.35, 0.35, 0.8, 0.6, 0.7, 0.8, 0.4, 0.89, 0.3,
  ];

  const positions = [
    { x: 0, y: 0, z: 0 },
    { x: 1.2, y: 0.9, z: -0.5 },
    { x: 1.8, y: -0.3, z: 0 },
    { x: -1, y: -1, z: 0 },
    { x: -1, y: 1.62, z: 0 },
    { x: -1.65, y: 0, z: -0.4 },
    { x: -2.13, y: -1.54, z: -0.4 },
    { x: 0.8, y: 0.94, z: 0.3 },
    { x: 0.5, y: -1, z: 1.2 },
    { x: -0.16, y: -1.2, z: 0.9 },
    { x: 1.5, y: 1.2, z: 0.8 },
    { x: 0.5, y: -1.58, z: 1.4 },
    { x: -1.5, y: 1, z: 1.15 },
    { x: -1.5, y: -1.5, z: 0.99 },
    { x: -1.5, y: -1.5, z: -1.9 },
    { x: 1.85, y: 0.8, z: 0.05 },
    { x: 1.5, y: -1.2, z: -0.75 },
    { x: 0.9, y: -1.62, z: 0.22 },
    { x: 0.45, y: 2, z: 0.65 },
    { x: 2.5, y: 1.22, z: -0.2 },
    { x: 2.35, y: 0.7, z: 0.55 },
    { x: -1.8, y: -0.35, z: 0.85 },
    { x: -1.02, y: 0.2, z: 0.9 },
    { x: 0.2, y: 1, z: 1 },
    { x: -2.88, y: 0.7, z: 1 },

    { x: -2, y: -0.95, z: 1.5 },
    { x: -2.3, y: 2.4, z: -0.1 },
    { x: -2.5, y: 1.9, z: 1.2 },
    { x: -1.8, y: 0.37, z: 1.2 },
    { x: -2.4, y: 1.42, z: 0.05 },
    { x: -2.72, y: -0.9, z: 1.1 },
    { x: -1.8, y: -1.34, z: 1.67 },
    { x: -1.6, y: 1.66, z: 0.91 },
    { x: -2.8, y: 1.58, z: 1.69 },
    { x: -2.97, y: 2.3, z: 0.65 },
    { x: 1.1, y: -0.2, z: -1.45 },
    { x: -4, y: 1.78, z: 0.38 },
    { x: 0.12, y: 1.4, z: -1.29 },
    { x: -1.64, y: 1.4, z: -1.79 },
    { x: -3.5, y: -0.58, z: 0.1 },
    { x: -0.1, y: -1, z: -2 },
    { x: -4.5, y: 0.55, z: -0.5 },
    { x: -3.87, y: 0, z: 1 },
    { x: -4.6, y: -0.1, z: 0.65 },
    { x: -3, y: 1.5, z: -0.7 },
    { x: -0.5, y: 0.2, z: -1.5 },
    { x: -1.3, y: -0.45, z: -1.5 },
    { x: -3.35, y: 0.25, z: -1.5 },
    { x: -4.76, y: -1.26, z: 0.4 },
    { x: -4.32, y: 0.85, z: 1.4 },
    { x: -3.5, y: -1.82, z: 0.9 },
    { x: -3.6, y: -0.6, z: 1.46 },
    { x: -4.55, y: -1.5, z: 1.63 },
    { x: -3.8, y: -1.15, z: 2.1 },
    { x: -2.9, y: -0.25, z: 1.86 },
    { x: -2.2, y: -0.4, z: 1.86 },
    { x: -5.1, y: -0.24, z: 1.86 },
    { x: -5.27, y: 1.24, z: 0.76 },
    { x: -5.27, y: 2, z: -0.4 },
    { x: -6.4, y: 0.4, z: 1 },
    { x: -5.15, y: 0.95, z: 2 },
    { x: -6.2, y: 0.5, z: -0.8 },
    { x: -4, y: 0.08, z: 1.8 },

    { x: 2, y: -0.95, z: 1.5 },
    { x: 2.3, y: 2.4, z: -0.1 },
    { x: 2.5, y: 1.9, z: 1.2 },
    { x: 1.8, y: 0.37, z: 1.2 },
    { x: 3.24, y: 0.6, z: 1.05 },
    { x: 2.72, y: -0.9, z: 1.1 },
    { x: 1.8, y: -1.34, z: 1.67 },
    { x: 1.6, y: 1.99, z: 0.91 },
    { x: 2.8, y: 1.58, z: 1.69 },
    { x: 2.97, y: 2.3, z: 0.65 },
    { x: -1.3, y: -0.2, z: -2.5 },
    { x: 4, y: 1.78, z: 0.38 },
    { x: 1.72, y: 1.4, z: -1.29 },
    { x: 2.5, y: -1.2, z: -2 },
    { x: 3.5, y: -0.58, z: 0.1 },
    { x: 0.1, y: 0.4, z: -2.42 },
    { x: 4.5, y: 0.55, z: -0.5 },
    { x: 3.87, y: 0, z: 1 },
    { x: 4.6, y: -0.1, z: 0.65 },
    { x: 3, y: 1.5, z: -0.7 },
    { x: 2.3, y: 0.6, z: -2.6 },
    { x: 4, y: 1.5, z: -1.6 },
    { x: 3.35, y: 0.25, z: -1.5 },
    { x: 4.76, y: -1.26, z: 0.4 },
    { x: 4.32, y: 0.85, z: 1.4 },
    { x: 3.5, y: -1.82, z: 0.9 },
    { x: 3.6, y: -0.6, z: 1.46 },
    { x: 4.55, y: -1.5, z: 1.63 },
    { x: 3.8, y: -1.15, z: 2.1 },
    { x: 2.9, y: -0.25, z: 1.86 },
    { x: 2.2, y: -0.4, z: 1.86 },
    { x: 5.1, y: -0.24, z: 1.86 },
    { x: 5.27, y: 1.24, z: 0.76 },
    { x: 5.27, y: 2, z: -0.4 },
    { x: 6.4, y: 0.4, z: 1 },
    { x: 5.15, y: 0.95, z: 2 },
    { x: 6.2, y: 0.5, z: -0.8 },
    { x: 4, y: 0.08, z: 1.8 },
  ];
  const maxBubbles = radii.length;
  const screenArea = window.innerWidth * window.innerHeight;

  // Define desired density: bubbles per pixel (adjust as needed)
  const density = 0.00005;

  // Calculate number of bubbles based on screen area and density
  let bubbleCount = Math.floor(screenArea * density);

  // Clamp the value between a minimum and the available maximum
  const minBubbles = 10;
  bubbleCount = Math.max(minBubbles, Math.min(bubbleCount, maxBubbles));

  // Combine radii and positions into a single array of objects
  const combined = radii.map((radius, i) => ({
    radius,
    position: positions[i],
  }));

  // Shuffle the combined array
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  // Slice the desired number
  const selected = combined.slice(0, bubbleCount);

  // Separate back into radii and positions
  const selectedRadii = selected.map((b) => b.radius);
  const selectedPositions = selected.map((b) => b.position);

  // Return the result
  return {
    radii: selectedRadii,
    positions: selectedPositions,
  };
}
