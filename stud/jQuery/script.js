document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.book-card').forEach((card, idx) => {
        card.addEventListener('click', () => {
            if (idx === 0) {
                window.location.href = 'topics/layout/index.html';
            } else {
                alert('Вы выбрали: ' + card.textContent);
            }
        });
    });
}); 