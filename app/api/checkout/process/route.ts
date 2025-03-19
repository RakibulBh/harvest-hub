import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { deliveryAddress, paymentDetails, selectedDeliveryDay } = body

    
    await new Promise(resolve => setTimeout(resolve, 1000))
    return NextResponse.json({
      success: true,
      message: 'Order processed successfully',
      orderId: 'GUEST-' + Date.now(), 
      orderDetails: {
        deliveryAddress,
        deliveryDate: selectedDeliveryDay,
        status: 'confirmed'
      }
    })
  } catch (error) {
    console.error('Error in checkout process:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process order' },
      { status: 500 }
    )
  }
} 