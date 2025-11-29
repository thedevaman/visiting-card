import { Download, Image } from "lucide-react"
import React, { useState } from "react"


const App = () =>{

  const [card,setCard] = useState({
    image:null,
    title:null,
    subtitle:null,
    small:null
  })

const addImage = (e) =>{
  const input = e.target
  const file = input.files[0]
  const url = URL.createObjectURL(file)
  setCard({
    image:url
  })

}
  return(
  <div className="bg-gray-200 h-screen flex items-center justify-center">
    <div className="bg-white rounded-xl p-4 grid grid-cols-4 gap-x-12 gap-y-6 shadow-lg">
     <button className="relative border border-blue-600 w-24 h-24 flex items-center justify-center border-2 rounded-lg hover:scale-120 duration-200">
      <Image className="w-8 h-8 text-blue-600  "/>
      <input type="file" accept="image/*" className="h-full w-full absolute top-0 left-0 opacity-0" onChange={addImage}/>
      </button>
       <button className="text-xl font-bold border text-rose-600 border-rose-600 w-24 h-24 flex items-center justify-center border-2 rounded-lg hover:scale-120 duration-200">
       Title
      </button>
       <button className="font-semibold border text-green-400 border-green-400 w-24 h-24 flex items-center justify-center border-2 rounded-lg hover:scale-120 duration-200">
    Subtitle
      </button>
       <button className="text-sm font-medium border text-amber-400 border-amber-400 w-24 h-24 flex items-center justify-center border-2 rounded-lg hover:scale-120 duration-200">
      Small
      </button>
      <div className="flex items-center justify-center p-8 border border-gray-400 border-2 border-dashed col-span-4 rounded-lg h-[250px]">
         <h1 className="text-lg text-gray-500 font-medium">Visiting Card</h1>
         <img src={card.image} className="w-full h-full absolute" />
      </div>
      <button className="bg-blue-600 p-3 flex items-center col-span-4 justify-center rounded font-meduim text-white">
        <Download/>
        Download
      </button>
    </div>
  </div>
  )

}

export default App