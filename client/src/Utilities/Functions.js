export function GetItemsByType(items, itemtype) {
  return items.filter((value, i) => {
    return value.type === itemtype;
  });
}
