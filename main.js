import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.1/build/three.module.js';
import { MindARThree } from 'https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js';

const mindAR = new MindARThree({
  container: document.body,
  imageTargetSrc: './mindar-images/target.mind', // seu .mind
  maxTrack: 1,
  uiLoading: "true",
  uiScanning: "true",
  filterMinCF: 0.0001,
  filterBeta: 0.001,
  videoSettings: { facingMode: "environment" } // 🔹 câmera traseira
});

const { renderer, scene, camera } = mindAR;

// Anchor onde o código vai aparecer
const anchor = mindAR.addAnchor(0);

// Cria um objeto flutuante simples (texto 3D)
const geometry = new THREE.BoxGeometry(0.1, 0.05, 0.01); 
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); 
const codeBox = new THREE.Mesh(geometry, material); 

codeBox.position.set(0, 0, 0); // centralizado sobre a imagem
anchor.group.add(codeBox);

// Quando a imagem for detectada, mostra o código
anchor.onTargetFound = () => {
  codeBox.visible = true;
};
anchor.onTargetLost = () => {
  codeBox.visible = false;
};

// Inicia MindAR
await mindAR.start();
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
