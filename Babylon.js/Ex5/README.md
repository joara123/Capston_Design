0. 미리 세팅해두기   
0-1. src-tempMap.js 생성   
0-2. 추가 파일 Z.zip 를 압축풀어 각 경로에 각각 넣기 ex) 프로젝트 폴더-assets-model-Land2.glb   
0-3. P1과 P2,P3작성

1. class 

* js, ts도 클래스 형을 쓸수있다.  (단 ts형의 클래스의 규칙보다 js형의 클래스가 쓰기편하고 비교적 느슨한 수준의 약속을 가져서 소규모의 프로젝트에는 편하다.)

* js형 클래스 규칙: P2,P3참조   

1-1. class 'name' 으로 선언 및 내부의 constructor = 생성자가 있어야 된다. -> 
* 생성규칙에 의해 존재하며 parameter의 수가 느슨한 비교를 하며 갯수가 차이나도 일치하는 것에 비례한 생성을 한다
* export default 'name' 로 클래스를 import 할 수 있게 명시해야됨
* 이후 app.ts에서 improt 임포트할 명칭(임의) from "해당 export된 어떤것"     (-> ./ 해당 파일위치,    ../ -> 해당 파일 하나 위 위치,  /  ->루트 위치)
으로 가져온 뒤 new와 각 parameter에 맞게 선언하여 생성하고 (생성시 생성자까지 선언됨)
* 이후 다른언어와 같이 해당내에 선언된 함수나 혹은 static하게 선언된것을 가져올수있다. (단 위에서 아래로 내리는것은 단순하지만 callback에 대한 상위 호출에 대한 이중 콜백은 개발자의 선택이자 역량이 될 수있다. => 추후에 필요시 설명)


1-2. constructor이나 혹은 개별로 this.으로 정의한 변수는 해당 클래스 전역변수로 사용할수 있으며 혹은 함수내의 지역변수로도 쓸수 있다 또한 클래스내에 고유의 전역변수로 사용하는것은 static으로 사용하면 된다
* 일반적으로 java나 c++의 객체지향형태의 속성을 가지며 extends ,implements, super 등 사용가능하다
(다른 객체지향 언어에 비해 상당히 느슨하다는것을 쓰다보면 알수있다 ex 제네릭은 가능하지만 빡빡한 형태를 유지하거나 엄격한 비교를 위해 쓴다고 보면 된다.)

1-3. ts 클래스형 (구현은 생략)
* 모듈화 시켜 export 하는 용도로 많이 쓴다. js형에 비해 좀더 써야될것도 많고 레거시된 모듈 및 코드의 처리문제나 사용시 각각에 대한 형을 부여해야되며 묵시적으로 사용되는것도 error를 뱉을 수 있지만 
장점이라면 구조에 대한 이해를 정확하게 해주며 또한 반대로 class 생성시 해당 구조에 묵시적으로 처리되어 원치 않는 흐름을 제거할수있다.



2. waterMaterial

2-1. import * as MAT from "babylonjs-materials";으로 babylon내에 내장된 materials등을 가져온다( 가져오는 것은 형에 의거한 materials이 아닌 추가적인 특수 mat계열을 뜻함)

2-2. water의 color 바람세기 높이 등등 정의하고 이중에 bumpTexture은 있는데 예시로 물결같은 형태를 높낮이나 명암정도의 비율을 위한 추가적인 texture라고 생각하면 된다.

2-3.  addToRenderList(mesh형태) water내부에 특정 mesh를 그린다 (내부적으로는 해당 mesh의 material의 refletion된 값이며 추가적인 값은 위에서 세팅한대로 따라온다.)



3. shadow    참조 : https://doc.babylonjs.com/divingDeeper/lights/shadows

3-1. shadow 생성 규칙에는 light중에 directionalLight 혹은 pointLight가 필요하다.

* P4처럼 추가 light를 생성후 shadowGenerator생성한다 각 parameter는 shadow의 형태에 따라 다르다 참조된 링크에서 각 기능을 찾으면된다. 

3-2. 생성한 클래스의 함수 init에 파라미터로  shadowGenerator를 넣어서 보낸후
* P5처럼 추가 함수를 만들어 실행하게끔한다 (drawShadow는 init밖에 새로운 함수이다) 
* 위에 shadowGenerator.getShadowMap().renderList.push(mesh)는 그릴 mesh이고
아래의 mesh.receiveShadows = true; 는 그려질 mesh이며 만약 한 mesh가 그려지면서 그릴mesh로 정의한다면 암흑이 될 확률이 높다.

4. hl, glow

* hl : highlight
* glow : 빛이남으로 생각하면 편하다.


* P6 P7참조 ->  init(shadowGenerator, hl, glow) , drawShadow 함수 없애고 그냥 내부에 작성
