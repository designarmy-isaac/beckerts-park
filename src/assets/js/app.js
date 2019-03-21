import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();
$(document).ready(initPage);

function initPage(){
  
  var $leaves = $('.leaf'),
        bump = 10,
        leaves = [];
  
  
  function cacheLeafData() {
    $leaves.each(function(i) {
      var leaf = {};
      leaf.e = $(this);
      leaf.a = leaf.e.data("anchor");
      leaf.r = leaf.e.data("rotate");
      leaf.d = leaf.r + bump;
      leaf.p = leaf.e.data("x"),
      leaf.t = leaf.e.data("top"),
      leaves[i] = leaf;
//      console.log(i, leaf.animateIn);
    },leaves); 
  }
  
  function initLeaves() {
    var i;
    for (i = 0; i < leaves.length; i++) {
      var leaf = leaves[i];
      leaf.e.css({
        "top": leaf.t,
        "transform-origin": leaf.a + " center",
        "transform": "rotate(" + leaf.r + "deg)"
      });
      if (leaf.a === "right") {
        leaf.e.css("right", leaf.x);
      } else {
        leaf.e.css("left", leaf.x);
      }
      
      leaves[i].e.hover(
        function() {
          animateLeafTo(leaves[$(this).index()].e, 2.25, {rotation: leaves[$(this).index()].r - bump, ease:Elastic.easeOut} );
        },
        function() {
          animateLeafTo(leaves[$(this).index()].e, 2.25, {rotation: leaves[$(this).index()].r, ease:Elastic.easeOut} );
        }
      );
    }
  }
  
  function animateLeafTo(object, duration, parameters) {
    TweenMax.to(object, duration, parameters);
  }
  
  function write(m) {
    console.log(m);
  }
   
  cacheLeafData();
  initLeaves();
}