let playDeck = JSON.parse(JSON.stringify(Deck));
const cardList = document.getElementById('cards');
const hardMode = document.getElementById('hard');
const highscore = document.getElementById('highscore');
const playerList = document.getElementById('playerList');
const playerTurn =document.getElementById('playerTurn');
let turn =0;
const playerOne =[];
const playerNames=[];


hardMode.addEventListener('change',(event)=>{
    let help = document.getElementById('show-points');
    if(event.target.checked){
        help.style.display="none";
    }else{
        help.style.display="block";
    }
});


function shuffle(playDeck){
    for (i=0;i<playDeck.length;i++){
        
        let y = Math.floor(Math.random()*(i+1));
        let x = playDeck[i];
        playDeck[i] = playDeck[y];
        playDeck[y] =x; 
    }
    
    return playDeck;
}

function drawCard(){
    if(playDeck.length>0){
    let card = {"card":`${JSON.stringify(playDeck[0])}`};
    playerNames[turn].cards.push(card);
    let temp =playerNames[`${turn}`].cards;
    playDeck.shift();
    countPoints(temp);
    displayCards();
    }else{
        console.log('no more cards in deck')
    }
}

function countPoints(number){
    let currentPoints = 0;
    for (i=0;i<number.length;i++){
        let tempArray = JSON.parse(number[i].card);  
        currentPoints = currentPoints +parseInt(tempArray.value);
    }
    document.getElementById('points').innerHTML=currentPoints;
}

function displayCards(){
    

        let fullDeck =playerNames[turn].cards;
        cardList.innerHTML='';

            for (i=0;i<fullDeck.length;i++){
                let newCard = document.createElement('div');
                let newContent =``;

                let tempImage = JSON.parse(fullDeck[i].card);
                newContent=
                `
                <img class="cards" src="${tempImage.image}">
                `;  
                newCard.innerHTML = newContent;
                cardList.appendChild(newCard);
            }
    
}

function gameRestart(){
    playDeck = JSON.parse(JSON.stringify(Deck));
    playerNames.length =0;
    shuffle(playDeck);
    listPlayers();
    document.getElementById('points').innerHTML=0;
    document.getElementsByClassName('game')[0].style.display="none";
    document.getElementById('go').style.display="none";
    localStorage.clear();
    cardList.innerHTML='';
    return playDeck;
}

// function checkScore(){
//     let finalPoints = 0;
//     playerNames.forEach(cards=>{
        
//         for (i=0;i<cards.length;i++){
//             console.log(JSON.parse(cards.i));
//         }

//         });
//     };
//     // for (i=1;i<playerOne.length;i++){
//     //     let tempPaints = JSON.parse(playerOne[i].cards);  
//     //     finalPoints = finalPoints +parseInt(tempPaints.value);
//     // }
//     // comparePoints(finalPoints);

function playerName(){
    let name = {'name':`${document.getElementById('name').value}`};
    playerNames.push(name);
    document.getElementById('go').style.display="block";
    listPlayers();
}
function comparePoints(finalPoints){
    highscore.innerText=`Player name: ${playerOne[0].name}. Player score: ${finalPoints}. Draws: ${playerOne.length-1}`;
    let gameScore ={
        
        "Player score:": `"${finalPoints}."`,
        "Draws:": `"${playerOne.length-1}."`
        
    }
    localStorage.setItem(`'${playerOne[0].name}'`,JSON.stringify(gameScore));
    console.log(localStorage);
}
function listPlayers(){
    playerList.innerHTML='';
    playerNames.forEach((player,index)=>{
        let newPlayer = document.createElement('div');
        let newContent =``;   
            newContent=
            `
            <div class="player">
            <p>Player: ${index+1} : ${player.name}</p>
            </div>
            `;  
     
            newPlayer.innerHTML = newContent;
            playerList.appendChild(newPlayer);
    });
}

function shufflePlayers(){
    shuffle(playerNames);
    listPlayers();
}

function gameStart(){
    shuffle(playDeck);
    document.getElementsByClassName('game')[0].style.display="flex";
    playerTurn.innerHTML =`${playerNames[turn].name}`;
    playerNames.forEach(player=>{
        player["cards"]=[];
    });
}
function endTurn(){
    cardList.innerHTML='';
    

    if (turn===playerNames.length-1){
        turn=0;
        playerTurn.innerHTML =`${playerNames[turn].name}`;
        displayCards();
    }
    else{
        turn =turn+1;
        playerTurn.innerHTML =`${playerNames[turn].name}`;
        displayCards();
    }
}