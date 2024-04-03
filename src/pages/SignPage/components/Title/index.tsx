import React from 'react'

export default function Index({ title }: { title: string }) {
  return (
    <div className='w-[783px] h-[50px] bg-no-repeat bg-auto font-bold text-[17px] ledaing-[50px] mt-5 pt-[13px] pl-[85px] box-border' style={{ backgroundImage: "url('/signImgs/title1.png')" }}>
      <div
        className='text-[32px] text-white '
        style={{
          background: 'linear-gradient(0deg, #0096FF 0%, #FFFFFD 69.3115234375%, #FFFFFD 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >{title}</div>
    </div>
  )
}

// div{
//   position: absolute;
//   top: 13px;
//   left: 85px;
//   font - size: 32px;
//   font - family: YouSheBiaoTiHei;
//   font - weight: 400;
//   color: #FFFFFF;
//   line - height: 23px;

//   background: linear - gradient(0deg, #0096FF 0 %, #FFFFFD 69.3115234375 %, #FFFFFD 100 %);
//   -webkit - background - clip: text;
//   -webkit - text - fill - color: transparent;
// }