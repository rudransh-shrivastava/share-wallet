import React from "react";

import { cn } from "@/lib/utils";

export interface IconProps extends React.ButtonHTMLAttributes<SVGElement> {}

export default function ShareWalletIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 745.56"
      width={24}
      height={24}
      className={cn("size-7", className)}
      {...props}
    >
      <path
        fill="hsl(140, 60%, 70%)"
        d="M775.46,272.78H152.17a52.63,52.63,0,0,0-8.19.64L682.93,129a52.17,52.17,0,0,1,63.89,36.89Z"
        transform="translate(-100 -127.22)"
      />
      <path
        fill="hsl(140, 60%, 45%)"
        d="M144,273.42l-10.5,2.81A51.25,51.25,0,0,1,144,273.42Z"
        transform="translate(-100 -127.22)"
      />
      <path
        fill="hsl(140, 60%, 45%)"
        d="M598.89,491.67A114.7,114.7,0,0,0,680,687.48H900V820.61a52.17,52.17,0,0,1-52.17,52.17H152.17A52.17,52.17,0,0,1,100,820.61V324.94a52.17,52.17,0,0,1,33.48-48.71l10.5-2.81a52.63,52.63,0,0,1,8.19-.64H847.83A52.16,52.16,0,0,1,900,324.94V458.07H680A114.35,114.35,0,0,0,598.89,491.67Z"
        transform="translate(-100 -127.22)"
      />
      <path
        fill="none"
        d="M680,458.07a114.71,114.71,0,1,0,0,229.41H900V458.07ZM739.72,629.8a80.63,80.63,0,1,1,23.62-57A80.39,80.39,0,0,1,739.72,629.8Z"
        transform="translate(-100 -127.22)"
      />
      <path
        fill="hsl(140, 60%, 45%)"
        d="M763.34,572.78a80.64,80.64,0,1,1-23.62-57A80.39,80.39,0,0,1,763.34,572.78Z"
        transform="translate(-100 -127.22)"
      />
    </svg>
  );
}
