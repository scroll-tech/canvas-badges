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
    const type = process.env.BADGE_TYPE;
    console.log(type, "type");
    let {
      badgeContract,
      attesterProxy,
      baseUrl,
      issuerName,
      issuerURL,
      eligibilityCheck,
    } = badge;
    badgeContract = badgeContract.trim();
    issuerName = issuerName.trim();
    issuerURL = issuerURL.trim();

    const publicClient = createPublicClient({
      chain: scroll,
      transport: http(),
    });
    const metadataURL = await publicClient.readContract({
      address: badgeContract,
      abi: Badge_ABI,
      functionName: "badgeTokenURI",
      args: [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ],
    });
    const accessableURL = metadataURL.replace(
      /^ipfs:\/\/(.*)/,
      "https://ipfs.io/ipfs/$1"
    );
    let { name, image, description } = await fetch(metadataURL).then((res) =>
      res.json()
    );
    image = image.replace(/^ipfs:\/\/(.*)/, "https://ipfs.io/ipfs/$1");

    const { data } = await fetch(
      `https://ecosystem-list-api.vercel.app/api/query?name=${issuerName}`
    ).then((res) => res.json());
    if (!data.length) {
      console.error("Unable to find the relevant data in the ecosystem list!");
      process.exit(1);
    }
    const [{ name: issuerFullName, ext, website }] = data;
    const issuerLogo = `https://scroll-eco-list.netlify.app/logos/${issuerFullName}${ext}`;

    const issuer = {
      name: issuerFullName,
      logo: issuerLogo,
      origin: issuerURL || website,
    };
    let newBadge = {
      name,
      image,
      description,
      badgeContract,
      issuer: {
        name: issuerFullName,
        logo: issuerLogo,
        origin: issuerURL || website,
      },
      native: false,
    };

    let extraProperties = {};

    if (type === "airdropped") {
      baseUrl = baseUrl.trim().replace(/(.*)\/$/g, "$1");

      extraProperties = {
        airdrop: true,
        baseUrl,
      };
    } else if (type === "backend-authorized") {
      attesterProxy = attesterProxy.trim();
      baseUrl = baseUrl.trim().replace(/(.*)\/$/g, "$1");

      extraProperties = {
        attesterProxy,
        baseUrl,
      };
    } else if (type === "permissionless") {
      eligibilityCheck = eligibilityCheck === "Yes" ? true : false;

      extraProperties = {
        eligibilityCheck,
      };
    }

    newBadge = { ...newBadge, ...extraProperties };

    core.setOutput("new-badge", JSON.stringify(newBadge, null, 2));
    core.setOutput("new-badge_name", name.split(" ").join("_"));
    core.setOutput("new-badge_issuerName", issuerFullName.split(" ").join("_"));
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
