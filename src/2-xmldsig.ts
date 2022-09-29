import * as fs from "node:fs";
import * as path from "node:path";

("https://hom1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx?WSDL");

const p = path.join(path.resolve() + "/cert/cert.pfx");
const pfx = fs.readFileSync(p);
