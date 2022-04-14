import { resetActiveElement } from "../script.js"
import { setAllSelectItemsCollection } from "../script.js"

function changeFilterStateContent(filter) {
  let filterContent = ['Показать фильтр', 'Скрыть фильтр']
  return function() {
    filter.classList.toggle('active')
    filter.textContent = filterContent[Number(filterShowing)]
    filterShowing = !filterShowing
  }
}
function openFilterBox() {
  gridContainer.classList.toggle('grid-container-closed')
}
const [main] = document.getElementsByTagName('main')
const [categories] = document.getElementsByClassName('categories')
const filter = document.getElementById('filter')
const [gridContainer] = document.getElementsByClassName('grid-container')
let filterShowing = true
let allSelectItems = setAllSelectItemsCollection(categories)

const changeFilterState = changeFilterStateContent(filter)

changeFilterState()

window.addEventListener('load', () => {
  main.addEventListener('click', (e) => {
    if (e.target.parentElement == categories) {
      resetActiveElement('active',allSelectItems)
      e.target.classList.add('active')
    }

    if (e.target == filter) {
      changeFilterState()
      openFilterBox()
    }
  })
})