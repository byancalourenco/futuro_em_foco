// menu
const menuToggle = document.getElementById('menu-toggle');
const menuDesktop = document.querySelector('.menu-desktop');

menuToggle.addEventListener('click', () => {
    menuDesktop.classList.toggle('active');
});

