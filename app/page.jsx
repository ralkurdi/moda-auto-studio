import { supabaseServer } from "./_lib/supabase/server";
import { HomePageClient } from "./_components/home-page-client";

// Re-render on every request so the random featured-review pick rerolls
// each time a visitor refreshes the home. The Supabase query is fast
// (~30ms) so the cost is negligible at studio-scale traffic.
export const dynamic = "force-dynamic";

// Pull the pool of display-eligible reviews and pick one at random.
// Returns null on any error or empty result so the FEATURED REVIEW
// section hides cleanly rather than rendering empty quotes.
async function pickFeaturedReview() {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("reviews")
      .select("rating, body, author")
      .eq("display", true);

    if (error || !data || data.length === 0) return null;

    const pick = data[Math.floor(Math.random() * data.length)];
    return {
      rating: pick.rating,
      body: pick.body,
      author: pick.author,
    };
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const featuredReview = await pickFeaturedReview();
  return <HomePageClient featuredReview={featuredReview} />;
}
