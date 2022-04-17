import { resetActiveElement, setAllSelectItemsCollection, toggleScroll } from "../script.js"

function changeFilterStateContent(filter) {
  let filterContent = window.innerWidth > 860 ? ['Показать фильтр', 'Скрыть фильтр'] : ['Фильтр', 'Скрыть']
  return function() {
    filter.classList.toggle('active')
    filter.textContent = filterContent[Number(filterShowing)]
    filterShowing = !filterShowing
  }
}
function openFilterBox() {
  filterForm.classList.toggle('removed')
}
function setCategoriesFilterContent() {
  for (let i = 0; i < categories.children.length; i++) {
    const node = categories.children[i];
    if (node.classList.contains('active')) {
      categoriesFilter.textContent = node.textContent
    }
  }
}
function hideAllExcessFilters() {
  
  for (let i = 0; i < accordionsContent.length; i++) {
    const accordion = accordionsContent[i];
    toggleExcessInputs(accordion)
    hideAccrdions(accordion)
  }
  giveNamesAccordionsShowAllButtons()
  
}
function toggleExcessInputs(accordion) {
  let iter = 1
  let isExcess = false
  for (let i = 0; i < accordion.children.length; i++) {
    if (iter > inputAmountLimit) {
      if (!isExcess) isExcess = !isExcess
      const element = accordion.children[i];
      if (!element.classList.contains('filter-form-show-all')) {
        element.classList.toggle('removed')
      }
    }
    iter++
  }
  //adding buttons
  if (isExcess && !accordion.lastElementChild.classList.contains('filter-form-show-all')) {
    accordion.insertAdjacentHTML('beforeend', `<div class="filter-form-show-all"></div>`)
    accordionsShowAllButtons.push(accordion.lastElementChild)
  }
}
function giveNamesAccordionsShowAllButtons() {
  for (let i = 0; i < accordionsShowAllButtons.length; i++) {
    const button = accordionsShowAllButtons[i];
    button.textContent = accordionsShowAllButtonsTexts[0]
  }
}
function hideAccrdions(accordion) {
  if (!accordion.previousElementSibling.lastElementChild.classList.contains('accordion-arrow-rotated')) {
    accordion.classList.toggle('removed')
  }
}
function setSwitchersOn() {
  for (let i = 0; i < switchers.length; i++) {
    const switcher = switchers[i];
    if (switcher.previousElementSibling.checked) {
      switcher.classList.add('item-switcher-switched')
    }
  }
}
function toggleFilter() {
  changeFilterState()
  openFilterBox()
}
const [main] = document.getElementsByTagName('main')
const [screener] = document.getElementsByClassName('screener')
const [categories] = document.getElementsByClassName('categories')
const filter = document.getElementById('filter')
const filterForm = document.getElementById('filter-form')
const [closeFilterForm] = document.getElementsByClassName('filter-form-close')
const [categoriesFilter] = document.getElementsByClassName('categories-filter')
const [navigationButtons] = document.getElementsByClassName('navigation-buttons')
const accordionsContent = document.querySelectorAll(".filter-form-item-content")
const switchers = document.querySelectorAll('.filter-form-item-switcher')
const accordionsShowAllButtons = []
const accordionsShowAllButtonsTexts = ['Посмотреть все', 'Скрыть']

let filterShowing = true
let allCategoriesSelectItems = setAllSelectItemsCollection(categories)
const inputAmountLimit = 6

const changeFilterState = changeFilterStateContent(filter)
changeFilterState()

setCategoriesFilterContent()

hideAllExcessFilters()

setSwitchersOn()

if (window.innerWidth < 860) {
  filter.click()
  toggleFilter(main)
}

window.addEventListener('load', () => {
  document.addEventListener('click', (e) => {
    if (e.target.parentElement == categories) {
      resetActiveElement('active',allCategoriesSelectItems)
      e.target.classList.add('active')
      setCategoriesFilterContent()
    }

    if (e.target == filter) {
      toggleFilter()
      if (window.innerWidth < 860) toggleScroll(main)
    }

    if (e.target == categoriesFilter) {
      categories.classList.toggle('revealed')
      screener.classList.toggle('removed')
    }

    if (e.target == screener) {
      screener.classList.toggle('removed')
      categories.classList.toggle('revealed')
    }

    if (e.target.parentElement == navigationButtons) {
      resetActiveElement('active-navigation-button', navigationButtons.children)
      e.target.classList.add('active-navigation-button')
    }
    
  })

  filterForm.addEventListener('click', function accordionHandle(e) {
    if (e.target.closest('.form-switcher')) {
      const container = e.target.closest('.form-switcher').firstElementChild
      const switcher = container.lastElementChild
      const checkbox = switcher.previousElementSibling
      checkbox.checked = !checkbox.checked
      switcher.classList.toggle('item-switcher-switched')
      
    }

    if (e.target.closest('.accordion')) {
      const theHeader = e.target.closest('.filter-form-item-header')
      const arrow = theHeader.children[1]
      const contentBlock = theHeader.nextElementSibling

      arrow.classList.toggle('accordion-arrow-rotated')
      contentBlock.classList.toggle('removed')
    }

    if (e.target.classList.contains('filter-form-show-all')) {
      const accordion = e.target.closest('.filter-form-item-content')
      toggleExcessInputs(accordion)
      if (e.target.textContent == accordionsShowAllButtonsTexts[0]) {
        e.target.textContent = accordionsShowAllButtonsTexts[1]
      } else {
        e.target.textContent = accordionsShowAllButtonsTexts[0]
      }
    }

    if (e.target.closest('.filter-form-close')) {
      toggleFilter()
      if (window.innerWidth < 860) toggleScroll(main)
    }
  })
})