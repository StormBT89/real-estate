import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc',
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
          searchTermFromUrl ||
          typeFromUrl ||
          parkingFromUrl ||
          furnishedFromUrl ||
          offerFromUrl ||
          sortFromUrl ||
          orderFromUrl
        ) {
          setSidebardata({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'createdAt',
            order: orderFromUrl || 'desc',
          });
        }
        
        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();

            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        }

        fetchListings();

    }, [location.search]);

    
    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
          ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
          }
      
          if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
          }
      
          if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
          ) {
            setSidebardata({
              ...sidebardata,
              [e.target.id]:
                e.target.checked || e.target.checked === 'true' ? true : false,
            });
          }
      
          if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createdAt';
      
            const order = e.target.value.split('_')[1] || 'desc';
      
            setSidebardata({ ...sidebardata, sort, order });
          }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const onShowMoreClick = async () => {
      const numberOfListings = listings.length;
      const startIndex = numberOfListings;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('startIndex', startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length < 9) {
        setShowMore(false);
      }
      setListings([...listings, ...data]);

    };

  return (
    <div className='flex flex-col md:flex-row md:min-h-screen'>
      <div className='p-7 border-b-2 md:border-r-2'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Параметри на пребарување: </label>
                <input type='text'
                       id='searchTerm'
                       placeholder='Пребарување... '
                       className='border rounded-lg p-3 w-full'
                       value={sidebardata.searchTerm}
                       onChange={handleChange}></input>
            </div>
            <div className='flex-row gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Параметри: </label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='all' className='w-5'
                        checked={sidebardata.type === 'all'}                        
                        onChange={handleChange}/>
                    <span>Продажба и изнајмување</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5'
                        checked={sidebardata.type === 'sale'}                        
                        onChange={handleChange}/>
                    <span>Продажба</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5'
                        checked={sidebardata.type === 'rent'}                        
                        onChange={handleChange}/>
                    <span>Изнајмување</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5'
                        checked={sidebardata.offer}
                        onChange={handleChange}/>
                    <span>Понуда</span>
                </div>
            </div>
            <div className='flex-row gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Дополнителни карактеристики: </label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5'
                            checked={sidebardata.parking}
                            onChange={handleChange}/>
                    <span>Достапен паркинг простор</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5'
                            checked={sidebardata.furnished}
                            onChange={handleChange}/>
                    <span>Опремено со мебел</span>
                </div>               
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Подредување: </label>
                <select id='sort_order' 
                        className='border rounded-lg p-3'
                        onChange={handleChange}
                        defaultValue={'createdAt_desc'}>
                    <option value={'regularPrice_desc'}>Цена: од највисока кон најниска</option>
                    <option value={'regularPrice_asc'}>Цена: од најниска кон највисока</option>
                    <option value={'createdAt_desc'}>Најново-креирани недвижности</option>
                    <option value={'createdAt_asc'}>Најстаро-креирани недвижности</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>Пребарај</button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Резултати од пребарувањето</h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>Не е пронајдена недвижност согласно зададените параметри</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>Се вчитуваат резултатите согласно пребарувањето ...</p>
          )}
          {
            !loading && listings && listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
          }
          {showMore && (
            <button onClick={onShowMoreClick} className='text-blue-700 hover:underline p-7 text-center w-full'>
              Прикажи повеќе ..
            </button>
          )}
        </div>        
      </div>
    </div>
  )
}
