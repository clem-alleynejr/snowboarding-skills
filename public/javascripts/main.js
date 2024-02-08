  // Select all the toggle buttons and all sets of skill interaction buttons
  var toggleButtons = document.querySelectorAll(".toggle-btn");
  var skillInteractionDivs = document.querySelectorAll(".skill-interaction");

  // Initialize tracking for window size
  var currentWindowWidth = window.innerWidth;

  // add 'click' event listeners to each toggle button
  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Prevents Click event from propogating outside
      event.stopPropagation();

      // get the 'data-skill-id' attribute of the clicked toggle button
      var skillId = this.getAttribute("data-skill-id");

      // show the skillInteractionDiv for the toggle clicked
      skillInteractionDivs.forEach(function (div) {
        if (div.classList.contains("active")) {
          div.classList.remove("active");
        }
        // Note: in the left side of the condition statement below, to access the custom data attribute (data-*) of the div (data-skill-id) through the 'dataset' property, we need to remove the 'data-' and convert to camelCase:
        // 'data-skill-id' ==> 'skillId'
        // The right side of the condition statement is the specific skillId of the clicked toggle
        if (div.dataset.skillId === skillId) {
          div.classList.add("active");
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
