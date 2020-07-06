const express = require('express'),
    seleniumWebdriver = require('selenium-webdriver'),
    Capability = seleniumWebdriver.Capability;

async function run() {
    const server = await startServer();
    await runSeleniumTest();
    server.close();
}

function startServer() {
    const app = express();
    app.use(express.static('public'));

    return new Promise(resolve => {
        const server = app.listen(8888, () => {
            console.log('Server listening on port 8888');
            resolve(server);
        });
    });
}

async function runSeleniumTest() {
    const driver = new seleniumWebdriver.Builder()
        .withCapabilities({
            [Capability.BROWSER_NAME]: 'firefox'// 'internet explorer'
        })
        .build();

    await driver.get('http://localhost:8888/');

    for (let i = 1; i <= 10; i++) {
        const result = await driver.executeScript('return 1');
        if (result === 1) {
            console.log(`${i}/10 ok`);
        } else {
            console.log(`${i}/10: Expected 1 but got ${result}`);
        }
        await delay(250);
    }

    console.log("Done");
    driver.quit();
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

run();