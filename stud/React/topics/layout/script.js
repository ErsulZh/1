document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => {
            alert('Вы выбрали: ' + card.textContent);
        });
    });
}); 