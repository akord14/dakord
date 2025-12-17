import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Marrim vetëm postimet e aprovuara me slug
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("status", "approved");

  const postUrls =
    posts?.map((post) => ({
      url: `https://www.akord.al/post/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : new Date(),
    })) || [];

  return [
    {
      url: "https://www.akord.al",
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
