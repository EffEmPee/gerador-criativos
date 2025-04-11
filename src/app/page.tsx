"use client";
import { CarInfoT } from "@/lib/generate-svg";
import JSZip from "jszip";
import { useCallback, useState } from "react";

const statusMessage = {
  "": "Insira as URL's",
  gerar: "Clique para gerar as imagens",
  carregando: "Obtendo detalhes...",
  gerando: "Gerando imagens...",
  completo: "Imagens disponíveis",
  erro: "Ocorreu um erro",
  invalido: "As URL's não são válidas",
};

export default function Home() {
  const [links, setLinks] = useState("");
  const [zipUrl, setZipUrl] = useState("");
  const [status, setStatus] = useState<
    "" | "gerar" | "carregando" | "gerando" | "completo" | "erro" | "invalido"
  >("");

  const handleGenerateFromLinks = useCallback(async () => {
    const zip = new JSZip();

    const linksArray = links
      .split(/\r?\n|\r|\n/g)
      .map((link) => link.trim())
      .filter((link) => link);

    for (const l of linksArray) {
      console.log(l);
      if (!l.startsWith("https://www.geracaoseminovos.com.br")) {
        setStatus("invalido");
        return;
      }
    }

    setStatus("carregando");

    try {
      const carInfos: CarInfoT[] = await Promise.all(
        linksArray.map(async (link, i) => {
          const res = await fetch(
            "/api/car-info?" +
              new URLSearchParams({
                url: link,
              })
          );
          const data = await res.json();
          return { _id: i, ...data };
        })
      );

      setStatus("gerando");

      await Promise.all(
        carInfos.map(async (infos) => {
          const resS = await fetch(
            "/api/generate/story?" +
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              new URLSearchParams(infos as any)
          );
          const blobS = await resS.blob();
          zip.file(
            `${infos._id}-${infos.model
              .toLowerCase()
              .replaceAll(" ", "-")}-story.png`,
            blobS
          );

          const resF = await fetch(
            "/api/generate/feed?" +
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              new URLSearchParams(infos as any)
          );
          const blobF = await resF.blob();
          zip.file(
            `${infos._id}-${infos.model
              .toLowerCase()
              .replaceAll(" ", "-")}-feed.png`,
            blobF
          );
        })
      );
    } catch {
      setStatus("erro");
      return;
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    setZipUrl(URL.createObjectURL(zipBlob));
    setStatus("completo");
  }, [links]);

  return (
    <div className="bg-white w-full flex flex-col min-h-svh text-black p-12">
      <h1 className="font-semibold text-2xl">
        Insira URL&apos;s separadas em cada linha
      </h1>
      <div className="flex p-2 text-gray-700 text-sm gap-2">
        <span>Ex:</span>
        <p>
          https://www.geracaoseminovos.com.br/seminovos/...<br></br>
          https://www.geracaoseminovos.com.br/seminovos/...
        </p>
      </div>
      <textarea
        value={links}
        onChange={(t) => {
          setStatus(t.target.value.length == 0 ? "" : "gerar");
          setLinks(t.target.value);
        }}
        className="w-full md:w-2/3 max-w-2xl  min-h-[30vh] max-h-[30vh] p-3 resize-none text-black border-2 border-black rounded-xl"
      />
      <div className="flex justify-start gap-5 items-center w-full md:w-2/3  max-w-2xl mt-5">
        <button
          className="py-2 px-4 bg-black text-white font-bold rounded-lg cursor-pointer"
          onClick={handleGenerateFromLinks}
        >
          Gerar imagens
        </button>
        {status == "completo" && (
          <a
            className="py-2 px-4 bg-black text-white font-bold rounded-lg cursor-pointer"
            href={zipUrl}
            download="imagens.zip"
          >
            Baixar
          </a>
        )}
        <span
          style={{ color: ["erro", "invalido"].includes(status) ? "red" : "" }}
          className="text-gray-700 font-bold ml-auto"
        >
          {statusMessage[status]}
        </span>
      </div>
    </div>
  );
}
