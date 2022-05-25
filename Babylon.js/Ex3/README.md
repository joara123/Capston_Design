이전 내용의 형태 요약 P1 참조

model 관련

1. model 확장자 및 방식 : glb, gltf  / gzip, GLTF Draco, indexDB (cash);
(별개로 .babylon화-> scene자체 압축화
.stl, .obj도 가져올수 있음)
* png 압축형 -> jpg
* glb 압축형 -> gltf , 데이터 압축화 gzip (ex png압축형-> jpg)
indexDB, 브라우저의 cash로 저장하여 새로 다운하기전에 저장된 cash에서 읽어옴 (다운시간 절약)


* glb : 원형의 상태로 data는 제일 높지만 일반적인 오류를 잘 뱉지 않음

* gltf : glb의 압축형으로 모델작업에서(c4d, blender, etc...) 압축화 시킴, data는 glb형태보다 낮아서 다운은 빨라지지만 해석하는 시간이 그만큼 비례해짐 

* GLTF Draco : glb -> gltf 로 변환하는 오픈소스이며 texture(ktx2화), skeleton(rig에 해당), geometry의 vertex,uniform 등의 형태를 각각 압축화시킴
gltf보다 더좋은 압축률을 가지고 있지만 ios 혹은 특정 환경에서 skeleton의 bone의 계층이 문제가 발생되서 통상적인 환경에서 21년 11월기준으로 대기중

* gzip : 브라우저의 data 압축방식으로 data자체를 덩어리로 압축화 시킴 -> 위와 마찬가지로 특정 ios에서 비슷한 문제가 생겨 21년 12월 기준으로 대기

* indexDB : 브라우저 캐시화 방식을 읽는 형태이며 babylon에서 이것을 먼저 읽어서 model등을 load함 -> glb와 처음 다운은 같으나 한번 다운해서 캐쉬를 남기면
이후에 다운 없이 load 과정으로 감

2. 종합 이슈: 1. 로드 속도와 최적화의 기준이고 각각 사용에 따라 babylon에서 읽는 계층이나 형태가 바뀌어서 유동적인 판단을 해야됨
       2. 대체로 웹에서의 이슈에 연관 되어 있어서 주기적인 유지가 필요함
                3. ios에 webGl2 미지원 이슈 (android 도 구버젼 문제) + webGPU(기존방식이 cpu 부담 + gpu부담이였으면 gpu위주 부담으로 그래픽 처리하는 형식)
         이슈가 있음 22년 기준으로 개발예정이 있다고 함 + unity에서 최신버젼 webGL은 1을 지원을 안한다고 명시됨(22년 1버젼이후) ->webGL2의 형태의 환경이 기본이 되어짐

* 현재 glb + indexDB 채택중 

* import 규칙
시작하기 전에 assets에 VV.zip 파일을 푼다
path가 assets - skybox , model, texture 형태



1. tsconfig.json 에 추가한다 P2참조
```json
 "types": [
        "babylonjs",
        "babylonjs-loaders",
        ""
    ],
```

2. app.ts에
 import 'babylonjs-loaders';    ->로 load 관련 모듈을 가져온다

3. P3을 해보고 올바르게 model이 import되는지 확인후 P4 또한 해본다()

* import방식에 이런식으로 여러가지 방법이 있고
각 파라미터 및 callback, onScusess 등의 catch 방법이 다르므로 쓰임에 따라 사용하면된다

* 주로는 loadAssetContainer을 쓰고있다.

4. scene.debugLayer.show({handleResize: true, overlay: true}); => babylon scene의 debug 및 inspector, hierarchy를 볼 수 있다

4-1. 보게되면 좌측에 scene explorer에 명칭으로 검색하는 filter 및 scene에 각 요소등이 있고 그것들의 component 들이 좌측에 inspector에 명시되어있다.
(레거시 된것들이 있으므로 따로 찾아서 써야된다.)


* skybox 및 environment

1. P5참조
위에 skybox자체는 box를 만들어서 것에 보이는 말그대로의 skybox를 말하며 skybox는 doom , 6 sided의 box 형태이며 doom보다 제약이 덜하여 후자를 쓰고있다.

아래의 createDefaultSkybox는 이것또한 skybox로 그려지지만 해당으로는 scene에 환경값을 주기위한 (skybox의 texutre을 기반으로 환경 color등을 줌) 용도
