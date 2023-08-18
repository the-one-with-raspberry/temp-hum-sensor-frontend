function insertAfter(toInsert: Element | HTMLElement, insertAfter: Element | HTMLElement): void {
    document.insertBefore(toInsert, insertAfter.nextSibling)
}
function setAttributes(element: Element | HTMLElement, attributes: any): void {
    for (let i of Object.keys(attributes)) {
        element.setAttribute(i, attributes[i]);
    }
}
function quickCreateElement(className: string, insertAfterNode: Element | HTMLElement | null = null, attributes: {} | null = null): void | Element {
    let r = document.createElement(className);
    if (attributes) {
        setAttributes(r, attributes)
    }
    if (insertAfterNode) {
        insertAfter(r, insertAfterNode)
    } else {
        return r;
    }
}
function deleteFromArray(array: Array<any>, index: number) {
    return array.splice(index, 1)
}
function numberArr(addEvery: number, length: number) {
    return (()=>{let v: number[]=[];for(let i=0;i<=length;i=i+addEvery){v.push(i)}return v;})()
}
function setProps(input: any, props: any) {
    for (let i of Object.keys(props)) {
        eval(`${input}.${i} = ${props[i]}`)
    }
}
function $(selector: string) {
    return document.querySelector(selector);
}
export {insertAfter, setAttributes, quickCreateElement, deleteFromArray, numberArr, setProps}
export default $