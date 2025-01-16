import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'
import { CountryDropdown } from "../ui/country-dropdown"

interface RestaurantDetailsFormProps {
  formData: {
    restaurantName: string;
    restaurantPhone: string;
    address: string;
    country: string;
    type: string;
    licenseNo: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  isLoading: boolean;
}

export function RestaurantDetailsForm({ formData, onChange, isLoading }: RestaurantDetailsFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 2: Restaurant Details</h2>
      <div className="space-y-2">
        <Label htmlFor="restaurantName">Restaurant Name</Label>
        <Input
          id="restaurantName"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="restaurantPhone">Restaurant Phone Number</Label>
        <Input
          id="restaurantPhone"
          name="restaurantPhone"
          type="tel"
          value={formData.restaurantPhone}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Country</Label>
        <CountryDropdown
          placeholder="Select country"
          defaultValue="IND"
          onChange={(country) => onChange({ target: { name: 'country', value: country.name } } as any)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select name="type" value={formData.type} onValueChange={(value) => onChange({ target: { name: 'type', value } } as any)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select restaurant type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dine-in">Dine In</SelectItem>
            <SelectItem value="takeaway">Takeaway</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="licenseNo">Licence No (GST)</Label>
        <Input
          id="licenseNo"
          name="licenseNo"
          value={formData.licenseNo}
          onChange={onChange}
          required
        />
      </div>
      <div className="flex space-x-4 pt-4">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Restaurant...
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
      </div>
    </div>
  )
}

