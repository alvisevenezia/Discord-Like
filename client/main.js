const { app, BrowserWindow } = require('electron')


function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.webContents.session.webRequest.onBeforeSendHeaders(
        (details, callback) => {
            callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
        },
    );

    win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                'Access-Control-Allow-Origin': ['*'],
                'Access-Control-Allow-Headers': ['*'],
                ...details.responseHeaders,
            },
        });
    });

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})