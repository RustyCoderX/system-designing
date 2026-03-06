import Image from "next/image";

import {scalekit} from '@/auth/scalekit-client';

export default  async function Home() {


  const redirectUri = 'http://localhost:3000/auth/callback'; 


  const options = {
    scopes : ['openid','profile','email','offline_acess'],
  }


  const url = scalekit.getAuthorizationUrl(redirectUri,options);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
           Login 
          </a>
    </div>
  );
}
