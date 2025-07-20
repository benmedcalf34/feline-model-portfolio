import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
      const models = [
        {}
      ];
  return new Response(JSON.stringify(models), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  }  catch (error) {
    console.error('Error getting feline models:', error);
    return new NextResponse('Error getting feline models', { status: 400 });
  }
}
 
export async function POST(request: NextRequest) {
  try {
    const newModel = await request.json();

    return new Response(JSON.stringify(newModel), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding feline model:', error);
    return new NextResponse('Error adding feline model', { status: 400 });
  }
}