const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.imageSmoothingEnabled = false;

const CARD_W = 125;
const CARD_H = 190;
const CARD_GAP = 10;
const CARD_ROWS = 4;
const CARD_COLS = 6;
let cardGrid = new Array(CARD_COLS * CARD_ROWS / 2).fill('');
let compare = [];

const IMAGE_W = 100;
const COEF_X = (CARD_W - IMAGE_W) / 2;

let mouseX = 0;
let mouseY = 0;

const cards = [
{ id:  0, type: 'Elements', name: 'Earth', open: false, shown: true },
{ id:  1, type: 'Elements', name: 'Water', open: false, shown: true },
{ id:  2, type: 'Elements', name: 'Air', open: false, shown: true },
{ id:  3, type: 'Elements', name: 'Fire', open: false, shown: true },
{ id:  4, type: 'Planets', name: 'Sol', equality: 'Aurum', open: false, shown: true },
{ id:  5, type: 'Planets', name: 'Luna', equality: 'Argentum', open: false, shown: true },
{ id:  6, type: 'Planets', name: 'Venus', equality: 'Cuprum', open: false, shown: true },
{ id:  7, type: 'Planets', name: 'Mars', equality: 'Ferrum', open: false, shown: true },
{ id:  8, type: 'Planets', name: 'Iupiter', equality: 'Stannum', open: false, shown: true },
{ id:  9, type: 'Planets', name: 'Mercurius', equality: 'Hydrargyrum', open: false, shown: true },
{ id: 10, type: 'Planets', name: 'Saturnus', equality: 'Plumbum', open: false, shown: true },
{ id: 11, type: 'Planets', name: 'Terra', open: false, shown: true },
{ id: 12, type: 'Planets', name: 'Uranus', open: false, shown: true },

// TODO: processes, mundanes, compound
// { id: 13, type: 'Planets', name: 'Neptunus', open: false, shown: true },
// { id: 14, type: 'Planets', name: 'Pluto', open: false, shown: true },
];

function cardsReset() {
	let i = 0;
	do {
		let randomCard = getRandomCard();
		if (!cardGrid.find(item => item.id === randomCard.id)) {
			cardGrid[i] = randomCard;
			i++;
		}
	} while (i < CARD_COLS * CARD_ROWS / 2);
	cardGrid = messCardsArray(cardGrid.concat(cardGrid.map(object => ({ ...object }))));
}

