var fileName = "history.txt";

function writeFile(fileName, fileContent) {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
        directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function () {
                    console.log("File has been written successfully.");
                };

                fileWriter.onerror = function (error) {
                    console.log("Error writing file: " + error.toString());
                };

                var blob = new Blob([fileContent], { type: "text/plain" });
                fileWriter.write(blob);
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);
}


function readFile(fileName, callback) {
  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(directoryEntry) {
    directoryEntry.getFile(fileName, { create: false }, function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
          var fileContent = this.result;
          callback(fileContent);
        };

        reader.readAsText(file);
      }, errorHandler);
    }, errorHandler);
  }, errorHandler);
}

// Error handler function
function errorHandler(error) {
    console.log("Error: " + error.toString());
}

var sections;

readFile("history.txt", function(fileContent) {
  // Parse the file content and assign it to the sections variable
  sections = JSON.parse(fileContent);
  if (sections.length === 0) {
    sections = [
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
  }
  console.log("Sections loaded:", sections);
});

// Get the container element to append the sections
var container = document.getElementById("container");

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
  exerciseList.className = "exerciseList";
  
  section.exercises.forEach(function(exercise) {
    var exerciseBox = createExerciseBox(exercise);
    exerciseList.appendChild(exerciseBox);
  });
  
  // Create the add button
  var addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.className = "addButton";

  var addButtonSave = document.createElement("button");
  addButtonSave.textContent = "Guarda els canvis";
  addButtonSave.className = "addButtonSave";
  
  // Create the input field for exercise name
  var exerciseInput = document.createElement("input");
  exerciseInput.type = "text";
  exerciseInput.className = "exerciceInput";
  exerciseInput.placeholder = "Nom d'exercici";
  
  // Append the elements to the section container
  sectionContainer.appendChild(sectionHeading);
  sectionContainer.appendChild(exerciseList);
  sectionContainer.appendChild(exerciseInput);
  sectionContainer.appendChild(addButton);
  sectionContainer.appendChild(addButtonSave);
  
  // Append the section container to the main container
  container.appendChild(sectionContainer);
  
  // Add event listener for the add button
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
  
  // Add event listener for exercise deletion
  exerciseList.addEventListener("click", function(event) {
    var target = event.target;
    if (target.classList.contains("deleteButton")) {
      var exerciseBox = target.closest(".exerciseBox");
      exerciseBox.remove();
    }
  });
});

// Function to create an exercise box
function createExerciseBox(exercise) {
  var exerciseBox = document.createElement("li");
  exerciseBox.className = "exerciseBox red-background";
  
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
  
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "deleteButton";
  exerciseBox.appendChild(deleteButton);
  
  // Add event listener to the exerciseBox itself
  exerciseBox.addEventListener("click", function(event) {
    this.classList.toggle("green-background");
  });
  
  return exerciseBox;
}

// Add event listeners for section links
var sectionLinks = document.querySelectorAll(".sectionLink");

sectionLinks.forEach(function(sectionLink) {
  sectionLink.addEventListener("click", function(event) {
    event.preventDefault();
    var sectionId = this.getAttribute("href").substring(1);
    showSection(sectionId);
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

var exerciseBoxes = document.querySelectorAll(".exerciseBox");

exerciseBoxes.forEach(function(exerciseBox) {
  var exerciseList = exerciseBox.querySelector(".exerciseList");
  exerciseList.addEventListener("click", function(event) {
    exerciseList.classList.toggle("green-background");
  });
});

var writeButton = document.getElementsByClassName("addButtonSave")[0];

writeButton.addEventListener("click", function() {
  var fileName = "history.txt";
  var fileContent = sections;

  writeFile(fileName, fileContent);
});
