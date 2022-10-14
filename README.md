[![Netlify Status](https://api.netlify.com/api/v1/badges/b954cb94-0f72-4ce7-9327-fe9a3e5dcda7/deploy-status)](https://app.netlify.com/sites/sad-shannon-cc428b/deploys)

# Local development

1. Install dependencies

    ```sh
    npm install
    ```

1. Run the service

    ```sh
    npm start
    ```

1. Go to the url

    ```sh
    http://localhost:9000/.netlify/functions/event-gif?on=2022-01-01&text=Happy%20New%20Year!
    ```

    - `on` Event date
    - `text` Event title

# TODO
- [x] accept input
- [x] add api
- [ ] validation
- [x] return file
- [x] accept bgColor (red, green, blue)
- [ ] add server (fix image output)
- [ ] setup pipeline
- [ ] show days only
- [ ] show text on event time
- [ ] add image

# Thanks
https://www.npmjs.com/package/gifencoder
https://github.com/neverendingqs/netlify-express
https://github.com/netlify/netlify-lambda
https://codepen.io/nishiohirokazu/pen/jjNyye
