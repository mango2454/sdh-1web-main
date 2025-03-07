//UI요소 선택 및 지역 변수 설정
const makeButton = document.querySelector('.project-make');
const newBox = document.getElementById('new-box');
const closeBox = document.querySelector(".close");
const importanceList = document.querySelector(".dktmd");
const makeBtn = document.querySelector('.make');
const projectNameInput = document.querySelector('.project-name');
const projectList = document.querySelector('.list');
const newMakeBtn = document.querySelector(".new-make");
const newMakeBox = document.querySelector(".new-make-box");
const newMakeBoxClose = document.querySelector(".new-mb-close");
const newWorkMake = document.querySelector(".new-work-make");
const newInputWork = document.querySelector(".new-input-work");
const importanceSelect = document.getElementById("op-choose");
const redBox = document.querySelector(".red-box");
const orangeBox = document.querySelector(".orange-box");
const blueBox = document.querySelector(".blue-box");
const greenBox = document.querySelector(".green-box");

let currentVisibleProject = null;
let projectTasks = loadFromLocalStorage() || {}; // 로컬 스토리지에서 데이터 로드

// 로컬 스토리지에서 데이터 로드하는 함수
function loadFromLocalStorage() {
    const data = localStorage.getItem('projectTasks'); // 로컬 스토리지에서 데이터 가져오기
    if (data) {
        const parsed = JSON.parse(data); // JSON 문자열을 객체로 변환
        // DOM 요소 재생성
        Object.keys(parsed).forEach(projectName => {
            createProjectElement(projectName); // 프로젝트 요소 생성
            const projectElement = document.querySelector(`.p-m h1:contains(${projectName})`);
            if (projectElement) {
                currentVisibleProject = projectElement.closest('.dktmd'); // 현재 프로젝트 설정
                ['red', 'orange', 'blue', 'green'].forEach(color => {
                    parsed[projectName][color] = parsed[projectName][color].map(taskData => {
                        return createTaskElement(taskData.text, taskData.checked);
                    });
                    parsed[projectName][color].forEach(task => {
                        document.querySelector(`.${color}-box`).appendChild(task);
                    });
                });
            }
        });
        return parsed; // 데이터 반환
    }
    return null;
}

// 로컬 스토리지에 데이터 저장하는 함수
function saveToLocalStorage() {
    const dataToSave = {};
    Object.keys(projectTasks).forEach(projectName => {
        dataToSave[projectName] = {
            red: projectTasks[projectName].red.map(task => ({
                text: task.querySelector('p').textContent,
                checked: task.querySelector('input[type="checkbox"]').checked
            })),
            orange: projectTasks[projectName].orange.map(task => ({
                text: task.querySelector('p').textContent,
                checked: task.querySelector('input[type="checkbox"]').checked
            })),
            blue: projectTasks[projectName].blue.map(task => ({
                text: task.querySelector('p').textContent,
                checked: task.querySelector('input[type="checkbox"]').checked
            })),
            green: projectTasks[projectName].green.map(task => ({
                text: task.querySelector('p').textContent,
                checked: task.querySelector('input[type="checkbox"]').checked
            }))
        };
    });
    localStorage.setItem('projectTasks', JSON.stringify(dataToSave));
}

// 저장된 프로젝트 목록 로드
window.addEventListener('load', () => {
    Object.keys(projectTasks).forEach(projectName => {
        createProjectElement(projectName);
    });
});

// 사이트가 닫힐 때 로컬 스토리지 데이터 삭제
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('projectTasks');
});

// new-make 버튼 클릭 이벤트 
document.addEventListener('click', (e) => {
    if(e.target.matches('.new-make')) {
        const newMakeBox = e.target.closest('.dktmd').querySelector('.new-make-box') || document.querySelector('.new-make-box');
        if(newMakeBox) {
            newMakeBox.classList.add('show');
        }
    }
});

// new-make-box 닫기 버튼 이벤트
newMakeBoxClose.addEventListener('click', () => {
    newMakeBox.classList.remove('show');
});

// "프로젝트 생성" 버튼을 클릭하면 입력 창을 표시
makeButton.addEventListener('click', () => {  
    newBox.style.display = 'block';
});

// 닫기 버튼을 클릭하면 입력 창을 숨김
closeBox.addEventListener('click', ()=> {
    newBox.style.display = 'none';
});

