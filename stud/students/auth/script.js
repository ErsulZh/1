document.addEventListener('DOMContentLoaded', () => {
    // Переключение вкладок
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = '';
        registerForm.style.display = 'none';
    });
    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = '';
        loginForm.style.display = 'none';
    });

    // Валидация регистрации
    const regBtn = document.getElementById('regBtn');
    const regConsent = document.getElementById('regConsent');
    const regPassword = document.getElementById('regPassword');
    const regPassword2 = document.getElementById('regPassword2');
    function updateRegBtn() {
        regBtn.disabled = !regConsent.checked;
    }
    regConsent.addEventListener('change', updateRegBtn);
    updateRegBtn();

    registerForm.addEventListener('submit', function(e) {
        if (regPassword.value !== regPassword2.value) {
            alert('Пароли не совпадают!');
            e.preventDefault();
            return false;
        }
        // Здесь можно добавить сохранение данных (например, localStorage)
        localStorage.setItem('isAuth', '1');
        e.preventDefault();
        window.location.href = '../index.html';
    });

    // Вход
    loginForm.addEventListener('submit', function(e) {
        // Здесь можно добавить проверку email/пароля
        localStorage.setItem('isAuth', '1');
        e.preventDefault();
        window.location.href = '../index.html';
    });
}); 