const body = document.documentElement
const moonIcon = document.querySelector('#moon-icon')
const darkModeBtn = document.querySelector('#dark-mode-btn')

document.addEventListener('DOMContentLoaded', loadThemeToStorage)
darkModeBtn.addEventListener('click', changeTheme)

function changeTheme () {    
    const isLightMode = body.dataset.theme === 'light'

    if(isLightMode) {
        saveToStorage('dark')
        setTheme('dark')
    } else {
        saveToStorage('light')
        setTheme('light')
    }
}

function loadThemeToStorage() {
    const mode = localStorage.getItem('theme')
    if(mode) {
        setTheme(mode)
    }
}

function setTheme(mode) {
    const icon = mode === 'light' ? 'moon-outline' : 'moon'
    body.dataset.theme = mode
    moonIcon.name = icon
}

function saveToStorage(mode) {
    localStorage.setItem('theme', mode)
}