wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/department_label.zip \
    && unzip department_label.zip \
    && mv department_label model/department_label \
    && rm department_label.zip

wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/onnx.zip \
    && unzip onnx.zip \
    && mv onnx model/onnx \
    && rm onnx.zip

wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/proposal.index \
    && mv proposal.index model/topic_label/proposal.index

wget https://huggingface.co/alan314159/CitizenProposalApp/resolve/main/proposal_cluster_labels.pkl \
    && mv proposal_cluster_labels.pkl model/topic_label/proposal_cluster_labels.pkl
