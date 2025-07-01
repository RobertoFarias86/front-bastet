import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import TopBar from '@/components/TopBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bastet',
  description: 'Plataforma de cursos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col gap-10">
            <TopBar />

            <div className="layout-guide flex-1">{children}</div>

            <footer className="bg-indigo-800">
              <p className="p-4 text-center text-white text-sm">
                A plataforma Bastet faz parte de um projeto criado para fins
                didáticos para a disciplina de Backend Node.js com SQL no
                Instituto INFnet.
              </p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}