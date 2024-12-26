# Image Classification using WebNN with onnxruntime-web

Sample created using [Microsoft WebNN Tutorial](https://learn.microsoft.com/en-us/windows/ai/directml/webnn-tutorial)

The sample uses __MobileNetV2__ model to build an image classification system on the web that uses __WebNN with ONNX Runtime Web__. 

| Files | Details
|---|---|
|index.html|HTML for basic UI|
|main.js|main javasvript file to perform image selection and classification using ONNX Runtime Web|
|imagenetClasses.js|[imagenetClasses.js](https://github.com/microsoft/webnn-developer-preview/blob/33a497a6747eb7a0a9146a78335f15ed1bea57be/Get%20Started/WebNN%20Tutorial/imagenetClasses.js) provides 1000 common classifications of images for your model to use|
|mobilenetv2-10.onnx|mobilenet model from the [ONNX Model Zoo](https://github.com/onnx/models/blob/main/validated/vision/classification/mobilenet/model/mobilenetv2-10.onnx)|

Can be tested using the Live Server extension for VS Code
