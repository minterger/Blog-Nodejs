let menu = document.getElementById('menu');
let navbar = document.getElementById('navbar');
let container = document.getElementById('container');
let titleArticle = document.getElementById('title-article')

menu.addEventListener('click', () => {
    navbar.classList.toggle('navbar');
    container.classList.toggle('margin-top');
    titleArticle.classList.toggle('title-margin');
});

let alert = document.getElementById('alert');
let close_btn = document.getElementById('close-btn');

close_btn.addEventListener('click', () => {
    alert.classList.toggle('alert-hiden');

});