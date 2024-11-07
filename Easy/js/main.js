
document.querySelector(".start-button span").onclick = function () {
  //set name
  let yourName = prompt("What's your Name?")

  //if he wrote his name it will be shown, if not it will be unknown 


  if (yourName == null || yourName == "") {

      document.querySelector(".name span").innerHTML = "Unknown";
  }else{
      document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".start-button").remove();

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

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");


// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener('click', function () {

    // Trigger The Flip Block Function
    flipBlock(block);

  });

});

// Flip Block Function
// Flip Block Function
function flipBlock(selectedBlock) {

  

  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  // If There Are Two Selected Blocks
  if (allFlippedBlocks.length === 2) {

    // Stop Clicking Function (Prevent flipping more cards)
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

  }

}

// Stop Clicking Function
function stopClicking() {

  // Add Class No Clicking on Main Container (Disable more clicks)
  blocksContainer.classList.add('no-clicking');

  // Wait for the duration to finish before enabling clicks again
  setTimeout(() => {

    // Remove Class No Clicking After The Duration (Enable clicks again)
    blocksContainer.classList.remove('no-clicking');

  }, duration);

}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

    // If both blocks match
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');


    document.getElementById('success').play();

  } else {

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');

    }, duration);

    // Fail sound (Uncomment if you have the audio setup)
    document.getElementById('fail').play();

  }

}


// Shuffle Function
function shuffle(array) {

  // Settings Vars
  let current = array.length,
      temp,
      random;

  while (current > 0) {

    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;

  }
  return array;
}
