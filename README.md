#Congress Connection Project - Interactive Network Visualization of the U.S. Congress

See online here: [Congress Connection Project](http://ccproject.herokuapp.com)

The Congress Connection Project is an interactive network visualization application that aims to provide insight into the many connections between legislators, committees, bills, votes, and influences that exist within the U.S. Congress.  

The current release supports lookup functionality for senators only, with the ability to search by bills voted for and words spoken during proceedings.


##Data Source:

The Congress Connection Project utilizes the [Sunlight Foundation](http://sunlightfoundation.com/) suite of APIs as its data source.

The application is supported by two primary Sunlight APIs:

####Capitol Words API
[Capitol Words](http://sunlightlabs.github.io/Capitol-Words/)

The Capitol Words API supports the keyword look up, basic information on the selected senator, and the top 5 words feature.

####Congress API v3

[Congress API v3](https://sunlightlabs.github.io/congress/)

The Congress API provides affiliation data on senators, committees, votes, and bills and is the primary data source for the network visualization.

##Methodology:

For the current release, the Congress Connection Project only contains data on senators, bills, and words from the 113th Congress. 

Bills are limited to a selection of those that passed during the 113th Congress, given the vast number of bills that were introduced and considered during that time period. Future iterations of the project may include both bills that passed and those that did not.

The Capitol Words search returns words that were spoken during Congressional proceedings, as collected and published by the [Government Printing Office](http://www.gpo.gov/). It only returns words spoken during the 113th Congress. 

##Technologies:

This project was built using [Ruby on Rails](http://rubyonrails.org/), [AngularJS](https://angularjs.org/), [D3](http://d3js.org/), and [PostgreSQL](http://www.postgresql.org/).

###D3:

D3, an interactive data visualization JavaScript framework, enabled us to visually represent the connections between members of Congress and the committees they sit on.

###AngularJS:

AngularJS, a model-view-controller JavaScript framework, was used in order to dynamically update the visualization using API calls to the database without the need for a page refresh. Custom directives were also utilized to add functionality to the visualization canvases.

###PostgreSQL:

PostgreSQL was chosen as the database for this project given that it is a relational database and this project's data model features many-to-many relationships.

###APIs:

Several APIs were built in order to query the database and populate the visualization. These APIs include the following data:

* legislators
* committees
* committee membership
* bills
* bill votes

#####Questions? Comments? Suggestions? Please contact:

Nick Mrozowski - [nickmro@gmail.com](mailto:nickmro@gmail.com)

Kyle Riach - [riachkyle@gmail.com](mailto:riachkyle@gmail.com)

Brian Purcell - [brian.purcell7@gmail.com](mailto:brian.purcell7@gmail.com)
