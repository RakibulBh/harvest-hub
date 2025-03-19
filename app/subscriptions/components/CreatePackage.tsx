"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, Plus, X, Loader2, Tag, Package, TractorIcon as Farm, ShoppingBasket, Clock } from "lucide-react"
import { PlanType } from '../types'

interface PackageItem {
  name: string
  quantity: string
  price: number
}

interface Product {
  id: number
  name: string
  price: number
  unit: string
  category: string
  organic: boolean
}

interface FormErrors {
  name?: string
  farmer?: string
  farmId?: string
  description?: string
  retailValue?: string
  items?: string
  tags?: string
}

interface FarmDetails {
  farm_id: number
  farm_name: string
  description: string
  location: string
  specialties: string[]
  products: Product[]
}

export default function CreatePackage() {
  const [packageData, setPackageData] = useState({
    name: "",
    farmer: "",
    farmId: "",
    description: "",
    retailValue: "",
    tags: [] as string[],
    items: [] as PackageItem[],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [newItem, setNewItem] = useState<PackageItem>({
    name: "",
    quantity: "",
    price: 0,
  })
  const [farmProducts, setFarmProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [newTag, setNewTag] = useState("")
  const [itemError, setItemError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [farmError, setFarmError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [planType, setPlanType] = useState<PlanType>('weekly')

  
  const parseUnit = (unitStr: string) => {
    const match = unitStr.match(/^(\d+)\s*(.+)$/)
    if (match) {
      return {
        value: Number.parseInt(match[1]),
        unit: match[2],
      }
    }
    return { value: 1, unit: unitStr } 
  }

  
  const formatTotalQuantity = (baseUnit: string, quantity: number) => {
    const { value, unit } = parseUnit(baseUnit)
    const totalValue = value * quantity
    return `${totalValue}${unit}`
  }

  
  const calculatePrice = (baseUnit: string, basePrice: number, quantity: number) => {
    const { value } = parseUnit(baseUnit)
    const multiplier = quantity * value
    const baseUnitQuantity = value
    return (multiplier / baseUnitQuantity) * basePrice
  }

  
  const calculateTotalRetailValue = (items: PackageItem[]) => {
    return items.reduce((total, item) => total + item.price, 0)
  }

  
  useEffect(() => {
    const fetchFarmDetails = async () => {
      if (!packageData.farmId.trim()) {
        setPackageData((prev) => ({ ...prev, farmer: "" }))
        setFarmError(null)
        setFarmProducts([])
        return
      }

      setIsLoading(true)
      setFarmError(null)

      try {
        const response = await fetch("/api/subscription/farms")
        if (!response.ok) {
          throw new Error("Failed to fetch farm details")
        }
        const farms: FarmDetails[] = await response.json()

        
        const farm = farms.find((f) => f.farm_id.toString() === packageData.farmId)

        if (farm) {
          setPackageData((prev) => ({
            ...prev,
            farmer: farm.farm_name,
          }))
          
          const products = Array.isArray(farm.products) ? farm.products : []
          setFarmProducts(products)

          
          if (errors.farmId) {
            setErrors((prev) => ({ ...prev, farmId: undefined }))
          }
          setFarmError(null)
        } else {
          setFarmError("Farm not found. Please check the Farm ID.")
          setPackageData((prev) => ({ ...prev, farmer: "" }))
          setFarmProducts([])
          setErrors((prev) => ({ ...prev, farmId: "Invalid Farm ID" }))
        }
      } catch (error) {
        console.error("Error fetching farm:", error)
        setFarmError("Farm not found. Please check the Farm ID.")
        setPackageData((prev) => ({ ...prev, farmer: "" }))
        setFarmProducts([])
        setErrors((prev) => ({ ...prev, farmId: "Invalid Farm ID" }))
      } finally {
        setIsLoading(false)
      }
    }

    
    const timeoutId = setTimeout(() => {
      fetchFarmDetails()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [packageData.farmId, errors.farmId])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    
    if (!packageData.name.trim()) {
      newErrors.name = "Package name is required"
    } else if (packageData.name.length < 3) {
      newErrors.name = "Package name must be at least 3 characters"
    }

    
    if (!packageData.farmer.trim()) {
      newErrors.farmer = "Farmer/Farm name is required"
    }

    
    if (!packageData.farmId) {
      newErrors.farmId = "Farm ID is required"
    } else if (Number(packageData.farmId) <= 0) {
      newErrors.farmId = "Farm ID must be a positive number"
    }

    
    if (!packageData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (packageData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    
    if (!packageData.retailValue) {
      newErrors.retailValue = "Retail value is required"
    } else if (Number(packageData.retailValue) <= 0) {
      newErrors.retailValue = "Retail value must be greater than 0"
    }

    
    if (packageData.items.length === 0) {
      newErrors.items = "At least one item is required"
    }

    
    if (packageData.tags.length === 0) {
      newErrors.tags = "At least one tag is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      setSubmitError(null)
      setSubmitSuccess(false)

      try {
        const response = await fetch("/api/subscription/packages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: packageData.name,
            farmer: packageData.farmer,
            farmId: packageData.farmId,
            description: packageData.description,
            retailValue: Number(packageData.retailValue),
            items: packageData.items,
            tags: packageData.tags,
            planType,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to create package")
        }

        
        setPackageData({
          name: "",
          farmer: "",
          farmId: "",
          description: "",
          retailValue: "",
          tags: [],
          items: [],
        })
        setSubmitSuccess(true)
        setFarmProducts([])
        setSelectedProduct("")
        setNewItem({
          name: "",
          quantity: "",
          price: 0,
        })
        setNewTag("")
      } catch (error) {
        console.error("Error creating package:", error)
        setSubmitError(error instanceof Error ? error.message : "Failed to create package")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPackageData((prev) => ({
      ...prev,
      [name]: value,
    }))

    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateItem = (productName: string, quantity: string): boolean => {
    if (!productName) {
      setItemError("Please select a product")
      return false
    }
    if (!quantity.trim()) {
      setItemError("Quantity is required")
      return false
    }
    if (Number(quantity) <= 0) {
      setItemError("Quantity must be greater than 0")
      return false
    }
    return true
  }

  const handleAddItem = () => {
    if (validateItem(selectedProduct, newItem.quantity)) {
      const product = farmProducts.find((p) => p.name === selectedProduct)
      if (product) {
        const totalQuantity = formatTotalQuantity(product.unit, Number(newItem.quantity))
        const totalPrice = calculatePrice(product.unit, product.price, Number(newItem.quantity))
        const newItems = [
          ...packageData.items,
          {
            name: selectedProduct,
            quantity: totalQuantity,
            price: totalPrice,
          },
        ]

        
        setPackageData((prev) => ({
          ...prev,
          items: newItems,
          retailValue: calculateTotalRetailValue(newItems).toFixed(2),
        }))

        setSelectedProduct("")
        setNewItem({
          name: "",
          quantity: "",
          price: 0,
        })
        setItemError("")
        
        if (errors.items) {
          setErrors((prev) => ({ ...prev, items: undefined }))
        }
      }
    }
  }

  const handleRemoveItem = (index: number) => {
    setPackageData((prev) => {
      const newItems = prev.items.filter((_, i) => i !== index)
      return {
        ...prev,
        items: newItems,
        retailValue: calculateTotalRetailValue(newItems).toFixed(2),
      }
    })
  }

  const handleAddTag = () => {
    if (!newTag.trim()) {
      setErrors((prev) => ({ ...prev, tags: "Tag cannot be empty" }))
      return
    }

    if (!packageData.tags.includes(newTag)) {
      setPackageData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
      
      if (errors.tags) {
        setErrors((prev) => ({ ...prev, tags: undefined }))
      }
    }
  }

  const handleRemoveTag = (tag: string) => {
    setPackageData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          <div className="bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Create Premade Package</h2>
                <p className="text-emerald-50 mt-1 text-sm">
                  Create a new package with products from your selected farm
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
            <div className="p-8 space-y-8">
              {submitError && (
                <div className="bg-red-50 border border-red-100 text-red-800 p-4 rounded-xl flex items-start gap-3">
                  <div className="p-1 bg-red-100 rounded-lg mt-0.5">
                    <X className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Error</h3>
                    <p className="text-sm text-red-600 mt-0.5">{submitError}</p>
                  </div>
                </div>
              )}

              {submitSuccess && (
                <div className="bg-green-50 border border-green-100 text-green-800 p-4 rounded-xl flex items-start gap-3">
                  <div className="p-1 bg-green-100 rounded-lg mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Success</h3>
                    <p className="text-sm text-green-600 mt-0.5">Package created successfully!</p>
                  </div>
                </div>
              )}

              
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Package className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Package Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Package Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={packageData.name}
                      onChange={handleChange}
                      placeholder="e.g., Essential Fresh Box"
                      className={`block w-full px-4 py-3 rounded-xl border ${
                        errors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"
                      } focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="retailValue" className="block text-sm font-medium text-gray-700">
                      Retail Value (£)
                    </label>
                    <div className="relative">
                      <input
                        id="retailValue"
                        name="retailValue"
                        type="number"
                        step="0.01"
                        value={packageData.retailValue}
                        readOnly
                        className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                    </div>
                    <p className="text-xs text-gray-500">Automatically calculated from product prices</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Farm className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Farm Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="farmId" className="block text-sm font-medium text-gray-700">
                      Farm ID
                    </label>
                    <input
                      id="farmId"
                      name="farmId"
                      type="number"
                      value={packageData.farmId}
                      onChange={handleChange}
                      placeholder="e.g., 1"
                      className={`block w-full px-4 py-3 rounded-xl border ${
                        errors.farmId ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"
                      } focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors`}
                    />
                    {errors.farmId && <p className="text-sm text-red-500 mt-1">{errors.farmId}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="farmer" className="block text-sm font-medium text-gray-700">
                      Farm Name
                    </label>
                    <div className="relative">
                      <input
                        id="farmer"
                        name="farmer"
                        value={packageData.farmer}
                        readOnly
                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
                        placeholder={isLoading ? "Loading..." : "Farm name will appear here"}
                      />
                      {isLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={packageData.description}
                  onChange={handleChange}
                  placeholder="Describe the package contents and benefits"
                  rows={3}
                  className={`block w-full px-4 py-3 rounded-xl border ${
                    errors.description ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"
                  } focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors resize-none`}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>

              
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <ShoppingBasket className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Package Items</h3>
                </div>

                {packageData.farmId && farmProducts.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select 
                        value={selectedProduct} 
                        onChange={(e) => setSelectedProduct(e.target.value)} 
                        className="block flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Select a product</option>
                        {farmProducts.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name} ({product.unit}) - £{product.price.toFixed(2)}
                          </option>
                        ))}
                      </select>

                      <div className="flex gap-3">
                        <input
                          type="number"
                          min="1"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))}
                          placeholder="Qty"
                          className="block w-24 sm:w-32 px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={handleAddItem}
                          className="inline-flex items-center px-4 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add
                        </button>
                      </div>
                    </div>

                    
                    <div className="mt-6">
                      {packageData.items.length > 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-4 bg-gray-50 border-b border-gray-200">
                            <div className="font-medium text-gray-600">Product</div>
                            <div className="font-medium text-gray-600">Quantity</div>
                            <div className="font-medium text-gray-600">Price</div>
                          </div>
                          {packageData.items.map((item, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-[1fr_auto_auto] gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors"
                            >
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-gray-600">{item.quantity}</div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-emerald-700">£{item.price.toFixed(2)}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(index)}
                                  className="ml-3 p-1 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-4 bg-gray-50 border-t border-gray-200">
                            <div className="font-semibold text-gray-900">Total</div>
                            <div></div>
                            <div className="font-bold text-emerald-700">£{packageData.retailValue}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                          <ShoppingBasket className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                          <p className="text-gray-600 font-medium">No items added yet</p>
                          <p className="text-sm text-gray-500 mt-1">Select products from the dropdown above</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    {isLoading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-3" />
                        <p className="text-gray-600 font-medium">Loading farm details and products...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Farm className="h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium">
                          {packageData.farmId
                            ? "No products available for this farm"
                            : "Enter a Farm ID to view available products"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {packageData.farmId ? "Try a different farm ID" : "Farm products will appear here"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Tag className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Package Tags</h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag (e.g., Fresh, Organic)"
                    className="block flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="inline-flex items-center px-4 py-3 rounded-xl border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {packageData.tags.length > 0 ? (
                    packageData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors group"
                      >
                        <span className="text-sm font-medium">{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1.5 p-0.5 rounded-full hover:bg-emerald-200 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span className="sr-only">Remove {tag}</span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center w-full py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <Tag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600 font-medium">No tags added yet</p>
                      <p className="text-sm text-gray-500 mt-1">Tags help customers find your package</p>
                    </div>
                  )}
                </div>
              </div>

              
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Clock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Plan Type</h3>
                </div>
                <div className="space-y-2">
                  <label htmlFor="planType" className="block text-sm font-medium text-gray-700">
                    Select Plan Type
                  </label>
                  <select
                    id="planType"
                    value={planType}
                    onChange={(e) => setPlanType(e.target.value as PlanType)}
                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors bg-white"
                  >
                    <option value="weekly">Weekly Plan</option>
                    <option value="biweekly">Bi-Weekly Plan</option>
                    <option value="monthly">Monthly Plan</option>
                  </select>
                  <p className="text-xs text-gray-500">This package will only be shown to customers with the matching plan type</p>
                </div>
              </div>
            </div>

            
            <div className="px-8 py-6 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset the form? All data will be lost.")) {
                    setPackageData({
                      name: "",
                      farmer: "",
                      farmId: "",
                      description: "",
                      retailValue: "",
                      tags: [],
                      items: [],
                    })
                    setFarmProducts([])
                    setSelectedProduct("")
                    setNewItem({ name: "", quantity: "", price: 0 })
                    setNewTag("")
                    setErrors({})
                  }
                }}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Create Package
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

