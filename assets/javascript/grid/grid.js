import { resetActiveElement, setAllSelectItemsCollection, toggleScroll } from "../script.js"
import { filter, toggleFilter } from "../filter/filter.js";
import {listOfItems as data} from "../api.js"


function setCategoriesFilterContent() {
  for (let i = 0; i < categories.children.length; i++) {
    const node = categories.children[i];
    if (node.classList.contains('active')) {
      categoriesFilter.textContent = node.textContent
    }
  }
}
function reCreatingGrid() {
  gridRange.min = 1 + curMaxGridElementsOnePage*(curPage - 1)
  gridRange.max = curMaxGridElementsOnePage + curMaxGridElementsOnePage*(curPage - 1)

  grid.innerHTML = ''
  for (let i = gridRange.min - 1; i < gridRange.max; i++) {
    const element = sortedData[i];
    if (element) {
      const numberOfDots = element.images.length
      let dotsDivs = ''
      if (numberOfDots > 1) {
        dotsDivs = ''
        for (let j = 0; j < numberOfDots; j++) {
          
          if (!(j == 0)) {
            dotsDivs = dotsDivs + '<div class="dot"></div>\n'
          } else {
            dotsDivs = dotsDivs + '<div class="dot dot-active"></div>\n'
          }
        }
      }
      

      grid.insertAdjacentHTML('beforeend', `
      <div class="grid-item" data-price="${element.data.price}" data-popularity="${element.data.pupularity}" data-time="${element.data.time}" data-id="${element.id}">
        <div class="image-container">
          <img  src="${element.images[0]}" alt="картинка" draggable="false">
          <div class="dots">
            ${dotsDivs}
          </div>
          <div class="feedback">
            <div class="icon-comment">${element.feedback.comments}</div>
            <div class="icon-heart">${element.feedback.likes}</div>
          </div>
          <div class="new-image">New</div>
        </div>
        <div class="description">
          <div>${element.description.label}</div>
          <div>${element.description.adress}</div>
          <div>${element.description.company}</div>
        </div>
      </div>
      `)

      //можно было не удалять элементы после их создания... можно было
      //просто создавать, но если бы я создавал элементы вместо
      //создания HTML выше, то вышло бы слишком много строк кода
      //я понимаю что это не оптимальное решение
      if (numberOfDots == 1) {
        document.querySelectorAll('.dots')[grid.children.length - 1].classList.add('removed')
      }

      const elemDate = new Date(element.data.time).getTime()
      const curDate = new Date().getTime()
      const TimeDifference = (curDate - elemDate)
      if (TimeDifference > 37558242981) {
        document.querySelectorAll('.new-image')[grid.children.length - 1].classList.add('removed')
      }
    }
  }
}
function sortGridItems(elem) {
  const dataattr = CategoriesMatch[elem.textContent]
  sortedData =  data.items.sort((a, b)=> {
  const bValue = b.data[dataattr]
  const aValue = a.data[dataattr]
  if (!dataattr == 'time') {
    return aValue - bValue
  } else {
    return bValue - aValue
  }
  
  })
  reCreatingGrid()
}
function createCategories() {
  for (let i = 0; i < Object.keys(CategoriesMatch).length; i++) {
    const key = Object.keys(CategoriesMatch)[i];
    const elem = document.createElement('span')
    // if (i==0) {
    //   elem.classList.add('active')
    // }
    elem.textContent = key
    categories.insertAdjacentElement('beforeend', elem)
  }
}
function reCreateNavigationButtons() {
  navigationButtons.innerHTML = ''
  const numOfGridElems = data.items.length
  const numOfButtons = Math.ceil(numOfGridElems/curMaxGridElementsOnePage)
  if (numOfButtons == 1) {
    document.querySelector('.show-more').classList.add('removed')
  }

  let setOne = curPage > numOfButtons ? true : false

  let temp = 1
  for (let i = 0; i < numOfButtons; i++) {
    const button = document.createElement('div')
    button.classList.add('navigation-button')
    button.textContent = temp
    temp++
    navigationButtons.insertAdjacentElement('beforeend', button)
  }
  if (setOne) {
    navigationButtons.firstElementChild.classList.add('active-navigation-button')
    curPage = 1
  } else {
    const button = document.querySelectorAll('.navigation-button')[curPage-1]
    button.classList.add('active-navigation-button')
  }
  reCreatingGrid()
}

const CategoriesMatch = {
  'Сначала популярные': 'pupularity',
  'Новизна': 'time',
  'Цена': 'price',
}
const startMaxGridElementsOnePage = 5
let curMaxGridElementsOnePage = startMaxGridElementsOnePage
const gridRange = {
  min: 1,
  max: curMaxGridElementsOnePage,
}

const [main] = document.getElementsByTagName('main')
const [screener] = document.getElementsByClassName('screener')
const [categories] = document.getElementsByClassName('categories')
const [categoriesFilter] = document.getElementsByClassName('categories-filter')
const [navigationButtons] = document.getElementsByClassName('navigation-buttons')

