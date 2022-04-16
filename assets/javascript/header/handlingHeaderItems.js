import { resetActiveElement, setAllSelectItemsCollection, toggleScroll } from "../script.js"

function initHeadHandle() {
  // function zone
  function deleteItems() {
    const range = getRangeBetweenArrowAndBell()
    if (range < 10 && numOfRemainingElements) {
      const itemToRemove = document.getElementsByClassName("header__menu-item")[lastItemToHideIndex]
      const clonedElement = itemToRemove.cloneNode(true)
      moveItemToSubMenu(true, clonedElement)
      itemToRemove.remove()
      allSelectItems = setAllSelectItemsCollection(menu, subMenu) 

      lastItemToHideIndex--
      numOfRemainingElements--
      numOfHiddenElements++
      deleteItems()
    }
    if (range >= 200 && numOfHiddenElements !== 0) {
      moveItemToSubMenu(false)
      allSelectItems = setAllSelectItemsCollection(menu, subMenu) 

      lastItemToHideIndex++
      numOfRemainingElements++
      numOfHiddenElements--
      deleteItems()
    }
    if (window.innerWidth < 860) {
      deleteHoverEffectOnSubListButton()
    }
    function deleteHoverEffectOnSubListButton() {
      arrow.parentElement.classList.remove('hover')
    }
  }
  function getRangeBetweenArrowAndBell() {
    if (window.innerWidth > 860) {
      const bellXOffset = bell.getBoundingClientRect().left
      const arrowXOffset = arrow.getBoundingClientRect().left + arrow.getBoundingClientRect().width
      return bellXOffset - arrowXOffset
    }
    return 1000
  }
  function moveItemToSubMenu(add, node) {
    if (add) {
      node.classList.remove("header__menu-item")
      node.classList.add("header__submenu-item")
      subMenu.insertAdjacentElement('afterbegin', node)
    } else if (!add) {
      const clone = subMenu.firstElementChild.cloneNode(true)
      clone.classList.add("header__menu-item")
      clone.classList.remove("header__submenu-item")
      menu.lastElementChild.insertAdjacentElement('beforebegin', clone)
      subMenu.firstElementChild.remove()
    }
  }
  //
  // function zone
  const [main] = document.getElementsByTagName('main')
  const [favourite] = document.getElementsByClassName("header__favourite")
  const [bell] = document.getElementsByClassName("header__bell")
  const arrow = document.getElementById("header__drop-arrow")
  const [subMenu] = document.getElementsByClassName("header__submenu-items")
  const [menu] = document.getElementsByClassName("header__menu-items")
  const [burger] = document.getElementsByClassName("header__menu-burger")
  let allSelectItems = []
  let numOfHiddenElements = 0
  let numOfRemainingElements = document.getElementsByClassName("header__menu-item").length - 1
  let lastItemToHideIndex = numOfRemainingElements - 1

  deleteItems()
  allSelectItems = setAllSelectItemsCollection(menu, subMenu) 
  window.addEventListener('resize', deleteItems)
  header.addEventListener('click', function headerClick(e) {
    //handle bell and favurite
    if (e.target == favourite || e.target == bell) {
      e.target.classList.toggle('active')
    }

    //handle active menu item
    if ((e.target.parentElement == menu && !e.target.classList.contains('header__more-button')) ||
    e.target.parentElement == subMenu) {
      
      resetActiveElement('active',allSelectItems)
      e.target.classList.add('active')

      burger.classList.toggle('opened-burger')
      menu.classList.toggle('opened-menu')
    }

    //handle burger
    if (e.target == burger) {
      burger.classList.toggle('opened-burger')
      menu.classList.toggle('opened-menu')
      if (window.innerWidth < 860) toggleScroll(main)
    }

    if (e.target == arrow.parentElement) {
      arrow.parentElement.classList.toggle('opened-sub-list')
    }
  })
}

const [header] = document.getElementsByTagName("header")
header.classList.add('cloaked')

window.addEventListener('load', () => {
  initHeadHandle()
  header.classList.remove('cloaked')
})