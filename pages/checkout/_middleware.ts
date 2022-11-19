import { getToken } from "next-auth/jwt"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"


export async function middleware( req: NextRequest, ev: NextFetchEvent){

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if(!session){
    const url = req.nextUrl.clone()
    url.pathname = `/auth/login`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}