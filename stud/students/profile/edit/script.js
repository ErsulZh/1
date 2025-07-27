document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('editForm');
    form.addEventListener('submit', function(e) {
        const pass = document.getElementById('editPassword').value;
        const pass2 = document.getElementById('editPassword2').value;
        if (pass !== pass2) {
            alert('Пароли не совпадают!');
            e.preventDefault();
            return false;
        }
        // Здесь можно добавить сохранение данных (например, localStorage или отправка на сервер)
        e.preventDefault();
        window.location.href = '../index.html';
    });
}); 