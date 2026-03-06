

import {scalekit} from '@/auth/scalekit-client'

import  {NextResponse} from 'next/server'


 export async function GET(request: Request) {


  const url = new URL(request.url);

  const code = url.searchParams.get('code');

  if(!code) {
    return Response.json({error : 'no code found'})
  }

  const authResult = await  scalekit.authenticateWithCode(code,'http://localhost:3000/auth/callback');

  const acessToken = authResult.accessToken;
  const refreshToken =  authResult.refreshToken;

  const response = NextResponse.json({sucess: true});

  response.cookies.set('acess_token',acessToken,{
    path : '/',
    maxAge : 60 * 60
  });

    response.cookies.set('refresh_token',refreshToken,{
    path : '/',
    maxAge : 60 * 60 * 24 * 30 ,
  });


    

  return  response ;
}