"use strict";
// criamos um array com as condiçoes de vitoria
// procuras nesse array  com o methodo de array every se algum elemento de cada array pertencente a esse array tem todos os elementos iguais à array das casas do jogador atual, o jogador atual joga e fazes push para cada play .. e nas condiçoes de vitoria fazes forEach(cadaCondição => cadaCondição.every ( se todos sao iguais a valores do jogador.. se for true entao o jogador ganha))

const startContainerEl = document.querySelector(".startContainer");
const overlayEl = document.querySelector(".overlay");
const mainEl = document.querySelector("main");
const tableContainerEl = document.querySelector(".tableContainer");
const testEl = document.querySelector(".test");
const circleEl = document.querySelectorAll(".circle");
const buttonRestartEl = document.querySelector(".buttonRestart");
const newGameEl = document.querySelector(".newGame");

const inputPlayer1El = document.querySelector(".inputPlayer1");
const inputPlayer2El = document.querySelector(".inputPlayer2");

const player1El = document.querySelector(".player1");
const player2El = document.querySelector(".player2");

const winnerDivEl = document.querySelector(".winnerDiv");
const winnerNameEl = document.querySelector(".winnerName");
const drawEl = document.querySelector(".wins");

const newGameFromWinnerContainerEl = document.querySelector(
  ".newGameFromWinnerContainer"
);
const restartGameEl = document.querySelector(".restartGame");
const winsEl = document.querySelector(".wins");

let arrayCurrentPlayer = [[], []];

let filledCircles = [];

let currentPlayer = 0;

let colorMove;

let spot;

let invalidPlay;

let res;

// winning Conditions;
let winningConditions = [
  ["a1", "a2", "a3", "a4"],
  ["a2", "a3", "a4", "a5"],
  ["a3", "a4", "a5", "a6"],
  ["a4", "a5", "a6", "a7"],
  ["b1", "b2", "b3", "b4"],
  ["b2", "b3", "b4", "b5"],
  ["b3", "b4", "b5", "b6"],
  ["b4", "b5", "b6", "b7"],
  ["c1", "c2", "c3", "c4"],
  ["c2", "c3", "c4", "c5"],
  ["c3", "c4", "c5", "c6"],
  ["c4", "c5", "c6", "c7"],
  ["d1", "d2", "d3", "d4"],
  ["d2", "d3", "d4", "d5"],
  ["d3", "d4", "d5", "d6"],
  ["d4", "d5", "d6", "d7"],
  ["e1", "e2", "e3", "e4"],
  ["e2", "e3", "e4", "e5"],
  ["e3", "e4", "e5", "e6"],
  ["e4", "e5", "e6", "e7"],
  ["f1", "f2", "f3", "f4"],
  ["f2", "f3", "f4", "f5"],
  ["f3", "f4", "f5", "f6"],
  ["f4", "f5", "f6", "f7"],
  ["a1", "b1", "c1", "d1"],
  ["b1", "c1", "d1", "e1"],
  ["f1", "e1", "d1", "c1"],
  ["a2", "b2", "c2", "d2"],
  ["b2", "c2", "d2", "e2"],
  ["c2", "d2", "e2", "f2"],
  ["a3", "b3", "c3", "d3"],
  ["b3", "c3", "d3", "e3"],
  ["c3", "d3", "e3", "f3"],
  ["a4", "b4", "c4", "d4"],
  ["b4", "c4", "d4", "e4"],
  ["c4", "d4", "e4", "f4"],
  ["a5", "b5", "c5", "d5"],
  ["b5", "c5", "d5", "e5"],
  ["c5", "d5", "e5", "f5"],
  ["a6", "b6", "c6", "d6"],
  ["b6", "c6", "d6", "e6"],
  ["c6", "d6", "e6", "f6"],
  ["a7", "b7", "c7", "d7"],
  ["b7", "c7", "d7", "e7"],
  ["c7", "d7", "e7", "f7"],
  ["c1", "d2", "e3", "f4"],
  ["b1", "c2", "d3", "e4"],
  ["c2", "d3", "e4", "f5"],
  ["a1", "b2", "c3", "d4"],
  ["b2", "c3", "d4", "e5"],
  ["c3", "d4", "e5", "f6"],
  ["a2", "b3", "c4", "d5"],
  ["b3", "c4", "d5", "e6"],
  ["c4", "d5", "e6", "f7"],
  ["a3", "b4", "c5", "d6"],
  ["b4", "c5", "d6", "e7"],
  ["a4", "b5", "c6", "d7"],
  ["f4", "e5", "d6", "c7"],
  ["f3", "e4", "d5", "c6"],
  ["e4", "d5", "c6", "b7"],
  ["f2", "e3", "d4", "c5"],
  ["e3", "d4", "c5", "b6"],
  ["d4", "c5", "b6", "a7"],
  ["f1", "e2", "d3", "c4"],
  ["e2", "d3", "c4", "b5"],
  ["d3", "c4", "b5", "a6"],
  ["e1", "d2", "c3", "b4"],
  ["d2", "c3", "b4", "a5"],
  ["d1", "c2", "b3", "a4"],
];

// new game

