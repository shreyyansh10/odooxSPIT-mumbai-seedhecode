import { NextRequest, NextResponse } from 'next/server'

export async function POST() {
  // This endpoint can be used to reset localStorage for testing
  return NextResponse.json({ 
    message: 'To reset localStorage, run this in browser console: localStorage.clear(); window.location.reload();' 
  })
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method to get reset instructions' 
  })
}
