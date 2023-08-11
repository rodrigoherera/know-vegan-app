import Constants from "expo-constants";
import envDev from "./env/env.dev";
import envStg from "./env/env.stg";
import envLive from "./env/env.live";

const ENV = {
  dev: envDev,
  stg: envStg,
  live: envLive,
};

const getEnvironment = () => {
  const releaseChannel = Constants.manifest.releaseChannel;

  if (releaseChannel === undefined) {
    return ENV.dev;
  }

  if (releaseChannel.indexOf("stg") !== -1) {
    return ENV.stg;
  }

  if (releaseChannel.indexOf("live") !== -1) {
    return ENV.live;
  }

  return ENV.dev;
};

export default getEnvironment();
