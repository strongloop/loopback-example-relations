# Polymorphic Relation

## Relation Types

- polymorphic hasMany
- polymorphic hasManyThrough
- polymorphic hasAndBelongsToMany

## How To Run Example

**This example app is still in progress. Currently I upload the code so people can easily use it to verify document or triage/diagnose issues.**

Currently you can try one polymorphic relation in the list above at one time. There are three folders in `common/models/polymorphic`, each one contains models created to demo that specific relation. You can change the model source path in `server/model-config.json`.

```javascript
"_meta": {
    "sources": [
      ...
      "../common/models/polymorphic/hasMany", //change the source path here
      ...
    ],
    ...
```

- Try polymorphic hasMany
  - Change the model source path to "../common/models/polymorphic/hasMany"(in this branch, hasMany is the default one). 
  - `POLYMORPHIC_HAS_MANY=1 node .` to run the app.

- Try polymorphic hasManyThrough
  - Change the model source path to "../common/models/polymorphic/hasManyThrough".
  - `POLYMORPHIC_HAS_MANY_THROUGH=1 node .` to run the app.

- Try polymorphic hasAndBelongsToMany
  - Change the model source path to "../common/models/polymorphic/hasAndBelongsToMany".
  - `POLYMORPHIC_HAS_AND_BELONGSTO_MANY=1 node .` to run the app.

The demo printed out is written in boot script.

## TO DO 

- Will load the model-config dynamically
- I am considering how to make it a giant app that contains all features
- Add demo of api of `Picture` model