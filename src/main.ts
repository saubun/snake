const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow(): void {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	win.loadFile(path.join(__dirname, '..', 'index.html'));
}

app.whenReady().then((): void => {
	createWindow();

	app.on('activate', (): void => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', (): void => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
