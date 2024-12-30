import { ThemeProvider } from '@/contexts/ThemeContext'
import MainLayout from '@/components/MainLayout'
import RemConfig from '@/components/RemConfig'

import '@/styles/global.scss'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RemConfig />
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}