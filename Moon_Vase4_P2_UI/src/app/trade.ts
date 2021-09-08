import { currencyPair } from "./currencyPair";

export interface Trade {
    currencyPair: currencyPair;
    usdAmount: number;
    timestamp: Date;
    rate: string|number|Date; // ouch
}