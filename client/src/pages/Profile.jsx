import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { set } from "mongoose";
import {updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure} from '../redux/user/userSlice.js';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();


  // firebase storage
  // allow read;
  // allow write;
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }

  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
        dispatch(signOutUserFailure(error.message));
    }
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto"> 
      <h1 className='text-3xl font-semibold text-center my-7'>Кориснички профил</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 
        object-cover cursor-pointer self-center mt-2"/>
        <input onChange={handleChange} type="text" id="username" placeholder="username" defaultValue={currentUser.username} className="border p-3 rounded-lg"/>
        <input onChange={handleChange} type="email" id="email" placeholder="email" defaultValue={currentUser.email} className="border p-3 rounded-lg"/>
        <input onChange={handleChange} type="password" id="password" placeholder="password" className="border p-3 rounded-lg"/> 
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg 
        p-3 hover:opacity-95 disabled:opacity-80">
          {loading ? 'Се вчитува...' : 'Ажурирај профил'}
          </button>
          <Link className="bg-green-700 text-white p-3 rounded-lg text-center 
                          hover:opacity-95" to={'/create-listing'}>
            Внесете нов оглас
          </Link>       
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Избришете го корисничкиот профил</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Одјавете се</span>
      </div>
    <p className="text-red-700 mt-5">{error ? error : ''}</p>
    <p className="text-green-700 mt-5">{updateSuccess ? 'Ажурирањето е успешно' : ''}</p>
    </div>
  )
}
