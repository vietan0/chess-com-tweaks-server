import { type NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ welcome: "Chess.com Tweaks Server" });
}

export async function POST(req: NextRequest) {
  try {
    const { url, lila2Cookie } = await req.json();

    const res = await fetch(url, {
      headers: {
        Cookie: `lila2=${lila2Cookie}`,
      },
    });

    if (res.status === 401)
      return NextResponse.json("Authorization Required", { status: 401 });

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
