//UI요소 선택 및 지역 변수 설정
const makeButton = document.querySelector('.project-make');
const newBox = document.getElementById('new-box');
const closeBox = document.querySelector(".close");
const importanceList = document.querySelector(".dktmd");
const makeBtn = document.querySelector('.make');
const projectNameInput = document.querySelector('.project-name');
const projectList = document.querySelector('.list');
const newMakeBtn = document.querySelector(".new-make"); // 버튼 선택
const newMakeBox = document.querySelector(".new-make-box"); // 박스 선택
const newMakeBoxClose = document.querySelector(".new-mb-close"); // 닫기 버튼 선택
const newWorkMake = document.querySelector(".new-work-make");
const newInputWork = document.querySelector(".new-input-work");
const importanceSelect = document.getElementById("op-choose");
const redBox = document.querySelector(".red-box");
const orangeBox = document.querySelector(".orange-box"); 
const blueBox = document.querySelector(".blue-box");
const greenBox = document.querySelector(".green-box");

let currentVisibleProject = null;
let projectTasks = {}; // 각 프로젝트별 할일을 저장하는 객체

// new-make 버튼 클릭 이벤트 
document.addEventListener('click', (e) => {
    if(e.target.matches('.new-make')) {
        const newMakeBox = e.target.closest('.dktmd').querySelector('.new-make-box') || document.querySelector('.new-make-box');
        if(newMakeBox) {
            newMakeBox.style.display = 'block';
        }
    }
});

// new-make-box 닫기 버튼 이벤트
newMakeBoxClose.addEventListener('click', () => {
    newMakeBox.style.display = 'none';
});

// "프로젝트 생성" 버튼을 클릭하면 입력 창을 표시
makeButton.addEventListener('click', () => {  
    newBox.style.display = 'block';
});

// 닫기 버튼을 클릭하면 입력 창을 숨김
closeBox.addEventListener('click', ()=> {
    newBox.style.display = 'none';
});

