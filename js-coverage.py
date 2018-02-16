import coverage_report
import subprocess
import shutil

run, error = subprocess.Popen(["npm", "run", "test"], stdout=subprocess.PIPE).communicate()
if error is None:
    subprocess.Popen(["./node_modules/.bin/nyc", "report", "--reporter=lcov"]).communicate()
    coverage_report.push("JS")
    shutil.rmtree("./coverage")
else:
    print error
    exit(1)

exit(0)
