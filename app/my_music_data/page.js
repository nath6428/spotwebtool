"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import '@/styles/globals.css'
import { useSession } from 'next-auth/react'
import { getArtistsData } from '@/utils/getArtistsData'
import { getTracksData } from '@/utils/getTracksData'

const MusicData = () => {


  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [range, setRange] = useState("short_term")
  const [type, setType] = useState("artists")

  useEffect(() => {

    const fetchData = async () => {
      
      setLoading(true)
      if(type === 'tracks'){
        
        const data = await getTracksData(range)
        await setData(data.items)
        setLoading(false)

      } else if (type === 'artists'){

        const data = await getArtistsData(range)
        await setData(data.items)
        setLoading(false)

      }

    }

    fetchData()
    

  }, [type, range])
  


  const topTracksPlaylist = async () => {

    const response = await fetch('api/new_playlist', {
      method: 'POST',
      body: JSON.stringify({
        name: "Top Tracks",
        user_id: session?.user.id
      })
    })

    const data = await response.json()
  }
  
  return (
    <div className='flex flex-col justify-center mt-12 md:mt-0 '>
      <div className='flex flex-col items-center xl:flex-row md:px-6 md:py-6'>

        <div className='flex w-80 flex-row h-16 mx-4 md:mx-64 border-solid border-black border-2'>
          <div 
            onClick = {() => {setType('tracks')}} 
            className={`flex justify-center items-center w-1/2 ${type === 'tracks' ? 'bg-gray-400' : 'hover:bg-gray-200'}`}>
            <p>Tracks</p>
          </div>
          <div className='bg-black w-px'></div>
          <div 
            onClick = {() => {setType('artists')}} 
            className={`flex justify-center items-center w-1/2 ${type === 'artists' ? 'bg-gray-400' : 'hover:bg-gray-200'}`}>
            <p>Artists</p>
          </div>
        </div>
        
        



        <div className='flex flex-row w-96 h-16 md:mx-64 justify-evenly border-solid border-black border-2'>
          <div 
              onClick = {() => {setRange('short_term')}} 
              className={`flex justify-center items-center w-32 xl:w-40 ${range === 'short_term' ? 'bg-gray-400' : 'hover:bg-gray-200'}`}>          
            <p>Last Month</p>
          </div>    
          <div className='bg-black w-px'></div>
          <div 
              onClick = {() => {setRange('medium_term')}} 
              className={`flex justify-center items-center w-32 xl:w-40 ${range === 'medium_term' ? 'bg-gray-400' : 'hover:bg-gray-200'}`}>          
            <p>Past 6 Months</p>
          </div>
          <div className='bg-black w-px'></div>
          <div 
              onClick = {() => {setRange('long_term')}} 
              className={`flex justify-center items-center w-32 xl:w-40 ${range === 'long_term' ? 'bg-gray-400' : 'hover:bg-gray-200'}`}>          
            <p>Past Year</p>
          </div>
        </div>

      </div>
      
      {loading ?
        <div className="text-5xl flex justify-center p-16 flex-col items-center">Loading...</div>
      :
        data && 
        <div className="text-5xl flex justify-center p-16 flex-col items-center">
          <div className="flex flex-wrap justify-center">
            {data.map((item, index) => {
              return (
                <div key={index} className="flex flex-col items-center p-4 md:max-w-72 mx-8">
                  <Image src={item.images ? item.images[0].url : item.album.images[0].url} alt="artist/album image" className=" overflow-hidden rounded-full max-w-56 max-h-56 border-black border-2 border-solid" width={220} height={220}></Image>
                  <p className="text-2xl mt-4 max-w-64 text-ellipsis overflow-hidden whitespace-nowrap">{item.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      }

      
    </div>
  )
}

export default MusicData