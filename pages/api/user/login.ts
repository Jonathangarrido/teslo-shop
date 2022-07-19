import type { NextApiRequest, NextApiResponse } from 'next'
import bcriptjs from 'bcryptjs'

import { db } from '../../../database'
import { User } from '../../../models'
import { jwt } from '../../../utils'

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
    case 'POST':
      return loginUser(req,res)
  
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body
  
  await db.connect()

  const user = await User.findOne({email})

  await db.disconnect()

  if(!user){
    return res.status(400).json({
      message: 'Correo o password no válido - EMAIL'
    })
  }

  if(!bcriptjs.compareSync(password, user.password!)){
    return res.status(400).json({
      message: 'Correo o password no válido - PASSWORD'
    })
  }

  const { role, name, _id } = user

  const token = jwt.singToken(_id, email)

  return res.status(200).json({
    token,
    user: {
      name,
      role,
      email
    }
  })
}
