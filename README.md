# CTS-NL Website Source

## Local Testing

### Server Script

If you have Ruby and Bundle installed, a basic bash script will start jekyll:

```shell script
./server.sh
```

### Docker Compose

If you want to start the site with docker compose:

```shell script
docker-compose up
```

## Adding Groups

Community groups can be added by entering an entry into `_data/groups.yml`. A group should have a short name, which is
used as the key for the group, a `name` which is the full name of the group, and a `url` which is a link the groups
primary online site.

```yaml
gamedevnl:
  name: Gamedev NL
  url: http://gamedevnl.org
```

## Adding Companies

Companies can be added by entering an entry into `_data/companies.yml`. A company should have a short name, which is
used as the key for the company, a `name` which is the full name of the company, and a `url` which is a link the
company site.

```yaml
clockworkfox:
  name: Clockwork Fox
  url: http://clockworkfoxstudios.com
```

## Adding Job Listings

Jobs can be added by entering an entry into `_data/jobs.yml`.  The format is as follows:

```yaml
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

The jobs listings are loaded from the `_data/jobs-sorted.yml` data file, and the file is generated using:

```shell script
./ParseJobs.py
```
OR
```shell script
python3 ParseJobs.py
```

The script will automatically load the jobs data from `_data/jobs.yml` and generate a sorted list based on the current date.

## Adding Posts

Posts are added to the `_posts` directory. They automatically appear on the home page, as well as the `news/` archive.

## Adding Pages

New pages can be added to `pages/`.

## Top Navigation Bar

Items can be added to the top navigation bar by modifying `_data/navigation.yml`.

## Side Bar Navigation

The side bar navigation is not setup through `_data/` and instead if changed by modifying `_includes/_sidebar.html`.

## Validation

The python script `ValidateJobs.py` is for validating the `companies.yml` and `jobs.yml` files.

It does the following checks:
* Duplicate keys, names, and urls in `companies.yml`
* Company keys in jobs.yml but not `companies.yml`
* Duplicate company keys in `jobs.yml`
* Duplicate links in `jobs.yml`

### Running the script

You can run the script from the shell on it's own or with python3 by passing in the relative path to `_data` where the `jobs.yml` and `companies.yml` files are located.

If you have pyyaml installed just run:
```shell script
./ValidateJobs.py path/to/_data
```
OR
```shell script
python3 ValidateJobs.py path/to/_data
```

Alternatively, you can install and run this using pipenv:
```shell script
# To install
pipenv install

# To run once installed
pipenv run start
```
