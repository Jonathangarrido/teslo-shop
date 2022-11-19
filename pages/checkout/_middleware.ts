import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

// import { jwt } from "../../utils"

export async function middleware( req: NextRequest, ev: NextFetchEvent){

  const { token = '' } = req.cookies

  // TODO: Validar esto ya que no esta
  return NextResponse.next()

  // try {

  //   await jwt.isValidaToken(token)
  //   return NextResponse.next()
    
  // } catch (error) {
  //   return NextResponse.redirect(`/auth/login?p=${ req.page.name }`)
  // }
}