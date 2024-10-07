# Tab Deleter

## Description

The **Tab Deleter** extension automatically closes unused tabs in Visual Studio Code after a specified period of inactivity. This helps keep your workspace clean and organized.

## Features

- Closes tabs that have been inactive for a user-defined amount of time.
- Simple and easy to use.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or pressing `Ctrl + Shift + X`.
3. Search for "Tab Deleter".
4. Click "Install" to add the extension to your editor.

## Configuration

You can customize the time after which inactive tabs will be closed by modifying the extension's settings.

### Change the Inactive Time

1. Open the Command Palette by pressing `Ctrl + Shift + P`.
2. Type `Preferences: Open Settings (UI)` and press Enter.
3. In the search bar, type `Tab Deleter`.
4. You will see an option labeled **Tab Deleter Configuration**.
5. Look for **Time in milliseconds after which an inactive tab will be deleted** and change the value to your desired time (default is 5000 milliseconds, or 5 seconds).

   Alternatively, you can directly edit your `settings.json` file:

   ```json
   "tabDeleter.inactiveTime": 10000 // Sets the time to 10 seconds
   ```
