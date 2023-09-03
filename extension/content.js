// Initialize the mappings variable as an empty object.
var entityMappingList = [];
var randomUserList = [];
var randomDateList = [];
let promises = [];

// API token
var apiToken;

// Active flag
var currentActiveStatus = true;

// Manually disabled
var isDisable = false;

// Is Typing
var isTyping = false

// Find the textarea element with the ID "prompt-textarea"
var textarea = document.getElementById("prompt-textarea");
var timeout = null; // Initialize timeout variable

var personEntityMappings, cardinalEntityMappings, dateEntityMappings, orgEntityMappings,
    gpeEntityMappings, locEntityMappings, norpEntityMappings, productEntityMappings,
    percentEntityMappings, moneyEntityMappings;

var oldTextArea = "";
var scriptIsChanging = false;
var anonymizedResponseInstance = "";
var rawText = "";
let sanitizedText = "";
var dotsAndSpaces = /^(\.*\s*)*$/;
//var isLastTextAreaUpdate = false;
var numberRegEx = /^\d+$/;
var percentRegEx = /^\d+%$/;
var titleNameRegex = /(M|Mr|Mrs|Miss)\.*\s/;
var moneyRegex = /^\d+(\$|\€)$/;

// Dictionnaries to replace some entities
var productList = ["Nebula", "Echolight", "Zephyr", "Flux", "Vertex", "Vortex", "Halo", "Eon", "Ion", "Quark", "Prowler", "Odyssey", "Striker", "Falcon", "Voyager", "Rover", "Phantom", "Dart", "Marauder", "Stallion", "SunBites", "MoonMelt", "StarSnack", "NebulaNuggets", "GalaxyGranola", "CometCrunch", "PulsarPops", "QuasarQuesadillas", "OrbitOlives", "MarsMuffins", "ByteBolt", "PixelPulse", "TechTide", "InfoIon", "DataDart", "SignalStar", "QuarkQuill", "Quantum", "Neutron", "Pico", "ZestZen", "PurePulse", "NutriNova", "QuickQuasar", "SizzleStar", "GalaxyGrind", "CookComet", "BakeBlast", "DiceDawn", "FrothFountain", "Epoch", "Legacy", "Elysium", "Prologue", "Papyrus", "Verso", "Folio", "QuillQuire", "Novella", "Mythos", "GreenGrip", "TerraTamer", "LeafLover", "EcoEase", "BloomBlade", "RootRake", "SoilScoop", "PetalPusher", "BudBuddy", "SproutSpade", "ProPulse", "MaxFlex", "FitFlow", "BodyBoost", "CardioCore", "AgileAxis", "FlexFit", "PowerPulse", "SweatStream", "WellnessWave", "WildPath", "NightNavigator", "TerraTrek", "RidgeRunner", "CampCompanion", "SummitSeeker", "TrailTamer", "PeakPioneer", "HorizonHiker", "Outlander", "Melodia", "Harmony", "Crescendo", "RhythmRider", "SonicStrum", "EchoEclipse", "Serenade", "Cadence", "Tempo", "Aria"];
var orgList = ["Quantum Quills", "Fusion Futures", "Stellar Sails", "Pulsar Productions", "Nebula Networks", "Cybernetic Circuits", "Proton Prospects", "Galactic Grains", "Voyager Ventures", "Harmonic Health", "Echo Energy", "Astro Aegis", "Orion Oceans", "Phoenix Photonics", "Centurion Cybernetics", "Triton Technologies", "Epsilon Enterprises", "Cosmic Creations", "Virtuoso Visions", "Meridian Motors", "Radiant Robotics", "Sonic Systems", "Astra Advancements", "Lunar Labs", "Nexus Networks", "Nova Nectars", "Penta Productions", "Quasar Quilts", "Raven Robotics", "Spectrum Systems", "Titan Technologies", "Urania Utilities", "Vector Ventures", "Wayfarer Wines", "Xenon Xanadu", "Zephyr Zenith", "Helix Heights", "Aeon Architectures", "Neptune Navigations", "Omega Outlets", "Saturn Systems", "Vega Ventures", "Elysian Empires", "Luminous Landscapes", "Chronos Creations", "Aurora Agencies", "Galileo Galleries", "Terra Tech", "Serenity Systems", "Pegasus Productions", "Rhapsody Robotics", "Cosmos Co-operations", "Infinite Innovations", "Hydra Health", "Intergalactic Institutions", "Jupiter Jets", "Kraken Kinetics", "Olympus Omnimedia", "Athena Arts", "Martian Motors", "Asteroid Agencies", "Pandora Productions", "Solar Systems", "Stardust Studios", "Titanium Technologies", "Polaris Productions", "Rigel Robotics", "Galaxy Gardens", "Moonlight Media", "Harmony Health", "Delta Designs", "Celestial Creations", "Pioneer Pharmaceuticals", "Ethereal Energy", "Spacetime Studios", "Astro Arts", "Nova Networks", "Pulse Productions", "Quantum Quest", "Zenith Zone", "Galaxy Gaming", "Asteroid Analytics", "Celestial Cybernetics", "Zenith Zephyrs", "Solar Solutions", "Radiant Robotics", "Stellar Software", "Pioneer Pharmaceuticals", "Quantum Quests", "Orion Operations", "Nebula Networks", "Interstellar Innovations", "Cosmic Connect", "Astro Atlas", "Pulsar Progress", "Galactic Grid", "Phoenix Photonics", "Space-Time Studios", "Celestial Circuitry", "Nova Networks", "Proton Prodigy", "Quasar Quantum", "Stellar Systems", "Helios Hypernet", "Pandora's Prospects", "Galactic Genomes", "Nucleus Networks", "Aegis Agencies", "Nimbus Navigations", "Temporal Technologies", "Mars Motors"];
var norpList = ["Emerald Islanders", "Azure Ascendants", "Celestial Citizens", "Galactic Guild", "Cosmic Confederates", "Lunar Loyalists", "Stellar Society", "Planetary Patriots", "Solar Sect", "Nebula Nomads", "Quantum Quorum", "Astral Alliance", "Spaceborne Sectarians", "Orion Order", "Photon Philanthropists", "Pulsar Partisans", "Nexus Nationals", "Interstellar Initiates", "Eclipse Enclave", "Comet Coalition", "Venus Volunteers", "Radiant Reformists", "Starlight Sentinels", "Horizon Humanists", "Galaxy Group", "Nova Nationals", "Olympus Order", "Martian Movement", "Jupiter Junction", "Helios Heralds", "Saturn Society", "Neptune Nationals", "Urania Unionists", "Zenith Zealots", "Pandora Partisans", "Quasar Quakers", "Elysian Enclave", "Aeon Activists", "Titan Tribes", "Pleiades Patriots", "Vega Vanguard", "Proton Progressives", "Delta Democrats", "Celestial Citizens", "Zephyr Zionists", "Stardust Socialists", "Astral Anarchists", "Chronos Conservatives", "Lunar Liberals", "Orbit Orthodox", "Nebula Nationalists", "Pulsar Puritans", "Supernova Sect", "Quantum Quakers", "Cosmic Catholics", "Galactic Guild", "Epsilon Evangelists", "Pioneer Protestants", "Meteor Methodists", "Horizon Humanists", "Ionic Islamists", "Jupiter Jews", "Zenith Zen", "Astra Atheists", "Borealis Buddhists", "Nexus Neo-Pagans", "Photon Philanthropists", "Radiant Reformists", "Solar Sikhs", "Titan Taoists", "Helix Hindus", "Venus Vaishnavas", "Orion Orthodox", "Starlight Shinto", "Galaxy Gnostics", "Cosmic Confucians", "Nebula New Agers", "Radiant Rastafarians", "Quark Quakers", "Orbit Orthodox", "Eclipse Enclave", "Saturn Secularists", "Lunar Lutherans", "Proton Presbyterians", "Quantum Quakers", "Meteor Methodists", "Nexus Neo-Druids", "Astra Asatru", "Zephyr Zoroastrians", "Orion Orthodox", "Galactic Greeks", "Solar Slavics", "Pulsar Persians", "Nova Norse", "Martian Mayans", "Jupiter Jews", "Saturn Sumerians", "Vega Vikings", "Titan Thracians", "Urania Uighurs", "Starlight Sioux", "Aegis Aztecs", "Elysian Egyptians", "Fusion Franks", "Lunar Latinos", "Solar Slavs", "Pandora Polynesians"];

