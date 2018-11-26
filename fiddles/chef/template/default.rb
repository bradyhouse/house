#
# Cookbook:: {{FiddleName}}
# Recipe:: default
#
# Copyright:: {{Year}}, The {{AuthorName}}, All Rights Reserved.

cookbook_file "/etc/motd" do
  source "motd"
  mode "0644"
end
