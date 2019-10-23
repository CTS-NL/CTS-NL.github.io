#!/usr/bin/env python3

import sys
import yaml


def getFileGenerator(file):
  for line in yaml.parse(open(file).read()):
    yield(line)


def getFile(file):
  with open(file, 'r') as fileStream:
    return yaml.safe_load(fileStream)


def checkCompaniesFileForDuplicates(companiesGenerator):
  for i in range(3):
    next(companiesGenerator)

  keys = [next(companiesGenerator).value]
  names = []
  urls = []
  errorCount = 0
  firstDuplicateFound = False
  for company in companiesGenerator:
    if type(company) == yaml.events.ScalarEvent and company.value == 'name':
      event = next(companiesGenerator)
      if event.value not in names:
        names.append(event.value)
      else:
        errorCount += 1
        if not firstDuplicateFound:
          firstDuplicateFound = True
          print('There are duplicates found in the companies.yml file:')
        print(f'\tDuplicate company name found on line {event.start_mark.line}:    {event.value}\n')
    if type(company) == yaml.events.ScalarEvent and company.value == 'url':
      event = next(companiesGenerator)
      if event.value not in urls:
        urls.append(event.value)
      else:
        errorCount += 1
        if not firstDuplicateFound:
          firstDuplicateFound = True
          print('There are duplicates found in the companies.yml file:')
        print(f'\tDuplicate company url found on line {event.start_mark.line}:    {event.value}\n')
    if type(company) == yaml.events.MappingEndEvent:
      event = next(companiesGenerator)
      if type(event) == yaml.events.ScalarEvent and event.value not in keys:
        keys.append(event.value)
      elif type(event) == yaml.events.ScalarEvent:
        errorCount += 1
        if not firstDuplicateFound:
          firstDuplicateFound = True
          print('There are duplicates found in the companies.yml file:')
        print(f'\tDuplicate company key found on line {event.start_mark.line}:    {event.value}\n')
  return errorCount


def validateAgainstCompaniesList(companies, jobs, jobsGenerator, addNewline):
  missing = [j['company'] for j in jobs if j['company'] not in companies]
  
  if len(missing) > 0:
    if addNewline:
      print('\n')
    print('Cannot find the following companies in the companies.yml file:')
    
    event = next(jobsGenerator)
    while(type(event) != yaml.events.StreamEndEvent):
      if type(event) == yaml.events.ScalarEvent and event.value in missing:
        print(f'\tLine {event.start_mark.line+1} of jobs.yml:    {event.value}\n')
      event = next(jobsGenerator)
  return len(missing)


def checkForDuplicateCompanies(jobsGenerator, addNewline):
  companies = []
  errorCount = 0
  firstDuplicateFound = False
  for job in jobsGenerator:
    if type(job) == yaml.events.ScalarEvent and job.value == 'company':
      nextValue = next(jobsGenerator)
      if nextValue.value not in companies:
        companies.append(nextValue.value)
      else:
        errorCount += 1
        if not firstDuplicateFound:
          if addNewline:
            print('\n')
          firstDuplicateFound = True
          print('There are duplicate companies in the jobs.yml file:')
        print(f'\tDuplicate company found on line {nextValue.start_mark.line+1}:    {nextValue.value}\n')
  return errorCount


def checkForDuplicateLinks(jobsGenerator, addNewline):
  urls = []
  firstDuplicateFound = False
  company = ''
  errorCount = 0
  for job in jobsGenerator:
    if type(job) == yaml.events.ScalarEvent and job.value == 'company':
      company = next(jobsGenerator).value
    if type(job) == yaml.events.ScalarEvent and job.value == 'link':
      nextValue = next(jobsGenerator)
      if nextValue.value not in urls:
        urls.append(nextValue.value)
      else:
        errorCount += 1
        if not firstDuplicateFound:
          if addNewline:
            print('\n')
          firstDuplicateFound = True
          print('There are duplicate urls in the jobs.yml file:')
        print(f'\tDuplicate link found for:    {company}\n\t\tLine {nextValue.start_mark.line+1}: {nextValue.value}\n')
  return errorCount


if __name__ == '__main__':

  if len(sys.argv) < 2:
    path = './'
  else:
    if sys.argv[1][-1] == '/':
      path = sys.argv[1]
    else:
      path = sys.argv[1] + '/'

  jobsFile = f'{path}_data/jobs.yml'
  companiesFile = f'{path}_data/companies.yml'

  resultA = 0
  resultB = 0
  resultC = 0
  resultD = 0
  addNewline = False

  resultA = checkCompaniesFileForDuplicates(getFileGenerator(companiesFile))
  if resultA > 0:
    addNewline = True
  resultB = validateAgainstCompaniesList(getFile(companiesFile), getFile(jobsFile), getFileGenerator(jobsFile), addNewline)
  if resultB > 0:
    addNewline = True
  resultC = checkForDuplicateCompanies(getFileGenerator(jobsFile), addNewline)
  if resultC > 0:
    addNewline = True
  resultD = checkForDuplicateLinks(getFileGenerator(jobsFile), addNewline)

  results = resultA + resultB + resultC + resultD
  if results > 0:
    print(f'\nThere were {results} errors found.')
    exit(1)
  print('No errors found.')
  exit(0)
