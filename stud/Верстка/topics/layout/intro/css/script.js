document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar-topic').forEach(topic => {
        topic.addEventListener('click', () => {
            const link = topic.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });

    let current = 0;
    const blocks = [
        document.getElementById('textBlock1'),
        document.getElementById('textBlock2'),
        document.getElementById('textBlock3')
    ];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateBlocks() {
        blocks.forEach((block, idx) => {
            if (block) block.style.display = idx === current ? '' : 'none';
        });
        if (current === 0) {
            prevBtn.hidden = true;
        } else {
            prevBtn.hidden = false;
        }
        if (current === blocks.length - 1) {
            nextBtn.hidden = true;
        } else {
            nextBtn.hidden = false;
        }
    }

    prevBtn.addEventListener('click', () => {
        if (current > 0) {
            current--;
            updateBlocks();
        }
    });
    nextBtn.addEventListener('click', () => {
        if (current < blocks.length - 1) {
            current++;
            updateBlocks();
        }
    });

    updateBlocks();
}); 