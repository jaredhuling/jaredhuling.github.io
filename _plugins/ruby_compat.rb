# Compatibility shim: File.exists? was removed in Ruby 3.2
# jekyll-scholar 5.x still calls it; this restores it locally.
# GitHub Pages production uses Ruby 2.x/3.1 where it exists natively.
unless File.respond_to?(:exists?)
  class File
    class << self
      alias_method :exists?, :exist?
    end
  end
end