newGameEl.addEventListener("click", function () {
  if (inputPlayer1El.value === "" || inputPlayer2El.value === "") {
    alert("You have to fill in the names");
    inputPlayer1El.focus();
  } else {
    player1El.textContent = inputPlayer1El.value;
    player2El.textContent = inputPlayer2El.value;

    startContainerEl.classList.add("hidden");
    mainEl.classList.remove("hidden");
    overlayEl.classList.add("hidden");
  }
});

/* restart game from options or winner/draw container */

restartGameEl.addEventListener("click", function () {
  loadGame();
  overlayEl.classList.add("hidden");
  winnerDivEl.classList.add("hidden");
});

buttonRestartEl.addEventListener("click", function () {
  loadGame();
});

newGameFromWinnerContainerEl.addEventListener("click", function () {
  startContainerEl.classList.remove("hidden");
  winnerDivEl.classList.add("hidden");
  mainEl.classList.add("hidden");
  loadGame();
});

// function that defines the color of the piece that was played (color varies according to the team)
const whereTo = function (clickValue, currentPlayer, spot) {
  if (currentPlayer === 0) {
    document.querySelector(
      `.circle${spot}${clickValue}`
    ).style.backgroundColor = "rgba(199, 82, 31, 0.662)";
  } else if (currentPlayer === 1) {
    document.querySelector(
      `.circle${spot}${clickValue}`
    ).style.backgroundColor = "rgb(194, 170, 94)";
  }
};

// reset game
const loadGame = function () {
  arrayCurrentPlayer = [[], []];
  filledCircles = [];
  currentPlayer = 0;
  circleEl.forEach((circle) => (circle.style.backgroundColor = "white"));
  drawEl.textContent = "";
};

// function that assigns where the piece will be, adds a to filledCircles ( array with all the moves of both people ) and adds to each individual array
const funcPlay = function (clickValue, currentPlayer) {
  if (!filledCircles.includes(`f${clickValue}`)) {
    spot = "f";
    whereTo(clickValue, currentPlayer, spot);
    arrayCurrentPlayer[`${currentPlayer}`].push(`f${clickValue}`);
    return filledCircles.push(`f${clickValue}`);
  } else if (!filledCircles.includes(`e${clickValue}`)) {
    spot = "e";
    whereTo(clickValue, currentPlayer, spot);
    arrayCurrentPlayer[`${currentPlayer}`].push(`e${clickValue}`);
    return filledCircles.push(`e${clickValue}`);
  } else if (!filledCircles.includes(`d${clickValue}`)) {
    spot = "d";
    whereTo(clickValue, currentPlayer, spot);
    arrayCurrentPlayer[`${currentPlayer}`].push(`d${clickValue}`);
    return filledCircles.push(`d${clickValue}`);
  } else if (!filledCircles.includes(`c${clickValue}`)) {
    spot = "c";
    whereTo(clickValue, currentPlayer, spot);
    arrayCurrentPlayer[`${currentPlayer}`].push(`c${clickValue}`);
    return filledCircles.push(`c${clickValue}`);
  } else if (!filledCircles.includes(`b${clickValue}`)) {
    spot = "b";
    whereTo(clickValue, currentPlayer, spot);
    arrayCurrentPlayer[`${currentPlayer}`].push(`b${clickValue}`);
    return filledCircles.push(`b${clickValue}`);
  } else if (!filledCircles.includes(`a${clickValue}`)) {
    spot = "a";
    whereTo(clickValue, currentPlayer, spot);
    arrayCurrentPlayer[`${currentPlayer}`].push(`a${clickValue}`);
    return filledCircles.push(`a${clickValue}`);
  } else {
    alert("Move not allowed!");
    console.log("jogada não permitida");
    invalidPlay = true;
  }
};

// fazer jogada e atribuir vencedor
tableContainerEl.addEventListener("click", function (e) {
  const click = e.target;
  const clickValue = click.getAttribute("value");

  //  carregar na primeira linha de cima para começar a jogar
  if (click.classList.contains("bplay")) {
    if (currentPlayer === 2) {
      console.log("Play not Allowed");
    } else {
      funcPlay(clickValue, currentPlayer);

      console.log(
        `o jogador em jogo é ${currentPlayer}`,
        arrayCurrentPlayer[`${currentPlayer}`]
      );

      /* condição de valid play ou de fim de jogo */

      if (invalidPlay) {
        currentPlayer = currentPlayer === 0 ? 0 : 1;
        invalidPlay = "";
      } else if (filledCircles.length === 42) {
        winnerDivEl.classList.remove("hidden");
        overlayEl.classList.remove("hidden");
        winnerNameEl.classList.add("hidden");
        winsEl.textContent = "Draw!";
      } else {
        const res = winningConditions.filter((array) =>
          array.every((e) => arrayCurrentPlayer[`${currentPlayer}`].includes(e))
        );
        console.log(res);
        if (res.length >= 1) {
          console.log(`O vencedor é o ${currentPlayer}`);

          winnerDivEl.classList.remove("hidden");
          overlayEl.classList.remove("hidden");
          winnerNameEl.classList.remove("hidden");
          drawEl.textContent = "Wins!";
          if (currentPlayer === 0) {
            winnerNameEl.textContent = inputPlayer1El.value;
          } else {
            winnerNameEl.textContent = inputPlayer2El.value;
          }
          return (currentPlayer = 2);
        }
        currentPlayer = currentPlayer === 0 ? 1 : 0;
      }
    }
    console.log(filledCircles.length);
  }
});
