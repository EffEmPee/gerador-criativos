import {
  CarInfoT,
  generateImageStory,
  generateImageFeed,
} from "@/lib/generate-svg";
// const { Transformer } = await import("@napi-rs/image");
import { Resvg } from "@resvg/resvg-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mode: string }> }
) {
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);
  const mode = (await params).mode;

  const carInfo: CarInfoT = {
    year: searchParams.get("year") || "",
    model: searchParams.get("model") || "",
    brand: searchParams.get("brand") || "",
    version: searchParams.get("version") || "",
    gear: searchParams.get("gear") || "",
    price: Number(
      searchParams.get("price")?.replaceAll(".", "").replace(",", ".")
    ),
    bannerUrl: searchParams.get("bannerUrl") || "",
  };

  const svg =
    mode == "story"
      ? await generateImageStory(carInfo)
      : await generateImageFeed(carInfo);

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1080,
    },
  });

  const pngBuffer = resvg.render().asPng();

  return new NextResponse(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
