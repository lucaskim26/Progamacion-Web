document.addEventListener('DOMContentLoaded', () => {
    const faqTitles = document.querySelectorAll('.faq-title');

    faqTitles.forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});
