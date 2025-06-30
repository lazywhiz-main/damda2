# Google Analytics 설정 가이드

## 1. Google Analytics 계정 설정

### 단계 1: GA4 속성 생성
1. [Google Analytics](https://analytics.google.com)에 로그인
2. **관리** → **계정 만들기** 클릭
3. **속성 만들기** → **웹사이트** 선택
4. 웹사이트 정보 입력:
   - 속성 이름: `담다 웹사이트`
   - URL: `https://yourdomain.com`
   - 업종: `예술 및 엔터테인먼트`

### 단계 2: 측정 ID 확인
1. **관리** → **데이터 스트림** 클릭
2. 웹 스트림을 클릭하여 측정 ID 확인
3. `G-XXXXXXXXXX` 형식의 ID 복사

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음을 추가:

```bash
# Google Analytics 측정 ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**⚠️ 주의사항:**
- 실제 측정 ID로 `G-XXXXXXXXXX`를 교체하세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다

## 3. 설정 확인

### 개발 환경에서 확인
```bash
npm run dev
```

브라우저 개발자 도구 콘솔에서 다음 메시지를 확인:
- 개발 모드: `"Google Analytics disabled in development mode"`
- 프로덕션 모드: `"Google Analytics initialized with ID: G-XXXXXXXXXX"`

### 실시간 추적 확인
1. Google Analytics → **보고서** → **실시간**
2. 웹사이트를 방문하여 실시간 사용자 수 확인

## 4. 추적되는 이벤트

현재 설정된 추적 이벤트들:

### 자동 추적
- **페이지 뷰**: 모든 페이지 방문
- **세션**: 사용자 세션 정보

### 맞춤 이벤트
- **갤러리 방문**: `view_gallery`
- **태그 필터링**: `filter_by_tag`
- **작품 조회**: `view_artwork`
- **네비게이션 클릭**: `navigation_click`
- **문의 양식 제출**: `form_submit`
- **상품 조회**: `view_product`
- **장바구니 추가**: `add_to_cart`

## 5. 배포 시 확인사항

### Vercel 배포
1. Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**
2. 환경 변수 추가:
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX`

### 기타 호스팅
- 호스팅 플랫폼의 환경 변수 설정에서 동일하게 추가

## 6. 데이터 확인

### 주요 지표
- **실시간 사용자**: 현재 접속 중인 사용자
- **페이지 조회수**: 각 페이지별 방문 횟수
- **이벤트**: 갤러리 필터링, 문의 등의 상호작용
- **사용자 플로우**: 사용자의 웹사이트 탐색 경로

### 맞춤 보고서
1. **이벤트** → **맞춤 이벤트** 에서 설정된 이벤트 확인
2. **탐색** → **자유 형식** 에서 원하는 지표 조합하여 분석

## 7. 개인정보 보호

현재 설정은 다음을 준수합니다:
- **쿠키 동의**: 필요에 따라 추가 구현 가능
- **IP 익명화**: GA4에서 기본 제공
- **데이터 보존**: Google의 기본 설정 사용

## 8. 문제 해결

### GA가 작동하지 않는 경우
1. 측정 ID 확인: `.env.local` 파일의 ID가 정확한지 확인
2. 환경 변수 재시작: 서버 재시작 후 확인
3. 브라우저 캐시: 시크릿 모드에서 테스트
4. 애드블로커: 애드블로커 비활성화 후 테스트

### 콘솔 에러가 발생하는 경우
- `gtag is not defined`: GA 스크립트 로딩 확인
- 네트워크 차단: 방화벽이나 애드블로커 확인

## 9. 추가 설정 (선택사항)

### 향상된 전자상거래
스토어 기능 확장 시 추가 가능:
```typescript
// 구매 완료 추적
trackEvents.purchase(orderId, value, items);
```

### 쿠키 동의 관리
GDPR 준수를 위한 쿠키 동의 배너 추가 가능

### 맞춤 측정기준
특정 사용자 행동에 대한 추가 측정기준 설정 가능 