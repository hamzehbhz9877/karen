
const phoneRegex= /^09[0-9][0-9] ?[0-9]{3} ?[0-9]{4}/

function toCommas(value:number|undefined) {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isEmpty(obj:Object) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

const profitLooseHandler = (price:number) => {
    if (price > 0) return 'profit'
    else if (price < 0) return 'loose'
    else return 'neutral'
}

const profitLooseIconHandler=(price:number)=>{
    if (price > 0) return '▲'
    else if (price < 0) return '▼'
    else return ''
}

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;


export {phoneRegex,toCommas,isEmpty,profitLooseHandler,profitLooseIconHandler,randomRGB}