/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import path from "path";
import satori from "satori";

const interB = fs.readFileSync(
  path.resolve(process.cwd(), "public/fonts/inter_b.ttf")
);
const interM = fs.readFileSync(
  path.resolve(process.cwd(), "public/fonts/inter_m.ttf")
);
const feedBuffer = fs.readFileSync(
  path.resolve(process.cwd(), "public/template-feed.png")
);
const storyBuffer = fs.readFileSync(
  path.resolve(process.cwd(), "public/template-story.png")
);

// const feedBuffer = fs.readFileSync("./public/template-feed.png");
const feed64 = feedBuffer.toString("base64");
// const storyBuffer = fs.readFileSync("./public/template-story.png");
const story64 = storyBuffer.toString("base64");

// const fontPromise = fetch(new URL('../../styles/opensans.ttf', import.meta.url)).then(
//   (res) => res.arrayBuffer(),
// );

const fonts = [
  {
    name: "Inter",
    data: interM,
    weight: 600 as any,
  },
  {
    name: "Inter",
    data: interB,
    weight: 800 as any,
  },
];

export type CarInfoT = {
  _id?: number;
  year: string;
  model: string;
  brand: string;
  version: string;
  gear: string;
  price: number;
  bannerUrl: string;
};

export async function generateImageFeed({
  year,
  model,
  brand,
  version,
  // gear,
  price,
  bannerUrl,
}: CarInfoT) {
  const htmlFeed = (
    <div style={{ display: "flex", fontWeight: 600 }}>
      <img
        src={`data:image/png;base64,${feed64}`}
        width="1080"
        height="1080"
        style={{ position: "absolute", left: 0, top: 0 }}
        alt={model}
      />
      <img
        src={bannerUrl}
        width="830"
        height="450"
        style={{
          position: "absolute",
          left: 125,
          top: 345,
          objectFit: "cover",
        }}
        alt={model}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 535,
          top: 793,
          left: 210,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "36px" }}>
          {brand} {model}
        </h1>
        <span style={{ fontSize: "36px", fontWeight: 800 }}>{year}</span>
      </div>
      <h2
        style={{
          position: "absolute",
          width: 580,
          top: 840,
          left: 210,
          fontSize: "32px",
          color: "#676767",
        }}
      >
        {version}
      </h2>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 680,
          top: 920,
          left: 210,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "48px",
            marginTop: "-36px",
          }}
        >
          R$
        </span>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
          }}
        >
          <h1
            style={{ fontSize: "120px", fontWeight: 800, lineHeight: "48px" }}
          >
            {price.toLocaleString("pt-BR")}
          </h1>
          <span
            style={{
              fontSize: "48px",
              // marginTop: "-36px",
            }}
          >
            ,00
          </span>
        </div>
      </div>
    </div>
  );

  const svg = await satori(htmlFeed, {
    width: 1080,
    height: 1080,
    fonts: fonts,
  });

  return svg;
}

export async function generateImageStory({
  year,
  model,
  brand,
  version,
  // gear,
  price,
  bannerUrl,
}: CarInfoT) {
  const htmlStory = (
    <div style={{ display: "flex", fontWeight: 600 }}>
      <img
        src={`data:image/png;base64,${story64}`}
        width="1080"
        height="1920"
        style={{ position: "absolute", left: 0, top: 0 }}
        alt={model}
      />
      <img
        src={bannerUrl}
        width="855"
        height="450"
        style={{
          position: "absolute",
          left: 125,
          top: 795,
          objectFit: "cover",
        }}
        alt={model}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 580,
          top: 1245,
          left: 210,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>
          {brand} {model}
        </h1>
        <span style={{ fontSize: "40px", fontWeight: 800 }}>{year}</span>
      </div>
      <h2
        style={{
          position: "absolute",
          width: 580,
          top: 1300,
          left: 210,
          fontSize: "32px",
          color: "#676767",
        }}
      >
        {version}
      </h2>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 680,
          top: 1380,
          left: 210,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "48px",
            marginTop: "-36px",
          }}
        >
          R$
        </span>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
          }}
        >
          <h1
            style={{ fontSize: "120px", fontWeight: 800, lineHeight: "48px" }}
          >
            {price.toLocaleString("pt-BR")}
          </h1>
          <span
            style={{
              fontSize: "48px",
              // marginTop: "-36px",
            }}
          >
            ,00
          </span>
        </div>
      </div>
    </div>
  );

  const svg = await satori(htmlStory, {
    width: 1080,
    height: 1920,
    fonts: fonts,
  });

  return svg;
}
