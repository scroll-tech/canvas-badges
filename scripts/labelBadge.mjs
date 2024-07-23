import * as core from "@actions/core";
import * as github from "@actions/github";

(async () => {
  try {
    const labels = github.context.payload.issue.labels.map(
      (label) => label.name
    );
    let type;
    if (labels.includes("Airdropped")) {
      type = "airdropped";
    } else if (labels.includes("Backend-authorized")) {
      type = "backend-authorized";
    } else if (labels.includes("Permissionless")) {
      type = "permissionless";
    } else {
      console.error(
        "The badge type must be one of the following: Airdropped, Backend-authorized, or Permissionless."
      );
      process.exit(1);
    }
    core.setOutput("type", type);
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
