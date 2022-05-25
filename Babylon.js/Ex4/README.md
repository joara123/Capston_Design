P1참조 및 기본 세팅으로 둔다

1. event의 종류

* keyboard, mouse, 혹은 특정 상황혹은 (browser이 꺼지거나 load 된 시점) 복잡한 상황에 (특정 포인트에 도달하는 경과 시간이 기준보다 작을때 등) 발생시키는
말그대로의 event이며 browser의 event와 engine의 event 둘다 사용할수 있어서 다양하게 사용가능하다

1-1 window의 event는 browser자체의 event를 말하며 일반적으로 정의되어 있는 event를 쓴다 (click, keydown keyup ...)
* 종류 참조 link
* https://lakelouise.tistory.com/35

* 또한 html +css로 생성한 class 등에 또한 적용할 수 있다.
* index.html에 P2,P3을 보고 세팅한다. (현시점에서는 html에 간단한 script와 css를 혼용하여 썻지만 추후에는 분리하는 것이 좋다)

1-2 babylon의 event P4 참조

* mesh의 event, camera의 event, 등 각각 event를 가지고있지만 기본적으로 돌아가는것은 해당 scene의 RequestAnimationFrame (browser의 frame당 실행하게함)
가 내재되 있는 unity의 update()과 유사한 형식이며 각 속성에 따라서 특정 event 발생시 한번 실행하거나, 혹은 특정 event 해당시 frame 당 계속 발생하는 형태며
형태는 다르지만 결국 특정 조건에 의거해둔 세팅을 사용하거나 custom하여 beforeRender이벤트에 적용시키면된다.
* event 참조 link
https://doc.babylonjs.com/divingDeeper/events/observables

* 최신버젼에서 복합적인 settimeout + observable 이벤트로 예약된 이벤트 발생 및 종료나 unity의 coroutine 및 비동기식의 연속적인 event를 promise로 묶어
callback 대신 특정 시점등의 event를 발생 시킬수 있다.




2. instance, clone  

* 새로운게 필요하면 새로 assets을 load하면 되지않는가라는 의문에서
* resource download->passing & trans bite code -> my code is ready to read ->...
이런식으로 실행하는데 (세부는 다를수 있음) clone이나 instance는 clone bite code -> my code is ready to read
* 이렇게 빠르게 작업해줘서 빠를 수 밖에 없다. 또한 instance와 clone의 차이는 a를 b,c....z 만들어놓고 a의 형태를 따라해라 라고만 가르키는거면
clone은 a를 b,c.....z 만들어놓고 각각 고유로 계산할 준비에 대한 할당을 주기때문에 data의 비용및 time의 비용도 추가되지만
각각 고유의 형태를 가지고 있어서 변경이 가능한 반면 intance는 불가능하다.


1-1. instance
* mesh 를 복사하는 형태로는 instance => unity의 preFab 처럼 비용은 줄이면서 같은 속성을 가지는 (unity에서는 component를 전부 가진채로 주지만 (script포함))
babylon에서의 instance는 복사하는 원본의 data만을 가지고 말그대로의 복사라 개별성을 가지지 않고 원본 a의 속성이 바뀌면 전부 바뀌는 단점이 있지만
매우매우매우매우 비용이 저렴하다 (ex 자연의 나무 복사, 지형복사, 등등 정적이거나 제어할 필요없는 개체들을 뿌릴때 좋다.);

* P5 참조
* 다른 intance 예시 참조
https://playground.babylonjs.com/#HJGC2G#58

1-2 clone

* P6을해보자 

* instance 와 다르게 clone은 단일 개체를 복사하는 것으로 단일 개체만 (mesh만)해당되는 값을 복사하며 또한 계층에 비례한 복사이기때문에
위치도 그계층에 맞게 복사되며 (그래서 해당 계층의 parent를 null로 해서 최상단으로 올렸음)
* mesh에 해당되는 값들이 각각 고유로 생겨서 변경가능하다. (단 instance와 clone등 변경 가능, 불가능은 
scaling, rotation, position, enbaled 등 단순한 기본제공 mesh의 값을 제외한 custom이 불가능 하다는 의미이다 ex) material instance마다 따로 mapping하기 등)

1-3
* container.instantiateModelsToScene();

* P7 참조 for 문에 500->100으로 꼭 줄이고 실행

* 위에 두개는 단일 개체인 mesh만의 속성을 복사했다면
이것은 model자체의 import된 값을 복사하는 것이며 그래서 import된 각 개체들을 세부적으로 모두 조절할수 있는 반면
비싸지기때문에 해당은 각 플레이어 개체라든가 변경빈도수가 많거나 개인화 되는 것들에만 복사하는 것이 좋다.
* 그리고 최신버젼에서는 복사된 개체의 materials등이 원래 중복이여도 추가 생성이 되었는데 materials이 중복으로 사용된 개체는 자동으로 같이 사용하게끔
변경되었다 (최적화 이슈에 많은 활성화된 material들이 있어서 좋아진 방향이다.)
