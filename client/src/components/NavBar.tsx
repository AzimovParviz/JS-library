import { AppBar, Box } from '@mui/material'

export default function Header({ children }: any) {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          opacity: 0.8,
          padding: '10px',
          flexGrow: 4,
          flexFlow: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        {children}
      </AppBar>
    </Box>
  )
}
