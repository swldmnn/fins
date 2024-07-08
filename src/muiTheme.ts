import { ThemeOptions } from "@mui/material";

export const theme: ThemeOptions = {
    palette: {
      mode: 'dark',
      background: {
        default: '#111111',
      },
      primary: {
        main: '#5f9ea0',
        dark: '#2f4f4f'
      }
    },
    typography: {
        h1: {
            fontFamily: 'Times New Roman, Times, serif',
            fontSize: 'larger',
            fontWeight: 'bold',
            marginBottom: '1rem'
        },
        h2: {
            fontFamily: 'Times New Roman, Times, serif',
            fontSize: 'large',
            fontWeight: 'bold',
            marginBottom: '1rem'
        },
        h3: {
            fontFamily: 'Times New Roman, Times, serif',
            fontSize: 'medium',
            fontWeight: 'bold',
        }
    }
}