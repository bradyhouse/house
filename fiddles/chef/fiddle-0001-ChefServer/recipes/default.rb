#
# Cookbook:: fiddle-0001-ChefServer
# Recipe:: default
#
# Copyright:: 2018, The brady house, All Rights Reserved.

package_url = node['fiddle-0001-ChefServer']['url']
package_name = ::File.basename(package_url)
package_local_path = "#{Chef::Config[:file_cache_path]}/#{package_name}"


# Download and install chef server
remote_file package_local_path do
  source package_url
end

package package_name do
  source package_local_path
  provider Chef::Provider::Package::Rpm
  notifies :run, 'execute[reconfigure-chef-server]'
end

# reconfigure the installation
execute 'reconfigure-chef-server' do
  command 'chef-server-ctl reconfigure'
  action :nothing
end

# configure the node's login splash
cookbook_file "/etc/motd" do
  source "motd"
  mode "0644"
end

