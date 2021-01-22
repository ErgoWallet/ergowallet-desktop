import {MoneyUnits} from "./MoneyUnits";

/**
 * Build MoneyUnits converting ERG into base units (nanoERG)
 * @param erg
 */
export function fromErg (erg: string): MoneyUnits {
  return MoneyUnits.fromMainUnits(erg, 9);
}

export function isHexString (value: string): boolean {
  if ((value === '') || (value === undefined))
    return false;
  const val = value.substring(0, 2) === '0x' ? value.substring(2) : value;
  return /^[0-9A-Fa-f]+$/.test(val);
}
