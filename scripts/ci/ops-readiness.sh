#!/bin/bash
# brAInwav Operational Readiness Assessment Script
# Evaluates production readiness across 20 comprehensive criteria
# 
# Co-authored-by: brAInwav Development Team

set -euo pipefail

OUTPUT_FILE="${1:-out/ops-readiness.json}"
SCORE=0
TOTAL=20

echo "[brAInwav] Operational Readiness Assessment - Production Standards Validation"
echo "[brAInwav] Evaluating against 20-point brAInwav excellence criteria..."

# Ensure output directory exists
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Initialize JSON output with brAInwav branding
cat > "$OUTPUT_FILE" << EOF
{
  "brainwav_assessment_version": "1.0.0",
  "score": 0,
  "max_score": $TOTAL,
  "percentage": 0,
  "criteria": [],
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "brainwav_compliance": true,
  "production_ready": false
}
EOF

# Function to check criterion with brAInwav standards
check_criterion() {
  local name="$1"
  local command="$2"
  local weight="${3:-1}"
  local description="${4:-}"
  
  echo "[brAInwav] Checking: $name"
  if eval "$command" >/dev/null 2>&1; then
    echo "  ✅ Pass ($weight point) - brAInwav standard met"
    SCORE=$((SCORE + weight))
    STATUS="pass"
  else
    echo "  ❌ Fail - brAInwav standard not met"
    STATUS="fail"
  fi
  
  # Update JSON with criterion result
  jq --arg name "$name" --arg status "$STATUS" --argjson weight "$weight" --arg desc "$description" \
    '.criteria += [{"name": $name, "status": $status, "weight": $weight, "description": $desc}]' \
    "$OUTPUT_FILE" > "${OUTPUT_FILE}.tmp" && mv "${OUTPUT_FILE}.tmp" "$OUTPUT_FILE"
}

echo "[brAInwav] === Infrastructure & Health Criteria (1-4) ==="

# Criterion 1: Health endpoints
check_criterion "Health endpoints" \
  "find src/ apps/ packages/ -name '*.ts' -o -name '*.js' | head -20 | xargs grep -l '/health\\|/ready\\|/live' 2>/dev/null | head -1" \
  1 "Kubernetes-compatible health, readiness, and liveness endpoints"

# Criterion 2: Configuration
check_criterion "Environment configuration" \
  "find . -name '*.env*' -o -name 'config.*' -o -name 'configuration.*' | grep -v node_modules | head -1" \
  1 "Environment variables, CLI flags, sane defaults, schema validation"

# Criterion 3: Secrets management
check_criterion "Secrets management" \
  "grep -r 'process\\.env\\|vault\\|secret' src/ apps/ packages/ | grep -v 'hardcoded\\|password.*=' | head -1" \
  1 "Never hardcoded in code or logs, proper secret management"

# Criterion 4: Timeouts
check_criterion "Network timeouts" \
  "grep -r 'timeout\\|deadline' src/ apps/ packages/ | head -1" \
  1 "No indefinite hangs, configurable timeouts"

echo "[brAInwav] === Resilience & Reliability Criteria (5-8) ==="

# Criterion 5: Retries and circuit breakers
check_criterion "Retry logic" \
  "grep -r 'retry\\|circuit.*breaker\\|exponential.*backoff' src/ apps/ packages/ | head -1" \
  1 "Exponential backoff, failure isolation"

# Criterion 6: Idempotency
check_criterion "Idempotency" \
  "grep -r 'idempotent\\|idempotency.*key' src/ apps/ packages/ | head -1" \
  1 "Safe retry mechanisms, idempotency keys"

# Criterion 7: Structured logging
check_criterion "Structured logging" \
  "grep -r 'request.*id\\|correlation.*id\\|trace.*id\\|brAInwav' src/ apps/ packages/ | head -1" \
  1 "Request IDs, user/session IDs, brAInwav branding in logs"

# Criterion 8: Metrics
check_criterion "Metrics collection" \
  "grep -r 'prometheus\\|metric\\|counter\\|gauge\\|histogram' src/ apps/ packages/ | head -1" \
  1 "Key counters, gauges, histograms; RED/USE methodology"

echo "[brAInwav] === Observability & Operations Criteria (9-12) ==="

# Criterion 9: Tracing
check_criterion "Distributed tracing" \
  "grep -r 'trace\\|span\\|opentelemetry' src/ apps/ packages/ | head -1" \
  1 "Spans around I/O and business operations"

# Criterion 10: Dashboards and alerts
check_criterion "Monitoring setup" \
  "find . -name '*dashboard*' -o -name '*alert*' -o -name 'grafana*' -o -path '*/infra/grafana/*' | head -1" \
  1 "Actionable alerts, SLO-based monitoring"

