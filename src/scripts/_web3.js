import crypto_pool from "./crypto_pool.json";
import single_pool from "./single_pool.json";

async function get_crypto_pool() {
    const address = crypto_pool["deployment"]["address"];
    const abi = crypto_pool["abi"];

    return { "address": address, "abi": abi };
};

async function get_single_pool_abi() {
    const abi = single_pool["abi"];

    return { "abi": abi }
}

export { get_crypto_pool, get_single_pool_abi };