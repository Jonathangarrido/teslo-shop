import { useContext } from 'react'
import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'

import { UiContext, CartContext } from '../../context'

export const Navbar = () => {
  const { asPath } = useRouter()
  const { toggleSideMenu } = useContext(UiContext)
  const { numberOfItems } = useContext(CartContext)

  const validatePath = (path: string) => asPath === `/category/${path}`

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}>
          {[
            { path: 'men', name: 'hombres' },
            { path: 'women', name: 'mujeres' },
            { path: 'children', name: 'niños' },
          ].map((item, key) => (
            <NextLink href={`/category/${item.path}`} passHref key={key}>
              <Link>
                <Button
                  className={validatePath(item.path) ? 'activated' : ''}
                  color={validatePath(item.path) ? 'primary' : 'info'}
                  sx={{
                    '&.activated:hover': {
                      background: '#1E1E1E',
                    },
                  }}>
                  {item.name}
                </Button>
              </Link>
            </NextLink>
          ))}
        </Box>

        <Box flex={1} />

        <IconButton onClick={toggleSideMenu}>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
