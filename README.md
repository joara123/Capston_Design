# Capstone_Design
### 메타버스 콘텐츠 제작을 위한 메타버스 플랫폼 개발
### The Metaverse Platform Development for Metaverse Content Production
<img src="https://user-images.githubusercontent.com/92451281/170306434-4c273e91-4c47-4734-a160-27203d492c6e.png" width="48%" height="48%"><img src="https://user-images.githubusercontent.com/92451281/170306661-4e25c3a9-480c-426a-9b66-72af2419c114.png" width="50%" height="50%">

### 팀명 - 어사유사
### 팀원 : 김소희(팀장), 송지원, 양혜원
---
## <프로젝트 실행계획> ~22.03.17
## 1. 프로젝트 개요 - project overview   
메타버스는 국내 기업 및 대학 등 다양한 분야에서 관심을 갖고 활용하고 있는 기술로 이번 프로젝트에서 다방면으로 활용 가능한 웹기반의 메타버스 플랫폼을 제작할 예정이며, 이 프로젝트로 많은 사람들이 웹상에서 다양한 공간에 대해 쉽게 접하고 필요한 정보를 얻어갈 수 있을 것으로 생각함   

The Metaverse is a technology that is interested in and used in various fields such as domestic companies and universities, and we plan to create a web-based Metaverse platform that can be used in various ways in this project, so many people can easily access various spaces on the web and get necessary information.   

## 2. 프로젝트의 목표 및 내용 (개발목표) - Project Objectives and Contents (Development Objectives)   
외산 게임엔진에 대한 의존도를 낮추고, 웹에서 구동되는 메타버스 플랫폼 자체 개발을 목표로 함. 회사의 3D 콘텐츠 개발 기술력을 활용해 실증화 가능한 서비스 개발 목표   
게임엔진(Unity, Unreal)을 활용한 메타버스 플랫폼 개발(VR/AR 기술 적용, 360도 파노라마 기능 개발)해 소상공인 및 지역경제에 기여할 수 있는 맞춤형 기능 구현   
범용적인 플랫폼 개발을 위한 Web 3D 기반 Three.js Babylon.js 등 타입스크립트를 활용한 콘텐츠 개발   
Unity3D와 360도 카메라(insta130 ONE X2)를 사용하여 메타버스 플랫폼 개발. 제작한 플랫폼으로 공대 1층 SW빌리지를 구현해 다양한 기능을 넣어 제작. 만들어진 기능은 이후에 소상공인을 위한 콘텐츠 제작에서도 사용될 수 있게 제작.

It aims to reduce dependence on foreign game engines and develop its own web-powered Metaverse platform. The goal is developing services that can be demonstrated using the company's 3D content development technology.   
We well develop a Metaverse platform using Unity (Unreal) (application of VR/AR technology, development of 360-degree panorama function) to implement customized functions that can contribute to small business owners and the local economy.    
The Metaverse contents will be developed using scripts such as Web 3D-based Three.js and Babylon.js for general-purpose platform development.    
After distributing the produced platform, various festivals, travel destinations, and unique places in the region can be used as Metaverse games or virtual experiences through avatars. By modifying and utilizing the platform with various contents, it can contribute to small business owners and the local economy.    

## 3. 기대효과 및 활용방안 - expected effect and utilization plan   
제작된 플랫폼을 배포 후 다양한축제나 여행지, 지역의 특색있는 장소를 아바타를 통한 메타버스 게임이나 가상체험 등으로 사용될 수 있음.   
플랫폼을 다양한 콘텐츠로 수정, 활용할 수 있도록 하여, 소상공인 및 지역경제에 기여할 수 있도록 함.  

After distributing the manufactured platform, various festivals, travel destinations, and unique places in the region can be used as Metaverse games or virtual experiences through avatars.    
The platform can be modified and utilized with various contents so that it can contribute to small business owners and the local economy.  

---
## <중간 보고> ~22.04.13
## 1. 과제 목적
코로나19 여파로 콘서트나 페스티벌과 같이 많은 사람들이 모이는 대부분의 행사들은 연기되거나 없어지는 등 시행되기 어려워지게 되었고, 상황에 따라 비대면으로 진행된다. 이러한 상황으로 인해 메타버스는 다양한 분야에서 더욱 주목받고 있다. 때문에 이제까지 진행되기 어려웠던 다양한 행사들이 현실이 아닌 메타버스 속에서 충분히 이루어질 수 있을 것이라 기대된다.

