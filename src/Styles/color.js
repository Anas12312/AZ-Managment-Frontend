const color = {
    text : (c)=>{
        return textMap.get(c)
    },
    bg : (c)=>{
        return bgMap.get(c)
    }
}
const textMap = new Map()
textMap.set("red-50", `text-red-50`)
textMap.set("red-100",`text-red-100`)
textMap.set("red-200",`text-red-200`)
textMap.set("red-300",`text-red-300`)
textMap.set("red-400",`text-red-400`)
textMap.set("red-500",`text-red-500`)
textMap.set("red-600",`text-red-600`)
textMap.set("red-700",`text-red-700`)

const bgMap = new Map()
bgMap.set("red-50", `bg-red-50`)
bgMap.set("red-100",`bg-red-100`)
bgMap.set("red-200",`bg-red-200`)
bgMap.set("red-300",`bg-red-300`)
bgMap.set("red-400",`bg-red-400`)
bgMap.set("red-500",`bg-red-500`)
bgMap.set("red-600",`bg-red-600`)
bgMap.set("red-700",`bg-red-700`)
export default color;