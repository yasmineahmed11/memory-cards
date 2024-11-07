// // Function to get user's name and update the info container
// function getName() {
//     let yourName = prompt("What's your name?");
  
//     if (yourName == null || yourName === "") {
//       document.querySelector(".name span").innerHTML = 'Unknown';
//     } else {
//       document.querySelector(".name span").innerHTML = yourName;
//     }
//   }
  
//   // Call the getName function when the page loads
//   window.onload = getName;
  
//   // Rest of your code remains the same
//   document.querySelectorAll(".control-buttons a").forEach(button => {
//     button.onclick = function() {
//       // Remove the control buttons when a difficulty level is clicked
//       document.querySelector(".control-buttons").remove();
//     };
//   });