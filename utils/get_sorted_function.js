export function getSortFunction (value) {
    switch(value) {
        case 'az':
            return (item1, item2) => item1.name.localeCompare(item2.name);
        case 'za':
            return (item1, item2) => item2.name.localeCompare(item1.name);
        case 'lohi':
            return (item1, item2) => item1.price - item2.price;
        case 'hilo':
            return (item1, item2) => item2.price - item1.price;
        default:
            throw new Error(`Unknown sort value: ${value}`);
    }
}