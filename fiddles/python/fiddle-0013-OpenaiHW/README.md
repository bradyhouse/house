fiddle-0013-OpenaiHw
======

I have an idea about how to leverage Generative AI in an application I am working on.  It is time for an    
openai hello world fiddle. As a starting point, checkout https://platform.openai.com/docs/quickstart.       


## Creation Date

07-20-24


## Location

Asheville, NC


## Issue

[Issue 1964](https://github.com/bradyhouse/house/issues/1964)


## OpenAI API Key

Inorder to test drive this fiddle, you will need to add a working Open AI API key 
to the [.env](.env) file.  For direction on how to obtain a key, checkout --

[https://platform.openai.com/docs/quickstart](https://platform.openai.com/docs/quickstart)


## Project Setup

```sh
mkdir .venv
export PIPENV_VENV_IN_PROJECT=1
pipenv --python 3.11
pipenv install
```

## Startup Fiddle Notebook

```sh
pipenv shell
jupyter notebook fiddle.ipynb
```


## Published Version Link

N/A

## Tags

jupyter, python-dotenv, openai
