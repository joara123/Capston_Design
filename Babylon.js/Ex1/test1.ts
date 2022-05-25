import * as BABYLON from 'babylonjs';

let canvas: any = document.getElementById("renderCanvas");
let engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);

function createScene(): BABYLON.Scene{
    let scene: BABYLON.Scene = new BABYLON.Scene(engine);

    let camera : BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    let light1: BABYLON.HemisphereBuilder = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

    let sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1}, scene);

    return scene;
}

let scene: BABYLON.Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
})