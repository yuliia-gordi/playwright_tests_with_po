export const dropdownOptions = {
    az: (item1, item2) => item1.name.localeCompare(item2.name),
    za: (item1, item2) => item2.name.localeCompare(item1.name),
    lohi: (item1, item2) => item1.price - item2.price ? item1.price - item2.price : item1.name.localeCompare(item2.name),
    hilo: (item1, item2) => item2.price - item1.price ? item2.price - item1.price : item1.name.localeCompare(item2.name)
}