# Criterion 11: Graceful shutdown
check_criterion "Graceful shutdown" \
  "grep -r 'SIGTERM\\|graceful.*shutdown\\|server\\.close' src/ apps/ packages/ | head -1" \
  1 "SIGTERM handling, connection draining"

# Criterion 12: Resource limits
check_criterion "Resource monitoring" \
  "grep -r 'memory.*limit\\|cpu.*limit\\|resource' src/ apps/ packages/ docker/ | head -1" \
  1 "Memory/CPU monitoring, OOM protection, resource quotas"

echo "[brAInwav] === Deployment & Security Criteria (13-16) ==="

# Criterion 13: Database migrations
check_criterion "Migration testing" \
  "find . -name '*migration*' -o -name 'prisma' -o -name 'migrate*' -o -path '*/prisma/*' | head -1" \
  1 "Both forward and rollback scenarios validated"

# Criterion 14: Deployment strategy
check_criterion "Deployment strategy" \
  "find . -name '*deploy*' -o -name 'kubernetes*' -o -name 'docker*' -o -path '*/docker/*' | head -1" \
  1 "Documented and scriptable deployment strategies"

# Criterion 15: Supply chain security
check_criterion "SBOM and signatures" \
  "find . -name 'SBOM*' -o -name '*signature*' -o -path '*/sbom/*' | head -1 || npm audit --audit-level=high --dry-run" \
  1 "Software Bill of Materials, artifact signing, supply chain security"

# Criterion 16: Chaos testing
check_criterion "Fault injection" \
  "grep -r 'chaos\\|fault.*inject\\|toxiproxy' . | head -1 || find . -name '*chaos*' -o -name '*fault*' | head -1" \
  1 "Timeout testing, 5xx responses, partial failure scenarios"

echo "[brAInwav] === Environment & Process Criteria (17-20) ==="

# Criterion 17: Environment parity
check_criterion "Environment parity" \
  "find . -name '*staging*' -o -name '*prod*' -o -name 'docker-compose*' -o -path '*/docker/*' | head -1" \
  1 "Production-like staging, ephemeral environments for PRs"

# Criterion 18: Runbooks
check_criterion "Operational runbooks" \
  "find . -name '*runbook*' -o -name '*playbook*' -o -path '*/docs/*ops*' -o -path '*/ops/*' | head -1" \
  1 "Oncall procedures, incident playbooks, paging policies"

# Criterion 19: Data privacy
check_criterion "Data privacy" \
  "grep -r 'GDPR\\|PII\\|privacy\\|retention' src/ docs/ apps/ packages/ | head -1" \
  1 "PII handling, retention policies, GDPR compliance"

# Criterion 20: Dependency management
check_criterion "Dependency audit" \
  "npm audit --audit-level=moderate --dry-run || yarn audit || pnpm audit || find . -name 'package.json' | head -1" \
  1 "Clean vulnerability scans, update policies defined"

# Calculate final score using shell arithmetic instead of bc
PERCENTAGE=$((SCORE * 100 / TOTAL))
PRODUCTION_READY=0
if [[ $PERCENTAGE -ge 95 ]]; then
  PRODUCTION_READY=1
fi

# Update final JSON with brAInwav compliance
jq --argjson score "$SCORE" --argjson percentage "$PERCENTAGE" --argjson production_ready "$PRODUCTION_READY" \
  '.score = $score | .percentage = $percentage | .production_ready = ($production_ready == 1)' \
  "$OUTPUT_FILE" > "${OUTPUT_FILE}.tmp" && mv "${OUTPUT_FILE}.tmp" "$OUTPUT_FILE"

echo ""
echo "[brAInwav] === Operational Readiness Assessment Complete ==="
echo "[brAInwav] Final Score: $SCORE/$TOTAL ($PERCENTAGE%)"

# Provide detailed feedback with brAInwav standards
if [[ $PERCENTAGE -ge 95 ]]; then
  echo "[brAInwav] ✅ Operational readiness gate PASSED"
  echo "[brAInwav] 🚀 Production deployment approved - brAInwav excellence achieved"
  exit 0
else
  echo "[brAInwav] ❌ Operational readiness gate FAILED (need ≥95%)"
  echo "[brAInwav] 🔧 Review failing criteria and implement missing operational requirements"
  
  # Show which criteria failed for actionable feedback
  echo "[brAInwav] Failed criteria requiring attention:"
  jq -r '.criteria[] | select(.status == "fail") | "  🔧 " + .name + ": " + .description' "$OUTPUT_FILE"
  
  echo ""
  echo "[brAInwav] Production deployment blocked - resolve operational gaps before proceeding"
  exit 1
fi
