// -------------------------------
// localStorage에 글쓴이 데이터 저장
// -------------------------------
const authors = ["홍길동", "김철수", "이영희"];
if (!localStorage.getItem("authors")) {
  localStorage.setItem("authors", JSON.stringify(authors));
}
// select에 옵션 추가
const authorSelect = document.getElementById("author");
const savedAuthors = JSON.parse(localStorage.getItem("authors"));
savedAuthors.forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  authorSelect.appendChild(option);
});
// -------------------------------
// Form 제출 이벤트
// -------------------------------
const form = document.getElementById("postForm");
form.addEventListener("submit", function (e) {
  if (!this.checkValidity()) {
    e.preventDefault();
    alert("입력값을 확인해주세요!");
  } else {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.category = formData.getAll("category"); // 체크박스 여러 개
    console.log("제출 데이터:", JSON.stringify(data, null, 2));
    alert("게시물이 등록되었습니다!");
  }
});
form.addEventListener("submit", function (e) {
  e.preventDefault(); // 기본 제출 막기
  const elements = this.elements;
  console.log("===== Form Elements 상세 출력 =====");
  for (let el of elements) {
    if (!el.name && !el.id) continue; // name, id 둘 다 없으면 패스
    let info = `[${el.tagName}] id="${el.id}" name="${el.name}" type="${el.type}"`;
    if (el.type === "checkbox") {
      info += ` | value="${el.value}" | checked=${el.checked}`;
    } else if (el.type === "radio") {
      info += ` | value="${el.value}" | checked=${el.checked}`;
    } else {
      info += ` | value="${el.value}"`;
    }
    console.log(info);
  }
  console.log("================================");
  author_print();
});
// -------------------------------
// 엔터키 입력 시 submit 트리거
// -------------------------------
form.addEventListener("keydown", function (e) {
  // 최신 브라우저 → e.key === "Enter"
  // 구버전 호환 → e.keyCode === 13
  if ((e.key === "Enter" || e.keyCode === 13) && e.target.tagName !== "TEXTAREA") {
    e.preventDefault(); // textarea에서는 줄바꿈 허용
    form.requestSubmit(); // 최신 브라우저용
    // form.dispatchEvent(new Event("submit")); // 구버전 fallback
  }
});
// -------------------------------
function author_print() {
  console.log("author_print -- getElementById - ", document.getElementById("title1"));
  console.log("author_print -- querySelector - ", document.querySelector("#title1"));
  console.log("author_print -- getElementsByName - ", document.getElementsByName("title1"));
  console.log("author_print -- getElementsByClassName - ", document.getElementsByClassName("title1"));
}
// textarea blur 이벤트
const textarea = document.getElementById("content");
textarea.addEventListener("blur", function () {
  if (this.value.trim() !== "") {
    alert("환영합니다!");
  }
});
authorSelect.focus();
function author_print() {
  console.log("author_print -- getElementById - ", document.getElementById("title").innerHTML);
  console.log("author_print -- querySelector - ", document.querySelector("#title").innerHTML);
  console.log("author_print -- getElementsByName - ", document.getElementsByName("title").innerHTML);
  console.log("author_print -- getElementsByClassName - ", document.getElementsByClassName("title").innerHTML);
const elems = document.getElementsByName("title");
// 첫 번째 요소
console.log(elems[0].value);
// 두 번째 요소 값
console.log(elems[1].value);
 const elems1 = document.getElementsByClassName("title");
  console.log(elems1[0].textContent); // 첫 번째
  console.log(elems1[1].textContent); // 두 번째
}






