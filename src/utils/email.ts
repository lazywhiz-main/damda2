import nodemailer from 'nodemailer';
import { Order } from '@/types/order';
import { BANK_INFO } from '@/constants/bank';
import { products } from '@/data/products';

// Gmail 전송 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail 앱 비밀번호
  },
});

const FROM_EMAIL = process.env.GMAIL_USER || 'your-email@gmail.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';

// 금액 포맷팅
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price);
}

// 이메일 템플릿
const EMAIL_TEMPLATES = {
  // 고객용 주문 확인 이메일
  ORDER_CONFIRMATION: (order: Order, productName: string) => ({
    subject: `[담다] 주문이 접수되었습니다 (주문번호: ${order.orderId})`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 30px;">주문이 접수되었습니다</h1>
        
        <div style="margin-bottom: 30px;">
          <p style="color: #666;">안녕하세요, ${order.name}님</p>
          <p style="color: #666;">담다 스토어를 이용해 주셔서 감사합니다.<br>아래 계좌로 입금해 주시면 주문이 확정됩니다.</p>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">주문 정보</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">주문번호</td>
              <td style="padding: 8px 0; color: #333;">${order.orderId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">상품명</td>
              <td style="padding: 8px 0; color: #333;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">결제금액</td>
              <td style="padding: 8px 0; color: #333;">${formatPrice(order.amount)}원</td>
            </tr>
          </table>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">입금 정보</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">은행</td>
              <td style="padding: 8px 0; color: #333;">${BANK_INFO.bankName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">계좌번호</td>
              <td style="padding: 8px 0; color: #333;">${BANK_INFO.accountNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">예금주</td>
              <td style="padding: 8px 0; color: #333;">${BANK_INFO.accountHolder}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">입금자명</td>
              <td style="padding: 8px 0; color: #333;">${order.name}</td>
            </tr>
          </table>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">배송 정보</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">수령인</td>
              <td style="padding: 8px 0; color: #333;">${order.shippingName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">주소</td>
              <td style="padding: 8px 0; color: #333;">${order.address} ${order.addressDetail}</td>
            </tr>
            ${order.memo ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">요청사항</td>
              <td style="padding: 8px 0; color: #333;">${order.memo}</td>
            </tr>
            ` : ''}
          </table>
        </div>

        <div style="margin-top: 30px; padding: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0;">
            • 24시간 이내에 입금해 주시기 바랍니다.<br>
            • 입금자명이 다를 경우 입금 확인이 지연될 수 있습니다.<br>
            • 문의사항은 담다 스토어 문의하기를 이용해 주세요.
          </p>
        </div>
      </div>
    `,
  }),

  // 관리자용 주문 알림 이메일
  ADMIN_ORDER_NOTIFICATION: (order: Order, productName: string) => ({
    subject: `[담다 스토어] 새로운 주문이 접수되었습니다 (${order.orderId})`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 30px;">새로운 주문이 접수되었습니다</h1>
        
        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">주문 정보</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">주문번호</td>
              <td style="padding: 8px 0; color: #333;">${order.orderId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">주문일시</td>
              <td style="padding: 8px 0; color: #333;">${order.orderDate.toLocaleString('ko-KR')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">상품명</td>
              <td style="padding: 8px 0; color: #333;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">결제금액</td>
              <td style="padding: 8px 0; color: #333;">${formatPrice(order.amount)}원</td>
            </tr>
          </table>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">주문자 정보</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">이름</td>
              <td style="padding: 8px 0; color: #333;">${order.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">연락처</td>
              <td style="padding: 8px 0; color: #333;">${order.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">이메일</td>
              <td style="padding: 8px 0; color: #333;">${order.email}</td>
            </tr>
          </table>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">배송 정보</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">수령인</td>
              <td style="padding: 8px 0; color: #333;">${order.shippingName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">주소</td>
              <td style="padding: 8px 0; color: #333;">${order.address} ${order.addressDetail}</td>
            </tr>
            ${order.memo ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">요청사항</td>
              <td style="padding: 8px 0; color: #333;">${order.memo}</td>
            </tr>
            ` : ''}
          </table>
        </div>
      </div>
    `,
  }),
};

// 이메일 발송 함수
export async function sendOrderEmails(order: Order) {
  try {
    const product = products.find(p => p.id === order.productId);
    if (!product) throw new Error('Product not found');

    // 고객용 이메일 발송
    const customerEmail = EMAIL_TEMPLATES.ORDER_CONFIRMATION(order, product.name);
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: order.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
    });

    // 관리자용 이메일 발송
    const adminEmail = EMAIL_TEMPLATES.ADMIN_ORDER_NOTIFICATION(order, product.name);
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });

    return true;
  } catch (error) {
    console.error('Failed to send order emails:', error);
    return false;
  }
} 