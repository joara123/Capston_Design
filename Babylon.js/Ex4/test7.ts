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
    //====

    window.addEventListener("keydown", function(event){
        if(event.keyCode >= 122 && event.keyCode <= 123 || event.ctrlKey || event.shiftKey)
            window.alert("keyDown")
    }, true);

    BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "Man02.glb", scene, function(container){
        let player = container.meshes[0];
        player.name = "Man02";
        player.rotation = new BABYLON.Vector3(0, Math.PI*2, 0)
        container.addAllToScene();

        camera.position.z -= 7;

        
        for(var i = 0 ; i < 100 ; i++){
            let entries = container.instantiateModelsToScene();
            let playerMesh;
            entries.animationGroups[0].stop;
            for(playerMesh of entries.rootNodes);
            let randomAnimationValue = Math.floor(Math.random() * 5)
            playerMesh.position.x = -50.0 + Math.random() * 100.0;
            playerMesh.position.z = -50.0 + Math.random() * 100.0;
            playerMesh.position.y = Math.random() * Math.PI;
            entries.animationGroups[randomAnimationValue].start(true, 1.0);
        }
        /*const tempInstanceArr = [];

        let playerMesh : BABYLON.Mesh;
        playerMesh = container.meshes[1] as BABYLON.Mesh;
        for(var i = 0 ; i < 500 ; i++){
            let instanceMesh = playerMesh.clone(i + "name");
            instanceMesh.parent = null;
            tempInstanceArr.push(instanceMesh);
            instanceMesh.position.x = -50.0 + Math.random() * 100.0;
            instanceMesh.position.z = -50.0 + Math.random() * 100.0;
            instanceMesh.position.y = Math.random() * Math.PI;
        }*/

        let rightButton = document.querySelector('.rightArrow');
        rightButton.addEventListener('click', function(){
            player.position.x += 0.1;
        });
        let leftButton = document.querySelector('.leftArrow');
        leftButton.addEventListener('click', function(){
            player.position.x -= 0.1;
        });
        let PickButton = document.querySelector('.select');

        PickButton.addEventListener('click', function(){
            (document.querySelector(".selectingWrap")as HTMLInputElement).style.display = "none";
            setTimeout(() => {
                (document.querySelector(".selectingWrap")as HTMLInputElement).style.display = "flex";
            }, 1000);
        });

        let yValue = 0;
        scene.onBeforeRenderObservable.add(() => {
            yValue += 0.01;
            player.position.y = Math.cos(yValue);
            if(player.position.y > 0.95){
                console.log("high")
            }
        });

        setTimeout(() => {
            skyBox.material = null;
        }, 5000);

        skyBox.onMaterialChangedObservable.add((e) => {
            console.log("change");
        })
    })
    
    return scene;
}

let scene: BABYLON.Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
})