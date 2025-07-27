document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => {
            if (card.textContent.trim() === 'Верстка') {
                window.location.href = '../Верстка/index.html';
            } else if (card.textContent.trim() === 'JavaScript') {
                window.location.href = '../JavaScript/index.html';
            } else if (card.textContent.trim() === 'PHP') {
                window.location.href = '../PHP/index.html';
            } else if (card.textContent.trim() === 'TypeScript') {
                window.location.href = '../TypeScript/index.html';
            } else if (card.textContent.trim() === 'NodeJS') {
                window.location.href = '../NodeJS/index.html';
            } else if (card.textContent.trim() === 'Python') {
                window.location.href = '../Python/index.html';
            } else if (card.textContent.trim() === 'Java') {
                window.location.href = '../Java/index.html';
            } else if (card.textContent.trim() === 'C++') {
                window.location.href = '../C++/index.html';
            } else if (card.textContent.trim() === 'Rust') {
                window.location.href = '../Rust/index.html';
            } else if (card.textContent.trim() === 'Kotlin') {
                window.location.href = '../Kotlin/index.html';
            } else if (card.textContent.trim() === 'SQL') {
                window.location.href = '../SQL/index.html';
            } else if (card.textContent.trim() === 'Vue') {
                window.location.href = '../Vue/index.html';
            } else if (card.textContent.trim() === 'React') {
                window.location.href = '../React/index.html';
            } else if (card.textContent.trim() === 'Angular') {
                window.location.href = '../Angular/index.html';
            } else if (card.textContent.trim() === 'jQuery') {
                window.location.href = '../jQuery/index.html';
            } else if (card.textContent.trim() === 'Laravel') {
                window.location.href = '../Laravel/index.html';
            } else if (card.textContent.trim() === 'Git') {
                window.location.href = '../Git/index.html';
            } else if (card.textContent.trim() === 'Webpack') {
                window.location.href = '../Webpack/index.html';
            } else if (card.textContent.trim() === 'Gulp') {
                window.location.href = '../Gulp/index.html';
            } else if (card.textContent.trim() === 'Terminal') {
                window.location.href = '../Terminal/index.html';
            } else if (card.textContent.trim() === 'Internet') {
                window.location.href = '../Internet/index.html';
            } else if (card.textContent.trim() === 'Деплой') {
                window.location.href = '../Деплой/index.html';
            } else if (card.textContent.trim() === 'Глоссарий') {
                window.location.href = '../Глоссарий/index.html';
            } else if (card.textContent.trim() === 'Сленг') {
                window.location.href = '../Сленг/index.html';
            } else {
                alert('Вы выбрали: ' + card.textContent);
            }
        });
    });

    const profileBtn = document.getElementById('profileBtn');
    const profileModal = document.getElementById('profileModal');
    const closeProfile = document.getElementById('closeProfile');

    if (profileBtn && profileModal && closeProfile) {
        profileBtn.addEventListener('click', () => {
            profileModal.style.display = 'flex';
        });
        closeProfile.addEventListener('click', () => {
            profileModal.style.display = 'none';
        });
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }

    const profileArea = document.getElementById('profileArea');
    if (profileArea) {
        if (localStorage.getItem('isAuth')) {
            profileArea.innerHTML = '<div class="profile-mini" id="profileMini"><img src="profile.jpg" alt="Аватар" class="profile-avatar"><span class="profile-name">Иван Иванов</span></div>';
            const profileMini = document.getElementById('profileMini');
            if (profileMini) {
                profileMini.addEventListener('click', () => {
                    window.location.href = 'profile/index.html';
                });
            }
        } else {
            profileArea.innerHTML = '<button class="nav-btn" id="loginBtn">Войти</button>';
            const loginBtn = document.getElementById('loginBtn');
            if (loginBtn) {
                loginBtn.addEventListener('click', () => {
                    window.location.href = 'auth/index.html';
                });
            }
        }
    }
}); 