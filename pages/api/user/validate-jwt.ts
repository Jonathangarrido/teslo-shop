import type { NextApiRequest, NextApiResponse } from 'next'
import bcriptjs from 'bcryptjs'

import { db } from '../../../database'
import { User } from '../../../models'
import { jwt, validations } from '../../../utils'

type Data = 
| { message: string }
| { 
    token: string, 
    user: {
      name: string
      role: string
      email: string
    }
    
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return validateJWT(req,res)
  
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const validateJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies as { token : string}

  let userId = ''

  try {
    userId = await jwt.isValidaToken(token)
  } catch (error) {
    return res.status(400).json({
      message: 'Token de autorización no es válido'
    })
  }

  await db.connect()

  const user = await User.findById(userId).lean()

  await db.disconnect()

  if(!user){
    return res.status(400).json({
      message: 'No existe usuario con ese id'
    })
  }

  const {_id, email, role, name} = user

  return res.status(200).json({
    token: jwt.singToken(_id, email),
    user: {
      name,
      role,
      email
    }
  })
}
