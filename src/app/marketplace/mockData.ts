export interface NFT {
  id: string;
  name: string;
  image: string;
  price: number;
  previousPrice?: number;
  collection: string;
  seller: string;
  volume24h?: number;
  floorPrice?: number;
  description?: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
}

export const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Rainforest Guardian #1",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&auto=format&fit=crop",
    price: 2.5,
    previousPrice: 2.2,
    collection: "Rainforest Conservation",
    seller: "EcoGuardians",
    volume24h: 15.5,
    floorPrice: 2.3,
    description: "Support rainforest conservation efforts in the Amazon",
    attributes: [
      { trait_type: "Region", value: "Amazon" },
      { trait_type: "Impact", value: "High" }
    ]
  },
  {
    id: "2",
    name: "Ocean Cleanup #42",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    price: 1.8,
    previousPrice: 2.0,
    collection: "Ocean Warriors",
    seller: "BluePlanet",
    volume24h: 8.2,
    floorPrice: 1.7,
    description: "Help clean up plastic pollution in the Pacific Ocean",
    attributes: [
      { trait_type: "Ocean", value: "Pacific" },
      { trait_type: "Impact", value: "Medium" }
    ]
  },
  {
    id: "3",
    name: "Solar Energy Pioneer",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
    price: 3.2,
    previousPrice: 3.0,
    collection: "Renewable Energy",
    seller: "SunPower",
    volume24h: 25.8,
    floorPrice: 3.1,
    description: "Support solar energy projects in developing countries",
    attributes: [
      { trait_type: "Energy Type", value: "Solar" },
      { trait_type: "Impact", value: "High" }
    ]
  },
  
  {
    id: "5",
    name: "Tree Planting Initiative",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop",
    price: 1.5,
    previousPrice: 1.4,
    collection: "Forest Restoration",
    seller: "GreenEarth",
    volume24h: 18.9,
    floorPrice: 1.4,
    description: "Plant trees in deforested areas worldwide",
    attributes: [
      { trait_type: "Trees", value: "100+" },
      { trait_type: "Impact", value: "Medium" }
    ]
  },
  {
    id: "6",
    name: "Clean Air Project",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&auto=format&fit=crop",
    price: 2.8,
    previousPrice: 2.6,
    collection: "Air Quality",
    seller: "FreshAir",
    volume24h: 9.7,
    floorPrice: 2.7,
    description: "Improve air quality in urban areas",
    attributes: [
      { trait_type: "Location", value: "Urban" },
      { trait_type: "Impact", value: "High" }
    ]
  }
]; 