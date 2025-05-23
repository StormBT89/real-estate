import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

    const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);        
        return;
      } else {
        setLoading(false); 
        setError(null);
        navigate('/sign-in');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } 
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold
      my-7'>Регистрација на кориснички профил</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='корисничко име' 
               className='border p-3 rounded-lg' id='username'  onChange={handleChange}/>
        <input type='email' placeholder='емаил' 
               className='border p-3 rounded-lg' id='email'  onChange={handleChange}/>
          <input type='password' placeholder='лозинка' 
               className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg 
        hover:opacity-95 disabled:opacity-60 '>
          {loading ? 'Се вчитува...' : 'Регистрирај се'}
          </button>
          <OAuth />
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Имате кориснички профил?</p>
        <Link to={'/sign-in'} >
        <span className='text-blue-700'>Најавете се</span>
        </Link>
      </div>
      {error && 
      <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
