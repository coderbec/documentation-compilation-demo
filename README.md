# Compiling Documentation Files Demo

Co-owning documentation and complexity around responsibility for that documentation can make it hard to present a single unified set of documentation. Documentation is often a collaboration between the api/tech teams, the product team and the developer relations team. Additionally, internal teams will often have their own versions of api specification documents that diverge from the specifications used for externally facing documents. This further complicates management of the documentation when changes are deployed and can be a huge challenge for documentation owners and dev relations teams. Starting with API Blueprint files, this application demonsrates the use of renderers to compile multiple blueprints into a single unified document, for display and public dissemination. 

## Features

bitbucket pipeline file

## To-dos

Please subscribe to the repo to be notified when the following features get pushed: 
* buildkite pipeline file
* Swagger inclusion and conversion
* tests
* automatic versioning
* codegen

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

1. Clone the repo
2. run `npm install
3. run `bundle install
4. 

Add the sources for your components to the src folder and modify the index.api to include your submodules
5. npm run build
6. npm run validate
7. npm run publish

### Prerequisites

You will need ruby and node installed one whatever machine is doing the build. The example buildkite file includes reference to a docker file that has ruby and node installed. 

## Deployment

bitbucket-pipelines is an example bitbucket pipeline that just publishes to apiary. This can be modified to use any of the included scripts in package.json for added functionality. 

## Built With

* [node.js](https://nodejs.org/) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [aglio](https://github.com/danielgtaylor/aglio) - API Blueprint Renderer
* [apiaryio](https://rubygems.org/gems/apiaryio/versions/0.3.3) - GEm from Apiary to publish and validate

## Contributing

TBD

## Versioning

TBD

## Authors

* **Bec Martin** - *Initial work* - [PurpleBooth](https://github.com/coderbec)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* https://github.com/danielgtaylor/ - Aglio
* https://github.com/raymondburgess - Raymond Burgess from MessageMedia who developed the more advanced project this was inspired by internally?
