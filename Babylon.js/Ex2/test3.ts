import * as BABYLON from 'babylonjs';

let canvas: any = document.getElementById("renderCanvas");
let engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);

function createScene(): BABYLON.Scene{

    let scene: BABYLON.Scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);

    let camera : BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light= new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    light.specular = new BABYLON.Color3(0, 1, 0);
    light.groundColor = new BABYLON.Color3(0, 1, 0);

    var redMat = new BABYLON.StandardMaterial("redMat", scene);
    redMat.ambientColor = new BABYLON.Color3(1, 0, 0);

    var greenMat = new BABYLON.StandardMaterial("redMat", scene);
    greenMat.ambientColor = new BABYLON.Color3(0, 1, 0);

    var sphere0 = BABYLON.MeshBuilder.CreateSphere("sphere0", {}, scene);
    sphere0.position.x = -1.5;

    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {}, scene);
    sphere1.material = redMat;

    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {}, scene);
    sphere2.material = greenMat;
    sphere2.position.x = -1.5;

    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
    ground.position = new BABYLON.Vector3(0, -1, 0);

    return scene;
}

let scene: BABYLON.Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
})