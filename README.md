With the previous ```librarySystem```, ```librarySystem``` is a function that could handle dependencies. It worked as such:
```
librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
```
However, the order of these function calls was very important. Specifically, you could only create the ```'workBlurb'``` library after ```'name'``` and ```'company'```.

The task here is to rewrite ```librarySystem``` so that the following code works too. The only difference is that we're loading the libraries out of order (i.e. ```'workBlurb'``` is created before its dependencies, ```'name'``` and ```'company'```).
```
librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
```
Write tests to make sure the solution fulfills all the requirements. The tests should ensure that libraries can be created out of order. They should also ensure that all the requirements from the previous challenge are still being met.

In addition to the new loading order feature, the solution should ensure that the callback function for each library is run only once. So for example, even if ```librarySystem('workBlurb')``` appears 100 times in your app, the 'workBlurb' callback function should only run once. Include this in the tests.
