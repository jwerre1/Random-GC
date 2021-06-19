# Random GC

A full-stack application allowing users to easily generate and swipe through a customizable, randomly selected list of talks from a web scraped database of over 100 semi-annual conferences.

Temporary deployment: https://intense-sierra-47349.herokuapp.com/

- Frontend:
  - Vue 3
  - [Swiper.js](https://swiperjs.com/)
- Backend:
  - Node, Express
  - MongoDB
  - [jsdom](https://github.com/jsdom/jsdom) for parsing HTML when web scraping.

## Web Scraping

Web scraping programs can be found in `admin` folder and are run from the command line using node.

- `scrape:session`: scrape talks by conference session. Best utilized following a newly posted conference.
- `scrape:speakers`: scrape talks by speaker. Best for recreating database of all available conference talks.
- `scrape:topics`: scrape available topic tags and attach them to the appropriate talk.
