import { Account } from "./account";

export interface Trade {
    currencyPair: {
        id: number
    },
    usdAmount: number
}