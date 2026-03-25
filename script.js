// *FUNCTION Getting Task From User*

function inputValue(event) {
  let inputElement = document.getElementById('todo-item')
  if (inputElement.value === '') {
    alert('Please Enter a Task To Proceed !!!')
    return
  }

  //   get value from input field
  let currentValue = inputElement.value

  //   get button name (remeber event.currentTarget takes value og button but event.target may takes img value inside its as clicked element rather than text)
  let currentButtonValue = event.currentTarget.textContent.trim().toLowerCase()

  //   reset the input
  inputElement.value = ''

  addData(currentValue, currentButtonValue)
}

// USING INPUT VALUE AND BUTTTON TEXT VALUE
function addData(currentValue, currentButtonValue) {
  /*
     FORMATT TO CREATE 
     <div class="completed item-box">
         <img src="./images/clock-rotate-left-solid.png" alt="" />
         <p> completed </p>
         <button>completed</button>
       </div> */

  //  FETCHING SECTION TO WHERE DISPLAY ITEMS IS ADDED
  let displaySection = document.getElementById('display-section')

  // CREATING ELEMENTS******
  let div = document.createElement('div')

  let p = document.createElement('p')
  p.textContent = currentValue

  let img = document.createElement('img')

  let btn = document.createElement('button')
  //   let delImag = document.createElement('button')

  let delImag = document.createElement('img')
  delImag.src = './images/circle-xmark-solid.png'

  //   function - CALL OF process button attributes
  buttonsAttrib(displaySection, currentButtonValue, div, btn, img, delImag)
  //   ADDING ELEMENTS TO DIV TAG
  div.append(img, p, btn, delImag)

  // FUNCTION CALLING WHICH HANDLES WHERE TO PLACE THE TASKS
  positionTasks(displaySection, currentButtonValue, div)
}

//THIS FUNCTION ADDS FUNCTIONALITY AND ATTRIBUTES ON DIV ITEMS

function buttonsAttrib(
  displaySection,
  currentButtonValue,
  div,
  btn,
  img,
  delImag,
) {
  currentButtonValue = currentButtonValue.toLowerCase()

  if (currentButtonValue === 'pending') {
    div.className = 'pending-box item-box'
    btn.textContent = 'Ongoing'
    btn.style.backgroundColor = 'var(--working)'

    img.src = './images/clock-rotate-left-solid.png'
    btn.onclick = () => {
      currentButtonValue = btn.textContent.toLowerCase()
      buttonsAttrib(displaySection, currentButtonValue, div, btn, img, delImag)

      positionTasks(displaySection, currentButtonValue, div)
    }
  } else if (currentButtonValue === 'ongoing') {
    div.className = 'working-box item-box'
    btn.textContent = 'Completed'
    btn.style.backgroundColor = ' var(--completed)'

    img.src = './images/pen-ruler-solid.png'
    btn.onclick = () => {
      currentButtonValue = btn.textContent.toLowerCase()
      buttonsAttrib(displaySection, currentButtonValue, div, btn, img, delImag)

      positionTasks(displaySection, currentButtonValue, div)
    }
  } else if (currentButtonValue === 'completed') {
    div.className = 'completed-box item-box'
    img.src = './images/calendar-check-regular.png'
    btn.textContent = ' 🎉SUCCESSFUL 🎉'
  }

  // creating a delete button action
  delImag.style.cursor = 'pointer'
  delImag.onclick = () => {
    div.remove()
  }
}

// THIS FUNCTION TAKES CARE OF PLACEMENT OF TASKS

function positionTasks(displaySection, currentButtonValue, div) {
  // FINALLY ADDING TOO THE DISPLAY

  // ADDING WORKING ITEM TO TOP
  if (currentButtonValue === 'ongoing') {
    displaySection.prepend(div)
  }

  // ADDING PENDING ITEM
  else if (currentButtonValue === 'pending') {
    // FETCHING FIRST COMPLETED BOX
    let completedItem = displaySection.querySelector('.completed-box')

    // ADDING PENDING in betweeen " completed " if present
    if (completedItem) {
      displaySection.insertBefore(div, completedItem)
    } else {
      displaySection.append(div)
    }
  }

  // ADD COMPLETED TO LAST ITEM
  else if (currentButtonValue === 'completed') {
    displaySection.append(div)
  }
}

// *********MODE CHANGING********

function darkMode() {
  document.body.classList.toggle('dark-mode')
  let getElement = document.getElementById('mode-button')

  let nowTextContent = document.body.classList.contains('dark-mode')
    ? 'LIGHT'
    : 'DARK'
  getElement.textContent = nowTextContent
}
