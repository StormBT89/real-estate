import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'> 
            Внесете нова недвижнина
        </h1>      
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Наслов' className='border p-3 rounded-lg' 
                id='name' maxLength='62' minLength='6' required/>
                <textarea type='text' placeholder='Карактеристики на недвижноста' className='border p-3 rounded-lg' 
                id='description' required/>
                <input type='text' placeholder='Адреса' className='border p-3 rounded-lg' 
                id='address' required/>
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5'/>
                        <span>Продажба</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5'/>
                        <span>Изнајмување</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5'/>
                        <span>Паркинг</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='funrnished' className='w-5'/>
                        <span>Опремен</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5'/>
                        <span>Понуда</span>
                    </div>
                </div>
                <div className='flex flex=wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bedrooms' min='1' max='10' required 
                        className='p-3 border border-gray-300 rounded-lg'/>
                        <p>Спални соби</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bathrooms' min='1' max='10' required 
                        className='p-3 border border-gray-300 rounded-lg'/>
                        <p>Бањи</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='regularPrice' min='1' max='10' required 
                        className='p-3 border border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                        <p>Редовна цена</p>
                        <span className='text-sm'>(денари / месец)</span>
                        </div>                        
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='discountPrice' min='1' max='10' required 
                        className='p-3 border border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                        <p>Намалена цена</p>
                        <span className='text-sm'>(денари / месец)</span>
                        </div>                       
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Фотографии:
                     <span className='font-normal text-gray-600 ml-2'>
                    Можете да додадете до 5 фотографии. Првата фотографија ќе биде насловна
                    </span>
                    </p>        
                <div className='flex gap-4'>
                    <input className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple/>  
                    <button className='p-3 text-green-700 border border-green-700 
                                       rounded hover:shadow-lg disabled:opacity-80'>Прикачи</button>                  
                </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>
                    Креирајте ја недвожноста
                </button>
            </div>
        
        </form>
    </main>
  )
}
