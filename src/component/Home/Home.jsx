import React, {useEffect, useRef} from 'react'
import './Home.css'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SLider from '../Helper/SLider';
import PropCard from '../Helper/Card';
import 'swiper/css';
import 'swiper/css/effect-creative';
// import required modules
import { EffectCreative ,Autoplay} from 'swiper/modules';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Home.css'
import FlatImg from '../Images/flat_img.png';
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllProperty, fetchProperty, fetchRecomendendProperty } from '../../Slice/propertySlice'; 
import Cities from '../Helper/Cities';
import Loader from '../Helper/Loader';
import { fetchAllProperty } from '../../Action/propertyAction';




function Home() {
  const cities = [
    {
      id: 1,
      name: "demo1",
      imgSrc: "https://picsum.photos/200/200"
    },
    {
      id:2 ,
      name: "demo2",
      imgSrc: "https://picsum.photos/200/200"
    },
    {
      id: 3,
      name: "demo3",
      imgSrc: "https://picsum.photos/200/200"
    },
    {
      id: 4,
      name: "demo4",
      imgSrc: "https://picsum.photos/200/200"
    },
    {
      id: 5,
      name: "demo5",
      imgSrc: "https://picsum.photos/200/200"
    },
    {
      id: 6,
      name: "demo6",
      imgSrc: "https://picsum.photos/200/200"
    },
  ]
  const dispatch = useDispatch();
  const {properties, loading} = useSelector(state => state.properties)

  useEffect(()=> {
    // dispatch(fetchRecomendendProperty())
    dispatch(fetchAllProperty())
  },[dispatch])

  return (
    <>  {
      loading ? <Loader /> : (
        <>
          <div className="home_page_banner"></div>
          <div className="custom-shape-divider-bottom-1696315792">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill">
                  </path>
              </svg>
          </div>
          <div className="container search-box">
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="form">
                  <i className="fa fa-search"></i>
                  <input type="text" className="form-control form-input" placeholder="Search anything..." />
                  <span className="left-pan"><KeyboardVoiceIcon /></span>
                </div>  
              </div>  
            </div>
          </div>
          <main className='main'>
            
            <div className='cities-card my-5'>
              <h3 className='main-heading'>Choose By <span className=" title-heading" > Cities</span> </h3>
                <SLider cities={cities} />
            </div>
            <div className='properties my-5' >
                <h3 className='main-heading my-3'>Recommended By  <span className=" title-heading"> Cities</span> </h3>
                <div className="row">
                {properties && properties.map((current, index)=>{
                    return (
                      <>
                        <div className="col-lg-3 gy-5">
                         <PropCard key={index} data={current} />
                        </div>
                      </>
                    )
                })}
                </div>
            </div>
            <div className="bhk">
              <div className="row m-auto ">
                <div className="col-lg-8 d-flex flex-column justify-content-center"  >
                  <h1 className='main-heading my-3 '>Choose By <span className=" title-heading" >BHK</span></h1>
                  <p className="text-secondary text-content" > orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                </div>
                <div className="col-lg-4 bhk-slider" >
                    <Swiper
                        grabCursor={true}
                        effect={'creative'}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        creativeEffect={{
                          prev: {
                            shadow: true,
                            translate: ['-125%', 0, -800],
                            rotate: [0, 0, -90],
                          },
                          next: {
                            shadow: true,
                            translate: ['125%', 0, -800],
                            rotate: [0, 0, 90],
                          },
                        }}
                        modules={[EffectCreative, Autoplay]}
                        className="mySwiper5"
                      >
                        <SwiperSlide>
                          <Link className="text-decoration-none" >
                            <div className="card border-0 shadow p-3 mb-5 bg-body-tertiary rounded" style={{"width" : "25rem"}}>
                              <img src={FlatImg} className="card-img-top bg-body-tertiary" alt="..." width="100" height="150" />
                              <div className="card-body">
                                <p className="card-text">BHK</p>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Link className="text-decoration-none" >
                            <div className="card border-0 shadow p-3 mb-5 bg-body-tertiary rounded" style={{"width" : "25rem"}}>
                              <img src={FlatImg} className="card-img-top bg-body-tertiary" alt="..." width="100" height="150" />
                              <div className="card-body">
                                <p className="card-text">2BHK</p>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Link className="text-decoration-none" >
                            <div className="card border-0 shadow p-3 mb-5 bg-body-tertiary rounded" style={{"width" : "25rem"}}>
                              <img src={FlatImg} className="card-img-top bg-body-tertiary" alt="..." width="100" height="150" />
                              <div className="card-body">
                                <p className="card-text">3BHK</p>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                </Swiper>
                </div>  

              </div>

            </div>
          </main>
        </>
      )
    }
          
        </>
  )
  )
}

export default Home