import ImageKit from '@imagekit/nodejs';
import dotenv from "dotenv";

dotenv.config();

const imagekit = new ImageKit({
    privateKey: process.env.PRIVATE_KEY,
})

async function uploadFileToImage(filebuffer, filename){
    const uploadRes = await imagekit.files.upload({
        file: filebuffer.toString("base64"),
        fileName: filename,
    })
    return uploadRes
}

export { uploadFileToImage }