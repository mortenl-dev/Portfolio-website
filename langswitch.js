// language switch btn
function switchLanguage(language) {
    const elements = document.querySelectorAll('[data-lang-english], [data-lang-german]');
    elements.forEach(element => {
        element.innerText = language === 'german' ? element.getAttribute('data-lang-german') : element.getAttribute('data-lang-english');
    });
}

// set to english
window.addEventListener('load', function() {
    switchLanguage('english');
});

const englishBtn = document.getElementById('english-btn');
englishBtn.addEventListener('click', () => switchLanguage('english'));

const germanBtn = document.getElementById('german-btn');
germanBtn.addEventListener('click', () => switchLanguage('german'));