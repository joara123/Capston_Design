babylon 특징

1. babylon 라이브러리 자체가 가볍다. =>unity로 못하는 이유(힘든 이유)
unity 자체 webGL이 있지만 쓰기 힘든이유 ->
c#으로 정의된 (모델등의 형태는 c나c++임)  c,c++형태로 그런뒤 js형태로 크로스 컴파일 하는 과정으로 
.NET 바이트코드를 해당 C++ 소스 파일로 변환하고, 이 파일은 스크립트를 JavaScript로 변환하기 위해 emscripten을 사용하여 컴파일된다
각각 효율적인 방법으로 컴파일을 시켰지만 js->컴파일 없이 그대로 표현과 비교하면 아무리 빨라도 현시점에서는 느릴수 밖에 없음
또한 모바일 미지원 브라우저 대응 미흡 vscode에서 디버그 및 디버깅 문제, 권한 문제 등    
다른 방법으로는 unity toolkit 중 unity export tools가 있어서 scene을 .babylon 으로 뽑아져나오게 할 수 있으나(babylon식 c#코드로 짜야됨)
WebGL형태로 build 할수있지만 unity의 장점인 realtime이 무색하게 사용하는 방법이며 불편 그자체이라 쓰다가 포기했다.

2. scene을 정의 (engine 생성과 그에따른 canvas가 있어야된다. ) 및 카메라 1개가 있어야 scene.render의 상태를 유지할수있다.
유니티 또한 카메라가 없으면 경고가 나오는것처럼 babylon은 카메라 하나를 생성하지않으면 rendering 시도하지않는다. (rendering 중이면
code나 물리적으로 제거를 했을때 에러나지는 않는다.)

3. 현 환경에서 돌아가는 형태는 index에서 만들어둔 canvas에 babylon engine을 생성하고 그 engine에 각 scene을 넣는 형식이며
engine당 scene은 여러개 만들수 있고, 여러 canvas를 만들어 하나의 엔진을 같거나 다른씬들을 동시에 볼수도있다.
https://www.babylonjs.com/demos/views/

4. camera 종류    
4-1     
P1처럼 camera1~6이 기본적으로 사용하는 형태이며  camera7같은 형태의 특수한 camera들도 있다
ArcRotate, ArcFollow 등 Arc가 붙은 형태의 카메라는 구의 형태로 회전하는 카메라이고 target이 될 mesh(유니티의 GameObject, 언리얼의 geometry)나 position 등을 정해주며
이것을 null로 할시 자동으로 0,0,0의 위치나 카메라의 position을 따라간다 ()
매개변수는 name alpha beta radius target scene의 형태이며 alpha는 x축 회전의 값, beta는 y축 회전의 값 radius는 구의 크기(target에서의 거리라고 보면된다.)
Follow 가 붙는 카메라는 target에 의존하며 target을 따라다니면서 보는 일반적인 3d게임형식에 자주쓰이는 형태라고 보면된다.
나머지 카메라는 자유시점의 형태를 띄고있으며 특정 mesh등에 귀속되지 않는 이동형태를 뛰고있다(특수한 camera의 조작은 각 쓰임세등의 귀속되어있다 )
카메라의 조작형태는 기본적으로 마우스 및 키보드 방향키에 정의되어있는데 이것을 커스텀 하는 방법도있다 (ex 방향키가 아닌 wasd로 이동을 하고싶을때)       
4-2    
카메라 활성법
카메라의 시점과 별개로 조작의 T/F를 하는 역할로는 
camera.attachControl(null, true);
camera.detachControl();
두개가 있다
단 P1처럼 하고 build를 해보면 조작이 안되는것을 보게될것인데 이유는
camera의 조작만 T/F를 한것이지 scene의 카메라를 변경한것이 아니므로
 scene.activeCamera = camera3;
scene의 카메라를 변경해야된다.

5. light 종류
P2참조
HemisphericLight : 전역광 해 , 달처럼 전역범위 용도
SpotLight : 원뿔 형태의 범위로 커지는 light형태
PointLight : 원형의 light 형태
DirectionalLight : 직사광이며 HemisphericLight 와 달리 한 방향성으로 비춰지기때문에 음영의 형태가 두드러진다 (주로 그림자에 관련된 light)   

6. mesh = 기본적으로는 geometry의 형태를 의미한다.
관련된 기능들은 
https://doc.babylonjs.com/divingDeeper/mesh 참조
생성을 하거나 혹은 외부 assets 등을 import하여 생기는 model중 그려진 덩어리 형태 등을 의미한다 (추후 assets import에서 상세 기재)   

7. Material
직역하면 재료,재질 mesh에 재질을 입혀 색이나 형태를 바꾼다 일반적으로는 PBRMaterial과 NodeMaterial 를 위주로 쓴다. 
P3과 P4를 해보자
그외 관련은 
https://doc.babylonjs.com/divingDeeper/materials/using 참조   

8. Texture 
Material에 따라 명칭이 조금 바뀌지만 역활은 비슷하다
P4 = StandardMaterial에 각 texture들이며 diffuse가 주로 색을 표현하고 bump는 깊이,잔영 등을 그리는 각각의 역활에 맞는 texure로 나눠져있다
P5 = PBRMaterial에 각 teture들이며 diffuse가 여기서는 albedo라고 보면된다.
