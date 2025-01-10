FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libssl-dev \
    libffi-dev \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

VOLUME ["/app/db"]

COPY requirements.txt /app/

RUN pip install torch~=2.5.0 --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY . /app/

RUN wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/department_label.zip \
    && unzip department_label.zip \
    && mv department_label model/department_label \
    && rm department_label.zip

RUN wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/onnx.zip \
    && unzip onnx.zip \
    && mv onnx model/onnx \
    && rm onnx.zip

RUN wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/proposal.index \
    && mv proposal.index model/topic_label/proposal.index

RUN wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/proposal_cluster_labels.pkl \
    && mv proposal_cluster_labels.pkl model/topic_label/proposal_cluster_labels.pkl

RUN wget https://huggingface.co/Falconsai/nsfw_image_detection/resolve/main/model.safetensors \
    && wget https://huggingface.co/Falconsai/nsfw_image_detection/resolve/main/config.json \
    && wget https://huggingface.co/Falconsai/nsfw_image_detection/resolve/main/preprocessor_config.json \
    && mv model.safetensors model/nsfw_classify/model.safetensors \
    && mv config.json model/nsfw_classify/config.json \
    && mv preprocessor_config.json model/nsfw_classify/preprocessor_config.json



# Expose port and set entrypoint
EXPOSE 5001
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5001"]
