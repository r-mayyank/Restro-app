'use client'

import { useState } from 'react'
import axios from 'axios'
import { PersonalDetailsForm } from '../components/Signup/PersonalDetailsForm'
import { RestaurantDetailsForm } from '../components/Signup/RestaurantDetailsForm'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from '../components/Signup/ProgressBar'
import { AnimatedFormContainer } from '../components/Signup/AnimatedFormContainer'
import { Loader2 } from 'lucide-react'
import { BACKEND_URL } from "../config";


export default function SignupForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    restaurantName: '',
    restaurantPhone: '',
    address: '',
    type: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const createUser = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Replace with your actual API endpoint for user creation
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name: formData.name,
        email: formData.email,
        phoneNo: formData.phone,
        password: formData.password,
        role: 'owner',
      })

      setUserId(response.data.userId)
      setStep(2)
    } catch (err) {
      setError(axios.isAxiosError(err) && err.response ? err.response.data.message : 'An error occurred during user creation')
      setStep(1)
    } finally {
      setIsLoading(false)
    }
  }

  const createRestaurant = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Replace with your actual API endpoint for restaurant creation
      await axios.post(`${BACKEND_URL}/api/v1/restaurant/create`, {
        ownerId: userId,
        name: formData.restaurantName,
        phoneNo: formData.restaurantPhone,
        address: formData.address,
        type: formData.type,
      })

      setSuccess(true)
    } catch (err) {
      setError(axios.isAxiosError(err) && err.response ? err.response.data.message : 'An error occurred during restaurant creation')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    await createUser()
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createRestaurant()
  }

  const handleManageRestaurant = () => {
    // This function would typically navigate to the restaurant management page
    console.log("Navigating to restaurant management page")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          {!success && (
            <>
              <ProgressBar step={step} totalSteps={2} />
              <form onSubmit={handleSubmit}>
                <AnimatedFormContainer step={step}>
                  {step === 1 && (
                    <PersonalDetailsForm
                      formData={formData}
                      onChange={handleInputChange}
                      onNext={handleNext}
                      isLoading={isLoading}
                    />
                  )}
                  {step === 2 && (
                    <RestaurantDetailsForm
                      formData={formData}
                      onChange={handleInputChange}
                      onBack={handleBack}
                      isLoading={isLoading}
                    />
                  )}
                </AnimatedFormContainer>
              </form>
            </>
          )}
          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          )}
          {error && <div className="text-red-600 mt-4">{error}</div>}
          {success && (
            <div className="space-y-4">
              <div className="text-center text-green-600">
                Signup successful! Your user ID is: {userId}
              </div>
              <Button onClick={handleManageRestaurant} className="w-full">
                Manage Your Restaurant
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

