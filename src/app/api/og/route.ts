import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const savings = parseInt(searchParams.get("savings") ?? "0");
  const spend = parseInt(searchParams.get("spend") ?? "0");
  const id = searchParams.get("id") ?? "";

  const savingsDisplay = savings > 0 ? `$${savings.toLocaleString()}/mo` : "Optimised";
  const headline =
    savings > 0
      ? `$${savings.toLocaleString()}/mo in savings found`
      : "Your AI stack is well optimised";

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0A0F"/>
      <stop offset="100%" stop-color="#1A1A2E"/>
    </linearGradient>
    <radialGradient id="glow" cx="75%" cy="35%" r="50%">
      <stop offset="0%" stop-color="#C8FF00" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#C8FF00" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  
  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="4" fill="#C8FF00"/>
  
  <!-- Logo -->
  <rect x="60" y="60" width="44" height="44" rx="10" fill="#FFFFFF" fill-opacity="0.1"/>
  <text x="82" y="90" font-family="system-ui,sans-serif" font-weight="800" font-size="20" fill="#C8FF00" text-anchor="middle">A</text>
  <text x="116" y="90" font-family="system-ui,sans-serif" font-weight="700" font-size="20" fill="#FFFFFF">auditly</text>
  
  <!-- Main headline -->
  <text x="60" y="200" font-family="system-ui,sans-serif" font-weight="800" font-size="64" fill="#FFFFFF" letter-spacing="-2">${headline.replace(/&/g, "&amp;")}</text>
  
  <!-- Subheadline -->
  <text x="60" y="270" font-family="system-ui,sans-serif" font-weight="400" font-size="28" fill="#FFFFFF" fill-opacity="0.5">AI spend audit · ${id ? id.slice(0, 8) + "…" : "Free tool by Credex"}</text>
  
  <!-- Stats boxes -->
  <rect x="60" y="340" width="280" height="120" rx="16" fill="#FFFFFF" fill-opacity="0.06"/>
  <text x="80" y="378" font-family="system-ui,sans-serif" font-weight="400" font-size="14" fill="#FFFFFF" fill-opacity="0.4" letter-spacing="2">MONTHLY SAVINGS</text>
  <text x="80" y="430" font-family="system-ui,sans-serif" font-weight="800" font-size="44" fill="#C8FF00">${savingsDisplay}</text>
  
  <rect x="368" y="340" width="280" height="120" rx="16" fill="#FFFFFF" fill-opacity="0.06"/>
  <text x="388" y="378" font-family="system-ui,sans-serif" font-weight="400" font-size="14" fill="#FFFFFF" fill-opacity="0.4" letter-spacing="2">CURRENT SPEND</text>
  <text x="388" y="430" font-family="system-ui,sans-serif" font-weight="800" font-size="44" fill="#FFFFFF">$${spend.toLocaleString()}/mo</text>
  
  <!-- CTA -->
  <rect x="60" y="510" width="360" height="58" rx="12" fill="#C8FF00"/>
  <text x="240" y="546" font-family="system-ui,sans-serif" font-weight="700" font-size="18" fill="#0A0A0F" text-anchor="middle">Run your free audit →</text>
  
  <!-- Bottom right decoration -->
  <circle cx="1050" cy="480" r="180" fill="#4FACFE" fill-opacity="0.04"/>
  <circle cx="1100" cy="520" r="100" fill="#C8FF00" fill-opacity="0.04"/>
  
  <!-- Credex tag -->
  <text x="1140" y="590" font-family="system-ui,sans-serif" font-weight="400" font-size="14" fill="#FFFFFF" fill-opacity="0.2" text-anchor="end">by credex.rocks</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
