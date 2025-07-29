import React from 'react'
import { moves } from "../data.js"
import { useState } from 'react'



const Itms = () => {

  const [move, setmove] = useState(moves)
  console.log("move :", move)
  console.log("moves :", moves)

  const uniqueCategory = ["All", ...new Set(move.map(itms => itms.category))]
  var uniquecategory = uniqueCategory.filter(cat => cat !== undefined && cat !== null && cat !== "")

  const [uniqueCat, setuniqueCat] = useState(uniquecategory)



  const handleCateGory = (Category) => {
    console.log("category :category", Category)

    setmove(moves.filter(data => data.category === Category))
    if (Category === "All") {
      setmove(moves)
    }
  }


  return (<>
    {/* category logic start */}

    <ul className='flex flex-row gap-3 flex-wrap px-20 py-9' >

      {
        uniqueCat.map((categoryName, index) => (
          <li key={index}><button onClick={() => handleCateGory(categoryName)} className='font-thin bg-blue-600 py-3 px-5 text-white font-semibold rounded-sm cursor-pointer hover:bg-blue-700 hover:text-shadow-fuchsia-100 hover:font-semibold transition duration-1000 ease-in-out'> {categoryName}</button></li>
        ))
      }
    </ul>
    {/* category logic end */}
    <div className='p-14 grid grid-cols-12 gap-6'>
      {
        move.map((itms) => {

          return <div key={itms.id} className='col-span-12 mx-auto w-f md:col-span-4 my-10 lg:col-span-3 sm:col-span-6 items-center justify-center  items-start'>
            <img className=' items-center justify-center h-[330px] w-full items-start shadow-[10px_10px_10px_rgba(0,0,0,0.4)] rounded-t-md  hover:transform hover:scale-110 transition ease-in duration-250 cursor-pointer '
              src={itms?.poster}
              alt="image loading .."
              onError={() => {
                setmove((pre) =>
                  pre.map(m =>
                    m.id === itms.id ? { ...m, show: false }
                      : m
                  )
                )
              }}
            />
            <div className='flex flex-row justify-between py-4'>
              <h2 className='text-center text-2xl font-sans' >{itms.title.length > 10 ? itms.title.slice(0, 10) + ".." : itms.title}</h2>
              <h2 className='text-center text-2xl font-mono' >{itms.category}</h2>
            </div>
          </div>

        }

        )}
    </div>
  </>)
}

export default Itms