메타버스는 국내 기업 및 대학 등 다양한 분야에서 관심을 가지고 활용하고 있는 기술로, 현실 세계와 같은 사회, 경제, 문화 활동이 이뤄지는 3차원 가상세계를 일컫는 말이다. 메타버스에서는 아바타를 활용해 단지 게임이나 가상현실을 즐기는 데 그치지 않고 실제 현실과 같은 문화적, 사회적 활동을 할 수 있다. 또한 자신의 캐릭터를 골라 다른 사람과 소통할 수 있고, 메타버스로 제작된 맵에 만들어진 다양한 기능을 사용할 수 있다.
  
유니티 또는 언리얼 엔진을 이용해 개발을 하게 되면 사용자는 애플리케이션을 설치하고 사용해야 한다. 하지만 사용자의 입장에서는 일회성으로 사용하기 위해서 설치를 해야만 한다는 점이 비효율적으로 느껴질 수 있다. 때문에 해당 행사 이후에는 사용량이 줄어드는 것이 일반적이다. 이러한 이유로 애플리케이션 설치를 하지 않고도 웹사이트를 통해 바로 접속해 실행할 수 있는 babylon.js를 사용해 메타버스를 개발하는 것이 조금 더 사용자들이 편리하게 사용할 수 있을 것이라 생각된다.    

최종적으로는 개발하고자 하는 메타버스 플랫폼이 소상공인 및 지역 경제에 기여할 수 있는 기능을 가진 플랫폼이 되도록 개발하고자 한다.

## 2. 과제 추진 내용
메타버스 플랫폼을 제작하기 위해 사용할 오픈소스 “babylon”은 해외에서 많이 사용되고 있다. 하지만 국내에서는 해외에 비해 매우 적은 수인 2-3개 정도의 기업만이 해당 소스를 사용하고 있다. 때문에 관련 자료를 통한 공부와 개발을 위한 기본 환경을 설정하기에 여러 어려움이 있었다.

이러한 문제점을 해결하기 위해 협업체인 “더 픽트”와의 회의를 진행하였고, 기업체에서는 앞으로 진행할 방향성을 잡아주시는 것뿐만 아니라, 개발을 위한 기본 설정, 기초적인 예제, 에셋 제공 등 많은 도움을 주시고 있다. 현재는 제공받은 자료들을 통해 관련 언어 공부를 진행 중에 있으며, 추후 중간고사 이후에 본격적인 메타버스 플랫폼 개발을 진행할 예정이다.

360도 카메라를 이용해 공학관 일부를 촬영, 해당 이미지를 유니티를 활용해 VR 콘텐츠 제작을 진행해 보았으나, 이미지가 자연스럽게 이어지지 못했다. 이와 관련된 내용은 조금 더 공부 후에 플랫폼 개발이 진행되는 상황을 보면서 추가하는 방향으로 계획 중이다.

현재 공부하고 있는 내용들은 깃허브에 모두 업로드하는 중.

- 3월 7~14일 : Github repository 작성, 프로젝트 신청서 작성, 추가할 기능 찾아보기
- 3월 15~21일 : 360 카메라 사용법 익히고 이미지 활용해 만들어보기 
- 3월 22~28일 : 더 픽트 회의, babylon 기본 환경설정 세팅, 구 제작 
<img src="https://user-images.githubusercontent.com/92451281/170310315-3380dd9e-e35f-4005-9423-1fd81fd6e815.png" width="50%" height="50%">
<img src="https://user-images.githubusercontent.com/92451281/170310377-fd614fa0-84c5-433e-8503-53b2cbd52388.png" width="50%" height="50%">

- 3월 29일~4월 4일 : babylon 개인 공부, camera 활성법, light 종류, material과 texture 예제 수행
<img src="https://user-images.githubusercontent.com/92451281/170311079-de145476-8f91-413d-9d9d-251a3db4cfd2.png" width="50%" height="50%">

- 4월 5~11일 : model 관련 확장자 및 방식, babylon scene의 debug 및 inspector, hierachy 보는 법
<img src="https://user-images.githubusercontent.com/92451281/170311525-dd628737-dae0-4fe4-95db-0c9d5f797b29.png" width="50%" height="50%">

## 3. 과제 추진 계획
더 픽트에서 제공해 주시는 babylon 내용을 충분히 숙지한 후 회의를 통해 메타버스 플랫폼 개발 시작.   
공학관 1층의 소프트웨어 빌리지를 예시로 하여 여러 기능들을 추가한 메타버스 플랫폼 제작

---
## <결과 보고> ~22.05.27
