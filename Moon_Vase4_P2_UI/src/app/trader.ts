import { Account } from "./account";

export interface Trader {
    id: number,
    account: Account;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}