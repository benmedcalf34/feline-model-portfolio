import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const body = await request.json();
    const modelId = body.modelId;
    const appointments = [
      {}
    ];
    return new Response(JSON.stringify(appointments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error getting available appointments:', error);
    return new NextResponse('Error getting available appointments', { status: 400 });
  }
}
 
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const modelId = body.modelId;
    const apptTime = body.apptTime;
    const newAppt = {modelId: modelId, apptTime: apptTime};
    return new Response(JSON.stringify(newAppt), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error reserving appointment:', error);
    return new NextResponse('Error reserving appointment', { status: 400 });
  }
}