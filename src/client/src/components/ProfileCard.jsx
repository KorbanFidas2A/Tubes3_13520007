import React from "react";

const ProfileCard = ({ image, nim, nama }) => {
  return (
    <div className="flex w-[12rem] flex-col drop-shadow-lg lg:w-[17.5rem]">
      <img
        src={image}
        alt="Nadia Mareta Putri Leiden"
        className="rounded-t-[1rem]"
      />
      <div className="flex-1 rounded-b-[1rem] bg-white px-[1.125rem] pb-[2.5rem] pt-[1.125rem] lg:px-[1.5rem] lg:pb-[3.5rem] lg:pt-[1.5rem]">
        <p className="mb-[0.375rem] text-[0.7rem] text-darkgrey lg:text-[1rem]">
          {nim}
        </p>
        <h3 className="text-[1.125rem] font-medium lg:text-[1.5rem]">{nama}</h3>
      </div>
    </div>
  );
};

export default ProfileCard;
