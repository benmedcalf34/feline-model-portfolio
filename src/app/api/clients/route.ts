import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const body = await request.json();
    const user = {
      email: body.email,
      password: body.password
    }
    return new Response("success", {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('No user found with matching credentials:', error);
    return new NextResponse('No user found with matching credentials', { status: 400 });
  }
}
 
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = {
      email: body.email,
      password: body.password
    }
    return new Response("success", {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating new user:', error);
    return new NextResponse('Error creating new user', { status: 400 });
  }
}