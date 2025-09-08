import PropertyListings from '@/components/PropertyListings';

export default function PropertiesPage() {
  return (
    <div className="min-h-screen">
      <PropertyListings />
    </div>
  );
}

export const metadata = {
  title: 'Properties | Grant\'s Estate Agents',
  description: 'Browse our selection of properties for sale and lease in Melbourne\'s Southeast',
};