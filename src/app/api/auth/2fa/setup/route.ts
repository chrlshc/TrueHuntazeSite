import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import crypto from 'crypto';

// Generate backup codes
function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
  }
  return codes;
}

export async function POST(request: NextRequest) {
  try {
    // Get user from headers (set by middleware)
    const userId = request.headers.get('x-user-id');
    const userEmail = request.headers.get('x-user-email');

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Generate secret for this user
    const secret = authenticator.generateSecret();
    
    // Generate QR code
    const appName = 'Huntaze Platform';
    const otpAuthUrl = authenticator.keyuri(userEmail, appName, secret);
    const qrCode = await QRCode.toDataURL(otpAuthUrl);
    
    // Generate backup codes
    const backupCodes = generateBackupCodes();

    // TODO: Store secret and backup codes in database (encrypted)
    // await db.user.update({
    //   where: { id: userId },
    //   data: {
    //     twoFactorSecret: encrypt(secret),
    //     twoFactorBackupCodes: encrypt(JSON.stringify(backupCodes)),
    //     twoFactorEnabled: false, // Will be enabled after verification
    //   }
    // });

    return NextResponse.json({
      secret,
      qrCode,
      backupCodes,
    });
  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json(
      { error: 'Failed to setup 2FA' },
      { status: 500 }
    );
  }
}