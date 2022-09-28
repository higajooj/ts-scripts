import got from "got";
import * as fs from "node:fs";
import * as path from "node:path";

// const url = "https://jsonplaceholder.typicode.com/posts/1";

const wsdl =
  "https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx?WSDL";

const p = path.join(path.resolve() + "/cert/cert.pfx");
const pfx = fs.readFileSync(p);

const res = await got(wsdl, {
  https: { rejectUnauthorized: false, pfx, passphrase: "123456" },
}).text();

console.log(res);
