import * as fs from 'fs';

export function readFromFile(filename: string, callback: 
    (err: NodeJS.ErrnoException | null, buffer: string) => void) {
    return fs.readFile(filename, "utf8", callback);
}

export function writeToFile(filename: string, arrayToWrite: Object[]) {
    fs.writeFile(filename, JSON.stringify(arrayToWrite, null, 2), "utf8", (err) => {
        if(err) {
            console.log(err)
            throw err;
        } 
    });
}