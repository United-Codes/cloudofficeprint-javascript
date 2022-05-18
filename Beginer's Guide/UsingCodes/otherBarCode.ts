// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const wifi = new cop.elements.WiFiQRCode(
    'wifiBarCode',
    'ssid',
    'WPA',
    'password',
    false,
);
collection.add(wifi);

const telephoneNumber = new cop.elements.TelephoneNumberQRCode(
    'telephoneBarCode',
    '+9779823038377',
);
collection.add(telephoneNumber);


const email = new cop.elements.EmailQRCode(
    'emailName',
    'info@cloudofficeprint.com',//receiver
    'cc',
    'bcc',
    'Having Some trouble',//subject
    'Respected Sir,\n I need some guidance regarding how to use cloudofficeprint sdk. \nThank You',//body
);
collection.add(email)

const sms = new cop.elements.SMSQRCode(
    'smsName',
    '+9779823038377',//receiver Contact
    'Respected Sir,\n I need some guidance regarding how to use cloudofficeprint sdk. \nThank You',//message to be sent
);
collection.add(sms);


const url = new cop.elements.URLQRCode(
    'COP_link',//name
    'https://www.cloudofficeprint.com/',//url
);
collection.add(url);

const vCard = new cop.elements.VCardQRCode(
    'VCard',//name
    'Ramchandra',//first_name
    'KC',//last_name
    'ramchandra@apexrnd.be',//email
    'https://www.cloudofficeprint.com/',//website
);

collection.add(vCard);

const meCard = new cop.elements.MeCardQRCode(
    'MeCard',//name of Card
    'first_name',
    'last_name',
    'nickname',
    'email',
    'contact_primary',
    'contact_secondary',
    'contact_tertiary',
    'website',
    'birthday',
    'notes',
);
collection.add(meCard);

const geolocation = new cop.elements.GeolocationQRCode(
    'geoLocation',//Name of code
    '27.7172',//latitude
    '85.3240',//longitude
    '1400',//altitude
);

collection.add(geolocation);

const event = new cop.elements.EventQRCode(
    'eventName',
    'summary',
    'startdate',
    'enddate',
);
collection.add(event);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    "http://localhost:8010/",
    new cop.config.ServerConfig("YOUR_API_KEY"),
);

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/otherbarCode_template.docx'),
);

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile('./output/output_otherbarCode');
    }catch(err){
        console.log(err);
    }
})()