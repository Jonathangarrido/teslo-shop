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
    case 'POST':
      return registerUser(req,res)
  
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body as {name: string, email: string, password: string}
  
  if(password.length < 6){
    return res.status(400).json({
      message: 'La contraseña debe de ser de 6 caracteres'
    })
  }

  if(name.length < 6){
    return res.status(400).json({
      message: 'La nombre debe de ser de mayo a 2 caracteres'
    })
  }

  if(!validations.isValidEmail(email)){
    return res.status(400).json({
      message: 'El correo no tiene formato valido'
    })
  }


  await db.connect()
  const user = await User.findOne({email})

  if(user){
    await db.disconnect()
    return res.status(400).json({
      message: 'Ese correo ya está registrado'
    })
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcriptjs.hashSync(password),
    role: 'client',
    name
  })

  try {
    await newUser.save({ validateBeforeSave: true})
    
  } catch (error) {
    console.log( error)
    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }

  await db.disconnect()

  const { _id, role } = newUser

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
