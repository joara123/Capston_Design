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

    BABYLON.SceneLoader.ImportMesh("", "./assets/model/", "Man02.glb", scene, function(meshes, particles, skeletons, animationGroups, transformNodes, geometries, light){
        meshes[0].name = "Man02";
        meshes[0].position.x += 1;
        meshes[0].rotation = new BABYLON.Vector3(0, Math.PI*2, 0);
        animationGroups[0].stop();
    });

    BABYLON.SceneLoader.Load("./assets/model/", "Man02.glb", engine, function(scene){
        console.log(engine.scenes[0].activeCamera.name);
    });

    const importPromise = BABYLON.SceneLoader.ImportMeshAsync("", "./assets/model/", "Man02.glb", scene);
    importPromise.then((result) => {
        result.meshes[0].position.x -= 1;
    })

    async function sdasda(){
        await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/model/", "Man02.glb", scene);
    }
    sdasda();

    BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "Man02.glb", scene, function (container){
        container.meshes[0].name = "Man02";
        container.meshes[0].rotation = new BABYLON.Vector3(0, Math.PI*2, 0);
        console.log(container.skeletons[0].name);
        scene.getMeshByName("ground").position.y += 1;
        container.addAllToScene();
    });

    var skyBox = BABYLON.Mesh.CreateBox("skyBox", 540.0, scene);
    skyBox.position = BABYLON.Vector3.Zero();
    skyBox.position.y -= 100;

    var skyBoxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyBoxMaterial.backFaceCulling = false;
    skyBoxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/skybox/skybox", scene);
    skyBoxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyBoxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyBoxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyBoxMaterial.disableLighting = true;
    skyBox.material = skyBoxMaterial;

    var hdrTexture = new BABYLON.CubeTexture("./assets/skybox/skybox", scene);
    scene.createDefaultSkybox(hdrTexture, true, 5000);
    scene.environmentIntensity = 0.3;
    
    return scene;
}

let scene: BABYLON.Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
})