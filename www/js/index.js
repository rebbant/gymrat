// Define the sections and their exercises
var sections = [
  {
    name: "CAMA",
    exercises: []
  },
  {
    name: "BRAÇ",
    exercises: []
  },
  {
    name: "PIT",
    exercises: []
  },
  {
    name: "ESQUENA",
    exercises: []
  },
  // Add more sections here
];

// Get the container element to append the sections
var container = document.querySelector(".container");

// Generate the content dynamically
sections.forEach(function(section) {
  // Create the section container
  var sectionContainer = document.createElement("div");
  sectionContainer.className = "content";
  sectionContainer.id = section.name.toLowerCase();
  
  // Create the section heading
  var sectionHeading = document.createElement("h2");
  sectionHeading.textContent = section.name;
  
  // Create the exercise list
  var exerciseList = document.createElement("ul");
  
  section.exercises.forEach(function(exercise) {
    var exerciseBox = createExerciseBox(exercise);
    exerciseList.appendChild(exerciseBox);
  });
  
  // Create the add button
  var addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.className = "addButton";
  
  // Create the input field for exercise name
  var exerciseInput = document.createElement("input");
  exerciseInput.type = "text";
  exerciseInput.placeholder = "Enter exercise name";
  
  // Append the elements to the section container
  sectionContainer.appendChild(sectionHeading);
  sectionContainer.appendChild(exerciseList);
  sectionContainer.appendChild(exerciseInput);
  sectionContainer.appendChild(addButton);
  
  // Append the section container to the main container
  container.appendChild(sectionContainer);
});

// Function to create an exercise box
function createExerciseBox(exercise) {
  var exerciseBox = document.createElement("li");
  exerciseBox.className = "exerciseBox";
  
  var exerciseName = document.createElement("div");
  exerciseName.textContent = exercise;
  exerciseName.className = "exerciseName";
  exerciseBox.appendChild(exerciseName);
  
  var repetitionsInput = document.createElement("input");
  repetitionsInput.type = "text";
  repetitionsInput.placeholder = "Repetitions";
  repetitionsInput.className = "repetitionsInput";
  exerciseBox.appendChild(repetitionsInput);
  
  var weightInput = document.createElement("input");
  weightInput.type = "text";
  weightInput.placeholder = "Weight";
  weightInput.className = "weightInput";
  exerciseBox.appendChild(weightInput);
  
  return exerciseBox;
}

// Add event listeners for section links and add buttons
var sectionLinks = document.querySelectorAll(".sectionLink");
var addButtons = document.querySelectorAll(".addButton");

sectionLinks.forEach(function(sectionLink) {
  sectionLink.addEventListener("click", function(event) {
    event.preventDefault();
    var sectionId = this.getAttribute("href").substring(1);
    showSection(sectionId);
  });
});

addButtons.forEach(function(addButton) {
  addButton.addEventListener("click", function() {
    var exerciseList = this.previousElementSibling.previousElementSibling;
    var exerciseInput = this.previousElementSibling;
    var exerciseName = exerciseInput.value.trim();
    if (exerciseName !== "") {
      var newExercise = createExerciseBox(exerciseName);
      exerciseList.appendChild(newExercise);
      exerciseInput.value = "";
    }
  });
});

// Function to show the selected section
function showSection(sectionId) {
  var sections = document.getElementsByClassName("content");
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  var section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "block";
  }
}
