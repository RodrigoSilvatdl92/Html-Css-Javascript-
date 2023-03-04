'use strict'


const scoreEl = document.querySelector('.scor')
const containerHandsEl = document.querySelector('.containerHands')
const circleEl = document.querySelectorAll('.circle')
const playContainerEl = document.querySelector('.playContainer')
const movePlayerEl = document.querySelector('.movePlayer')
const pickedHandEl = document.querySelector('.pickedHand')
const rulesButtonEl = document.querySelector('.botao')
const overlay = document.querySelector('.overlay')
const rulesContainer = document.querySelector('.rules')
const closeButtonRules = document.querySelector('.closeButton')
const computerHandDisplay = document.querySelector('.computerHandDisplay')
const winOrLoseContainerEl = document.querySelector('.winOrLoseContainer')
const winOrLoseEl = document.querySelector('.winOrLose')
const btnplayAgainEl = document.querySelector('.btnplayAgain')

let currentHand;
let result;
let computerHand;
/*
paper = 1
rock = 2
scissors = 3
*/

function randomNumber(min, max) {
    return Math.trunc(Math.random() * 3) + 1
}

//mostrar as jogadas
const displayMove = function (movem) {
    containerHandsEl.classList.add('hidden')
    playContainerEl.classList.remove('hidden')
    playContainerEl.classList.add('grid')
    movePlayerEl.classList.add(movem)
}

// mostrar o resultado
const displayWinOrLose = function () {
    winOrLoseContainerEl.classList.remove('hidden')
    winOrLoseContainerEl.classList.add('flex')
    overlay.classList.remove('hidden')
    if (result === 'empate') {
        winOrLoseEl.textContent = 'DRAW!'
    }
    if (result === 'vence') {
        winOrLoseEl.textContent = 'YOU WIN!'
    }
    if (result === 'perde') {
        winOrLoseEl.textContent = 'YOU LOSE!'
    }

}

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 500);
    });
};


containerHandsEl.addEventListener('click', function (e) {
    // selecionar circlo
    const click = e.target.closest('.circle')
    if (click) {
        if (click.classList.contains('circle1')) {

            displayMove('circle1')
            pickedHandEl.src = `images/icon-${click.getAttribute('num')}.svg`
            currentHand = click.getAttribute('num')
        }
        if (click.classList.contains('circle2')) {

            displayMove('circle2')
            pickedHandEl.src = `images/icon-${click.getAttribute('num')}.svg`
            currentHand = click.getAttribute('num')
        }
        if (click.classList.contains('circle3')) {

            displayMove('circle3')
            pickedHandEl.src = `images/icon-${click.getAttribute('num')}.svg`
            currentHand = click.getAttribute('num')
        }
    }

    // mostrar a mão do computador ao fim de 2s
    setTimeout(function () {


        computerHand = randomNumber(1, 3)


        if (computerHand === 1) {
            computerHand = 'paper'

            computerHandDisplay.src = `images/icon-${computerHand}.svg`

        }
        if (computerHand === 2) {
            computerHand = 'rock'

            computerHandDisplay.src = `images/icon-${computerHand}.svg`
        }
        if (computerHand === 3) {
            computerHand = 'scissors'

            computerHandDisplay.src = `images/icon-${computerHand}.svg`
        }

        if (currentHand === computerHand) {
            return result = 'empate'
        }

        if (currentHand === 'rock' && computerHand === 'scissors') {
            return result = 'vence'
        }

        if (currentHand === 'paper' && computerHand === 'rock') {
            return result = 'vence'
        }

        if (currentHand === 'scissors' && computerHand === 'paper') {
            return result = 'vence'
        }

        else {
            return result = 'perde'
        }



    }, 1000 * 1.5)

    //mostrar o resultado ao fim de 4s
    const resultado = async function () {
        const res = await wait(4);
        displayWinOrLose()
    }

    resultado()


})


rulesButtonEl.addEventListener('click', function () {
    overlay.classList.remove('hidden')
    rulesContainer.classList.remove('hidden')

})


closeButtonRules.addEventListener('click', function () {

    overlay.classList.add('hidden')
    rulesContainer.classList.add('hidden')
})

// botao para voltar a jogar

btnplayAgainEl.addEventListener('click', function () {
    currentHand = undefined;
    result = undefined;
    computerHand = undefined;
    winOrLoseContainerEl.classList.add('hidden')
    winOrLoseContainerEl.classList.remove('flex')
    overlay.classList.add('hidden')
    containerHandsEl.classList.remove('hidden')
    playContainerEl.classList.add('hidden')
    playContainerEl.classList.remove('grid')
    computerHandDisplay.src = ''

}

)