// Function to simulate typing event
function simulateTypingEvent(element) {
    // Simulate a keyboard event
    var event = new Event('keydown');
    element.dispatchEvent(event);

    // Simulate a user typing event
    event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    element.dispatchEvent(event);
}

// Check if the textarea element exists
if (textarea) {
    if (!isDisable) {
        // Add an event listener to capture the text input
        textarea.addEventListener('input', anonymizeText);
    } else {
        textarea.removeEventListener('input', anonymizeText);
    };

}

function anonymizeText(event) {

    // Ignore changes made by the script
    if (scriptIsChanging) {
        return;
    }

    //handleIsTypingFlagUpdate(true);

    // input = the full new value !!!
    var inputValue = event.target.value;

    if (!inputValue.includes(oldTextArea)) {
        oldTextArea = '';
        sanitizedText = '';
        rawText = '';
    } else {
        // input == newInput
        inputValue = inputValue.replace(oldTextArea, "")
    }

    if (!dotsAndSpaces.test(inputValue)) {

        //handleActiveFlagUpdate(false);
        // If there's a timer set, clear it.
        if (timeout) {
            clearTimeout(timeout);
        }

        // Set a timer to send the API call after 1 second of inactivity
        timeout = setTimeout(function () {
            if (!apiToken) {
                console.log("Please submit a valid API token!")
            } else {
                chrome.runtime.sendMessage({
                    message: 'fetchData',
                    url: 'https://text-anonymizer.p.rapidapi.com/api/anonymize/index',
                    options: {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            'X-RapidAPI-Key': apiToken,
                            'X-RapidAPI-Host': 'text-anonymizer.p.rapidapi.com'
                        },
                        body: JSON.stringify({
                            "text": inputValue,
                            "language": "eng"
                        })
                    }
                }, response => {
                    if (chrome.runtime.lastError) {
                        console.error('API call failed with message:', chrome.runtime.lastError.message);
                    } else if (response.error) {
                        console.error('API response error:', response.error);
                    } else {
                        // Show the modified text to the user
                        rawText += inputValue;
                        replaceEntities(response.data);
                    };

                });
            }
        }, 1000); // 1 sec
        //handleIsTypingFlagUpdate(false);
    };
}

