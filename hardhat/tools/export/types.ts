export type ExportContractSpec = {
  exportName: string;
  artifactName: string;
  address: string;
};

export type ExportDeploymentOptions = {
  generatedDir: string;
  deploymentId: string;
  chainId: number | bigint;
  networkName: string;
  contracts: ExportContractSpec[];
};
