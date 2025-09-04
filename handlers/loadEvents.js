const fs = require("fs");
const path = require("path");

function loadEvents(client) {
    const eventsPath = path.join(__dirname, "../eventos");
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    console.log(`✅ ${eventFiles.length} eventos carregados.`);
}

module.exports = { loadEvents };