let sortedData = data.items
let curPage = 1
let imageLeftEdge,imageRightEdge

const grid = document.getElementById('grid')
const likeButtons = document.querySelectorAll('.icon-heart')


reCreatingGrid()


createCategories()

let selectableCategories = setAllSelectItemsCollection(categories)
setCategoriesFilterContent();

reCreateNavigationButtons()



window.addEventListener('load', () => {
  document.addEventListener('click', function mainContentHandle(e) {
    if (e.target.parentElement == categories) {
      resetActiveElement('active',selectableCategories)
      e.target.classList.add('active')
      setCategoriesFilterContent()

      sortGridItems(e.target)
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
      curPage = e.target.textContent
      
      reCreatingGrid()
    }

    if (e.target.classList.contains('show-more')) {
      curMaxGridElementsOnePage += startMaxGridElementsOnePage
      reCreatingGrid()
      reCreateNavigationButtons()
    }
    
  })


  grid.addEventListener('click', function clickGrid(e) {
    if (e.target.classList.contains('icon-heart')) {
      if (!e.target.classList.contains('liked-item')) {
        e.target.textContent++
      } else {
        e.target.textContent--
      }
      e.target.classList.toggle('liked-item')
    }
  })

  grid.addEventListener('mousemove', function hoverGrid(e) {
    if (e.target.tagName == 'IMG') {
      const elementId = e.target.closest('.grid-item').dataset.id
      const metaElement = data.items.find((el, i) => {
        return el.id == elementId
      })
      const numOfImages = metaElement.images.length
      
      if (numOfImages > 1) {
        imageLeftEdge = e.target.getBoundingClientRect().left
        imageRightEdge = e.target.getBoundingClientRect().right
        const mouseX = e.clientX
        
        const delimiter = 1/numOfImages
        // проценты от левой стороны
        const percentLeftOffset = (mouseX - imageLeftEdge)/(imageRightEdge - imageLeftEdge)
        const imageNum = Math.floor(percentLeftOffset * numOfImages)

        e.target.setAttribute("src", `${metaElement.images[imageNum]}`);
        const dots = e.target.closest('.grid-item').querySelectorAll('.dot')

        //можно оптимизировать, создав массив предыдущих imageNum'ов. Если 
        //значение предыдущего отличается от настоящего, тогда меняем dot-active
        //и меняем значение предыдущего на настоящий. Если значения не отличаютс, 
        //ничего не делать
        resetActiveElement('dot-active', dots)
        dots[imageNum].classList.add('dot-active')
      }
    }
  })

  if (window.innerWidth < 860) {
    let startX,
    strartY,
    curY,
    dist = 0,
    threshold = 50,
    allowedTime = 500,
    elapsedTime,
    startTime

    grid.addEventListener('touchstart', function(e){
      if (e.target.tagName == 'IMG') {
        const touchobj = e.changedTouches[0]
        startX = touchobj.pageX
        startTime = e.timeStamp
      }
    })
  
    grid.addEventListener('touchmove', function(e){
      if (e.target.tagName == 'IMG') {}
        console.log(e.changedTouches[0])
    })
  
    grid.addEventListener('touchend', function(e){
      if (e.target.tagName == 'IMG') {
        const touchobj = e.changedTouches[0]
        let swipeDirection

        dist = touchobj.pageX - startX
        elapsedTime = e.timeStamp - startTime
        if ((elapsedTime <= allowedTime && dist >= threshold)) {
          swipeDirection = 'right'
          handleImageSwipe(swipeDirection, e.target)
        } else if ((elapsedTime <= allowedTime && -dist >= threshold)) {
          swipeDirection = 'left'
          handleImageSwipe(swipeDirection, e.target)
        }
      }
    })
    function handleImageSwipe(swipeDirection, img) {
      const elemId = img.closest('[data-id]').dataset.id
      const metaElement = data.items.find((el, i) => {
        return el.id == elemId
      })
      let src = img.getAttribute('src')
      let idx = metaElement.images.findIndex(el => {
        return el == src
      })
      const nextImg = metaElement.images[idx + 1]
      const prevImg = metaElement.images[idx - 1]

      const dots = img.closest('.grid-item').querySelectorAll('.dot')
      resetActiveElement('dot-active', dots)
      

      if (swipeDirection == 'left') {
        if (nextImg) {
          img.setAttribute('src', nextImg)
          dots[idx + 1].classList.add('dot-active')
        } else {
          img.setAttribute('src', metaElement.images[0])
          dots[0].classList.add('dot-active')
        }
      } else if (swipeDirection == 'right') {
        if (prevImg) {
          img.setAttribute('src', prevImg)
          dots[idx - 1].classList.add('dot-active')
        } else {
          img.setAttribute('src', metaElement.images[metaElement.images.length - 1])
          dots[metaElement.images.length - 1].classList.add('dot-active')
        }
      }
    }
  }
})