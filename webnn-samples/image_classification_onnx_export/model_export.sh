#!/bin/bash

# install optimum exporter cli tools
pip install optimum[exporters]

# downgrade huggingface_hub to work-around cached_download import error
pip uninstall huggingface_hub
pip install huggingface_hub==0.25.2

# export HF mobilenet_v2_1.0_224 to ONNX
optimum-cli export onnx --model google/mobilenet_v2_1.0_224 mobilenet_v2_1.0_224