let menu = document.getElementById('menu');
let navbar = document.getElementById('navbar');
let container = document.getElementById('container')

menu.addEventListener('click', () => {
    navbar.classList.toggle('navbar');
    container.classList.toggle('margin-top')
});

let alert = document.getElementById('alert')

alert.addEventListener('click', () => {
    alert.classList.toggle('alert-hiden')

})