// "추가" 버튼을 클릭하면 새로운 프로젝트를 목록에 추가
makeBtn.addEventListener('click', () => { // 'makeBtn' 버튼 클릭 시 실행되는 이벤트 리스너 추가
    const projectName = projectNameInput.value.trim(); // 입력된 프로젝트명을 가져오고 공백을 제거

    if (projectName !== '') { // 프로젝트명이 비어 있지 않으면 실행
        const container = document.createElement('div'); // 프로젝트 이름과 삭제 버튼을 감쌀 div 생성
        container.style.display = 'flex'; // flexbox를 사용하여 가로 정렬
        container.style.alignItems = 'center'; // 요소들을 세로 중앙 정렬
        container.style.gap = '10px'; // 요소 사이 간격 10px 설정
        container.style.marginLeft = '60px'; // 왼쪽 여백 60px 설정

        const newProject = document.createElement('p'); // 프로젝트 이름을 표시할 <p> 요소 생성
        newProject.textContent = projectName; // <p> 태그에 입력된 프로젝트명 삽입
        newProject.style.cursor = 'pointer'; // 클릭할 수 있도록 커서 스타일 변경

        const deleteBtn = document.createElement('button'); // 프로젝트 삭제 버튼 생성
        deleteBtn.textContent = '삭제'; // 버튼에 '삭제'라는 텍스트 추가
        deleteBtn.style.padding = '5px 10px'; // 버튼 내부 여백 설정
        deleteBtn.style.borderRadius = '5px'; // 버튼의 모서리를 둥글게 설정
        deleteBtn.style.border = 'none'; // 버튼 테두리 제거
        deleteBtn.style.backgroundColor = '#202020'; // 버튼 배경색 설정
        deleteBtn.style.color = 'white'; // 버튼 글자 색상을 흰색으로 설정

        const newImportanceList = importanceList.cloneNode(true); // 중요도 목록(할 일 컨테이너)을 복사
        newImportanceList.style.display = 'none'; // 기본적으로 화면에 표시되지 않도록 설정

        const projectTitle = document.createElement('h1'); // 프로젝트 제목을 표시할 h1 태그 생성
        projectTitle.textContent = projectName; // 프로젝트 제목을 입력된 프로젝트명으로 설정
        projectTitle.style.color = 'white'; // 글자 색상을 흰색으로 설정
        projectTitle.style.marginLeft = '20px'; // 왼쪽 여백을 20px 설정
        newImportanceList.querySelector('.p-m').prepend(projectTitle); // 중요도 리스트 맨 앞에 프로젝트 제목 추가

        projectTasks[projectName] = {
            red: [],
            orange: [],
            blue: [],
            green: []
        }; // 프로젝트별 할 일 목록을 저장할 객체 생성

        newProject.addEventListener('click', () => { // 프로젝트 이름을 클릭하면 실행되는 이벤트 리스너 추가
            if (currentVisibleProject) { // 현재 선택된 프로젝트가 있으면
                currentVisibleProject.style.display = 'none'; // 기존 프로젝트 내용을 숨김
            }

            // 현재 프로젝트의 할 일 리스트를 화면에서 초기화
            redBox.innerHTML = ''; // 빨간색 중요도 박스 초기화
            orangeBox.innerHTML = ''; // 주황색 중요도 박스 초기화
            blueBox.innerHTML = ''; // 파란색 중요도 박스 초기화
            greenBox.innerHTML = ''; // 초록색 중요도 박스 초기화

            // 저장된 할 일 목록을 다시 화면에 추가
            projectTasks[projectName].red.forEach(task => redBox.appendChild(task)); // 빨간색 할 일 목록 추가
            projectTasks[projectName].orange.forEach(task => orangeBox.appendChild(task)); // 주황색 할 일 목록 추가
            projectTasks[projectName].blue.forEach(task => blueBox.appendChild(task)); // 파란색 할 일 목록 추가
            projectTasks[projectName].green.forEach(task => greenBox.appendChild(task)); // 초록색 할 일 목록 추가

            newImportanceList.style.display = 'block'; // 해당 프로젝트의 중요도 리스트를 화면에 표시
            currentVisibleProject = newImportanceList; // 현재 보이는 프로젝트를 업데이트
        });

        deleteBtn.addEventListener('click', () => { // 삭제 버튼 클릭 시 실행되는 이벤트 리스너 추가
            container.remove(); // 프로젝트 목록에서 해당 프로젝트 제거
            newImportanceList.remove(); // 화면에서 프로젝트의 중요도 리스트 제거
            delete projectTasks[projectName]; // 프로젝트의 할 일 목록을 저장한 객체 삭제

            if (currentVisibleProject === newImportanceList) { // 현재 보이는 프로젝트가 삭제된 프로젝트라면
                currentVisibleProject = null; // 현재 보이는 프로젝트를 초기화
                redBox.innerHTML = ''; // 빨간색 중요도 박스 초기화
                orangeBox.innerHTML = ''; // 주황색 중요도 박스 초기화
                blueBox.innerHTML = ''; // 파란색 중요도 박스 초기화
                greenBox.innerHTML = ''; // 초록색 중요도 박스 초기화
            }
        });

        container.appendChild(newProject); // 프로젝트 이름을 감싸는 요소에 추가
        container.appendChild(deleteBtn); // 삭제 버튼을 감싸는 요소에 추가

        projectList.appendChild(container); // 프로젝트 목록에 추가
        document.querySelector('main').appendChild(newImportanceList); // 메인 컨테이너에 중요도 리스트 추가

        projectNameInput.value = ''; // 입력창 초기화
        newBox.style.display = 'none'; // 입력창 숨기기
    }
});


