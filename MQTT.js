const mqtt = require('mqtt');
require('dotenv').config(); // Charger les variables d'environnement depuis un fichier .env

// Se connecter au broker MQTT
const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on('connect', function () {
  console.log('Connecté à MQTT Broker');
  // S'abonner à un topic
  client.subscribe('mon_topic', function (err) {
    if (!err) {
      console.log('Abonné au topic "mon_topic"');
      // Publier un message sur le topic
      client.publish('mon_topic', 'Hello MQTT');
    } else {
      console.error('Erreur lors de l\'abonnement au topic : ', err);
    }
  });
});

client.on('message', function (topic, message) {
  console.log(`Message reçu sur ${topic}: ${message.toString()}`);
});

client.on('error', function (err) {
  console.error('Erreur de connexion à MQTT Broker : ', err);
});