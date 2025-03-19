'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, CreditCard, Truck, } from 'lucide-react'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { SUBSCRIPTION_PLANS, PlanType } from '@/app/subscriptions/types'

interface DeliveryAddress {
  street: string
  city: string
  postcode: string
  instructions: string
}

interface PaymentDetails {
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
  cardType?: string
}

interface ValidationErrors {
  street?: string
  city?: string
  postcode?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  nameOnCard?: string
  deliveryDays?: string
}

interface SubscriptionPlan {
  type: string
  price: number
  billingCycle: string
  productDiscount: number
  frequency: 'monthly' | 'biweekly' | 'weekly'
}

interface SelectedPackage {
  type: 'premade' | 'custom'
  plan: PlanType
  package?: any
  items?: Array<{ 
    name: string
    price: number
    quantity: number
    unit: string  
  }>
}

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: '',
    city: '',
    postcode: '',
    instructions: ''
  })
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    cardType: undefined
  })
  const [selectedDeliveryDays, setSelectedDeliveryDays] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan | null>(null)

  useEffect(() => {
    
    const selectedPackageStr = localStorage.getItem('selectedPackage')
    if (selectedPackageStr) {
      const selectedPackage = JSON.parse(selectedPackageStr) as SelectedPackage
      
      const planDetails = SUBSCRIPTION_PLANS[selectedPackage.plan]
      
      
      let frequency: 'monthly' | 'biweekly' | 'weekly'
      switch (selectedPackage.plan) {
        case 'monthly':
          frequency = 'monthly'
          break
        case 'biweekly':
          frequency = 'biweekly'
          break
        case 'weekly':
          frequency = 'weekly'
          break
        default:
          frequency = 'monthly'
      }

      setSubscriptionPlan({
        type: selectedPackage.plan,
        price: planDetails.price,
        billingCycle: 'monthly',
        productDiscount: planDetails.productDiscount,
        frequency
      })
    }
  }, [])

  
  const getDeliveryDays = () => {
    const days = []
    const today = new Date()
    for (let i = 1; i <= 31; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date.toISOString().split('T')[0])
    }
    return days
  }

  const getRequiredDeliveryDays = () => {
    if (!subscriptionPlan) return 1
    switch (subscriptionPlan.frequency) {
      case 'weekly':
        return 4
      case 'biweekly':
        return 2
      case 'monthly':
      default:
        return 1
    }
  }

  const handleDeliveryDayClick = (day: string) => {
    setSelectedDeliveryDays(prev => {
      const requiredDays = getRequiredDeliveryDays()
      
      if (prev.includes(day)) {
        
        return prev.filter(d => d !== day)
      } else {
        
        if (prev.length < requiredDays) {
          return [...prev, day].sort()
        }
        
        return [...prev.slice(1), day].sort()
      }
    })
  }

  
  const parseUnit = (unitStr: string) => {
    const match = unitStr.match(/^(\d+)\s*(.+)$/)
    if (match) {
      return {
        value: parseInt(match[1]),
        unit: match[2]
      }
    }
    return { value: 1, unit: unitStr } 
  }

  
  const formatTotalQuantity = (baseUnit: string, quantity: number) => {
    const { value, unit } = parseUnit(baseUnit)
    const totalValue = value * quantity
    return `${totalValue}${unit}`
  }

  
  const calculateItemsTotal = (items?: Array<{ price: number; quantity: number }>) => {
    if (!items) return 0
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  
  const calculateSavings = (itemsTotal: number, discountPercentage: number) => {
    return (itemsTotal * discountPercentage) / 100
  }

  
  const validatePostcode = (postcode: string) => {
    
    const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i
    return postcodePattern.test(postcode.trim())
  }

  
  const cardPatterns = {
    visa: /^4\d{15}$/,  
    mastercard: /^(5[1-5]|2[2-7])\d{14}$/,  
    amex: /^3[47]\d{13}$/,  
    discover: /^6(?:011|5\d{2})\d{12}$/  
  }

  
  const detectCardType = (number: string): string | undefined => {
    const cleanNumber = number.replace(/\D/g, '')
    
    
    if (cleanNumber.startsWith('4')) return 'visa'
    if (/^(5[1-5]|2[2-7])/.test(cleanNumber)) return 'mastercard'
    if (/^3[47]/.test(cleanNumber)) return 'amex'
    if (/^6(011|5)/.test(cleanNumber)) return 'discover'
    
    return undefined
  }

  const validateCardNumber = (cardNumber: string) => {
    
    const cleanNumber = cardNumber.replace(/\D/g, '')
    
    
    if (!cleanNumber) return false
    
    
    if (cleanNumber.length !== 15 && cleanNumber.length !== 16) return false
    
    
    const cardType = detectCardType(cleanNumber)
    if (!cardType) return false
    
    
    if (!cardPatterns[cardType as keyof typeof cardPatterns].test(cleanNumber)) return false
    
    
    let sum = 0
    let isEven = false
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i])
      
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }

  const validateExpiryDate = (expiryDate: string) => {
    
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false
    
    const [month, year] = expiryDate.split('/')
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1
    
    const expMonth = parseInt(month)
    const expYear = parseInt(year)
    
    if (expMonth < 1 || expMonth > 12) return false
    if (expYear < currentYear) return false
    if (expYear === currentYear && expMonth < currentMonth) return false
    
    return true
  }

  const validateCVV = (cvv: string) => {
    
    return /^\d{3,4}$/.test(cvv)
  }

  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, '')
    const cardType = detectCardType(cleanValue)
    
    
    if (cardType === 'amex') {
      
      const groups = cleanValue.match(/(\d{0,4})(\d{0,6})(\d{0,5})/)
      if (groups) {
        return [groups[1], groups[2], groups[3]].filter(Boolean).join(' ')
      }
    } else {
      
      const groups = cleanValue.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/)
      if (groups) {
        return [groups[1], groups[2], groups[3], groups[4]].filter(Boolean).join(' ')
      }
    }
    return cleanValue
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatCardNumber(value)
    const cardType = detectCardType(value)
    
    setPaymentDetails(prev => ({
      ...prev,
      cardNumber: formatted,
      cardType
    }))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    setPaymentDetails(prev => ({ ...prev, expiryDate: value }))
  }

  const validateDeliveryForm = () => {
    const errors: ValidationErrors = {}
    
    if (!deliveryAddress.street.trim()) {
      errors.street = 'Street address is required'
    }
    
    if (!deliveryAddress.city.trim()) {
      errors.city = 'City is required'
    }
    
    if (!deliveryAddress.postcode.trim()) {
      errors.postcode = 'Postcode is required'
    } else if (!validatePostcode(deliveryAddress.postcode)) {
      errors.postcode = 'Please enter a valid UK postcode'
    }
    
    const requiredDays = getRequiredDeliveryDays()
    if (selectedDeliveryDays.length !== requiredDays) {
      errors.deliveryDays = `Please select ${requiredDays} delivery ${requiredDays === 1 ? 'day' : 'days'}`
      setError(errors.deliveryDays)
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePaymentForm = () => {
    const errors: ValidationErrors = {}
    
    if (!paymentDetails.nameOnCard.trim()) {
      errors.nameOnCard = 'Name on card is required'
    }
    
    if (!paymentDetails.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required'
    } else if (!validateCardNumber(paymentDetails.cardNumber)) {
      errors.cardNumber = 'Please enter a valid card number'
    }
    
    if (!paymentDetails.expiryDate) {
      errors.expiryDate = 'Expiry date is required'
    } else if (!validateExpiryDate(paymentDetails.expiryDate)) {
      errors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
    }
    
    if (!paymentDetails.cvv) {
      errors.cvv = 'CVV is required'
    } else if (!validateCVV(paymentDetails.cvv)) {
      errors.cvv = 'Please enter a valid CVV'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateDeliveryForm()) {
      setError(null)
      setStep(2)
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePaymentForm()) {
      return
    }
    
    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryAddress,
          paymentDetails: {
            ...paymentDetails,
            cardNumber: paymentDetails.cardNumber.replace(/\s/g, ''), 
          },
          selectedDeliveryDays,
        }),
      })

      if (!response.ok) {
        throw new Error('Payment processing failed')
      }

      setStep(3)
    } catch (err) {
      setError('Payment processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header cartTotal={0} />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-center items-center">
              
              <div className="flex items-center">
                <div className={`flex items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="ml-2 font-medium text-sm">Delivery</span>
                </div>
              </div>

              
              <div className="hidden sm:block w-16 h-0.5 bg-gray-200 mx-2" />
              <div className="block sm:hidden h-6" />

              
              <div className="flex items-center">
                <div className={`flex items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="ml-2 font-medium text-sm">Payment</span>
                </div>
              </div>

              
              <div className="hidden sm:block w-16 h-0.5 bg-gray-200 mx-2" />
              <div className="block sm:hidden h-6" />

              
              <div className="flex items-center">
                <div className={`flex items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-2 font-medium text-sm">Confirmation</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm sm:text-base">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                {step === 1 && (
                  <form onSubmit={handleDeliverySubmit}>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Delivery Details</h2>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress.street}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 
                            ${validationErrors.street ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {validationErrors.street && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.street}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 
                            ${validationErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {validationErrors.city && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.city}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postcode *
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress.postcode}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, postcode: e.target.value.toUpperCase() }))}
                          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 
                            ${validationErrors.postcode ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {validationErrors.postcode && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.postcode}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Instructions
                        </label>
                        <textarea
                          value={deliveryAddress.instructions}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, instructions: e.target.value }))}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          rows={3}
                        />
                      </div>

                      <div className="mt-4 sm:mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Delivery {getRequiredDeliveryDays() === 1 ? 'Day' : 'Days'} *
                          {subscriptionPlan && (
                            <span className="block sm:inline text-sm text-gray-500 mt-1 sm:mt-0 sm:ml-2">
                              ({getRequiredDeliveryDays()} {getRequiredDeliveryDays() === 1 ? 'day' : 'days'} required for {subscriptionPlan.frequency} delivery)
                            </span>
                          )}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                          {getDeliveryDays().map((day) => {
                            const isSelected = selectedDeliveryDays.includes(day)
                            const date = new Date(day)
                            return (
                              <button
                                key={day}
                                type="button"
                                onClick={() => handleDeliveryDayClick(day)}
                                className={`p-3 text-center border rounded-lg transition-colors ${
                                  isSelected
                                    ? 'bg-green-50 border-green-500 text-green-700'
                                    : 'border-gray-200 hover:border-green-500'
                                }`}
                              >
                                {date.toLocaleDateString('en-GB', {
                                  weekday: 'short',
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </button>
                            )
                          })}
                        </div>
                        {validationErrors.deliveryDays && (
                          <p className="mt-2 text-sm text-red-600">{validationErrors.deliveryDays}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 sm:mt-6 w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                    >
                      Continue to Payment
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit}>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Payment Details</h2>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          value={paymentDetails.nameOnCard}
                          onChange={(e) => setPaymentDetails(prev => ({ ...prev, nameOnCard: e.target.value }))}
                          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 
                            ${validationErrors.nameOnCard ? 'border-red-500' : 'border-gray-300'}`}
                          maxLength={70}
                        />
                        {validationErrors.nameOnCard && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.nameOnCard}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                          {paymentDetails.cardType && (
                            <span className="ml-2 text-sm text-gray-500 capitalize">
                              ({paymentDetails.cardType})
                            </span>
                          )}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={paymentDetails.cardNumber}
                            onChange={handleCardNumberChange}
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 
                              ${validationErrors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                            maxLength={paymentDetails.cardType === 'amex' ? 17 : 19}
                            placeholder="1234 5678 9012 3456"
                          />
                          {paymentDetails.cardType && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className={`w-8 h-6 rounded ${
                                paymentDetails.cardType === 'visa' ? 'bg-blue-600' :
                                paymentDetails.cardType === 'mastercard' ? 'bg-red-600' :
                                paymentDetails.cardType === 'amex' ? 'bg-gray-600' :
                                'bg-orange-600'
                              }`}></div>
                            </div>
                          )}
                        </div>
                        {validationErrors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentDetails.expiryDate}
                            onChange={handleExpiryDateChange}
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 
                              ${validationErrors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                            maxLength={5}
                          />
                          {validationErrors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">{validationErrors.expiryDate}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 
                              ${validationErrors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                            maxLength={4}
                            placeholder="123"
                          />
                          {validationErrors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{validationErrors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="mt-4 sm:mt-6 w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order'}
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="text-center py-6 sm:py-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Thank you for your order. We'll send you a confirmation email with your order details.
                    </p>
                    <button
                      onClick={() => router.push('/orders')}
                      className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      View Orders
                    </button>
                  </div>
                )}
              </div>
            </div>

            
            <div className="lg:col-span-1 order-1 lg:order-2 mb-4 lg:mb-0">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Order Summary</h3>
                <div className="space-y-2 sm:space-y-3">
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Package Type</span>
                    <span className="font-medium capitalize">
                      {JSON.parse(localStorage.getItem('selectedPackage') || '{}').type || '-'}
                    </span>
                  </div>

                  
                  {JSON.parse(localStorage.getItem('selectedPackage') || '{}').type === 'custom' && (
                    <>
                      <div className="py-2 border-b">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Selected Items</span>
                          <span className="font-medium">
                            £{calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          {JSON.parse(localStorage.getItem('selectedPackage') || '{}').items?.map((item: any, index: number) => {
                            const originalPrice = item.price * item.quantity
                            const discountedPrice = item.price * item.quantity * (1 - (subscriptionPlan?.productDiscount || 0) / 100)

                            return (
                              <div key={index} className="flex flex-col text-sm">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700">
                                    {item.name} ({formatTotalQuantity(item.unit, item.quantity)})
                                  </span>
                                  <div className="text-right">
                                    <span className="line-through text-gray-400 mr-2">£{originalPrice.toFixed(2)}</span>
                                    <span className="text-green-600 font-medium">£{discountedPrice.toFixed(2)}</span>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  Unit price: <span className="line-through">£{item.price.toFixed(2)}</span>
                                  <span className="text-green-600 ml-1">£{(item.price * (1 - (subscriptionPlan?.productDiscount || 0) / 100)).toFixed(2)}</span>
                                  <span className="ml-1">per {item.unit}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Original Price</span>
                        <span className="font-medium line-through text-gray-400">
                          £{calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items).toFixed(2)}
                        </span>
                      </div>

                      
                      {subscriptionPlan && (
                        <div className="flex justify-between py-2 border-b text-green-600">
                          <span>Subscription Savings ({subscriptionPlan.productDiscount}% off)</span>
                          <span className="font-medium">-£{calculateSavings(
                            calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items),
                            subscriptionPlan.productDiscount
                          ).toFixed(2)}</span>
                        </div>
                      )}

                      
                      <div className="flex justify-between py-2 border-b text-green-700">
                        <span>Items Total (after discount)</span>
                        <span className="font-medium">
                          £{(
                            calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items) -
                            calculateSavings(
                              calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items),
                              subscriptionPlan?.productDiscount || 0
                            )
                          ).toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}

                  
                  <div className="flex justify-between py-2 border-b">
                    <div>
                      <span className="text-gray-600">Subscription Plan</span>
                      {subscriptionPlan && (
                        <p className="text-sm text-gray-500">
                          {subscriptionPlan.type} ({subscriptionPlan.billingCycle})
                        </p>
                      )}
                    </div>
                    <span className="font-medium">
                      {subscriptionPlan ? `£${subscriptionPlan.price.toFixed(2)}` : '-'}
                    </span>
                  </div>

                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">Free</span>
                  </div>

                  
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Total</span>
                    <span>
                      {subscriptionPlan ? `£${(
                        subscriptionPlan.price +
                        (JSON.parse(localStorage.getItem('selectedPackage') || '{}').type === 'custom'
                          ? calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items) -
                            calculateSavings(
                              calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items),
                              subscriptionPlan.productDiscount
                            )
                          : 0)
                      ).toFixed(2)}` : '£0.00'}
                    </span>
                  </div>

                  
                  {subscriptionPlan && (
                    <div className="mt-3 sm:mt-4 space-y-2 bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">
                        You will be charged:
                      </p>
                      <ul className="text-xs sm:text-sm text-gray-600 list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2">
                        <li>£{subscriptionPlan.price.toFixed(2)} {subscriptionPlan.billingCycle} for your subscription</li>
                        {JSON.parse(localStorage.getItem('selectedPackage') || '{}').type === 'custom' && (
                          <>
                            <li>
                              £{(
                                calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items) -
                                calculateSavings(
                                  calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items),
                                  subscriptionPlan.productDiscount
                                )
                              ).toFixed(2)} for your selected items
                              <span className="block text-green-600 text-xs mt-1">
                                (Includes {subscriptionPlan.productDiscount}% subscription discount, saving you 
                                £{calculateSavings(
                                  calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items),
                                  subscriptionPlan.productDiscount
                                ).toFixed(2)})
                              </span>
                            </li>
                            <li className="text-xs text-gray-500 !mt-4">
                              Without a subscription, you would pay £{calculateItemsTotal(JSON.parse(localStorage.getItem('selectedPackage') || '{}').items).toFixed(2)} for these items
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 