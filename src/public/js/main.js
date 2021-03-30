const menu = document.getElementById('menu');
const navbar = document.getElementById('navbar');
const container = document.getElementById('container');
const titleArticle = document.getElementById('title-article')

menu.addEventListener('click', () => {
    navbar.classList.toggle('navbar');
    container.classList.toggle('margin-top');
    titleArticle.classList.toggle('title-margin');
});

const alert = document.getElementById('alert');
const close_btn = document.getElementById('close-btn');

close_btn.addEventListener('click', () => {
    alert.classList.toggle('alert-hiden');

});