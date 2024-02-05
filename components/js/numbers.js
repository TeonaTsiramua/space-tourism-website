const numberList = document.querySelector('[role="numberlist"]');
const numbers = numberList.querySelectorAll('[role="number"]');

numberList.addEventListener("keydown", changeNumberFocus);

numbers.forEach((number) =>
  number.addEventListener("click", changeNumberPanel)
);

let numberFocus = 0;
function changeNumberFocus(e) {
  const keydownUp = 40;
  const keydownDown = 38;

  if (e.keyCode === keydownDown || e.keyCode === keydownUp) {
    numbers[numberFocus].setAttribute("numberindex", -1);
    if (e.keyCode === keydownUp) {
      numberFocus++;
      if (numberFocus >= numbers.length) {
        numberFocus = 0;
      }
    } else if (e.keyCode === keydownDown) {
      numberFocus--;
      if (numberFocus < 0) {
        numberFocus = numbers.length - 1;
      }
    }
  }

  numbers[numberFocus].setAttribute("numberindex", 0);
  numbers[numberFocus].focus();
}

function changeNumberPanel(e) {
  const targetNumber = e.target;
  const targetPanel = targetNumber.getAttribute("aria-controls");
  const targetImage = targetNumber.getAttribute("data-image");

  const numberContainer = targetNumber.parentNode;
  const mainContainer = numberContainer.parentNode;

  console.log("Target number:", targetNumber);
  console.log("Target Panel:", targetPanel);
  console.log("Target Image:", targetImage);

  numberContainer
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);

  targetNumber.setAttribute("aria-selected", true);

  hideContent(mainContainer, '[role="numberpanel"]');
  showContent(mainContainer, `#${targetPanel}`);

  hideContent(mainContainer, "img");
  showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