function messCardsArray(arr) {
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

function getRandomCard() {
	return cards[Math.floor(Math.random() * cards.length)];
}

function rowColToArrayIndex(col, row) {
	return col + CARD_COLS * row;
}

function drawCards() {
	for(let eachRow = 0; eachRow < CARD_ROWS; eachRow++) {
		for(let eachCol = 0; eachCol < CARD_COLS; eachCol++) {

			let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

			if(cardGrid[arrayIndex] && cardGrid[arrayIndex].shown) {
				if (!cardGrid[arrayIndex].open) {
					drawCardBack(CARD_W * eachCol + CARD_GAP * eachCol,
						CARD_H * eachRow + CARD_GAP * eachRow,
						CARD_W, CARD_H, 'gray');
				} else {
					drawCardFront(CARD_W * eachCol + CARD_GAP * eachCol,
						CARD_H * eachRow + CARD_GAP * eachRow,
						CARD_W, CARD_H, '#eeeeee', cardGrid[arrayIndex]);
				}
			}
		}
	}
}

function drawCardBack(x, y, width, height, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	ctx.closePath();
	ctx.fill();
}

function drawCardFront(x, y, width, height, color, card) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	ctx.closePath();
	ctx.fill();

	ctx.strokeStyle = 'black';
	ctx.lineWidth = 4;

	if (card.id === 0) {
		// draw Earth
		ctx.beginPath();
		ctx.moveTo(x + COEF_X + 50, y + 130);
		ctx.lineTo(x + COEF_X + 5,  y + 60);
		ctx.lineTo(x + COEF_X + 95, y + 60);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x + COEF_X + 15, y + 100);
		ctx.lineTo(x + COEF_X + 85, y + 100);
		ctx.stroke();
	}

	if (card.id === 1) {
		// draw Water
		ctx.beginPath();
		ctx.moveTo(x + COEF_X + 50, y + 130);
		ctx.lineTo(x + COEF_X + 5,  y + 60);
		ctx.lineTo(x + COEF_X + 95, y + 60);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 2) {
		// draw Air
		ctx.beginPath();
		ctx.moveTo(x + COEF_X + 50, y + 60);
		ctx.lineTo(x + COEF_X + 5,  y + 130);
		ctx.lineTo(x + COEF_X + 95, y + 130);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x + COEF_X + 15, y + 95);
		ctx.lineTo(x + COEF_X + 85, y + 95);
		ctx.stroke();
	}

	if (card.id === 3) {
		// draw Fire
		ctx.beginPath();
		ctx.moveTo(x + COEF_X + 50, y + 60);
		ctx.lineTo(x + COEF_X + 5,  y + 130);
		ctx.lineTo(x + COEF_X + 95, y + 130);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 4) {
		// draw Sol
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(x + COEF_X + 50, y + 100, 35, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(x + COEF_X + 50, y + 100, 10, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	}

	if (card.id === 5) {
		// draw Luna
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(x + COEF_X + 40, y + 95, 40, 1.4 * Math.PI, 0.6 * Math.PI, false);
		ctx.bezierCurveTo(x + COEF_X + 65, y + 110, x + COEF_X + 65, y + 80, x + COEF_X + 28, y + 60);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 6) {
		// draw Venus
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(x + COEF_X + 50, y + 85, 25, 0, 2 * Math.PI);
		ctx.moveTo(x + COEF_X + 50, y + 110);
		ctx.lineTo(x + COEF_X + 50, y + 135);
		ctx.moveTo(x + COEF_X + 40, y + 125);
		ctx.lineTo(x + COEF_X + 60, y + 125);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 7) {
		// draw Mars
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(x + COEF_X + 40, y + 110, 25, 0, 2 * Math.PI);
		ctx.moveTo(x + COEF_X + 60, y + 97);
		ctx.lineTo(x + COEF_X + 80, y + 80);
		ctx.moveTo(x + COEF_X + 65, y + 80);
		ctx.lineTo(x + COEF_X + 81, y + 81);
		ctx.moveTo(x + COEF_X + 77, y + 95);
		ctx.lineTo(x + COEF_X + 80, y + 80);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 8) {
		// draw Jupiter
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(x + COEF_X + 25, y + 75, 3, 0, Math.PI, false);
		ctx.bezierCurveTo(x + COEF_X + 25, y + 45, x + COEF_X + 70, y + 55, x + COEF_X + 25, y + 110);
		ctx.lineTo(x + COEF_X + 80, y + 110);
		ctx.moveTo(x + COEF_X + 65, y + 130);
		ctx.lineTo(x + COEF_X + 65, y + 55);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 9) {
		// draw Mercurius
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(x + COEF_X + 50, y + 95, 25, 0, 2 * Math.PI);
		ctx.moveTo(x + COEF_X + 50, y + 120);
		ctx.lineTo(x + COEF_X + 50, y + 145);
		ctx.moveTo(x + COEF_X + 40, y + 135);
		ctx.lineTo(x + COEF_X + 60, y + 135);
		ctx.moveTo(x + COEF_X + 65, y + 55);
		ctx.arc(x + COEF_X + 50, y + 55, 15, 0, Math.PI, false);
		ctx.moveTo(x + COEF_X + 65, y + 55);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 10) {
		// draw Saturnus
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.moveTo(x + COEF_X + 35, y + 55);
		ctx.lineTo(x + COEF_X + 35, y + 115);
		ctx.moveTo(x + COEF_X + 28, y + 65);
		ctx.lineTo(x + COEF_X + 50, y + 65);
		ctx.moveTo(x + COEF_X + 35, y + 80);
		ctx.bezierCurveTo(x + COEF_X + 35, y + 80, x + COEF_X + 85, y + 45, x + COEF_X + 60, y + 110);
		ctx.moveTo(x + COEF_X + 60, y + 110);
		ctx.bezierCurveTo(x + COEF_X + 50, y + 125, x + COEF_X + 45, y + 135, x + COEF_X + 65, y + 125);
		ctx.moveTo(x + COEF_X + 65, y + 125);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 11) {
		// draw Terra
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(x + COEF_X + 50, y + 100, 35, 0, 2 * Math.PI);
		ctx.moveTo(x + COEF_X + 50, y + 65);
		ctx.lineTo(x + COEF_X + 50, y + 135);
		ctx.moveTo(x + COEF_X + 15, y + 100);
		ctx.lineTo(x + COEF_X + 85, y + 100);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 12) {
		// draw Uranus
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.moveTo(x + COEF_X + 50, y + 60);
		ctx.lineTo(x + COEF_X + 50, y + 120);
		ctx.moveTo(x + COEF_X + 25, y + 90);
		ctx.lineTo(x + COEF_X + 75, y + 90);
		ctx.moveTo(x + COEF_X + 15, y + 60);
		ctx.lineTo(x + COEF_X + 25, y + 60);
		ctx.lineTo(x + COEF_X + 25, y + 120);
		ctx.lineTo(x + COEF_X + 15, y + 120);
		ctx.moveTo(x + COEF_X + 85, y + 60);
		ctx.lineTo(x + COEF_X + 75, y + 60);
		ctx.lineTo(x + COEF_X + 75, y + 120);
		ctx.lineTo(x + COEF_X + 85, y + 120);
		ctx.moveTo(x + COEF_X + 55, y + 125);
		ctx.arc(x + COEF_X + 50, y + 125, 5, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.font = '13px verdana';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.fillText(card.type, x + CARD_W / 2, y + 30);
	ctx.font = 'bold 15px verdana';
	ctx.fillText(card.name, x + CARD_W / 2, y + CARD_H - 20);
	ctx.closePath();
}

function drawAll() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawCards();
}

function updateMousePos(evt) {
	const rect = canvas.getBoundingClientRect();
	const root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	let cardColumnGap = mouseX / (CARD_W + CARD_GAP);
	let cardRowGap = mouseY / (CARD_H + CARD_GAP);
	let cardColumn = Math.floor(cardColumnGap);
	let cardRow = Math.floor(cardRowGap);

	let col = cardColumn + (100 - CARD_GAP * 100 / CARD_W) / 100;
	let row = cardRow + (100 - CARD_GAP * 100 / CARD_H) / 100;
	if (col < cardColumnGap || row < cardRowGap) return;

	let cardUnderClick = rowColToArrayIndex(cardColumn, cardRow);

	if(cardColumn >= 0 && cardColumn < CARD_COLS &&
		cardRow >= 0 && cardRow < CARD_ROWS) {

		if(cardGrid[cardUnderClick]) {
			compareCards(cardUnderClick);
			drawAll();
		}
	}
}


function compareCards(card) {
	if (compare.length === 2) return;
	compare.push(card);
	cardGrid[card].open = true;

	if (compare.length === 2) {
		if (cardGrid[compare[0]].id === cardGrid[compare[1]].id) {
			setTimeout(function() {
				// cardGrid[compare[0]].shown = false;
				// cardGrid[compare[1]].shown = false;
				compare = [];
				drawAll();
			}, 1000);
		} else {
			setTimeout(function() {
				cardGrid[compare[0]].open = false;
				cardGrid[compare[1]].open = false;
				compare = [];
				drawAll();
			}, 1000);
		}
	}
}


window.onload = function() {
	canvas.addEventListener('click', updateMousePos);

	cardsReset();
	drawAll();
}