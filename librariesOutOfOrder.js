(function() {

  var libraryStorage = {};

  function librarySystem(libraryName, dependencyArr, callback) {

    // If more than 1 argument, need to create the library
    if (arguments.length > 1) {
      libraryStorage[libraryName] = {
        dependencyArr: dependencyArr,
        callback: callback,
        isStored: false
      };
    } else {
      // Else, get the library
        var library = libraryStorage[libraryName];
        // If statement to control amount of times callback is run
        if (library.isStored === false) {
          // Get each dependency and call the librarySystem function on it
            var dependencies = library.dependencyArr.map(function(dependency) {
              return librarySystem(dependency);
          });
          // Create new property we can work with & apply dependencies to the callback
          library.isLoaded = library.callback.apply(this, dependencies);
          // Since we can only run callback once, change isStore flag
          library.isStored = true;
        }
        return library.isLoaded;     
      }
  }
  
  window.librarySystem = librarySystem;

})();

tests({
  'It should return the library when empty dependency array added': function() {
    librarySystem('dependency', [], function() {
      return 'loaded dependency';
    });
    eq(librarySystem('dependency'), 'loaded dependency');
  },
   'It should return the app library plus the dependency': function() {
    librarySystem('app', ['dependency'], function(dependency) {
      return 'app with ' + dependency;
    });
    eq(librarySystem('app'), 'app with loaded dependency');
  },
  'It should return the name of the library, which is Gordon': function() {
    librarySystem('name', [], function() {
      return 'Mr. Robot';
    });
    eq(librarySystem('name'), 'Mr. Robot');
  },
    'It should return the company name of the library, which is Watch and Code': function() {
    librarySystem('day', [], function() {
      return 'Wednesdays';
    });
    eq(librarySystem('day'), 'Wednesdays');
  },
  'It should return a library with multiple dependencies': function() {
    librarySystem('show day', ['name', 'day'], function(name, day) {
      return name + ' is on ' + day;
    });
    eq(librarySystem('show day'), 'Mr. Robot is on Wednesdays');   
  },
  'It should return a the library when it is loaded out of order': function() {
    librarySystem('programming', ['language', 'type'], function(language, type) {
      return 'I am writing this in ' + type + ' ' + language;
    });

    librarySystem('language', [], function() {
      return 'JavaScript';
    });
    librarySystem('type', [], function() {
      return 'Vanilla';
    });
    eq(librarySystem('programming'), 'I am writing this in Vanilla JavaScript');   
  },
  'The callback function for each library should run only once no matter how many times it is called': function() {
    var timesRun = 0;
    librarySystem('libraryCounter', [], function() {
      timesRun++;
    });
    librarySystem('libraryCounter');
    librarySystem('libraryCounter');

    eq(timesRun, 1);
  }
    
});
