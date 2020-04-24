// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
    projectId: 'my-servers-195101',
    keyFilename: "./config/my-servers-195101-b40a40b74b0e.json"});

async function createBucket(bucketName) {
    try {
        // Creates the new bucket
        console.log('---- createBucket ----');
        await storage.createBucket(bucketName);
        console.log(`Bucket ${bucketName} created.`);
    } catch (e) {
        console.log(e);
    }

}

async function listBuckets() {
    try {
        // Lists all buckets in the current project
        console.log('---- listBuckets ----');
        const [buckets] = await storage.getBuckets();
        console.log('Buckets:');
        buckets.forEach(bucket => {
            console.log(bucket.name);
        });
    } catch (e) {
        console.log(e);
    }

}

class GoogleCloudStorageService {

    static async uploadFile(fileName) {
        return new Promise((resolve, reject) => {
           resolve(">>> " + fileName + " Uploaded <<<");
        });
    }

    static async verifyAuthentication() {
        // Instantiates a client. If you don't specify credentials when constructing
        // the client, the client library will look for credentials in the
        // environment.
        // const storage = new Storage({
        //     projectId: 'project-id',
        //     keyFilename: 'service-ac-key.json'
        // });

        console.log(process.env);
        const storage = new Storage({
            'projectId': 'pijusk8',
            'keyFilename': '/Users/pijussarker/myws/design/gcp_keys/dpstore-service-ac-key.json'});
        return new Promise( async (resolve, reject) => {
            try {

                // Makes an authenticated API request.
                const results = await storage.getBuckets();

                const [buckets] = results;
                let bucketList = []

                console.log('Buckets:');
                buckets.forEach((bucket) => {
                    console.log(bucket.name);
                    bucketList.push(bucket.name);
                });
                resolve(bucketList);
            } catch (err) {
                console.error('ERROR:', err);
                reject(err);
            }
        });

    }
}



module.exports = {
    GoogleCloudStorageService: GoogleCloudStorageService,
    GCStorage: storage,
    verifyAuthentication: GoogleCloudStorageService.verifyAuthentication,
    createBucket: createBucket,
    listBuckets: listBuckets
}
