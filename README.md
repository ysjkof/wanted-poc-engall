# Project

## 0. 설치, 실행 방법

실행 전 [nodejs](https://nodejs.org/)가 설치 돼 있어야 합니다.

- 터미널에서 프로젝트 경로로 이동
- `npm install` 입력해 패키지 설치
- `npm run dev` 입력해 프로젝트와 json-server 실행
- 브라우저에서 주소입력창에 **http://localhost:5173/** 입력

## 1. 구현 기능

### 1.A. 주간 테이블

**기본기능**

- 주간 일정 데이터를 가져와 요일, 시간 별로 노출한다
- 날짜는 표시하지 않는다
- 일정의 X버튼을 눌러 삭제한다
- "Add class schedule" 버튼을 눌러 "수업 일정 추가" 페이지로 이동한다

**추가기능**

- [x] minimal API server (JSON-SERVER 사용)
- [x] 사용자 삭제 전 확인 창 표시

### 1.B. 수업 일정 추가

**기본기능**

- 시작 시각을 선택할 수 있다
- 시각은 0~23까지다(0, 1, 2, 3, ..., 23)
- 분은 5분 간격이다(0, 5, 10, 15 ..., 55)
- 수업 시간은 항상 40분이다
- 수업 일정을 추가할 때 똑같은 시각에 여러 요일을 선택할 수 있다
- "Save" 버튼을 누르면 수업 일정 보기로 돌아간다(주간 테이블)
- 새로 추가된 일정이 주간 테이블에 노출된다
- 페이지가 다시 로드 되어도 수업 일정이 유지 된다

**추가기능**

- [x] 일정 추가 시 중복 방지
  - [x] 1. 선택한 시간의 중복된 요일 비활성화
  - [x] 2. "Save" 버튼을 누르면 post하기 전에 확인하고 경고

<img width="1396" alt="add" src="https://user-images.githubusercontent.com/77876601/181909413-aa5f351f-cfb2-4595-97ab-03f09d55a82d.png">

<img width="1391" alt="add_alert" src="https://user-images.githubusercontent.com/77876601/181909418-6829eea8-6691-468c-9873-5a3b5ab656d0.png">

## 2. 데이터 형태 설계

```ts
interface Schedule {
  id: number;
  startDate: Date;
}
```

수업시간은 40분으로 고정이기 때문에 startDate만 있으면 끝나는 시각을 알 수 있다. 데이터베이스에 startDate만 있고 데이터베이스 비용을 아낄 수 있다.

```ts
interface Schedule {
  id: number;
  startDate: Date;
  endDate: Date;
}
```

만약 수업시간이 40분만 아니라 30분, 50분 등 다양해진다면 데이터베이스에 끝나는 시각 열을 더하거나 수업 시간을 저장해서 관계를 줘야 한다. 이때 수정하는 비용이 크다. 서비스가 지속되면 수업시간의 다양화가 높은 확률로 일어날테니 데이터베이스에 두 개의 열을 사용했다.
