export interface Review {
  name: string;
  rating: number;
  comment: string;
  _id?: string;
  createdAt?: string;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  images: string[];
  beds?: number;
  baths?: number;
  sqft?: number;
  user?: string;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertiesFilter {
  search: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  page?: number;
  limit?: number;
}

export interface PropertiesResponse {
  data: Property[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function formatPrice(price: number): string {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export async function fetchProperties(filters: PropertiesFilter): Promise<PropertiesResponse> {
  const url = new URL("http://localhost:5000/api/v1/properties");

  if (filters.search.trim()) {
    url.searchParams.append("searchTerm", filters.search);
  }
  if (filters.propertyType && filters.propertyType !== "all") {
    url.searchParams.append("category", filters.propertyType);
  }
  if (filters.minPrice > 0) {
    url.searchParams.append("minPrice", filters.minPrice.toString());
  }
  if (filters.maxPrice > 0) {
    url.searchParams.append("maxPrice", filters.maxPrice.toString());
  }
  
  // Set pagination bounds
  url.searchParams.append("page", (filters.page || 1).toString());
  url.searchParams.append("limit", (filters.limit || 12).toString());

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch properties from server");
  }

  const json = await res.json();
  const results: Property[] = json.data || [];
  const meta = json.meta || {
    total: results.length,
    page: filters.page || 1,
    limit: filters.limit || 12,
    totalPages: Math.ceil(results.length / (filters.limit || 12)) || 1
  };

  // Sorting
  if (filters.sortBy === "price-asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "price-desc") {
    results.sort((a, b) => b.price - a.price);
  }

  return {
    data: results,
    meta,
  };
}

export async function fetchPropertyById(id: string): Promise<Property | undefined> {
  const res = await fetch(`http://localhost:5000/api/v1/properties/${id}`, {
    cache: "no-store",
  });
  
  if (res.status === 404) {
    return undefined;
  }
  
  if (!res.ok) {
    throw new Error("Failed to fetch property details from server");
  }

  const json = await res.json();
  return json.data;
}
