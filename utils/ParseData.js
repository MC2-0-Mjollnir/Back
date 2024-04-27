function parseDataString(dataString) {
    let trimmedString = dataString.slice(1, -1);
    let dataArray = trimmedString.split('},');
    let parsedData = [];

    dataArray.forEach(item => {
        item = item.replace(/[\[\]{}']/g, '').trim();
        
        let pairs = item.split(',');

        // Create an object to store the parsed data
        let obj = {};

        pairs.forEach(pair => {
            // Split the pair by colon to separate key and value
            let keyValue = pair.split(':');

            
            let key = keyValue[0].trim().replace(/'/g, '');
            let value = keyValue[1].trim().replace(/'/g, '');

            obj[key] = value;
        });

        // Push the parsed object into the parsedData array
        parsedData.push(obj);
    });

    // Return the parsed data structure
    return parsedData;
}

export default parseDataString