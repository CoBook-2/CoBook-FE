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
