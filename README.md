# Exygy Pagination Assessment

## Pagination

This repo does not reflect any actual Exygy feature development. It was created only for the purpose of this assessment, and made intentionally buggy.

This repo implements a directory of housing listings. Imagine that there was a request from product for a new pagination feature to be added to this existing simple list of listings - the feature has already been implemented by an imaginary developer.

You're asked to test the feature as implemented so far. What, if any, issues do you notice? You can test the feature [here](https://exygy-pagination.netlify.app/).

The functional AC for this feature is as follows:
1. When the application loads, the user should be on page 1, and the default number of items per page should be 2.
2. A user should be able to change the number of items per page. The update takes place when a user clicks an "Update" button.
3. Only numbers greater than 0 are valid in the input for number of items per page. An error message should display if the input is not valid.
4. A user should be able to navigate through the pages by clicking either a number representing the page, or an arrow in either direction.
5. When a user updates the number of items per page, the selected page should reset to page 1.

## Available Scripts

This project was initialized with [Vite](https://vitejs.dev/) and Typescript.

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
