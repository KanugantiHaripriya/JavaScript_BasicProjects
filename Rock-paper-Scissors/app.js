let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');

const userScorePara= document.querySelector('#user-score');
const compScorePara= document.querySelector('#comp-score');

const reset=document.querySelector("#reset");

const genCompChoice=()=>{
	const options = [ 'rock', 'paper', 'scissors'];
	const rand=options[Math.floor(Math.random()*3)]; // we use math.random to get rnadom number out from 0 to 3	
	return rand
};	

const drawGame = (userChoice)=>{
	msg.innerText = `Its a Draw ! Both choosed ${userChoice}`;
	msg.style.backgroundColor = "#081b31";
};


const showWinner =(userWin ,  userChoice, compChoice )=>{
	if(userWin){
		userScore++;
		msg.innerText = `you win! your ${userChoice} beats ${compChoice}`;
		msg.style.backgroundColor = "green";
		userScorePara.innerText= userScore;
	}else{
		compScore++;
		msg.innerText = `you lost! your ${compChoice} beats ${userChoice}`;
		msg.style.backgroundColor = "red";
		compScorePara.innerText = compScore;
	}
};


const playGame= (userChoice)=>{
	//Generate the computer choice =>modular
	const compChoice = genCompChoice();

	if(userChoice === compChoice){
		//Draw Game
		drawGame(userChoice)
	}else{
		let userWin =true;
		if(userChoice == "rock"){
			userWin = compChoice == "paper" ? false : true;
		} else if( userChoice == "paper"){
			userWin = compChoice == "scissors" ? false : true;
		}else{
			userWin = compChoice ==="rock" ? false : true;
		}
		showWinner(userWin , userChoice, compChoice);
	};
};

reset.addEventListener("click",() => {
	userScore=0;
	compScore=0;
	userScorePara.innerText = userScore;
  	compScorePara.innerText = compScore;
  	msg.innerText = "Play your move";
  	msg.style.backgroundColor = "#081b31";
});


choices.forEach((choice) => {
	choice.addEventListener("click", ()=> {
		const userChoice=choice.getAttribute("id");
		playGame(userChoice);
	});
});

