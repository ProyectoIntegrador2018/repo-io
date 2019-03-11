# Repo I/O
![alt text](https://publicdomainvectors.org/photos/warszawianka_Cabbage.png)

[![Maintainability](Link)](#)

Plataforma web para revisar las contribuciones de un equipo en un repositorio.

## Table of contents

* [Client Details](#client-details)
* [Environment URLS](#environment-urls)
* [The Team](#team)
* [Management resources](#management-resources)
* [Development](#development)
* [Setup the project for development](#setup-the-project-for-development)
* [Stop the project](#stop-the-project)
* [Debugging](#debugging)
* [Running tests](#running-tests)
* [Checking code for potential issues](#checking-code-for-potential-issues)


### Client Details

| Name               	    | Email             | Role                |
| ------------------------- | ----------------- | ------------------  |
|  Abraham Kuri Vargas | # | Profesor  |


### Environment URLS

* **Production** - [localhost:3000](localhost:3000)
* **Development** - [Site](#)

### Equipos de desarrollo

**Argentum - ENE - MAY 2019**

| Name           				| Email             		| Role        |
| ---------------------------- 	| ------------------------- | ----------- |
| Oscar Michel Herrera 	| oscarmichelh@gmail.com	| Development |
| Edgar Daniel Bustillos Rivera | a01113146@itesm.mx	| Development |
| Daniel Zavala Salazar | dzavala94@gmail.com	| Scrum Master |
| Miguel Ángel Alvarado López| mikealvaradol06@gmail.com | Product Owner |

### Management tools

You should ask for access to this tools if you don't have it already:

* [Github repo](https://github.com/OscarMichelH/repo-io)
* [Backlog](#) - Check Project inside this repository.
* [Design](https://www.figma.com/file/GTQAIFCEgER9sN2ExVILzxMK/integrador?node-id=0%3A1) - Check screens on Figma
* [Heroku](#) 
* [Documentation](https://drive.google.com/drive/folders/1K7-i7_sWDcglDcQIgT5MQqzg0uxiZcvg?usp=sharing)

## Development
* RVM
\
`$ curl -sSL https://get.rvm.io | bash -s stable`
* Ruby – Version 2.6.1
\
`$ rvm use ruby-2.6.1 --default`
* Rails – Version 5.2.1
\
`$ gem install rails -v 5.2.1`

### Setup the project for development

We will usedthe basic tools that come with rails. (rails server, test, and coonsole).

1. Clone this repository into your local machine

```bash
$ git clone https://github.com/OscarMichelH/repo-io.git
```

2. Setup the database:
```
$ rails db:drop
$ rails db:create
$ rails db:migrate
$ rails db:seed
```

3. Start the application:

```
$ rails s
```

Once you see an output like this:

```
web_1   | => Booting Puma
web_1   | => Rails 5.1.3 application starting in development on http://0.0.0.0:3000
web_1   | => Run `rails server -h` for more startup options
web_1   | => Ctrl-C to shutdown server
web_1   | Listening on 0.0.0.0:3000, CTRL+C to stop
```

This means the project is up and running.

### Stop the project

In order to stop the project just hit Ctrl-C on the terminal where rails server is running.

### Running tests

To run all tests, you can do:

```
$ rspec 
```
