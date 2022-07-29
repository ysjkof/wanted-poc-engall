# Project

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

## 2. 데이터 형태 설계

```ts
interface Schedule {
  id: number;
  startDate: Date;
}
```

수업시간은 40분으로 고정이기 때문에 startDate만 있으면 끝나는 시각을 알 수 있다. 데이터베이스에 startDate만 있고 DB를 아낄 수 있다.

```ts
interface Schedule {
  id: number;
  startDate: Date;
  endDate: Date;
}
```

그러나 만약 수업시간이 40분만 아니라 30분, 50분 등 다양해진다면 데이터베이스에 끝나는 시각이나 수업 시간을 저장해서 관계를 줘야 한다. 이때 데이터베이스를 수정하는 비용이 커진다.
서비스가 지속되면 수업시간의 다양화가 높은 확률로 일어날 것 같아서 데이터베이스에 두 개의 column을 사용했다.
