import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'  
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem'


export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use(Navigation);
  console.log(rentListings);
  useEffect(() => {

    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);          
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOfferListings();

  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-orange-500 font-bold text-xl lg:text-2xl'>
          Пронајдете го Вашето совршено место за одмор, изнајмување или домување <br/>
          <span className='text-slate-500'>Најголем избор за продажба и изнајмување на простор во Македонија <br/></span>           
        </h1>
        <div className='text-xs sm:text-sm'>
          Одберете недвижност согласно Вашите потреби.. <br/>
          Откријте ги иновативните можности.. испратете ги Вашите спецификации за купување или рентање на простор, 
          ќе добиете понуда согласно Вашите барања во рок кој Вие го одредувате..  
        </div>
        <Link to={'/search'} className='font-semibold text-xs sm:text-sm text-blue-800 hover:underline'>
          Започнете со пребарување на сите недвижности ...
        </Link>
      </div>
      <Swiper navigation>
      {
        offerListings && offerListings.length > 0 && 
          offerListings.map((listing) =>           
            <SwiperSlide>
            <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}} 
                         className='h-[500px]' key={listing._id}>
            </div>
          </SwiperSlide>
          
          ) 
      }
      </Swiper>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-orange-600'>Најнови намалени цени на недвижности</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offers=true'}>Прикажете повеќе понуди ...
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div>
              <div>
                <h2 className='text-2xl font-semibold text-orange-600'>Најнови недвижности за изнајмување</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                      Прикажете повеќе недвижности за изнајмување ...
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                  {
                    rentListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id}/>
                    ))
                  }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div>
              <div>
                <h2 className='text-2xl font-semibold text-orange-600'>Најнови недвижности за продажба</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                    Прикажете повеќе недвижности за продажба ...
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                  {
                    saleListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id}/>
                    ))
                  }
              </div>
            </div>
          )
        }
      </div>      
    </div>
  )
}
