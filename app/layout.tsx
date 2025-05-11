import './globals.css'

export const metadata = {
  title: 'Wavs Club - Music NFT',
  description: 'Collect your favorite music as NFTs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 