module.exports = {
    apps : [
        {
          name: "www",
          script: "./bin/www",
          watch: true,
          env: {
              
              "NODE_ENV": "development",
              "DB_USER": "root",
              "DB_PASS": 1234,
              "DB_HOST": "localhost",
              "DB_PORT":3307,
              "TOKEN": "key",
              "PORT": 3005,
              "AWS_ID": "AKIAJBVZIXX5KTIDHZWQ",
              "AWS_TOKEN": "wpYU+9Wpe13xklWGg7Qn+2gi7TJLy7/ay4HvTlp9",
              "AWS_BUCKET": "s3-gestioncie"
            },
          env_production: {
              "NODE_ENV": "production",
              "DB_USER": "admin",
              "DB_PASS":"1048323392",
              "DB_HOST": "db-gestion-cie.cywxcvchoyj3.us-east-2.rds.amazonaws.com",
              "DB_PORT":3306,
              "TOKEN": "key",
              "PORT": 3005,
              "AWS_ID": "AKIAJBVZIXX5KTIDHZWQ",
              "AWS_TOKEN": "wpYU+9Wpe13xklWGg7Qn+2gi7TJLy7/ay4HvTlp9",
              "AWS_BUCKET": "s3-gestioncie"
          }
        }
    ]
};
