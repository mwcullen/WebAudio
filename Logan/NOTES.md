# General Notes

# How to Start the Server
- From `./Logan/django_host`
    - Enter `python shadow_test/manage.py runserver`

# Directory Structure Django Settings
- Django settings are stored in a folder that is the same name of the Django project
    - Why? It's just a convention #DealWithIt

## Example
_ django_example_project
|____ django_example_project (settings directory, y tho?)
    |____ ...
    |____ settings.py
    |____ ...

# Django DB
- Django can use many dbs
- Default is sqlite
- To view db locally, can load it with `sqlite3` client
    - `sqlite3 db.sqlite3` will open it
    - `.schema` will show the history of transactions

# Models
- Django handles database configurations by supporting something called `models`
- Django `models` are used to represent information that might be stored in a database
- Django uses `migrations` to handle changes of model objects so that a database is updated when the `model` changes in the codebase
- When a model changes in the codebase this change has to be propogated to the database
    - This is done using a `migration`
- To create the migration run the command
    - `python shadow_test/manage.py makemigrations test_django_application`
- These are stored in `./django_host/test_django_application/migrations`
- To see what will be performed on the database, 
    - `python shadow_test/manage.py sqlmigrate test_django_application 0001`
    - This does not  perform the actual migration, it's just like a dry-run
    - The outpupt is tailored for each specific migration being performed
- Three step guide to making model changes
    - Change your models (in models.py).
    - Run python manage.py makemigrations to create migrations for those changes
    - Run python manage.py migrate to apply those changes to the database.

# Views
To get from a URL to a view, Django uses what are known as `URLconfs`. A URLconf maps URL patterns (described as regular expressions) to views.


# Libraries
- General List
    - https://www.javascripting.com/audio/

- Wad
    - Source
        - https://github.com/rserota/wad
    - Install
        - `npm install web-audio-daw`
    - Pros
        - Can record audio
    - Cons
        - ???
- Wave Surfer
    - Source
        - https://github.com/katspaugh/wavesurfer.js
    - Pros
        - Audio visualization
    - Cons
        - ???
- Howler
    - Source
        - https://howlerjs.com/
    - Pros
        - Really, really, really good audio management
    - Cons
        - Does not support recording


# Sound Sources:
http://soundbible.com/tags-beep.html

# Simple Test Server
`python -m SimpleHTTPServer`

# Look Into
- Howler
- https://github.com/katspaugh/wavesurfer.js

If those don't work revisit: http://www.bestdevlist.com/javascript-audio-libraries/

# Research
- Speech scientist brought in for crime investigation to compare the audio found
- Research "Formants" speech visualization tools
- Stress, Rythm, Intonation from Roxi's school work
- 