import algosdk from "algosdk";

// ---- CONFIG ----
const ALGOD_SERVER = "https://testnet-api.algonode.cloud";
const ALGOD_PORT = ""; // HTTPS doesn't need port
const ALGOD_TOKEN = ""; // no token needed

export const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

export const testAlgodConnection = async () => {
  try {
    const status = await algodClient.status().do();
    console.log("Algod Status:", status);
    return status;
  } catch (error) {
    console.error("Algod Client Error:", error);
    throw error;
  }
};
