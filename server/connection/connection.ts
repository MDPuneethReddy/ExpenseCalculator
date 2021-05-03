import { createConnection, createConnections } from "typeorm"

export const connection=
    createConnection("development")