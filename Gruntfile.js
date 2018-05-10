'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        componentFolder: 'webapp',
        gruntBuildFolderName: 'dist',
		namespacePrefix: 'de/tammenit/ui5/homepage',
        clean: {
            buildDirectory: '<%= gruntBuildFolderName %>'
        },
        copy: {
            production: {
                files: [
                    {
                        expand: true,
						cwd: "<%= componentFolder %>",
                        src: [
                        	'index.html',
							'css/*.css',
                            'resource/**',
							'model/*.json',
							'images/**',
							'bower_components/**',
                            '!localService/**'
                        ],
                        dest: '<%= gruntBuildFolderName %>'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
						cwd: "<%= componentFolder %>",
                        src: [
                            'localService/**'
                        ],
                        dest: '<%= gruntBuildFolderName %>'
                    }
                ]
            },
            debugFiles: {
                files: [
                    {
                        expand: true,
						cwd: "<%= componentFolder %>",
                        src: ['**/*.js', '!Component-preload.js', '!bower_components/**'],
                        dest: '<%= gruntBuildFolderName %>',
                        rename: function (dest, src) {
                            if (src.indexOf(".js") !== -1) {
                                return dest + '/' + src.replace('.js', '-dbg.js');
                            } else {
                                return dest + src;
                            }
                        }
                    }
                ]
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    src: [
                        '**/*.js',
                        '!bower_components/**'
                    ],
                    dest: '<%= gruntBuildFolderName %>',
                    cwd: '<%= gruntBuildFolderName %>/'
                }]
            }
        },
        less: {
            compile: {
                expand: true,
				cwd: "<%= componentFolder %>",
                src: ['**/*.less'],
                ext: '.css',
                rename: function (dest, src) {
                    return src.replace("less", "css");
                }
            }
        },
        watch: {
            options: {
				cwd: {
					files: "<%= componentFolder %>"
				},
                livereload: true
            },
            js: {
                files: [
                    '**/*.js',
                ]
            },
            xml: {
                files: ['**/*.xml']
            },
            less: {
                files: ['**/*.less'],
                tasks: ['less:compile']
            },
            html: {
                files: ['../*.html']
            }
        },
		openui5_preload: {
			component:{
				options:{
                    resources: {
						cwd: "<%= componentFolder %>",
						prefix: '<%= namespacePrefix %>',
                        src: [
                            '**/*.js',
                            '**/*.fragment.xml',
                            '**/*.json',
                            '**/*.properties',
                            '**/*.view.xml',
                            '!localService/**',
                            '!Component-preload.js'
                        ]
                    },
					dest:'<%= componentFolder %>',
					compress:true
				},
				components: true
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-openui5');

    // grunt task at runtime
    grunt.registerTask('dev', ['watch']);
    // build application sources for deployment to R/3 system
    //grunt.registerTask('production', ['clean:buildDirectory', 'less:compile', 'copy:production', 'uglify:js', 'openui5_preload']);
    grunt.registerTask('production', ['clean:buildDirectory', 'openui5_preload']);
    // build application sources for deployment to R/3 system but enclose mockdata
    grunt.registerTask('test', ['production', 'copy:test']);
    grunt.registerTask("default", ["production"]);
};









