import React from 'react'

const ProfileCard = ({image, nim, nama}) => {
  return (
    <div className='w-[12rem] lg:w-[17.5rem] drop-shadow-lg flex flex-col'>
        <img src={image} alt="Nadia Mareta Putri Leiden" className='rounded-t-[1rem]' />
        <div className='pb-[2.5rem] lg:pb-[3.5rem] px-[1.125rem] lg:px-[1.5rem] pt-[1.125rem] lg:pt-[1.5rem] bg-white rounded-b-[1rem] flex-1'>
        <p className='text-[0.7rem] lg:text-[1rem] text-darkgrey mb-[0.375rem]'>{ nim }</p>
        <h3 className='text-[1.125rem] lg:text-[1.5rem] font-medium'>{ nama }</h3>
        </div>
    </div>
  )
}

export default ProfileCard