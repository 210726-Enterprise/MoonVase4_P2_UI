# MoonVase4_Project2_UI

## Description
Faurex is an application that allows traders to simulate exchanging U.S Dollars to a set variety of foreign currencies: British Pounds, Euros and New Zealand Dollars. 
Traders will be able to create a single account, deposit money, and compare the trade value of U.S Dollars to the other currencies. 
The app will track these trades made for traders to review later. This particular repository is focused on the frontend of our web application. 

## Link to the Backend of Project2 
https://github.com/210726-Enterprise/MoonVase4_P2.git

## Tech Stack
- Java 8 
- Spring Boot / Spring MVC / Spring Security / Spring Data
- Angular 12
- Gain Capital External API
- AWS Elastic Beanstalk / S3 / RDS / CodePipeline / CodeBuild          
- Junit
- Mockito
- Apache Maven
- Github
- PostGreSQL deployed on AWS RDS
- Jacoco

## High-Level Requirements

Application must leverage the full stack: 
- RDBMS for persistence 
- API built with Java 8 and Spring 5
- UI built with HTML, CSS, and JS (Using NodeJS is highly encouraged, though React is optional)

Technology framework requirements: 
- Java API will use Hibernate to communicate with a PostGreSQL RDBMS 
- Java API will leverage the Spring Framework 
- Java API will be RESTful (no `HttpSession`, use JWTs!)
- Complete CI/CD pipelines will use AWS (CodePipeline, CodeBuild, Elastic Beanstalk, and S3)

Other requirements: 
- Application will demonstrate at least ten individual user stories 
- Application will leverage at least one external API 
- Application's own data model must be sufficiently complex (i.e. >2 tables) 
- RDBMS will be deployed to the cloud (AWS RDS) 
- Java API will be deployed to the cloud (AWS EC2) 
- UI application will be deployed to the cloud (AWS S3) 
- Java API will have >=80% test coverage for service layer
- Java API will leverage Spring's MockMvc for integration/e2e tests of controller endpoints
- Java API will be adequately documents (Java Docs and web endpoint documentation [Swagger/OpenAPI])
- At least one external API must be leveraged

Suggested bonus goals:
- Secure your Java API using Spring Security

## User Story
- As a user I can create an account, to unlock features of the web application
- As a user I can log in with my credentials, so that I can access my account
- As a user I can view my current balances of available currencies, so that I can make informed financial decisions
- As a user I can view current trade quotes, so that I can make informed financial decisions
- As a user I can choose my amount per trading, so that I can see what would happen
- As a user I can update the current trade quotes, so that I can make informed financial decisions
- As a user I can confirm a trade, so that I can transfer currency
- As a user I can see my total in USD so that I can see my unrealized profit
- As a user I can close my account, so that I can stop conducting trades
- As a user I can view previous trades, so that I can see what has happened 
