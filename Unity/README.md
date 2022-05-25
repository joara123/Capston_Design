## 시간 부족과 바빌론으로 구현할 때 모델링의 한계점으로 유니티로 구현한 부분
---
<구현 전 큰 부분 계획>   
1. 플레이어 이동(+충돌)
2. 버튼 누르면 씬 이동
3. 360 이미지 띄우기(공학관 주요 장소)
4. 에셋 배치(공학관처럼 꾸미기)

<img src = "https://user-images.githubusercontent.com/92451281/170231599-5846611f-0814-4bd7-a17d-7a15252873af.png" width="50%" height="50%">

<기능 구현 계획>   
1. 유료 에셋 배치를 통해 공학관과 공학관 주변을 표현
2. point(빨간색 발판)에 충돌하면 메뉴 창을 통해 원하는 서비스 선택
3. 메뉴에서 멘토링실 예약시스템 구현
4. 360 카메라로 북카페, 멘토링실, 중앙현관 등을 찍어 360도로 둘러볼 수 있도록 구현
5. 각 층 마다의 강의실, 교수실의 정보를 담은 리스트를 작성하여 정보 제공

<구현 결과>
* 유료 에셋 배치를 통해 공학관과 공학관 주변을 표현
   
<img src = "https://user-images.githubusercontent.com/92451281/170244288-40633b3b-459c-4165-b06f-e3404577211b.png" width="50%" height="50%"><img src = "https://user-images.githubusercontent.com/92451281/170244539-2a65bdac-8d88-47c1-91e1-c62975598539.png" width="50%" height="50%">
<img src = "https://user-images.githubusercontent.com/92451281/170244594-1120088a-b4b5-4ff3-8cc4-978d53e038cb.png" width="50%" height="50%">

* point(빨간색 발판)에 충돌하면 메뉴 창을 통해 원하는 서비스 선택

<img src = "https://user-images.githubusercontent.com/92451281/170244641-e08d9467-eb5d-44ac-87e4-37dfd8469b0a.png" width="50%" height="50%"><img src = "https://user-images.githubusercontent.com/92451281/170245680-7173fa00-1a9b-476a-bd58-1c386fe950a7.png" width="50%" height="50%">

* 메뉴에서 멘토링실 예약시스템 구현

<img src = "https://user-images.githubusercontent.com/92451281/170245834-10b55e06-775c-4e7a-a3aa-ccafd88b2d10.png" width="50%" height="50%"><img src = "https://user-images.githubusercontent.com/92451281/170245900-c5513914-a53b-41cc-8d25-ddba67d14ddf.png" width="50%" height="50%">

* 360 카메라로 북카페, 멘토링실, 중앙현관 등을 찍어 360도로 둘러볼 수 있도록 구현

<img src = "https://user-images.githubusercontent.com/92451281/170246017-12b5dace-b2f0-4189-a735-060b6368ca21.png" width="50%" height="50%"><img src = "https://user-images.githubusercontent.com/92451281/170246231-8b6be46e-750e-4b4b-a3b3-09943b6b44a1.png" width="50%" height="50%"><img src = "https://user-images.githubusercontent.com/92451281/170246326-3bb4d398-1bad-44d6-a28b-6334785de35c.png" width="50%" height="50%"><img src = "https://user-images.githubusercontent.com/92451281/170246443-971ba87f-d565-4445-8312-0596d77d4a6b.png" width="50%" height="50%"><img src = "https://user-images.githubusercontent.com/92451281/170246481-a07d736e-9bd2-4865-8972-7497f2ddb699.png" width="50%" height="50%">

* 각 층 마다의 강의실, 교수실의 정보를 담은 리스트를 작성하여 정보 제공

<img src = "https://user-images.githubusercontent.com/92451281/170246715-77023e9a-82ad-46cc-b75f-ddc89b62b89a.png" width="50%" height="50%"><img src = "https://user-images.githubusercontent.com/92451281/170246735-dea76533-d67d-49c4-98b8-fed165bd573c.png" width="50%" height="50%">

* 그 외, 모든 버튼 구현 (확인, 돌아가기, 옆으로 넘기는 등, 메뉴 버튼, 멘토링 버튼 등)

<플레이어 이동 방법>
* 상화좌우(w,a,s,d 키)
* 마우스 이동(시야 이동)
* 360도 둘러보기에서 마우스 드래그 (360도 이미지를 둘러볼 수 있음)
