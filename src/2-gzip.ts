import * as cheerio from "cheerio";
import * as dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import * as zlib from "node:zlib";

dotenv.config();

const pathResolver = (p: string) => path.join(path.resolve() + p);

const main = async () => {
  const distDfeRequestXmlFile = fs.readFileSync(
    pathResolver("/out/dfe_response.xml")
  );

  const xml = cheerio.load(distDfeRequestXmlFile, { xml: { xmlMode: true } });
  const zips = xml("retDistDFeInt loteDistDFeInt docZip");

  const base64encoded = xml(zips[0]).text();
  const gzipped = Buffer.from(base64encoded, "base64");
  const gunzipped = zlib.gunzipSync(gzipped).toString();

  fs.writeFileSync(pathResolver("/out/test.xml"), gunzipped);
};

main();
