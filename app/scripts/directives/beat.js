var reps = {
  'circle': CircleRep,
  'bar': BarRep
};

function BarRep(elem, scope) {
  var container = d3.select(elem).append('svg')
    .attr('width', 100)
    .attr('height', 100);

  var beat = container.insert('rect')
    .attr('x',25)
    .attr('y',25)
    .attr('width', 50)
    .attr('height', 50);
  beat.attr('stroke', 'black')
    .attr('fill', scope.fill);

  scope.$watch('fill', function (newVal, oldVal) {
      beat.attr('fill',newVal);
  });
}

function CircleRep(elem, scope) {
  var container = d3.select(elem).append('svg')
    .attr('width', 100)
    .attr('height', 100);

  var beat = container.insert('circle')
    .attr('cx',50)
    .attr('cy',50)
    .attr('r', 25);
  beat.attr('stroke', 'black')
    .attr('fill', scope.fill);

  scope.$watch('fill', function (newVal, oldVal) {
    beat.attr('fill',newVal);
  });
}

angular.module('sofaApp.directives',[]).directive('beat', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      fill: '=',  // the fact that this is only a symbol 
                  // (without a name after it as in toggledir (below)),
                  // means that on the element that this directive is 
                  // attached to, there should be an attribute by this name:
                  // fill
                  // the fact that this symbol is a = (and not a @ or &) 
                  // means that in the scope of the element for this directive 
                  // (not the elem defined in this template, but the one on 
                  // which this directive is applied), the value passed into 
                  // this attribute should exist
      id: '@bid', 
      toggleDir: '&toggle'
    },
    link: function(scope, elem, attr, ctrl) {
      var rep = new reps[attr.shape](elem[0], scope);
    },
    templateUrl: 'views/templates/beat.html'
  };
});

