import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold
      my-7'>Регистрација на кориснички профил</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='корисничко име' 
               className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='емаил' 
               className='border p-3 rounded-lg' id='email'/>
          <input type='password' placeholder='лозинка' 
               className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg 
        hover:opacity-95 disabled:opacity-60 '>Регистрирај се</button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Имате кориснички профил?</p>
        <Link to={'/sign-in'} >
        <span className='text-blue-700'>Најавете се</span>
        </Link>
      </div>
    </div>
  )
}
