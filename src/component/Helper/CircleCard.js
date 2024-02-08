import React from 'react'
import "./CircleCard.css"

function CircleCard({data}) {
  return (
    <>
      <div className="container text-center mt-5">
        <img src={data.imgSrc}  className="rounded-circle img-fluid" width={250} height={250} alt="img" />
        <p className="text-justify text-center text-dark my-2"> {data.name}.</p>
      </div>
    </>
  )
}

export default CircleCard