ini-processor
=============

Simple ini-files processor made on Tolstoy Startup Camp task.

Installation
-----

```
git clone https://github.com/vtambourine/ini-processor.git
npm install
```

Usage
-----

```
./bin/ini-processor <input file> <output file>
```

Second argument can be omitted to output processed ini-file into console.

Tests
-----

```
npm test
```

Examples
--------

```
./bin/ini-processor test/sample-deep-include.ini
./bin/ini-processor test/sample-cycle.ini
```
