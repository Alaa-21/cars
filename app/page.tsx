"use client";

import {Hero,CustomFilter,SearchBar, CarCard, ShowMore} from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {
  const [allCars, setAllCars ]=useState([])
  const [loading, setLoading ]=useState(false)
  // SEARCH STATES
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")
  
  // Filter States
  const [fuel, setFuel] = useState()
  const [year, setYear] = useState(2022)

  // Pagination States
  const [limit, setLimit] = useState(10)
  
  const getCars = async ()=>{
    setLoading(true)
    try{const result = await fetchCars({
      
    manufacturer: manufacturer || "",
    year: year || 2022,
    fuel:fuel || "",
    limit: limit || 10,
    model: model || "",
    });
    setAllCars(result)
  }catch(err){
    console.log(err)
  }finally{
    setLoading(false)
  }
}
  useEffect(() => {
    getCars();
  }, [model,year,manufacturer,limit,fuel])
  

  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || "2022",
  //   fuel:searchParams.fuel || "",
  //   limit: searchParams.limit || "10",
  //   model: searchParams.model || "",
  // });

    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1  || !allCars
  
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="max-width mt-12 padding-x padding-y" id="discover">
        <div className="home__text-container">
          <h1 className="font-extrabold text-4xl">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar
            setManufacturer = {setManufacturer}
            setModel = {setModel}
            />

          <div className="home__filter-container">
            <CustomFilter 
            title = "fuel" 
            options={fuels} 
            setFilter={setFuel}
            />
            <CustomFilter 
            title = "year" 
            options = {yearsOfProduction} 
            setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car)=>(
              <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16">
                <Image 
                  src='/loader.svg'
                  alt='Loader'
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}
            <ShowMore 
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ): (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no result</h2>
            <p>{allCars?.message}</p>
          </div>

        )}
        
      </div>
    </main>
  )
}
