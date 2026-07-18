export interface Property {
  id: string;
  image: string;
  title: string;
  description: string;
  type: "Apartment" | "House" | "Villa";
  price: number;
  priceStr: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    title: "The Malibu Sentinel",
    description: "An architectural marvel cantilevered over the Pacific coast. Includes private beach access, a glass-sided infinity pool, and custom smart-home tech.",
    type: "Villa",
    price: 18950000,
    priceStr: "$18,950,000",
    location: "Malibu, California",
    beds: 5,
    baths: 6,
    sqft: 6500,
  },
  {
    id: "prop-2",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    title: "The Bel Air Pavilion",
    description: "A sprawling estate boasting double-height ceilings, a wine lounge, fully equipped private cinema, and views over the Los Angeles basin.",
    type: "Villa",
    price: 24500000,
    priceStr: "$24,500,000",
    location: "Bel Air, California",
    beds: 6,
    baths: 7,
    sqft: 8200,
  },
  {
    id: "prop-3",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    title: "The Sunset Crest Villa",
    description: "A masterclass in organic architecture featuring native stone cladding, floating concrete stairs, and retractable walls of glass.",
    type: "Villa",
    price: 12800000,
    priceStr: "$12,800,000",
    location: "Los Angeles, California",
    beds: 4,
    baths: 5,
    sqft: 5100,
  },
  {
    id: "prop-4",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    title: "The Crestview Manor",
    description: "Nestled in private woodlands with majestic views. Designed with sustainable materials, a geothermal wellness spa, and an orchard path.",
    type: "House",
    price: 15200000,
    priceStr: "$15,200,000",
    location: "Beverly Hills, California",
    beds: 4,
    baths: 4.5,
    sqft: 6100,
  },
  {
    id: "prop-5",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    title: "Manhattan Sky Penthouse",
    description: "Experience the pinnacle of metropolitan elegance in this double-floor penthouse with towering glass facades and custom Italian marble throughout.",
    type: "Apartment",
    price: 8900000,
    priceStr: "$8,900,000",
    location: "New York City, New York",
    beds: 3,
    baths: 3.5,
    sqft: 3400,
  },
  {
    id: "prop-6",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    title: "Chelsea Glass Loft",
    description: "A highly sophisticated modern industrial style loft featuring exposed structural steel, custom rosewood casework, and massive steel windows.",
    type: "Apartment",
    price: 3450000,
    priceStr: "$3,450,000",
    location: "London, United Kingdom",
    beds: 2,
    baths: 2,
    sqft: 2200,
  },
  {
    id: "prop-7",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
    title: "Tokyo Minimalist Residence",
    description: "A serene minimalist concrete house built around a central open courtyard with a mature Japanese maple. Quiet luxury at its finest.",
    type: "House",
    price: 6100000,
    priceStr: "$6,100,000",
    location: "Tokyo, Japan",
    beds: 3,
    baths: 3,
    sqft: 2800,
  },
  {
    id: "prop-8",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    title: "Swiss Alps Alpine Chalet",
    description: "An exclusive warm wood chalet situated directly adjacent to ski runs. Boasts dynamic mountain range views, a sauna, and private wine cellar.",
    type: "House",
    price: 9800000,
    priceStr: "$9,800,000",
    location: "Zermatt, Switzerland",
    beds: 4,
    baths: 4,
    sqft: 4000,
  },
  {
    id: "prop-9",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    title: "Monaco Marina Penthouse",
    description: "Overlooking the prestigious yacht harbour. Features extensive marble sun decks, outdoor jacuzzi, private elevator access, and designer finishes.",
    type: "Apartment",
    price: 21000000,
    priceStr: "$21,000,000",
    location: "Monte Carlo, Monaco",
    beds: 4,
    baths: 4.5,
    sqft: 4800,
  },
];

export interface PropertiesFilter {
  search: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export async function fetchProperties(filters: PropertiesFilter): Promise<Property[]> {
  // Simulate network latency (800ms) for high-end feel
  await new Promise((resolve) => setTimeout(resolve, 800));

  let results = [...MOCK_PROPERTIES];

  // Robust Search (Matches title or location)
  if (filters.search.trim()) {
    const term = filters.search.toLowerCase();
    results = results.filter(
      (p) => p.title.toLowerCase().includes(term) || p.location.toLowerCase().includes(term)
    );
  }

  // Property Type Filtering
  if (filters.propertyType && filters.propertyType !== "all") {
    results = results.filter(
      (p) => p.type.toLowerCase() === filters.propertyType.toLowerCase()
    );
  }

  // Price Range Filtering
  if (filters.minPrice > 0) {
    results = results.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice > 0) {
    results = results.filter((p) => p.price <= filters.maxPrice);
  }

  // Sorting Logic
  if (filters.sortBy === "price-asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "price-desc") {
    results.sort((a, b) => b.price - a.price);
  }

  return results;
}
