# Repo I/O
<img src="https://i.imgur.com/MrwhQ2D.png" width="100" height="100" />

Web platform to review and display of elegant form the member contributions in a repo.

## Table of contents

* [Client Details](#client-details)
* [Environment URLS](#environment-urls)
* [The Team](#team)
* [Management resources](#management-resources)
* [Development](#development)
* [Setup the project for development](#setup-the-project-for-development)
* [Stop the project](#stop-the-project)
* [Developer Settings](#developer-settings)
* [Debugging](#debugging)
* [Running tests](#running-tests)
* [Checking code for potential issues](#checking-code-for-potential-issues)


### Client Details

| Name               	    | Email             | Role                |
| ------------------------- | ----------------- | ------------------  |
|  Abraham Kuri Vargas | kurenn@tec.mx  | Profesor  |


### Environment URLS

* **Production** - [Site](http://repository-io.herokuapp.com)
* **Development** - [localhost:3000](localhost:3000)

### Equipos de desarrollo

**Argentum - ENE - MAY 2019**

| Name           				| Email             		| Role        |
| ---------------------------- 	| ------------------------- | ----------- |
| Oscar Michel Herrera 	| oscarmichelh@gmail.com	| Development |
| Edgar Daniel Bustillos Rivera | a01113146@itesm.mx	| Development |
| Daniel Zavala Salazar | dzavala94@gmail.com	| Scrum Master |
| Miguel Angel Alvarado López| a01400121@itesm.mx | Product Owner |

### Management tools

You should ask for access to this tools if you don't have it already:

* [Github repo](https://github.com/OscarMichelH/repo-io)
* [Backlog](#) - Check Project inside this repository.
* [Design](https://www.figma.com/file/GTQAIFCEgER9sN2ExVILzxMK/integrador?node-id=0%3A1) - Check screens on Figma
* [Heroku](#)
* [Documentation](https://drive.google.com/drive/folders/1K7-i7_sWDcglDcQIgT5MQqzg0uxiZcvg?usp=sharing)

## Development

### Windows
* Install Ruby 2.6.1 with DevKit from https://rubyinstaller.org/downloads/
* Install PostgreSQL version <= 10 from https://www.postgresql.org/download/windows/
* On Cmd or PowerShell
\
`gem install rails -v 5.2.2.1`

### Linux
* RVM
\
`$ curl -sSL https://get.rvm.io | bash -s stable`
* Ruby – Version 2.6.1
\
`$ rvm use ruby-2.6.1 --default`
* Rails – Version 5.2.2.1
\
`$ gem install rails -v 5.2.2.1`

### Setup the project for development

We will use the basic tools that come with rails. (rails server, test, and coonsole).

1. Clone this repository into your local machine

```bash
$ git clone https://github.com/OscarMichelH/repo-io.git
```
2. Install dependencies:

```
$ bundle install
````

3. Setup the database:
```
$ rails db:drop
$ rails db:create
$ rails db:migrate
$ rails db:seed
```  
If you are using a Mac for development with stardard configuration, first run these commands:
```  
$ sudo mkdir /var/pgsql_socket/
$ sudo ln -s /private/tmp/.s.PGSQL.5432 /var/pgsql_socket/
```  
Note: If it is your first time running Rails + PostgreSQL, first create the database with `rails db:create`  

4. Start the application:

```
$ rails s
```

Once you see an output like this:

```
=> Booting Puma
=> Rails 5.2.2.1 application starting in development
=> Run `rails server -h` for more startup options
*** SIGUSR2 not implemented, signal based restart unavailable!
*** SIGUSR1 not implemented, signal based restart unavailable!
*** SIGHUP not implemented, signal based logs reopening unavailable!
Puma starting in single mode...
* Version 3.12.0 (ruby 2.6.1-p33), codename: Llamas in Pajamas
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://0.0.0.0:3000
Use Ctrl-C to stop
```

This means the project is up and running.

### Stop the project

In order to stop the project just hit Ctrl-C on the terminal where rails server is running.

### Developer Settings
Execute
``` sh
bundle exec figaro install
```
This will generate the file *config/application.yml*
- Add here secret keys

### Running tests

To run all tests, you can do:

```
$ rspec
```
