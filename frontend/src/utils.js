export function setSelectedToFalse (arr) {
  return arr.map(item => {
    item.isSelected = false
    return item
  })
}
