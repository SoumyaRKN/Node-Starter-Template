# Vault server configuration for production (using Consul as storage backend).
# This file is mounted into the Vault container at /vault/config/vault.hcl
# Replace placeholders and uncomment the seal stanza for AWS KMS auto-unseal.

listener "tcp" {
  address = "0.0.0.0:8200"
  tls_disable = 1
}

storage "consul" {
  address = "127.0.0.1:8500"
  path = "vault/"
}

ui = true

# Example Seal stanza for AWS KMS auto-unseal (UNCOMMENT and fill variables to use)
#seal "awskms" {
#  region = "us-east-1"
#  kms_key_id = "arn:aws:kms:us-east-1:123456789012:key/EXAMPLE-KEY-ID"
#  access_key = "<AWS_ACCESS_KEY_ID>"         # Prefer IAM role over hardcoding
#  secret_key = "<AWS_SECRET_ACCESS_KEY>"     # Prefer IAM role over hardcoding
#}

# Alternatively, to use Vault Transit auto-unseal (using a remote Vault cluster),
# configure the 'seal "transit"' stanza which requires a pre-existing Vault transit key.
#seal "transit" {
#  address = "https://vault-transit.example.com:8200"
#  token = "<TRANSIT_VAULT_TOKEN>"
#  key_name = "auto-unseal-key"
#}
