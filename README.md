# CTS-NL Website Source

## Local Testing

### Server Script

If you have Ruby and Bundle installed, a basic bash script will start jekyll:

```
./server.sh
```

### Docker Compose

If you want to start the site with docker compose:

```
docker-compose up
```

## Adding Groups

Community groups can be added by entering an entry into `_data/groups.yml`. A group should have a short name, which is
used as the key for the group, a `name` which is the full name of the group, and a `url` which is a link the groups
primary online site.

```
gamedevnl:
  name: Gamedev NL
  url: http://gamedevnl.org
```

## Adding Companies

Companies can be added by entering an entry into `_data/companies.yml`. A company should have a short name, which is
used as the key for the company, a `name` which is the full name of the company, and a `url` which is a link the
company site.

```
clockworkfox:
  name: Clockwork Fox
  url: http://clockworkfoxstudios.com
```

## Adding Job Listings

Jobs can be added by entering an entry into `_data/jobs.yml`.  The format is as follows:

```
- company: colab
  jobs:
    -
      post_date: 2018-05-17
      jobs:
        - title: Front-End Development Intern
          link: https://www.colabsoftware.com/job/front-end-developer-intern
        - title: Back-End Development Intern
          link: https://www.colabsoftware.com/job/back-end-developer-intern
    -
      post_date: 2018-04-26
      jobs:
        - title: DevOps
          link: https://www.colabsoftware.com/job/devops
```

## Adding Posts

Posts are added to the `_posts` directory. They automatically appear on the home page, as well as the `news/` archive.

## Adding Pages

New pages can be added to `pages/`.

## Top Navigation Bar

Items can be added to the top navigation bar by modifying `_data/navigation.yml`.

## Side Bar Navigation

The side bar navigation is not setup through `_data/` and instead if changed by modifying `_includes/_sidebar.html`.
