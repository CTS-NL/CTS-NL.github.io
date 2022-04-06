#!/usr/bin/env python3

import sys
import yaml
from pprint import pprint
from datetime import timedelta, date

def loadYamlFile(file):
  with open(file, 'r') as fileStream:
    return yaml.safe_load(fileStream)

def saveYamlFile(file, content):
  with open(file, 'w') as fileStream:
    yaml.dump(content, fileStream, default_flow_style=False)

def flattenJobs(jobsData):
  jobs = []
  for company_jobs in jobsData:
    for date_jobs in company_jobs['jobs']:
      for job in date_jobs['jobs']:
        jobs.append({
          "company": company_jobs['company'],
          "post_date": date_jobs['post_date'],
          "remote": "remote" in job and job["remote"],
          "link": job["link"],
          "title": job["title"],
        })
  return jobs

def convertJobs(jobsData):
  # use 6 days instead of 7, because sometimes the post is updated 6.9 days ago
  one_week_ago = date.today() - timedelta(days = 6)
  companies = {}

  for job in jobsData:
    if not job['company'] in companies:
      companies[job['company']] = {
        "company": job['company'],
        "jobs": {
          "current": [],
          "previous": [],
        }
      }

    new_job = {
      "title": job['title'],
      "link": job['link'],
      "remote": job['remote'],
    }
    if job['post_date'] >= one_week_ago:
      companies[job['company']]['jobs']['current'].append(new_job)
    else:
      companies[job['company']]['jobs']['previous'].append(new_job)
  return [*companies.values()]


if __name__ == '__main__':
  if len(sys.argv) < 2:
    path = './'
  elif sys.argv[1][-1] == '/':
    path = sys.argv[1]
  else:
    path = sys.argv[1] + '/'

  jobsFile = f'{path}_data/jobs.yml'
  newJobsFile = f'{path}_data/jobs-sorted.yml'

  jobsData = loadYamlFile(jobsFile)
  flattenedJobs = flattenJobs(jobsData)
  flattenedJobs.sort(key=lambda x: x['post_date'], reverse = True)
  convertedJobs = convertJobs(flattenedJobs)
  saveYamlFile(newJobsFile, convertedJobs)