function createProjectElement(projectName) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '10px';
    container.style.marginLeft = '60px';

    const newProject = document.createElement('p');
    newProject.textContent = projectName;
    newProject.style.cursor = 'pointer';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.style.padding = '5px 10px';
    deleteBtn.style.borderRadius = '5px';
    deleteBtn.style.border = 'none';
    deleteBtn.style.backgroundColor = '#202020';
    deleteBtn.style.color = 'white';

    const newImportanceList = importanceList.cloneNode(true);
    newImportanceList.style.display = 'none';

    const projectTitle = document.createElement('h1');
    projectTitle.textContent = projectName;
    projectTitle.style.color = 'white';
    projectTitle.style.marginLeft = '20px';
    newImportanceList.querySelector('.p-m').prepend(projectTitle);

    if (!projectTasks[projectName]) {
        projectTasks[projectName] = {
            red: [],
            orange: [],
            blue: [],
            green: []
        };
    }

    newProject.addEventListener('click', () => {
        if (currentVisibleProject) {
            currentVisibleProject.style.display = 'none';
        }

        redBox.innerHTML = '';
        orangeBox.innerHTML = '';
        blueBox.innerHTML = '';
        greenBox.innerHTML = '';

        projectTasks[projectName].red.forEach(task => redBox.appendChild(task));
        projectTasks[projectName].orange.forEach(task => orangeBox.appendChild(task));
        projectTasks[projectName].blue.forEach(task => blueBox.appendChild(task));
        projectTasks[projectName].green.forEach(task => greenBox.appendChild(task));

        newImportanceList.style.display = 'block';
        currentVisibleProject = newImportanceList;
    });

    deleteBtn.addEventListener('click', () => {
        container.remove();
        newImportanceList.remove();
        delete projectTasks[projectName];
        saveToLocalStorage();

        if (currentVisibleProject === newImportanceList) {
            currentVisibleProject = null;
            redBox.innerHTML = '';
            orangeBox.innerHTML = '';
            blueBox.innerHTML = '';
            greenBox.innerHTML = '';
        }
    });

    container.appendChild(newProject);
    container.appendChild(deleteBtn);

    projectList.appendChild(container);
    document.querySelector('main').appendChild(newImportanceList);

    return container;
}

// "추가" 버튼을 클릭하면 새로운 프로젝트를 목록에 추가
makeBtn.addEventListener('click', () => {
    const projectName = projectNameInput.value.trim();

    if (projectName !== '') {
        createProjectElement(projectName);
        projectNameInput.value = '';
        newBox.style.display = 'none';
        saveToLocalStorage();
    }
});

function createTaskElement(text, isChecked = false) {
    const taskContainer = document.createElement("div");
    taskContainer.style.width = "140px";
    taskContainer.style.minHeight = "70px";
    taskContainer.style.backgroundColor = "#787878";
    taskContainer.style.margin = "20px 5px";
    taskContainer.style.padding = "5px";
    taskContainer.style.borderRadius = "5px";
    taskContainer.style.wordBreak = "break-word";
    taskContainer.style.display = 'flex';
    taskContainer.style.flexDirection = 'column';
    taskContainer.style.position = 'relative';
    taskContainer.style.overflow = 'hidden'; // 추가: 내용이 넘칠 경우 숨김
    taskContainer.style.flexShrink = '0'; // 추가: 화면 크기에 따라 크기 변경 방지

    const checkboxContainer = document.createElement("div");
    checkboxContainer.style.display = 'flex';
    checkboxContainer.style.alignItems = 'center';
    checkboxContainer.style.marginBottom = '5px';

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    checkbox.style.width = '20px';
    checkbox.style.height = '20px';
    checkbox.style.marginRight = "5px";
    checkbox.style.cursor = 'pointer';

    const taskElement = document.createElement("p");
    taskElement.textContent = text;
    taskElement.style.margin = "0";
    taskElement.style.flex = '1';

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.style.padding = '3px 8px';
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.right = '5px';
    deleteBtn.style.bottom = '5px';
    deleteBtn.style.cursor = 'pointer';

    const projectName = currentVisibleProject.querySelector('h1').textContent;

    checkbox.addEventListener("change", function() {
        if (this.checked) {
            projectTasks[projectName].green.push(taskContainer);
            greenBox.appendChild(taskContainer);
            removeFromOriginalList(projectName, taskContainer);
        } else {
            projectTasks[projectName].green = projectTasks[projectName].green.filter(task => task !== taskContainer);
            const selectedOption = importanceSelect.options[importanceSelect.selectedIndex].className;
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
        saveToLocalStorage();
    });

    deleteBtn.addEventListener("click", function () {
        taskContainer.remove();
        removeFromOriginalList(projectName, taskContainer);
        saveToLocalStorage();
    });

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(taskElement);
    taskContainer.appendChild(checkboxContainer);
    taskContainer.appendChild(deleteBtn);

    return taskContainer;
}

newWorkMake.addEventListener("click", function () {
    const taskText = newInputWork.value.trim();
    const selectedOption = importanceSelect.options[importanceSelect.selectedIndex].className;

    if (!currentVisibleProject) {
        alert("프로젝트를 먼저 선택해주세요.");
        return;
    }

    if (taskText !== "") {
        const taskContainer = createTaskElement(taskText);
        const projectName = currentVisibleProject.querySelector('h1').textContent;

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

        saveToLocalStorage();
    }

    newInputWork.value = "";
    newMakeBox.style.display = "none";
});

function removeFromOriginalList(projectName, taskContainer) {
    projectTasks[projectName].red = projectTasks[projectName].red.filter(task => task !== taskContainer);
    projectTasks[projectName].orange = projectTasks[projectName].orange.filter(task => task !== taskContainer);
    projectTasks[projectName].blue = projectTasks[projectName].blue.filter(task => task !== taskContainer);
    saveToLocalStorage();
}