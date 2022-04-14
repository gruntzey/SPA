export function resetActiveElement(...collectionOfElements) {
  for (let i = 0; i < [...collectionOfElements][0].length; i++) {
    const item = [...collectionOfElements][0][i];
    if (item.classList.contains('active')) {
      item.classList.remove('active')
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