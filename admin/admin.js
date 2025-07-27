// Оставить только данные студентов
let students = [
    { id: 1, name: 'Алексей Иванов', email: 'alexey.ivanov@example.com', university: 'МГУ', course: 2, progress: 80 },
    { id: 2, name: 'Мария Смирнова', email: 'maria.smirnova@example.com', university: 'СПбГУ', course: 1, progress: 100 }
];

// --- Только вкладка студентов ---
// const studentsPanel = document.getElementById('students-panel');

// Удаляем всё, что связано с tabStudents
// const tabStudents = document.getElementById('tab-students');
// tabStudents.onclick = function() { ... } // удалить

// --- Поиск и фильтр ---
const studentSearch = document.getElementById('student-search');
const studentSearchBtn = document.getElementById('student-search-btn');
const filterBtn = document.getElementById('student-filter-btn');
const filterMenu = document.getElementById('student-filter-menu');
const filterOnline = document.getElementById('filter-online');
const filterOffline = document.getElementById('filter-offline');
const filterHasProgress = document.getElementById('filter-has-progress');
const filterNoProgress = document.getElementById('filter-no-progress');
const filterFinished = document.getElementById('filter-finished');

let studentSort = { by: 'name', dir: 1 };

function getFilteredStudents() {
    const q = (studentSearch?.value || '').toLowerCase();
    let arr = students.filter(s =>
        (s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q))
    );
    // Фильтры
    if (filterHasProgress?.checked) arr = arr.filter(s => s.progress > 0);
    if (filterNoProgress?.checked) arr = arr.filter(s => !s.progress);
    if (filterFinished?.checked) arr = arr.filter(s => s.progress === 100);
    // Сортировка
    arr = arr.slice();
    arr.sort((a, b) => {
        if (studentSort.by === 'name') return a.name.localeCompare(b.name) * studentSort.dir;
        if (studentSort.by === 'progress') return (b.progress - a.progress) * studentSort.dir;
        return 0;
    });
    return arr;
}
if (studentSearch) studentSearch.onkeydown = e=>{if(e.key==='Enter')renderStudents();};
if (studentSearchBtn) studentSearchBtn.onclick = renderStudents;
if (filterBtn) filterBtn.onclick = function(e){
    e.stopPropagation();
    filterBtn.classList.toggle('active');
    filterMenu.style.display = filterBtn.classList.contains('active') ? 'flex' : 'none';
};
if (filterMenu) filterMenu.onclick = e=>e.stopPropagation();
document.body.onclick = function(){
    if(filterMenu) filterMenu.style.display = 'none';
    if(filterBtn) filterBtn.classList.remove('active');
    document.querySelectorAll('.admin-actions-menu').forEach(m => m.classList.remove('active'));
};
[filterHasProgress,filterNoProgress,filterFinished].forEach(f=>{if(f)f.onchange=renderStudents;});

