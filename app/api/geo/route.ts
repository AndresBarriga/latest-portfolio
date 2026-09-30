import { headers } from "next/headers";

// Runs per-request (never statically optimized) so it always reads the
// current visitor's geo header rather than a build-time snapshot.
export const dynamic = "force-dynamic";

// Returns only a coarse country code — never city, region, or the
// underlying IP address itself. Vercel sets this header at the edge from
// the request IP and strips the IP before it reaches app code.
export async function GET() {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country");

  return Response.json(
    { country: country ?? null },
    { headers: { "Cache-Control": "no-store" } }
  );
}
