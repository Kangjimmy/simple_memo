# simple_memo

## 프로젝트 구성

* 앞단은 html, css, js, 뒷단은 nodejs framework로 express를 사용, db는 mysql을 사용함.
  
* 폴더 구조

📦simple_memo

 ┣ 📂public
 
 ┃ ┣ 📂css
 
 ┃ ┃ ┣ 📜board.css
 
 ┃ ┃ ┣ 📜common.css
 
 ┃ ┃ ┣ 📜notFound.css
 
 ┃ ┃ ┣ 📜sign.css
 
 ┃ ┃ ┗ 📜signupSuccess.css
 
 ┃ ┣ 📂img
 
 ┃ ┃ ┣ 📜background1.png
 
 ┃ ┃ ┣ 📜background2.jpg
 
 ┃ ┃ ┣ 📜favicon.ico
 
 ┃ ┃ ┣ 📜logo.jpg
 
 ┃ ┃ ┣ 📜sign_img.jpg
 
 ┃ ┃ ┗ 📜sign_img2.jpg
 
 ┃ ┗ 📂js
 
 ┃ ┃ ┣ 📜board.js
 
 ┃ ┃ ┣ 📜sign.js
 
 ┃ ┃ ┗ 📜webSpeech.js
 
 ┣ 📂routes
 
 ┃ ┣ 📜boardRouter.js
 
 ┃ ┗ 📜signRouter.js
 
 ┣ 📂utils
 
 ┃ ┗ 📜mysqlConnection.js
 
 ┣ 📂views
 
 ┃ ┣ 📜board.ejs
 
 ┃ ┣ 📜notFound.ejs
 
 ┃ ┣ 📜sign.ejs
 
 ┃ ┗ 📜signupSuccess.ejs
 
 ┣ 📜.gitignore
 
 ┣ 📜app.js
 
 ┣ 📜package-lock.json
 
 ┗ 📜package.json
 

* DB 구조
  
  member, memo 테이블로 이루어져 있음.
  
  member테이블은 id를 pk로 가지며,
  
  memo테이블은 fk로 member테이블의 pk인 id를 연결시켰고,
  
  memo테이블의 pk은 no,id로 설정함


  __SQL__
  
  CREATE TABLE member (
  
	id			varchar(30)	primary key,

	pw			varchar(65)	NULL,

	name			varchar(54)	NULL,

	tel			varchar(11)	NULL,

	reg_date		datetime	NULL

  );


  CREATE TABLE Memo (
  
	no			int		NOT NULL auto_increment,

	id			varchar(30)	NOT NULL,

  	memo_color		int		NOT NULL,
  
	memo		    	text		NULL,

	reg_date	  	datetime	NULL,

	mod_date	  	datetime	NULL,

  FOREIGN KEY (id) REFERENCES member (id),
  
  primary key (no, id)
  
  );


* 대략적인 파일들 쓰임새

  package.json, package-lock.json      npm 패키지들의 정보가 저장되어있음
  
  app.js                               시작하는 파일
  
  public/                              정적 파일
  
  routes/                              요청을 확인해 페이지를 rendering해주거나, fetch처리를 해줌
  
  views/                               rendering되는 페이지들
  
  utils/                               node에서 util로 사용되는 파일
  
  
## 프로젝트 프로그램 설치방법

1. 프로젝트를 github에서 받음
   
2. mysql에 위의 테이블을 생성
   
3. 프로젝트 최상단에 .env파일을 생성
   
4. .env파일에 아래 변수를 넣어줌
   
	PORT=서버포트
	
	DB_HOST= db ip
	
	DB_USER= db id
	
	DB_PW= db pw
	
	DB_NAME= db table명
	
	DB_PORT= db port
	
	SESSION_SECRET= 세션시크릿

5. npm install로 패키지를 받음
    
6. node ./app.js로 실행
    


## 프로젝트 프로그램 사용법

* 기본 동작

상단 왼쪽의 + 버튼으로 메모를 추가할 수 있음

메모 안 focus 상태에서 하단 오른쪽의 녹음버튼을 누르고 이야기할 시 web speech api 기능으로 메모를 작성할 수 있음

메모를 더블클릭시 삭제됨

메모 작성후 1초이내에 input 동작이 없으면 메모내용이 자동 저장됨.


* 키보드 단축키
  
  왼쪽alt+a : 메모추가
  
  왼쪽alt+h : web speech api 기능으로 메모 작성
  

## 버전 및 업데이트 정보

v1.0 -> 기본버전

v2.0 -> 메모의 컬러선택기능 추가
