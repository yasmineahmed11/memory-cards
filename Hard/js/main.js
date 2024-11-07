let button=document.querySelector('.control-button span');
let user=document.querySelector('.name span');
let backBtn=document.querySelector('.control-button');
let blocksContainer=document.querySelector('.memory-game-blocks');
let duration = 1000;
let count=0;
button.onclick=()=>{
let yourname=prompt("what is your name");
if(yourname === "NULL" || yourname.trim()===""){
user.innerHTML='Unknown';
}
else{
    user.innerHTML=yourname;  
}
backBtn.remove();
setTimeout(() => {
    blocks.forEach(block =>{
        block.classList.add('is-flipped');
        block.classList.add('first-clicking');
    } );
    setTimeout(() => {
        blocks.forEach(block => block.classList.remove('is-flipped'));
    },1000); 
});
}
let blocks= Array.from(blocksContainer.children);
let orderRange=Array.from(Array(blocks.length).keys());
shuffle(orderRange);
blocks.forEach((block,index)=>{
block.style.order=orderRange[index];
block.addEventListener('click',function(){
    flipBlock(block);
});
});
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    //collect flipped cards
    let allFlippedBlocks=blocks.filter(flipBlock=>flipBlock.classList.contains('is-flipped'));
    if(allFlippedBlocks.length===2){
        stopClicking();
        checkMatchedBLocks(allFlippedBlocks[0],allFlippedBlocks[1]);
        
    //stop clicking
    //checking matched blocks
    }
}
function stopClicking(){
    blocksContainer.classList.add('no-clicking');
    setTimeout(()=>{
        blocksContainer.classList.remove('no-clicking');
//remove  class no clicking
    },duration);
}
//check matched block
function checkMatchedBLocks(firstBlock,secondBlock){
    let triesElement=document.querySelector('.tries span');
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
          // if all block are matched  add backbtn and change its inner html
        if (blocks.every(block => block.classList.contains('has-match'))) {
            document.querySelector('.Level-completed').style.display='flex'; // Show back button
            document.querySelector('.Level-completed span').innerHTML=`Your score is ${100-(count*10)}`;
        }
    }
    else{
        triesElement.innerHTML=parseInt(triesElement.innerHTML) + 1;
        count++;
        document.getElementById('fail').play();
        setTimeout(()=>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        },duration);
    }

    
}
function shuffle(array){
    let current=array.length,temp,random;
    while(current > 0){
        random=Math.floor(Math.random()*current);
        current--;
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;
    }
return array;
}

