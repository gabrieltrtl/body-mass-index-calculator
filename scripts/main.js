const radioInputs = document.querySelectorAll('input[type=radio]');
const metricContainer = document.querySelector('.form__text-inputs.metric');
const imperialContainer = document.querySelector('.form__text-inputs.imperial');
const textInputs = document.querySelectorAll('input[type=text]');
const resultNumber = document.querySelector('.result__number');
const resultText = document.querySelector('.result__text');
let heightValueCm = null;
let weightValueKg = null;
let heightValueFt = null;
let heightValueIn = null;
let weightValueSt = null;
let weightValueLb = null;

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
        heightValueCm = value / 100;
      } else {
        heightValueCm = null;
      }   
    } else if (input.id === "weight-kg") {
        const value = parseFloat(input.value);
      if(validateInput(value, 10, 400)) {
          weightValueKg = value;
      } else {
          weightValueKg = null;
      }
    } else if (input.id === "height-ft") {
        const value = parseFloat(input.value);
        if(validateInput(value, 3, 10)) {
          heightValueFt = value;
        } else {
          heightValueFt = null;
        }
    } else if (input.id === "height-in") {
       const value = parseFloat(input.value)
       if(validateInput(value, 0, 11)) {
        heightValueIn = value;
      } else {
        heightValueIn = null;
      }
    } else if (input.id === "weight-st") {
       const value = parseFloat(input.value)
       if(validateInput(value, 1, 60)) {
        weightValueSt = value;
      } else {
        weightValueSt = null;
      }
    } else {
        const value = parseFloat(input.value)
        if(validateInput(value, 0, 14)) {
          weightValueLb = value;
        } else {
          weightValueLb = null;
        }
    }

    if (heightValueCm !== null && weightValueKg !== null) {
      const bmiResult = (weightValueKg / (heightValueCm * heightValueCm)).toFixed(2);
      const minWeight = (18.5 * (heightValueCm * heightValueCm)).toFixed(2);
      const maxWeight = (24.9 * (heightValueCm * heightValueCm)).toFixed(2);
    
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

    if ((heightValueFt !== null && heightValueIn !== null) && (weightValueSt !== null && weightValueLb !== null)) {
      const heightInMetric = ((heightValueFt * 0.3048) + (heightValueIn * 0.0254)).toFixed(2);
      const weightInMetric = ((weightValueSt * 6.35029) + (weightValueLb * 0.453592)).toFixed(2);
      const bmiResult = (weightInMetric / (heightInMetric * heightInMetric)).toFixed(2);

      //Min Weight
      const minWeightMetric = 18.5 * (heightInMetric * heightInMetric);
      const maxWeightMetric = 24.9 * (heightInMetric * heightInMetric);
      const minWeightSt = (minWeightMetric / 6.35029).toFixed(2);
      const minWeightWholeSt = Math.floor(minWeightSt);
      const remainingMinMetric = minWeightMetric - (minWeightWholeSt * 6.35029);
      const minWeightLb = (remainingMinMetric / 0.453592).toFixed(2);
    
        //Max Weight
      const maxWeightSt = (maxWeightMetric / 6.35029).toFixed(2);
      const maxWeightWholeSt = Math.floor(maxWeightSt);
      const remainingMaxMetric = maxWeightMetric - (maxWeightWholeSt * 6.35029);
      const maxWeightLb = (remainingMaxMetric / 0.453592).toFixed(2);

      //Result
      resultNumber.textContent = bmiResult;

      if(bmiResult < 18.5) {
        resultText.textContent = `Your BMI suggests you're underweight. Your ideal weight is between ${minWeightSt}st ${minWeightLb}lbs - ${maxWeightSt}st ${maxWeightLb}lbs`
      } else if (bmiResult >= 18.5 && bmiResult < 25) {
        resultText.textContent = `Your BMI suggests you're a healthy weight. Your ideal weight is between ${minWeightSt}st ${minWeightLb}lbs  - ${maxWeightSt}st ${maxWeightLb}lbs`
      } else if (bmiResult >= 25 && bmiResult < 30) {
        resultText.textContent = `Your BMI suggests you're a overweight. Your ideal weight is between ${minWeightSt}st ${minWeightLb}lbs - ${maxWeightSt}st ${maxWeightLb}lbs`
      } else {
        resultText.textContent = `Your BMI suggests you're obese. Your ideal weight is between ${minWeightSt}st ${minWeightLb}lbs - ${maxWeightSt}st ${maxWeightLb}lbs`
      }
    }
  })
})

