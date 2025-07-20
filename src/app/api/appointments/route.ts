import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
      // For example, fetch data from your DB here
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  }  catch (error) {
    console.error('Error parsing request body:', error);
    return new NextResponse('Error parsing request body', { status: 400 });
  }
}
 
export async function POST(request: NextRequest) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;
 
  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };
 
  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}