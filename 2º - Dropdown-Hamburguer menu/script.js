'use strict'

// bts 

const btnOpenMenuEl = document.querySelector('.btnOpenMenu');
const btnCloseMenuEl = document.querySelector('.btnCloseMenu')
const submenuEl = document.querySelectorAll('.subMenu')
const openSubmenuEl = document.querySelectorAll('.openSubmenu')


const navEl = document.querySelector('.nav')



btnOpenMenuEl.addEventListener('click', function () {
    navEl.classList.remove('hidden');
    btnOpenMenuEl.classList.add('hidden');
    btnCloseMenuEl.classList.remove('hidden')

})

btnCloseMenuEl.addEventListener('click', function () {
    navEl.classList.add('hidden');
    btnOpenMenuEl.classList.remove('hidden');
    btnCloseMenuEl.classList.add('hidden')

})

submenuEl.forEach(function (submenu, index) {
    openSubmenuEl[index].addEventListener('click', function () {
        if (submenu.classList.contains('hidden')) {
            submenu.classList.remove('hidden');
        } else {
            submenu.classList.add('hidden');
        }
    })
})



