import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import tempMap from "./tempMap";

let canvas: any = document.getElementById("renderCanvas");
let engine = new BABYLON.Engine(canvas, true);

function createScene(): BABYLON.Scene{
    let scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    scene.debugLayer.show({handleResize: true, overlay: true});
    let camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 7, -26), scene);
    camera.position = new BABYLON.Vector3(0, 10, -20);
    camera.rotation.x = Math.PI/6;
    camera.attachControl(null, true);

    let light = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(-1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);

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

    BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "Man02.glb", scene, function(container){
        let player = container.meshes[0];
        player.name = "Man02";
        player.position = new BABYLON.Vector3(0, 0.3, -4);
        player.rotation = new BABYLON.Vector3(0, Math.PI*2, 0);
        container.animationGroups[3].play(true);
        container.addAllToScene();
        camera.position.z -= 7;

        (document.querySelector(".selctingWrap")as HTMLInputElement).style.display = "none";
        (document.querySelector(".rightArrow")as HTMLInputElement).style.display = "none";
        (document.querySelector(".leftArrow")as HTMLInputElement).style.display = "none";
        (document.querySelector(".select")as HTMLInputElement).style.display = "none";
    });

    let directionalLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(4.636, 0.162, -5.103), scene);
    directionalLight.direction = new BABYLON.Vector3(0, -10, -5);
    directionalLight.intensity = 3;
    directionalLight.diffuse = new BABYLON.Color3(1, 1, 1);
    directionalLight.specular = new BABYLON.Color3(1, 1, 1);
    directionalLight.shadowMinZ = -10;
    directionalLight.shadowMaxZ = 6;
    directionalLight.position.x = 4.68;
    directionalLight.position.z = -5.1;

    let shadowGenerator = new BABYLON.ShadowGenerator(2048, directionalLight);
    shadowGenerator.useBlurCloseExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 8;
    shadowGenerator.depthScale = 1;

    let hl = new BABYLON.HighlightLayer("hl1", scene);
    hl.innerGlow = true;
    hl.outerGlow = true;
    hl.blurHorizontalSize = 0.1;
    hl.blurVerticalSize = 0.1;

    let glow = new BABYLON.GlowLayer("glow", scene, {
        mainTextureFixedSize: 1024,
        blurKernelSize: 64
    });
    glow.intensity = 0.5;

    let TempMap = new tempMap("./assets/model/", "prop.gltf", "Land2.glb", scene);
    TempMap.init(shadowGenerator, hl, glow);
    return scene;
}

let scene: BABYLON.Scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
})