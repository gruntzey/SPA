import { resetActiveElement } from "../script.js"
import { setAllSelectItemsCollection } from "../script.js"

const [main] = document.getElementsByTagName('main')
const [categories] = document.getElementsByClassName('categories')
let allSelectItems = setAllSelectItemsCollection(categories)

window.addEventListener('load', () => {
  main.addEventListener('click', (e) => {
    if (e.target.parentElement == categories) {
      resetActiveElement(allSelectItems)
      e.target.classList.add('active')
    }
  })
})