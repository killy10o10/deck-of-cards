let deckId;
let computerScore = 0;
let playerScore = 0;
const cards = document.getElementById('cards');
const warHeading = document.getElementById('war');
const remainingCard = document.getElementById('remaining-card');
const drawCard = document.getElementById('draw-cards');
const computer = document.getElementById('computer');
const player = document.getElementById('player');

function handleClick() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      drawCard.disabled = false;
      remainingCard.innerText = `Cards Remaining: ${data.remaining}`;
    });
}

document.getElementById('new-deck').addEventListener('click', handleClick);

drawCard.addEventListener('click', () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      remainingCard.innerText = `Cards Remaining: ${data.remaining}`;
      warHeading.innerText = `${determineCardWinner(
        data.cards[0],
        data.cards[1]
      )}`;
      if (data.remaining === 0) {
        drawCard.disabled = true;
        warHeading.innerText = `${
          computerScore > playerScore
            ? 'computer wins!'
            : playerScore > computerScore
            ? 'You won!'
            : "It's a tie!"
        }`;
      }
      data.cards.map((card) => {
        cards.innerHTML += `<img src=${card.image} class="card-img">`;
      });
    });
  cards.innerHTML = '';
});

function determineCardWinner(card1, card2) {
  const cardOptions = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
    'ACE',
  ];
  const card1Value = cardOptions.indexOf(card1.value);
  const card2Value = cardOptions.indexOf(card2.value);

  if (card1Value > card2Value) {
    computerScore += 1;
    computer.innerText = `Computer Score: ${computerScore}`;
    return 'Points to Computer!';
  } else if (card2Value > card1Value) {
    playerScore += 1;
    player.innerText = `Your Score: ${playerScore}`;
    return 'Points to You!';
  } else {
    return 'War!';
  }
}
