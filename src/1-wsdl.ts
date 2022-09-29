import * as cheerio from "cheerio";
import * as dotenv from "dotenv";
import got from "got";
import * as fs from "node:fs";
import * as path from "node:path";

dotenv.config();

const pathResolver = (p: string) => path.join(path.resolve() + p);

const main = async () => {
  const CERT_PFX = fs.readFileSync(pathResolver("/cert/cert.pfx"));

  const NF_E_DIST_URL =
    "https://hom1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx?WSDL";

  const distDfeRequestXmlFile = fs.readFileSync(
    pathResolver("/xml/distDfeRequest.xml")
  );

  const xml = cheerio.load(distDfeRequestXmlFile, { xml: { xmlMode: true } });

  const cnpjEl = xml("nfeDadosMsg distDFeInt CNPJ");
  cnpjEl.html(process.env.COMPANY_CNPJ);

  const response = await got
    .post(NF_E_DIST_URL, {
      body: xml.xml(),
      headers: { "Content-Type": "application/soap+xml" },
      https: { rejectUnauthorized: false, pfx: CERT_PFX, passphrase: "123456" },
    })
    .text();

  fs.writeFileSync(pathResolver("/out/test.xml"), response);
};

main();
