const greeting = document.querySelector('#greeting');
const countBox = document.querySelector('#count');
const attendanceButton = document.querySelector('#attendance-button');
const darkButton = document.querySelector('#dark-button');

// YYYY-MM-DD 형식 날짜 추출
function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 두 날짜 간의 일수 차이 계산
function getDaysDiff(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  const diffTime = d2 - d1;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

const todayStr = getTodayString();
let lastDate = localStorage.getItem('lastAttendanceDate');
let streakCount = parseInt(localStorage.getItem('streakCount') || '0', 10);

// 출석 및 금연 상태 검사
function checkAttendanceState() {
  if (!lastDate) {
    streakCount = 0;
  } else {
    const diffDays = getDaysDiff(lastDate, todayStr);
    // 어제 출석도 안 하고 2일 이상 지났다면 연속 출석 실패 (리셋)
    if (diffDays > 1) {
      streakCount = 0;
      localStorage.setItem('streakCount', '0');
    }
  }
  updateUI();
}

// 화면 문구 업데이트
function updateUI() {
  if (!countBox) return;

  if (lastDate === todayStr) {
    countBox.textContent = `🔥 연속 금연 ${streakCount}일 차 성공 중! (오늘 출석 완료)`;
    if (greeting) {
      greeting.textContent = `오늘도 금연 성공! 연속 ${streakCount}일 동안 상쾌한 일상을 유지 중입니다. 👍`;
    }
  } else {
    if (streakCount === 0) {
      countBox.textContent = `금연 도전 0일 차 (출석 버튼을 눌러 1일 차를 시작하세요!)`;
      if (greeting) {
        greeting.textContent = `오늘부터 금연 1일 차 도전을 시작해보세요!`;
      }
    } else {
      countBox.textContent = `🔥 연속 금연 ${streakCount}일 차 진행 중! (오늘 출석 버튼을 눌러주세요)`;
      if (greeting) {
        greeting.textContent = `어제까지 연속 ${streakCount}일 성공! 오늘도 잊지 말고 출석 도장을 찍어주세요.`;
      }
    }
  }
}

// 초기화 검사 실행
checkAttendanceState();

// 출석체크 버튼 클릭 이벤트
if (attendanceButton) {
  attendanceButton.addEventListener('click', function () {
    if (lastDate === todayStr) {
      alert('이미 오늘 금연 출석체크를 완료하셨습니다!');
      return;
    }

    if (!lastDate) {
      // 최초 출석
      streakCount = 1;
      alert('🎉 금연 1일 차 도전이 시작되었습니다! 매일 잊지 말고 출석을 찍어주세요.');
    } else {
      const diffDays = getDaysDiff(lastDate, todayStr);
      if (diffDays === 1) {
        // 연속 출석 성공
        streakCount += 1;
        alert(`🎉 금연 출석 완료! 연속 ${streakCount}일 차 달성!`);
      } else {
        // 날짜 누락으로 연속 실패 후 재시작
        streakCount = 1;
        alert('⚠️ 중간에 출석이 누락되어 금연 도전 실패! 오늘부터 다시 1일 차로 시작합니다.');
      }
    }

    lastDate = todayStr;
    localStorage.setItem('lastAttendanceDate', todayStr);
    localStorage.setItem('streakCount', streakCount.toString());

    updateUI();
  });
}

// 다크 모드 버튼 (카운터와 무관하게 동작)
if (darkButton) {
  darkButton.addEventListener('click', function () {
    document.body.classList.toggle('dark');
  });
}