# Image Classification with onnxruntime-web

Sample created using [Microsoft WebNN Tutorial](https://learn.microsoft.com/en-us/windows/ai/directml/webnn-tutorial), but uses ONNX model that is exported from HuggingFace using _optimum-cli_ and the labels are parsed from model's _config.json_ file.

The sample uses __MobileNetV2__ ONNX model exported from HuggingFace to build an image classification system on the web that uses __WebNN with ONNX Runtime Web__. 

| Files | Details
|---|---|
|index.html|HTML for basic UI|
|main.js|main javasvript file to perform image selection and classification using ONNX Runtime Web|
|model_export.sh|script to export HuggingFace model google/mobilenet_v2_1.0_224 to ONNX|
|mobilenet_v2_1.0_224 |ONNX exported model folder generated from _model_export.sh_ script. The folder contains 3 files: [config.json, model.onnx, preprocessor_config.json]|

Can be tested using the Live Server extension for VS Code
