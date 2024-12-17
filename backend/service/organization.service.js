import * as organizationUtils from "../utils/organization.utils.js";

export async function getOrganizationData() {
  // Fetch data from source
  // combined all await gets in one block to go at the same time
  // i gogole it as 'how to make promise go faster' and i found this https://dev.to/dperrymorrow/speed-up-your-code-with-promiseall-3d4i
  // but i'm still not into that timeouts.
  const [organizationNames, organizationLocations, organizationManagers] = await Promise.all([
    organizationUtils.getOrganizationNames(),
    organizationUtils.getOrganizationLocations(),
    organizationUtils.getOrganizationManagers(),
  ]);

  // Concatenate organizational data into a tidy collection
  return organizationUtils.concatenateOrganizationalData(organizationNames, organizationLocations, organizationManagers);
}
