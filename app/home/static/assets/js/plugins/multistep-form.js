//DOM elements
var DOMstrings = {
    stepsBtnClass: 'multisteps-form__progress-btn',
    stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
    stepsBar: document.querySelector('.multisteps-form__progress'),
    stepsForm: document.querySelector('.multisteps-form__form'),
    stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
    stepFormPanelClass: 'multisteps-form__panel',
    stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
    stepPrevBtnClass: 'js-btn-prev',
    stepNextBtnClass: 'js-btn-next',
};

function setVariables() {
    /*DOMstrings = {
    stepsBtnClass: 'multisteps-form__progress-btn',
    stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
    stepsBar: document.querySelector('.multisteps-form__progress'),
    stepsForm: document.querySelector('.multisteps-form__form'),
    stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
    stepFormPanelClass: 'multisteps-form__panel',
    stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
    stepPrevBtnClass: 'js-btn-prev',
    stepNextBtnClass: 'js-btn-next'
  };*/
    DOMstrings.stepsBtns = document.querySelectorAll(
        `.multisteps-form__progress-btn`
    );
    DOMstrings.stepsBar = document.querySelector('.multisteps-form__progress');
    DOMstrings.stepsForm = document.querySelector('.multisteps-form__form');
    DOMstrings.stepsFormTextareas = document.querySelectorAll(
        '.multisteps-form__textarea'
    );
    DOMstrings.stepFormPanels = document.querySelectorAll(
        '.multisteps-form__panel'
    );
}

//remove class from a set of items
const removeClasses = (elemSet, className) => {
    elemSet.forEach((elem) => {
        elem.classList.remove(className);
    });
};

//return exect parent node of the element
const findParent = (elem, parentClass) => {
    let currentNode = elem;

    while (!currentNode.classList.contains(parentClass)) {
        currentNode = currentNode.parentNode;
    }

    return currentNode;
};

//get active button step number
const getActiveStep = (elem) => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = (activeStepNum) => {
    //remove active state from all the state
    removeClasses(DOMstrings.stepsBtns, 'js-active');

    //set picked items to active
    DOMstrings.stepsBtns.forEach((elem, index) => {
        if (index <= activeStepNum) {
            elem.classList.add('js-active');
        }
    });
};

//get active panel
const getActivePanel = () => {
    let activePanel;

    DOMstrings.stepFormPanels.forEach((elem) => {
        if (elem.classList.contains('js-active')) {
            activePanel = elem;
        }
    });

    return activePanel;
};

//open active panel (and close unactive panels)
const setActivePanel = (activePanelNum) => {
    //remove active class from all the panels
    removeClasses(DOMstrings.stepFormPanels, 'js-active');

    //show active panel
    DOMstrings.stepFormPanels.forEach((elem, index) => {
        if (index === activePanelNum) {
            elem.classList.add('js-active');

            setFormHeight(elem);
        }
    });
};

//set form height equal to current panel height
const formHeight = (activePanel) => {
    const activePanelHeight = activePanel.offsetHeight;

    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
};

const setFormHeight = () => {
    const activePanel = getActivePanel();

    formHeight(activePanel);
};

let currentActiveStep = 0;

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', (e) => {
    //check if click target is a step button
    const eventTarget = e.target;

    if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
        return;
    }

    //get active button step number
    const activeStep = getActiveStep(eventTarget);
    if (activeStep > currentActiveStep) {
        try{
            var formPanel = DOMstrings.stepFormPanels[currentActiveStep];
            checkValidate(formPanel);
            setActiveStep(activeStep);
            setActivePanel(activeStep);
            currentActiveStep = activeStep;
        }catch(e){
            formPanel.classList.add('was-validated');
        }
    }else{
        currentActiveStep = activeStep;
        setActiveStep(activeStep);
        setActivePanel(activeStep);
    }
});

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', (e) => {
    const eventTarget = e.target;

    //check if we clicked on `PREV` or NEXT` buttons
    if (
        !(
            eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) ||
            eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)
        )
    ) {
        return;
    }

    //find active panel
    const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

    //set active step and active panel onclick
    if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
        activePanelNum--;
    } else {
        try{
            var formPanel = DOMstrings.stepFormPanels[currentActiveStep];
            checkValidate(formPanel);
            activePanelNum++;
            
        }catch(e){
            formPanel.classList.add('was-validated');
        }
    }
    setActiveStep(activePanelNum);
    setActivePanel(activePanelNum);
    currentActiveStep = activePanelNum;
});

function checkValidate(form){
    var inputs = Array.from(form.getElementsByTagName('input'));
    var isValid = true;
    inputs.forEach((elem) => {
        if(elem.type === 'text'){
            isValid = validateTextInput(elem);
        }
        if (elem.type === 'number'){
            isValid = validateNumberInput(elem);
        }

        if(!isValid){
            throw new Error('Invalid validation');
            
        }
    })

    return isValid;
}

function validateTextInput(input){
    return isNotEmpty(input);
}

function validateNumberInput(input){
    var value = parseInt(input.value)
    if(isNotEmpty(input)){
        return value >= parseInt(input.min)  && value <= parseInt(input.max);
    }
    return false; 
}

function isNotEmpty(input){
    if(input.value == ""){
        return false;
    }
    return true;
}

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener('load', setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener('resize', setFormHeight, false);