async function replaceEntities(responseData) {

    personEntityMappings = responseData.personEntityMappings;
    cardinalEntityMappings = responseData.cardinalEntityMappings;
    gpeEntityMappings = responseData.gpeEntityMappings;
    orgEntityMappings = responseData.orgEntityMappings;
    productEntityMappings = responseData.productEntityMappings;
    locEntityMappings = responseData.locEntityMappings;
    dateEntityMappings = responseData.dateEntityMappings;
    norpEntityMappings = responseData.norpEntityMappings;
    percentEntityMappings = responseData.percentEntityMappings;
    moneyEntityMappings = responseData.moneyEntityMappings

    // responseData
    anonymizedResponseInstance = responseData.anonymizedText;
    // replace with fake entities
    replaceByFakeOrg(orgEntityMappings);
    //replaceByFakeCardinals(cardinalEntityMappings);
    replaceByFakeProduct(productEntityMappings);
    //replaceByFakeDate(dateEntityMappings);
    replaceByFakeNorp(norpEntityMappings);
    replaceByFakePercents(percentEntityMappings);
    replaceByFakeMoney(moneyEntityMappings);
    replaceByFakeNames(personEntityMappings);
    replaceByFakeLoc(locEntityMappings);
    replaceByFakeGpe(gpeEntityMappings);
    await Promise.all(promises);
    promises = [];

    // Wait for all replacement operations to complete

    // Then, wait for promises and update the textArea value

    //delay(100).then(() => {
    sanitizeTextArea();
    let newText = oldTextArea + anonymizedResponseInstance;
    sanitizedText = newText;
    setTextArea(newText, true);
    oldTextArea = newText;
    //})
}


