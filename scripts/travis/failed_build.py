import unirest
import json
import sys

try:
    if "--help" in sys.argv: raise IndexError
    args = {
    "stage_name": sys.argv[1],
    "commit_message": sys.argv[2]
    }
    response = unirest.post(
    "http://api.353swe.ml/metrics/failed_build.php",
    headers={ "Accept": "application/json" },
    params=args
    )
    print response.body
except IndexError:
    print "USAGE: python failed_build.py stage_name \"commit_message\" [--help]"
    print "stage_name = the stage where the build failed"
    print "commit_message = the commit message that triggered the build"
    print "--help = print this message"
