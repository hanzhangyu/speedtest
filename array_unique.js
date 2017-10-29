var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var a, b, c;
a = [1, 2, 3, 2, 4, 4, 4, 3, 5, 5, 5, 6];
b = [1, 2, 3, 2, 4, 4, 4, 3, 5, 5, 5, 6];
c = [1, 2, 3, 2, 4, 4, 4, 3, 5, 5, 5, 6];

var uniqueFor = function(arr) {
	for (var i = 0; i < arr.length - 1; i++) {
		var item = arr[i];
		for (var j = i + 1; j < arr.length; j++) {
			item === arr[j] && (arr.splice(j, 1), j--);
		}
	};
	return arr;
};
var uniqueObject = function(arr) {
	var v, r = [],
	o = {};
	for (var i = 0;
		(v = arr[i]) !== undefined; i++) {
		!o[v] && (r.push(v), o[v] = true);
}
return r;
};
var uniqueFilter = function(arr) {
	return arr.filter(function(elem, pos, self) {
		return self.indexOf(elem, pos + 1) === -1;
	});
};

// add tests
suite.add('uniqueFor', function() {
	uniqueFor(a);
})
.add('uniqueObject', function() {
	uniqueObject(b);
})
.add('uniqueFilter', function() {
	uniqueFilter(c);
})
// add listeners
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run();

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf