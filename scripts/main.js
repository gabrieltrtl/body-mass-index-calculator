const radioInputs = document.querySelectorAll('input[type=radio]');
const metricContainer = document.querySelector('.form__text-inputs.metric');
const imperialContainer = document.querySelector('.form__text-inputs.imperial');
const textInputs = document.querySelectorAll('input[type=text]');
let heightValue = null;
let weightValue = null;




/* Iterates over radio type inputs, adds a change event listener and triggers the showOrHide function */
radioInputs.forEach(radio => {
  radio.addEventListener('change', showOrHide);
});

/* This function shows or hides metric or imperial type containers depending on the selected input radio.*/
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


textInputs.forEach(input => {
  input.addEventListener('input', function(){
    if(input.id === "height-cm") {
      heightValue = parseFloat(input.value) / 100;
    } else if (input.id === "weight-kg") {
      weightValue = parseFloat(input.value);
    }

    if (heightValue !== null && weightValue !== null) {
      const bmiResult = weightValue / (heightValue * heightValue);
    }
  })
})
