(this["webpackJsonppath-finding-algorithm"]=this["webpackJsonppath-finding-algorithm"]||[]).push([[0],[,,,,,,function(t,e,r){t.exports=r(15)},,,,,function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){"use strict";r.r(e);var a=r(0),n=r.n(a),o=r(3),i=r.n(o),s=(r(11),r(12),r(4)),c=Object(a.createContext)(),l=r(1),u=function(t,e){switch(e.type){case"SET_GRID":return Object(l.a)({},t,{grid:e.payload});case"SET_STARTING_ROW":return Object(l.a)({},t,{start_vertex_row:e.payload});case"SET_STARTING_COL":return Object(l.a)({},t,{start_vertex_col:e.payload});case"SET_FINISH_ROW":return Object(l.a)({},t,{finish_vertex_row:e.payload});case"SET_FINISH_COL":return Object(l.a)({},t,{finish_vertex_col:e.payload});case"SET_MOUSE_IS_PRESSED":return Object(l.a)({},t,{mouseIsPressed:e.payload});case"IS_DRAGGING":return Object(l.a)({},t,{isDragging:e.payload});case"SET_ORIGINAL_ROW":return Object(l.a)({},t,{original_row:e.payload});case"SET_ORIGINAL_COL":return Object(l.a)({},t,{original_col:e.payload});case"SET_TRANSLATE_ROW":return Object(l.a)({},t,{translate_row:e.payload});case"SET_TRANSLATE_COL":return Object(l.a)({},t,{translate_col:e.payload});case"SET_LAST_TRANSLATE_ROW":return Object(l.a)({},t,{last_translate_row:e.payload});case"SET_LAST_TRANSLATE_COL":return Object(l.a)({},t,{last_translate_col:e.payload});default:return t}},d=window.innerWidth/35,v=Math.floor(20*Math.random()+1),_=Math.floor(Math.random()*d+1),f=Math.floor(20*Math.random()+1),m=Math.floor(Math.random()*d+1),g=function(t){var e={grid:[],mouseIsPressed:!1,start_vertex_row:v,start_vertex_col:_,finish_vertex_row:f,finish_vertex_col:m,isDragging:!1,original_row:0,original_col:0,translate_row:0,translate_col:0,last_translate_row:0,last_translate_col:0},r=Object(a.useReducer)(u,e),o=Object(s.a)(r,2),i=o[0],l=o[1];return n.a.createElement(c.Provider,{value:{grid:i.grid,setGrid:function(t){l({type:"SET_GRID",payload:t})},setStart:function(t){l({type:"SET_STARTING_ROW",payload:t.row}),l({type:"SET_STARTING_COL",payload:t.col})},setFinish:function(t){l({type:"SET_FINISH_ROW",payload:t.row}),l({type:"SET_FINISH_COL",payload:t.col})},setMouseIsPressed:function(t){l({type:"SET_MOUSE_IS_PRESSED",payload:t})},setIsDragging:function(t){l({type:"IS_DRAGGING",payload:t})},setOriginal:function(t){l({type:"SET_ORIGINAL_ROW",payload:t.row}),l({type:"SET_ORIGINAL_COL",payload:t.col})},setTranslate:function(t){l({type:"SET_TRANSLATE_ROW",payload:t.row}),l({type:"SET_TRANSLATE_COL",payload:t.col})},setLastTranslate:function(t){l({type:"SET_LAST_TRANSLATE_ROW",payload:t.row}),l({type:"SET_LAST_TRANSLATE_COL",payload:t.col})},mouseIsPressed:i.mouseIsPressed,start_vertex_row:i.start_vertex_row,start_vertex_col:i.start_vertex_col,finish_vertex_row:i.finish_vertex_row,finish_vertex_col:i.finish_vertex_col,isDragging:i.isDragging,original_row:i.original_row,original_col:i.original_col,translate_row:i.translate_row,translate_col:i.translate_col,last_translate_row:i.last_translate_row,last_translate_col:i.last_translate_col}},t.children)},h=(r(13),r(14),function(t){var e=t.position,r=t.isFinish,a=t.isStart,o=t.isWall,i=t.onMouseDown,s=t.onMouseEnter,c=t.onMouseUp,l=t.isVisited,u=t.isPath,d=t.onDragStart,v=t.onDragOver,_=t.onDrop,f=t.draggable,m=r?"vertex-finish":a?"vertex-start":o?"vertex-wall vertex-non-draggable":u?"vertex-shortest-path vertex-non-draggable":l?"vertex-visited vertex-non-draggable":"";return n.a.createElement("td",{id:"vertex-".concat(e.row,"-").concat(e.col),className:"vertex ".concat(m),onMouseDown:function(){return i(e)},onMouseEnter:function(){return s(e)},onMouseUp:function(){return c(e)},onDragStart:d,onDragOver:v,onDrop:_,draggable:f},a?"s":r?"f":"")}),p=r(5),x=function(t){for(var e=[],r=0;r<20;r++){for(var a=[],n=0;n<d;n++)a.push(S({row:r,col:n},t));e.push(a)}return e},S=function(t,e){var r=e.start_vertex_row,a=e.start_vertex_col,n=e.finish_vertex_row,o=e.finish_vertex_col;return{position:t,isStart:t.row===r&&t.col===a,isFinish:t.row===n&&t.col===o,distance:1/0,isVisited:!1,isWall:!1,isPath:!1,previousVertex:null,draggable:t.row===r&&t.col===a||t.row===n&&t.col===o}},y=function(t,e){var r=Object(p.a)(t),a=r[e.row][e.col],n=Object(l.a)({},a,{isWall:!a.isWall,isPath:!1,isVisited:!1,distance:1/0,draggable:!1,previousVertex:null});return r[e.row][e.col]=n,r},E=function(t){for(var e=0;e<20;e++)for(var r=0;r<d;r++)t[e][r].distance=1/0,t[e][r].isPath=!1,t[e][r].isVisited=!1,t[e][r].previousVertex=null;return t},w=function(t){var e=[],r=!0,a=!1,n=void 0;try{for(var o,i=t[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){var s=o.value,c=!0,l=!1,u=void 0;try{for(var d,v=s[Symbol.iterator]();!(c=(d=v.next()).done);c=!0){var _=d.value;e.push(_)}}catch(f){l=!0,u=f}finally{try{c||null==v.return||v.return()}finally{if(l)throw u}}}}catch(f){a=!0,n=f}finally{try{r||null==i.return||i.return()}finally{if(a)throw n}}return e},T=function(t){t.sort((function(t,e){return t.distance-e.distance}))},I=function(t,e){var r=O(t,e),a=!0,n=!1,o=void 0;try{for(var i,s=r[Symbol.iterator]();!(a=(i=s.next()).done);a=!0){var c=i.value;c.distance=t.distance+1,c.previousVertex=t}}catch(l){n=!0,o=l}finally{try{a||null==s.return||s.return()}finally{if(n)throw o}}},O=function(t,e){var r=[],a=t.position,n=a.row,o=a.col;return n>0&&r.push(e[n-1][o]),o<e[0].length-1&&r.push(e[n][o+1]),n<e.length-1&&r.push(e[n+1][o]),o>0&&r.push(e[n][o-1]),r.filter((function(t){return!t.isVisited}))},b=function(t,e){for(var r=function(r){if(r===t.length)return setTimeout((function(){!function(t){for(var e=function(e){setTimeout((function(){var r=t[e];document.getElementById("vertex-".concat(r.position.row,"-").concat(r.position.col)).className="vertex vertex-shortest-path"}),40*e)},r=0;r<t.length;r++)e(r);document.getElementById("btnStart").disabled=!1,document.getElementById("btnReset").disabled=!1}(e)}),40*r),{v:void 0};setTimeout((function(){var e=t[r].position.row,a=t[r].position.col,n=t[r].isStart,o=t[r].isFinish;n||o||(document.getElementById("vertex-".concat(e,"-").concat(a)).className="vertex vertex-visited")}),40*r)},a=0;a<=t.length;a++){var n=r(a);if("object"===typeof n)return n.v}},N=function(){var t=Object(a.useContext)(c),e=t.grid,r=t.setGrid,o=t.setMouseIsPressed,i=t.start_vertex_row,s=t.start_vertex_col,l=t.finish_vertex_row,u=t.finish_vertex_col,v=t.mouseIsPressed,_=t.setStart,f=t.setFinish,m={start_vertex_row:i,start_vertex_col:s,finish_vertex_row:l,finish_vertex_col:u};Object(a.useEffect)((function(){r(x(m))}),[]);var g=function(t){t.preventDefault()},p=function(t){},S=function(){for(var t=0;t<20;t++)for(var r=0;r<d;r++){var a=e[t][r];a.isStart?document.getElementById("vertex-".concat(t,"-").concat(r)).className="vertex vertex-start":a.isFinish?document.getElementById("vertex-".concat(t,"-").concat(r)).className="vertex vertex-finish":a.isWall?document.getElementById("vertex-".concat(t,"-").concat(r)).className="vertex vertex-wall vertex-non-draggable":document.getElementById("vertex-".concat(t,"-").concat(r)).className="vertex "}},O=function(){document.getElementById("btnStart").disabled=!0,document.getElementById("btnReset").disabled=!0;for(var t=0;t<20;t++)for(var r=0;r<d;r++){var a=e[t][r];a.isStart?document.getElementById("vertex-".concat(t,"-").concat(r)).className="vertex vertex-start":a.isFinish?document.getElementById("vertex-".concat(t,"-").concat(r)).className="vertex vertex-finish":a.isWall?document.getElementById("vertex-".concat(t,"-").concat(r)).className="vertex vertex-wall":a.isVisited&&(document.getElementById("vertex-".concat(t,"-").concat(r)).className="vertex")}var n=e[i][s],o=e[l][u],c=function(t,e,r){var a=[];e.distance=0;for(var n=w(t);0!==n.length;){T(n);var o=n.shift();if(!o.isWall){if(o.distance===1/0)return a;if(o.isVisited=!0,a.push(o),o===r)return a;I(o,t)}}}(e,n,o),v=function(t,e){var r=[],a=t;if(null===(a=a.previousVertex))return r;for(;a!==e;)a.isPath=!0,r.unshift(a),a=a.previousVertex;return r}(o,n);b(c,v)};return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null," ",n.a.createElement("button",{id:"btnStart",className:"start",onClick:function(){return O()}},"Start"),n.a.createElement("button",{id:"btnReset",className:"reset",onClick:function(){return function(t,e,r){var a=x(r);e(a);for(var n=0;n<20;n++)for(var o=0;o<d;o++){var i=t[n][o];i.isStart?document.getElementById("vertex-".concat(n,"-").concat(o)).className="vertex vertex-start":i.isFinish?document.getElementById("vertex-".concat(n,"-").concat(o)).className="vertex vertex-finish":document.getElementById("vertex-".concat(n,"-").concat(o)).className="vertex "}}(e,r,m)}},"Reset Grid")),n.a.createElement("table",{className:"grid"},n.a.createElement("tbody",{className:"grid"},e.map((function(t,a){return n.a.createElement("tr",{className:"row",key:a},t.map((function(t,a){var c=t.position,d=t.isFinish,m=t.isStart,x=t.isWall,w=t.distance,T=t.isVisited,I=t.isPath;return n.a.createElement(h,{key:a,position:c,isFinish:d,isStart:m,onMouseDown:function(t){return function(t){var a=t.row,n=t.col;if(!e[a][n].isStart&&!e[a][n].isFinish){var i=y(e,t);r(i),E(i),o(!0),S()}}(t)},onMouseEnter:function(t){return function(t){var a=t.row,n=t.col;if(v&&!e[a][n].isStart&&!e[a][n].isFinish){var o=y(e,t);r(o),E(o),S()}}(t)},onMouseUp:function(t){o(!1)},onDragStart:function(e){return function(t,e,r){var a=e.row,n=e.col;if(a===i&&n===s||a===l&&n===u){var o=JSON.stringify(r);t.dataTransfer.setData("vertex_data",o)}}(e,c,t)},onDragOver:g,onDrop:function(t){return function(t,a){var n=JSON.parse(t.dataTransfer.getData("vertex_data"));(n.isStart||n.isFinish)&&(a.row===l&&a.col===u||a.row===i&&a.col===s)||(n.isStart?_(a):f(a),r(function(t,e,r){var a=e.position;e.position=r,t[r.row][r.col]=e;var n={position:a,isStart:!1,isFinish:!1,distance:1/0,isVisited:!1,isWall:!1,isPath:!1,previousVertex:null,draggable:!e.draggable};return t[a.row][a.col]=n,e.distance=1/0,t}(e,n,a)),r(E(e)),S(),t.dataTransfer.clearData())}(t,c)},onDrag:p,mouseIsPressed:v,isWall:x,distance:w,isVisited:T,isPath:I,draggable:m||d})})))})))))};var R=function(){return n.a.createElement(g,null,n.a.createElement("div",{className:"App"},n.a.createElement("h1",null,"Pathfinder visualization"),n.a.createElement(N,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[6,1,2]]]);
//# sourceMappingURL=main.f43ced8d.chunk.js.map