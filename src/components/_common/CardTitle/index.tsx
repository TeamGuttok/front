import * as React from 'react'
import { cn } from '#components/lib/utils'

interface TitleProps {
  // className?: string
  children: React.ReactNode
}

export default function CardTitle({ children }: TitleProps) {
  return (
    // <div className="flex flex-col items-center sm:m-auto ">
    <div className="sm:-translate-y-12 lg:mt-10 flex flex-col items-center sm:m-auto mx-auto mt-8 sm:px-28 sm:py-20 sm:rounded-md sm:border sm:border-border mb-20">
      <hr className="w-full h-[1px] bg-border sm:display-none" />
      {/* <div className="flex flex-col justify-center items-center w-full mt-5"> */}
      {children}
      {/* <hr className="w-full h-[1px] bg-border mt-5" /> */}
      {/* <div className="flex flex-col items-center w-full mt-5"></div>
          <div className="w-full h-[1px] bg-border mt-5"></div> */}
      {/* <div className="w-full mt-5"></div> */}
    </div>
    //</div>
    // </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-bold text-center my-5">{children}</h1>
}

function Divider() {
  return <hr className="w-full h-[1px] bg-border" />
}

CardTitle.Heading = Heading
CardTitle.Divider = Divider

export { CardTitle }
