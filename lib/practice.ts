import { DOMParser } from "deno-dom";

interface CoachingProfile {
  name: string;
  title: string;
  bio: string;
  location: string;
  website: string;
  social: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  testimonials: Array<{
    text: string;
    author: string;
  }>;
  schedulers: Array<{
    title: string;
    duration: number;
    description: string;
    bookingUrl: string;
  }>;
  packages: Array<{
    title: string;
    description: string;
    totalSessions: number;
    price: number;
    currency: string;
  }>;
}

export interface Options {
  /** URLs of coaching profiles to fetch */
  profiles: string[];
  /** Cache duration in seconds (default: 3600) */
  cacheDuration?: number;
  /** Callback function to be called on successful data fetch */
  onSuccess?: (data: unknown) => Promise<void>;
}

async function fetchProfile(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch profile from ${url}: ${response.statusText}`);
  }
  return await response.text();
}

function extractProfileData(html: string): Promise<CoachingProfile> {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  const jsonData = JSON.parse(document?.querySelector('#__NEXT_DATA__')?.textContent || '{}');
  const profileData = jsonData.props.pageProps.data;
  return Promise.resolve({
    name: `${profileData.firstName} ${profileData.lastName}`,
    title: profileData.title,
    bio: profileData.bio,
    location: profileData.coachLocation,
    website: profileData.website,
    social: {
      instagram: profileData.socialLinks?.instagram,
      twitter: profileData.socialLinks?.twitter,
      linkedin: profileData.socialLinks?.linkedin,
    },
    testimonials: profileData.testimonials.map((t: any) => ({
      text: t.text,
      author: t.name,
    })),
    schedulers: profileData.schedulers
      .filter((s: any) => s.status === 'active')
      .map((s: any) => ({
        title: s.title,
        duration: s.duration,
        description: s.description,
        bookingUrl: `https://${profileData.domains.domainName}/me/${profileData.slug}/book/${s.slug}`,
      })),
    packages: profileData.packages
      ?.filter((p: { status: string; }) => p.status === 'active')
      ?.map((p: any) => ({
        title: p.title,
        description: p.description,
        totalSessions: p.totalSessions,
        price: p.paymentOptions?.[0]?.amount,
        currency: p.paymentOptions?.[0]?.currency,
      })) || [],
  });
}

export default function (options: Options) {
  return (site: Lume.Site) => {
    // Register the plugin to run before build
    site.addEventListener("beforeBuild", async () => {
      console.log("🔄 Starting coaching profile fetch...");
      const practiceData: Record<string, CoachingProfile> = {};

      // Fetch and process each profile
      for (const url of options.profiles) {
        try {
          console.log(`📥 Fetching profile from ${url}`);
          const html = await fetchProfile(url);
          const profile = await extractProfileData(html);
          const profileId = url.split('/').pop() || 'profile';
          practiceData[profileId] = profile;
          console.log(`✓ Processed profile: ${profileId}`);
        } catch (error) {
          console.error(`❌ Error processing profile ${url}:`, error);
        }
      }

      // Write data file
      try {
        await Deno.mkdir(`${site.options.src}/`, { recursive: true });
        const dataPath = `${site.options.src}/_data.json`;
        await Deno.writeTextFile(dataPath, JSON.stringify(practiceData, null, 2));
        console.log(`✓ Wrote coaching data to ${dataPath}`);

        if (options.onSuccess) {
          await options.onSuccess(practiceData);
          console.log("✓ Executed onSuccess callback");
        }
      } catch (error) {
        console.error("❌ Error writing data:", error);
      }
    });
  };
}
