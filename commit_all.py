import subprocess

messages = {
    "pyproject.toml": "chore(build): add modelx-execution-harness script",
    "src/autonomy/autonomy_recovery.py": "feat(autonomy): improve autonomy recovery strategies",
    "src/autonomy/objective_manager.py": "refactor(autonomy): replace autonomous generation with template suggestion",
    "src/governance/assumption_detector.py": "feat(governance): add database row-count verification to assumption detector",
    "src/safety/self_patch_safety_gate.py": "fix(safety): add agents directory to critical paths in self-patch safety gate",
    "tests/adversarial/test_assumption_testing_against_ground_truth.py": "test: add adversarial tests for assumption checks against observable state",
    "tests/adversarial/test_checkpoint_survives_hard_kill.py": "test: update adversarial checkpoint tests for hard kill",
    "tests/test_phase_14_17_integration.py": "test: update phase 14-17 integration tests for objective templates",
    "tests/adversarial/test_autonomous_objective_generation.py": "test: remove test_autonomous_objective_generation.py",
    "PHASE_18_PROJECT_PLAN.md": "docs: add PHASE 18 project plan",
    "get-pip.py": "chore(deps): add get-pip.py script",
    "src/cli/execution_loop_harness.py": "feat(cli): add execution loop harness",
    "test_orchestrator_protection.py": "test: add orchestrator protection test",
    "tests/adversarial/test_objective_template_suggestion.py": "test: add objective template suggestion adversarial test"
}

def run(cmd):
    print(f"Running: {cmd}")
    subprocess.run(cmd, shell=True, check=True)

status_output = subprocess.check_output("git status --porcelain", shell=True, text=True)
for line in status_output.split('\n'):
    if not line:
        continue
    
    # porcelain output is always exactly 2 chars of status, 1 space, then file
    state = line[:2]
    file = line[3:]
    
    if file.startswith('"') and file.endswith('"'):
        file = file[1:-1]
        
    if file.startswith("tmp/") or file in ["commit_all.sh", "commit_all.py"]:
        continue

    msg = messages.get(file, f"Update {file}")
    
    print(f"Processing {file} ({state})")
    
    # check for deleted
    if "D" in state:
        run(f'git rm "{file}"')
    else:
        run(f'git add "{file}"')
        
    run(f'git commit -m "{msg}"')
    run(f'git push')

