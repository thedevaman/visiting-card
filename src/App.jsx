import { Download, Image } from "lucide-react"
import React, { useRef, useState } from "react"
import html2canvas from "html2canvas"


const App = () =>{
  const [inputType,setInputType] = useState(null)
  const divRef = useRef()

  const [value,setValue] = useState('')

  const [card,setCard] = useState({
    image:null,
    title:{label:null, left:20, top:30},
    subtitle:{label:null, left:20, top:50},
    small:{label:null, left:20, top:70}
  })

const addImage = (e) =>{
  const input = e.target
  const file = input.files[0]
  const url = URL.createObjectURL(file)
  setCard({
    ...card,
    image:url
  })
}

const addText = (type) =>{

  setInputType(inputType === type ? null : type)
  setValue('')
}

 const onSubmit = (e)=>{
    e.preventDefault()
    setCard({
      ...card,
      [inputType]:{
        ...card[inputType],
        label:value

      }
    })
  }

  const download = async() => {

    const div = divRef.current
    const canvas = await html2canvas(div,3)
    const url = (canvas.toDataURL("image/png"))
    const a = document.createElement("a")
    a.href = url
    a.target = "_blank"
    a.download = "card.png"
    a.click()
  }

  const onDragEnd = (e,inputType) =>{
    
    const dragX = e.clientX
    const dragY = e.clientY
    const div = divRef.current
    const rec = div.getBoundingClientRect()
    const leftPosition = Math.max(0,Math.round(dragX - rec.left))
    const topPosition = Math.max(0,Math.round(dragY - rec.top))
   setCard({
     ...card,
     [inputType]:{
      ...card[inputType],
      left:leftPosition,
      top:topPosition
     }
   })


  }

  return(
  <div className="bg-gray-200 h-screen flex items-center justify-center">
    <div className="bg-white rounded-xl p-4 grid grid-cols-4 gap-x-12 gap-y-6 shadow-lg">
      {
        inputType &&
        <form className="col-span-4 flex gap-3" onSubmit={onSubmit}>
        <input className="border border-gray-300 rounded py-2 px-3 flex-1"
        placeholder={`Enter ${inputType === ''? 'Content':inputType} here`}
        required
        onChange={(e)=>setValue(e.target.value.trim())}
        value={value}
        />
        <button className="px-6 py-2 rounded text-white bg-violet-600">Add</button>
      </form>
      }
      
     <button className="relative border border-blue-600 w-24 h-24 flex items-center justify-center border-2 rounded-lg hover:scale-120 duration-200">
      <Image className="w-8 h-8 text-blue-600 "/>
      <input type="file" accept="image/*" className="h-full w-full absolute top-0 left-0 opacity-0" onChange={addImage}/>
      </button>
       <button onClick={()=>addText("title")} className="text-xl font-bold border text-rose-600 border-rose-600 w-24 h-24 flex items-center justify-center border-2 rounded-lg hover:scale-120 duration-200">
       Title
      </button>
       <button onClick={()=>addText("subtitle")} className="font-semibold border text-green-400 border-green-400 w-24 h-24 flex items-center justify-center border-2 rounded-lg hover:scale-120 duration-200">
    Subtitle
      </button>
       <button onClick={()=>addText("small")} className="text-sm font-medium border text-amber-400 border-amber-400 w-24 h-24 flex items-center justify-center border-2 rounded-lg hover:scale-120 duration-200">
      Small
      </button>
      <div 
      ref={divRef}
      style = {{ border:(card.image || card.title.label || card.subtitle.label || card.small.label) ? undefined:'1px solid #ccc'}}  className="overflow-hidden relative flex items-center justify-center p-8  col-span-4 rounded-lg h-[250px]">
        {
        (card.image || card.title.label || card.subtitle.label || card.small.lable) ?
        <>
        <img src={card.image} className="w-full h-full absolute top-0 left-0 object-cover rounded-lg" />
        <h1 onDragEnd={(e)=>onDragEnd(e,'title')} draggable className="cursor-move absolute  text-white font-semibold text-3xl" style={{top:card.title.top,left:card.title.left}}>{card.title.label}</h1>
        <h1 onDragEnd={(e)=>onDragEnd(e,'subtitle')} draggable className="cursor-move absolute text-white font-semibold text-xl" style={{top:card.subtitle.top,left:card.subtitle.left}}>{card.subtitle.label}</h1>
        <h1 onDragEnd={(e)=>onDragEnd(e,'small')} draggable className="cursor-move absolute  text-white font-semibold text-base" style={{top:card.small.top,left:card.small.left}}>{card.small.label}</h1>
        </>
        :
        <h1 className="text-lg text-gray-500 font-medium">Visiting Card</h1>
        }
         
         
      </div>
      <button onClick={download} className="bg-blue-600 p-3 flex items-center col-span-4 justify-center rounded font-meduim text-white">
        <Download/>
        Download
      </button>
    </div>
  </div>
  )

}

export default App