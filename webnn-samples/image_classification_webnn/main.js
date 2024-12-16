// Original source from https://github.com/webmachinelearning/webnn-samples/blob/master/image_classification/main.js
// Modified some functions

'use strict';

import {MobileNetV2Nhwc} from './mobilenet_nhwc.js';
import * as utils from './utils.js';

const imgElement = document.getElementById('feedElement');
let modelName = 'mobilenet';
let layout = 'nhwc';
let netInstance = null;
let labels = null;
let inputOptions;
let isFirstTimeLoad = true;

async function fetchLabels(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data.split('\n');
}

document.getElementById('imageFile').addEventListener('change', (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    document.getElementById('feedElement').src = URL.createObjectURL(files[0]);
    document.getElementById('inputImage').src = URL.createObjectURL(files[0]);
  }
});

document.getElementById('feedElement').addEventListener('load', async () => {
  await main();
});

// Get top 3 classes of labels from output buffer
function getTopClasses(buffer, labels) {
  const probs = Array.from(buffer);
  const indexes = probs.map((prob, index) => [prob, index]);
  const sorted = indexes.sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    }
    return a[0] < b[0] ? -1 : 1;
  });
  sorted.reverse();
  const classes = [];

  for (let i = 0; i < 3; ++i) {
    const prob = sorted[i][0];
    const index = sorted[i][1];
    const c = {
      label: labels[index],
      prob: (prob * 100).toFixed(2),
    };
    classes.push(c);
  }

  return classes;
}

async function main() {
  try {
    document.getElementById('console2').innerHTML = "";

    if (isFirstTimeLoad){
      // Load Model
      netInstance = new MobileNetV2Nhwc();
      inputOptions = netInstance.inputOptions;
      labels = await fetchLabels(inputOptions.labelUrl);
      document.getElementById('console1').innerHTML += 'Loading Model <b>'+modelName+ '-' +layout+'</b> ... ';
      const outputOperand = await netInstance.load({deviceType: 'gpu'});
      // Build Model
      document.getElementById('console1').innerHTML += 'Building Model ... ';
      await netInstance.build(outputOperand);
      document.getElementById('console1').innerHTML += 'Done';
      isFirstTimeLoad = false;
    }
    // Inference
    const inputBuffer = utils.getInputTensor(imgElement, inputOptions);
    let outputBuffer = await netInstance.compute(inputBuffer);
    const outputs = getTopClasses(outputBuffer, labels);
    outputs.forEach(function(output){
      document.getElementById('console2').innerHTML += "<p>"+output.label + " ("+output.prob+")</p>";
    });
  } catch (error) {
    console.log(error);
  }
}
