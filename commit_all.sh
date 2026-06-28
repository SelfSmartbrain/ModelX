#!/bin/bash
set -e

declare -A msgs
msgs["pyproject.toml"]="chore(build): add modelx-execution-harness script"
msgs["src/autonomy/autonomy_recovery.py"]="feat(autonomy): improve autonomy recovery strategies"
msgs["src/autonomy/objective_manager.py"]="refactor(autonomy): replace autonomous generation with template suggestion"
msgs["src/governance/assumption_detector.py"]="feat(governance): add database row-count verification to assumption detector"
msgs["src/safety/self_patch_safety_gate.py"]="fix(safety): add agents directory to critical paths in self-patch safety gate"
msgs["tests/adversarial/test_assumption_testing_against_ground_truth.py"]="test: add adversarial tests for assumption checks against observable state"
msgs["tests/adversarial/test_checkpoint_survives_hard_kill.py"]="test: update adversarial checkpoint tests for hard kill"
msgs["tests/test_phase_14_17_integration.py"]="test: update phase 14-17 integration tests for objective templates"
msgs["tests/adversarial/test_autonomous_objective_generation.py"]="test: remove test_autonomous_objective_generation.py"
msgs["PHASE_18_PROJECT_PLAN.md"]="docs: add PHASE 18 project plan"
msgs["get-pip.py"]="chore(deps): add get-pip.py script"
msgs["src/cli/execution_loop_harness.py"]="feat(cli): add execution loop harness"
msgs["test_orchestrator_protection.py"]="test: add orchestrator protection test"
msgs["tests/adversarial/test_objective_template_suggestion.py"]="test: add objective template suggestion adversarial test"

git status --porcelain | while read -r status file; do
    # Remove quotes from filename if any
    file="${file%\"}"
    file="${file#\"}"
    
    if [[ "$file" == tmp/* || "$file" == "commit_all.sh" || "$file" == "commit_all.py" ]]; then
        continue
    fi

    msg="${msgs[$file]}"
    if [[ -z "$msg" ]]; then
        msg="Update $file"
    fi

    echo "Processing $file ($status)"
    
    if [[ "$status" == "D" || "$status" == "MD" ]]; then
        git rm "$file"
    else
        git add "$file"
    fi
    
    git commit -m "$msg"
    git push
done
