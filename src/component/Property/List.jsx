import { Button } from '@mui/material'
import React from 'react'

const List = ({properties}) => {
  return (
    <>
        {
            properties.map((currentData,index)=>{
                console.log(currentData)
                return (
                    <>
                        <div className="">
                            <div>
                                <div className="card mb-3 m-auto" style={{"max-width": "80rem"}}>
                                    <div className="row g-4">
                                    
                                        <div className="col-md-4">

                                            <img src={`http://localhost:5000/${currentData.attributes.avatar[0]}`} className="img-fluid rounded-start" alt="..." width="350" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title text-dark">{currentData.attributes.name}</h5>
                                                <p className='card-text'>
                                                   {currentData.attributes.price}
                                                </p>
                                                <p className='card-text'>
                                                    Address: {currentData.attributes.address.address_line}
                                                    Street: {currentData.attributes.address.street}
                                                    City:  {currentData.attributes.address.city}
                                                    Country: {currentData.attributes.address.country}


                                                </p>
                                                <div className=" ">
                                                <Button variant="contained" className="me-4 my-3">Show</Button>
                                                <Button variant="outlined" href="#contained-buttons">Schedule</Button>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                )
            })
        }

    </>
  )
}

export default List




