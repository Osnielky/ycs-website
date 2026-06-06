import { NextResponse } from "next/server";

const BUSINESS_NAME = "Your Cosmetic Surgery & Spa";
const PLACES_BASE = "https://maps.googleapis.com/maps/api/place";

export interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export interface ReviewsResponse {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GOOGLE_PLACES_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    // Step 1: resolve Place ID from business name
    const searchRes = await fetch(
      `${PLACES_BASE}/findplacefromtext/json?input=${encodeURIComponent(BUSINESS_NAME)}&inputtype=textquery&fields=place_id&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const searchData = await searchRes.json();

    if (!searchData.candidates?.length) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const placeId: string = searchData.candidates[0].place_id;

    // Step 2: fetch place details including reviews
    const detailsRes = await fetch(
      `${PLACES_BASE}/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}&reviews_sort=newest&language=en`,
      { next: { revalidate: 3600 } }
    );
    const detailsData = await detailsRes.json();
    const { rating, user_ratings_total, reviews } = detailsData.result;

    const filtered = (reviews ?? []).filter(
      (r: GoogleReview) => r.text?.trim() && r.rating >= 4
    );

    return NextResponse.json({
      rating: rating ?? 0,
      totalReviews: user_ratings_total ?? 0,
      reviews: filtered,
    } satisfies ReviewsResponse);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
