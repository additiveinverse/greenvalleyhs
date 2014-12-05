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
			js:           'app/js/',
			less:      'app/less/',
			views:  'app/views/',
			img:      'app/img/',
			lib:         'app/lib/',
			files:     'app/files/'
		},
		prod: {
			root:     'build/',
			js:           'build/js/',
			css:        'build/css/',
			views:  'build/views/',
			img:      'build/img/',
			lib:         'build/lib/',
			files:     'build/files/'
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
		},
		copy: {
			jsmodules: {
				expand: true,
				cwd: '<%= bower %>',
				src: [
					'angular/angular.min*',
					'angular-route/angular-route.js',
					'jquery/dist/*.min.js',
					'angular-sanitize/*.js'
				],
				dest: '<%= prod.js %>',
				flatten: true
			},
			less: {
				expand: true,
				cwd: '<%= bower %>',
				src: ['normalize-less/*.less'],
				dest: '<%= app.less %>',
				flatten: true
			},
			sourcemaps: {
				expand: true,
				cwd: '<%= bower %>',
				src: [
					'angular-*/*.map',
					'jquery/dist/*.map'
				],
				dest: '<%= prod.js %>',
				flatten: true
			},
			jsFiles: {
				expand: true,
				cwd: '<%= app.js %>',
				src: [ '*.js' ],
				dest: '<%= prod.js %>',
				flatten: true
			},
			libFiles: {
				expand: true,
				cwd: '<%= app.lib %>',
				src: [ '*' ],
				dest: '<%= prod.lib %>',
				flatten: true
			},
			extFiles: {
				expand: true,
				cwd: '<%= app.files %>',
				src: [ '*' ],
				dest: '<%= prod.files %>',
				flatten: true
			},
			angular: {
				expand: true,
				cwd: '<%= app.root %>',
				src: [ 'app.js' ],
				dest: '<%= prod.js %>',
				flatten: true
			},
			mainView: {
				expand: true,
			        cwd: '<%= app.root %>',
			        src: [ 'index.html' ],
			        dest: '<%= prod.root %>',
			        flatten: true
			},
			angularViews: {
				expand: true,
				cwd: '<%= app.views %>',
				src: [ '**/*.html' ],
				dest: '<%= prod.views %>',
				flatten: false
			},
			img: {
				expand: true,
				cwd: '<%= app.img %>',
				src: [ '**/*' ],
				dest: '<%= prod.img%>',
				flatten: false
			}
		},
		connect: {
			server: {
				options: {
					port: '9001',
					base: 'build/',
					protocol: 'http',
					livereload: true,
					open: {
						target: 'http://localhost:9001',
						callback: function() {}
					}
				}
			}
		},
		watch: {
			files: [
				'<%= app.root %>**/*',
        			'Gruntfile.js'
			],
			tasks: [
				'copy',
				'less:dev'
			],
			options: {
				reload: false,
				livereload: true,
				spawn: true
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach( grunt.loadNpmTasks );

	// The following are the grunt tasks that you can run
	grunt.registerTask('default', [ 'less:dev', 'connect', 'watch' ]);
	grunt.registerTask('first', [ 'copy', 'less:dev' ]);
	grunt.registerTask('deploy', [ 'copy', 'less:prod' ]);
};