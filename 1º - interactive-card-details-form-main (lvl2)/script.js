'use strict'

/*card*/
const cardNumber = document.querySelector('.frontCard-number');
const cardName = document.querySelector('.frontCard-name')
const cardDate = document.querySelector('.frontCard-date')
const cardCvc = document.querySelector('.backCard-cvc')

/*form*/

const formName = document.querySelector('.input-cardName')
const formNumber = document.querySelector('.input-cardNumber')
const formMm = document.querySelector('.input-cardmm')
const formYy = document.querySelector('.input-cardyy')
const formCvC = document.querySelector('.input-cardcvc')

/*botao*/

const btnConfirm = document.querySelector('.btn-confirm')
const btnContinue = document.querySelector('.btn-continue')

/* divs */

const formCard = document.querySelector('.form')
const sucessRegistry = document.querySelector('.sucessRegist')

/* inputs */

const smallStrgName = document.querySelector('.smallStrg-name')
const smallStrgNumber = document.querySelector('.smallStrg-number')
const smallStrgData = document.querySelector('.smallStrg-data')
const smallStrgCvc = document.querySelector('.smallStrg-Cvc')




/*função para ver se string tem numeros*/

function stringContainsNumber(strg) {
    return /\d/.test(strg);
}

/*função para ver se string tem caracteres*/

function containsSpecialChars(strg) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(strg);
}


let condition1 = 'not valid'
let condition2 = 'not valid'
let condition3 = 'not valid'
let condition4 = 'not valid'


btnConfirm.addEventListener('click', function (e) {

    //nome do cartao
    if (formName.value) {
        smallStrgName.classList.add('hidden')
        if (stringContainsNumber(formName.value) === false && containsSpecialChars(formName.value) === false) {
            smallStrgName.classList.add('hidden')
            cardName.textContent = formName.value
            condition1 = 'valid'
        } else {

            smallStrgName.classList.remove('hidden')
        }
    } else {
        smallStrgName.classList.remove('hidden')
        formName.focus()


    }

    //numero cartao

    if (formNumber.value) {
        smallStrgNumber.classList.add('hidden')
        if (stringContainsNumber(formNumber.value) === true && containsSpecialChars(formNumber.value) === false && formNumber.value.length === 16) {
            let x = formNumber.value

            //dividir string de 4 em 4 digitos
            let res = [...x].map((d, i) => (i) % 4 == 0 ? ' ' + d : d).join('').trim()

            smallStrgNumber.classList.add('hidden')
            cardNumber.textContent = res
            condition2 = 'valid'
        } else {
            smallStrgNumber.classList.remove('hidden')
        }

    } else {
        smallStrgNumber.classList.remove('hidden')
        formNumber.focus()
    }

    //data
    if (formMm.value && formYy.value) {
        smallStrgData.classList.add('hidden')
        if (formMm.value.length === 2 && stringContainsNumber(formMm.value) === true && formYy.value.length === 2 && stringContainsNumber(formYy.value) === true) {
            if (formMm.value > 0 && formMm.value < 13 && formYy.value >= 23) {
                console.log('data correct')
                smallStrgData.classList.add('hidden')
                cardDate.textContent = `${formMm.value}/${formYy.value}`
                condition3 = 'valid'
            } else {
                formMm.focus()
                smallStrgData.classList.remove('hidden')

            }
        } else {
            smallStrgData.classList.remove('hidden')

        }

    } else if (formMm.value === '') {
        smallStrgData.classList.remove('hidden')
        formMm.focus()

    } else if (formYy.value === '') {
        smallStrgData.classList.remove('hidden')
        formYy.focus()
    }



    if (stringContainsNumber(formCvC.value) === true && formCvC.value.length === 3) {
        smallStrgCvc.classList.add('hidden')
        cardCvc.textContent = formCvC.value
        condition4 = 'valid'
    } else {
        smallStrgCvc.classList.remove('hidden')
        formCvC.focus()


    }

    if (condition1 === 'valid' && condition2 === 'valid' && condition3 === 'valid' && condition4 === 'valid') {
        formCard.classList.add('hidden')
        sucessRegistry.classList.remove('hidden')
        btnConfirm.classList.add('hidden')
        btnContinue.classList.remove('hidden')
    }



})


btnContinue.addEventListener('click', function () {

    formName.value = formNumber.value = formMm.value = formYy.value = formCvC.value = ''

    cardNumber.textContent = '0000 0000 0000 0000'
    cardName.textContent = 'Jane Appleseed'
    cardDate.textContent = '00/00'
    cardCvc.textContent = ''

    formCard.classList.remove('hidden')
    sucessRegistry.classList.add('hidden')
    btnConfirm.classList.remove('hidden')
    btnContinue.classList.add('hidden')

    condition1 = 'not valid'
    condition2 = 'not valid'
    condition3 = 'not valid'
    condition4 = 'not valid'


})


/* 

const cardNumber = document.querySelector('.frontCard-number');
const cardName = document.querySelector('.frontCard-name')
const cardDate = document.querySelector('.frontCard-date')
const cardCvc

*/
