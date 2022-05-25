## 메타버스 구현을 위해 바빌론(babylon)을 배우며 실습해 본 예제들의 코드 & 바빌론으로 공학관 구현
더픽트 회사로부터 매주 예제를 받아 진행함   
예제 (Ex1~Ex2)   
메타버스 구현 (Project)   

<구현 전 계획>
* 에셋을 사용하여 공학관 메타버스 생성
* 플레이어 움직임 구현
* 플레이어 애니메이션 구현
* camera의 이동 구현(player 따라다니게)
* 360도 이미지 넣기

<img src="https://user-images.githubusercontent.com/92451281/170303462-7c5f5bf6-e90b-4668-a727-cc96ce34562b.png" width="50%" height="50%">

<상세 구현 내용>
* player 애니메이션과 카메라 설정
  - mixamo의 walk 애니메이션 사용
  - camera는 플레이어에 target을 설정하여 따라다니도록 구현
  - model파일 안에 있는 walk2.glb 파일 scene에 load
```csharp
    let camera = new BABYLON.FollowCamera("Camera", new BABYLON.Vector3(0, 1, 1), scene); 
    camera.radius = 5;
    camera.heightOffset = 2.5;
    camera.rotationOffset = 0;
    camera.cameraAcceleration = 0.005;
    camera.maxCameraSpeed = 10;
    //camera.attachControl(canvas); //카메라 고정
```
>>아래 코드는 전체 코드에서 일부인 애니메이션 asset 불러오기와 camer 설정 부분만 가져옴
```csharp
  BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "walk2.glb", scene, function(container){
        let player = container.meshes[0];    
        player.name = "Man02";
        player.rotation = new BABYLON.Vector3(0, Math.PI, 0);
        container.addAllToScene();

        player.checkCollisions = false;
        camera.lockedTarget = player; // player(target)을 따라다니는 camera
```

<img src="https://user-images.githubusercontent.com/92451281/170299054-1f47a0c2-5e3d-475f-a2ae-29190e5a1c88.png" width="50%" height="50%">

* 플레이어 이동
  - w와 s로 각각 전진, 후진 구현
  - a는 왼쪽 방향으로 rotation.y, d는 오른쪽 방향으로 rotation.y 값 변경
```csharp
scene.registerBeforeRender(
            function(){
                if(!scene.isReady()){return;}
                if(isW || isS){
                    var playerSpeed = 0.1;
                    var gravity = 0;
                    var x = playerSpeed*parseFloat((String)(Math.sin(player.rotation.y))); //rotation.y 값 변경
                    var z = playerSpeed*parseFloat((String)(Math.cos(player.rotation.y))); //rotation.y 값 변경
                    if(isW == true){
                        var forwards = new BABYLON.Vector3(-x, 0, -z); //전진
                        player.moveWithCollisions(forwards);
                    }
                    if(isS == true){
                        var backwords = new BABYLON.Vector3(x, 0, z); //후진
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
```
* 공학관 주변 표현 
  - 공학관 건물은 blender를 사용하여 제작
  - turboSquid의 tree 에셋 사용
  - 하나씩 배치가 아닌 복제하여 여러 개 배치
```csharp
    BABYLON.SceneLoader.LoadAssetContainer("./assets/model/", "tree.glb", scene, function(container){
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
```
<img src="https://user-images.githubusercontent.com/52689917/170311815-6fa48c86-defe-46d2-9e92-f2a1bdcf0fb3.PNG" width="50%" height="50%">

* 공학관 주요 장소 이동
  - 버튼 클릭시 다음 장소로 이동
  - 360도 이미지를 메타버스 안에서 구현
```csharp
//new scene2--------------
    var scene2 = new BABYLON.Scene(engine); // 새롭게 만들 scene의 이름을 바꿔서 새로운 scene 생성
    var camera2 = new BABYLON.ArcRotateCamera("Camera2", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene2);
    camera2.attachControl(canvas, true);
    camera2.inputs.attached.mousewheel.detachControl();
    var dome = new BABYLON.PhotoDome(
        "testdome",
        "./assets/textures/pic1.jpg", // 불러올 360 이미지
        {
            resolution: 32,
            size: 1000
        },
        scene2
    );.
    .
    .
    . 
    //-------------------
```
>> clicks 값으로 씬 이동 결정. box를 누르면 clicks값이 바뀐다
```csharp
    var clicks = 0;
    var box = BABYLON.Mesh.CreateBox("box", 2, scene); // 사진에 있는 흰색 긴 박스
    box.position = new BABYLON.Vector3(2, 1, 10);
    box.scaling = new BABYLON.Vector3(0.25, 1, 0.25);
    box.actionManager = new BABYLON.ActionManager(scene);
    box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function(){
        //alert('box clicked')
        clicks = 1;
    })) 
```
<img src="https://user-images.githubusercontent.com/52689917/170317758-21ff1769-9231-4869-85f7-b23c515af785.png" width="50%" height="50%">

>> 바뀐 clicks 값으로 위의 만들었던 해당 scene으로 이동
```csharp
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
```
<img src="https://user-images.githubusercontent.com/92451281/170299170-c441c082-a894-45cc-91c7-fabd89dfac8b.png" width="50%" height="50%"><img src="https://user-images.githubusercontent.com/92451281/170299176-fe49bca3-3a83-4ac7-8b5d-e59d5650607b.png" width="50%" height="50%">

>> 위 사진에 있는 검은색 box를 누르면 처음 화면으로 돌아감
```csharp
    var rbox = BABYLON.Mesh.CreateBox("rbox", 1, scene2);
    rbox.position = new BABYLON.Vector3(2, 1, 10);
    rbox.scaling = new BABYLON.Vector3(1, 1, 0.25);
    rbox.actionManager = new BABYLON.ActionManager(scene2);
    rbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function(){
        //alert('box clicked')
        clicks = 0;
    }))
```

* 사용한 에셋
  - https://www.mixamo.com/#/?page=1&query=walk
  - https://www.turbosquid.com/3d-models/tree-pixel-low-poly-3d-model-1764347

