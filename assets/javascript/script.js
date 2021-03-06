export function resetActiveElement(classToRemove, ...collectionOfElements) {
  for (let i = 0; i < [...collectionOfElements][0].length; i++) {
    const item = [...collectionOfElements][0][i];
    if (item.classList.contains(classToRemove)) {
      item.classList.remove(classToRemove)
      return
    }
  }
}

export function setAllSelectItemsCollection(...allParentElementsContainingsNodes) {
  let allSelectItems = []
  for (let i = 0; i < allParentElementsContainingsNodes.length; i++) {
    const parent = allParentElementsContainingsNodes[i];
    for (let i = 0; i < parent.children.length; i++) {
      const node = parent.children[i];
      allSelectItems.push(node)
    }
  }
  return allSelectItems
}
export function toggleScroll(elem) {
  elem.classList.toggle("stop-scrolling");
}