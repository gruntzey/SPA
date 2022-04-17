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
          <img  src="${element.images[0]}" alt="картинка">
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

      //если 1 картинка, то удалить точки для текущего элемента
      if (numberOfDots == 1) {
        document.querySelectorAll('.dots')[grid.children.length - 1].classList.add('removed')
      }
    }
  }
}
function sortGridItems(elem) {
  const dataattr = CategoriesMatch[elem.textContent]
  sortedData =  data.items.sort((a, b)=> {
  const bValue = b.data[dataattr]
  const aValue = a.data[dataattr]
  return aValue - bValue
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

  console.log('num of buttons = '+ numOfButtons)
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
      
      
      console.log(gridRange)
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
})



// {/* <div class="grid-item">
//   <div class="image-container">
//     <img  src="./assets/images/saunaImages/image.png" alt="" srcset="">
//     <div class="dots">
//       <div class="dot dot-active"></div>
//       <div class="dot"></div>
//       <div class="dot"></div>
//     </div>
//     <div class="feedback">
//       <div class="icon-comment">1</div>
//       <div class="icon-heart">234</div>
//     </div>
//   </div>
//   <div class="description">
//     <div>Cауна‧такой-то‧размер</div>
//     <div>Адрес примерный</div>
//     <div>Тип сауны</div>
//   </div>
// </div> */}