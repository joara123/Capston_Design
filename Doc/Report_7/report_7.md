### 4월 28일 ~ 5월 9일 진행한 내용
### <이번주에 진행한 내용>
* class 생성 & 선언
* waterMaterail 추가
  * import * as MAT from "babylonjs-materials"으로 내장된 materials을 가져온다.
  * water의 color, 바람세기, 높이 등 정의 가능
* shadow 생성
* 최종이미지(+shadow)

![image](https://user-images.githubusercontent.com/92451281/168000073-cfdc6860-1e42-4216-821e-52b6379b3b58.png)
* 오류 해결

![image](https://user-images.githubusercontent.com/92451281/168000127-c44565f5-a2d9-4227-812c-b13fded997fe.png)
  * ts(7016) : .js 확장자 허용 하지 않음.
* tsconfig.json에서 "allowJS" : true 추가 입력
* 아래처럼 폴터 만들고, d.ts 추가 후 아래와 같이 입력
  * declare module 'tempMap'
  
![image](https://user-images.githubusercontent.com/92451281/168000329-8436ea32-f411-447e-b0ae-8a64e82b451d.png)
* tsconfig.json에서 아래와 같이 추가
  * "typeRoots": ["./@types", "./node_modules/@types"]


---
### <다음주에 진행할 내용>
* 구현하고 싶은 형태에 따라 추후내용 진행
* 자문보고서 작성
---
### <질문 요청 사항, 하고 싶은 말>
