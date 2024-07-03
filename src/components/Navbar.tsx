"use client";

import { useContext } from "react";
import ShareWalletIcon from "@/components/ShareWalletIcon";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import UserContext from "@/context/UserContext";
import { UserDetails } from "@/types/types";

export default function Navbar() {
  const user = useContext(UserContext);
  return (
    <nav className="w-full h-16 border-b sm:border-b-0">
      <div className="w-full max-w-[1500px] mx-auto px-2 flex items-center h-full gap-2">
        <div className="h-full flex items-center gap-4">
          <ShareWalletIcon className="size-10" />
          <span className="hidden sm:inline-block font-extrabold text-muted-foreground text-2xl translate-y-0.5">
            Share Wallet
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          {user ? <ProfilePicButton user={user} /> : <LoginButton />}
        </div>
      </div>
    </nav>
  );
}

function ProfilePicButton({ user }: { user: UserDetails }) {
  return (
    <Button variant="ghost" className="p-0 rounded-full">
      <ProfilePic letter={user.name[0]} color={user.pfpColor} />
    </Button>
  );
}

function LoginButton() {
  return (
    <Button
      variant="outline"
      className="px-2 sm:px-4 text-primary hover:text-primary rounded-full gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentcolor"
      >
        <path d="M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480.01-450q-54.78 0-92.39-37.6Q350-525.21 350-579.99t37.6-92.39Q425.21-710 479.99-710t92.39 37.6Q610-634.79 610-580.01t-37.6 92.39Q534.79-450 480.01-450ZM480-100q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Zm0-60q54.15 0 104.42-17.42 50.27-17.43 89.27-48.73-39-30.16-88.11-47Q536.46-290 480-290t-105.77 16.65q-49.31 16.66-87.92 47.2 39 31.3 89.27 48.73Q425.85-160 480-160Zm0-350q29.85 0 49.92-20.08Q550-550.15 550-580t-20.08-49.92Q509.85-650 480-650t-49.92 20.08Q410-609.85 410-580t20.08 49.92Q450.15-510 480-510Zm0-70Zm0 355Z" />
      </svg>
      <span className="hidden sm:inline-block text">Login</span>
    </Button>
  );
}

function ProfilePic({ letter, color }: { letter: string; color: string }) {
  return (
    <div
      className={`size-10 rounded-full flex items-center justify-center text-white`}
      style={{ backgroundColor: color }}
    >
      <span className="text-xl">{letter}</span>
    </div>
  );
}
