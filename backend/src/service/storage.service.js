const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_pXA8TH2M80lo5d+BkVhcEBYgZas=",
  privateKey: "private_s3OWbhyLTLjR9VGPtspsAih5oJM=",
  urlEndpoint:"https://ik.imagekit.io/ADITYA07827",
});

async function uploadFile(file, filename){
  const response = await imagekit.upload({
    file: file,
    fileName: filename,
    folder: "ai_caption",
  });
  return response;
}

module.exports = uploadFile;