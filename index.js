/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.saveOrder = (event, context) => {
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage()
  const bucket = storage.bucket('BUCKET NAME HERE')

  // Parse PubSub message.
  const pubsubMessage = JSON.parse(Buffer.from(event.data, 'base64').toString());
  
  // Define Message
  const order = pubsubMessage.data.message;
  var order_id = order.id;
    console.log( order_id );
    console.log(order);

    const timestamp = new Date().getTime()
    const fileName = order_id + `/${timestamp}.json`
    const file = bucket.file(fileName)
    const contents = JSON.stringify(order)
    return file.save(contents)

};