newWorkMake.addEventListener("click", function () { // "만들기" 버튼을 클릭하면 실행
    const taskText = newInputWork.value.trim(); // 입력창에서 할 일 텍스트를 가져오고, 앞뒤 공백 제거
    const selectedOption = importanceSelect.options[importanceSelect.selectedIndex].className; // 중요도 선택값 가져오기

    if (!currentVisibleProject) { // 프로젝트가 선택되지 않았을 경우
        alert("프로젝트를 먼저 선택해주세요."); // 경고창 띄우기
        return; // 함수 실행 중단
    }

    if (taskText !== "") { // 입력된 값이 있으면 할 일 추가 시작
        const taskContainer = document.createElement("div"); // 새로운 할 일 컨테이너 div 생성
        taskContainer.style.width = "140px"; 
        taskContainer.style.minHeight = "70px";
        taskContainer.style.backgroundColor = "#787878";
        taskContainer.style.margin = "20px 5px"; // 상하 여백을 20px로 수정
        taskContainer.style.padding = "5px";
        taskContainer.style.borderRadius = "5px";
        taskContainer.style.wordBreak = "break-word"; // 긴 텍스트 자동 줄바꿈
        taskContainer.style.display = 'flex';
        taskContainer.style.flexDirection = 'column'; // 세로 방향으로 정렬
        taskContainer.style.position = 'relative'; // 상대 위치 설정

        const checkboxContainer = document.createElement("div"); // 체크박스와 텍스트를 감싸는 컨테이너
        checkboxContainer.style.display = 'flex';
        checkboxContainer.style.alignItems = 'center';
        checkboxContainer.style.marginBottom = '5px';

        const checkbox = document.createElement("input"); // 체크박스 생성
        checkbox.type = "checkbox";
        checkbox.style.width = '20px';
        checkbox.style.height = '20px';
        checkbox.style.marginRight = "5px";
        checkbox.style.cursor = 'pointer';

        const projectName = currentVisibleProject.querySelector('h1').textContent; // 현재 선택된 프로젝트명 가져오기

        checkbox.addEventListener("change", function() { // 체크박스 상태 변경 시 실행
            if (this.checked) { 
                projectTasks[projectName].green.push(taskContainer); // 완료 목록(green)에 추가
                greenBox.appendChild(taskContainer); // 완료 목록에 표시
                removeFromOriginalList(projectName, taskContainer); // 기존 목록에서 제거
            } else { 
                projectTasks[projectName].green = projectTasks[projectName].green.filter(task => task !== taskContainer); // 완료 목록에서 제거
                if (selectedOption === "e") { 
                    projectTasks[projectName].red.push(taskContainer); 
                    redBox.appendChild(taskContainer); // 높은 중요도(red) 목록으로 이동
                } else if (selectedOption === "f") { 
                    projectTasks[projectName].orange.push(taskContainer);
                    orangeBox.appendChild(taskContainer); // 중간 중요도(orange) 목록으로 이동
                } else if (selectedOption === "g") { 
                    projectTasks[projectName].blue.push(taskContainer);
                    blueBox.appendChild(taskContainer); // 낮은 중요도(blue) 목록으로 이동
                }
            }
        });

        const taskElement = document.createElement("p"); // 할 일 텍스트 요소 생성
        taskElement.textContent = taskText;
        taskElement.style.margin = "0";
        taskElement.style.flex = '1';

        const deleteBtn = document.createElement("button"); // 삭제 버튼 생성
        deleteBtn.textContent = "삭제";
        deleteBtn.style.padding = '3px 8px';
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.right = '5px';
        deleteBtn.style.bottom = '5px';
        deleteBtn.style.cursor = 'pointer';
        
        deleteBtn.addEventListener("click", function () { // 삭제 버튼 클릭 시
            taskContainer.remove(); // 화면에서 삭제
            removeFromOriginalList(projectName, taskContainer); // 데이터에서도 삭제
        });

        checkboxContainer.appendChild(checkbox); // 체크박스를 컨테이너에 추가
        checkboxContainer.appendChild(taskElement); // 할 일 텍스트를 컨테이너에 추가
        
        taskContainer.appendChild(checkboxContainer); // 체크박스 컨테이너를 할 일 컨테이너에 추가
        taskContainer.appendChild(deleteBtn); // 삭제 버튼 추가

        // 중요도에 따라 해당 중요도 리스트에 할 일 추가
        if (selectedOption === "e") {
            projectTasks[projectName].red.push(taskContainer);
            redBox.appendChild(taskContainer);
        } else if (selectedOption === "f") {
            projectTasks[projectName].orange.push(taskContainer);
            orangeBox.appendChild(taskContainer);
        } else if (selectedOption === "g") {
            projectTasks[projectName].blue.push(taskContainer);
            blueBox.appendChild(taskContainer);
        }
    }

    newInputWork.value = ""; // 입력창 초기화
    newMakeBox.style.display = "none"; // 할 일 입력창 닫기
});


//프로젝트에서 특정 할 일을 제거하는 함수
//filter() 메서드를 사용해서 배열을 업데이트함.
//할일 삭제버튼을 클릭하면 삭제됨
function removeFromOriginalList(projectName, taskContainer) { // 기존 중요도 목록에서 할 일을 제거하는 함수
    projectTasks[projectName].red = projectTasks[projectName].red.filter(task => task !== taskContainer);
    projectTasks[projectName].orange = projectTasks[projectName].orange.filter(task => task !== taskContainer);
    projectTasks[projectName].blue = projectTasks[projectName].blue.filter(task => task !== taskContainer);
}
