import {
  CarInfoT,
  generateImageStory,
  generateImageFeed,
} from "@/lib/generate-svg";
const { Transformer } = await import("@napi-rs/image");
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  response: NextResponse,
  { params }: { params: { mode: string } }
) {
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);

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
    params.mode == "story"
      ? await generateImageStory(carInfo)
      : await generateImageFeed(carInfo);

  // console.log(svg);

  // const url = (await renderPNG?.({
  //   svg: svg,
  //   width: 1080,
  // })) as string;

  // const pngBuffer = new Resvg(Buffer.from(svg)).render().asPng();

  // const pngBuffer = await Transformer.fromSvg(svg).png();

  // return NextResponse.json({ image: url });

  const pngBuffer = await Transformer.fromSvg(svg).png();

  return new NextResponse(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });

  // return new NextResponse(pngBuffer, {
  //   headers: {
  //     "Content-Type": "image/png",
  //     "Content-Length": pngBuffer.length.toString(),
  //   },
  // });
}
