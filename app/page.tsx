'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const MusicNFT = dynamic(() => import('./components/MusicNFT'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Wavs Club - Music NFT</h1>
        <p className="text-center">Coming soon...</p>
      </div>
    </main>
  )
} 