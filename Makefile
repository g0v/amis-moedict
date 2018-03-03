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
	perl -pi -e 's/# [A-Z].*\n/# @{[`date`]}/m' manifest.appcache
	perl -pi -e 's/# [A-Z].*\n/# @{[`date`]}/m' amis-deploy/manifest.appcache

amis-static:
	cp -r styles.css icon.png 2017-Amis-Logo.png *.html js css images fonts p m s dict-amis*.json amis-deploy/
	cp ../amis-safolu/txt/amis-ch-mapping.json amis-deploy/s/ch-mapping.json
	cp ../amis-safolu/tmp/amis-stem-words.json amis-deploy/s/stem-words.json

amis :: amis-fey amis-poinsot amis-safolu

amis-fey ::
	@-git clone --depth 1 https://github.com/miaoski/amis-data.git moedict-data-amis
	cd moedict-data-amis && make moedict
	ln -sf moedict-data-amis/dict-amis.json   dict-amis.json
	node json2prefix.js p
	node autolink.js p > p.txt
	perl link2pack.pl p < p.txt
	cp moedict-data-amis/index.json           p/index.json
	cd moedict-data-amis && python cmn-amis-longstr.py
	cp moedict-data-amis/revdict-amis*.txt    p/

amis-poinsot ::
	@-git clone --depth 1 https://github.com/miaoski/amis-francais.git moedict-data-amis-mp
	cd moedict-data-amis-mp && python moedict.py
	ln -sf moedict-data-amis-mp/dict-amis-mp.json   dict-amis-mp.json
	node json2prefix.js m
	node autolink.js m > m.txt
	perl link2pack.pl m < m.txt
	cp moedict-data-amis-mp/index.json         m/index.json
	touch m/revdict-amis-def.txt
	touch m/revdict-amis-ex.txt

amis-safolu ::
	@-git clone --depth 1 https://github.com/miaoski/amis-safolu.git ../amis-safolu
	ln -sf ../amis-safolu/txt/dict-amis-safolu.json dict-amis-safolu.json
	node json2prefix.js s
	node autolink.js s > s.txt
	perl link2pack.pl s < s.txt
	cp ../amis-safolu/txt/index.json           s/index.json
	python ../amis-safolu/txt/revdict.py
	mv revdict-*.txt                           s/
	cp ../amis-safolu/txt/amis-ch-mapping.json s/ch-mapping.json
	ruby ../amis-safolu/txt/stem-mapping.rb
	cp ../amis-safolu/tmp/amis-stem-words.json s/stem-words.json

clean ::
	git clean -xdf

emulate ::
	make -C cordova emulate
