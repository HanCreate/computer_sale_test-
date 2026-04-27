# CumpStore – 컴퓨터 주변기기 판매 홈페이지

프리미엄 기계식 키보드, 게이밍 마우스 전문 쇼핑몰 랜딩페이지

## 📁 파일 구조

```
cumputer_sale_test/
├── index.html          ← 메인 홈페이지
├── manual.html         ← 소프트웨어 메뉴얼 페이지
├── style.css           ← 전체 스타일
├── script.js           ← 슬라이더 / 인터랙션 JS
├── images/
│   ├── banner1.png     ← 슬라이더 배너 1 (키보드)
│   ├── banner2.png     ← 슬라이더 배너 2 (마우스)
│   ├── banner3.png     ← 슬라이더 배너 3 (컬렉션)
│   ├── product1.png    ← 제품 카드 이미지 (키보드)
│   ├── product2.png    ← 제품 카드 이미지 (마우스)
│   ├── product3.png    ← 제품 카드 이미지 (마우스패드)
│   └── product_real.png ← 실제 제품 사진
└── README.md
```

## 🚀 GitHub Pages 배포 방법

1. 이 폴더의 내용을 GitHub 저장소에 Push
2. GitHub 저장소 → **Settings** → **Pages**
3. Source: **Deploy from a branch** 선택
4. Branch: `main` / `/ (root)` 선택 후 Save
5. 약 1~2분 후 `https://HanCreate.github.io/cumputer_sale_test` 에서 접속 가능

## ✏️ 네이버스토어 URL 변경 방법

`index.html` 과 `manual.html` 에서 `https://smartstore.naver.com` 를 실제 스토어 주소로 교체하세요.

예시:
```
https://smartstore.naver.com/여러분의스토어아이디
```

## ✏️ 슬라이더 이미지 교체 방법

`images/` 폴더의 `banner1.png`, `banner2.png`, `banner3.png` 를 원하는 사진으로 교체하면 됩니다.  
파일명을 동일하게 유지하거나, `index.html` 의 `<img src="images/bannerX.png">` 경로를 수정하세요.
