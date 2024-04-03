import React from 'react'

export default function Index({ text }: { text: string }) {
  return (
    <div
      style={{ background: "url('/signImgs/textAre.png')" }}
      className='w-[780px] h-[55px] text-[17px] font-normal leading-[55px] mt-[20px] text-left pl-[22px] bg-no-repeat bg-auto text-white'>{text}</div>
  )
}
