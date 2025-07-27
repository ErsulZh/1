document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar-topic').forEach(topic => {
        topic.addEventListener('click', () => {
            const link = topic.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
}); 