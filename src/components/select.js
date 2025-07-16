lucide.createIcons()

let select = document.querySelector('.select'),
selectedValue = document.getElementById('selectedValue'),
optionsViewButton = document.getElementById('optionsViewButton'),
inputsOptions = document.querySelectorAll('.option input')

inputsOptions.forEach(input => {
    input.addEventListener('click', event => {
        selectedValue.textContent = input.dataset.label
        const isMouseOrTouch = 
        event.pointerType == "mouse" ||
        event.pointerType == "touch"
        isMouseOrTouch && optionsViewButton.click()
    })
})