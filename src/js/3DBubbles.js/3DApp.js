// App.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { Model } from "../3DBubbles.js/3DModel.js";

gsap.registerPlugin(CSSPlugin);
gsap.set(".circle", { xPercent: -50, yPercent: -50 });
gsap.set(".circle-follow", { xPercent: -50, yPercent: -50 });

export class App {
  #canvas;
  constructor() {
    this.#canvas = document.querySelector("canvas");

    this.#create();
    this.#setting();
    this.#orbitControl();
    this.initLights();
    // this.initGUI();
    this.initAnimationLogic();
    this.registerEventListeners();
    this.animate();
  }
  resizeCanvas() {
    const navHeight = this.navbar.offsetHeight;

    const width = window.innerWidth;
    const height = window.innerHeight - navHeight;
    console.log(height);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
  #create() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.#canvas,
      antialias: true,
      alpha: true,
    });
    this.tempVector = new THREE.Vector3();
    this.forces = new Map();
    this.mouse = new THREE.Vector2();
    this.model = new Model(this.scene);
    this.raycaster = new THREE.Raycaster();

    this.canvas = document.getElementById("webgl");
    this.navbar = document.querySelector("nav");
  }
  #setRendererSize = () => {
    const navHeight = this.navbar.offsetHeight;

    const width = window.innerWidth;
    const height = window.innerHeight - navHeight;

    this.renderer.setSize(width, height);
  };
  #setting() {
    this.#setRendererSize();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.camera.position.z = 24;
    this.spheres = this.model.getSpheres();
  }
  #orbitControl() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false;
  }
  initLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(this.ambientLight);

    this.spotLight = new THREE.SpotLight(0xffffff, 0.52);
    this.spotLight.position.set(14, 24, 30);
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);

    this.directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
    this.directionalLight1.position.set(0, -4, 0);
    this.scene.add(this.directionalLight1);
  }

  initGUI() {
    const gui = new GUI();
    gui.close();

    const ambFolder = gui.addFolder("Ambient Light");
    ambFolder.add(this.ambientLight, "intensity", 0, 2);
    ambFolder
      .addColor({ color: this.ambientLight.color.getHex() }, "color")
      .onChange((value) => this.ambientLight.color.setHex(value));
    ambFolder.open();

    const spotFolder = gui.addFolder("Spot Light");
    spotFolder.add(this.spotLight, "intensity", 0, 2);
    spotFolder.add(this.spotLight.position, "x", -30, 30);
    spotFolder.add(this.spotLight.position, "y", -30, 30);
    spotFolder.add(this.spotLight.position, "z", -30, 30);
    spotFolder.open();

    const dirFolder = gui.addFolder("Directional Light 1");
    dirFolder.add(this.directionalLight1, "intensity", 0, 2);
    dirFolder.add(this.directionalLight1.position, "x", -30, 30);
    dirFolder.add(this.directionalLight1.position, "y", -30, 30);
    dirFolder.add(this.directionalLight1.position, "z", -30, 30);
    dirFolder.open();
  }

  initAnimationLogic() {
    this.breathingAmplitude = 0.1;
    this.breathingSpeed = 0.002;
    this.revolutionRadius = 4;
    this.revolutionDuration = 0;
    this.initY = -25;
    this.loadingComplete = false;

    this.spheres.forEach((s) => (s.position.y = this.initY));

    this.xTo = gsap.quickTo(".circle", "x", { duration: 0.6, ease: "power3" });
    this.yTo = gsap.quickTo(".circle", "y", { duration: 0.6, ease: "power3" });
    this.xFollow = gsap.quickTo(".circle-follow", "x", {
      duration: 0.6,
      ease: "power3",
    });
    this.yFollow = gsap.quickTo(".circle-follow", "y", {
      duration: 0.6,
      ease: "power3",
    });

    window.addEventListener("load", () => {
      const main_txt = document.querySelector(".main-txt");
      const arrow_down = document.getElementById("scrollHint");

      // Make sure it's initially hidden

      setTimeout(() => {
        this.loadingComplete = true;
        document
          .querySelectorAll(".hide-text")
          .forEach((el) => (el.style.opacity = "1"));
        main_txt.style.opacity = "1";
      }, (this.revolutionDuration + 1) * 1000);

      setTimeout(() => {
        // Smooth fade-in
        arrow_down.classList.remove("hidden");
        arrow_down.classList.add("fade-in");
      }, (this.revolutionDuration + 1) * 2000);
    });
  }

  initLoadingAnimation() {
    this.spheres.forEach((sphere, i) => {
      const delay = i * 0.02;
      const originalPos = sphere.userData.originalPosition;

      gsap
        .timeline()
        .to(sphere.position, {
          duration: this.revolutionDuration / 2,
          y: this.revolutionRadius,
          ease: "power1.out",
          onUpdate: function () {
            const p = this.progress();
            sphere.position.z =
              originalPos.z + Math.sin(p * Math.PI) * this.revolutionRadius;
          },
          delay,
        })
        .to(sphere.position, {
          duration: this.revolutionDuration / 2,
          y: this.initY / 5,
          ease: "power1.out",
          onUpdate: function () {
            const p = this.progress();
            sphere.position.z =
              originalPos.z - Math.sin(p * Math.PI) * this.revolutionRadius;
          },
        })
        .to(sphere.position, {
          duration: 0.6,
          x: originalPos.x,
          y: originalPos.y,
          z: originalPos.z,
          ease: "power1.out",
          onComplete: () => {
            sphere.userData.originalPosition = sphere.position.clone();
          },
        });
    });
  }

  onMouseMove(event) {
    if (!this.loadingComplete) return;

    this.xTo(event.clientX);
    this.yTo(event.clientY);
    this.xFollow(event.clientX);
    this.yFollow(event.clientY);

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.spheres);
    if (intersects.length > 0) {
      const hovered = intersects[0].object;
      const force = new THREE.Vector3()
        .subVectors(intersects[0].point, hovered.position)
        .normalize()
        .multiplyScalar(0.05);
      this.forces.set(hovered.uuid, force);
    }
  }

  handleCollisions() {
    for (let i = 0; i < this.spheres.length; i++) {
      for (let j = i + 1; j < this.spheres.length; j++) {
        const a = this.spheres[i];
        const b = this.spheres[j];
        const r1 = a.userData.radius;
        const r2 = b.userData.radius;
        const dist = a.position.distanceTo(b.position);
        const minDist = (r1 + r2) * 1.2;

        if (dist < minDist) {
          this.tempVector.subVectors(b.position, a.position).normalize();
          const strength = (minDist - dist) * 0.4;
          a.position.sub(this.tempVector.clone().multiplyScalar(strength));
          b.position.add(this.tempVector.clone().multiplyScalar(strength));
        }
      }
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.loadingComplete) {
      const time = Date.now() * this.breathingSpeed;
      this.spheres.forEach((sphere, i) => {
        const offset = i * 0.2;
        const breatheY = Math.sin(time + offset) * this.breathingAmplitude;
        const breatheZ =
          Math.cos(time + offset) * this.breathingAmplitude * 0.5;

        const force = this.forces.get(sphere.uuid);
        if (force) {
          sphere.position.add(force);
          force.multiplyScalar(0.95);
          if (force.length() < 0.01) this.forces.delete(sphere.uuid);
        }

        const orig = sphere.userData.originalPosition;
        this.tempVector.set(orig.x, orig.y + breatheY, orig.z + breatheZ);
        sphere.position.lerp(this.tempVector, 0.018);
      });

      this.handleCollisions();
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  registerEventListeners() {
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
