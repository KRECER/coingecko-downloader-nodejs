import * as stream from "stream";
import { promisify } from "util";
import axios from "axios";
import fs from "fs";
import path from "path";
import cheerio from "cheerio";

import { getImageExt } from "./utils.js";
import { ChainIdEnum, ChainNameEnum, selectors } from "./constants.js";

const finished = promisify(stream.finished);

const downloadTokenIcon = async (iconUrl, iconFilePath) => {
  const writer = fs.createWriteStream(iconFilePath);

  const options = {
    method: "get",
    url: iconUrl,
    responseType: "stream",
  };

  const res = await axios(options);
  res.data.pipe(writer);

  return finished(writer);
};

const createTokenIcon = async (address, iconUrl, chainName) => {
  const folderToBeCreatedPath = path.resolve(
    process.cwd(),
    "tokens",
    chainName
  );
  const logoName = `logo.${getImageExt(iconUrl)}`;
  const iconFolderPath = path.resolve(folderToBeCreatedPath, address);
  const iconFilePath = path.resolve(iconFolderPath, logoName);

  fs.mkdirSync(iconFolderPath, { recursive: true });
  await downloadTokenIcon(iconUrl, iconFilePath);
};

const downloadCoingeckoIcons = async (chainId) => {
  const chainName = ChainNameEnum[chainId];
  const hostname = `https://www.coingecko.com`;
  const chainNameQueryParam = `?asset_platform_id=${chainName}`;
  const response = await axios.get(`${hostname}${chainNameQueryParam}`);
  let $ = cheerio.load(response.data);
  const pagesCountTotal = $(selectors.pagination).prev().find("a").text();

  for (let i = 1; i <= pagesCountTotal; i++) {
    const currentPageQueryParam = `&page=${i}`;
    const pageCurrentResponse = await axios.get(
      `${hostname}${chainNameQueryParam}${currentPageQueryParam}`
    );

    $ = cheerio.load(pageCurrentResponse.data);
    const tokenElems = $(selectors.tokenTableRow);

    for (let i = 1; i < tokenElems.length; i++) {
      const tokenLogoAbsoluteLink = $(tokenElems[i])
        .find(selectors.tokenTableRowLogo)
        .attr("src");
      const tokenDetailsRelativeLink = $(tokenElems[i])
        .find(selectors.tokenTableRowLink)
        .attr("href");
      const tokenDetailsAbsoluteLink = `${hostname}${tokenDetailsRelativeLink}`;

      const tokenDetailsResponse = await axios.get(tokenDetailsAbsoluteLink);
      $ = cheerio.load(tokenDetailsResponse.data);
      const currentTokenAddress = $(selectors.tokenDetailsAddress)["0"].attribs[
        "data-address"
      ];

      console.log("currentTokenAddress", currentTokenAddress);

      await createTokenIcon(
        currentTokenAddress,
        tokenLogoAbsoluteLink,
        chainName
      );
    }
  }
};

downloadCoingeckoIcons(ChainIdEnum.eth);