/** 
async function updateTextArea() {
    try {
        setTextArea(oldTextArea + anonymizedResponseInstance, true);
        oldTextArea += anonymizedResponseInstance;
    } catch (error) {
        console.log("Error:", error);
    }
}
**/

class EntityMapping {
    constructor(id, realEntity, fakeEntity) {
        this.id = id;
        this.realEntity = realEntity;
        this.fakeEntity = fakeEntity;
    }
};

function replaceByFakeCardinals(cardinalEntityMappings) {

    var entries = Object.entries(cardinalEntityMappings);

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let realValue = key;
        let entId = value;

        if (!entityMappingList.includes(entId)) {
            // Get cardinal entity length
            let cardinalEntityLength = realValue.length;

            if (numberRegEx.test(realValue)) {
                let min = Math.pow(10, cardinalEntityLength - 1);
                let max = Math.pow(10, cardinalEntityLength) - 1;
                let currentFakeCardinal = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
                entityMappingList.push(new EntityMapping(entId, realValue, currentFakeCardinal));
            } else {
                entityMappingList.push(new EntityMapping(entId, realValue, realValue));
                /* if the cardinal contains letter, don't change it */
            }
        }

    }
}

function replaceByFakePercents(cardinalEntityMappings) {

    var entries = Object.entries(cardinalEntityMappings);

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let realValue = key;
        let entId = value;

        if (!entityMappingList.includes(entId)) {

            if (percentRegEx.test(realValue)) {
                let min = 0;
                let max = 100;
                let currentFakePercent = (Math.floor(Math.random() * (max - min + 1)) + min).toString() + '%';
                entityMappingList.push(new EntityMapping(entId, realValue, currentFakePercent));
            } else {
                entityMappingList.push(new EntityMapping(entId, realValue, realValue));
                /* if the cardinal contains letter, don't change it */
            }
        }

    }
}

function replaceByFakeMoney(cardinalEntityMappings) {

    var entries = Object.entries(cardinalEntityMappings);

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let realValue = key;
        let entId = value;

        if (!entityMappingList.includes(entId)) {

            // length - $
            let moneyEntityLength = realValue.length - 1;

            if (moneyRegex.test(realValue)) {
                let min = Math.pow(10, moneyEntityLength - 1);
                let max = Math.pow(10, moneyEntityLength) - 1;
                let currentFakePercent = (Math.floor(Math.random() * (max - min + 1)) + min).toString() + '$';
                entityMappingList.push(new EntityMapping(entId, realValue, currentFakePercent));
            } else {
                entityMappingList.push(new EntityMapping(entId, realValue, realValue));
                /* if the cardinal contains letter, don't change it */
            }
        }
    }
}

function replaceByFakeProduct(productEntityMappings) {

    var entries = Object.entries(productEntityMappings);

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let realValue = key;
        let entId = value;

        if (!entityMappingList.includes(entId)) {
            let min = 0;
            let max = productList.length;
            let currentFakeProductIndex = Math.floor(Math.random() * (max - min + 1)) + min;
            let currentFakeProduct = productList[currentFakeProductIndex]
            entityMappingList.push(new EntityMapping(entId, realValue, currentFakeProduct));
        }

    }
}

function replaceByFakeNorp(norpEntityMappings) {

    var entries = Object.entries(norpEntityMappings);

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let realValue = key;
        let entId = value;

        if (!entityMappingList.includes(entId)) {

            let min = 0;
            let max = norpList.length;
            let currentFakeNorpIndex = Math.floor(Math.random() * (max - min + 1)) + min;
            let currentFakeNorp = norpList[currentFakeNorpIndex]
            entityMappingList.push(new EntityMapping(entId, realValue, currentFakeNorp));

        }
    }
}

function replaceByFakeOrg(orgEntityMappings) {

    var entries = Object.entries(orgEntityMappings);

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let realValue = key;
        let entId = value;

        if (!entityMappingList.includes(entId)) {

            let min = 0;
            let max = orgList.length;
            let currentFakeOrgIndex = Math.floor(Math.random() * (max - min + 1)) + min;
            let currentFakeOrg = orgList[currentFakeOrgIndex]
            entityMappingList.push(new EntityMapping(entId, realValue, currentFakeOrg));

        }
    }
}

