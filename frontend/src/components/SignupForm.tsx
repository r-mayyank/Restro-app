'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phoneNo: '',
    restaurantName: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
  }

  return (
    <Card className="bg-white shadow-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="phoneNo">Phone Number</Label>
            <Input 
              type="tel" 
              id="phoneNo" 
              name="phoneNo" 
              value={formData.phoneNo} 
              onChange={handleChange} 
              required 
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="restaurantName">Restaurant Name</Label>
            <Input 
              type="text" 
              id="restaurantName" 
              name="restaurantName" 
              value={formData.restaurantName} 
              onChange={handleChange} 
              required 
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </CardContent>
    </Card>
  )
}

