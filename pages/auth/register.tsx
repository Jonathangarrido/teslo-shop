import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils'
import { AuthContext } from '../../context'

interface IFormData {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const router = useRouter()
  const { registerUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>()

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onRegisterForm = async ({ name, email, password }: IFormData) => {
    setShowError(false)

    const { hasError, message } = await registerUser(name, email, password)

    if (hasError) {
      setShowError(true)
      setErrorMessage(message!)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
      return
    }

    router.replace('/')
  }

  return (
    <AuthLayout title={'Registrar'}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              {showError && (
                <Chip
                  label={errorMessage}
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 2,
                    message: 'Mínimo 2 caracteres',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Mínimo 6 caracteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth>
                Registrar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">¿ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
