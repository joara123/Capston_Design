Babylon.js vscode & local environment set up

기본적으로 javascript 만들수있지만 document 정규식과 및 추후 편의를 위해 typescript 기반함

1. node.js 와 npm(node.js설치시 종속 설치됨) 설치하기

node.js : https://nodejs.org/en/ -> 16.xx.x LTS 설치 (max이면 other Downloads -> maxOS installer)
cmd에서 버젼 및 설치 확인 node -v , npm -v (전역설치되어서 아무위치에서나 확인하면 된다.)
16.xx.x , 8.x.x 등의 버젼이 나오면 정상 설치됨

2. Example 폴더 만들기

폴더 위치에서 (지역 설치) windows 터미널 열기 or git bash here (git설치되있으면) 아무 js.ts,html 파일 만든후 vscode로 터미널=terminal-new terminal 열기 [이하 터미널]
2-1 npm init -> 다음과 P1의 노란 부분처럼 (원래 흰색이 맞음) 입력하면 현 폴더에 package.json 생성 (npm install시 해당 목록에 버젼이 명시되어지고 npm관련 세팅과 연관됨)

2-2 package.json을 열고 name 부분의 package대신 이름 변경 scripts내에 "build": "webpack" 추가 P2참조

2-3 그런다음 터미널에서 npm install --save-dev typescript webpack ts-loader webpack-cli 입력 -> node_modules폴더 및 파일과 package-lock.json생성됨 
(node_modules은 npm으로 설치된 모듈의 경로가 모여있는것이며(추후 import의 경로가 된다) package-lock.json은 npm으로 설치된 버젼의 추적 및 정확성 유추 등의 이유로 자동 생겨짐)

2-4 현 폴더에 webpack.config.js 생성 후 안에 밑 내용을 입력 P3참조
----------------------------------------------------------------------------------------------------------------------------------------------
```ts
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [
      
    ],
    resolve: {
        fallback: {
          'fs': false,
          'path': false, 
      }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    externals: {
        "earcut": true
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}
```
----------------------------------------------------------------------------------------------------------------------------------------------
2-5 현 폴더에 tsconfig.json 생성후 안에 밑 내용을 입력 (지금 에러나도 괜찮음) P4참조
----------------------------------------------------------------------------------------------------------------------------------------------
```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "noResolve": false,
        "noImplicitAny": false,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true,
        "experimentalDecorators": true,
        "isolatedModules": false,
        "lib": [
            "dom",
            "es2015.promise",
            "es5"
        ],
        "declaration": true,
        "outDir": "./"
    },
    "files": [
        "./src/app.ts"
    ]
}
```
----------------------------------------------------------------------------------------------------------------------------------------------
2-6 현폴더에 index.html 생성 및 다음과 같이 쓰고(연결 프로그램을 기본적으로 vscode로 해둔다)  P5참조
html을 임시적으로 chrome edge등으로 열어 dev tools의 console(f12누르면 됨) 에서 제대로 나오는지 확인한다  P6참조

나오는것을 확인하면 다음과 같이 수정해준다 P7참조

3. babylon 및 script 세팅하기 (npm기반)

3-1 터미널에서
npm i babylonjs@4.2.1
npm i @babylonjs/inspector@4.2.1
npm i babylonjs-materials@4.2.1
npm i babylonjs-loaders@4.2.1
npm i babylonjs-materials@4.2.1
npm i babylonjs-post-process@4.2.1
npm i babylonjs-procedural-textures@4.2.1
각각 설치한다 그런후 package.json확인 P8과 다른부분이 있는지 확인

3-2 src폴더 생성 후 들어가서 app.ts파일 생성 그후 다시 나온다
나온 현폴더위치(packge.json등등 있는 위치) 터미널에서 (code .)입력시 현폴더 기준으로 vscode가 열린다 이제 터미널은 끄면된다(vscode의 터미널로 쓰는편이 정신건강에 좋다.)
 = 파일 구조 =
Example
ㄴ node_modules - .bin ,@babylonjs ....
ㄴ src - app.ts
ㄴ index.html
ㄴ package.json
ㄴ package-lock.json
ㄴ tsconfing.json
ㄴ webpack.config.js

3-3 P9처럼 app.ts로 간다

3-4 P10과 같이 적고 ( Cntl+s 를 꼭 누릅니다 ) vscode 내에 터미널에서 npm run build 입력 (html에서 변동사항은 일반적인 저장시 바로 적용되지만 app.ts는 빌드해서 webpack화 되어야 적용이 된다.)
그러면 dist폴더 생성밑 index.js, index.js.map생성이 된다

3-5 index.html을 수정한다. P11참조
----------------------------------------------------------------------------------------------------------------------------------------------
```html
<!DOCTYPE html>
<head>
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            overflow: hidden;
        }

        .renderCanvas {
            width: 100%;
            height: 100%;
        }

    </style>
</head>

<body>
    <div id="canvasZone">
        <canvas id="renderCanvas"> </canvas>
    </div>
</body>

<script>
    let canvas = document.getElementById("renderCanvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;   

    window.addEventListener('resize', (e) => {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;   
    })
</script>
<script src="dist/index.js"></script>
</html>
```
----------------------------------------------------------------------------------------------------------------------------------------------
3-6 html을 열어도되고 vscode extensions의 liveserver설치  P12참조
오른쪽 하단 Go live 클릭 P13 참조

열어서 P14처럼 나오면 성공
