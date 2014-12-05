module.exports = function(grunt) {
	var name    = '<%= pkg.name %>-v<%= pkg.version%>',
  	manifest = { '<%= prod.css %>layout.min.css': [  '<%= app.less %>normalize.less', '<%= app.less %>grid.less' ],
        	                  '<%= prod.css %>global.css': '<%= app.less %>global.less'
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				 '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				 '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
				 '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;*/\n',
		app: {
			root:     'app/',
			js:           '<%= root %>/js/',
			less:      '<%= root %>/less/',
			views:  '<%= root %>/views/',
			img:      '<%= root %>/img/',
			lib:         '<%= root %>/lib/',
			files:     '<%= root %>/files/'
		},
		prod: {
			root:     'build/',
			js:           '<%= root %>/js/',
			css:        '<%= root %>/css/',
			views:  '<%= root %>/views/',
			img:      '<%= root %>/img/',
			lib:         '<%= root %>/lib/',
			files:     '<%= root %>/files/'
		},
		bower: 'bower_components/',
		less: {
			dev: {
				options: {
					app: '<%= app.less %>',
					cleancss: false,
				},
				files: manifest
			},
			prod: {
				options: {
					app: '<%= app.less %>',
					cleancss: true,
					compress: true
				},
				files: manifest
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach( grunt.loadNpmTasks );

	// The following are the grunt tasks that you can run
	grunt.registerTask('default', [ '' ]);
};