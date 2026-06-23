'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Text from "./Text/Text";

export default function Navbar() {
  const session = useSession();
  
  return (
    <header>
      <nav className="flex justify-between items-center">
        <Link href='/'>
          <Image src='/icons/logo.png' alt='SoundWave' width={120} height={120} priority/>
        </Link>
        <ul className="flex gap-10 sm:text-2xl">
          {session?.data && (
            <li>
              <Link href='/profile'><Text>Profile</Text></Link>
            </li>
          )}
          {session?.data ? (
            <li>
              <Link href="/" onClick={() => signOut()}><Text>Sign Out</Text></Link>
            </li>
          ) : (
            <li>
              <Link href="/api/auth/signin"><Text>Sign In</Text></Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}