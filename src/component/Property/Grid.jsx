import React from 'react'
import PropCard from '../Helper/Card'

const Grid= ({properties}) => {
  return (
    <>
        {
            properties.map((currentData,index)=>{
                return (
                    <>
                        <div className="col-lg-3">
                            <PropCard data = {currentData} key={index} />
                        </div>
                    </>
                )
            })
        }
    </>
  )
}

export default Grid