// Function to replace a PERSON entity by a fake name
function replaceByFakeNames(personEntityMappings) {
    var entries = Object.entries(personEntityMappings);
    //let promises = [];

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let currentKey = key;
        let currentValue = value;

        if (!entityMappingList.includes(currentValue)) {

            let promise = new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({
                    message: 'fetchData',
                    url: 'https://randomuser.me/api/',
                    options: {
                        method: 'GET'
                    }
                }, response => {
                    if (chrome.runtime.lastError) {
                        reject('API call failed with message:', chrome.runtime.lastError.message);
                    } else if (response.error) {
                        reject('API response error:', response.error);
                    } else {
                        let randomUserResponse = response.data.results[0];
                        randomUserList.push(randomUserResponse);
                        // Set the value in the map using the currentKey

                        let currentFakeName
                        let firstName = randomUserResponse.name.first;
                        if (currentKey.split(' ').length > 1) {
                            if (titleNameRegex.test(currentKey.split(' ')[0] + ' ')) {
                                let title = randomUserResponse.name.title;
                                currentFakeName = title + ' ' + lastName
                            } else {
                                let lastName = randomUserResponse.name.last;
                                // Two words names
                                currentFakeName = firstName + ' ' + lastName
                            }
                        } else {
                            currentFakeName = firstName
                        }
                        entityMappingList.push(new EntityMapping(currentValue, currentKey, currentFakeName));
                        resolve();
                    };
                });
            });
            promises.push(promise);

        }
    }

    /**
    Promise.all(promises).then(() => {
        console.log(entityMappingList.length);
        //sanitizeTextArea();
        //updateTextArea();
    });
    **/
}

function replaceByFakeDate(dateEntityMappings) {
    var entries = Object.entries(dateEntityMappings);

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let currentKey = key; // Store the key in a separate variable
        let currentValue = value;

        if (!entityMappingList.includes(currentValue)) {

            if (randomDateList.length < entries.length) {
                generateRandomDateAsString();
            }

            let currentFakeDate = randomDateList[i];

            entityMappingList.push(new EntityMapping(currentValue, currentKey, currentFakeDate));

        }
    }
}

function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomDateAsString() {
    let date = generateRandomDate(new Date(1900, 0, 1), new Date());
    randomDateList.push(date.toLocaleDateString("en-US"));
}

function replaceByFakeGpe(gpeEntityMappings) {
    var entries = Object.entries(gpeEntityMappings);
    //let promises = [];

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let currentKey = key;
        let currentValue = value;

        if (!entityMappingList.includes(currentValue)) {

            let promise = new Promise((resolve, reject) => {

                let currentFakeCity
                let currentFakeState
                let currentFakeCountry
                let currentGpeList
                let currentRandomInt
                let currentFakeGpe
                if (i < randomUserList.length) {
                    currentFakeCity = randomUserList[i].location.city;
                    currentFakeState = randomUserList[i].location.state;
                    currentFakeCountry = randomUserList[i].location.country;
                    currentGpeList = [currentFakeCity, currentFakeState, currentFakeCountry];
                    currentRandomInt = randomIntFromInterval(1, 3);
                    currentFakeGpe = currentGpeList[currentRandomInt - 1];
                    entityMappingList.push(new EntityMapping(currentValue, currentKey, currentFakeGpe));
                    resolve();
                } else {
                    chrome.runtime.sendMessage({
                        message: 'fetchData',
                        url: 'https://randomuser.me/api/',
                        options: {
                            method: 'GET'
                        }
                    }, response => {
                        if (chrome.runtime.lastError) {
                            reject('API call failed with message:', chrome.runtime.lastError.message);
                        } else if (response.error) {
                            reject('API response error:', response.error);
                        } else {
                            let randomUserResponse = response.data.results[0];
                            randomUserList.push(randomUserResponse);
                            currentFakeCity = randomUserResponse.location.city;
                            currentFakeState = randomUserResponse.location.state;
                            currentFakeCountry = randomUserResponse.location.country;
                            currentGpeList = [currentFakeCity, currentFakeState, currentFakeCountry];
                            currentRandomInt = randomIntFromInterval(1, 3);
                            currentFakeGpe = currentGpeList[currentRandomInt - 1];
                            entityMappingList.push(new EntityMapping(currentValue, currentKey, currentFakeGpe));
                            resolve();
                        }
                    });
                }
            });
            promises.push(promise);

        }
    }

    /**
    Promise.all(promises).then(() => {
        console.log(entityMappingList.length);
    });
    **/
}

