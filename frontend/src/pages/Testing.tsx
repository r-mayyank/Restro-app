import { CountryDropdown } from "@/components/ui/country-dropdown";


export const Testing = () => {
    return (
        <div>
            <CountryDropdown
                placeholder="Select country"
                defaultValue="IND"
                onChange={() => {}}
            />
        </div>
    )
};