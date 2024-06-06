import * as core from "@actions/core";
import {
  createPublicClient,
  http,
  decodeFunctionData,
  decodeErrorResult,
} from "viem";
import { scroll } from "viem/chains";

const Badge_ABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "uid",
        type: "bytes32",
      },
    ],
    name: "badgeTokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

(async () => {
  try {
    const badge = JSON.parse(process.env.RESOLVED_BADGE_STR);
    const {
      attesterProxyAddress,
      badgeAddress,
      checkAPI,
      claimAPI,
      issuerName,
      issuerLogo,
      issuerURL,
    } = badge;
    const publicClient = createPublicClient({
      chain: scroll,
      transport: http(),
    });
    const metadataURL = await publicClient.readContract({
      address: badgeAddress,
      abi: Badge_ABI,
      functionName: "badgeTokenURI",
      args: [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ],
    });

    // {name, image, description}
    const metadata = await fetch(metadataURL).then((res) => res.json());

    const newBadge = {
      ...metadata,
      issuerName,
      issuerLogo,
      issuerURL,
      attesterProxyAddress,
      badgeAddress,
      checkAPI,
      claimAPI,
    };
    core.setOutput("new-badge", JSON.stringify(newBadge, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
