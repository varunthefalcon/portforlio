export const URL_GET_CSV =
  "https://fsicahb2ehpwcfly5ee424nm6y0rpmbe.lambda-url.eu-west-2.on.aws";

export const URL_CSV_PRESIGNED =
  "https://p6z5k4dbmkx6tyboeajiasmopm0mdfsx.lambda-url.eu-west-2.on.aws";

export const URL_GET_CSV_META =
  "https://ozc4tssqjehx2apoptol62ctdm0soyfe.lambda-url.eu-west-2.on.aws/";

export const URL_USER_CHAT =
  "https://2rpf67xgj7cz6i2ndojv7ffspe0kmphf.lambda-url.eu-west-2.on.aws/";

export const ATS_GPT_URL =
  "https://dpd4rzkklqwvb5jdyfg25vx2pu0xcmoy.lambda-url.eu-west-2.on.aws/";

export const uuid = () => {
  return Array.from(Array(16))
    .map((e) =>
      Math.floor(Math.random() * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")
    .match(/.{1,4}/g)
    .join("-");
};
