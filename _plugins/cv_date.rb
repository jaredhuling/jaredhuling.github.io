module Jekyll
  class CVDateGenerator < Generator
    safe true
    priority :high

    def generate(site)
      date_str = `git log -1 --format="%ad" --date="format:%B %Y" -- vita/cv.pdf`.strip
      site.data['cv_meta'] = { 'last_updated' => date_str } unless date_str.empty?
    end
  end
end
