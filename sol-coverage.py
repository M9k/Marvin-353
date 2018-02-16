from bs4 import BeautifulSoup
import subprocess
import unirest
import sys
import json

coverage_html_file = "./coverage/index.html"
html_doc, error = subprocess.Popen(["cat", coverage_html_file], stdout=subprocess.PIPE).communicate()
doc = BeautifulSoup(html_doc, "html.parser")
values = doc.body.find_all("span", attrs={'class': 'strong'})
coverage = {
"statements": values[0].text[0:-2],
"branches": values[1].text[0:-2],
"functions": values[2].text[0:-2],
"_lines": values[3].text[0:-2],
"type": "SOL"
}
if "-p" in sys.argv:
    a = unirest.post("http://api.353swe.ml/metrics/coverage.php", headers={ "Accept": "application/json" }, params={'coverage': json.dumps(coverage)})
print json.dumps(coverage)
