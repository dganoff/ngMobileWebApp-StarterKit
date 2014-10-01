module.exports = function(grunt) {

	"use strict";

	// Display the execution time when tasks are run:
	require('time-grunt')(grunt);

	// Configuration:
	var SRC = "./",
		DIST = "./dist/",
		TEST = "./test/",
		SERVER_PORT = "7777";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// File references to be re-used throughout this Gruntfile:
		files: {
			js: {
				src: [
					SRC + 'app/app.js',
					SRC + 'app/config.js',
					SRC + 'app/app.route.js',
					SRC + 'app/*/*.service.js',
					SRC + 'app/*/*.directive.js',
					SRC + 'app/*/*.ctrl.js',
					SRC + 'app/app.run.js'
				],
				vendor: [
					SRC + 'scripts/angular.min.js',
					SRC + 'scripts/angular-ui-router.min.js',
					SRC + 'scripts/angular-animate.min.js',
					SRC + 'scripts/angular-touch.min.js',
					SRC + 'scripts/underscore-min.js'
				]
			},
			test: {
				app: [
					DIST + 'js/vendor.js',
					SRC + 'scripts/angular-mocks.js',
					DIST + 'js/app.min.js',
					TEST + 'mocks.js'
				],
				spec: [TEST + '**/*.spec.js']
			}
		},

		postcss: {
		    options: {
		      // map: true,
		      processors: [require('autoprefixer-core')({browsers: 'last 1 version'}).postcss]
		    },
		    dist: {
		      src: DIST + 'css/*.css'
		    }
		  },

		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			app: {
				files: {
					'./dist/js/app.min.js': ["<%= files.js.src %>"]
				}
			}
		},

		jasmine: {
			pivotal: {
				src: ["<%= files.test.app %>"],
				options: {
					specs: "<%= files.test.spec %>",
					keepRunner: true
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> ver. <%= pkg.version %> <%= grunt.template.today("mm-dd-yyyy") %> */\n'
			},
			dist: {
				files: {
					'./dist/js/app.min.js': ["./dist/js/app.min.js"]
				}
			}
		},

		sass: {
			dist: {
				files: [{
					src : ['**/*.scss', '!**/_*.scss'],
					cwd : './scss',
					dest : DIST + 'css',
					ext : '.css',
					expand : true
				}],
				options: {
					style: 'expanded'
				}
			}
		},

		connect: {
			server: {
				options: {
					hostname: '*',
					port: SERVER_PORT,
					base: DIST,
					livereload: true
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scss: {
				files: [SRC + 'scss/**/*.scss'],
				tasks: ['sass', 'postcss']
			},
			css: {
				files: DIST + 'css/*.css',
				options: {
					livereload: true
				}
			},
			javascript: {
				files: [SRC + 'app/**/*.js'],
				tasks: ['jshint', 'ngAnnotate'],
				options: {
					livereload: true
				}
			},
			vendorscripts: {
				files: [SRC + 'scripts/*.js'],
				tasks: ['concat:vendor'],
				options: {
					livereload: true
				}
			},
			html: {
				files: [
					SRC + 'app/**/*.html'
				],
				tasks: ['copy:html', 'copy:index', 'htmlhint'],
				options: {
					livereload: true
				}
			},
			images: {
				files: [SRC + 'img/*'],
				tasks: ['copy:images'],
				options: {
					livereload: true
				}
			},
			test: {
				files: [TEST + '**/*.js'],
				tasks: ['jshint:test', 'jasmine'],
				options: {
					livereload: false
				}
			}
		},

		jshint: {
			files: {
				src: [SRC + 'app/**/*.js']
			},
			test: {
				src: [TEST + '**/*.js']
			}
		},

		htmlhint: {
			build: {
				options: {
					'tag-pair': true,
					'tagname-lowercase': true,
					'attr-lowercase': true,
					'attr-value-double-quotes': true,
					'doctype-first': false,
					'spec-char-escape': false,
					'id-unique': true,
					'head-script-disabled': false,
					'style-disabled': false
				},
				src: [DIST + '**/*.html']
			}
		},

		copy: {
			index: {
				files: [
					{
						expand: true,
						src: [SRC + 'app/layout/index.html'],
						flatten: true,
						dest: DIST
					}
				]
			},
			html: {
				files: [
					{
						expand: true,
						src: [SRC + 'app/*/*.html'],
						flatten: true,
						dest: DIST + 'views'
					}
				]
			},
			images: {
				files: [
					{
						expand: true,
						src: [SRC + 'img/*'],
						flatten: true,
						dest: DIST + 'img'
					}
				]
			},
			fonts: {
				files: [
					{
						expand: true,
						src: [SRC + 'fonts/*'],
						flatten: true,
						dest: DIST + 'fonts'
					}
				]
			},
			scripts: {
				files: [
					{
						expand: true,
						src: [
							// SRC + 'scripts/modernizr.min.js'
						],
						flatten: true,
						dest: DIST + 'js'
					}
				]
			}
		},

		concat: {
			options: {
				separator: ';\n'
			},
			app: {
				options: {
					banner: '/*! <%= pkg.name %> ver. <%= pkg.version %> <%= grunt.template.today("mm-dd-yyyy") %> */\n'
				},
				src: ["<%= files.js.src %>"],
				dest: DIST + 'js/app.min.js'
			},
			vendor: {
				src: ["<%= files.js.vendor %>"],
				dest: DIST + 'js/vendor.js'
			}
		},

		clean: {
			build: {
				src: [DIST + "**"]
			}
		}
	});

	// Load all Grunt tasks via matchdep:
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// Register Tasks:
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('run', ['sass', 'copy', 'htmlhint', 'jshint:files', 'ngAnnotate', 'concat:vendor', 'connect', 'watch']);
};