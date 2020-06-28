run ::
	gulp run

dev ::
	gulp dev

build ::
	gulp build

deps ::
	npm i
	gulp build

js/deps.js ::
	gulp webpack:build
	cp js/deps.js amis-deploy/js

manifest :: js/deps.js
	ruby -e 'filepath=ARGV[0];IO.write(filepath, File.open(filepath) {|f| f.read.gsub(/# 20.*\n/, "# #{Time.now.to_s}\n")})' -i manifest.appcache
	ruby -e 'filepath=ARGV[0];IO.write(filepath, File.open(filepath) {|f| f.read.gsub(/# 20.*\n/, "# #{Time.now.to_s}\n")})' -i amis-deploy/manifest.appcache

amis-static:
	cp -r styles.css icon.png 2017-Amis-Logo.png *.html js css images fonts p m s dict-amis*.json amis-deploy/
	cp ../amis-safolu/txt/amis-ch-mapping.json amis-deploy/s/ch-mapping.json
	cp ../amis-safolu/tmp/amis-stem-words.json amis-deploy/s/stem-words.json

amis:
	cp -r amis-deploy/images amis-deploy/fonts amis-deploy/p amis-deploy/m amis-deploy/s .

amis-build :: amis-fey amis-poinsot amis-safolu

amis-fey ::
	if test ! -d "moedict-data-amis"; then \
		git clone --depth 1 https://github.com/miaoski/amis-data.git moedict-data-amis; \
	fi
	cd moedict-data-amis && make moedict
	# ln -sf moedict-data-amis/dict-amis.json   dict-amis.json
	node json2prefix.js p
	node autolink.js p > p.txt
	perl link2pack.pl p < p.txt
	cp moedict-data-amis/index.json           p/index.json
	cd moedict-data-amis && python cmn-amis-longstr.py
	cp moedict-data-amis/revdict-amis*.txt    p/

amis-poinsot ::
	if test ! -d "moedict-data-amis-mp"; then \
		git clone --depth 1 https://github.com/miaoski/amis-francais.git moedict-data-amis-mp; \
	fi
	cd moedict-data-amis-mp && python moedict.py
	ln -sf moedict-data-amis-mp/dict-amis-mp.json   dict-amis-mp.json
	node json2prefix.js m
	node autolink.js m > m.txt
	perl link2pack.pl m < m.txt
	cp moedict-data-amis-mp/index.json         m/index.json
	touch m/revdict-amis-def.txt
	touch m/revdict-amis-ex.txt

amis-safolu ::
	if test ! -d "../amis-safolu"; then \
		git clone --depth 1 https://github.com/miaoski/amis-safolu.git ../amis-safolu; \
	fi
	ln -sf ../amis-safolu/s

clean ::
	git clean -xdf

emulate ::
	make -C cordova emulate
