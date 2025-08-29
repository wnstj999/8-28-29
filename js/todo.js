const todoList = document.getElementById("todoList");
const taskModal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveTask");
const closeBtn = document.getElementById("closeModal");
const shuffleBtn = document.getElementById("shuffleBtn"); // 랜덤 섞기 버튼

let draggedItem = null;

// ===== 기본 데이터 =====
const defaultTasks = [
  "출근 / 이메일 확인",
  "팀 미팅",
  "API 기능 개발",
  "학원 수업",
  "DB 마이그레이션 준비",
  "프론트엔드 버그 수정",
  "디자인팀 협업 미팅",
  "테스트 코드 작성",
  "보고서 정리",
  ":압정: 오늘 18시 퇴근 후 운동",
];

// ===== localStorage load/save =====
function loadTasks() {
  const saved = localStorage.getItem("todoList");
  return saved ? JSON.parse(saved) : defaultTasks;
}

function saveTasks(tasks = null) {
  if (!tasks) {
    tasks = [...todoList.querySelectorAll(".task-text")].map(el => el.textContent);
  }
  localStorage.setItem("todoList", JSON.stringify(tasks));
}

// ===== 리스트 렌더링 =====
function renderTasks(tasks) {
  todoList.innerHTML = "";
  tasks.forEach((taskText) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.draggable = true;

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = taskText;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "❌";   // ← 깨지는 ":x:" 대신 이모지 사용
    delBtn.addEventListener("click", () => {
      taskEl.remove();
      saveTasks();
      showToast("🗑️ 할 일이 삭제되었습니다!", "error");
    });

    taskEl.appendChild(textSpan);
    taskEl.appendChild(delBtn);
    todoList.appendChild(taskEl);
  });
}

// ===== 초기화 =====
renderTasks(loadTasks());

// ===== Drag & Drop =====
todoList.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("task")) {
    draggedItem = e.target;
    e.target.style.opacity = "0.1";
  }
});
todoList.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("task")) {
    draggedItem = null;
    e.target.style.opacity = "1";
    saveTasks();
    showToast("📌 순서가 변경되었습니다!");
  }
});
todoList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const target = e.target.closest(".task");
  if (target && target !== draggedItem) {
    target.classList.add("drag-over");
  }
});
todoList.addEventListener("dragleave", (e) => {
  if (e.target.classList.contains("task")) {
    e.target.classList.remove("drag-over");
  }
});
todoList.addEventListener("drop", (e) => {
  e.preventDefault();
  const target = e.target.closest(".task");
  if (target && target !== draggedItem) {
    target.classList.remove("drag-over");
    todoList.insertBefore(draggedItem, target);
  }
});

// ===== 모달 =====
addBtn.addEventListener("click", () => {
  taskModal.style.display = "flex";
  taskInput.value = "";
  taskInput.focus();
});

closeBtn.addEventListener("click", () => {
  taskModal.style.display = "none";
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    taskModal.style.display = "none";
  }
});

// ===== 저장 버튼 (새 task 추가) =====
saveBtn.addEventListener("click", () => {
  const newTask = taskInput.value.trim();
  if (newTask) {  
    const tasks = loadTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks);
    taskModal.style.display = "none";
    showToast("✅ 새로운 할 일이 추가되었습니다!");
  } else {
    showToast("⚠️ 할 일을 입력하슈!", "error");
  }
});

// ===== 랜덤 섞기 =====
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffleBtn.addEventListener("click", () => {
  let tasks = loadTasks();
  tasks = shuffleArray(tasks);
  saveTasks(tasks);
  renderTasks(tasks);
  showToast("🔀 목록이 랜덤하게 섞였습니다!");
});

// ===== Toast =====
function showToast(message, type="success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.classList.add("toast");

  if (type === "error") {
    toast.style.background = "linear-gradient(135deg, #E53935, #E35D5B)";
  }

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}
