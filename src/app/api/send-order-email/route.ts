import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmails } from '@/utils/email';
import { Order } from '@/types/order';

export async function POST(req: NextRequest) {
  try {
    const order: Order = await req.json();
    const result = await sendOrderEmails(order);
    if (result) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: '이메일 발송 실패' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 