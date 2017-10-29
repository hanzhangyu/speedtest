// 本文件中所有n=arr.length-1，不要和我争不从0开始浑身难受（ps:懒得改）

/**
 * 第一种方法，复杂度O(n*2^n)，先计算选中的index
 * [2,4,1,23,5]
 * 比如我在去f(4)的时候是需要确认是否需要5
 * 这是就有三种情况
 */
 let getMaxIndexArray = function(arr){

  function getSum(arr,arrindexs) {
    let sum = 0;
    arrindexs.map(function(item) {
      sum += arr[item]
    })
    return sum
  }

  const _getMaxIndexArray = function (arr, n) {
    if (n === 0) {
      return [0]
    }
    if (n === 1) {
      return [arr[0] > arr[1] ? 0 : 1]
    }
    var arr1 = _getMaxIndexArray(arr, n - 1)
    var arr2 = _getMaxIndexArray(arr, n - 2)
    if (arr1[arr1.length - 1] === (n - 1)) { // 在那个例子的假设下中选了23
      if (getSum(arr,arr1) - getSum(arr,arr2) > arr[n]) { // 那我要比较（不修改23的情况）与（不要23的最优解+5）的最优解
        return arr1
      }
      return arr2.concat(n)
    }
    // 未选23那直接加上5
    return arr1.concat(n)
  }

  getMaxIndexArray = function (arr){
    const n=arr.length-1;
    return getSum(arr, _getMaxIndexArray(arr,n));
  }

  return getMaxIndexArray(arr);
}

/**
 * 第二种方法，复杂度O(2^n)，分析第一种方法，进行精简
 * 得：f(n)=f(n-2)+arr[n] 或者是f(n)=f(n-1)
 * 与法一相比少了一步中间步骤
 */
 const gM = (function(){
  let _arr;
  const _gM=function (n){
    const arrN=_arr[n];
    if(n===0){
      return arrN;
    }
    const arrNN=_arr[n-1];
    if(n===1){
      return arrNN>arrN?arrNN:arrN;
    }
    const result1=_gM(n-2)+_arr[n];
    const result2=_gM(n-1);
    return result1>result2?result1:result2;
  };

  return function(arr){
    _arr=arr;
    const temp=_gM(_arr.length-1);
    _arr=null;
    return temp;
  }
}());




// test 结果很明显，差距会随着N的增大而增大，毕竟法二没有求出最优解的组合
(function(){
  var Benchmark = require('benchmark');
  var suite = new Benchmark.Suite;

  const arrayTest=[1, 3, 6, 5, 4, 1, 9,1, 3, 6, 5, 4, 1, 9,1,1, 3, 6, 5, 4, 1, 9,1];

  // add tests
  suite.add('get sum and the combination of index', function() {
    getMaxIndexArray(arrayTest);
  })
  .add('get sum only', function() {
    gM(arrayTest);
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
}());