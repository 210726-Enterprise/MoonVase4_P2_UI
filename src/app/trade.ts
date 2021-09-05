import { currencyPair } from "./currencyPair";

export interface Trade {
    currencyPair: currencyPair,
    usdAmount: number
}