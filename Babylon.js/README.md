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
  - a는 왼쪽 방향으로 rotation, d는 오른쪽 방향으로 rotation 값 변경
```csharp
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
```
* 공학관 주변 표현 
  - turboSquid의 tree 에셋 사용
  - 하나씩 배치가 아닌 복제하여 여러 개 배치
<img src="https://user-images.githubusercontent.com/92451281/170300038-a3f002c7-5404-4d05-96ed-7595d4d43558.png" width="50%" height="50%">

* 공학관 주요 장소 360도 이미지를 메타버스 안에서 구현
* 버튼 클릭시 다음 장소로 이동   

<img src="https://user-images.githubusercontent.com/92451281/170299170-c441c082-a894-45cc-91c7-fabd89dfac8b.png" width="50%" height="50%"><img src="https://user-images.githubusercontent.com/92451281/170299176-fe49bca3-3a83-4ac7-8b5d-e59d5650607b.png" width="50%" height="50%">

