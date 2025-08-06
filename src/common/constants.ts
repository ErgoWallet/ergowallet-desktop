export const minBoxValue = 100_000;

export const termsVersion = "2020-09-12";

const BlocksPerHour = 30;
export const BlocksPerDay  = BlocksPerHour * 24;
const BlocksPerYear = BlocksPerDay * 365

// For how many blocks a box could be put into the state with no paying storage rent.
// 4 years ()
export const StoragePeriod = 4 * BlocksPerYear;