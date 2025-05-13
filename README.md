# Growthon_FE
2025 성장톤 6팀 프론트엔드 개발 저장소.


### 🧑🏻‍💻 Developers 

|                                                         FE                                                         |                                                               FE                                                               |
|:------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|
| [<img src="https://avatars.githubusercontent.com/kingluminance" width="100px;" alt="kingluminance"/>](https://github.com/kingluminance) | [<img src="https://avatars.githubusercontent.com/hxrdtxlxvx" width="100px;" alt="hxrdtxlxvx"/>](https://github.com/hxrdtxlxvx) |
|                                                      **왕휘도**                                                       |                                                            **김민주**                                                             |



---

## ⚙️ Stack

| 구분 | 기술 |
|------|------|
| 프레임워크 | React, Vite |
| 스타일링 | Tailwind CSS, CSS Modules |
| 라우팅 | React Router |

- Node.js: 20.19.1
- React Router: 6.30.0
- Tailwind CSS: 3.4.17

### 🏷️ Commit Convention

---
| 타입         | 용도                                |
| ---------- | --------------------------------- |
| `feat`     | 새로운 기능 추가                       |
| `fix`      |  버그 수정                          |
| `docs`     | 문서 수정 (README 등)               |
| `style`    | 코드 포맷팅, 세미콜론 누락 등 (논리 변화 없음)   |
| `refactor` | 코드 리팩토링 (동작 변화 없음)             |
| `test`     |  테스트 코드 추가/수정                    |
| `chore`    | 빌드 설정, 패키지 설치, CI 설정 등 기타 작업   |
| `perf`     | 성능 개선                          |
| `ci`       | CI/CD 관련 설정 변경                |
| `build`    |  빌드 관련 작업 (webpack, vite 설정 등) |

### example
> feat: 회원가입 폼 UI 추가

---

### 🎋 Branch Convention
- **main**: 배포용 브랜치 (항상 안정적인 상태 유지)
- **develop**: 통합 개발 브랜치 (다음 배포를 준비)
- **feature/**: 기능 개발 및 이슈 해결 브랜치 (작업 단위)
#### Branch Flow
 ```
Main Branch
  ▲
  └── Develop Branch ── 테스트 완료 후 병합 
                              ▲
                              └── Feature Branch ── 작업 완료 후 병합 
                                          └── 새로운 기능 추가