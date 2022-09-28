import * as fs from "node:fs";
import * as path from "node:path";
import * as soap from "soap";

const wsdl =
  "https://hom1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx?WSDL";

const p = path.join(path.resolve() + "/cert/cert.pfx");
const pfx = fs.readFileSync(p);

// const sec = new soap.ClientSSLSecurityPFX(pfx, "123456", {
//   rejectUnauthorized: false,
// });

const client = await soap.createClientAsync(wsdl);
