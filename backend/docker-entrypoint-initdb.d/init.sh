mysql --user=root --password="${MYSQL_ROOT_PASSWORD}" << EOF
    CREATE DATABASE CitizenProposalApp;
    GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, REFERENCES, INDEX ON CitizenProposalApp.* TO "${MYSQL_USER}";
EOF
