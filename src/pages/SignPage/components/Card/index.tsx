import React from 'react'

export default function Index({ text, item }: {
  text: string,
  item: any,
}) {
  return (
    <div
      className="w-[181px] h-[48px] text-lg pr-[22px] pl-[32px] leading-[49px] mr-[49px] mb-[38px] truncate cursor-pointer text-white bg-auto bg-no-repeat bg-[url('/signImgs/box.png')]"
      title={text}
    >{text}</div>
  )
}
