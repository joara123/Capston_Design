import * as BABYLON from 'babylonjs';
import { StandardMaterial } from 'babylonjs';
import 'babylonjs-loaders';

let canvas: any = document.getElementById("renderCanvas");
let engine = new BABYLON.Engine(canvas, true);

function createScene(): BABYLON.Scene{
    let scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    scene.debugLayer.show({handleResize: true, overlay: true});
    scene.collisionsEnabled=true;
    
    let camera = new BABYLON.FollowCamera("Camera", new BABYLON.Vector3(0, 1, 1), scene); //(x, y, z)
    camera.radius = 5;
    camera.heightOffset = 2.5;
    camera.rotationOffset = 0;
    camera.cameraAcceleration = 0.005;
    camera.maxCameraSpeed = 10;
    //camera.attachControl(canvas);
    //camera.checkCollision = false;
    
    //camera.rotation = new BABYLON.Vector3(Math.PI*1/8, 0, 0)
    //camera.attachControl(null, true); //막으면 카메라 고정

    //빛
    let light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(1, 1, 1), scene);
    light.diffuse = new BABYLON.Color3(1, 0.91, 0.53);
    light.specular = new BABYLON.Color3(0.5, 0.5, 0.5);
    light.intensity = 4;
    light.range = 10;

    //중력
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    // no gravity for camera
    //camera.applyGravity = true;
    //camera.ellipsoid = new BABYLON.Vector3(0.2, 0.2, 0.2);

    //잔디색머테리얼
    var greenMat = new BABYLON.StandardMaterial("greenMat", scene);
    greenMat.ambientColor = new BABYLON.Color3(0.18, 0.5, 0.25);
    //greenMat.ambientTexture = new BABYLON.Texture("./assets/textures/material_wall.jpg", scene);
    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    
    //땅
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 30, height: 30}, scene);
    //ground.position = new BABYLON.Vector3(0, 0, 0);
    ground.material = groundMat;
    ground.checkCollisions=true;
    //잔디
    let ground2 = BABYLON.MeshBuilder.CreateGround("ground2", {width: 15, height: 10}, scene);
    ground2.position = new BABYLON.Vector3(0, 0.1, -2);
    ground2.material = greenMat
    ground2.checkCollisions=false;


    //건물들
    let building = BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "model2.glb", scene, function(container){
        let untitled = container.meshes[0];
        untitled.name = "untitled1";
        untitled.rotation = new BABYLON.Vector3(0, 0, 0)
        untitled.scaling = new BABYLON.Vector3(0.8, 0.8, 0.8)
        untitled.position = new BABYLON.Vector3(2, 2.5, 15)
        untitled.checkCollisions = true;//
        container.addAllToScene();
    })

    //나무
    let rtree = BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "tree.glb", scene, function(container){
       let tree = container.meshes[0];
       tree.name = "tree";
       tree.rotation = new BABYLON.Vector3(0, Math.PI*2, 0)
       tree.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
       tree.position = new BABYLON.Vector3(2, 0, 1)
       tree.checkCollisions = false;
       container.addAllToScene();
       //복제..
       for(var i = 0 ; i < 3 ; i++){
            let entries = container.instantiateModelsToScene();
            let playerMesh;
            for(playerMesh of entries.rootNodes);
            playerMesh.position.x += (i*2);
        }
    })
    BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "tree.glb", scene, function(container){
        let tree2 = container.meshes[0];
        tree2.name = "tree2";
        tree2.rotation = new BABYLON.Vector3(0, Math.PI*2, 0)
        tree2.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
        tree2.position = new BABYLON.Vector3(-2, 0, 1)
        tree2.checkCollisions = true;
        container.addAllToScene();
        //복제..
        for(var i = 0 ; i < 3 ; i++){
             let entries = container.instantiateModelsToScene();
             let playerMesh;
             for(playerMesh of entries.rootNodes);
             playerMesh.position.x -= (i*2)
         }
    })

    //new scene2--------------
    var scene2 = new BABYLON.Scene(engine);
    var camera2 = new BABYLON.ArcRotateCamera("Camera2", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene2);
    camera2.attachControl(canvas, true);
    camera2.inputs.attached.mousewheel.detachControl();
    var dome = new BABYLON.PhotoDome(
        "testdome",
        "./assets/textures/pic1.jpg",
        {
            resolution: 32,
            size: 1000
        },
        scene2
    );
    var rbox = BABYLON.Mesh.CreateBox("rbox", 1, scene2);
    rbox.position = new BABYLON.Vector3(2, 1, 10);
    rbox.scaling = new BABYLON.Vector3(1, 1, 0.25);
    rbox.actionManager = new BABYLON.ActionManager(scene2);
    rbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function(){
        //alert('box clicked')
        clicks = 0;
    }))
    //-------------------
    //new scene3--------------
    var scene3 = new BABYLON.Scene(engine);
    var camera3 = new BABYLON.ArcRotateCamera("Camera2", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene3);
    camera3.attachControl(canvas, true);
    camera3.inputs.attached.mousewheel.detachControl();
    var dome = new BABYLON.PhotoDome(
        "testdome",
        "./assets/textures/pic2.jpg",
        {
            resolution: 32,
            size: 1000
        },
        scene3
    );
    var rbox2 = BABYLON.Mesh.CreateBox("rbox2", 1, scene3);
    rbox2.position = new BABYLON.Vector3(2, 1, 10);
    rbox2.scaling = new BABYLON.Vector3(1, 1, 0.25);
    rbox2.actionManager = new BABYLON.ActionManager(scene3);
    rbox2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function(){
        //alert('box clicked')
        clicks = 0;
    }))
    //-------------------

    //눌러서 이동
    var clicks = 0;
    var box = BABYLON.Mesh.CreateBox("box", 2, scene);
    box.position = new BABYLON.Vector3(2, 1, 10);
    box.scaling = new BABYLON.Vector3(0.25, 1, 0.25);
    box.actionManager = new BABYLON.ActionManager(scene);
    box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function(){
        //alert('box clicked')
        clicks = 1;
    })) 
    var box1 = BABYLON.Mesh.CreateBox("box1", 2, scene);
    box1.position = new BABYLON.Vector3(-2, 1, 10);
    box1.scaling = new BABYLON.Vector3(0.25, 1, 0.25);
    box1.actionManager = new BABYLON.ActionManager(scene);
    box1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function(){
        //alert('box clicked')
        clicks = 2;
    }))    

    // BABYLON.SceneLoader.ImportMesh("", "./assets/model/", "Man02.glb", scene, function(meshes, particles, skeletons, animationGroups, transformNodes, geometries, light){
    //     meshes[0].name = "Man02";
    //     //meshes[0].position.x += 1;
    //     meshes[0].rotation = new BABYLON.Vector3(0, Math.PI*2, 0);
    //     animationGroups[0].stop();
    // }); //멈춰있는 놈
    BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "walk2.glb", scene, function(container){
        let player = container.meshes[0];    
        player.name = "Man02";
        player.rotation = new BABYLON.Vector3(0, Math.PI, 0);
        container.addAllToScene();

        player.checkCollisions = false;
        //camera.position.y = 10;
        camera.lockedTarget = player;

        //wasd
        let isW = false;
        let isA = false;
        let isS = false;
        let isD = false;

        document.addEventListener('keydown', (e) => 
        {
            if(e.keyCode == 87){isW = true;}
            if(e.keyCode == 65){isA = true;}
            if(e.keyCode == 83){isS = true;}
            if(e.keyCode == 68){isD = true;}
        });
        document.addEventListener('keyup', (e) => 
        {
            if(e.keyCode == 87){isW = false;}
            if(e.keyCode == 65){isA = false;}
            if(e.keyCode == 83){isS = false;}
            if(e.keyCode == 68){isD = false;}
        });

        scene.registerBeforeRender(
            function(){
                if(!scene.isReady()){return;}
                if(isW || isS){
                    var playerSpeed = 0.1;
                    var gravity = 0;
                    var x = playerSpeed*parseFloat((String)(Math.sin(player.rotation.y)));
                    var z = playerSpeed*parseFloat((String)(Math.cos(player.rotation.y)));
                    if(isW == true){
                        var forwards = new BABYLON.Vector3(-x, 0, -z);
                        player.moveWithCollisions(forwards);
                    }
                    if(isS == true){
                        var backwords = new BABYLON.Vector3(x, 0, z);
                        player.moveWithCollisions(backwords);
                    }
                }
                if(isA == true){
                    player.addRotation(0, -0.05, 0);
                }
                if(isD == true){
                    player.addRotation(0, 0.05, 0);
                }
            }
        )
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

    //player
    //var playerMesh = [];
    // let playerMesh = BABYLON.Mesh.CreateBox("playerMesh", 1.0, scene);
    // playerMesh.position.x = 0;
    // playerMesh.position.z = 0;
    // playerMesh.position.y = 1;
    // playerMesh.checkCollisions = true;
    // camera.lockedTarget = playerMesh;

    

    setTimeout(function(){
        engine.stopRenderLoop();

        engine.runRenderLoop(function(){
            switch(clicks){
                case 0:
                    scene.render();
                break
                case 1:
                    scene2.render();
                break
                case 2:
                    scene3.render();
                break
            }
        });
    }, 500);

    return scene;
}

let scene: BABYLON.Scene = createScene();
