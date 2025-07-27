document.addEventListener('DOMContentLoaded', () => {
    const profileMini = document.querySelector('.profile-mini');
    if (profileMini) {
        profileMini.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            window.location.href = 'edit/index.html';
        });
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isAuth');
            window.location.href = '../../index.html';
        });
    }
}); 