function replaceByFakeLoc(locEntityMappings) {
    var entries = Object.entries(locEntityMappings);
    //let promises = [];

    for (var i = 0; i < entries.length; i++) {
        var [key, value] = entries[i];
        let currentKey = key;
        let currentValue = value;

        if (!entityMappingList.includes(currentValue)) {

            let promise = new Promise((resolve, reject) => {

                let currentFakeLoc
                if (i < randomUserList.length) {
                    currentFakeLoc = randomUserList[i].location.street.name;
                    entityMappingList.push(new EntityMapping(currentValue, currentKey, currentFakeLoc));
                    resolve();
                } else {
                    chrome.runtime.sendMessage({
                        message: 'fetchData',
                        url: 'https://randomuser.me/api/',
                        options: {
                            method: 'GET'
                        }
                    }, response => {
                        if (chrome.runtime.lastError) {
                            reject('API call failed with message:', chrome.runtime.lastError.message);
                        } else if (response.error) {
                            reject('API response error:', response.error);
                        } else {
                            let randomUserResponse = response.data.results[0];
                            randomUserList.push(randomUserResponse);
                            currentFakeLoc = randomUserResponse.location.street.name;
                            entityMappingList.push(new EntityMapping(currentValue, currentKey, currentFakeLoc));
                            resolve();
                        }
                    });
                }
            });
            promises.push(promise);
        }
    }

    /**
    Promise.all(promises).then(() => {
        console.log(entityMappingList.length);
    });
    **/
}

function sanitizeTextArea() {
    for (i = 0; i < entityMappingList.length; i++) {
        let entityMapping = entityMappingList[i]
        if (entityMapping.fakeEntity != null) {
            anonymizedResponseInstance = anonymizedResponseInstance.replaceAll(entityMapping.id, entityMapping.fakeEntity)
        }
    }
}

// Generate random number between min and max
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Generate random user function
function generateRandomUser(resolve, reject) {
    chrome.runtime.sendMessage({
        message: 'fetchData',
        url: 'https://randomuser.me/api/',
        options: {
            method: 'GET'
        }
    }, response => {
        if (chrome.runtime.lastError) {
            reject('API call failed with message:', chrome.runtime.lastError.message);
        } else if (response.error) {
            reject('API response error:', response.error);
        } else {
            let randomUserResponse = response.data.results[0];
            randomUserList.push(randomUserResponse);
            return randomUserResponse
        }
    });
}

// Handle active flag changes
function handleActiveFlagUpdate(isActive) {
    if (isActive != currentActiveStatus) {
        currentActiveStatus = isActive;
        // Send a message to the background script
        chrome.runtime.sendMessage({ action: "updateActiveStatus", value: currentActiveStatus }, response => {});
    };
}

function handleIsTypingFlagUpdate(isTypingNewValue) {
    // Send a message to the background script
    chrome.runtime.sendMessage({ action: "isTyping", value: isTypingNewValue }, response => {});
}

