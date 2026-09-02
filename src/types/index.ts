import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "ARTIST" | "CUSTOMER";
      artistProfileId: string | null;
    };
  }

  interface User {
    id: string;
    role: string;
    artistProfileId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    artistProfileId: string | null;
  }
}

// Artist with full relations for display
export interface ArtistWithDetails {
  id: string;
  bio: string | null;
  studioName: string | null;
  city: string | null;
  district: string | null;
  address: string | null;
  experienceYears: number;
  minPrice: number;
  maxPrice: number;
  phone: string | null;
  instagram: string | null;
  isActive: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  styles: {
    tattooStyle: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
  portfolioItems: {
    id: string;
    imageUrl: string;
    title: string | null;
    description: string | null;
    styleName: string | null;
    createdAt: Date;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    customer: {
      name: string;
      avatar: string | null;
    };
  }[];
  _count?: {
    reviews: number;
    portfolioItems: number;
    appointments: number;
  };
  averageRating?: number;
}

export interface SearchFilters {
  query?: string;
  city?: string;
  style?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "rating" | "price_asc" | "price_desc" | "experience";
}
