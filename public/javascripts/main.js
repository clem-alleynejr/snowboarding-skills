/*----- Variable Initialization -----*/

// Select all the toggle buttons and all sets of skill interaction buttons
var toggleButtons = document.querySelectorAll(".toggle-btn");
var skillInteractionDivs = document.querySelectorAll(".skill-interaction");

// Initialize tracking for window size
var currentWindowWidth = window.innerWidth;

// Select all skill interaction buttons
var skillInteractionbuttons = document.querySelectorAll(
  '.skill-interaction button[type="submit"]'
);

// select difficulty level td's
var difficultyCells = document.querySelectorAll(
  ".skills-table tbody tr td:nth-child(2)"
);

// select 'My proficiency level' header
var proficiencyHeader = document.getElementById("proficiency-column");

// select 'Difficulty level' header
var diffLvlHeader = document.getElementById("difficulty-column");

// Select 'My Skills' and 'Add Skill' buttons
var mySkillsAndAddSkillButtons = document.querySelectorAll(
  '.my-skills-and-add-skill-buttons button[type="submit"]'
);

/*----- Toggle Buttons For Skill Interaction  -----*/

// add 'click' event listeners to each toggle button
if (toggleButtons) {
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
}

// add event listener to whole page
document.addEventListener("click", function () {
  if (skillInteractionDivs) {
    skillInteractionDivs.forEach(function (div) {
      // hide all skillInteractionDivs when anything else but the toggles are clicked
      if (div.classList.contains("active")) {
        div.classList.remove("active");
      }
    });
  }
});

/*----- Screen size dependant functionality  -----*/

/*----- 991px -----*/

window.addEventListener("resize", function () {
  // if page shrinks from >991px to <991px
  if (window.innerWidth <= 991 && currentWindowWidth > 991) {
    if (skillInteractionDivs) {
      skillInteractionDivs.forEach(function (div) {
        // resets the 'active' classes of the skill interactions
        if (div.classList.contains("active")) {
          div.classList.remove("active");
        }
      });
    }
  }
  // Update current window width tracking
  currentWindowWidth = window.innerWidth;
});

/*----- 550 -----*/

// If initial page loaded is <=550px
if (currentWindowWidth <= 550) {
  if (skillInteractionbuttons) {
    skillInteractionbuttons.forEach(function (button) {
      // make the skill interaction buttons bigger for easier tapping
      if (button.classList.contains("btn-sm")) {
        button.classList.remove("btn-sm");
      }
    });
  }
}

// Resizing page (550px breakpoint)
window.addEventListener("resize", function () {
  // Window resized to <= 550px
  if (window.innerWidth <= 550) {
    if (skillInteractionbuttons) {
      skillInteractionbuttons.forEach(function (button) {
        if (button.classList.contains("btn-sm")) {
          // make the skill interaction buttons bigger for easier tapping
          button.classList.remove("btn-sm");
        }
      });
    }
    // Window resized to > 550px
  } else {
    if (skillInteractionbuttons) {
      skillInteractionbuttons.forEach(function (button) {
        if (!button.classList.contains("btn-sm")) {
          // make the skill interaction buttons smaller to make room for desktop button labels
          button.classList.add("btn-sm");
        }
      });
    }
  }
});

/*----- 490 -----*/
// If initial page loaded is <=490px
if (currentWindowWidth <= 490) {
  if (diffLvlHeader) {
    diffLvlHeader.textContent = "Diff. Level";
  }
  if (proficiencyHeader) {
    proficiencyHeader.textContent = "My Prof. Level (/10)";
  }
  if (difficultyCells) {
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
}

/*----- 425 -----*/

// if page initialized is less than or equal to 490px, make the difficulties shorthand and the proficiency header shorthand

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
