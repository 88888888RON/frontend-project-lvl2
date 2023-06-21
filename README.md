### CI and CODE CLIMATE status:

[![Node CI](https://github.com/88888888RON/frontend-project-lvl2/actions/workflows/testAndLint.yml/badge.svg)](https://github.com/88888888RON/frontend-project-lvl2/actions/workflows/testAndLint.yml)

<a href="https://codeclimate.com/github/88888888RON/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/7b16372dec68cea8077d/maintainability" /></a>

<a href="https://codeclimate.com/github/88888888RON/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/7b16372dec68cea8077d/test_coverage" /></a>

# Difference Generator

## **Description:**
Gendiff is a utility compares two configuration files and shows a difference.

## **How it works:**
The program defines a difference between structures of two files. Accepted extentions for input are yaml and json. Output formats are plain, JSON and stylish as default. For help type:
```bash
gendiff -h
```

## **Sistem requirements:**

  ***Ubuntu Linux,***
  ***Node.js v18.0.0***

## **Installation:**
1. Clone the project

```bash
 git clone https://github.com/88888888RON/frontend-project-lvl2
```

2. Install dependencies

```bash
 npm ci,
 ```
 or
 ```bash
 make install
 ```
 ### **Usage:**
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

# Example:

  ## _Simple:_

https://asciinema.org/a/0a3PqN9lwiQWKfN8FfFpz0PDJ 

  ## _Stylish:_

https://asciinema.org/a/PHaXKFenzhlyDKSjcZiOAK76a
 
  ## _Plain:_

https://asciinema.org/a/7n1vIzkegPMgpb6cyX9Z5OpWX

  ## _JSON:_

https://asciinema.org/a/mtgf2ZrHngkW9dMM2o7fZGMWx
