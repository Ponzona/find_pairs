const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.imageSmoothingEnabled = false;

const CARD_W = 120;
const CARD_H = 200;
const CARD_GAP = 10;
const CARD_ROWS = 2;
const CARD_COLS = 4;
let cardGrid = new Array(CARD_COLS * CARD_ROWS / 2).fill('');
let compare = [];

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
{ id: 13, type: 'Planets', name: 'Neptunus', open: false, shown: true },
{ id: 14, type: 'Planets', name: 'Pluto', open: false, shown: true },
{ id: 15, type: 'Metalls', name: 'Copper', open: false, shown: true },
// TODO: processes, mundanes, compound
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
		ctx.moveTo(x + CARD_W / 2, 						y + CARD_H - CARD_H / 3.5);
		ctx.lineTo(x + CARD_W / 10, 					y + CARD_H / 3.5);
		ctx.lineTo(x + CARD_W - CARD_W / 10, 	y + CARD_H / 3.5);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x + CARD_W / 5, 						y + CARD_H - CARD_H / 2.5);
		ctx.lineTo(x + CARD_W - CARD_W / 5, 	y + CARD_H - CARD_H / 2.5);
		ctx.stroke();
	}

	if (card.id === 1) {
		// draw Water
		ctx.beginPath();
		ctx.moveTo(x + CARD_W / 2, 						y + CARD_H - CARD_H / 3.5);
		ctx.lineTo(x + CARD_W / 10, 					y + CARD_H / 3.5);
		ctx.lineTo(x + CARD_W - CARD_W / 10, 	y + CARD_H / 3.5);
		ctx.closePath();
		ctx.stroke();
	}

	if (card.id === 2) {
		// draw Air
		ctx.beginPath();
		ctx.moveTo(x + CARD_W / 2,					 	y + CARD_H / 3.5);
		ctx.lineTo(x + CARD_W / 10, 					y + CARD_H - CARD_H / 3.5);
		ctx.lineTo(x + CARD_W - CARD_W / 10,	y + CARD_H - CARD_H / 3.5);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x + CARD_W / 5, 						y + CARD_H / 2.5);
		ctx.lineTo(x + CARD_W - CARD_W / 5, 	y + CARD_H / 2.5);
		ctx.stroke();
	}

	if (card.id === 3) {
		// draw Fire
		ctx.beginPath();
		ctx.moveTo(x + CARD_W / 2,					 	y + CARD_H / 3.5);
		ctx.lineTo(x + CARD_W / 10, 					y + CARD_H - CARD_H / 3.5);
		ctx.lineTo(x + CARD_W - CARD_W / 10,	y + CARD_H - CARD_H / 3.5);
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