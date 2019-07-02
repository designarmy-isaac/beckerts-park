/*global TweenMax, Elastic*/

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
        bump = 5,
        leaves = [];
  
  function cacheLeafData() {
    $leaves.each(function(i) {
      var leaf = {};
      leaf.e = $(this);
      leaf.sy = leaf.e.data("scale-y");
      leaf.a = leaf.e.data("anchor");
      leaf.r = leaf.e.data("rotate");
      leaf.d = function() { return (leaf.a === "right" ? leaf.r - bump : leaf.r + bump)}; // If leaf is anchored on right, sets d (rotation after touch) to rotation minus bump distance,
      leaf.p = leaf.e.data("x"),                                                          // if not (ie anchored on left), sets d to r plus bump distance)
      leaf.t = leaf.e.data("top"),
      leaf.b = leaf.e.data("bottom"),
      leaves[i] = leaf;
    },leaves); 
  }
  
  function initLeaves() {
    var i;
    for (i = 0; i < leaves.length; i++) {
      var leaf = leaves[i];
      leaf.e.css({
        "top": leaf.t,
        "bottom": leaf.b,
        "transform-origin": leaf.a + " center", // set leaf's anchor
        "transform": "scaleY(" + leaf.sy + ") rotate(" + leaf.r + "deg)"
      });
      if (leaf.a === "right") {
        leaf.e.css({
          "right": leaf.p
        });
      } else {
        leaf.e.css({
          "left": leaf.p,
        });
      }
      
      leaf.e.hover(
        function() {
          animateLeafTo($(this), 2.25, {rotation: leaves[$(this).index()].d, ease:Elastic.easeOut} );
        },
        function() {
          animateLeafTo($(this), 2.25, {rotation: leaves[$(this).index()].r, ease:Elastic.easeOut} );
        }
      );
    }
  }
  
  function animateLeafTo(object, duration, parameters) {
    TweenMax.to(object, duration, parameters);
  }
  
//  function write(m) {
//    console.log(m);
//  }
   
  cacheLeafData();
  initLeaves();
   
  var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;

  // Loadbar Animation
  $(".loadbar").animate({
    width: width + "%"
  }, time);

  // Percentage Increment Animation
  var PercentageID = $("#percent"),
          start = 0,
          end = 100,
          duration = time;
          animateValue(PercentageID, start, end, duration);

  function animateValue(id, start, end, duration) {

      var range = end - start,
        current = start,
        increment = end > start? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $(id);

      var timer = setInterval(function() {
          current += increment;
          $(obj).text(current + "%");
          if (current == end) {
              clearInterval(timer);
          }
      }, stepTime);
  }

  // Fade out load bar when finished
  setTimeout(function(){
    $('.preloader-wrap').fadeOut(500);
  }, time);
  
}