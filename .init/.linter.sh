#!/bin/bash
cd /home/kavia/workspace/code-generation/crossbrowser-login-test-framework-43870-43868/automation_test_framework_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

