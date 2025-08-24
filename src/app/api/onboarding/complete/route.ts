import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // TODO: Get user ID from session/auth
    const userId = 'USER_ID_FROM_SESSION'; // This should come from your auth system
    
    // Validate the data
    if (!data.onlyFansConnection || !data.aiConfiguration || !data.paymentSetup) {
      return NextResponse.json(
        { error: 'Incomplete onboarding data' },
        { status: 400 }
      );
    }

    // TODO: Save onboarding data to database
    // This would typically involve:
    // 1. Encrypting OnlyFans credentials
    // 2. Saving AI configuration preferences
    // 3. Creating Stripe checkout session for payment
    
    // For now, we'll just create a Stripe checkout session
    const checkoutResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: data.paymentSetup.plan,
        billingInterval: data.paymentSetup.billingInterval,
        userId: userId,
        promoCode: data.paymentSetup.promoCode,
      }),
    });

    if (!checkoutResponse.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { url } = await checkoutResponse.json();

    // Return the Stripe checkout URL for redirect
    return NextResponse.json({ 
      success: true,
      checkoutUrl: url,
    });
  } catch (error) {
    console.error('Onboarding completion error:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}