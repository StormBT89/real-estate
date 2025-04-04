import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row md:min-h-screen'>
      <div className='p-7 border-b-2 md:border-r-2'>
        <form className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Параметри на пребарување: </label>
                <input type='text'
                       id='searchTerm'
                       placeholder='Пребарување... '
                       className='border rounded-lg p-3 w-full'></input>
            </div>
            <div className='flex-row gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Параметри: </label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='all' className='w-5'/>
                    <span>Продажба и изнајмување</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5'/>
                    <span>Продажба</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5'/>
                    <span>Изнајмување</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5'/>
                    <span>Понуда</span>
                </div>
            </div>
            <div className='flex-row gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Дополнителни карактеристики: </label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5'/>
                    <span>Достапен паркинг простор</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5'/>
                    <span>Опремено со мебел</span>
                </div>               
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Подредување: </label>
                <select id='sort_order' className='border rounded-lg p-3'>
                    <option>Цена: од највисока кон најниска</option>
                    <option>Цена: од најниска кон највисока</option>
                    <option>Најново-креирани недвижности</option>
                    <option>Најстаро-креирани недвижности</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>Пребарај</button>
        </form>
      </div>
      <div>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Резултати од пребарувањето</h1>
      </div>
    </div>
  )
}
