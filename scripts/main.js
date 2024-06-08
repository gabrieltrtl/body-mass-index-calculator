const radioInputs = document.querySelectorAll('input[type=radio]');
const metricContainer = document.querySelector('.form__text-inputs.metric');
const imperialContainer = document.querySelector('.form__text-inputs.imperial');
const textInputs = document.querySelectorAll('input[type=text]');
const resultNumber = document.querySelector('.result__number');
const resultText = document.querySelector('.result__text');
let heightValue = null;
let weightValue = null;

/* Iterates over radio type inputs, adds a change event listener and triggers the showOrHide function */
radioInputs.forEach(radio => {
  radio.addEventListener('change', showOrHide);
});

/* This function shows or hides metric or imperial type containers depending on the selected input radio. */
function showOrHide() {
  if (this.id === "metric" && this.checked) {
    metricContainer.style.display = "flex";
    metricContainer.style.flexWrap = "wrap";
    imperialContainer.style.display = "none";
  } else if (this.id === "imperial" && this.checked) {
    imperialContainer.style.display = "block";
    metricContainer.style.display = "none";
  }
}

// This function validates the inputs
function validateInput(value, min, max) {
  return !isNaN(value) && value >= min && value <= max;
}

textInputs.forEach(input => {
  input.addEventListener('input', function(){
    if(input.id === "height-cm") {
      const value = parseFloat(input.value);
      if(validateInput(value, 100, 300)) {
        heightValue = value / 100;
      } else {
        heightValue = null;
      }   
    } else if (input.id === "weight-kg") {
      const value = parseFloat(input.value);
      if(validateInput(value, 10, 400)) {
        weightValue = value;
      } else {
        weightValue = null;
      }
    }

    if (heightValue !== null && weightValue !== null) {
      const bmiResult = (weightValue / (heightValue * heightValue)).toFixed(2);
      const minWeight = (18.5 * (heightValue * heightValue)).toFixed(2);
      const maxWeight = (24.9 * (heightValue * heightValue)).toFixed(2);
      console.log(bmiResult);
      resultNumber.textContent = bmiResult;
      
      if(bmiResult < 18.5) {
        resultText.textContent = `Your BMI suggests you're underweight. Your ideal weight is between ${minWeight}kgs - ${maxWeight}kgs`
      } else if (bmiResult >= 18.5 && bmiResult < 25) {
        resultText.textContent = `Your BMI suggests you're a healthy weight. Your ideal weight is between ${minWeight}kgs - ${maxWeight}kgs`
      } else if (bmiResult >= 25 && bmiResult < 30) {
        resultText.textContent = `Your BMI suggests you're a overweight. Your ideal weight is between ${minWeight}kgs - ${maxWeight}kgs`
      } else {
        resultText.textContent = `Your BMI suggests you're obese. Your ideal weight is between ${minWeight}kgs - ${maxWeight}kgs`
      }
    }
  })
})

