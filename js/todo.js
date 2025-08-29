const todoList = document.getElementById("todoList");
const taskModal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveTask");
const closeBtn = document.getElementById("closeModal");
let draggedItem = null;
// 기본 데이터
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
// localStorage에서 불러오기
function loadTasks() {
  const saved = localStorage.getItem("todoList");
  return saved ? JSON.parse(saved) : defaultTasks;
}
// localStorage에 저장
function saveTasks() {
  const tasks = [...todoList.querySelectorAll(".task-text")].map(
    (el) => el.textContent
  );
  localStorage.setItem("todoList", JSON.stringify(tasks));
}
// 리스트 렌더링
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
    delBtn.textContent = ":x:";
    delBtn.addEventListener("click", () => {
      taskEl.remove();
      saveTasks();
    });
    taskEl.appendChild(textSpan);
    taskEl.appendChild(delBtn);
    todoList.appendChild(taskEl);
  });
}
// 초기화
renderTasks(loadTasks());
// Drag & Drop 이벤트
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
// 모달 열기
addBtn.addEventListener("click", () => {
  taskModal.style.display = "flex";
  taskInput.value = "";
  taskInput.focus();
});
// 모달 닫기
closeBtn.addEventListener("click", () => {
  taskModal.style.display = "none";
});
// 저장 버튼 클릭 시 새로운 task 추가
saveBtn.addEventListener("click", () => {
  const newTask = taskInput.value.trim();
  if (newTask) {
    const tasks = loadTasks();
    tasks.push(newTask);
    saveTasks();
    renderTasks(tasks);
    taskModal.style.display = "none";
  } else {
    alert("할 일을 입력하세요!");
  }
});
// ESC 누르면 닫기
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    taskModal.style.display = "none";
  }
});