// Listener on active status flag update
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "updateActiveStatus") {
        // Perform your actions here based on the request
        // Manual change
        // STOP SANITIZING unless new manual change
        currentActiveStatus = request.value;
        isDisable = !request.value;
        if (!currentActiveStatus) {
            // OFF
            observer.disconnect();
            // Stop observing changes
            mutationDataList.forEach(mutation => {
                if (mutation.type === "textContent") {
                    mutation.target.textContent = mutation.originalData
                } else if (mutation.type === "data") {
                    mutation.target.data = mutation.originalData
                }
            });
            setTextArea(rawText)
            startObserving();
        } else {
            // ON
            observer.disconnect();
            // Stop observing changes
            mutationDataList.forEach(mutation => {
                if (mutation.type === "textContent") {
                    mutation.target.textContent = mutation.sanitizedData
                } else if (mutation.type === "data") {
                    mutation.target.data = mutation.sanitizedData
                }
            });
            setTextArea(sanitizedText);
            startObserving();
        }

        // Send a response asynchronously
        // Check if sendResponse is a valid function
        if (typeof sendResponse === 'function') {
            try {
                sendResponse({ message: "Action performed successfully" });
            } catch (error) {
                console.error("Error while sending response:", error);
            }
        } else {
            console.warn("sendResponse is not a valid function.");
        }
        return true;
    }
});

function setTextArea(value, newActiveStatus) {
    scriptIsChanging = true;  // Flag the change as script-made
    textarea.value = value;
    if (newActiveStatus !== undefined) {
        handleActiveFlagUpdate(newActiveStatus)
    }
    simulateTypingEvent(textarea);  // Simulate typing to notify GPT of the change
    scriptIsChanging = false;  // Reset the flag
}

class MutationData {
    constructor(target, originalData, sanitizedData, type, targetData) {
        this.type = type
        this.target = target;
        this.originalData = originalData;
        this.sanitizedData = sanitizedData;
        this.targetData = targetData
    }
};

function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

let observer;
let lastMutation;
let isFirstMutation = true;
let mutationDataList = []; // Stores original data and its target

async function startObserving() {
    let targetNode = document.documentElement;

    let config = { attributes: true, childList: true, subtree: true, characterData: true };

    let callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            for (let i = 0; i < mutation.target.childNodes.length; i++) {
                let childNode = mutation.target.childNodes[i];
                if (childNode.textContent.includes(sanitizedText) && !childNode.textContent.includes("function")) {
                    for (let j = 0; j < childNode.childNodes.length; j++) {
                        let subChildNode = childNode.childNodes[j];

                        // ADD HERE

                        //console.log("Adding mutation : " + sanitizedText)
                        if (subChildNode.textContent.includes(sanitizedText)) {

                            if (subChildNode.childNodes.length > 1) {


                                let target = subChildNode.childNodes[1].childNodes[0]

                                // Stop observing changes
                                observer.disconnect();

                                // Modify the text of the text node
                                try {
                                    sanitizedData = target.textContent;
                                    originalData = target.textContent;
                                    entityMappingList.forEach(personMapping => {
                                        originalData = originalData.replaceAll(personMapping.fakeEntity, personMapping.realEntity);
                                    });

                                    // Store original data before modifying it
                                    data = new MutationData(target, originalData, sanitizedData, "textContent", target.textContent);
                                    //console.log("1 : " + target);

                                    mutationDataList.push(data);
                                } catch (e) {
                                    console.log(e);
                                }

                                // Start observing changes again
                                observer.observe(targetNode, config);

                                // END

                            }
                        }
                    }
                }
            }

            if (mutation.type === 'characterData'
                && mutation.target.nodeType === Node.TEXT_NODE
                && mutation.target.assignedSlot === null
                && mutation.target.data.length <= 1000) {

                lastMutation = mutation;

                // Call delay
                delay(100).then(() => {
                    if (!isFirstMutation) {

                        let target = mutation.target

                        // Stop observing changes
                        observer.disconnect();

                        // Modify the text of the text node
                        sanitizedData = target.data;
                        originalData = target.data;
                        entityMappingList.forEach(personMapping => {
                            originalData = originalData.replaceAll(personMapping.fakeEntity, personMapping.realEntity);
                        });

                        // Store original data before modifying it
                        data = new MutationData(target, originalData, sanitizedData, "data", target.data);

                        mutationDataList.push(data);

                        // Reset textarea values
                        oldTextArea = '';
                        rawText = '';
                        sanitizedText = '';

                        // Start observing changes again
                        observer.observe(targetNode, config);
                    } else {
                        isFirstMutation = false;
                    }
                });
            }
        }
    };

    observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
}

startObserving();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === "inputValue") {
        // Use the value here
        apiToken = message.value;
        console.log("API token submitted!")
    }
});