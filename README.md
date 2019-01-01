# Christmas Card Project
This project is a Christmas Card Application using react, grpc-web and grpc.
The current iteration of the server is made using node although the plan is to
convert it to golang.

# Dependencies
This application requires you have the following on a
linux based system in order to run.
* docker
* docker-compose
* internet connection

# Getting started
If you would like to use this project first run the following:

```bash
./install.sh
```

This installs all the required dependencies in order to run this project. That
includes required docker images and node_modules.

*Optional*: If you would like to rebuild the frontend container run the following script

```bash
./build.sh
```

Last run the following to start up the application:
```bash
docker-compose up -d
```

# Configure Christmas Card
To configure your christmas card edit the `card-config.yml` found in the root of
the project. The `card-config.yml` contains to sections. First the meta section
which contains basic information about your christmas card instance. An example
can be found below.

```yaml
meta:
  author: Your Name
  version: 1.0.0
```

It also contains a slides section that contains an array of slides for your card.
See below for different types of slides you may use and example
configurations.

Note that pictures for the picture slides need to be put in `frontend/static`
folder.

## Title
Title slide with a single picture on the right of the title

```yaml
- type: title
  title: Example Text
  subTitle: Lower title
  textColor: '#fff'
  backgroundColor: '#f44336'
  sideImage: /static/example.png
```

## Left Text Right Pictures
Combination slide of text to the right and pictures on the right

```yaml
 - type: leftTextRightPictures
  title: title
  textColor: '#fff'
  backgroundColor: '#f44336'
  text: >
      Text on the left of the screen goes here.
  images:
    - src: /static/slide-1-picture.jpg
      thumbnail: /static/slide-1-picture.jpg
      thumbnailWidth: 400
      thumbnailHeight: 300
      caption: Example caption
```

## Left Pictures Right Text
Combination slide of pictures on the left and text to the right

```yaml
 - type: leftPicturesRightText
  title: title
  textColor: '#fff'
  backgroundColor: '#f44336'
  text: >
      Text on the left of the screen goes here.
  images:
    - src: /static/slide-2-picture.jpg
      thumbnail: /static/slide-2-picture.jpg
      thumbnailWidth: 450
      thumbnailHeight: 300
      caption: Example caption
```

## Text
Plain text slide

```yaml
 - type: text
  title: title
  textColor: '#fff'
  backgroundColor: '#f44336'
  text: >
      Text on the screen goes here.
```

# Application Design

### Architecture
![architecture](./assets/architecture.svg)

### Admin Process
![friend-process](./assets/friend-process.svg)

### Friend Process
![friend-process](./assets/friend-process.svg)
