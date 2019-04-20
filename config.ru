# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'
Octokit.auto_paginate = true
run Rails.application

