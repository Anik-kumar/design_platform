// require('dotenv').load();
const dotenv = require('dotenv');
dotenv.config();
const {Storage} = require('@google-cloud/storage');


console.log(process.env);
async function testGCStore() {
    try {
        const storage = new Storage({
        'projectId': 'pijusk8',
        'keyFilename': '/Users/pijussarker/myws/design/gcp_keys/dpstore-service-ac-key.json'});
                    
        // Makes an authenticated API request.
        const results = await storage.getBuckets();
    
        const [buckets] = results;
        let bucketList = []
    
        console.log('Buckets:');
        buckets.forEach((bucket) => {
            console.log(bucket.name);
            bucketList.push(bucket.name);
        });
    } catch (err) {
        console.error('ERROR:', err);
    }
}

testGCStore()
