/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, winScore, pvp, rollNums;

pvp = true;
init();



document.querySelector('.btn-roll').addEventListener('click', function() {
    console.log("roll");
    if(gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if(dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            nextPlayer();
        }
    }
    
});

document.querySelector('.winning-score').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        if(!isNaN(document.querySelector('.winning-score').value)) {
            document.querySelector('.winning-score').placeholder = document.querySelector('.winning-score').value;
            document.querySelector('.winning-score').value = '';
        } else {
            document.querySelector('.winning-score').value = '';
        } 
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    console.log("hold");
    if(gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.winning-score').placeholder;
        
        if(!isNaN(input)) {
            winScore = input;
        } else {
            winScore = 100;
        }

        if(scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            document.querySelector('#current-' + activePlayer).textContent = 0;
            roundScore = 0;
            nextPlayer();
        }
    } 
});

document.querySelector('.btn-pvp').addEventListener('click', function() {
    pvp = true;
    init();
});

document.querySelector('.btn-pvc').addEventListener('click', function() {
    pvp = false;
    init();
});

function nextPlayer() {
    console.log("nextPlayer");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    if(activePlayer === 1 && pvp === false) {
        //document.getElementById('active .player-name::after').style.right = "-65px";
        //console.log(document.getElementById('.active .player-name::after').style.right);
        //document.querySelector('.player-name').style.fontSize= '30px'
        var compFont = document.getElementById('name-1');
        compFont.style.fontSize = "32px"; 
        runComputer();
    }
    else {
        var compFont = document.getElementById('name-1');
        compFont.style.fontSize = "40px"; 
    }
}

function runComputer() {
    console.log("runComputer");
    rollNums = 0;
    while(true) {
        if(activePlayer != 1) {
            break;
        }
        /*
        if(activeScore[1] == 0) {
            /*
            setTimeout(computerRoll(), 1000);
            if(activePlayer != 1) {
                break;
            }
            setTimeout(computerHold(), 2000);
            break;
            //
            var dice = Math.floor(Math.random() * 6) + 2;
            var diceDOM = document.querySelector('.dice');

            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
            activeScore[1] = dice;
            nextPlayer();
            break;
        }
        */
        if(rollNums > 4) {
            setTimeout(computerHold(), 2000);
            break;
        }

        setTimeout(computerRoll(), 1000);
        rollNums++;

        if(activePlayer != 1) {
            break;
        }
        if(rollNums < 3 && (document.getElementById('current-' + activePlayer).textContent + scores[activePlayer]) >= 90) {
            while(rollNums < 3) {
                setTimeout(computerRoll(), 1000);
                rollNums++;
                if(activePlayer != 1) {
                    break;
                }
            }
        }
        else if(rollNums === 3 && document.getElementById('current-' + activePlayer).textContent >= 10) {
            setTimeout(computerRoll(), 1000);
            rollNums++;
            if(activePlayer != 1) {
                break;
            }
            setTimeout(computerHold(), 2000);
            break;
        }
    }
}

function computerRoll() {
    document.getElementById('rollBtn').click();
}

function computerHold() {
    document.getElementById('holdBtn').click();
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    console.log("init");
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    if(pvp === true) {
        document.querySelector('#name-1').textContent = 'Player 2';
    }
    else {
        document.querySelector('#name-1').textContent = 'Computer';
    }
    

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}