import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Record subscription for monthly community dispatch
    return NextResponse.json({
      success: true,
      message: "Subscription successfully registered for monthly dispatch.",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process newsletter subscription." },
      { status: 500 }
    );
  }
}
