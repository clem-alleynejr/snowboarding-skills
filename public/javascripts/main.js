// Select all the toggle buttons and all sets of skill interaction buttons
var toggleButtons = document.querySelectorAll(".toggle-btn");
var skillInteractionDivs = document.querySelectorAll(".skill-interaction");

// add 'click' event listeners to each toggle button
toggleButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Prevents Click event from propogating outside
    event.stopPropagation();

    // get the 'data-skill-id' attribute of the clicked toggle button
    var skillId = this.getAttribute("data-skill-id");

    // show the skillInteractionDiv for the toggle clicked
    skillInteractionDivs.forEach(function (div) {
      // Note: on the left side of the condition statement below, to access the custom data attribute (data-*) of the div (data-skill-id) through the 'dataset' property, we need to remove the 'data-' and convert to camelCase:
      // 'data-skill-id' ==> 'skillId'
      // The right side of the condition statement is the specific skillId of the clicked toggle
      if (div.dataset.skillId === skillId) {
        // if toggle already active, untoggle it to hide skill interaction
        if (div.classList.contains("active")) {
          div.classList.remove("active");

          // if not already active, toggle it active:
        } else {
          div.classList.add("active");
        }
        // untoggle all other skill interactions
      } else {
        if (div.classList.contains("active")) {
          div.classList.remove("active");
        }
      }
    });
  });
});

// Add click event listener to whole page to hide all skillInteractionDivs when anything else but the toggles are clicked
document.addEventListener("click", function () {
  skillInteractionDivs.forEach(function (div) {
    if (div.classList.contains("active")) {
      div.classList.remove("active");
    }
  });
});

// Initialize tracking for window size
var currentWindowWidth = window.innerWidth;

// resets the 'active' classes if page shrinks from desktop to mobile
window.addEventListener("resize", function () {
  if (window.innerWidth <= 991 && currentWindowWidth > 991) {
    skillInteractionDivs.forEach(function (div) {
      if (div.classList.contains("active")) {
        div.classList.remove("active");
      }
    });
  }
  // Update current window width tracking
  currentWindowWidth = window.innerWidth;
});

// Select all skill interaction buttons
var skillInteractionbuttons = document.querySelectorAll(
  '.skill-interaction button[type="submit"]'
);

// makes the buttons larger upon initial page load if on mobile (550 or less pixels)
skillInteractionbuttons.forEach(function (button) {
  if (currentWindowWidth <= 550) {
    if (button.classList.contains("btn-sm")) {
      button.classList.remove("btn-sm");
    }
  }
});

// makes the skill interaction buttons bigger or smaller depending on what size the window is resized to
window.addEventListener("resize", function () {
  skillInteractionbuttons.forEach(function (button) {
    // if the window is less that 550px, make the buttons bigger
    if (window.innerWidth <= 550) {
      if (button.classList.contains("btn-sm")) {
        button.classList.remove("btn-sm");
      }
      // if the window size is bigger than 550px, make the buttons smaller
    } else {
      if (!button.classList.contains("btn-sm")) {
        button.classList.add("btn-sm");
      }
    }
  });
});

// select difficulty level td's
var difficultyCells = document.querySelectorAll(
  ".skills-table tbody tr td:nth-child(2)"
);

// select 'My proficiency level' header
var proficiencyHeader = document.getElementById("proficiency-column");

// select 'Difficulty level' header
var diffLvlHeader = document.getElementById("difficulty-column");

// if page initialized is less than or equal to 490px, make the difficulties shorthand and the proficiency header shorthand
if (currentWindowWidth <= 490 && diffLvlHeader) {
  diffLvlHeader.textContent = "Diff. Level";
  proficiencyHeader.textContent = "My Prof. Level (/10)";
  difficultyCells.forEach((cell) => {
    const difficultyLevel = cell.textContent.trim();
    switch (difficultyLevel) {
      case "Beginner":
        cell.textContent = "Beg.";
        break;
      case "Intermediate":
        cell.textContent = "Int.";
        break;
      case "Advanced":
        cell.textContent = "Adv.";
        break;
      case "Expert":
        cell.textContent = "Exp.";
        break;
    }
  });
}

// Difficulty level shorthand for resizing window
window.addEventListener("resize", function () {
  if (this.window.innerWidth <= 490) {
    diffLvlHeader.textContent = "Diff. Level";
    proficiencyHeader.textContent = "My Prof. Level (/10)";
    difficultyCells.forEach((cell) => {
      const difficultyLevel = cell.textContent.trim();
      switch (difficultyLevel) {
        case "Beginner":
        case "Beg.":
          cell.textContent = "Beg.";
          break;
        case "Intermediate":
        case "Int.":
          cell.textContent = "Int.";
          break;
        case "Advanced":
        case "Adv.":
          cell.textContent = "Adv.";
          break;
        case "Expert":
        case "Exp.":
          cell.textContent = "Exp.";
          break;
      }
    });
  } else {
    difficultyCells.forEach((cell) => {
      diffLvlHeader.textContent = "Difficulty Level";
      proficiencyHeader.textContent = "My Proficiency Level (/10)";
      const difficultyLevel = cell.textContent.trim();
      switch (difficultyLevel) {
        case "Beginner":
        case "Beg.":
          cell.textContent = "Beginner";
          break;
        case "Intermediate":
        case "Int.":
          cell.textContent = "Intermediate";
          break;
        case "Advanced":
        case "Adv.":
          cell.textContent = "Advanced";
          break;
        case "Expert":
        case "Exp.":
          cell.textContent = "Expert";
          break;
      }
    });
  }
});

// Select 'My Skills' and 'Add Skill' buttons
var mySkillsAndAddSkillButtons = document.querySelectorAll(
  '.my-skills-and-add-skill-buttons button[type="submit"]'
);

// makes the buttons larger upon initial page load if on mobile (425 or less pixels)
mySkillsAndAddSkillButtons.forEach(function (button) {
  if (currentWindowWidth <= 425) {
    if (button.classList.contains("btn-lg")) {
      button.classList.remove("btn-lg");
    }
  }
});

// makes the buttons bigger or smaller depending on what size the window is resized to
window.addEventListener("resize", function () {
  mySkillsAndAddSkillButtons.forEach(function (button) {
    // if the window is less than 425px, make the buttons smaller
    if (window.innerWidth <= 425) {
      if (button.classList.contains("btn-lg")) {
        button.classList.remove("btn-lg");
      }
      // if the window size is bigger than 425px, make the buttons smaller
    } else {
      if (!button.classList.contains("btn-lg")) {
        button.classList.add("btn-lg");
      }
    }
  });
});
