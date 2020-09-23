import {MoneyUnits} from "./MoneyUnits";

/**
 * Build MoneyUnits converting ERG into base units (nanoERG)
 * @param erg
 */
export function fromErg (erg: string): MoneyUnits {
  return MoneyUnits.fromMainUnits(erg, 9);
}
