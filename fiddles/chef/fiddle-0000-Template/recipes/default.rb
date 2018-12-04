#
# Cookbook:: fiddle-0000-Template
# Recipe:: default
#
# Copyright:: 2018, The brady house, All Rights Reserved.

cookbook_file "/etc/motd" do
  source "motd"
  mode "0644"
end
