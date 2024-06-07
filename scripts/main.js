const radioInputs = document.querySelectorAll('input[type=radio]');
console.log(radioInputs);
const metricContainer = document.querySelector('.form__text-inputs.metric');
console.log(metricContainer);
const imperialContainer = document.querySelector('.form__text-inputs.imperial');
console.log(imperialContainer);

radioInputs.forEach(radio => {
  radio.addEventListener('change', function() {
    if (this.id === "metric" && this.checked) {
      metricContainer.style.display = "flex";
      imperialContainer.style.display = "none";
    } else if (this.id === "imperial" && this.checked) {
      imperialContainer.style.display = "block";
      metricContainer.style.display = "none";
    }
  })
})
