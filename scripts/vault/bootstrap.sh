#!/usr/bin/env bash
set -euo pipefail

# Bootstrap script (prod-like) for Consul + Vault deployment
# USAGE (example):
#   export AWS_ACCESS_KEY_ID=...
#   export AWS_SECRET_ACCESS_KEY=...
#   export AWS_REGION=us-east-1
#   ./scripts/vault/bootstrap_prod.sh

COMPOSE_FILE=${COMPOSE_FILE:-docker-compose.yml}

echo "Bringing up Consul and Vault (production compose: $COMPOSE_FILE)..."
docker-compose -f "$COMPOSE_FILE" up -d consul

echo "Waiting for Consul..."
until curl -s http://localhost:8500/v1/status/leader | grep -q '"'; do
  sleep 1
done
echo "Consul up."

echo "Starting Vault..."
docker-compose -f "$COMPOSE_FILE" up -d vault

echo "Waiting for Vault listener..."
until docker exec $(docker ps -qf "name=vault") vault status >/dev/null 2>&1; do
  sleep 1
done

echo "Vault container started. Next you must do one of the following:"
echo "1) If you enabled AWS KMS auto-unseal in infra/vault/config.hcl AND provided AWS credentials,"
echo "   Vault will auto-unseal itself and be ready."
echo "2) If auto-unseal not configured, initialize and unseal Vault manually:"
echo "   docker exec -it <vault_container> vault operator init -key-shares=5 -key-threshold=3"
echo "   Save the Unseal Keys and Root Token securely (eg. HSM or a secure secret manager)."
echo
echo "To run Umzug migrations/seeders that expect Vault secrets, ensure VAULT_ADDR and VAULT_TOKEN are set in the environment."
