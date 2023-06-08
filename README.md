<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Mountain area - Web component

![REUSE Compliance](https://github.com/noi-techpark/webcomp-mountain-area/actions/workflows/reuse.yml/badge.svg)
[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-mountain-area)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-mountain-area)
[![CI/CD](https://github.com/noi-techpark/webcomp-mountain-area/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-mountain-area/actions/workflows/main.yml)

A web component that shows the mountains data stored in the Open Data Hub.

Do you want to see it in action? Go to our [web component store](https://webcomponents.opendatahub.bz.it/webcomponent/430eead9-0bbc-4832-b4c0-78236d77a36b)!

- [Mountain area - Web component](#mountain-area---web-component)
  - [Usage](#usage)
    - [Attributes](#attributes)
      - [width](#width)
      - [height](#height)
      - [fontFamily](#fontfamily)
      - [language](#language)
      - [mapAttribution](#mapattribution)
      - [currentLocation](#currentlocation)
      - [tiles-url](#tiles-url)
      - [filterRadius](#filterradius)
      - [disablePOIDirections](#disablepoidirections)
      - [skiAreaFilter](#skiareafilter)
      - [disableMeteo](#disablemeteo)
      - [activitiesFilter](#activitiesfilter)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Source code](#source-code)
    - [.env](#env)
    - [Dependencies](#dependencies)
    - [Build](#build)
  - [Docker environment](#docker-environment)
    - [Installation](#installation)
    - [Dependenices](#dependenices)
    - [Start and stop the containers](#start-and-stop-the-containers)
    - [Running commands inside the container](#running-commands-inside-the-container)
  - [Information](#information)
    - [Support](#support)
    - [Contributing](#contributing)
    - [Documentation](#documentation)
    - [Boilerplate](#boilerplate)
    - [License](#license)


## Usage

Include the webcompscript file `dist/odh-mountain-area.js` in your HTML and define the web component like this:
```html
<odh-mountain-area
    width="100%"
    height="500px"
    fontFamily="Arial"
    language="it"
    mapAttribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    currentLocation='{ "lat": 46.31, "lng": 11.26 }'
    tiles-url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    disablePOIDirections
    disableMeteo
    skiAreaFilter='["SKI4972D41A8DC042F88190C154D9CC8A8E"]'
    activitiesFilter="[8,16]">
</odh-mountain-area>
```

### Attributes

#### width

Give a fixed width to the component. Works only from desktop up. You can use `px` or `%` as unit size.

Examples: `width="100%"`

#### height

Give a fixed height to the component. Works only from desktop up. You can use `px` or `%` as unit size.

Example: `height="500px"`

#### fontFamily

Set the typeface.

Example: `"Arial"`

#### language

Set the default and starting language.

Example: `"en" or "de" or "it"`

#### mapAttribution

Set the acknowledgement for the map tiles provider.

Example: `'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'`

#### currentLocation

Set the starting point position on the map.

Example: `'{ "lat": 46.31, "lng": 11.26 }'`

#### tiles-url

Set the URL of the API that provides the tiles.

Example: `"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"`

#### filterRadius

The radius expressed in kilometers with which to filter events. Default value is 0.

Example: `"5"`

#### disablePOIDirections

If set the road directions are hidden

#### skiAreaFilter

Filter activities and areas by skiArea ids. Default is `[]`.

Example: `'["SKI4972D41A8DC042F88190C154D9CC8A8E", "SKI28F1AE811BE8418DBCCACBAA604272C8", "SKIC57DA31F859141A1802E86B410FEBD70"]'`

#### disableMeteo

If set the meteo button is hidden.

#### activitiesFilter

If set, all the activities are filtered by the bitmask values in the array.

Example: `"[8,16]"`

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 14.15.4 / NPM 8.1.2

For a ready to use Docker environment with all prerequisites already installed
and prepared, you can check out the [Docker environment](#docker-environment)
section.

### Source code

Get a copy of the repository:

```bash
git clone git@github.com:noi-techpark/webcomp-mountain-area.git
```

Change directory:

```bash
cd webcomp-mountain-area/
```

### .env

Create a `.env` file in the main directory.
Fill it with this content:

```
HEREMAPS_API_KEY=YourKey
```

Replace `YourKey` with your API token to use the tiles and the search bar.

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```

The application will be served and can be accessed at [http://localhost:8080](http://localhost:8080).

<!-- ## Tests and linting

The tests and the linting can be executed with the following commands:

```bash
npm run test
npm run lint
``` -->

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "npm install"
```

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose run --rm app /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose run --rm app /bin/bash -c "npm run start"
```

## Information

### Support

ToDo: For support, please contact [help@opendatahub.bz.it](mailto:help@opendatahub.bz.it).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `development` branch.

- Make sure the tests are passing.

- Create a pull request against the `development` branch.

A more detailed description can be found here: [https://github.com/noi-techpark/documentation/blob/master/contributors.md](https://github.com/noi-techpark/documentation/blob/master/contributors.md).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.
