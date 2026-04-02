import { NextRequest, NextResponse } from 'next/server';
import { GlobalConfig } from '@/constants';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${GlobalConfig.HUB_API_BASE_URL}/subscription/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
