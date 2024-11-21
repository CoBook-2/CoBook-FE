초기 설정 설명서
1. 디렉토리 구조 설명
   * public : 글로벌로 적용될 파일 저장 (ex 이미지, 폰트? 등)
   * src
     * components : 컴포넌트 저장
     * lib : 백엔드 api 연결할 핸들러(.ts 파일) 저장
     * mock : 개발 과정에서 쓰일 임시 데이터 저장
     * pages
       * _app.tsx : 전체 컴포넌트에 적용시킬 때 작업
       * _document.tsx : 이거 뭐 안 중요함
     * styles : 우린 일단 module.css 방식으로 작업함
     * types.ts : 개발 과정에서 자주 사용될 객체의 타입을 저장
   * .env : 환경변수 저장, 개발 진행되면서 .gitignore에 추가할 예정

추가 설정 설명서(2024-11-21-14:00)

src/components
/defaultModal.tsx
/defaultModal.module.css
: 모달 기본 컴포넌트

src/context
/AuthContext.tsx
: 로그인 상태 전역으로 관리해주는 코드

src/mock
/users.ts
: DB 연결 전에 간이로 만들어둔 임시 데이터셋(DB)

src/pages/api
/login.ts
: 백엔드 api 연결 전 간이로 만들어둔 임시 로그인 로직

src/pages/modal/login
/loginRequestModal.tsx
/loginRequestModal.module.css
: 로그인 요청 처리하는 모달

src/pages
/_app.tsx
: 로그인 상태 전역으로 관리하는 컴포넌트로 pageProps 싸놨음

src/pages
/spaceManagement.tsx
/spaceManagement.module.css
: SpaceManagementPage()에 로그인한 사용자 정보가 찍히는 것을 프론트에 찍어봤는데 잘 찍힘

윤정이에게 전달사항
1. mock 폴더에 임시 데이터 내용을 추가하고 거기서 데이터를 꺼내서 프론트에 붙이는 형식으로 작업하기
2. 필요시 api 폴더에 간이 백엔드 로직들을 만들어서 이용하기
3. 로그인할 때 아이디는 jjy092801, 비번은 0928임. 우리는 로그인한 유저의 정보를 DB에서 불러와서 처리해야됨을 잊지말고 작업하기
4. 만둘어둔 headerbar들 디자인은 아주 좋은데, 데이터를 하드코딩해서 나중에 백엔드와 연동할 때 코드 뜯어고칠게 많아질 것이 우려. mock 폴더에서 DB값 불러와서 HeaderBar에 적용하는 형태로 수정할 것.
