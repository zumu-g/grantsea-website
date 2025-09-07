export interface Property {
  id: string;
  title: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  price: number;
  priceDisplay: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize?: number;
  buildingSize?: number;
  propertyType: 'house' | 'unit' | 'townhouse' | 'land' | 'commercial';
  listingType: 'sale' | 'rent' | 'sold';
  images: string[];
  description: string;
  features: string[];
  listingDate: string;
  soldDate?: string;
  agent: Agent;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  office: Office;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface SuburbData {
  name: string;
  state: string;
  postcode: string;
  medianHousePrice: number;
  medianUnitPrice: number;
  priceGrowth: {
    quarterly: number;
    yearly: number;
  };
  demographics: {
    population: number;
    medianAge: number;
    medianIncome: number;
    familyComposition: {
      couples: number;
      families: number;
      singles: number;
    };
  };
  amenities: {
    schools: SchoolData[];
    transport: TransportData[];
    shopping: ShoppingData[];
    healthcare: HealthcareData[];
  };
  marketStats: {
    averageDaysOnMarket: number;
    soldProperties: number;
    rentalYield: number;
    vacancy: number;
  };
}

export interface SchoolData {
  name: string;
  type: 'primary' | 'secondary' | 'combined';
  sector: 'government' | 'catholic' | 'independent';
  rating?: number;
  distance: number;
}

export interface TransportData {
  type: 'train' | 'bus' | 'tram';
  name: string;
  distance: number;
}

export interface ShoppingData {
  name: string;
  type: 'supermarket' | 'shopping_centre' | 'retail';
  distance: number;
}

export interface HealthcareData {
  name: string;
  type: 'hospital' | 'medical_centre' | 'pharmacy';
  distance: number;
}

export interface AIInsight {
  type: 'market_trend' | 'price_prediction' | 'investment_advice' | 'suburb_analysis';
  title: string;
  content: string;
  confidence: number;
  timestamp: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  suburb?: string;
  serviceType?: 'appraisal' | 'management' | 'buying' | 'selling';
}

export interface ValuationRequest {
  address: string;
  suburb: string;
  propertyType: Property['propertyType'];
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize?: number;
  buildingSize?: number;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface ValuationResult {
  estimatedValue: {
    low: number;
    high: number;
    median: number;
  };
  confidence: number;
  comparableProperties: Property[];
  marketInsights: AIInsight[];
  reportUrl?: string;
}