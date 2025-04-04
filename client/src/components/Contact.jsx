import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Contact({listing}) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(''); 

  const onChange = (e) => {
    setMessage(e.target.value);
  }
    useEffect(() =>{
      const fetchLandlord = async () => {
        try {
          const res = await fetch(`/api/user/${listing.userRef}`);
          const data = await res.json();
          setLandlord(data);
          
        } catch (error) {
          console.log(error);
        }
      }
      fetchLandlord();

    }, [listing.userRef])
  return (
    <>
    {landlord && (
      <div className='flex flex-col gap-2'>
        <p>Контактирајте го <span className='font-semibold'>{landlord.username}</span> за недвижност <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
        <textarea name='message' id='message' rows='2' value={message} 
                  onChange={onChange} placeholder='Внесете ја Вашата порака ..'
                  className='w-full rounded-lg border p-3'>
        </textarea>
        <Link className='bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95' to={`mailto:${landlord.email}?subject=Воврскасо${listing.name}&body=${message}`}>
            Испратете ја пораката
        </Link>
      </div>
    )}
    </>
  )
}
