import React, { useEffect, useState } from 'react'

const Receipe = () => {
  const [apidata, setapidata] = useState([])
  const [countryName, setCountryName] = useState("russian")
  const [search, setsearch] = useState("")
  // api searchHandler
  const submitHandler = async (e) => {
    e.preventDefault()

    const q = search.trim()
    if (!q) return
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`)
    const data = await res.json()
    console.log('data from searching :', data)
    setapidata(Array.isArray(data.meals) ? data.meals : [])


  }
  //  api countryHandler
  console.log("search :", search)
  const apiCountryHandler = async () => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`)
      const data = await res.json();
      console.log("data :", data)
      setapidata(data.meals)
    } catch (err) {
      console.log(err.message)
    }
  }
  console.log("api_data :", apidata)
  useEffect(() => {

    apiCountryHandler()

  }, [countryName])
  console.log("countryNAme: ", countryName)
  return (<>
    <div className='flex flex-row items-center justify-center gap-2 mt-3'>
      <button onClick={() => setCountryName("russian")} className='p-4 bg-blue-600 text-fuchsia-50 rounded-sm cursor-pointer  '>russian</button>
      <button onClick={() => setCountryName("indian")} className='p-4 bg-blue-600 text-fuchsia-50 rounded-sm cursor-pointer  '>indian</button>
      <button onClick={() => setCountryName("american")} className='p-4 bg-blue-600 text-fuchsia-50 rounded-sm cursor-pointer  '>american</button>
      <button onClick={() => setCountryName("canadian")} className='p-4 bg-blue-600 text-fuchsia-50 rounded-sm cursor-pointer  '>canadian</button>

    </div>
    {/* searching section */}


    <form onSubmit={submitHandler} className='text-center my-5'>
      <input className='bg-blue-700 text-white h-[34px] w-[290px] pl-3 text-2xl'
        type="text"
        placeholder='Search any itms'
        value={search}
        onChange={(e) => setsearch(e.target.value)} />
    </form>
    <div className='m-14 p-4 flex flex-row flex-wrap'>
      {
        apidata.map((itms) => {
          return <div className='p-5 m-0.5' key={itms.idMeal}>
            <div >
              <img className='w-[200px] rounded ' src={itms.strMealThumb} alt="image loading.." />
            </div>
          </div>
        })
      }
    </div>

  </>)
}

export default Receipe