import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!code || code.length !== 6) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // TODO: Get user's temporary secret from database
    // const user = await db.user.findUnique({
    //   where: { id: userId },
    //   select: { twoFactorSecret: true }
    // });
    
    // For demo purposes, using a mock secret
    const mockSecret = 'JBSWY3DPEHPK3PXP'; // This would come from DB
    
    // Verify the code
    const isValid = authenticator.verify({
      token: code,
      secret: mockSecret,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // TODO: Enable 2FA for user in database
    // await db.user.update({
    //   where: { id: userId },
    //   data: { twoFactorEnabled: true }
    // });

    return NextResponse.json({
      success: true,
      message: '2FA enabled successfully',
    });
  } catch (error) {
    console.error('2FA verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify 2FA code' },
      { status: 500 }
    );
  }
}