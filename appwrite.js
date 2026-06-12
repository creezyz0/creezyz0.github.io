import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("6a2c479b0029c79209c6");

const account = new Account(client);
const databases = new Databases(client);

// Verbindung direkt verifizieren
client.ping();
console.log("Appwrite: Ping wurde gesendet.");

export { client, account, databases };