// --- Студенты и прогресс ---
function renderStudents() {
    let filtered = getFilteredStudents();
    let html = `<div class="admin-section-title-row"><span class="admin-section-title">Студенты</span><div class="admin-section-search">`+
        `<input id="student-search" class="admin-input" type="text" placeholder="Поиск по студентам...">`+
        `<button id="student-search-btn" class="admin-search-btn" title="Поиск"><span>🔍</span></button>`+
        `<button id="student-filter-btn" class="admin-filter-btn" title="Фильтр"><span>⚙️ Фильтр</span></button>`+
        `<div id="student-filter-menu" class="admin-filter-menu">`+
            `<label><input type="checkbox" id="filter-has-progress"> Есть прогресс</label>`+
            `<label><input type="checkbox" id="filter-no-progress"> Нет прогресса</label>`+
            `<label><input type="checkbox" id="filter-finished"> Завершили все курсы</label>`+
        `</div></div></div>`;
    html += `<table class="admin-table"><tr>
        <th>Имя <span class='admin-sort${studentSort.by==='name'?' active':''}' onclick='window.sortStudentsBy("name")'>⇅</span></th>
        <th>Email</th>
        <th>Где учится</th>
        <th>Курс обучения</th>
        <th>Общий прогресс <span class='admin-sort${studentSort.by==='progress'?' active':''}' onclick='window.sortStudentsBy("progress")'>⇅</span></th>
        <th></th></tr>`;
    filtered.forEach(st => {
        html += `<tr class='student-row' data-id='${st.id}'>`+
            `<td class='student-name-cell' style='color:#2563eb;cursor:pointer;text-decoration:underline;'>${st.name}</td>`+
            `<td>${st.email}</td>`+
            `<td>${st.university}</td>`+
            `<td>${st.course}</td>`+
            `<td>${st.progress}%</td>`+
            `<td style='position:relative;'>`+
            `<button class='admin-actions-btn' data-type='student' data-id='${st.id}' title='Действия'>⋮</button>`+
            `<div class='admin-actions-menu' id='student-menu-${st.id}'>
                <button onclick='confirmDeleteStudent(${st.id})'>Удалить</button>
                <button onclick='confirmClearProgress(${st.id})'>Удалить прогресс</button>
                <button onclick='messageStudent(${st.id})'>Написать</button>
            </div></td></tr>`;
    });
    html += `</table>`;
    html += `<div id='student-modal' class='admin-student-modal'></div>`;
    // studentsPanel.innerHTML = html; // Удалено, так как studentsPanel больше не существует
    document.getElementById('students-panel').innerHTML = html; // Используем students-panel
    // Повторно назначаем обработчики для новых элементов поиска и фильтра
    const studentSearch = document.getElementById('student-search');
    const studentSearchBtn = document.getElementById('student-search-btn');
    const filterBtn = document.getElementById('student-filter-btn');
    const filterMenu = document.getElementById('student-filter-menu');
    const filterHasProgress = document.getElementById('filter-has-progress');
    const filterNoProgress = document.getElementById('filter-no-progress');
    const filterFinished = document.getElementById('filter-finished');
    if (studentSearch) studentSearch.onkeydown = e=>{if(e.key==='Enter')renderStudents();};
    if (studentSearchBtn) studentSearchBtn.onclick = renderStudents;
    if (filterBtn) filterBtn.onclick = function(e){
        e.stopPropagation();
        filterBtn.classList.toggle('active');
        filterMenu.style.display = filterBtn.classList.contains('active') ? 'flex' : 'none';
    };
    [filterHasProgress,filterNoProgress,filterFinished].forEach(f=>{if(f)f.onchange=renderStudents;});
    setActionsMenuHandlers();
}
window.sortStudentsBy = function(by) {
    if (studentSort.by === by) studentSort.dir *= -1;
    else studentSort.by = by;
    renderStudents();
};
function setActionsMenuHandlers() {
    document.querySelectorAll('.admin-actions-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.stopPropagation();
            document.querySelectorAll('.admin-actions-menu').forEach(m => m.classList.remove('active'));
            const menu = document.getElementById('student-menu-' + btn.dataset.id);
            if (menu) menu.classList.toggle('active');
        };
    });
}
window.confirmDeleteStudent = function(id) {
    if(confirm('Вы уверены, что хотите удалить студента?')) deleteStudent(id);
};
window.deleteStudent = function(id) {
    students = students.filter(s=>s.id!==id);
    renderStudents();
};
window.confirmClearProgress = function(id) {
    if(confirm('Вы уверены, что хотите удалить прогресс студента?')) clearProgress(id);
};
window.clearProgress = function(id) {
    const st = students.find(s=>s.id===id);
    if(st) st.progress = 0;
    renderStudents();
};
window.messageStudent = function(id) {
    alert('Написать студенту: ' + id);
};
renderStudents();
setTimeout(setStudentNameHandlers, 0);

function setStudentNameHandlers() {
    document.querySelectorAll('.student-name-cell').forEach(cell => {
        cell.onclick = function(e) {
            const row = cell.closest('.student-row');
            if (!row) return;
            const id = row.getAttribute('data-id');
            showStudentModal(id);
        };
    });
}
function showStudentModal(id) {
    const st = students.find(s=>s.id==id);
    if (!st) return;
    const modal = document.getElementById('student-modal');
    let html = `<div class='admin-student-modal-content'>`;
    html += `<button class='admin-student-modal-close' id='close-student-modal'>&times;</button>`;
    html += `<div class='admin-student-modal-avatar'>${getInitials(st.name)}</div>`;
    html += `<div class='admin-student-modal-title'>${st.name}</div>`;
    html += `<div class='admin-student-modal-section'><div class='admin-student-modal-section-title'>Контакты</div>`;
    html += `<div class='admin-student-modal-info'><b>Email:</b> ${st.email}</div>`;
    html += `<div class='admin-student-modal-info'><b>Где учится:</b> ${st.university}</div>`;
    html += `<div class='admin-student-modal-info'><b>Курс обучения:</b> ${st.course}</div>`;
    html += `<div class='admin-student-modal-info'><b>Общий прогресс:</b> <span class='admin-student-modal-progress'>${st.progress}%</span></div>`;
    html += `</div></div>`;
    modal.innerHTML = html;
    modal.style.display = 'block';
    document.getElementById('close-student-modal').onclick = function() {
        modal.style.display = 'none';
    };
    modal.onclick = function(e) { if(e.target===modal) modal.style.display='none'; };
}
function getInitials(name) {
    return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
} 