#!/bin/bash
babel src --out-dir compat && node babel-cleanup.js