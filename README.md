# League management applicstion

## Overview

This example project is a full stack application which is made with a React (with redux) frontend and a .NET Core Api backend using entity framework core. The idea came about because of my criticisms of a similar real application and wondering what would go into making such an application, please see a more complete feature list in the relevent section below, but on a basic level this application contains all the basic features required for league administration for a sport such as Football or Hockey such as team, and fixture management.

## Technologies used

### Frontend

- React
- Redux state management
- SASS css preprocessor
- Webpack build system
- Babel for transcompiling es6 and onward Javascript
- ESLint for maintaining code standards
- Bulma css framework
- For other dependencies such as Moment and React router please see package.json

### API

- .NET Core API project
- Entity framework core
- Swagger
- NUnit testing
- JWT authentication

## Features

### Club

- View all clubs
- View single club (club details, squads in club)
- Add
- Edit
- Delete

### Squad

- View squad (squad details, players in squad)
- Add
- Edit
- Delete

### Player

- View player (player details)
- Add
- Edit
- Delete

### League

- View all leagues
- View single league (League details, current season, previous seasons, participant squads)
- Add
- Edit
- Delete

### Season

- View season (details, fixtures, league tables, stats)
- Add
- Edit
- Delete
- View league tables using fixture data
- View Stats

### Fixture

- View fixture details
- Created on Season creation using participating teams
- Set results
- Set goal scorers on result

All Addition, editing and Deletion require authentication with the api to perform or to access that part of the frontend.
