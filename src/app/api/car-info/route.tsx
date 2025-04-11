import { CarInfoT } from "@/lib/generate-svg";
import * as cheerio from "cheerio";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const carUrl =
    new URLSearchParams(request.nextUrl.searchParams).get("url") || "";
  // console.log(carUrl);

  const $ = await cheerio.fromURL(carUrl);

  // const rawHtml = fetch(carUrl).then(async res => await res.text()).catch(err => console.log("Error fetching car info", err));
  // console.log($("meta[name*=auto_layer_vehicle]").map((i, meta) => $(meta).attr('content')).toArray());
  const carInfo: CarInfoT = {
    year: $("meta[name*=auto_layer_vehicle_year]").attr("content") || "",
    model: $("meta[name*=auto_layer_vehicle_model]").attr("content") || "",
    version: $("meta[name*=auto_layer_vehicle_version]").attr("content") || "",
    brand: $("meta[name*=auto_layer_vehicle_brand]").attr("content") || "",
    gear: $("meta[name*=auto_layer_vehicle_gear_box]").attr("content") || "",
    price: Number(
      $("*[data-vehicle-price]")
        .attr("data-vehicle-price")
        ?.replaceAll(".", "")
        .replace(",", ".")
    ),
    bannerUrl: $("meta[property=og:image]").attr("content") || "",
  };

  return Response.json(carInfo);
}
