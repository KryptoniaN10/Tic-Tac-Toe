const cells=document.querySelectorAll(".cell")
const statusText=document.querySelector("#statusText")
const restartBtn=document.querySelector("#restartBtn")
const winconditions=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
let options=["","","","","","","","",""]
let currentPlayer="X"
let running=false;
initializegame()
restartBtn.onclick=restartGame()
function initializegame(){
    cells.forEach(cell=>cell.addEventListener("click",cellclicked))
    restartBtn.addEventListener("click",restartGame)
    statusText.textContent=`${currentPlayer}'s turn`
    running=true
    document.body.style.backgroundColor="white"
}
function cellclicked(){
      const cellIndex=this.getAttribute("cellIndex")
      if (options[cellIndex] !='' || !running){
        return;
      }
      
        updateCell(this,cellIndex)
        checkWinner()
      
}
function updateCell(cell,index){
    options[index]=currentPlayer
    cell.textContent=currentPlayer
    changePlayer()
}
function changePlayer(){
    currentPlayer=currentPlayer=="X"?"O":"X"
    statusText.textContent=`${currentPlayer}'s turn`
}
function checkWinner(){
    let roundwon=false
    for(let i=0;i<winconditions.length;i++){
        const condition=winconditions[i]
        const cellA=options[condition[0]]
        const cellB=options[condition[1]]
        const cellC=options[condition[2]]
        
        if(cellA==""||cellB==""||cellC==""){
            continue
        }
        if(cellA==cellB && cellB==cellC){
            roundwon=true
            
            break
        }

    }
    if(roundwon){
        changePlayer()
        statusText.textContent=`${currentPlayer} wins!`
        running=false;
        document.body.style.backgroundColor="green"
    }
    else if(!options.includes("")){
        statusText.textContent=`Tie!`
        running=false
        document.body.style.backgroundColor="red"
    }
    
}  
function restartGame(){
 currentPlayer="X"
 options=["","","","","","","","","",]
 cells.forEach((cell)=>cell.textContent="")
 running=true
 initializegame()

}
