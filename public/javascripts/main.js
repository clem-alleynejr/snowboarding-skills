/*----- Variable Initialization -----*/

// Select all the toggle buttons and all sets of skill or comment interaction buttons
var toggleButtons = document.querySelectorAll(".toggle-btn");
var skillInteractionDivs = document.querySelectorAll(".skill-interaction");
var commentInteractionDivs = document.querySelectorAll(".comment-interaction");

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
var diffLvlHeader = document.querySelectorAll(".difficulty-column");

// Select 'My Skills' and 'Add Skill' buttons
var mySkillsAndAddSkillButtons = document.querySelectorAll(
  '.my-skills-and-add-skill-buttons button[type="submit"]'
);

// Get the textarea elements for notes/comments
var commentTextArea = document.getElementById("note-content");

/*----- Toggle Buttons For Skill Interaction  -----*/

if (toggleButtons) {
  toggleButtons.forEach(function (button) {
    // add 'click' event listeners to each toggle button
    button.addEventListener("click", function () {
      // Prevents Click event from propogating outside
      event.stopPropagation();

      // get the value of the clicked toggle's 'data-skill-id' attribute (if applicable)
      var skillId = this.getAttribute("data-skill-id");

      //get the value of the clicked toggle's 'data-note-comment-id' attribute (if applicable)
      var noteCommentId = this.getAttribute("data-note-comment-id");

      if (skillInteractionDivs) {
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
      }

      if (commentInteractionDivs) {
        // show the CommentInteractionDiv for the toggle clicked
        commentInteractionDivs.forEach(function (div) {
          // Note: on the left side of the condition statement below, to access the custom data attribute (data-*) of the div (data-skill-id) through the 'dataset' property, we need to remove the 'data-' and convert to camelCase:
          // 'data-note-comment-id' ==> 'noteCommentId'
          // The right side of the condition statement is the specific noteId of the clicked toggle
          if (div.dataset.noteCommentId === noteCommentId) {
            // if toggle already active, untoggle it to hide note/comment interaction
            if (div.classList.contains("active")) {
              div.classList.remove("active");

              // if not already active, toggle it active:
            } else {
              div.classList.add("active");
            }
            // untoggle all other note/comment interactions
          } else {
            if (div.classList.contains("active")) {
              div.classList.remove("active");
            }
          }
        });
      }
    });
  });

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

    if (commentInteractionDivs) {
      commentInteractionDivs.forEach(function (div) {
        // hide all commentInteractionDivs when anything else but the toggles are clicked
        if (div.classList.contains("active")) {
          div.classList.remove("active");
        }
      });
    }
  });
}

/*----- Update user input text area sizes depending on content  -----*/

// Set the initial height to fit the content
if (commentTextArea) {
  commentTextArea.style.height = commentTextArea.scrollHeight + 15 + "px";

  // Update the height as the user types
  commentTextArea.addEventListener("input", function () {
    commentTextArea.style.height = "auto";
    commentTextArea.style.height = commentTextArea.scrollHeight + 15 + "px";
  });
}

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

/*----- 550px -----*/

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
  // If Window is resized to <= 550px
  if (window.innerWidth <= 550) {
    if (skillInteractionbuttons) {
      skillInteractionbuttons.forEach(function (button) {
        if (button.classList.contains("btn-sm")) {
          // make the skill interaction buttons bigger for easier tapping
          button.classList.remove("btn-sm");
        }
      });
    }
    // If Window is resized to > 550px
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

/*----- 490px -----*/

// If initial page loaded is <=490px
if (currentWindowWidth <= 490) {
  if (diffLvlHeader) {
    diffLvlHeader.forEach((header) => {
      // Make Diffficulty Level header shorthand
      diffLvlHeader.textContent = "Diff. Level";
    });
  }
  if (proficiencyHeader) {
    // Make Proficiency Level header shorthand
    proficiencyHeader.textContent = "My Prof. Level (/10)";
  }
  if (difficultyCells) {
    difficultyCells.forEach((cell) => {
      const difficultyLevel = cell.textContent.trim();
      // Make the Skill Level data shorthand
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

// Resizing page (490px breakpoint)
window.addEventListener("resize", function () {
  // If Window is resized to <= 490px
  if (this.window.innerWidth <= 490) {
    if (diffLvlHeader) {
      diffLvlHeader.forEach((header) => {
        // Make Diffficulty Level header shorthand
        header.textContent = "Diff. Level";
      });
    }
    if (proficiencyHeader) {
      proficiencyHeader.textContent = "My Prof. Level (/10)";
    }
    if (difficultyCells) {
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
    }
    // If Window is resized to > 490px
  } else {
    if (diffLvlHeader) {
      diffLvlHeader.forEach((header) => {
        // Make Diffficulty Level full text
        header.textContent = "Difficulty Level";
      });
    }
    if (proficiencyHeader) {
      proficiencyHeader.textContent = "My Proficiency Level (/10)";
    }
    if (difficultyCells) {
      difficultyCells.forEach((cell) => {
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
  }
});

/*----- 425px -----*/

// If initial page loaded is <=425px
if (currentWindowWidth <= 425) {
  if (mySkillsAndAddSkillButtons) {
    mySkillsAndAddSkillButtons.forEach(function (button) {
      // Make 'My Skills' and 'Add Skills' buttons smaller
      if (button.classList.contains("btn-lg")) {
        button.classList.remove("btn-lg");
      }
    });
  }
}

// Resizing page (425px breakpoint)

window.addEventListener("resize", function () {
  // If Window is resized to <= 425px
  if (window.innerWidth <= 425) {
    if (mySkillsAndAddSkillButtons) {
      mySkillsAndAddSkillButtons.forEach(function (button) {
        // Make the 'My Skills' and 'Add Skill' Buttons smaller
        if (button.classList.contains("btn-lg")) {
          button.classList.remove("btn-lg");
        }
      });
    }

    // If Window is resized to > 425px
  } else {
    if (mySkillsAndAddSkillButtons) {
      mySkillsAndAddSkillButtons.forEach(function (button) {
        // Make the 'My Skills' and 'Add Skill' Buttons larger
        if (!button.classList.contains("btn-lg")) {
          button.classList.add("btn-lg");
        }
      });
    }
  }
});

/*----- 320px -----*/

// If initial page loaded is <=320px
if (currentWindowWidth <= 320) {
  if (mySkillsAndAddSkillButtons) {
    mySkillsAndAddSkillButtons.forEach(function (button) {
      // make the buttons smaller to fit screen
      if (!button.classList.contains("btn-sm")) {
        button.classList.add("btn-sm");
      }
    });
  }
}

// Resizing page (320px breakpoint)
window.addEventListener("resize", function () {
  // If Window is resized to <= 320px
  if (window.innerWidth <= 320) {
    if (mySkillsAndAddSkillButtons) {
      mySkillsAndAddSkillButtons.forEach(function (button) {
        if (!button.classList.contains("btn-sm")) {
          // make the buttons bigger for easier tapping
          button.classList.add("btn-sm");
        }
      });
    }
    // If Window is resized to > 320px
  } else {
    if (mySkillsAndAddSkillButtons) {
      mySkillsAndAddSkillButtons.forEach(function (button) {
        if (button.classList.contains("btn-sm")) {
          // make the buttons smaller to make room for desktop button labels
          button.classList.remove("btn-sm");
        }
      });
    }
  }
});
