# ui5con-htammen.github.io

This is the demo application for the UI5con 2018 session "__UI5 goes PWA__"  
In the session Helmut Tammen will show how a usual UI5 application can be transformed into a
Progressive Web Application (PWA).

## Developer info
- To run the application you need to have node.js installed. I tested this app with node v9.4.0, v8.0.0 and v6.11.2.

After you cloned the repo from github you should run `npm install` to install all node dependencies into your local working directory

### Run the app locally
Run the application by entering `npm start` in the terminal

### Build the application
Build the application by executing `npm run build` in a terminal window. Build means that a `Component-preload.js` file is created which contains all application specific resource files. 
By loading this file a lot of server requests can be saved.
