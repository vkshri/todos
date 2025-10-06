import React from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

const Navbar = () => {
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', {
        withCredentials: true, // important for cookies/session logout
      })

      if (res.data.success) {
        toast({
          title: 'Logged out',
          description: res.data.message || 'You have been logged out successfully.',
        })

        // optionally redirect to login page
        setTimeout(() => {
          window.location.href = '/login'
        }, 5000)
      }
    } catch (error) {
      console.error('Logout Error:', error)
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: error.response?.data?.message || 'Something went wrong.',
      })
    }
  }

  return (
    <div className="bg-gray-600 text-white">
      <div className="flex items-center justify-between p-2">
        <h1 className="font-bold text-lg">Vishal</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}

export default Navbar
