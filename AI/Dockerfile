FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libssl-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app/

RUN pip install torch~=2.5.0 --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt    

COPY . /app/

RUN wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/department_label.zip
RUN wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/onnx.zip
RUN wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/proposal.index
RUN wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/proposal_cluster_labels.pkl
    
RUN unzip department_label.zip
RUN unzip onnx.zip
    
RUN mv proposal_cluster_labels.pkl model/topic_label/proposal_cluster_labels.pkl
RUN mv proposal.index model/topic_label/proposal.index
RUN mv department_label model/department_label
RUN mv onnx model/onnx
    
RUN rm department_label.zip
RUN rm onnx.zip

# Expose port and set entrypoint
EXPOSE 5001
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5001"]
