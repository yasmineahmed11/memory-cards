

document.querySelector(".control-buttons span").onclick = function () {
    //set name
    let yourName = prompt("What's your Name?")

    //if he wrote his name it will be shown, if not it will be unknown 


    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = "Unknown";
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }


    //remove splash

    document.querySelector(".control-buttons").remove();
   
     // Show all cards for 2 seconds
     blocks.forEach(block => {
        block.classList.add('is-flipped');
    });

    // Hide cards after 2 seconds
    setTimeout(() => {
        blocks.forEach(block => {
            block.classList.remove('is-flipped');
        });
    }, 1000);
    
};

// Setting the variables

let duration = 1000;

let blocksContainer = document.querySelector(".memory-blocks");

let blocks = Array.from(blocksContainer.children)

// console.log(blocks.length);

// spread operator ... to extract them as array indexes
// keys to order them from 0 > 21
// array() to automatically create an array with block length
// put between [] to make it as an array

// we need them like that to randomize the indexes.
// empty array with 20 values each has keys and key start from 0 to 20 and spread operator to extract the elements into an array

//array.from instead of spread does same
let orderRange = Array.from(Array(blocks.length).keys())

shuffle(orderRange);


// Add order CSS property

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    //give blocks order to be able to randomize later

    //add click event

    block.addEventListener('click', function () {

        //trigger flip block function
        flipBlock(block);   
        
    })
    
});

//Flip block function

function flipBlock(selectedBlock){

    //add class is flipped
    selectedBlock.classList.add('is-flipped');

    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If theres two selected blocks

    if(allFlippedBlocks.length === 2){
       //Stop clicking function
        //pointer event none make mosue click useless

        stopClicking();

       //Check matched block function

       checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
        
    }

    
}

//Check matched block function

function checkMatchedBlocks(firstBlock, secondBlock){

    //change wrong tries count

    let triesElement = document.querySelector('.tries span');


    if(firstBlock.dataset.technology ===  secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

            // to make it more organized, has matched will have same attributes as is flippped
        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');

        document.getElementById('success').play();

    } else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        // only is flipped removed

        document.getElementById('fail').play();

        setTimeout(()=>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration)


        
    }
}

//Stop clicking function

function stopClicking(){

    //Add class no clicking on block container

    blocksContainer.classList.add('no-clicking');

    setTimeout(() =>{

        //remove class no-clicking after 1 second ( duration)

    blocksContainer.classList.remove('no-clicking');


    }, duration)
}


// Shuffle function

function shuffle(array){
    //setting variables

    let current = array.length,
        temp, //store temp value
        random; // random number in idnex

        while(current>0){
            //Get random number 

            random = Math.floor(Math.random()* current)
            // so he numbers are not decimal and numbers not exceed our range
    
            //Decrease length by one
            current --;

        // 3 steps to perform shuffle


            // 1. save current element in stash (temp)
            temp = array[current];

            // 2. current element = random element
            array[current] = array[random];

            // 3. random element = get element in stash (temp)
            array[random] = temp

            
        }

        return array;
}


