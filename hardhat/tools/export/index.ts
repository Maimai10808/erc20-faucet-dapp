import hre from "hardhat";
import fs from "node:fs/promises";
import path from "node:path";
import type { ExportContractSpec, ExportDeploymentOptions } from "./types.js";

function toConstExport(name: string, value: unknown) {
  return `export const ${name} = ${JSON.stringify(value, null, 2)} as const;`;
}

function normalizeAddressExportName(exportName: string) {
  return `${exportName}Address`;
}

function normalizeAbiExportName(exportName: string) {
  return `${exportName}Abi`;
}

async function buildContractsTs(options: ExportDeploymentOptions) {
  const contractEntries: string[] = [];

  for (const contract of options.contracts) {
    const artifact = await hre.artifacts.readArtifact(contract.artifactName);

    contractEntries.push(
      toConstExport(
        normalizeAddressExportName(contract.exportName),
        contract.address,
      ),
    );

    contractEntries.push("");

    contractEntries.push(
      toConstExport(normalizeAbiExportName(contract.exportName), artifact.abi),
    );

    contractEntries.push("");
  }

  const deploymentMeta = {
    deploymentId: options.deploymentId,
    chainId:
      typeof options.chainId === "bigint"
        ? Number(options.chainId)
        : options.chainId,
    networkName: options.networkName,
    exportedAt: new Date().toISOString(),
  };

  contractEntries.push(toConstExport("deploymentMeta", deploymentMeta));

  return `/* eslint-disable */\n\n${contractEntries.join("\n")}\n`;
}

function buildDeploymentMetaJson(options: ExportDeploymentOptions) {
  const contracts = Object.fromEntries(
    options.contracts.map((contract: ExportContractSpec) => [
      contract.exportName,
      {
        artifactName: contract.artifactName,
        address: contract.address,
      },
    ]),
  );

  return {
    deploymentId: options.deploymentId,
    chainId:
      typeof options.chainId === "bigint"
        ? Number(options.chainId)
        : options.chainId,
    networkName: options.networkName,
    contracts,
    exportedAt: new Date().toISOString(),
  };
}

export async function exportDeploymentArtifacts(
  options: ExportDeploymentOptions,
) {
  await fs.mkdir(options.generatedDir, { recursive: true });

  const contractsTs = await buildContractsTs(options);
  const deploymentMetaJson = buildDeploymentMetaJson(options);

  await fs.writeFile(
    path.join(options.generatedDir, "contracts.ts"),
    contractsTs,
    "utf8",
  );

  await fs.writeFile(
    path.join(options.generatedDir, "deployment.meta.json"),
    JSON.stringify(deploymentMetaJson, null, 2),
    "utf8",
  );
}
