const desiredWebsite = 'https://www.youtube.com/';

if (window.location.href.startsWith(desiredWebsite)) {
    console.log('Extension is running on the specified website');
} else {
    const messageElement = document.createElement('div');
    messageElement.innerText = 'This extension cannot be accessed on this website.';
    messageElement.style.position = 'fixed';
    messageElement.style.top = '10px';
    messageElement.style.left = '10px';
    messageElement.style.padding = '10px';
    messageElement.style.backgroundColor = 'red';
    messageElement.style.color = 'white';
    messageElement.style.fontWeight = 'bold';
    messageElement.style.zIndex = '9999';
    document.body.appendChild(messageElement);
}






