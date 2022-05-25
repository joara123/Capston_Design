import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

let canvas: any = document.getElementById("renderCanvas");
let engine = new BABYLON.Engine(canvas, true);

function createScene(): BABYLON.Scene{
    let scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    scene.debugLayer.show({handleResize: true, overlay: true});
    let camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 1, -3), scene);
    camera.attachControl(null, true);

    let light = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(-1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);

    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
    ground.position = new BABYLON.Vector3(0, -1, 0);

    BABYLON.SceneLoader.Append("./assets/model/", "Man02.glb", scene, function(scene){
        scene.getMeshByName("ground").position.y += 1;
    })

    return scene;
}

let scene: BABYLON.Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
})